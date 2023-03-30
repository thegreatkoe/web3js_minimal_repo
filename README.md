# web3js_minimal_repo

Minimal repo to reproduce issue with deploying contract to chain.

## Issue

Somewhere between `onTransactionReceipt` and returning the new contract instance `web3` supends the programm and stops the execution.

## Steps to reproduce

### Local

- `npm i` 
- `cd src/`
- `. ./geth/run-geth.sh`
- `node deploy.js`

### Docker
- `docker build -t <NAME> .`
- `runDeploy.sh`

## Logs

Js logs are printed to the console in both cases.

### Local

Chainlogs can be found inside `src/logs/geth`

### Docker

Chainlogs can be found insied `output/logs/geth`

