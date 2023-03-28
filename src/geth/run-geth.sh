
# rm -rf $(pwd)/geth/ethereum
# mkdir -p $(pwd)/geth/ethereum

# cp -Rf $(pwd)/geth/keystore $(pwd)/geth/ethereum
# geth --networkid 12345 --datadir $(pwd)/geth/ethereum --dev --dev.period 1  --nodiscover --mine --vmdebug
# geth --datadir $(pwd)/geth/ethereum init $(pwd)/geth/genesis.json
now=`date +"%Y-%m-%d#%H-%M-%S"`
logPath=$(pwd)/logs/geth/$now
mkdir -p  $logPath
geth --config $(pwd)/geth/config.toml --password 12345  --allow-insecure-unlock --verbosity 4 --rpc.enabledeprecatedpersonal   --datadir $(pwd)/geth/ethereum --mine --miner.etherbase=0x3FBeFbD8E37176B804c744B12f984d4e05954bF4 --miner.noverify --miner.threads=5  --txpool.lifetime 0h2m0s 2> $logPath/geth-log.txt
