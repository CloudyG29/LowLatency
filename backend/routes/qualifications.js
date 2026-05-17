const express = require('express');
const router = express.Router();
const prisma = require('../../DB_connect/prisma');

// GET /api/qualifications?search=engineering&limit=20
router.get('/', async (req, res) => {
  const { search = '', limit = 20 } = req.query;

  try {
    const qualifications = await prisma.qualification.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      take: parseInt(limit),
      orderBy: { name: 'asc' },
      select: {
        qualification_id: true,
        saqa_id: true,
        name: true,
        nqf_level: true,
        sector: true,
        originator: true,
      },
    });

    res.json(qualifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch qualifications' });
  }
});

// GET /api/qualifications/nqf-levels - just the distinct NQF levels for dropdowns
router.get('/nqf-levels', async (req, res) => {
  try {
    const levels = await prisma.qualification.findMany({
      select: { nqf_level: true },
      distinct: ['nqf_level'],
      orderBy: { nqf_level: 'asc' },
    });

    res.json(levels.map(l => l.nqf_level).filter(Boolean));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch NQF levels' });
  }
});

module.exports = router;
