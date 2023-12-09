import { Link } from "react-router-dom";

function SiteHeader() {
  const loggedIn = false;
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
          {loggedIn ? "ADD USERNAME" : "Log In"}
        </span>
        <i className="fa-solid fa-circle-user fa-3x m-2"></i>
      </Link>
    </div>
  );
}
export default SiteHeader;
