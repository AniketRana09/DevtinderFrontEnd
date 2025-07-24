import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  return (
    <div className="flex items-center justify-center  h-screen">
      <div className="md:w-2/3 w-3/4   max-w-md border-purple-600 rounded-box  border p-8 ">
        <h2 className="text-center md:text-4xl text-2xl m-2">
          {isLoginForm ? "LogIn" : "SignUp"}
        </h2>
        {!isLoginForm && (
          <>
            <label className="label" />
            First Name:
            <input
              type="text"
              value={firstName}
              className="input mt-2  p-4 mb-2 w-full"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label" />
            Last Name:
            <input
              type="email"
              value={lastName}
              className="input mt-2  p-4 mb-2 w-full"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="label" />
        Email:
        <input
          type="email"
          value={emailId}
          className="input mt-2  p-4 mb-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
        />
        <label className="label" />
        Password:
        <input
          type="password"
          value={password}
          className="input p-4 mt-2  w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 my-2 ">{error}</p>
        <button
          className="btn btn-neutral mt-4 p-4  w-3/4 mx-10"
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? "LogIn" : "SignUp"}
        </button>
        <p
          className="my-3 py-2 text-center underline cursor-pointer"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New User SignUp here" : "Already a User logIn here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
