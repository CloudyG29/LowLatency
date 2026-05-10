const axios = require('axios');
const cheerio = require('cheerio');

const DELAY_MS = 500;
const PAGE_SIZE = 20;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSAQAPage(cat, start) {
  const response = await axios.post(
    'https://regqs.saqa.org.za/search.php',
    new URLSearchParams({
      cat,
      button: 'Search',
      start,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return cheerio.load(response.data);
}

function parseTotalResults($) {
  const text = $('body').text();
  const match = text.match(/of\s([\d,]+)/);
  if (!match) return 0;
  return parseInt(match[1].replace(',', ''));
}

async function fetchAllQualifications() {
  let start = 0;
  let total = null;
  const results = [];

  do {
    console.log(`Fetching qualifications: ${start}...`);
    const $ = await fetchSAQAPage('qual', start);

    if (total === null) {
      total = parseTotalResults($);
      console.log(`Total qualifications: ${total}`);
    }

    $('table tr').each((i, row) => {
      if (i === 0) return;
      const cols = $(row).find('td');
      if (cols.length < 8) return;

      results.push({
        saqa_id:    $(cols[0]).text().trim(),
        name:       $(cols[1]).text().trim(),
        nqf_level:  parseInt($(cols[3]).text().replace(/\D/g, '')) || null,
        sector:     $(cols[7]).text().trim(),
        originator: $(cols[6]).text().trim(),
      });
    });

    start += PAGE_SIZE;
    await delay(DELAY_MS);
  } while (start < total);

  return results;
}

async function fetchAllUnitStandards() {
  let start = 0;
  let total = null;
  const results = [];

  do {
    console.log(`Fetching unit standards: ${start}...`);
    const $ = await fetchSAQAPage('unitstd', start);

    if (total === null) {
      total = parseTotalResults($);
      console.log(`Total unit standards: ${total}`);
    }

    $('table tr').each((i, row) => {
      if (i === 0) return;
      const cols = $(row).find('td');
      if (cols.length < 6) return;

      results.push({
        saqa_id:   $(cols[0]).text().trim(),
        name:      $(cols[1]).text().trim(),
        nqf_level: parseInt($(cols[3]).text().replace(/\D/g, '')) || null,
        sector:    $(cols[5]).text().trim(),
      });
    });

    start += PAGE_SIZE;
    await delay(DELAY_MS);
  } while (start < total);

  return results;
}

module.exports = { fetchAllQualifications, fetchAllUnitStandards };