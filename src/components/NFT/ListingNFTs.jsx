import React, { useState } from "react";
import {
  useCreateDirectListing,
  useContract,
  Web3Button,
  useAddress,
  useNetwork,
  useNetworkMismatch,
  useCreateAuctionListing,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";
// Your smart contract address

const ListingNFTs = ({ selectedNft }) => {
  const address = useAddress();
  const router = useRouter();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  const listsuccess = (toastHandler1 = toast) =>
    toastHandler1.success(`Listing successful!`, {
      id: "Listsucc",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  const listfailed = (toastHandler2 = toast) =>
    toastHandler2.error(`Listing Failed!`, {
      id: "Listfailed",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });

  const [isListed, setisListed] = useState(false);

  async function handleCreateListing(e) {
    // Ensure user is on the correct network

    // Prevent page from refreshing
    e.preventDefault();

    // Store the result of either the direct listing creation or the auction listing creation
    let formData = new FormData(e.target);

    const values = Object.fromEntries(formData);

    console.log("form values name is", values);

    let transactionResult;

    transactionResult = await Listing();

    // If the transaction succeeds, take the user back to the homepage to view their listing!
    if (transactionResult) {
      setisListed(true);
      router.push({
        pathname: `/nfts/${NFT_COLLECTION_ADDRESS}/${selectedNft?.metadata.id}`,
        query: { isListed: isListed },
      });
      listsuccess();
    }
    console.log("Here is The transaction result", transactionResult);
    async function Listing() {
      let txResult;
      try {
        txResult = await createDirectListing({
          assetContractAddress: NFT_COLLECTION_ADDRESS,
          tokenId: selectedNft?.metadata.id,
          pricePerToken: values.price,
          quantity: "1",
        });
        return txResult;
      } catch (error) {
        console.error(error);
        listfailed();
      }
    }

    //e.target.reset();
  }
  return (
    <>
      <form onSubmit={(e) => handleCreateListing(e)} className="Flex ">
        <div className=" text-xl mb-6">
          Create Direct Listing
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
          <div className=" mb-6">
            <p className="text-xl mb-1">Listing Currency</p>
            <select
              type="text"
              className="bg-slate-800 border hover:border-blue-500  text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-slate-800 dark:placeholder-gray-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            >
              <option selected>Choose a currency</option>
              <option value="ETH">ETH(Goerli Ether)</option>
              <option value="WEATH">WETH(Wrapped Ether)</option>
              <option value="USDC">USDC(USD Coin)</option>
            </select>
            <p className=" text-xs mt-1">
              The currency you want to sell your tokens for.
            </p>
          </div>
          <div className=" mb-6">
            <span className="flex">
              <p className="text-xl mb-1">Listing Price</p>
              <p className="text-red-500">*</p>
            </span>
            <input
              required="true"
              name="price"
              id="price"
              type="text"
              className="bg-slate-800 border hover:border-blue-500  text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-slate-800 dark:placeholder-gray-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className=" text-xs mt-1">
              The price of each token you are listing for sale.
            </p>
          </div>
          <div className=" mb-6">
            <span className="flex">
              <p className="text-xl mb-1">Quantity</p>
              <p className="text-red-500">#</p>
            </span>

            <input
              required="true"
              name="quantity"
              id="quantity"
              type="text"
              className="bg-slate-800 border hover:border-blue-500  text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-slate-800 dark:placeholder-gray-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className=" text-xs mt-1">
              The number of tokens to list for sale.
            </p>
          </div>
        </div>
        <div className=" mt-14">
          <hr className="w-screen" />
        </div>
        <div className="fixed right-0 mt-10 mr-7">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-2"
          >
            Create Direct Listing
          </button>
        </div>
      </form>
    </>
  );
};

export default ListingNFTs;
