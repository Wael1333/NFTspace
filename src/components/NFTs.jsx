import React from "react";

const NFTs = (props) => {
  return (
    <div>
      <div className="flex bg-white rounded-xl w-80 h-full">
        <div className="mt-4">
          <div className=" mx-2">
            <img
              className="object-center w-[19rem] rounded-xl cursor-pointer transform transition-all hover:scale-125"
              src={props.link}
              alt="IMG"
            />
          </div>
          <div className="ml-5 text-black text-3xl font-body font-semibold">
            {props.name}
          </div>
          <div className="flex">
            <img
              className="text-green-500 w-9 h-7 ml-3 cursor-pointer"
              src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
              alt="eth"
            />
            <div className="absolute ml-10 text-green-500 font-medium">
              {props.price} ETH
            </div>
            <div className="ml-48 text-gray-400 font-medium">
              {props.id} of 123
            </div>
          </div>
          <div className="flex mt-10">
            <div className="ml-4">
              <button className="text-purple-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {props.time}{" "}
              </button>
            </div>
            <div className=" ml-28">
              <button className=" text-purple-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-7 py-2 mb-2 dark:bg-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTs;
