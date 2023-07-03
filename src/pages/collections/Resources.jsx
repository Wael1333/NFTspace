import Footer from "@/components/Footer";
import MainLayout from "@/components/Layout/MainLayout";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiTransferAlt } from "react-icons/bi";
const Resources = () => {
  return (
    <div>
      <MainLayout />
      <div className="flex justify-normal items-start w-full h-screen bg-gradient-to-tr from-purple-600 via-cyan-500 to-fuchsia-600">
        <div className="my-40 mx-40">
          <div className="flex">
            <div className="absolute ml-24 ">
              <img
                className="relative w-[25rem]  "
                src="https://assets-global.website-files.com/6297ced5c59919a3d53d5cc7/63041862db32f80bd94254b1_Hero%20img-CoolCat.png"
                alt=""
              />
            </div>
            <img
              className="ml-[28rem]"
              src="https://assets-global.website-files.com/6297ced5c59919a3d53d5cc7/63a0a7a3ac157f0f1035a92a_doodles_card-2-p-500.png"
              alt="luca"
            />

            <img
              className="absolute w-20 left-[28rem] top-[37rem] "
              src="https://assets-global.website-files.com/6297ced5c59919a3d53d5cc7/630418621a3106213adb593e_Hero%20img-Polygon.png"
              alt=""
            />
            <img
              className="absolute w-[6rem] left-[62rem] top-[42rem]"
              src="https://assets-global.website-files.com/6297ced5c59919a3d53d5cc7/630418625279de5b10573db7_Hero%20img-Eth%202.png"
              alt=""
            />
            <img
              className="absolute w-20 left-[14rem] top-[10rem]"
              src="https://assets-global.website-files.com/6297ced5c59919a3d53d5cc7/630418611a4321f4108ef8cc_Hero%20img-Sol.png"
              alt=""
            />
            <img
              className="absolute w-[7rem] left-[64rem] top-[10rem]"
              src="https://assets-global.website-files.com/6297ced5c59919a3d53d5cc7/63041861c0d0e0cd2d52f039_Hero%20img-Klay.png"
              alt=""
            />
            <div className="ml-20 justify-start mt-52">
              <p className="font-extrabold text-black text-6xl">
                Your NFT journey starts here.
              </p>
              <p className="mt-7 font-medium">
                Guides, practical tips, and support articles for first- <br />{" "}
                time creators, experienced collectors, and everyone <br /> in
                between.
              </p>
              <div className="duration-700">
                <Link href="#section" scroll={false}>
                  <button className="mt-10 bg-white px-7 py-4 rounded-xl hover:bg-gray-600 duration-700">
                    Start Learning
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="section"
        className="flex flex-auto bg-gradient-to-br from-purple-600 via-sky-500 to-yellow-400 h-screen w-full border-collapse"
      >
        <div className="flex my-40 mx-40">
          <div className="">
            <p className="text-white font-extrabold text-4xl ">
              Learn about NFTs{" "}
            </p>
            <p className="text-white font-medium text-xl mt-5">
              An explanatory video about <br /> the NFTs Creation.
            </p>
          </div>
          <div className="ml-[5rem] w-[70rem] ">
            <video
              class="ml-32 w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
              autoPlay="true"
              muted
              controls
            >
              <source src="/static/video/nft.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
