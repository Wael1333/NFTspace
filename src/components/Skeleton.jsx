import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="flex w-[37rem] ">
        <div className="mt-6 w-1/2 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
          <div className="flex flex-col space-y-2">
            <div className="mb-2 w-[12rem] h-[11rem] rounded-3xl bg-gray-300 "></div>
            <div className="w-[6rem] h-[1rem] rounded-3xl bg-gray-300 "></div>
            <div className="flex">
              <div className=" w-[4rem] h-[1rem] rounded-3xl bg-gray-300 "></div>
              <div className="ml-14 w-[3rem] h-[1rem] rounded-3xl bg-gray-300 "></div>
            </div>
            <div className="flex">
              <div className="mt-4 w-[4rem] h-[1rem] rounded-3xl bg-gray-300 "></div>
              <div className="ml-14 mt-4 w-[4rem] h-[1rem] rounded-3xl bg-gray-300 "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeleton;
