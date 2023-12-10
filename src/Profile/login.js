import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./userReducer";
function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async () => {
    const user = await client.signin(credentials);
    console.log(user);
    if (user !== null) {
      await dispatch(setUser(user));
      navigate("/Profile");
    }
  };
  return (
    <div className="p-3">
      <h1>Log In</h1>
      <input
        className="form-control my-2"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        className="form-control my-2"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button className="btn btn-primary me-2" onClick={login}>
        Log In
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          navigate("/SignUp");
        }}
      >
        Need an account? Sign up here!
      </button>
    </div>
  );
}
export default Login;
