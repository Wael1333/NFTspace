import React, { useEffect, useMemo, useState } from "react";
import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
  useNFT,
} from "@thirdweb-dev/react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../static/addresses";
import Skeleton from "./Skeleton";
import { NFT } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import moment from "moment";

const Drops = ({ nft }) => {
  const router = useRouter();
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  //LISTING SECTION
  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft?.metadata.id,
    });

  //Add for auciton section
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });
  const [isListed, setIslisted] = useState(false);

  useEffect(() => {
    if (!nft) return;
    (async () => {
      if (directListing && directListing[0]) {
        setIslisted(true);
      }
    })();
  }, [nft]);
  console.log("IsListed = ", isListed);
  return (
    <div>
      <div
        onClick={() => {
          router.push({
            pathname: `/nfts/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`,
            query: { isListed: isListed },
          });
        }}
        className="bg-cyan-100 rounded-xl w-80 h-full cursor-pointer"
      >
        .
        <div className=" mx-2 my-2">
          <img
            className="ml-2 object-center w-[18rem] rounded-xl transform transition-all hover:scale-125"
            src={nft?.metadata.image}
            alt=""
          />
        </div>
        <div className="ml-5 text-black text-3xl font-body font-semibold">
          {nft?.metadata.name}
        </div>
        <div className="mt-0">
          {loadingMarketplace || loadingDirectListing || loadingAuction ? (
            <div className="animate-pulse  ">
              <div className="mb-2 ml-5 w-[5rem] h-[1rem] rounded-3xl bg-gray-300 "></div>
              <div className="mb-2 ml-5 w-[5rem] h-[1rem] rounded-3xl bg-gray-300 "></div>
            </div>
          ) : directListing && directListing[0] ? (
            <div className="flex">
              <p className="text-green-500 font-medium ml-5">Price</p>
              <div className="absolute ml-5 mt-5 text-green-500 font-medium">
                {`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}
              </div>
            </div>
          ) : auctionListing && auctionListing[0] ? (
            <div className="flex">
              <p className="text-green-500 font-medium ml-5">Minimum bid</p>
              <div className="absolute ml-5 mt-5 text-green-500 font-medium">
                {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
              </div>
            </div>
          ) : (
            <p className=" text-gray-600 text-lg ml-5   ">Not listed</p>
          )}
          {directListing && directListing[0] ? (
            <div className="absolute ml-[16rem] mt-5 text-gray-400 font-medium">
              #{nft?.metadata.id}
            </div>
          ) : (
            <div className="">
              <div className="ml-[16rem] text-gray-400 font-medium">
                #{nft?.metadata.id}
              </div>
            </div>
          )}
        </div>
        <div className="flex mt-2 ">
          {auctionListing && auctionListing[0] ? (
            <div className="ml-4">
              <div className="absolute mt-5 ml-3 text-purple-600 font-semibold">
                End
              </div>
              <div className="mt-12 text-purple-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {
                  moment(auctionListing[0].endTimeInSeconds * 1000).from(
                    auctionListing[0].startTimeInSeconds * 1000
                  )

                  //
                }
              </div>
            </div>
          ) : directListing && directListing[0] ? (
            <div className="ml-4">
              <div className="mt-16 text-purple-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                --/--/--
              </div>
            </div>
          ) : (
            <div className="ml-4">
              <button className="mt-10 text-purple-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                --/--/--
              </button>
            </div>
          )}
          {directListing && directListing[0] ? (
            <div className=" ml-32">
              <button className="mt-16 text-purple-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Buy
              </button>
            </div>
          ) : auctionListing && auctionListing[0] ? (
            <div className=" ml-28">
              <button className="mt-12 text-purple-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Buy
              </button>
            </div>
          ) : (
            <div className=" ml-36">
              <button className="mt-10 text-purple-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                List
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drops;
