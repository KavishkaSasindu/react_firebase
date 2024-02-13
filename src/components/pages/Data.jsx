import React, { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";

const Data = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userCollectionRef = collection(db, "user");

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const data = await getDocs(userCollectionRef);
      setUserData(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
      setIsLoading(false);
    };

    getUserData();
  }, []);

  const handleDelete = async (id) => {
    const deleteVal = doc(db, "user", id);
    await deleteDoc(deleteVal);

    toast.success("Delete success", {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
    setInterval(() => {
      location.reload();
    }, 2000);
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl  p-5">
          Contact Management Page
        </h1>
      </div>
      <div className="flex flex-col justify-center w-[20%] items-center m-4">
        <Link to={"/create"}>
          <button className="btn-1">Add Contact</button>
        </Link>
      </div>
      <div>
        {isLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="w-[90%] mx-auto relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-black ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.age}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.contact}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.address}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex flex-col gap-3 md:flex-row ">
                        <button
                          className="btn-1"
                          onClick={() => navigate(`/update/${user.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-1"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;
