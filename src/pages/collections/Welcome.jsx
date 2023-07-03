import React, { useState, useEffect } from "react";
import pic from "../../assets/original.jpg";
import Login from "./Login";
import Link from "next/link";
import nft from "../../assets/col.png";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RiFilter3Line, RiDownloadLine } from "react-icons/ri";
import Drops from "../../components/Drops";
import { BiWallet } from "react-icons/bi";
import { RiWallet3Line } from "react-icons/ri";
import { TbFileUpload, TbCheckupList } from "react-icons/tb";
import NFTs from "../../components/NFTs";
import moment from "moment";

const style = {
  wrapper: `static bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-700`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url(""})] before:bg-cover before:bg-red-500 before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: ` font-extrabold text-transparent text-7xl font-body bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600`,
  description: `font-body text-indigo-300 container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 duration-500 rounded-lg mr-2 cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] duration-500 cursor-pointer`,
  cardContainer: `rounded-[3rem] group   `,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white `,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
};
const slides = [
  {
    url: "https://cdn.sanity.io/images/w3mbrubb/production/21594007af94e4633497de4378238baa8e249646-519x339.jpg",
  },
  {
    url: "https://cdn.sanity.io/images/w3mbrubb/production/fde6034ff95d2c3988f48b89829c72c0e1657b13-1200x1200.webp",
  },
  {
    url: "https://cdn.sanity.io/images/w3mbrubb/production/6a11747c1ec050121d3d83455e3c55f326066521-1140x760.jpg",
  },
  {
    url: "https://cdn.sanity.io/images/w3mbrubb/production/ba42ca9b96611c20f6467ffa55a55e56a32a6249-1024x542.jpg",
  },
  {
    url: "https://cdn.sanity.io/images/w3mbrubb/production/6519802ca89bce87bc40a053ea6ee6a54763178c-1920x1004.jpg",
  },
  {
    url: "https://cdn.sanity.io/images/w3mbrubb/production/608278434ad7f64636cab0770558c457d934e0d8-197x250.png",
  },
];
const Welcome = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [filterShow, setfFilterShow] = useState(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <div className={style.wrapper}>
        <div className="relative w-full h-full" id="top">
          <div className="duration-700">
            <img
              src={slides[currentIndex].url}
              className="absolute block w-full h-full object-center opacity-80 blur-md "
              alt="Imgs"
            />
          </div>
          <div className={style.contentWrapper}>
            <div className={style.copyContainer}>
              <div className={style.title}>
                Discover, collect, and sell <br /> extraordinary NFTs
              </div>
              <div className={style.description}>
                NFTspace is the world &apos;s largest <br />
                NFT marketplace
              </div>
              <div className={style.ctaContainer}>
                <Link href="/collections/Explore">
                  <button className={style.accentedButton}>Explore</button>
                </Link>
                <Link href="/collections/Create">
                  <button className={style.button}>Create</button>{" "}
                </Link>
              </div>
            </div>
            <div className={style.cardContainer}>
              <div>
                <BsChevronCompactLeft
                  onClick={prevSlide}
                  className="hidden group-hover:block absolute bottom-[30rem] cursor-pointer hover:bg-slate-300 rounded-lg -translate-x-0 translate-y-5"
                  size={40}
                />
              </div>
              <div>
                <BsChevronCompactRight
                  onClick={nextSlide}
                  className="hidden group-hover:block absolute right-[18rem] bottom-[30rem] hover:bg-slate-300 rounded-lg cursor-pointer -translate-x-0 translate-y-5"
                  size={40}
                />
              </div>
              <img
                className="rounded-t-lg lg: w-96 h-auto md:h-auto "
                src={slides[currentIndex].url}
                alt=""
              />{" "}
              <div className={style.infoContainer}>
                <img
                  className="h-[3.25rem] rounded-full"
                  src="https://media.nft.crypto.com/88e3ca28-1f7f-4b49-b2f9-7a31210e5028/original.jpeg?d=lg-logo"
                  alt=""
                />
                <div className={style.author}>
                  <div className={style.name}>Kaysha</div>
                  <a
                    className="text-[#1868b7]"
                    href="https://crypto.com/nft/collection/a399b6ffda0bac5f2f065f183aa305cc?tab=items&asset=67fea97ba416d48e2f3d3ec067d4c178&edition=fd1452d35a76b1a05ca985fcee26faaf&detail-page=MARKETPLACE"
                  >
                    Meditation Laan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#131227]  ">
        <div className="ml-40 ">
          <div className="text-white">
            <div className=" text-[#131227]">.</div>
            <div className="flex mt-12">
              <div className="">
                <div className=" text-6xl font-body text-center font-semibold ">
                  95+
                </div>
                <div className=" text-xl font-body font-semibold ">Auction</div>
              </div>
              <div className="">
                <div className="ml-20 text-center text-6xl font-body font-semibold  ">
                  46+
                </div>
                <div className="ml-20 text-xl font-body font-semibold ">
                  Artist
                </div>
              </div>
              <div className="">
                <div className="ml-20 text-center text-6xl font-body font-semibold ">
                  15+
                </div>
                <div className="ml-20  text-xl font-body font-semibold  ">
                  Artwork
                </div>
              </div>
            </div>
          </div>
          <div className="text-white text-6xl font-body font-bold mt-32">
            Discover more NFTs
          </div>
          <div>
            <div className="text-red-500">
              <div className="h-[6rem] duration-500">
                {filterShow && (
                  <>
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
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setfFilterShow(!filterShow)}
                  class=" absolute right-0 text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-40 mb-2 mt-10"
                >
                  <RiFilter3Line className="relative inline-flex text-3xl" />
                  All Filters
                </button>
              </div>
              <div className="mt-10 mr-24">
                <div className="grid grid-cols-4 gap-14">
                  <NFTs
                    link={
                      "https://i.seadn.io/gcs/files/b77fa91b46e8ccd60b13b86145e0704c.png?auto=format&dpr=1&w=384"
                    }
                    name={"Quirl"}
                    time={"5h20m32s"}
                    price={"0.012"}
                    id={"1"}
                  />
                  <NFTs
                    link={
                      "https://i.seadn.io/gcs/files/91d34a5765ca49b75c2597668491385d.png?auto=format&dpr=1&w=384"
                    }
                    name={"Brighty"}
                    time={"6h2m19s"}
                    price={"2.14"}
                    id={"2"}
                  />
                  <NFTs
                    link={
                      "https://i.seadn.io/gcs/files/2f918d59d34ab271a2f533e900b2165b.png?auto=format&dpr=1&w=384"
                    }
                    name={"Cloudy"}
                    time={"7h22m1sec"}
                    price={"0.3"}
                    id={"3"}
                  />
                  <NFTs
                    link={
                      "https://i.seadn.io/gcs/files/0671c2ebc423b28605268b4e7c6ef863.png?auto=format&dpr=1&w=384"
                    }
                    name={"Evi"}
                    time={"2h7m33s"}
                    price={"1.1"}
                    id={"4"}
                  />
                  <NFTs
                    link={
                      "https://i.seadn.io/gcs/files/270010c1ab7a7b3427896e8c4e63b890.png?auto=format&dpr=1&w=384"
                    }
                    name={"Spartan"}
                    time={"12h7m30s"}
                    price={"0.1"}
                    id={"5"}
                  />
                  <NFTs
                    link={
                      "https://i.seadn.io/gcs/files/c8f76e3234b03b8481fd4325fbaffbb8.png?auto=format&dpr=1&w=384"
                    }
                    name={"Happyis"}
                    time={"20h3min1s"}
                    price={"4.47"}
                    id={"6"}
                  />
                  <NFTs
                    link={
                      "https://i.seadn.io/gcs/files/7ed28a3457917dc27d4bb96dcd897d3d.png?auto=format&dpr=1&w=384"
                    }
                    name={"Gansister"}
                    time={"18h22m20s"}
                    price={"0.75"}
                    id={"7"}
                  />
                  <NFTs
                    link={
                      "https://i.seadn.io/gcs/files/dfc452e57807e475817df1fe9bc8f1b1.png?auto=format&dpr=1&w=384"
                    }
                    name={"Foresty"}
                    time={"2d3h30m"}
                    price={"1.14"}
                    id={"8"}
                  />
                </div>
              </div>
              <div className="text-center text-blue-500">
                <Link href="/collections/Explore">
                  <button
                    type="button"
                    class=" text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-normal rounded-full text-xl px-7 py-4 text-center mr-2 mb-2 mt-14"
                  >
                    More NFTs
                  </button>
                </Link>
              </div>
              <div>
                <p className="text-white text-6xl font-body font-bold text-center mt-32">
                  Featured Collections
                </p>
                <div>
                  <div className="grid grid-cols-2 gap-0">
                    <div className="text-yellow-500 bg-[#1f1f1f] rounded-xl w-[45rem] mt-20">
                      <div className="text-red-500 flex">
                        <div>
                          <img
                            className="ml-5 mb-4 mt-2 object-center w-[25rem] h-[25rem] rounded-2xl transform transition-all hover:scale-125 cursor-pointer"
                            src="https://nftcalendar.io/storage/uploads/events/2021/12/sBQWWbNCrbLw1y5UORDpxRz7VZM3vIiLHrNVMiEl.gif"
                            alt="Profile img"
                          />
                        </div>
                        <div className="ml-6 mt-5">
                          <div className="flex cursor-pointer">
                            <img
                              className="w-10 h-10 rounded-3xl "
                              src="https://www.ziglar.com/wp-content/uploads/2016/09/michelle-prince-profile-img.png "
                              alt=""
                            />
                            <p className="ml-2 mt-2 text-white font-medium">
                              Perona
                            </p>
                          </div>
                          <div className="text-white font-bold text-4xl mt-4 ">
                            Angry Doli #1
                          </div>
                          <p className="text-[#4f4e53]  mt-4 text-sm">
                            Description
                          </p>
                          <p className="text-gray-300 text-sm mt-4">
                            Angry Doli is the 3D new model NFTs
                          </p>
                          <div className="flex">
                            <div className="">
                              <p className="text-[#4f4e53] mt-4 text-sm">
                                Current Bid
                              </p>
                              <div className="flex mt-1">
                                <img
                                  className="w-5 absolute left-[37rem] text-white"
                                  src="https://cryptologos.cc/logos/polygon-matic-logo.png"
                                  alt="Mumbai"
                                />
                                <div className="text-white font-semibold ml-5 mt-0">
                                  Price
                                </div>
                              </div>
                            </div>
                            <div className="ml-20">
                              <p className="text-[#4f4e53] mt-4 text-sm">
                                Ends in
                              </p>
                              <div className="text-white font-semibold mt-1">
                                1h 12m 23s
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            class=" text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold font-body rounded-full px-20 py-4 text-center ml-2 mb-0 mt-20"
                          >
                            <BiWallet className="absolute right-[21rem] mt-1 w-11 " />
                            Place Bid
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-yellow-500 bg-[#1f1f1f] rounded-xl w-[45rem] mt-20">
                      <div className="text-red-500 flex">
                        <div>
                          <img
                            className="ml-5 mb-4 mt-2 object-center w-[25rem] h-[25rem] rounded-2xl transform transition-all hover:scale-125 cursor-pointer"
                            src="https://nftcalendar.io/storage/uploads/events/2022/1/aMe7CoCCN8gYESqRDKIRPG9SVd9LDlqz5XP5rHed.gif"
                            alt="Profile img"
                          />
                        </div>
                        <div className="ml-6 mt-5">
                          <div className="flex cursor-pointer">
                            <img
                              className="w-10 h-10 rounded-3xl cursor-pointer"
                              src="https://www.ziglar.com/wp-content/uploads/2016/09/michelle-prince-profile-img.png"
                              alt=""
                            />
                            <p className="ml-2 mt-2 text-white font-medium cursor-pointer">
                              Perona
                            </p>
                          </div>
                          <div className="text-white font-bold text-4xl mt-4 ">
                            Ape Weedy #1
                          </div>
                          <p className="text-[#4f4e53]  mt-4 text-sm">
                            Description
                          </p>
                          <p className="text-gray-300 text-sm mt-4">
                            Mr Ape weedy with the diffrent designs
                          </p>
                          <div className="flex">
                            <div className="">
                              <p className="text-[#4f4e53] mt-4 text-sm">
                                Current Bid
                              </p>
                              <div className="flex mt-1">
                                <img
                                  className="w-5 absolute right-[26rem] text-white"
                                  src="https://cryptologos.cc/logos/polygon-matic-logo.png"
                                  alt="Mumbai"
                                />
                                <div className="text-white font-semibold ml-5 mt-0">
                                  Price
                                </div>
                              </div>
                            </div>
                            <div className="ml-20">
                              <p className="text-[#4f4e53] mt-4 text-sm">
                                Ends in
                              </p>
                              <div className="text-white font-semibold mt-1">
                                6h 2m 46s
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            class=" text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold font-body rounded-full px-20 py-4 text-center ml-2 mb-0 mt-20"
                          >
                            <BiWallet className="absolute left-[41rem] mt-1 w-11 " />
                            Place Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-cyan-500 mt-52">
                  <div className="relative">
                    <span className="flex">
                      <img
                        className="w-[30rem] rounded-3xl"
                        src="https://openseauserdata.com/files/7021d08ccf9f99d51ba9fb5de07693bf.jpg"
                        alt="1"
                      />
                      <img
                        className="w-30 h-24 rounded-full border-2 absolute ml-[26rem] mt-[26rem] "
                        src="https://i.pinimg.com/736x/ec/a9/87/eca9879975bf874c55bc3c71e94b6915.jpg"
                        alt="11"
                      />
                    </span>
                    <span className="flex">
                      <img
                        className=" absolute w-[28rem] top-[16rem] left-[35rem]   rounded-3xl"
                        src="https://www.jckonline.com/wp-content/uploads/2022/03/Coco-NFT.jpg"
                        alt="2"
                      />
                      <img
                        className="w-30 h-24 rounded-full border-2 absolute ml-[59rem] mt-[10rem]"
                        src="https://perfectczechwomen.com/wp-content/uploads/2019/04/New-Profile-15-500x580.jpg"
                        alt="22"
                      />
                    </span>
                    <span className="flex">
                      <img
                        className="w-[23rem] mt-20 ml-28 rounded-3xl"
                        src="https://www.playtoearn.online/wp-content/uploads/2021/10/Clone-X-NFT-avatar.png"
                        alt="3"
                      />
                      <img
                        className="w-30 h-24 rounded-full border-2 absolute ml-[27rem] mt-[24rem]"
                        src="data:image/jpeg;base64,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"
                        alt="33"
                      />
                    </span>
                    <div className="absolute right-52 top-[19rem]">
                      <p className="text-white font-body font-bold text-6xl">
                        Create and <br />
                        Sell your NFTs
                      </p>
                      <p className="mt-4 text-white font-body font-semibold inline-flex items-baseline">
                        By signing up into our website, Connecting your Wallet
                        <br />
                        you can access to the marketplace.
                        <br />
                        Where you can find NFTs for Sale or For Auction, There
                        <br />
                        you can buy some NFTs and make your own NFT collection
                        <br />
                        and then you can send them to the market and sell them
                        <br />
                        again under your Flag.
                      </p>
                    </div>
                    <Link href="#top">
                      <button
                        type="button"
                        class=" text-white bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 hover:bg-gradient-to-br duration-500 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold font-body text-2xl rounded-full px-20 py-4 text-center ml-2 mb-0 mt-10 absolute right-64 top-[40rem]"
                      >
                        Sign up with Metamask
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#4f47f4]  mt-60 h-[34rem]">
          <div className="">
            <p className="text-white font-body text-6xl font-extrabold pt-20 text-center ">
              Create And Sell Your NFTs
            </p>
          </div>
          <div className="flex ">
            <div className="w-[50rem] mt-20 text-center">
              <RiWallet3Line className="text-white w-40 h-20 ml-60 " />
              <p className="text-white text-3xl font-body font-medium">
                Set up your wallet
              </p>
              <p className="text-white text-xl font-body ">
                Once you've set up your wallet of <br />
                choice, connect it to NFTspace by <br /> clicking the wallet
                icon <br /> in the navbar.
              </p>
            </div>
            <div className="w-[50rem] mt-20 text-center">
              <TbFileUpload className="text-white  w-40 h-20 ml-60" />
              <p className="text-white text-3xl font-body font-medium">
                Upload & Create Collection
              </p>
              <p className="text-white text-xl font-body ">
                Upload your work then Click My <br />
                Collections and set up your collection <br />
                Add social links and a description
                <br />
                so that everybody can notice you.
              </p>
            </div>
            <div className="w-[50rem] mt-20 text-center">
              <TbCheckupList className="text-white  w-40 h-20 ml-60" />
              <p className="text-white text-3xl font-body font-medium">
                Start selling NFTs
              </p>
              <p className="text-white text-xl font-body ">
                Choose between auctions, Listings <br />
                and fixed-price you choose <br /> how you want
              </p>
            </div>
          </div>
        </div>
        <div className="ml-40 mt-40">
          <div className="text-orange-500 flex "></div>
          <div className="text-gray-400 flex"></div>
          <div className="relative mb-10">
            <img
              src="https://defiantdigital.com.au/wp-content/uploads/2022/07/createandmarket600-min.png"
              alt="phoneapp"
              className="absolute w-49 h-49 right-52 "
            />
          </div>
          <div>
            <div className="bg-[#4f47f4] mt-60 h-[34rem] rounded-3xl mr-40  ">
              container
              <p className="text-white font-body font-bold text-8xl ml-52 mt-0">
                Download our <br />
                app and win NFTs <br />
                Comming soon..
              </p>
              <span className="flex">
                <button className="text-white font-body font-semibold text-2xl border-2 px-10 py-3 rounded-3xl hover:bg-purple-700 duration-500 active:bg-cyan-500 focus:outline-none ml-52 mt-20">
                  <RiDownloadLine className="absolute left-[24rem] mt-1" />{" "}
                  Download Now
                </button>
              </span>
            </div>
            <div className=" mt-52">_</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
