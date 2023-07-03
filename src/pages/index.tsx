import Image from "next/image";
import { Inter } from "next/font/google";
import { Web3Button, useAddress } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar.jsx";
import Welcome from "./collections/Welcome.jsx";
import ErrorPage from "../components/Error/Errorpage.jsx";
import Stats from "./collections/Stats.jsx";
import Resources from "./collections/Resources.jsx";
import Create from "./collections/Create.jsx";
import Register from "./collections/Register.jsx";
import Login from "./collections/Login.jsx";
import Footer from "../components/Footer.jsx";
import Link from "next/link.js";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { client } from "../../lib/SanityClient.js";
const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Welcome></Welcome>
      <Footer></Footer>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
