// install dependencies
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();
const PORT = 1111;

// indigenous funding search tool url
const URL =
  'https://www.sac-isc.gc.ca/eng/1351185180120/1351685455328?sb=bn&q=&bp=&fs=000&ag=000&srcDC=521#result';

axios.get(URL).then((res) => {
  const html = res.data;
  //   console.log(html);
  const $ = cheerio.load(html);

  // get rows
  const rows = $('tr').slice(0);
  const allScraped = [];

  rows.each((i, row) => {
    // find all the table cells within this row
    const cells = $(row).find('td');

    // title
    const titleElement = $(cells[0]).find('a');
    const title = titleElement.text().trim();

    // link
    const href = titleElement.attr('href');
    const link = `https://www.sac-isc.gc.ca/${href}`;

    // id
    const id = titleElement.attr('id');

    // instituion
    const institution = $(cells[2]).text().trim();

    // faculty
    const faculty = $(cells[3]).text().trim();

    // status
    const status = $(cells[4]).text().trim();

    // deadline
    const deadline = $(cells[5]).text().trim();

    // store in one object
    const scrapedObj = {
      title,
      link,
      id,
      institution,
      faculty,
      status,
      deadline,
    };

    // push object to array
    allScraped.push(scrapedObj);
    console.log(allScraped);
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
