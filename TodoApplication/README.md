# Todo Application

## Migration

    * Run all pending migrations -> ```npm run migrate up```
    * Run only the next migration -> ```npm run migrate 1```
    * To run migrations up to a specific file -> ```npm run migrate up file-name```
    * To run just one migration file -> ```npm run migrate up --file 1676900002000_file-name.js```
    * Undo just the last migration -> ```npm run migrate down 1```
    * Undo N steps -> ```npm run migrate down N```
