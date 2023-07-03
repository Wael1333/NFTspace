import React from "react";
import MainLayout from "../../../components/Layout/MainLayout";
import NFTImage from "../../../components/NFT/NFTImage";
import GeneralDetails from "../../../components/NFT/GeneralDetails";
import ItemActivity from "../../../components/NFT/ItemActivity";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  useContract,
  useNFTs,
  useNFT,
  useDirectListings,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import Buy from "../../../components/NFT/Buy";
import { Toaster } from "react-hot-toast";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../../static/addresses";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]  `,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const compa = () => {
  const [selectedNft, setSelectedNft] = useState();
  const router = useRouter();
  const { isListed } = router.query;
  console.log("Onwer is here FIREEE ", isListed);
  //GEttting my nfts Set
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: NftCollection, isLoading: loadingCollection } = useContract(
    NFT_COLLECTION_ADDRESS
  );
  const { data: nft, isLoading: loadingNfts } = useNFTs(NftCollection);
  const nfts = nft;

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: selectedNft?.metadata.id,
    });
  //SEtting a price
  const [Price, setPrice] = useState("0");

  useEffect(() => {
    if (!selectedNft) return;
    (async () => {
      if (directListing && directListing[0]) {
        setPrice(directListing[0]?.currencyValuePerToken.displayValue);
      }
    })();
  }, [selectedNft]);
  console.log("PRice is ", Price);

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
    <div className="static bg-gradient-to-br from-purple-800 via-cyan-600 to-yellow-600 w-screen h-[250rem]">
      <MainLayout />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails
                className=" max-h-screen"
                selectedNft={selectedNft}
                isListed={isListed}
                price={Price}
              />
              <Buy isListed={router.query.isListed} selectedNft={selectedNft} />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
      <div className=""> </div>
    </div>
  );
};

export default compa;
