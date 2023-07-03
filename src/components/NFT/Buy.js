import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiTransferAlt } from "react-icons/bi";
import { useEffect, useState, useRef } from "react";
import {
  ThirdwebSDK,
  useActiveListings,
  useContract,
  useOwnedNFTs,
  useListing,
  useDirectListings,
  useCreateDirectListing,
  Web3Button,
  useDirectListing,
  useValidDirectListings,
  useValidEnglishAuctions,
  useAddress,
  useNetworkMismatch,
  useNetwork,
  useCancelListing,
  useCancelDirectListing,
  useCancelEnglishAuction,
} from "@thirdweb-dev/react";
import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { id } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import ListingNFTs from "./ListingNFTs";
import AuctionMenu from "./AuctionMenu";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";
import { MdCancel } from "react-icons/md";
import { SiFireship } from "react-icons/si";
import Burn from "./Burn";
import Auction from "./Auction";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  button2: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer bg-red-500`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
};

const Buy = ({ isListed, selectedNft }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState();
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [enableButton, setEnableButton] = useState(false);
  const address = useAddress();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: selectedNft?.metadata.id,
    });
  console.log("THE DIRECT LISTINGS", directListing);

  //auction LISINTG
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: selectedNft?.metadata.id,
    });
  console.log("THE AUCTION DIRECT LISTING", auctionListing);

  console.log("isListed in BUY.JS is = ", isListed);
  //Cheacking if the NFT item is listed or not comparing to the selectedNFT item
  useEffect(() => {
    if (isListed === "false") return;
    (async () => {
      setSelectedMarketNft(directListing);
    })();
  }, [isListed]);

  /* if (auctionListing?.[0]) {
    txResult = await marketplace?.englishAuctions.buyoutAuction(
      auctionListing[0].id
    );/**/

  async function buyNft() {
    let txResult;
    try {
      //Add for auction section
      if (auctionListing?.[0]) {
        txResult = await marketplace?.englishAuctions.buyoutAuction(
          auctionListing[0].id
        );
        confirmPurchase();
      } else if (directListing?.[0]) {
        txResult = await marketplace?.directListings.buyFromListing(
          directListing[0].id,
          "1",
          address
        );
        confirmPurchase();
      } else {
        throw new Error("No listing found");
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
    return txResult;
  }

  //Cancel listing
  const { mutate: cancelDirectListing } = useCancelDirectListing(marketplace);
  //cancel auction
  const { mutate: cancelEnglishAuction } = useCancelEnglishAuction(marketplace);
  async function onCancel() {
    let transactionResult;

    transactionResult = await CancelNft();
    if (transactionResult) {
      router.push({
        pathname: `/collections/${address}`,
      });
      confirmCancel();
    }
  }
  async function CancelNft() {
    let txResult;
    try {
      //Add for auction section
      if (auctionListing?.[0]) {
        txResult = cancelEnglishAuction(auctionListing[0].id);
      } else if (directListing?.[0]) {
        txResult = cancelDirectListing(directListing[0].id);
      } else {
        throw new Error("No listing found");
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
    return txResult;
  }

  //TESTING THE BUTTON
  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return;

    setEnableButton(true);
  }, [selectedMarketNft, selectedNft]);

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      id: "Confirm",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  const confirmCancel = (toastHandler = toast) =>
    toastHandler.success(`CancelLising successful!`, {
      id: "Cancel",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });

  const [toggle, setToggle] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAuctionbar, setShowAuctionbar] = useState(false);
  const [showSidebar1, setShowSidebar1] = useState(false);
  const [showSidebar2, setShowSidebar2] = useState(false);
  const [showSidebar3, setShowSidebar3] = useState(false);
  const [showSidebar33, setShowSidebar33] = useState(false);
  const [buyoutvalue, setbuyoutvalue] = useState();
  const [minmimid, setminmimid] = useState();

  useEffect(() => {
    if (auctionListing && auctionListing[0]) {
      setbuyoutvalue(auctionListing[0].buyoutCurrencyValue.displayValue);
      setminmimid(auctionListing[0].minimumBidCurrencyValue.displayValue);
    }
  });

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-center" reverseOrder={false} />
      {(directListing && directListing[0]) ||
      (auctionListing && auctionListing[0]) ? (
        <>
          <div
            onClick={() => {
              buyNft();
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          {auctionListing && auctionListing[0] ? (
            <div
              onClick={() => setShowSidebar33(!showSidebar33)}
              className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
            >
              <HiTag className={style.buttonIcon} />
              <div className={style.buttonText}>Make Offer</div>
            </div>
          ) : (
            <div> </div>
          )}
          <div
            onClick={() => {
              onCancel();
            }}
            className={`${style.button2} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <MdCancel className={style.buttonIcon} />
            <div className={style.buttonText}>Cancel Listing</div>
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>List Item</div>
          </div>
          <div
            onClick={() => setShowSidebar1(!showSidebar1)}
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Set For Auction</div>
          </div>
          <div
            onClick={() => setShowSidebar2(!showSidebar2)}
            className={`${style.button2} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <SiFireship className={style.buttonIcon} />
            <div className="ml-2 text-lg font-semibold">Burn NFT</div>
          </div>
        </>
      )}
      {showSidebar && (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      )}
      <div
        className={`top-0 right-0 w-[35vw] bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-7 pl-16 text-white fixed h-full z-40  ease-in-out duration-300 rounded-l-3xl ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <ListingNFTs selectedNft={selectedNft} />
      </div>
      {showSidebar1 && (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar1(!showSidebar1)}
        >
          x
        </button>
      )}
      <div
        className={`top-0 right-0 w-[35vw] bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-7 pl-16 text-white fixed h-full z-40 ease-in-out duration-300 rounded-l-3xl ${
          showSidebar1 ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <AuctionMenu selectedNft={selectedNft} />
      </div>
      {showSidebar2 && (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar2(!showSidebar2)}
        >
          x
        </button>
      )}
      <div
        className={`top-0 right-0 w-[35vw] bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-7 pl-16 text-white fixed h-full z-40 ease-in-out duration-300 rounded-l-3xl ${
          showSidebar2 ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <Burn selectedNft={selectedNft} />
      </div>
      {showSidebar33 && (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar33(!showSidebar33)}
        >
          x
        </button>
      )}
      <div
        className={`top-0 right-0 w-[35vw] bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-7 pl-16 text-white fixed h-full z-40 ease-in-out duration-300 rounded-l-3xl ${
          showSidebar33 ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <Auction
          selectedNft={selectedNft}
          buyoutvalue={buyoutvalue}
          minmimid={minmimid}
        />
      </div>
    </div>
  );
};

export default Buy;
