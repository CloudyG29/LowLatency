require('dotenv').config({ path: '../../.env' });
const { fetchAllQualifications, fetchAllUnitStandards } = require('../services/saqa.service');

async function main() {
  // Scrape first, connect to DB after
  console.log('Scraping qualifications from SAQA...');
  const qualifications = await fetchAllQualifications(0);
  console.log(`Scraped ${qualifications.length} qualifications.`);

  console.log('Scraping unit standards from SAQA...');
  const skills = await fetchAllUnitStandards();
  console.log(`Scraped ${skills.length} unit standards.`);

  // Connect to DB only after all scraping is done
  const prisma = require('../../DB_connect/prisma');

  console.log('Seeding qualifications...');
  for (const q of qualifications) {
    await prisma.qualification.upsert({
      where:  { saqa_id: q.saqa_id },
      update: q,
      create: q,
    });
  }
  console.log(`✓ ${qualifications.length} qualifications seeded.`);

  console.log('Seeding unit standards...');
  for (const s of skills) {
    await prisma.skill.upsert({
      where:  { saqa_id: s.saqa_id },
      update: s,
      create: s,
    });
  }
  console.log(`✓ ${skills.length} skills seeded.`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});