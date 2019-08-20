const log = require('loglevel');
const program = require('commander');
const apify = require('apify-etl-lib')();

const defaultOptions = {
    silent: false,
    debug: false,
    rawDataDir: 'raw',
    getDatasetEndpoint: 'https://api.apify.com/v2/actor-tasks/GET_DATASET_ENDPOINT',
    dataFilename: 'data.json'
};

program
    .description('Retrieves last run dataset items')
    .option('-s, --silent', 'Set log level to warn', defaultOptions.silent)
    .option('-d, --debug', 'Set log level to debug', defaultOptions.debug)
    .option('--raw-data-dir <rawDataDir>', 'Set the raw data directory to archive', defaultOptions.rawDataDir)
    .option('--get-dataset-endpoint <getDatasetEndpoint>', 'Set the apify endpoint to retrieve last successful run dataset items', defaultOptions.getDatasetEndpoint)
    .option('--data-file <dataFile>', 'Set the filename to store the data file to', defaultOptions.dataFile)
    .parse(process.argv)

async function main() {
    log.setLevel(getLogLevel());

    // TODO: make all option names camelCase, so we don't need to transform them
    const options = {
        RAW_DATA_DIR: program.rawDataDir,
        GET_DATASET_ENDPOINT: program.rawDataDir,
        DATA_FILE: program.dataFile
    };

    await apify.archive(options);
}

function getLogLevel() {
    if (program.silent) {
        return log.levels.WARN;
    } else if (program.debug) {
        return log.levels.DEBUG;
    } else {
        return log.levels.INFO;
    }
}

main();
