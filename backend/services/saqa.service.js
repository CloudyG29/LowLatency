const axios = require('axios');
const cheerio = require('cheerio');

const DELAY_MS = 1000;
const PAGE_SIZE = 20;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSAQAPage(cat, start, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Requesting ${cat} page with searchResultsATfirst=${start}`);

      const response = await axios.post(
        'https://allqs.saqa.org.za/search.php',
        new URLSearchParams({
          GO: 'Go',
          cat,

          // THIS is the real pagination key (not "start")
          searchResultsATfirst: String(start),

          QUALIFICATION_TITLE: '',
          QUALIFICATION_ID: '',
          NQF_LEVEL_ID: '',
          NQF_LEVEL_G2_ID: '',
          ABET_BAND_ID: '',
          SUBFIELD_ID: '',
          QUALIFICATION_TYPE_ID: '',
          NQF_SUBFRAMEWORK_ID: '',
          ORIGINATOR_ID: '',
          FIELD_ID: '',
          ACCRED_PROVIDER_ID: '',
          SEARCH_TEXT: '',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          timeout: 15000,
        }
      );

      return cheerio.load(response.data);
    } catch (err) {
      console.warn(`Attempt ${attempt} failed: ${err.message}`);

      if (attempt === retries) throw err;

      await new Promise((r) => setTimeout(r, 1000 * attempt * 2));
    }
  }
}

function parseTotalResults($) {
  const text = $('body').text();

  const match = text.match(/of\s([\d,]+)/);

  if (!match) return 0;

  return parseInt(match[1].replace(/,/g, ''));
}

async function fetchAllQualifications(startFrom = 11525) {
  let start = startFrom;
  let total = null;
  const results = [];

  do {
    console.log(`Fetching qualifications offset=${start}`);

    const $ = await fetchSAQAPage('qual', start);

    if (total === null) {
      total = parseTotalResults($);
      console.log(`Total qualifications: ${total}`);
    }

    let pageCount = 0;

    $('table tr').each((i, row) => {
      if (i === 0) return;

      const cols = $(row).find('td');
      if (cols.length < 8) return;

      const saqa_id = $(cols[0]).text().trim();
      if (!saqa_id || isNaN(saqa_id)) return;

      pageCount++;

      results.push({
        saqa_id,
        name: $(cols[1]).text().trim(),
        nqf_level: parseInt($(cols[3]).text().replace(/\D/g, '')) || null,
        sector: $(cols[5]).text().trim(),
        originator: $(cols[7]).text().trim(),
      });
    });

    console.log(`Rows found: ${pageCount}`);

    if (pageCount === 0) break;

    start += 20;
    await new Promise((r) => setTimeout(r, 1000));

  } while (start < total);

  return results;
}

async function fetchAllUnitStandards(startFrom = 1) {
  let start = startFrom;

  let total = null;

  const results = [];

  do {
    console.log(`\nFetching unit standards: ${start}...`);

    const $ = await fetchSAQAPage('unitstd', start);

    if (total === null) {
      total = parseTotalResults($);

      console.log(`Total unit standards: ${total}`);
    }

    let pageCount = 0;

    $('table tr').each((i, row) => {
      if (i === 0) return;

      const cols = $(row).find('td');

      if (cols.length < 6) return;

      const saqa_id = $(cols[0]).text().trim();

      if (!saqa_id || isNaN(saqa_id)) return;

      pageCount++;

      results.push({
        saqa_id,
        name: $(cols[1]).text().trim(),
        nqf_level:
          parseInt($(cols[3]).text().replace(/\D/g, '')) || null,
        sector: $(cols[5]).text().trim(),
      });
    });

    console.log(`Rows found: ${pageCount}`);

    console.log(
      'Latest Unit Standard IDs:',
      results.slice(-5).map((r) => r.saqa_id)
    );

    if (pageCount === 0) {
      console.log('No results on this page, stopping.');
      break;
    }

    start += PAGE_SIZE;

    await delay(DELAY_MS);

  } while (start <= total);

  return results;
}

module.exports = {
  fetchAllQualifications,
  fetchAllUnitStandards,
  fetchSAQAPage,
  parseTotalResults,
};