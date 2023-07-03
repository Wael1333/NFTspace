import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
const Error = () => {
  return (
    <div>
      <MainLayout />

      <div className="flex justify-center text-white font-bold text-6xl mt-80">
        <div className="">
          <p className=" flex justify-center text-8xl"> Error 404!</p>
          <p className="mt-20"> Something went wrong with the search!</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
