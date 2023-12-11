import { useParams } from "react-router";
import * as client from "./client";
import { findUsernameById } from "../Profile/client";
import {
  updateRandomOptions,
  setOneRandomOptions,
  deleteRandomOptions,
} from "./randomOptionsReducer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findRandomOptionsByID } from "./client";
function RandomOptions() {
  const { randomOptionsID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const randomOptions = useSelector(
    (state) => state.randomOptionsReducer.randomOptions
  );
  useEffect(() => {
    // findUsernameById(randomOptionsID.ownerID).then((username) => {
    //   setOwnerUsername(username);
    // });
    findRandomOptionsByID(randomOptionsID).then((randomOptions) => {
      if (!user || user._id !== randomOptions.ownerID) {
        navigate(`/RandomOptions/${randomOptionsID}`);
      }
      dispatch(setOneRandomOptions(randomOptions));
    });
  }, []);

  const handleSave = () => {
    if (user._id === randomOptions.ownerID) {
      client.updateRandomOptions(randomOptions).then(() => {
        dispatch(updateRandomOptions(randomOptions));
      });
    }
  };

  const handleDelete = () => {
    if (
      user._id === randomOptions.ownerID &&
      window.confirm(
        `Are you sure you want to delete ${
          randomOptions.title ? randomOptions.title : "Unnamed Random Options"
        }?`
      )
    ) {
      client.deleteRandomOptions(randomOptionsID).then(() => {
        dispatch(deleteRandomOptions(randomOptionsID));
        navigate("/Home");
      });
    }
  };

  return (
    <div>
      <h5>Title: </h5>
      <input
        className="form-control my-2"
        disabled={!user || user._id !== randomOptions._id}
        value={randomOptions.title}
        onChange={(e) =>
          dispatch(
            setOneRandomOptions({ ...randomOptions, title: e.target.value })
          )
        }
      />
      {/* <Link
        className="remove-link-decoration"
        to={`/Profile/${randomOptions.ownerID}`}
      >
        <div className="text-truncate underline-on-hover">
          By {ownerUsername}
        </div>
      </Link> */}
      <h5>Description: </h5>
      <input
        className="form-control my-2"
        disabled={!user || user._id !== randomOptions._id}
        value={randomOptions.description}
        onChange={(e) =>
          dispatch(
            setOneRandomOptions({
              ...randomOptions,
              description: e.target.value,
            })
          )
        }
      />
      <h5>Visibility: </h5>
      <select
        className="form-control my-2"
        disabled={!user || user._id !== randomOptions._id}
        value={randomOptions.visibility}
        onChange={(e) =>
          dispatch(
            setOneRandomOptions({
              ...randomOptions,
              visibility: e.target.value,
            })
          )
        }
      >
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
      <h5>Type: </h5>
      <select
        className="form-control my-2"
        value={randomOptions.type}
        disabled={!user || user._id !== randomOptions._id}
        onChange={(e) =>
          dispatch(
            setOneRandomOptions({ ...randomOptions, type: e.target.value })
          )
        }
      >
        <option value="list">List</option>
        <option value="range">Range</option>
      </select>
      {!randomOptions ||
      (randomOptions.type !== "list" && randomOptions.type !== "range") ? (
        <></>
      ) : randomOptions.type === "list" ? (
        <div>
          <h5>Options List: </h5>
          <ul className="list-group">
            {randomOptions.optionsList.map((option, index) => {
              return (
                <li
                  key={index}
                  className="d-flex flex-row align-items-center flex-nowrap list-group-item text-truncate p-2"
                >
                  <input
                    className="form-control my-2"
                    value={option}
                    disabled={!user || user._id !== randomOptions._id}
                    onChange={(e) => {
                      const alteredOptions = randomOptions.optionsList.map(
                        (o, i) => (i === index ? e.target.value : o)
                      );
                      dispatch(
                        setOneRandomOptions({
                          ...randomOptions,
                          optionsList: alteredOptions,
                        })
                      );
                    }}
                  />
                  {user && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        const alteredOptions = randomOptions.optionsList.filter(
                          (o, i) => i !== index
                        );
                        dispatch(
                          setOneRandomOptions({
                            ...randomOptions,
                            optionsList: alteredOptions,
                          })
                        );
                      }}
                    >
                      Delete
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          {user && user._id === randomOptions.ownerID && (
            <button
              className="btn btn-success"
              disabled={!user || user._id !== randomOptions._id}
              onClick={() => {
                dispatch(
                  setOneRandomOptions({
                    ...randomOptions,
                    optionsList: randomOptions.optionsList.concat([""]),
                  })
                );
              }}
            >
              Add New Option
            </button>
          )}
        </div>
      ) : (
        <div>
          <h5>Start: </h5>
          <input
            className="form-control my-2"
            value={randomOptions.start}
            disabled={!user || user._id !== randomOptions._id}
            type="number"
            onChange={(e) =>
              dispatch(
                setOneRandomOptions({
                  ...randomOptions,
                  start: e.target.value,
                })
              )
            }
          />
          <h5>End: </h5>
          <input
            className="form-control my-2"
            value={randomOptions.end}
            disabled={!user || user._id !== randomOptions._id}
            type="number"
            onChange={(e) =>
              dispatch(
                setOneRandomOptions({
                  ...randomOptions,
                  end: e.target.value,
                })
              )
            }
          />
          <h5>Step: </h5>
          <input
            className="form-control my-2"
            value={randomOptions.step}
            disabled={!user || user._id !== randomOptions._id}
            type="number"
            onChange={(e) =>
              dispatch(
                setOneRandomOptions({
                  ...randomOptions,
                  step: e.target.value,
                })
              )
            }
          />
        </div>
      )}
      {user && user._id === randomOptions.ownerID && (
        <div>
          <hr />
          <button className="btn btn-primary me-1" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-danger ms-1" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
export default RandomOptions;
