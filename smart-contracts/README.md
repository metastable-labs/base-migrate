## Based Migrate Smart Contracts

### Installation
```
forge install
```

### Testing

```
forge test
```

### Check Coverage
```
forge coverage
```

### Deploy and verify contracts on a network

#### Setup enviornment variables
Create a `.env` file and add enviornment variables as specified in `.env.example`
```
ETHERSCAN_API_KEY=
BASESCAN_API_KEY=
PRIVATE_KEY=
INFURA_KEY=
RPC_URL=https://base-sepolia-rpc.publicnode.com
L2_BRIDGE_ADDRESS=
```

#### Deploy
```
bash shell/deploy.sh --chain $CHAIN
```

Note: Ensure the RPC URL added to enviornment variable is for the specified CHAIN.

#### Chains currently supported:
1. baseSepolia
2. base
3. mainnet
4. sepolia

#### To add new chain
1. Open `foundry.toml` file.
2. Below the already defined chains, add a new chain definition
```
chainName = { key = "$CHAINSCAN_API_KEY",  url = "SCANNER_API_URL"}
```
3. Finally the new addition will look like this
```
[etherscan]
baseSepolia = {key = "$ETHERSCAN_API_KEY", url = "https://api-sepolia.basescan.org/api"}
base = {key = "$ETHERSCAN_API_KEY", url = "https://api.basescan.org/api"}
mainnet = {key = "$ETHERSCAN_API_KEY"}
sepolia = {key = "$ETHERSCAN_API_KEY"}
chainName = { key = "$ETHERSCAN_API_KEY",  url = "SCANNER_API_URL"}
```

here: $ETHERSCAN_API_KEY is the API KEY generated from the blockscanner to verify the contract and SCANNER_API_URL is the API url of the blockscanner of the chain.