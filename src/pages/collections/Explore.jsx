import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import Drops from "../../components/Drops";
import { RiFilter3Line } from "react-icons/ri";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";
import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
  useNFTs,
  useAddress,
  ConnectWallet,
} from "@thirdweb-dev/react";
import Skeleton from "../../components/Skeleton";
import Footer from "@/components/Footer";

const Explore = () => {
  const address = useAddress();
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

  const { contract: NftCollection, isLoading: loadingCollection } = useContract(
    NFT_COLLECTION_ADDRESS
  );
  const { data: nft, isLoading: loadingNfts } = useNFTs(NftCollection);
  const NFT = nft;

  return (
    <div>
      {!address ? (
        <div className=" duration-500 flex justify-center bg-gradient-to-bl from-purple-800 via-cyan-600 to-pink-400 h-screen ">
          <div className="mt-52 ">
            <p className="text-5xl font-bold font-body  text-white">
              You need to connect you wallet to view the MarketPlace{" "}
            </p>
            <div className="mt-20 text-center text-3xl ">
              <ConnectWallet />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className=" bg-gradient-to-br from-[#131227] via-fuchsia-950 to-fuchsia-700 w-screen">
            <MainLayout />
            <div className="flex mx-44 my-20  ">
              <div className="">
                <p className="font-bold font-body text-6xl text-white">
                  Marketplace
                </p>
                <div className="">
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-10"
                  >
                    All Categories
                  </button>
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
                      Art
                    </span>
                  </button>
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
                      Celeberties
                    </span>
                  </button>
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
                      Gaming
                    </span>
                  </button>
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
                      Sport
                    </span>
                  </button>
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
                      Music
                    </span>
                  </button>
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-3xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
                      Crypto
                    </span>
                  </button>
                  <button
                    type="button"
                    class=" absolute right-0 text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-40 mb-2 mt-10"
                  >
                    <RiFilter3Line className="relative inline-flex text-3xl" />
                    All Filters
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-20 mt-20 mb-10 ">
                  {loadingNfts ? (
                    skeleton.map((skeleton, i) => {
                      return <Skeleton />;
                    })
                  ) : NFT && NFT.length > 0 ? (
                    NFT.map((nft) => {
                      return <Drops nft={nft} />;
                    })
                  ) : (
                    <p> No Nfts Found. </p>
                  )}
                </div>
              </div>
            </div>
            _
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Explore;
