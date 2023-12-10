import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Profile/login";
import Signup from "./Profile/signup";
import Profile from "./Profile";
import Template from "./Template";
import EditTemplate from "./Template/edit";
import Character from "./Character";
import Search from "./Search";
import SongDetails from "./ThemeSong/songDetails";
import Home from "./Home";
import RandomOptions from "./RandomOptions";
import SiteHeader from "./siteHeader";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="p-3">
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Profile/:userID" element={<Profile />} />
            <Route path="/Template/:templateID" element={<Template />} />
            <Route
              path="/Template/:templateID/Edit"
              element={<EditTemplate />}
            />
            <Route path="/Character/:characterID" element={<Character />} />
            <Route
              path="/RandomOptions/:randomOptionsID"
              element={<RandomOptions />}
            />
            <Route
              path="/Search/:searchCategory/:searchQuery"
              element={<Search />}
            />
            <Route path="/Search/:searchCategory" element={<Search />} />
            <Route path="/Search/*" element={<Search />} />
            <Route path="/SongDetails/:songID" element={<SongDetails />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}
export default App;
