require('dotenv').config({ path: '../../.env' });

const { fetchSAQAPage, parseTotalResults } = require('../services/saqa.service');
const prisma = require('../../DB_connect/prisma');

const PAGE_SIZE = 20;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function seedQualificationsIncremental(startFrom = 11525) {
  let start = startFrom;
  let total = null;
  let seeded = 0;

  do {
    console.log(`\nFetching qualifications: start=${start}`);

    const $ = await fetchSAQAPage('qual', start);

    if (total === null) {
      total = parseTotalResults($);
      console.log(`Total qualifications found: ${total}`);
    }

    let pageCount = 0;
    const pageRecords = [];

    $('table tr').each((i, row) => {
      if (i === 0) return;

      const cols = $(row).find('td');

      if (cols.length < 8) return;

      const saqa_id = $(cols[0]).text().trim();

      if (!saqa_id || isNaN(saqa_id)) return;

      pageCount++;

      pageRecords.push({
        saqa_id,
        name: $(cols[1]).text().trim(),
        nqf_level:
          parseInt($(cols[3]).text().replace(/\D/g, '')) || null,
        sector: $(cols[5]).text().trim(),
        originator: $(cols[7]).text().trim(),
      });
    });

    console.log(`Rows found on page: ${pageCount}`);

    if (pageRecords.length > 0) {
      console.log(
        'Sample SAQA IDs:',
        pageRecords.slice(0, 5).map((q) => q.saqa_id)
      );
    }

    if (pageCount === 0) {
      console.log('Empty page detected. Stopping...');
      break;
    }

    try {
      await prisma.$connect();
    } catch (e) {
      console.log('Reconnect attempt...');
    }

    for (const q of pageRecords) {
      try {
        await prisma.qualification.upsert({
          where: { saqa_id: q.saqa_id },
          update: q,
          create: q,
        });

        seeded++;
      } catch (err) {
        console.warn(`Skipping ${q.saqa_id}: ${err.message}`);
      }
    }

    console.log(`✓ Total seeded so far: ${seeded}`);

    // IMPORTANT:
    // SAQA pagination uses 1, 21, 41...
    start += PAGE_SIZE;

    await delay(1000);

  } while (start <= total);

  console.log(`\nDone! Final seeded count: ${seeded}`);

  await prisma.$disconnect();
}

async function runSeed() {
  try {
    await seedQualificationsIncremental();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  runSeed();
}

module.exports = {
  seedQualificationsIncremental,
};