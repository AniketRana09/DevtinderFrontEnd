import React, { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/connectionSlice";

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connection) return;

  if (connection.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="text-center my-10 ">
      <h1 className="font-semibold text-3xl">Connections</h1>
      {connection.map((connections) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connections;
        return (
          <div
            key={connections._id}
            className="flex justify-between p-5 m-4 w-1/2 items-center border border-purple-500 my-3 bg-gray-600 rounded-lg mx-auto"
          >
            <div className="">
              <img
                alt="profilePhoto"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className=" w-full p-4 m-1">
              <h2 className="font-semibold text-2xl">
                {firstName} {lastName}
              </h2>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
