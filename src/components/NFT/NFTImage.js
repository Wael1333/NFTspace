import { IoMdSnow } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";

const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg border-[#151c22] border w-[25rem]`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end`,
};

const NFTImage = ({ selectedNft }) => {
  return (
    <div>
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          <IoMdSnow />
          <div className={style.likesCounter}>
            <AiOutlineHeart />
            200
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-[25rem] border-slate-800 rounded-b-3xl border-4"
          src={selectedNft?.metadata.image}
        />
      </div>
    </div>
  );
};

export default NFTImage;
