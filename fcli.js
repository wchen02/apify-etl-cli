const program = require('commander');
 
program
  .version('0.0.1')
  .command('normalize', 'Normalizes dataset items')
  .command('archive', 'Archives data and downloaded files')
  .parse(process.argv);
