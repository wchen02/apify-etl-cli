#!/usr/bin/env node
const program = require('commander');
 
program
  .version('1.1.3')
  .command('scrape', 'Scrapes the web to generate dataset items in apify cloud storage')
  .command('retrieve', 'Retrieves last successful run dataset items from apify')
  .command('normalize', 'Normalizes dataset items')
  .command('load', 'Load normalized dataset items into database')
  .command('archive', 'Archives data and downloaded files')
  .parse(process.argv);
