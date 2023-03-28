FROM ubuntu:jammy

## install python and dependencies
RUN apt update && apt install -y python3 && apt install -y python3-pip
RUN apt install software-properties-common -y

WORKDIR /App/vultron

## install nodejs and dependencies
RUN apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash \
    && apt install -y nodejs

## install geth
RUN add-apt-repository -y ppa:ethereum/ethereum
RUN apt-get install -y ethereum

# install correct version of slither
RUN pip3 install slither-analyzer
# install solc-select to manage solidity compiler versions
RUN pip3 install solc-select

COPY package*.json ./
# also copy patches that have to be applied to installed packages
RUN npm i



COPY ./src/ .


ENTRYPOINT [ "/usr/bin/npm", "run", "deploy"]
