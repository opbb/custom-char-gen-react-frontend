import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
function SiteHeader() {
  const user = useSelector((state) => state.userReducer.user);
  const [loggedIn, setLoggedIn] = useState(user !== undefined && user !== null);

  useEffect(() => {
    setLoggedIn(user !== undefined && user !== null);
  }, [user, setLoggedIn]);
  return (
    <div className="d-flex align-items-center flex-nowrap mb-2">
      <Link to="/Home" className="remove-link-decoration flex-grow-1">
        <h1 className="d-none d-lg-inline">Customizable Character Generator</h1>
        <h1 className="d-inline d-lg-none">CustomCharGen</h1>
      </Link>
      <Link
        to={loggedIn ? "/Profile" : "/Login"}
        className="d-flex float-end align-items-center remove-link-decoration"
      >
        <span className="underline-on-hover">
          {loggedIn ? user.username : "Log In"}
        </span>
        <i className="fa-solid fa-circle-user fa-3x m-2"></i>
      </Link>
    </div>
  );
}
export default SiteHeader;
