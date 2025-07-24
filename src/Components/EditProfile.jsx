import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [error, setError] = useState("");
  const [showToast, setShowTest] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills: Array.isArray(skills)
            ? skills
            : typeof skills === "string"
            ? skills.split(",")
            : [],
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      dispatch(addUser(res?.data?.data));
      setShowTest(true);

      setTimeout(() => {
        setShowTest(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center  h-screen pt-20">
      <div className="flex  justify-center mx-5 md:pt-20 pt-190">
        <div className="md:w-3/4 w-full sm:w-96   max-w-md border-purple-600 rounded-box  border p-8  md:mt-16 md:mb-24 ">
          <h2 className="text-center md:text-4xl text-2xl m-2">Edit Profile</h2>
          <label className="label" />
          First Name:
          <input
            type="text"
            value={firstName}
            className="input my-2  p-4 mb-2 w-full"
            placeholder="firstname"
            onChange={(e) => setfirstName(e.target.value)}
          />
          <label className="label" />
          Last Name:
          <input
            type="text"
            value={lastName}
            className="input p-4 my-2  w-full"
            placeholder="lastname"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="label" />
          Age:
          <input
            type="number"
            value={age}
            className="input p-4 my-2  w-full"
            placeholder="age"
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <label className="label" />
          Gender:
          <input
            type="text"
            value={gender}
            className="input p-4 my-2  w-full"
            placeholder="gender"
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="label" />
          Photo Url:
          <input
            type="text"
            value={photoUrl}
            className="input p-4 my-2  w-full"
            placeholder="photurl"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <label className="label" />
          About:
          <input
            type="text"
            value={about}
            className="input p-4 my-2  w-full"
            placeholder="about"
            onChange={(e) => setAbout(e.target.value)}
          />
          <label className="label" />
          Skills:
          <input
            type="text"
            value={skills}
            className="input p-4 my-2  w-full"
            placeholder="skills"
            onChange={(e) => setSkills(e.target.value)}
          />
          <p className=" text-red-500">{error}</p>
          <button
            className="btn btn-neutral mt-4 p-4  w-3/4 mx-10"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>
      <div className="mx-10">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl, skills }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
