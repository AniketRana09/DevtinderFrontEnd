import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="card bg-base-300 w-96 shadow-sm border border-pink-500">
        <figure>
          <img className="" src={user.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user.firstName} {user.lastName}
          </h2>
          <p>Age:{user.age}</p>
          <p>About: {user.about}</p>
          <p>Skills: {user.skills.join(",")}</p>
          <div className="card-actions justify-center">
            <button className="btn bg-pink-400 py-1 rounded-lg">
              Interested
            </button>
            <button className="btn btn-primary py-1 rounded-lg">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
