import React from "react";
import { useBurnNFT, useContract } from "@thirdweb-dev/react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";
import toast, { Toaster } from "react-hot-toast";

const Burn = ({ selectedNft }) => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);

  const { mutate: burnNFT, isLoading, error } = useBurnNFT(contract);
  if (error) {
    console.error("failed to burn NFT", error);
  }

  return (
    <>
      <div className="Flex ">
        <div className=" text-4xl mb-6 font-body font-bold">
          Burn An NFT
          <hr className="w-screen mt-5" />
        </div>
        <div>
          <div className="mb-4">
            <p className="text-xl mb-1">Selected NFT</p>
            <div className="flex">
              <img src={selectedNft?.metadata.image} alt="NFT" className="" />
              <div className="mt-16">
                <div className=" flex ml-4">
                  Name:
                  <p className="text-md text-yellow-600">
                    {selectedNft?.metadata.name}
                  </p>
                </div>
                <div className="flex ml-4 mt-5">
                  ID:{" "}
                  <p className="text-md text-yellow-600">
                    {selectedNft?.metadata.id}
                  </p>
                </div>
                <div className=" ml-4 text-xs mt-5">
                  Owner:{" "}
                  <p className="text-md text-yellow-600">
                    {selectedNft?.owner}
                  </p>
                </div>
              </div>
            </div>
            <p className=" text-xl mt-5">
              Burning this NFT will remove it from your wallet. The NFT data
              will continue to be accessible but no one will be able to claim
              ownership over it again. This action is irreversible.
            </p>
          </div>
        </div>
        <div className="fixed right-0 mt-10 mr-7">
          <button
            disabled={isLoading}
            onClick={() =>
              burnNFT({ tokenId: selectedNft?.metadata.id, amount: 1 })
            }
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-2"
          >
            Burn!
          </button>
        </div>
      </div>
    </>
  );
};
export default Burn;
