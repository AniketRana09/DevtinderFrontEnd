import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <h2 className=" font-semibold text-3xl text-center tracking-wider">
        Profile
      </h2>
      {user && (
        <div>
          <EditProfile user={user} />
        </div>
      )}
    </div>
  );
};

export default Profile;
