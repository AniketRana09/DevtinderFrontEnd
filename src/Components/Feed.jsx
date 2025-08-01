import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log("Error :" + err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0) {
    return <h1 className="flex justify-center  pt-20">No New User found</h1>;
  }
  return (
    feed && (
      <div className="flex w-2/3 md:w-full justify-center pt-8  md:pt-20">
        <h1 className="md:text-4xl text-2xl font-semibold md:pt-10 pt-20 pl-30">
          Feed:
        </h1>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
