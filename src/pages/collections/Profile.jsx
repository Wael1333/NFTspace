import React, { useState } from "react";
import Card from "./Card";
const Profile = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center in the parent ">
        <button onClick={toggleModal}>Open</button>
      </div>
      {modal && (
        <div className=" px-10 py-20 mx-auto  font-serif">
          <div className=" bg-slate-500" onClick={toggleModal}></div>
          <div className="modal-content">
            <h2>Hello modal</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
