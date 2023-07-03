import React, { useState } from "react";
import {
  ThirdwebSDK,
  useActiveListings,
  useContract,
  useOwnedNFTs,
  useListing,
  useDirectListings,
  useCreateDirectListing,
  Web3Button,
  useMintNFT,
  useAddress,
  useContractEvents,
  Transaction,
} from "@thirdweb-dev/react";
import Drops from "@/components/Drops";
import MainLayout from "@/components/Layout/MainLayout";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const Create = () => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const router = useRouter();
  const { mutate: mintNft, isLoading, error } = useMintNFT(contract);
  if (error) {
    console.error("failed to mint NFT", error);
  }
  const address = useAddress();
  const {
    data: events,
    isLoading: LoadingEvents,
    error: errorevents,
  } = useContractEvents(contract, "MINT TO");
  //success and failure buttons.

  const listsuccess = (toastHandler1 = toast) =>
    toastHandler1.success(`Listing successful!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  const listfailed = (toastHandler2 = toast) =>
    toastHandler2.error(`Listing Failed!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });

  console.log("here are the events : ", events, error);
  async function handleMint(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    const values = Object.fromEntries(formData);
    console.log("form values name is", values);

    let Transactionresult;

    Transactionresult = await mint();

    if (Transactionresult) {
      router.push({
        pathname: `/collections/${address}/`,
      });
      listsuccess();
    }

    async function mint() {
      let txResult;
      try {
        txResult = mintNft({
          // Any valid IPFS or HTTP URL that points to a JSON object
          metadata: {
            name: values.title,
            description: values.desc,
            image: values.image, // Accepts any URL or File type
          },
          to: address,
        });

        return txResult;
      } catch (error) {
        alert(error);
        listfailed();
      }
    }
  }
  return (
    <div>
      <MainLayout />
      <div className="flex justify-center  bg-gradient-to-br from-purple-950 via-fuchsia-600 to-cyan-500 w-screen h-screen">
        <form onSubmit={(e) => handleMint(e)} className="ml-40  ">
          <Toaster position="bottom-center" reverseOrder={false} />

          <p className=" mt-20 font-extrabold text-7xl font-body bg-clip-text bg-gradient-to-tl from-cyan-500 via-pink-800 text-cyan-200">
            Create your <br /> own NFT Now!
          </p>
          <div>
            <div className="mt-10">
              <label
                for="user"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                placeholder="Title"
                required
              />
            </div>
            <div className="mt-10">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="desc"
                name="desc"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your description here..."
              ></textarea>
            </div>
            <div className="mt-10">
              <label
                for="user"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image here
              </label>
              <input
                required
                type="file"
                name="image"
                id="image"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-600 font-medium rounded-lg text-sm px-8 py-2.5 text-center mr-2 mb-2"
              disabled={isLoading}
            >
              Mint!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Create;
