jest.mock('../backend/services/saqa.service', () => ({
  fetchSAQAPage: jest.fn(),
  parseTotalResults: jest.fn(),
}));

jest.mock('../DB_connect/prisma', () => ({
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  qualification: {
    upsert: jest.fn(),
  },
}));

const cheerio = require('cheerio');
const { fetchSAQAPage, parseTotalResults } = require('../backend/services/saqa.service');
const prisma = require('../DB_connect/prisma');
const { seedQualificationsIncremental } = require('../backend/scripts/seed-qualifications');

describe('seed-qualifications script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('seeds fetched qualification rows and stops when the next page is empty', async () => {
    const page1 =
      '<html><body><p>Displaying 1 to 20 of 21 results</p><table><tr><th></th></tr>' +
      '<tr><td>100</td><td>Qualification Name</td><td></td><td>4</td><td></td><td>Sector</td><td></td><td>Originator</td></tr>' +
      '</table></body></html>';
    const page2 =
      '<html><body><p>Displaying 21 to 40 of 21 results</p><table><tr><th></th></tr></table></body></html>';

    fetchSAQAPage.mockResolvedValueOnce(cheerio.load(page1)).mockResolvedValueOnce(cheerio.load(page2));
    parseTotalResults.mockReturnValue(21);
    prisma.qualification.upsert.mockResolvedValue({});

    await seedQualificationsIncremental(1);

    expect(prisma.$connect).toHaveBeenCalledTimes(1);
    expect(prisma.qualification.upsert).toHaveBeenCalledTimes(1);
    expect(prisma.qualification.upsert).toHaveBeenCalledWith({
      where: { saqa_id: '100' },
      update: {
        saqa_id: '100',
        name: 'Qualification Name',
        nqf_level: 4,
        sector: 'Sector',
        originator: 'Originator',
      },
      create: {
        saqa_id: '100',
        name: 'Qualification Name',
        nqf_level: 4,
        sector: 'Sector',
        originator: 'Originator',
      },
    });
    expect(prisma.$disconnect).toHaveBeenCalledTimes(1);
  });
});
