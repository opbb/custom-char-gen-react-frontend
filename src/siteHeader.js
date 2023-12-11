import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
function SiteHeader() {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className="d-flex align-items-center flex-nowrap mb-2">
      <Link to="/Home" className="remove-link-decoration flex-grow-1">
        <h1 className="d-none d-lg-inline underline-on-hover">
          Customizable Character Generator
        </h1>
        <h1 className="d-inline d-lg-none underline-on-hover">CustomCharGen</h1>
      </Link>
      <Link
        to={user ? "/Profile" : "/Login"}
        className="d-flex float-end align-items-center remove-link-decoration"
      >
        <span className="underline-on-hover">
          {user ? user.username : "Log In"}
        </span>
        <i className="fa-solid fa-circle-user fa-3x m-2"></i>
      </Link>
    </div>
  );
}
export default SiteHeader;
