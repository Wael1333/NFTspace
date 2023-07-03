import React, { useState, useEffect } from "react";
import { BiHeart } from "react-icons/bi";
import eth from "../assets/eth.png";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import {
  ThirdwebSDK,
  useActiveListings,
  useContract,
  useOwnedNFTs,
  useListing,
  useDirectListings,
} from "@thirdweb-dev/react";

const style = {
  wrapper: `bg-[#303339] flex-auto w-[15rem] h-[22rem] my-10 mx-6 rounded-2xl overflow-hidden cursor-pointer`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
};

const NFTCard = ({ nftItem, title, collection }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  const collectionOwner = collection;
  const { contract } = useContract(
    "0x044DF96d3e9e1aF09616bc1746562CC255bb2388"
  );
  const router = useRouter();
  const {
    data: directListings,
    isLoading,
    error2,
  } = useDirectListings(contract, { start: 0, count: 100 });

  useEffect(() => {
    const listing = directListings?.find(
      (listing) => listing.id === nftItem.metadata.id
    );
    if (Boolean(listing)) {
      setIsListed(true);
      setPrice(listing.currencyValuePerToken.displayValue);
    }
  });

  console.log("the Lsting result is here FIIIRE ----------- ", {
    price,
    isListed,
    directListings,
    nftItem,
  });
  return (
    <div className="inline-block sm:mx-10">
      <div
        className={style.wrapper}
        onClick={() => {
          router.push({
            pathname: `/nfts/${nftItem.metadata.id}`,
            query: { isListed: isListed },
          });
        }}
      >
        <div className={style.imgContainer}>
          <img
            src={nftItem.metadata.image}
            alt={nftItem.metadata.name}
            className={style.nftImg}
          />
        </div>
        <div className={style.details}>
          <div className={style.info}>
            <div className={style.infoLeft}>
              <div className={style.collectionName}>
                {title !== null ? title : " "}
              </div>
              <div className={style.assetName}>{nftItem.metadata.name}</div>
            </div>
            {isListed && (
              <div className={style.infoRight}>
                <div className={style.priceTag}>Price</div>
                <div className={style.priceValue}>
                  <Image
                    src={eth}
                    width={30}
                    alt="eth"
                    className={style.ethLogo}
                  />
                  {price}
                </div>
              </div>
            )}
          </div>
          <div className={style.likes}>
            <span className={style.likeIcon}>
              <BiHeart />
            </span>{" "}
            {nftItem.likes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
