import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setUser } from "./userReducer";
function Signup() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      const user = await client.signup(credentials);
      dispatch(setUser(user));
      navigate("/Profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="p-3">
      <h1>Sign Up</h1>
      {error && <div>{error}</div>}
      <input
        className="form-control my-2"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            username: e.target.value,
          })
        }
      />
      <input
        className="form-control mt-2"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
      />
      <div className="fst-italic my-1">
        Warning: Please do not use a password you use elsewhere. This app is
        insecure.
      </div>
      <button className="btn btn-primary me-2" onClick={signup}>
        Sign Up
      </button>
      <button
        className="btn btn-secondary m"
        onClick={() => {
          navigate("/Login");
        }}
      >
        Already have an account? Sign in here!
      </button>
    </div>
  );
}
export default Signup;
