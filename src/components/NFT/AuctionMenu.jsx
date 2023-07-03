import React, { useState } from "react";
import {
  useCreateDirectListing,
  useContract,
  Web3Button,
  useAddress,
  useCreateAuctionListing,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";

const AuctionMenu = ({ selectedNft }) => {
  const address = useAddress();
  const router = useRouter();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const listsuccess = (toastHandler1 = toast) =>
    toastHandler1.success(`Auction successful!`, {
      id: "ListSucceed",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  const listfailed = (toastHandler2 = toast) =>
    toastHandler2.error(`Auction Failed!`, {
      id: "Failed",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });

  //Add for Auction
  const { mutateAsync: createAuctionListing } =
    useCreateAuctionListing(marketplace);

  const [isListed, setisListed] = useState(false);

  async function handleCreateAuction(e) {
    // Prevent page from refreshing
    e.preventDefault();

    let formData = new FormData(e.target);

    const values = Object.fromEntries(formData);

    console.log("form values name is", values);

    let transactionResult;

    transactionResult = await auctionListing();

    // If the transaction succeeds, take the user back to the homepage to view their listing!
    if (transactionResult) {
      setisListed(true);
      router.push({
        pathname: `/nfts/${selectedNft.owner}/${selectedNft?.metadata.id}`,
        query: { isListed: isListed },
      });
      listsuccess();
    }
    console.log("Here is The transaction result", transactionResult);

    async function auctionListing() {
      let txResult;

      try {
        txResult = await createAuctionListing({
          assetContractAddress: NFT_COLLECTION_ADDRESS,
          tokenId: selectedNft?.metadata.id,
          startTimestamp: new Date(values.start),
          endTimestamp: new Date(values.end),
          buyoutBidAmount: values.endprice,
          minimumBidAmount: values.startprice,
        });
        return txResult;
      } catch (error) {
        console.error(error);
        listfailed();
      }
      e.target.reset();
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleCreateAuction(e)} className="Flex ">
        <div className=" text-xl mb-6">
          Create Direct Auction
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
            <p className=" text-xs mt-1">
              The Current selected NFT for the Direct lsiting
            </p>
          </div>
          <div className=" mb-6 ">
            <div date-rangepicker class="flex items-center">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  name="start"
                  type="date"
                  id="start"
                  class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date start"
                />
              </div>
              <span class="mx-4 text-white">to</span>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  name="end"
                  id="end"
                  type="date"
                  class="bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date end"
                />
              </div>
            </div>
          </div>
          <div className=" mb-6">
            <span className="flex">
              <p className="text-xl mb-1">Starting bid from</p>
              <p className="text-red-500">*</p>
            </span>
            <input
              required="true"
              name="startprice"
              id="startprice"
              type="text"
              className="bg-slate-700 border hover:border-blue-500 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-slate-800 dark:placeholder-gray-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className=" text-xs mt-1">The starting price of the NFT.</p>
          </div>
        </div>
        <div className=" mb-6">
          <span className="flex">
            <p className="text-xl mb-1">Buyout price</p>
            <p className="text-red-500">*</p>
          </span>
          <input
            required="true"
            name="endprice"
            id="endprice"
            type="text"
            className=" bg-slate-700 border hover:border-blue-500 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-slate-800 dark:placeholder-gray-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className=" text-xs mt-1">The price for selling the NFT.</p>
        </div>
        <div className=" mt-14">
          <hr className="w-screen" />
        </div>
        <div className="fixed right-0 mt-10 mr-7">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-2"
          >
            Create Direct Auction
          </button>
        </div>
      </form>
    </>
  );
};

export default AuctionMenu;
