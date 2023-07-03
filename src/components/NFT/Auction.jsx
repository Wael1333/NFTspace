import React, { useState } from "react";
import {
  useCreateDirectListing,
  useContract,
  Web3Button,
  useAddress,
  useValidEnglishAuctions,
  useCreateAuctionListing,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";

const Auction = ({ selectedNft, buyoutvalue, minmimid }) => {
  const address = useAddress();
  const router = useRouter();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  //adding auction
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: selectedNft?.metadata.id,
    });

  async function checkAndProvideApproval() {
    const hasApproval = await nftCollection?.call(
      "isApprovedForAll",
      selectedNft?.owner,
      MARKETPLACE_ADDRESS
    );

    if (!hasApproval) {
      const txResult = await nftCollection?.call(
        "setApprovalForAll",
        MARKETPLACE_ADDRESS,
        true
      );

      if (txResult) {
        console.log("Approval provided");
      }
    }

    return true;
  }

  const listsuccess = (toastHandler1 = toast) =>
    toastHandler1.success(`Bid successful!`, {
      id: "AuctionSucceded",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  const listfailed = (toastHandler2 = toast) =>
    toastHandler2.error(`Bid Failed!`, {
      id: "atuctionfailed",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  const [bidValue, setBidValue] = useState();

  async function handleCreateListing(e) {
    // Prevent page from refreshing
    e.preventDefault();

    let formData = new FormData(e.target);

    const values = Object.fromEntries(formData);

    console.log("form values name is", values);

    let transactionResult;

    transactionResult = await createBidOffer();

    // If the transaction succeeds, take the user back to the homepage to view their listing!
    if (transactionResult) {
      setisListed(true);
      router.push({
        pathname: `/nfts/${NFT_COLLECTION_ADDRESS}/${selectedNft?.metadata.id}}`,
        query: { isListed: isListed },
      });
      listsuccess();
    }

    console.log("Here is The transaction result", transactionResult);

    setBidValue(values.price);

    async function createBidOffer() {
      let txResult;
      try {
        if (!bidValue) {
          return;
        }

        if (auctionListing?.[0]) {
          txResult = await marketplace?.englishAuctions.makeBid(
            auctionListing[0].id,
            bidValue
          );
        } else if (directListing?.[0]) {
          txResult = await marketplace?.offers.makeOffer({
            assetContractAddress: NFT_COLLECTION_ADDRESS,
            tokenId: nft.metadata.id,
            totalPrice: bidValue,
          });
        } else {
          throw new Error("No listing found");
        }
      } catch (error) {
        alert(error);
        listfailed();
      }
      return txResult;
    }
     e.target.reset();
  }
  return (
    <>
      <form onSubmit={(e) => handleCreateListing(e)} className="Flex ">
        <div className=" text-xl mb-6">
          Make your offer
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
          <div className="justify-start mt-6 w-[36rem] h-[10rem] rounded-3xl bg-slate-600">
            {!loadingAuction && (
              <div className="ml-5">
                <p className=" text-2xl"> Price:</p>
                <div className="flex">
                  <p className="text-2xl text-gray-300 font-extrabold">
                    {buyoutvalue} MATIC
                  </p>
                </div>
                <p className=" text-2xl mt-3 "> Bid starts from:</p>
                <div className="flex mt-1">
                  <p className="text-2xl text-gray-300 font-extrabold">
                    {minmimid} MATIC
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className=" mb-6 mt-10">
            <span className="flex">
              <p className="text-xl mb-1">Make your offer</p>
              <p className="text-red-500">*</p>
            </span>
            <input
              required="true"
              name="price"
              id="price"
              type="text"
              className="bg-slate-700 border hover:border-blue-500 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-slate-800 dark:placeholder-gray-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className=" text-xs mt-1">The starting price of the NFT.</p>
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
            Create Direct Auction
          </button>
        </div>
      </form>
    </>
  );
};

export default Auction;
