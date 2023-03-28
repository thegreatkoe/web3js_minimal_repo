#!/bin/bash

docker run -v $(pwd)/output/logs:/App/vultron/logs -it  web3-min-test
