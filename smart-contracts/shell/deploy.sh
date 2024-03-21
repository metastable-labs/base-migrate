#!/bin/bash

# Install Forge dependencies
forge install

# Print the initial deploying message
echo "Deploying Contracts..."

source .env

read -p "Press enter to begin the deployment..."

forge script script/deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast -vvvv --private-key $PRIVATE_KEY --verify --delay 15 --watch