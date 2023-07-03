import React, { useState, useEffect } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { useAddress } from "@thirdweb-dev/react";

import { client } from "lib/sanityClient";

const UpdateUser = () => {
  const address = useAddress();

  const desc = "Hello its Deku 3";

  const [collection, setCollection] = useState({});

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "users" && walletAddress == "${address}" ]{
     profileImage,
       bannerImage,
      volumeTraded,
      userName,
      walletAddress,
      floorPrice,
      description,
      igHandle,
      twitterHandle,
      dsHandle,
      ghHandle,
    }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "data🔥");

    // the query returns 1 object inside of an array
    setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [address]);

  console.log("Collection here", collection, "image is ", collection.imageUrl);

  async function handleUpdate(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    const values = Object.fromEntries(formData);
    console.log("form values name is", values.ppic);

    if (address) {
      UpdateData();
    }

    async function UpdateData() {
      const userDoc = {
        _type: "users",
        _id: address,
        userName:
          values.userName == ""
            ? collection.userName
            : collection.userName === values.userName
            ? collection.userName
            : values.userName,
        walletAddress: address,
        description:
          values.message == ""
            ? collection.description
            : collection.description === values.message
            ? collection.description
            : values.message,

        floorPrice: collection.floorPrice,
        volumeTraded: collection.volumeTraded,
        twitterHandle:
          values.twitter == ""
            ? collection.twitterHandle
            : collection.twitterHandle === values.twitter
            ? collection.twitterHandle
            : values.twitter,

        igHandle:
          values.instagram == ""
            ? collection.igHandle
            : collection.igHandle === values.instagram
            ? collection.igHandle
            : values.instagram,

        ghHandle:
          values.github == ""
            ? collection.ghHandle
            : collection.ghHandle === values.github
            ? collection.ghHandle
            : values.github,

        dsHandle:
          values.discord == ""
            ? collection.dsHandle
            : collection.dsHandle === values.discord
            ? collection.dsHandle
            : values.discord,
        profileImage: collection.profileImage,
        bannerImage: collection.bannerImage,
      };

      const result = await client.createOrReplace(userDoc);
      console.log("databaseresult here:", result);
    }
  }
  return (
    <div>
      <MainLayout />
      <div className="flex justify-center bg-gradient-to-br from-purple-800 via-cyan-500 to-pink-700  h-screen">
        <form className="ml-40 mt-20 mb-40" onSubmit={(e) => handleUpdate(e)}>
          <p className="relative font-extrabold font-body text-5xl text-white ">
            Update your profile
          </p>

          <div className="mt-10">
            <label
              for="user"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              User Name
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="User Name"
            />
          </div>
          <div className="mt-10">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your description here..."
            ></textarea>
          </div>
          <div>
            <div class="grid gap-6 mb-6 md:grid-cols-2 mt-10">
              <div>
                <label
                  for="Instagram"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Instagram Link
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  class="bg-gray-50 border border-gray-300 text-gracyany8900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Instagram Link"
                />
              </div>
              <div>
                <label
                  for="twitter"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Twitter Link
                </label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Twitter Link"
                />
              </div>
              <div>
                <label
                  for="Github"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Github Link
                </label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Github Link"
                />
              </div>
              <div>
                <label
                  for="Discord"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Discord Link
                </label>
                <input
                  type="text"
                  id="discord"
                  name="discord"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Discord Link"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <label
              for="user"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="ppic"
              id="ppic"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="User Name"
            />
          </div>
          <div className="mt-10">
            <label
              for="user"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Banner Image
            </label>
            <input
              type="file"
              name="bpic"
              id="bpic"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-cyan-800 dark:border-cyan-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="User Name"
            />
          </div>
          <div className="flex justify-center mt-10 ">
            <button
              type="submit"
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
