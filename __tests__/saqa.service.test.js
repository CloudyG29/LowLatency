/**
 * @jest-environment node
 */

const axios = require('axios');
const { fetchAllQualifications, fetchAllUnitStandards } = require('../backend/services/saqa.service'); // ⚠️ UPDATE PATH HERE

// 1. Mock Axios so we don't hit the real SAQA server
jest.mock('axios');

describe('SAQA Web Scraper Service', () => {
  let consoleLogSpy, consoleWarnSpy;

  beforeAll(() => {
    // 2. CRITICAL: Bypass all timeouts! This makes the 1000ms delay and 
    // the exponential backoff instantly resolve so tests run in milliseconds.
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => cb());
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Keep the test output clean from our expected console logs and warnings
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  afterAll(() => {
    global.setTimeout.mockRestore();
  });

  // Helper to quickly generate fake SAQA HTML
  const generateFakeHTML = (type, totalStr, items) => {
    let rows = '<tr><th>Headers...</th></tr>'; // Table header row
    
    items.forEach(item => {
      // Qualifications have 8 columns, Unit Standards have 6 columns
      if (type === 'qual') {
        rows += `<tr>
          <td>${item.id}</td><td>${item.name}</td><td>Field Data</td>
          <td>NQF Level 0${item.level}</td><td>120</td><td>${item.sector}</td>
          <td>Reg Status</td><td>${item.originator}</td>
        </tr>`;
      } else {
        rows += `<tr>
          <td>${item.id}</td><td>${item.name}</td><td>Field Data</td>
          <td>NQF Level 0${item.level}</td><td>12</td><td>${item.sector}</td>
        </tr>`;
      }
    });

    return `<body>
      <div>Showing results 1 to 20 of ${totalStr}</div>
      <table>${rows}</table>
    </body>`;
  };

  describe('fetchAllQualifications', () => {
    test('should scrape, parse, and map qualifications accurately', async () => {
      const fakeHTML = generateFakeHTML('qual', '2', [
        { id: '1234', name: 'BSc IT', level: '7', sector: 'Higher Ed', originator: 'Test Uni' },
        { id: '5678', name: 'Diploma', level: '6', sector: 'Higher Ed', originator: 'Test Tech' }
      ]);
      
      axios.post.mockResolvedValue({ data: fakeHTML });

      const results = await fetchAllQualifications();

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual({
        saqa_id: '1234',
        name: 'BSc IT',
        nqf_level: 7,
        sector: 'Higher Ed',
        originator: 'Test Uni'
      });
      
      // It should only make 1 page request because total is 2 and PAGE_SIZE is 20
      expect(axios.post).toHaveBeenCalledTimes(1); 
    });

    test('should break the loop safely if page returns no valid rows', async () => {
      // Claims there are 50 records, but provides a table with ONLY a header
      const fakeHTML = generateFakeHTML('qual', '50', []); 
      axios.post.mockResolvedValue({ data: fakeHTML });

      const results = await fetchAllQualifications();

      // Loop should trigger the "pageCount === 0" break and stop immediately
      expect(results).toHaveLength(0);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith('No results on this page, stopping.');
    });
  });

  describe('fetchAllUnitStandards', () => {
    test('should parse commas in total results and paginate properly', async () => {
      // Mock page 1: Says there are 1,020 total (triggering pagination)
      const fakeHTMLPage1 = generateFakeHTML('unitstd', '1,020', [
        { id: '111', name: 'Write Code', level: '5', sector: 'IT' }
      ]);
      
      // Mock page 2: Returns 0 rows, which triggers the safety break 
      // (preventing an infinite loop in the test!)
      const fakeHTMLPage2 = generateFakeHTML('unitstd', '1,020', []);

      axios.post
        .mockResolvedValueOnce({ data: fakeHTMLPage1 })
        .mockResolvedValueOnce({ data: fakeHTMLPage2 });

      const results = await fetchAllUnitStandards();

      // Extracted the number accurately, parsed NQF level, handled multiple pages
      expect(consoleLogSpy).toHaveBeenCalledWith('Total unit standards: 1020');
      expect(results).toHaveLength(1);
      expect(results[0].nqf_level).toBe(5);
      expect(axios.post).toHaveBeenCalledTimes(2); // Attempted to fetch the second page
    });
  });

  describe('fetchSAQAPage (Retry & Error Logic)', () => {
    test('should retry on failure and succeed if subsequent attempt works', async () => {
      const fakeHTML = generateFakeHTML('qual', '1', [{ id: '99', name: 'Pass', level: '4', sector: 'S', originator: 'O' }]);
      
      axios.post
        .mockRejectedValueOnce(new Error('Network Error')) // Attempt 1 fails
        .mockRejectedValueOnce(new Error('Timeout'))       // Attempt 2 fails
        .mockResolvedValueOnce({ data: fakeHTML });        // Attempt 3 succeeds

      const results = await fetchAllQualifications();

      expect(results).toHaveLength(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Attempt 1 failed'));
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Attempt 2 failed'));
      expect(axios.post).toHaveBeenCalledTimes(3);
    });

    test('should throw error after exhausting all retries', async () => {
      axios.post.mockRejectedValue(new Error('Fatal 500 Error')); // Always fails

      // Assert that it throws the error out of the main function
      await expect(fetchAllQualifications()).rejects.toThrow('Fatal 500 Error');
      
      // Verifies it stopped trying after 3 attempts
      expect(axios.post).toHaveBeenCalledTimes(3); 
    });
  });
});