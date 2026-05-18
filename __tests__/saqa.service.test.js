const axios = require('axios');

jest.mock('axios');

const {
  fetchSAQAPage,
  parseTotalResults,
  fetchAllQualifications,
  fetchAllUnitStandards,
} = require('../backend/services/saqa.service');

describe('saqa.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchSAQAPage', () => {
    test('posts the expected form data and returns a cheerio root', async () => {
      axios.post.mockResolvedValue({
        data: '<html><body><table><tr><th></th></tr><tr><td>123</td><td>Name</td><td></td><td>4</td><td></td><td>Sector</td><td></td><td>Originator</td></tr></table></body></html>',
      });

      const $ = await fetchSAQAPage('qual', 1);

      expect(axios.post).toHaveBeenCalledWith(
        'https://allqs.saqa.org.za/search.php',
        expect.any(URLSearchParams),
        expect.objectContaining({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 15000,
        })
      );
      expect($('td').first().text()).toBe('123');
    });

    test('retries once after a transient request failure', async () => {
      jest.useFakeTimers();

      axios.post
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          data: '<html><body><table><tr><th></th></tr></table></body></html>',
        });

      const promise = fetchSAQAPage('qual', 1);
      await jest.runAllTimersAsync();
      const $ = await promise;

      expect(axios.post).toHaveBeenCalledTimes(2);
      expect($('table').length).toBe(1);

      jest.useRealTimers();
    });
  });

  describe('parseTotalResults', () => {
    test('parses total result counts from page text', () => {
      const $ = () => ({
        text: () => 'Displaying 1 to 20 of 2,345 results',
      });

      expect(parseTotalResults($)).toBe(2345);
    });

    test('returns 0 when no total count is present', () => {
      const $ = () => ({
        text: () => 'No matches found',
      });

      expect(parseTotalResults($)).toBe(0);
    });
  });

  describe('fetchAllQualifications', () => {
    test('collects qualifications across pages until no more results', async () => {
      jest.useFakeTimers();

      axios.post
        .mockResolvedValueOnce({
          data:
            '<html><body><p>Displaying 1 to 20 of 41 results</p><table><tr><th></th></tr>' +
            '<tr><td>100</td><td>Qualification Name</td><td></td><td>4</td><td></td><td>Sector</td><td></td><td>Originator</td></tr>' +
            '</table></body></html>',
        })
        .mockResolvedValueOnce({
          data:
            '<html><body><p>Displaying 21 to 40 of 41 results</p><table><tr><th></th></tr></table></body></html>',
        });

      const promise = fetchAllQualifications(1);
      await jest.runAllTimersAsync();
      const results = await promise;

      expect(results).toEqual([
        {
          saqa_id: '100',
          name: 'Qualification Name',
          nqf_level: 4,
          sector: 'Sector',
          originator: 'Originator',
        },
      ]);
      expect(axios.post).toHaveBeenCalledTimes(2);

      jest.useRealTimers();
    });
  });

  describe('fetchAllUnitStandards', () => {
    test('collects unit standards until the empty page stops the loop', async () => {
      jest.useFakeTimers();

      axios.post
        .mockResolvedValueOnce({
          data:
            '<html><body><p>Displaying 1 to 20 of 21 results</p><table><tr><th></th></tr>' +
            '<tr><td>200</td><td>Unit Standard Name</td><td></td><td>5</td><td></td><td>Unit Sector</td></tr>' +
            '</table></body></html>',
        })
        .mockResolvedValueOnce({
          data: '<html><body><p>Displaying 21 to 40 of 21 results</p><table><tr><th></th></tr></table></body></html>',
        });

      const promise = fetchAllUnitStandards(1);
      await jest.runAllTimersAsync();
      const results = await promise;

      expect(results).toEqual([
        {
          saqa_id: '200',
          name: 'Unit Standard Name',
          nqf_level: 5,
          sector: 'Unit Sector',
        },
      ]);
      expect(axios.post).toHaveBeenCalledTimes(2);

      jest.useRealTimers();
    });
  });
});
