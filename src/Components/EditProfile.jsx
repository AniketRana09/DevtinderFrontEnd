import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };
  return (
    <div className="flex items-center justify-center  h-screen  ">
      <div className="flex justify-center mx-5 pt-16">
        <div className="w-1/2  sm:w-96  md:w-[500px] max-w-md border-purple-600 rounded-box  border p-8 mt-16 mb-24 ">
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
            type="text"
            value={age}
            className="input p-4 my-2  w-full"
            placeholder="age"
            onChange={(e) => setAge(e.target.value)}
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
          <button
            className="btn btn-neutral mt-4 p-4  w-3/4 mx-10"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>
        <div className="mx-10">
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl, skills }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
