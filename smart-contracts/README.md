
#### Smart Contracts
Install npm dependencies
```
npm install
```

Install Foundry dependencies
```
forge install
```

Run test
```
forge test
```

Run Coverage
```
forge coverage
```

Deploy and verify contracts on a network
```
// this command will deploy both contracts - BasedMigrateERC20 and BasedERC20Factory
npx hardhat ignition deploy ignition/modules/BasedERC20Factory.ts --network baseSepolia --verify
```
Note: Ensure you add a `.env` file with necessary enviornment variables.