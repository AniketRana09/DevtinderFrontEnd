import axios from "axios";
import React from "react";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../Utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
    user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="card bg-base-300 md:w-96 w-72   shadow-sm border border-pink-500">
        <figure className="aspect-[1/1] w-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={user.photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <p>About: {about}</p>
          <p>Skills: {skills}</p>
          <div className="card-actions justify-center">
            <button
              className="btn bg-pink-400 py-1 rounded-lg"
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
            >
              Interested
            </button>
            <button
              className="btn btn-primary py-1 rounded-lg"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
