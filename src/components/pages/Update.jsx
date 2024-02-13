import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Backdrop, CircularProgress } from "@mui/material";

const Update = () => {
  const { id } = useParams();
  const userCollectionRef = collection(db, "user");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [updateUser, setUpdateUser] = useState({
    name: "",
    age: "",
    email: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    const getSingleUser = async () => {
      const singleDoc = await getDoc(doc(db, "user", id));
      setUpdateUser({ ...singleDoc.data(), id: singleDoc.id });
      setIsLoading(false);
    };
    getSingleUser();
  }, [id]);

  const handleData = async (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
    console.log(updateUser);
  };

  const saveData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateDoc(doc(userCollectionRef, id), {
        name: updateUser.name,
        email: updateUser.email,
        age: updateUser.age,
        contact: updateUser.contact,
        address: updateUser.address,
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    toast.success("Data were updated successfully!", {
      position: "top-right",
      theme: "colored",
      autoClose: 2000,
      pauseOnHover: false,
    });
    navigate("/data");
  };

  return (
    <div>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>
          <div className="w-[50%] mx-auto m-20">
            <form onSubmit={saveData}>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm   ">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={updateUser.name}
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
                  value={updateUser.age}
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
                  value={updateUser.email}
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
                  value={updateUser.contact}
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
                  value={updateUser.address}
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  onChange={handleData}
                />
              </div>
              <div className="gap-3 flex">
                <button className="btn-1">Save</button>
              </div>
            </form>
            <div className="mt-5">
              <Link to={"/data"}>
                <button className="btn-1">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;
