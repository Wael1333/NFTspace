import React, { useState } from "react";
import nftspace from "../assets/col.png";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import Link from "next/link";
import Dropdown from "./Dropdown";
import Image from "next/image";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useNFTs,
  useNFT,
} from "@thirdweb-dev/react";
import { useEffect, useMemo } from "react";
import { client } from "../../lib/SanityClient";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const NavbarItem = ({ title, classProps }) => {
  return (
    <li
      className={`flex text-white px-4 font-bold hover:text-gray-500 cursor-pointer ${classProps}`}
    >
      {title}
    </li>
  );
};

const style = {
  wrapper: `bg-[#131227] w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: `flex items-center justify-end`,
  headerItem: `flex text-white px-4 font-bold hover:text-gray-500 cursor-pointer`,
  headerItemMobile: `md:flex hidden text-white px-4 font-bold hover:text-gray-500 cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

const useProfile = () => {
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const Icon = <CgProfile onClick={() => setIsShown((prev) => !prev)} />;
  const Icon2 = (
    <MdOutlineAccountBalanceWallet
      onClick={() => setIsShown2((prev) => !prev)}
    />
  );
  const InputType1 = isShown && <Dropdown />;
  const InputType2 = isShown2 && <ConnectWallet />;

  return [InputType1, InputType2, Icon, Icon2];
};

const Navbar = () => {
  /*Mobile View*/
  const [toggleMenu, setToggleMenu] = useState(false);
  /*CardMenu "Wallet connection"*/
  const [ProfileMenu, Metamaskw, Picon, Wicon] = useProfile();
  const address = useAddress();

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== "Unnamed" ? ` ${userName}` : ``}!`,
      {
        id: "success",
        style: {
          background: "#04111d",
          color: "#fff",
        },
      }
    );
  };
  const lostUser = (toastHandler = toast) => {
    toastHandler.error("connect Your Wallet Please!", {
      id: "failed",
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (!address) return lostUser();

    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
      };

      const result = await client.createIfNotExists(userDoc);
      setTimeout(() => welcomeUser(result.userName), 3000);
    })();
  }, [address]);

  const [Searchput, setSearchput] = useState("");
  const [nftnamename, setName] = useState();
  const [nftid, setnftid] = useState();
  const [Selectedaddress, setAddress] = useState();
  const router = useRouter();

  const handleChange = (event) => {
    setSearchput(event.target.value);
    console.log("Searchbar here", Searchput);
  };

  //FETCHING DATA--------------------------------------------------
  const [collection, setCollection] = useState([]);
  const [Addresses, setAddresses] = useState([]);

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "users" && walletAddress == "${address}" ]{
    "imageUrl": profileImage.asset->url,
  }`;
    const addresses = `*[_type == "users"  ]{
    walletAddress,
   }`;

    const collectionData = await sanityClient.fetch(query);
    const Data = await sanityClient.fetch(addresses);
    console.log("IMAGE", collectionData, "🔥");
    console.log("Addresses", Data, "🔥");
    // the query returns 1 object inside of an array
    setCollection(collectionData[0]);
    // the query returns 1 object inside of an array
    setAddresses(Data[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [address]);
  //-----------------------------------------------------------

  //Getting all NFTS

  const { contract } = useContract(
    "0x8E626040bd88393d759058eAaF40A2b4b2d3cFEd"
  );

  let tokenId = Searchput; // the tokenId to look up
  const { data: nft } = useNFT(contract, tokenId);
  console.log("tokenId here", tokenId);
  console.log("Length here", Addresses);
  useEffect(() => {
    if (!address) return;
    (async () => {
      const i = Addresses.length;
      while (i !== 0) {
        // code block to be executed
      }
    })();
  }, [address]);
  console.log("The address selected is: ", Selectedaddress);
  useEffect(() => {
    if (!nft) return;
    (async () => {
      setName(nft?.metadata.name);
      setnftid(nft?.metadata.id);
    })();
  }, [nft]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      if (Searchput === nftid || Searchput === nftnamename) {
        router.push(
          `/nfts/0x8E626040bd88393d759058eAaF40A2b4b2d3cFEd/${nftid}`
        );
      } else {
        router.push(`/collections/Error`);
      }
    }
  };

  return (
    <div>
      <nav className={style.wrapper}>
        <Link href="/">
          <div className={style.logoContainer}>
            <Image src={nftspace} height={50} width={50} />
            <div className={style.logoText}>Space</div>
          </div>
        </Link>
        <div className={style.searchBar}>
          <div className={style.searchIcon}>
            <AiOutlineSearch />
          </div>
          <input
            className={style.searchInput}
            placeholder="Search items, collections, and accounts"
            value={Searchput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={style.headerItems}>
          <ul className={style.headerItemMobile}>
            <Link href="/collections/Explore">Marketplace </Link>{" "}
          </ul>
          <ul className={style.headerItemMobile}>
            <Link href={`/collections/${address}`}>Collections</Link>
          </ul>
          <ul className={style.headerItemMobile}>
            <Link href="/collections/Stats">Stats </Link>
          </ul>
          <ul className={style.headerItemMobile}>
            <Link href="/collections/Resources">Resources </Link>
          </ul>
          <ul className={style.headerItemMobile}>
            <Link href="/collections/Create">Create </Link>{" "}
          </ul>

          <div className={style.headerIcon}>
            {address ? (
              <img
                className="w-[2rem] rounded-full"
                src={collection?.imageUrl}
                alt="profilepic"
              />
            ) : (
              <div> {Picon}</div>
            )}
            <ul>
              <li>{ProfileMenu}</li>
            </ul>
          </div>
          <div className={style.headerIcon}>
            <ul>
              {Wicon}
              <li className="absolute right-0 z-10 ">{Metamaskw}</li>
            </ul>
          </div>
        </div>

        {/*Mobile design*/}
        <div className="flex relative top-1">
          {toggleMenu ? (
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <HiMenu
              fontSize={32}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <ul
              className="z-10 fixed top-0 -right-2 p-3 w-[40vw] h-screen shadow-2xl md:hidden list-none 
          flex flex-col justify-start items-end rounded-md bg-[#063057] "
            >
              <li className="text-xl w-full my-1">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              {[
                "Collections",
                "Stats",
                "Resources",
                "Create",
                "Marketplace",
                <ConnectWallet />,
              ].map((item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="my-5 text-lg"
                />
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
