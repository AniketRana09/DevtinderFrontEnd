// import { useDispatch, useSelector } from "react-redux";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import { Outlet, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../Utils/constants";
// import { addUser } from "../Utils/userSlice";
// import { useEffect } from "react";
// import axios from "axios";

// const Body = () => {
//   const userData = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const fetchUser = async () => {
//     if (userData) return;
//     try {
//       const res = await axios.get(BASE_URL + "/profile/view", {
//         withCredentials: true,
//       });
//       dispatch(addUser(res.data));
//     } catch (err) {
//       if (err.response.status === 401) {
//         navigate("/login");
//       } else {
//         console.log("Error:" + err.message);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// };

// export default Body;

import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";
import { addUser } from "../Utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    // Only fetch if userData is empty
    if (Object.keys(userData).length !== 0) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      } else {
        console.error("Error:", err.message);
      }
    }
  };

  // Call on every path change to support navigation
  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
