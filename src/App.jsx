import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { Provider } from "react-redux";
import appStore from "./Utils/appstore";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
