const log = require('loglevel');
const program = require('commander');
const apify = require('apify-etl-lib')();

const defaultOptions = {
    silent: false,
    debug: false,
    maxConcurrency: 10,
    lifeListThumbnailWidth: 120,
    lifeListThumbnailHeight: 77,
    lifeDetailThumbnailWidth: 400,
    lifeDetailThumbnailHeight: 300,
    development: true,
    dataFile: 'example.json',
    downloadDir: 'attachs',
    rawDataDir: 'raw',
    normalizedDataDir: 'normalized',
};

program
    .description('Normalizes data extracted with scraper. Normalizer will parse data json files and populate meaningful data into the transformed data json.')
    .option('-s, --silent', 'Set log level to warn', defaultOptions.silent)
    .option('-d, --debug', 'Set log level to debug', defaultOptions.debug)
    .option('--download-dir <downloadDir>', 'Set the download directory to archive', defaultOptions.downloadDir)
    .option('--raw-data-dir <rawDataDir>', 'Set the raw data directory to archive', defaultOptions.rawDataDir)
    .option('--normalized-data-dir <normalizedDataDir>', 'Set the normalized data directory to archive', defaultOptions.normalizedDataDir)
    .option('-c, --max-concurrency <maxConcurrency>', 'Set max concurrent async requests to process at a time', defaultOptions.maxConcurrency)
    .option('--life-list-thumbnail-width <lifeListThumbnailWidth>', 'Set the width of life list thumbnail', defaultOptions.lifeListThumbnailWidth)
    .option('--list-list-thubmnail-height <lifeListThumbnailHeight>', 'Set the height of life list thumbnail', defaultOptions.lifeListThumbnailHeight)
    .option('--life-detail-thumbnail-width <lifeDetailThumbnailWidth>', 'Set the width of life detail thumbnail', defaultOptions.lifeDetailThumbnailWidth)
    .option('--life-detail-thumbnail-height <lifeDetailThumbnailHeight>', 'Set the height of life detail thumbnail', defaultOptions.lifeDetailThumbnailHeight)
    .option('-D, --development', 'Set development mode to true', defaultOptions.development)
    .option('--data-file <dataFile>', 'Set the data file to process in development', defaultOptions.dataFile)
    .parse(process.argv)

async function main() {
    log.setLevel(getLogLevel());

    // TODO: make all option names camelCase, so we don't need to transform them
    const options = {
        MAX_CONCURRENCY: program.maxConcurrency,
        LOG_LEVEL: getLogLevel(),
        lifeListThumbnail: {
            LIFE_LIST_THUMBNAIL_WIDTH: program.lifeListThumbnailWidth,
            LIFE_LIST_THUMBNAIL_HEIGHT: program.lifeListThumbnailHeight,
        },
        lifeDetailThumbnail: {
            LIFE_DETAIL_THUMBNAIL_WIDTH: program.lifeDetailThumbnailWidth,
            LIFE_DETAIL_THUMBNAIL_HEIGHT: program.lifeDetailThumbnailHeight,
        },
        DEVELOPMENT: program.development,
        DATA_FILE: program.dataFile,
        dir: {
            DOWNLOAD_DIR: program.downloadDir,
            RAW_DATA_DIR: program.rawDataDir,
            NORMALIZED_DATA_DIR: program.normalizedDataDir,
        }
    };

    await apify.normalize(options);
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
