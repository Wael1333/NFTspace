import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import NFTImage from "../../components/NFT/NFTImage";
import GeneralDetails from "../../components/NFT/GeneralDetails";
import ItemActivity from "../../components/NFT/ItemActivity";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useContract, useNFTs, useNFT } from "@thirdweb-dev/react";
const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const compa = () => {
  const [selectedNft, setSelectedNft] = useState();
  const router = useRouter();
  const { contract } = useContract(
    "0x890B3077D78BD03724E61C93C7a46bBDe55EC089"
  );
  //get NFTs
  const {
    data: nfts,
    isLoading1,
    error1,
  } = useNFTs(contract, { start: 0, count: 100 });

  //get all NFTs

  useEffect(() => {
    if (!nfts) return;
    (async () => {
      const selectedNftItem = nfts?.find(
        (nft) => nft.metadata.id === router.query.nftId
      );
      setSelectedNft(selectedNftItem);
    })();
  }, [nfts]);

  console.log("THIS IS WHERE IT IS", nfts, selectedNft);
  return (
    <div>
      <MainLayout />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
};

export default compa;
