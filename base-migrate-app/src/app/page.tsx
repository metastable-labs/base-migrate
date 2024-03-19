"use client";

import React from "react";
import { ethers } from "ethers";
import ERC20Abi from "../abis/OptimismMintableERC20.json";
import L2StandardBridge from "../abis/config/base.json";
import Landing from "@/pages/landing";
function Page() {
  // const [remoteToken, setRemoteToken] = React.useState("");
  // const [name, setName] = React.useState("");
  // const [symbol, setSymbol] = React.useState("");

  // const handleDeploy = async () => {
  //   if (typeof window?.ethereum !== "undefined") {
  //     try {
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       const provider = new ethers.JsonRpcProvider(window.ethereum);
  //       const signer = await provider.getSigner();

  //       const contractFactory = new ethers.ContractFactory(
  //         ERC20Abi.abi,
  //         ERC20Abi.bytecode,
  //         signer
  //       );
  //       const contract = await contractFactory.deploy(
  //         L2StandardBridge,
  //         remoteToken,
  //         name,
  //         symbol
  //       );
  //       const receipt = await contract.deploymentTransaction();
  //       await receipt?.wait();
  //       const address = contract.getAddress();

  //       console.log("Contract deployed to:", address);
  //     } catch (error) {
  //       console.error("Deployment error:", error);
  //     }
  //   } else {
  //     console.error("MetaMask is not installed");
  //   }
  // };

  return <Landing />;
}

export default Page;
