const { PrismaClient } = require('../../generated');
const { fetchAllQualifications, fetchAllUnitStandards } = require('../services/saqa.service');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding qualifications from SAQA...');
  const qualifications = await fetchAllQualifications();

  for (const q of qualifications) {
    await prisma.qualification.upsert({
      where:  { saqa_id: q.saqa_id },
      update: q,
      create: q,
    });
  }
  console.log(`✓ ${qualifications.length} qualifications seeded.`);

  console.log('Seeding unit standards from SAQA...');
  const skills = await fetchAllUnitStandards();

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
  prisma.$disconnect();
  process.exit(1);
});