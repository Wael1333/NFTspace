import { AiFillHeart } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
import { GiShare } from "react-icons/gi";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../../static/addresses";
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
} from "@thirdweb-dev/react";
import moment from "moment";

const style = {
  wrapper: `flex`,
  infoContainer: `h-28 flex flex-col flex-1 justify-between mb-[14rem]`,
  accent: `text-yellow-600 font-bold`,
  nftTitle: `text-5xl font-extrabold font-body mt-10`,
  otherInfo: `flex`,
  ownedBy: `text-[#8a939b] font-bold mr-4 mt-8`,
  likes: `flex items-center text-[#8a939b] mt-8`,
  likeIcon: `mr-1 `,
  actionButtonsContainer: `w-44`,
  actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
  actionButton: `my-2`,
  divider: `border-r-2`,
};

const GeneralDetails = ({ selectedNft, isListed, price }) => {
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  //Listing here
  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: selectedNft?.metadata.id,
    });
  //adding auction
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: selectedNft?.metadata.id,
    });

  console.log("OWNER IS DETAILS is ", isListed);
  return (
    <div className={style.wrapper}>
      <div className={style.infoContainer}>
        <div className={style.accent}></div>
        <div className={style.nftTitle}>{selectedNft?.metadata.name}</div>
        <div className="font-bold text-gray-400 mt-4">
          Desctiprion:
          <p className="text-yellow-600 font-medium text-sm mt-2">
            {selectedNft?.metadata.description}
          </p>
        </div>
        <div className={style.otherInfo}>
          <div className={style.ownedBy}>
            Owned by <span className={style.accent}>{selectedNft?.owner}</span>
            {loadingDirectListing && loadingAuction ? (
              <div className="animate-pulse  ">
                <div className="mt-10 ml-5 w-[5rem] h-[1rem] rounded-3xl bg-gray-300 "></div>
              </div>
            ) : directListing && directListing[0] ? (
              <div className="font-bold text-yellow-600 mt-8 text-lg flex">
                Price {directListing[0].currencyValuePerToken.displayValue}
                <p className="text-purple-600">
                  {" "}
                  _{directListing[0].currencyValuePerToken.symbol}
                </p>
              </div>
            ) : auctionListing && auctionListing[0] ? (
              <div className="font-bold text-yellow-600 mt-8 text-lg flex">
                Price {auctionListing[0]?.buyoutCurrencyValue.displayValue}
                <p className="text-purple-600 font-bold">
                  {" " + auctionListing[0]?.buyoutCurrencyValue.symbol}
                </p>
              </div>
            ) : (
              <div className="font-bold text-yellow-600 mt-8 text-lg">
                Item Not Listed
              </div>
            )}
            <div className={style.likes}>
              <AiFillHeart className={style.likeIcon} /> 200 favorites
            </div>
          </div>
        </div>
      </div>
      <div className={style.actionButtonsContainer}>
        <div className={style.actionButtons}>
          <div className={`${style.actionButton} ml-2`}>
            <MdRefresh />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <RiShareBoxLine />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <GiShare />
          </div>
          <div className={style.divider} />
          <div className={`${style.actionButton} mr-2`}>
            <FiMoreVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetails;
