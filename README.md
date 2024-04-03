# Base Migration Tool

The Base Migration Tool is a comprehensive solution designed for projects looking to migrate their ERC20 tokens to the Base blockchain. This tool simplifies the migration process, ensuring a smooth transition to Base, a highly scalable and developer-friendly blockchain. It automates critical steps, including the deployment of a canonical bridged ERC20 token to Base, managing pull requests for token metadata updates, and submitting metadata to prominent blockchain explorers and data aggregators.

Essentially, the Base Migrate tool automates and simplify the process here: https://docs.base.org/tokens/list/

## Features

- **Automated Deployment**: Automatically deploys a canonical bridged version of your ERC20 token to the Base blockchain, ensuring compatibility and seamless integration.
- **Metadata Management**: Opens pull requests with updated token metadata to the Superchain token list repository, facilitating the visibility and recognition of your token within the ecosystem.
- **Metadata Submission**: Submits your token's metadata to leading blockchain explorers and data aggregators such as Etherscan, Blockscout, and CoinGecko, enhancing your token's accessibility and credibility.

It uses the Base developed smart contracts to create the tokens on the new networks. Information about the deployment addresses can be found in the Base documentation.
- https://docs.base.org/base-contracts/

## Tasks

- [x] **Token Contract Development**: Design and implement the smart contract for the token, ensuring it meets the ERC20 Base standard bridge contract
- [x] **Migrate from foundry to hardhat**
- [x] **Token Repository Integration**: Implement backend APIs that automate the process of creating and submitting pull requests to the Optimism token list repository.
- [x] **Metadata Distribution System**: Create backend services that automate the submission of the token's metadata to major blockchain explorers and data aggregators such as Etherscan, Blockscout, and CoinGecko.
- [x] **Implement Frontend app**

## Getting started

### The code

Base-Migrate uses a monorepo which includes all the services and applications we develop.

```
# get the code
git clone https://github.com/njokuScript/base-migrate
cd base-migrate
```
You'll need [yarn](https://yarnpkg.com) installed globally.

```
yarn
# install all dependencies
```

Build all packages:

```
yarn build
```

To execute commands inside the repo, we use the pattern `yarn workspace <workspace name> <command>`

## Contributing

Contributions are welcome! If you have a feature request, bug report, or pull request, please feel free to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the project maintainers directly.

## Acknowledgments

- Thanks to the Base and Ethereum communities for their invaluable resources and support.
