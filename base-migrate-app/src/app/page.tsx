"use client";

import React from "react";
import { ethers } from "ethers";
import ERC20Abi from "../abis/OptimismMintableERC20.json";
import L2StandardBridge from "../abis/config/base.json";
import { Button } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";

function Page() {
  const { navigate } = useSystemFunctions();
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

  return (
    <div className="min-h-[89vh] flex flex-col justify-between items-center pt-20 relative bg-white-100">
      <div className="flex flex-col items-center w-full z-20">
        <h1 className="font-medium text-3xl md:text-5xl xl:text-6xl text-center leading-10 md:max-w-[65%] xl:max-w-[45%] md:leading-[73px] xl:leading-[87px]">
          Migrate ERC20 tokens to Base Network
        </h1>
        <p className="text-black-150 text-sm lg:text-base pt-5 pb-7 text-center leading-5 md:max-w-[60%] xl:max-w-[32%] md:leading-[28px]">
          Automatically deploy canonical bridged ERC20 to base and Create a PR
          on the superchain token list repo.
        </p>
        <Button
          onClick={() => navigate.push("/home")}
          text="Migrate to base"
        />
      </div>

      <div className="absolute bottom-0 asset z-10" />
    </div>
  );
}

export default Page;
