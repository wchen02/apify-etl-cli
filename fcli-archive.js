const log = require('loglevel');
const program = require('commander');
const apify = require('apify-etl-lib')();

const defaultOptions = {
    silent: false,
    debug: false,
    downloadDir: 'download',
    rawDataDir: 'raw',
    normalizedDataDir: 'normalized',
    archivedDir: 'archived'
};

program
    .description('Retrieves last run dataset items')
    .option('-s, --silent', 'Set log level to warn', defaultOptions.silent)
    .option('-d, --debug', 'Set log level to debug', defaultOptions.debug)
    .option('--download-dir <downloadDir>', 'Set the download directory to archive', defaultOptions.downloadDir)
    .option('--raw-data-dir <rawDataDir>', 'Set the raw data directory to archive', defaultOptions.rawDataDir)
    .option('--normalized-data-dir <normalizedDataDir>', 'Set the normalized data directory to archive', defaultOptions.normalizedDataDir)
    .option('--archived-dir <archivedDir>', 'Set the destination archived directory', defaultOptions.archivedDir)
    .option('--archived-download-dir <archivedDownloadDir>', 'Set the destination archived download directory')
    .option('--archived-raw-data-dir <archivedRawDataDir>', 'Set the destination archived raw data directory')
    .option('--archived-normalized-data-dir <archivedNormalizedDataDir>', 'Set the destination archived normalized directory')
    .option('--skip-archive-download', 'Skips archiving download directory')
    .parse(process.argv)

async function main() {
    log.setLevel(getLogLevel());

    // TODO: make all option names camelCase, so we don't need to transform them
    const options = {
        ARCHIVED_DIR: program.archivedDir,
        DOWNLOAD_DIR: program.downloadDir,
        RAW_DATA_DIR: program.rawDataDir,
        NORMALIZED_DATA_DIR: program.normalizedDataDir,
        ARCHIVED_DOWNLOAD_DIR: program.archivedDownloadDir,
        ARCHIVED_RAW_DATA_DIR: program.archivedRawDataDir,
        ARCHIVED_NORMALIZED_DATA_DIR: program.archivedNormalizedDataDir,
        SKIP_ARCHIVE_DOWNLOAD: program.skipArchiveDownload,
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
