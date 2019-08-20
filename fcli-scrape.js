const log = require('loglevel');
const program = require('commander');
const apify = require('apify-etl-lib')();
const format = require('date-fns/format');

const today = new Date();

const defaultOptions = {
    silent: false,
    debug: false,
    inputJsonFile: 'input.json',
    dryRun: true,
    requestsPerDay: 500,
    requestDepthsPerDay: 5,
    daily: false,
    startData: format(today, 'MM/DD/YYYY'),
    endDate: format(today, 'MM/DD/YYYY'),
    runTaskEndpoint: 'https://api.apify.com/v2/actor-tasks/RUN_TASK_ENDPOINT'
};

program
    .description('Retrieves last run dataset items')
    .option('-s, --silent', 'Set log level to warn', defaultOptions.silent)
    .option('-d, --debug', 'Set log level to debug', defaultOptions.debug)
    .option('--input-json-file <inputJsonFile>', 'Set the filename of the apify input config json file', defaultOptions.inputJsonFile)
    .option('--dry-run', 'True by default, set dry run to only run against a subset of the target site', defaultOptions.dryRun)
    .option('--requests-per-day <requestsPerDay>', 'Set number of requests per day to scrape', defaultOptions.requestsPerDay)
    .option('--request-depths-per-day <requestDepthsPerDay>', 'Set number of levels of requests deep per day', defaultOptions.requestDepthsPerDay)
    .option('--daily', 'False by default, set daily flag to run against today date', defaultOptions.daily)
    .option('-S, --start-data <startData>', 'Set start date to scrape', defaultOptions.startData)
    .option('-E, --end-date <endDate>', 'Set the end date to scrape', defaultOptions.endDate)
    .option('--run-task-endpoint <runTaskEndpoint>', 'Set the apify run task endpoint', defaultOptions.runTaskEndpoint)
    .parse(process.argv)

async function main() {
    log.setLevel(getLogLevel());

    // TODO: make all option names camelCase, so we don't need to transform them
    const options = {
        INPUT: inputJson,
        DRY_RUN: program.dryRun,
        REQUESTS_PER_DAY: program.requestsPerDay,
        REQUEST_DEPTHS_PER_DAY: program.requestDepthsPerDay,
        DAILY: program.daily,
        START_DATE: program.startData,
        END_DATE: program.endDate,
        RUN_TASK_ENDPOINT: program.runTaskEndpoint,
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
