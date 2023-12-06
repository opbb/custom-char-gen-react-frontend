import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import "./libs/bootstrap.min.css";
import "./App.css";
import Login from "./Profile/login";
import Signup from "./Profile/signup";
import Profile from "./Profile";
import Template from "./Template";
import EditTemplate from "./Template/edit";
import Character from "./Character";
import Search from "./Search";
import SongDetails from "./Search/songDetails";
import Home from "./Home";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/:userID" element={<Profile />} />
          <Route path="/Template/:templateID" element={<Template />} />
          <Route path="/Template/:templateID/Edit" element={<EditTemplate />} />
          <Route path="/Character/:characterID" element={<Character />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/SongDetails/:songID" element={<SongDetails />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
