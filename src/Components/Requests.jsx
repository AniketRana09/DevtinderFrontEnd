import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import { addRequests, removeRequest } from "../Utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(status, _id);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
      console.log(status, _id);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) return;

  if (request.length === 0)
    return <h1 className="text-center pt-16">No Requests Found</h1>;
  return (
    <div className="text-center  pt-16">
      <h1 className="font-semibold text-3xl">Connection Requests</h1>
      {request.map((requests) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          requests.fromUserId;
        return (
          <div
            key={_id}
            className="flex  justify-evenly p-4 m-4 w-2/3 items-center border border-purple-500 my-3 bg-gray-600 rounded-lg mx-auto"
          >
            <div>
              <img
                alt="profilePhoto"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="p-4 m-1">
              <h2 className="font-semibold text-2xltQ">
                {firstName} {lastName}
              </h2>
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-accent mx-2 my-2 md:my-0"
                onClick={() => reviewRequest("accepted", requests._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error mx-2 my-2 md:my-0"
                onClick={() => reviewRequest("rejected", requests._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
