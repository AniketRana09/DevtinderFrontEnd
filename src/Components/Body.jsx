import Footer from "./Footer";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
