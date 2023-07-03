import bgp from "../../assets/bg-collection.jpg";
import pfp from "../../assets/pf.png";
import Mainlayout from "../../components/Layout/MainLayout.jsx";
import { CgWebsite } from "react-icons/cg";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillGithub,
} from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import eth from "../../assets/eth.png";
import NFTcard from "../../components/NFTcard";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import Image from "next/image";
import { client } from "lib/sanityClient";
import {
  ThirdwebSDK,
  useActiveListings,
  useContract,
  useOwnedNFTs,
  useListing,
  useDirectListings,
  useNFTs,
  useAddress,
} from "@thirdweb-dev/react";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useSigner, useConnect } from "@thirdweb-dev/react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Drops from "../../components/Drops";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";
import Skeleton from "../../components/Skeleton";
import { RiFilter3Line } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

//className="  h-"
const style = {
  bannerImageContainer: `h-96 w-screen overflow-hidden flex justify-center items-center `,
  bannerImage: `w-full  object-cover`,
  infoContainer: `w-screen px-4 `,
  midRow: `w-full flex justify-center text-white group`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `absolute right-10 top-16 text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2 cursor-pointer text-white`,
  divider: `border-r-2`,
  title: `relative top-2 text-5xl font-bold mb-4 `,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-white font-bold font-body text-xl w-max-1/4 flex-wrap mt-4`,
};

const Collections = () => {
  const router = useRouter();
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    address
  );
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  console.log("My nfts", ownedNfts);
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});
  const [Nfts, setNfts] = useState([]);
  const [show, setShow] = useState(false);
  //get all NFTs
  useEffect(() => {
    if (!ownedNfts) return;
    (async () => {
      const Nfts = ownedNfts;
      setNfts(Nfts);
    })();
  }, [ownedNfts]);

  useEffect(() => {
    if (!loadingOwnedNfts) {
      return setShow(true);
    }
  }, [loadingOwnedNfts]);

  console.log("show msg", show);

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "users" && walletAddress == "${address}" ]{
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      userName,
      walletAddress,
      floorPrice,
      description
    }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");

    // the query returns 1 object inside of an array
    setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId, address]);

  //let items = Nfts.length;
  console.log(router.query);
  console.log("Query collection id ", router.query.collectionId);

  console.log(collection);
  return (
    <div className="overflow-hidden bg-gradient-to-r from-indigo-400 via-cyan-500 to-pink-400 ">
      <Mainlayout />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : "https://via.placeholder.com/200"
            }
            alt="profile image"
          />
          <div className="absolute text-white">
            <Link href="/collections/UpdateUser">
              <BsThreeDots className="w-10 h-10 ml-36 mt-16 hidden group-hover:block cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="relative h-22 ">
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiFillGithub />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <BsDiscord />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            @
            <span className="text-white font-bold font-body text-2xl">
              {collection?.userName}
            </span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{Nfts.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>1</div>
              <div className={style.statName}>owner</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://cryptologos.cc/logos/polygon-matic-logo.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://cryptologos.cc/logos/polygon-matic-logo.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      <div className="ml-24">
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
      <div className="flex flex-wrap ">
        <div className="mt-20 mx-28 grid grid-cols-4 gap-28 mb-40">
          {loadingOwnedNfts ? (
            skeleton.map((skeleton, i) => {
              return <Skeleton />;
            })
          ) : ownedNfts && ownedNfts.length > 0 ? (
            ownedNfts.map((nft, id) => {
              return <Drops nft={nft} key={id} />;
            })
          ) : (
            <div className="absolute text-white font-body ml-[39rem] font-bold text-3xl mt-10 ">
              This wallet does not own any NFTs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
