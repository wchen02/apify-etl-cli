# apify-etl-cli
Provides a set of ETL CLI commands to extract, transform, and load data into funtofu database.

## Help
Type command or subcommand with -h or --help switch will display the command's usage. 

Example: `fcli -h`

## Commands
### fcli
```bash
Usage: fcli [options] [command]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  scrape         Scrapes the web to generate dataset items in apify cloud storage
  retrieve       Retrieves last successful run dataset items from apify
  normalize      Normalizes dataset items
  load           Load normalized dataset items into database
  archive        Archives data and downloaded files
  help [cmd]     display help for [cmd]
```
### fcli scrape
```bash
Usage: fcli-scrape [options]

Retrieves last run dataset items

Options:
  -s, --silent                                    Set log level to warn (default: false)
  -d, --debug                                     Set log level to debug (default: false)
  --input-json-file <inputJsonFile>               Set the filename of the apify input config json file (default: "input.json")
  --dry-run                                       True by default, set dry run to only run against a subset of the target site (default: true)
  --requests-per-day <requestsPerDay>             Set number of requests per day to scrape (default: 500)
  --request-depths-per-day <requestDepthsPerDay>  Set number of levels of requests deep per day (default: 5)
  --daily                                         False by default, set daily flag to run against today date (default: false)
  -S, --start-data <startData>                    Set start date to scrape (default: "08/20/2019")
  -E, --end-date <endDate>                        Set the end date to scrape (default: "08/20/2019")
  --run-task-endpoint <runTaskEndpoint>           Set the apify run task endpoint (default: "https://api.apify.com/v2/actor-tasks/RUN_TASK_ENDPOINT")
  -h, --help                                      output usage information
  ```

### fcli retrieve
```bash
Usage: fcli-retrieve [options]

Retrieves last run dataset items

Options:
  -s, --silent                                 Set log level to warn (default: false)
  -d, --debug                                  Set log level to debug (default: false)
  --raw-data-dir <rawDataDir>                  Set the raw data directory to archive (default: "raw")
  --get-dataset-endpoint <getDatasetEndpoint>  Set the apify endpoint to retrieve last successful run dataset items (default: "https://api.apify.com/v2/actor-tasks/GET_DATASET_ENDPOINT")
  --data-file <dataFile>                       Set the filename to store the data file to
  -h, --help                                   output usage information
```

### fcli normalize
```bash
Usage: fcli-normalize [options]

Normalizes data extracted with scraper. Normalizer will parse data json files and populate meaningful data into the transformed data json.

Options:
  -s, --silent                                                Set log level to warn (default: false)
  -d, --debug                                                 Set log level to debug (default: false)
  --download-dir <downloadDir>                                Set the download directory to archive (default: "attachs")
  --raw-data-dir <rawDataDir>                                 Set the raw data directory to archive (default: "raw")
  --normalized-data-dir <normalizedDataDir>                   Set the normalized data directory to archive (default: "normalized")
  -c, --max-concurrency <maxConcurrency>                      Set max concurrent async requests to process at a time (default: 10)
  --life-list-thumbnail-width <lifeListThumbnailWidth>        Set the width of life list thumbnail (default: 120)
  --list-list-thubmnail-height <lifeListThumbnailHeight>      Set the height of life list thumbnail (default: 77)
  --life-detail-thumbnail-width <lifeDetailThumbnailWidth>    Set the width of life detail thumbnail (default: 400)
  --life-detail-thumbnail-height <lifeDetailThumbnailHeight>  Set the height of life detail thumbnail (default: 300)
  -D, --development                                           Set development mode to true (default: true)
  --data-file <dataFile>                                      Set the data file to process in development (default: "example.json")
  -h, --help                                                  output usage information
```

### fcli load
```bash
Usage: fcli-load [options]

Retrieves last run dataset items

Options:
  -s, --silent                               Set log level to warn (default: false)
  -d, --debug                                Set log level to debug (default: false)
  -H, --host <host>                          Set database host (default: "localhost")
  -u, --user <user>                          Set database user (default: "root")
  -p, --password <password>                  Set database password (default: "")
  -D, --database <database>                  Set database name (default: "mydatabase")
  --normalized-data-dir <normalizedDataDir>  Set the normalized data directory to archive (default: "normalized")
  -h, --help                                 output usage information
```

### fcli archive
```bash
Usage: fcli-archive [options]

Retrieves last run dataset items

Options:
  -s, --silent                               Set log level to warn (default: false)
  -d, --debug                                Set log level to debug (default: false)
  --download-dir <downloadDir>               Set the download directory to archive (default: "download")
  --raw-data-dir <rawDataDir>                Set the raw data directory to archive (default: "raw")
  --normalized-data-dir <normalizedDataDir>  Set the normalized data directory to archive (default: "normalized")
  --archived-dir <archivedDir>               Set the destination archived directory (default: "archived")
  -h, --help                                 output usage information
```