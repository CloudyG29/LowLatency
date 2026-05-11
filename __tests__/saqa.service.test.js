const axios = require('axios');

jest.mock('axios');

const cheerio = require('cheerio');
const { fetchAllQualifications, fetchAllUnitStandards } = require('../backend/services/saqa.service');

describe('SAQA Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllQualifications', () => {
    test('should fetch and parse qualifications correctly', async () => {
      // Mock HTML response
      const mockHtml = `
        <html>
          <body>
            Page 1 of 1 of 40
            <table>
              <tr><th>ID</th><th>Name</th><th>Level</th><th>Sector</th><th>Originator</th></tr>
              <tr><td>12345</td><td>Qualification 1</td><td></td><td>NQF Level 4</td><td></td><td>Sector A</td><td></td><td>Originator A</td></tr>
              <tr><td>67890</td><td>Qualification 2</td><td></td><td>NQF Level 5</td><td></td><td>Sector B</td><td></td><td>Originator B</td></tr>
            </table>
          </body>
        </html>
      `;

      axios.post.mockResolvedValue({ data: mockHtml });

      // Mock cheerio.load to return a mock $ function
      const mockBody = {
        text: jest.fn().mockReturnValue('Page 1 of 1 of 40')
      };

      const mockRows = [
        {}, // header
        {
          find: jest.fn().mockReturnValue({
            length: 8,
            text: jest.fn()
              .mockReturnValueOnce('12345')
              .mockReturnValueOnce('Qualification 1')
              .mockReturnValueOnce('')
              .mockReturnValueOnce('NQF Level 4')
              .mockReturnValueOnce('')
              .mockReturnValueOnce('Sector A')
              .mockReturnValueOnce('')
              .mockReturnValueOnce('Originator A')
          })
        },
        {
          find: jest.fn().mockReturnValue({
            length: 8,
            text: jest.fn()
              .mockReturnValueOnce('67890')
              .mockReturnValueOnce('Qualification 2')
              .mockReturnValueOnce('')
              .mockReturnValueOnce('NQF Level 5')
              .mockReturnValueOnce('')
              .mockReturnValueOnce('Sector B')
              .mockReturnValueOnce('')
              .mockReturnValueOnce('Originator B')
          })
        }
      ];

      const mockTable = {
        find: jest.fn().mockReturnValue({
          each: jest.fn((callback) => {
            mockRows.forEach((row, i) => callback(i, row));
          })
        })
      };

      const mock$ = jest.fn((selector) => {
        if (selector === 'body') return mockBody;
        if (selector === 'table tr') return mockTable;
        return { each: jest.fn() };
      });

      cheerio.load.mockReturnValue(mock$);

      const result = await fetchAllQualifications();

      expect(result).toEqual([
        { saqa_id: '12345', name: 'Qualification 1', nqf_level: 4, sector: 'Sector A', originator: 'Originator A' },
        { saqa_id: '67890', name: 'Qualification 2', nqf_level: 5, sector: 'Sector B', originator: 'Originator B' }
      ]);

      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('should handle no results', async () => {
      const mockHtml = `
        <html>
          <body>
            Page 1 of 1 of 0
            <table></table>
          </body>
        </html>
      `;

      axios.post.mockResolvedValue({ data: mockHtml });

      const mockBody = {
        text: jest.fn().mockReturnValue('Page 1 of 1 of 0')
      };

      const mockTable = {
        find: jest.fn().mockReturnValue({
          each: jest.fn(() => {}) // No rows
        })
      };

      const mock$ = jest.fn((selector) => {
        if (selector === 'body') return mockBody;
        if (selector === 'table tr') return mockTable;
        return { each: jest.fn() };
      });

      cheerio.load.mockReturnValue(mock$);

      const result = await fetchAllQualifications();

      expect(result).toEqual([]);
    });
  });

  describe('fetchAllUnitStandards', () => {
    test('should fetch and parse unit standards correctly', async () => {
      const mockHtml = `
        <html>
          <body>
            Page 1 of 1 of 20
            <table>
              <tr><th>ID</th><th>Name</th><th>Level</th><th>Sector</th></tr>
              <tr><td>11111</td><td>Unit Standard 1</td><td></td><td>NQF Level 3</td><td></td><td>Sector C</td></tr>
            </table>
          </body>
        </html>
      `;

      axios.post.mockResolvedValue({ data: mockHtml });

      const mockBody = {
        text: jest.fn().mockReturnValue('Page 1 of 1 of 20')
      };

      const mockRows = [
        {}, // header
        {
          find: jest.fn().mockReturnValue({
            length: 6,
            text: jest.fn()
              .mockReturnValueOnce('11111')
              .mockReturnValueOnce('Unit Standard 1')
              .mockReturnValueOnce('')
              .mockReturnValueOnce('NQF Level 3')
              .mockReturnValueOnce('')
              .mockReturnValueOnce('Sector C')
          })
        }
      ];

      const mockTable = {
        find: jest.fn().mockReturnValue({
          each: jest.fn((callback) => {
            mockRows.forEach((row, i) => callback(i, row));
          })
        })
      };

      const mock$ = jest.fn((selector) => {
        if (selector === 'body') return mockBody;
        if (selector === 'table tr') return mockTable;
        return { each: jest.fn() };
      });

      cheerio.load.mockReturnValue(mock$);

      const result = await fetchAllUnitStandards();

      expect(result).toEqual([
        { saqa_id: '11111', name: 'Unit Standard 1', nqf_level: 3, sector: 'Sector C' }
      ]);
    });
  });
});