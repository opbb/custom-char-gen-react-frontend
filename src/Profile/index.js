import { useParams } from "react-router";
import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./userReducer";
function Profile() {
  const { userID } = useParams();
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOurProfile = userID === undefined;

  const [account, setAccount] = useState(null);

  const fetchAccount = async () => {
    const account = isOurProfile
      ? await client.account()
      : await client.findUserById(userID);
    setAccount(account);
  };
  const save = async () => {
    if (isOurProfile) {
      await client.updateUser(account);
    }
  };
  const signout = async () => {
    await client.signout();
    dispatch(setUser(null));
    navigate("/Login");
  };

  useEffect(() => {
    if (isOurProfile && !user) {
      navigate("/Login");
    }
    fetchAccount();
  }, []);
  return (
    <div className="p-3">
      <h1>Account</h1>
      <hr />
      {account &&
        (isOurProfile ? (
          <div className="d-flex flex-column">
            <ul className="list-group">
              {isOurProfile ? (
                <li className="list-group-item">
                  <span>Password: </span>
                  <input
                    className="form-control"
                    value={account.password}
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                  />
                </li>
              ) : (
                <></>
              )}
              <li className="list-group-item">
                <span>Firstname: </span>
                <input
                  className="form-control"
                  value={account.firstName}
                  onChange={(e) =>
                    setAccount({ ...account, firstName: e.target.value })
                  }
                />
              </li>
              <li className="list-group-item">
                <span>Lastname: </span>
                <input
                  className="form-control"
                  value={account.lastName}
                  onChange={(e) =>
                    setAccount({ ...account, lastName: e.target.value })
                  }
                />
              </li>
              <li className="list-group-item">
                <span>Email: </span>
                <input
                  className="form-control"
                  value={account.email}
                  onChange={(e) =>
                    setAccount({ ...account, email: e.target.value })
                  }
                />
              </li>
              <li className="list-group-item">
                <span>Role: </span>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setAccount({ ...account, role: e.target.value })
                  }
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </li>
            </ul>
            <button className="btn btn-primary my-1" onClick={save}>
              Save
            </button>
            <button className="btn btn-danger my-1" onClick={signout}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <ul className="list-group">
              {isOurProfile ? (
                <li className="list-group-item">
                  <span>Password: </span>
                  <span
                    className="form-control"
                    value={account.password}
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                  ></span>
                </li>
              ) : (
                <></>
              )}
              <li className="list-group-item">
                <span>Firstname: </span>
                <span>{account.firstName}</span>
              </li>
              <li className="list-group-item">
                <span>Lastname: </span>
                <span>{account.lastName}</span>
              </li>
              <li className="list-group-item">
                <span>Email: </span>
                <span>{account.email}</span>
              </li>
              <li className="list-group-item">
                <span>Role: </span>
                <span>{account.role}</span>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}
export default Profile;
