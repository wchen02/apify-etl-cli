const log = require('loglevel');
const program = require('commander');
const apify = require('apify-etl-lib')();

const defaultOptions = {
    silent: false,
    debug: false,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase',
    normalizedDataDir: 'normalized',
};

program
    .description('Retrieves last run dataset items')
    .option('-s, --silent', 'Set log level to warn', defaultOptions.silent)
    .option('-d, --debug', 'Set log level to debug', defaultOptions.debug)
    .option('-H, --host <host>', 'Set database host', defaultOptions.host)
    .option('-u, --user <user>', 'Set database user', defaultOptions.user)
    .option('-p, --password <password>', 'Set database password', defaultOptions.password)
    .option('-D, --database <database>', 'Set database name', defaultOptions.database)
    .option('--normalized-data-dir <normalizedDataDir>', 'Set the normalized data directory to archive', defaultOptions.normalizedDataDir)
    .parse(process.argv)

async function main() {
    log.setLevel(getLogLevel());

    const options = {
        logLevel: getLogLevel(),
        db: {
            host: program.host,
            user: program.user,
            password: program.password,
            database: program.database,
        },
        dataDir: program.normalizedDataDir,
    };

    await apify.load(options);
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
