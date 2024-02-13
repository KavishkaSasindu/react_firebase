import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const userCollectionRef = collection(db, "user");

  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate();

  const handleData = async (e) => {
    e.preventDefault();
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async (e) => {
    e.preventDefault();
    const data = await addDoc(userCollectionRef, {
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      contact: newUser.contact,
      address: newUser.address,
    });

    if (data) {
      toast.success("Data were added!", {
        position: "top-right",
        theme: "colored",
        autoClose: 5000,
        pauseOnHover: false,
      });
    } else {
      toast.error("Something went Wrong!", {
        position: "top-right",
        theme: "colored",
        autoClose: 5000,
        pauseOnHover: false,
      });
    }

    navigate("/data");
  };

  return (
    <div className="w-full">
      <div className="w-[50%] mx-auto m-20">
        <form onSubmit={addUser}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm   ">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleData}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="age" className="block mb-2 text-sm   ">
              Your Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleData}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm   ">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
              required
              onChange={handleData}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contact" className="block mb-2 text-sm   ">
              Your Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleData}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2 text-sm   ">
              Your Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleData}
            />
          </div>
          <div className="gap-3 flex">
            <button className="btn-1">Add User</button>
          </div>
        </form>
        <div className="mt-5">
          <Link to={"/data"}>
            <button className="btn-1">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Create;
