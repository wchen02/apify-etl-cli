const program = require('commander');
 
program
  .version('0.0.1')
  .command('retrieve', 'Retrieves last successful run dataset items')
  .command('normalize', 'Normalizes dataset items')
  .command('load', 'Load normalized dataset items into database')
  .command('archive', 'Archives data and downloaded files')
  .parse(process.argv);
