import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const Stats = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-700 via-sky-500 to-yellow-500">
      <div className="mx-10 my-10">
        <p className="font-extrabold font-body text-6xl text-white">
          There is no statics yet .. <br /> comming soon.
        </p>
        <div className="absolute right-0 top-0 justify-center mt-20 ">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default Stats;
