import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center  w-full h-full my-44">
      <div className="flex   flex-col   md:w-1/3 w-1/2 border-base-300 rounded-box  border p-5 ">
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
