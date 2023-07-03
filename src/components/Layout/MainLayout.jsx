import React, { Children } from "react";
import Navbar from "../Navbar";
function MainLayout({ children }) {
  return (
    <div>
      <Navbar></Navbar>
      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
