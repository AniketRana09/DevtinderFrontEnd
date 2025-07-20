import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("virat@example.com");
  const [password, setPassword] = useState("Password@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    }
  };
  return (
    <div className="flex items-center justify-center  h-screen  ">
      <div className="w-2/3  sm:w-1/3 max-w-md border-purple-600 rounded-box  border p-8 ">
        <h2 className="text-center md:text-4xl text-2xl m-2">Log in</h2>
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
        <button
          className="btn btn-neutral mt-4 p-4  w-3/4 mx-auto"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
