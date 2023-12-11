import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { deleteRandomOptions, addRandomOptions } from "./randomOptionsReducer";
import { useState, useEffect } from "react";
import { findUsernameById } from "../Profile/client";
function RandomOptionsCard({ content }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id, ownerID, title, description, type } = content;
  const [ownerUsername, setOwnerUsername] = useState("");
  const OPTIONS_LIST_MAX_DISPLAYED = 10;
  const user = useSelector((state) => state.userReducer.user);
  const weAreOwner = ownerID === (user && user.id);
  let isList,
    isRange = false;
  let optionsList;
  let start, end, step;

  const handleDeleteRandomOptions = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      client
        .deleteRandomOptions(_id)
        .then((result) => {
          dispatch(deleteRandomOptions(_id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCopyRandomOptions = () => {
    client
      .createRandomOptions(user._id, content)
      .then((result) => {
        dispatch(addRandomOptions(result));
        navigate(`/RandomOptions/${result._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  switch (type) {
    case "list":
      isList = true;
      ({ optionsList } = content);
      optionsList = optionsList !== undefined ? optionsList : [];
      break;
    case "range":
      isRange = true;
      ({ start, end, step } = content);
      break;
    default:
      throw new Error(`Invalid RandomOptions type given: ${type}`);
  }

  let randomOptionsBody;
  if (isList) {
    randomOptionsBody = (
      <ul className="list-group text-truncate">
        {optionsList.length > 0 ? (
          optionsList
            .slice(0, OPTIONS_LIST_MAX_DISPLAYED)
            .map((optionString, index) => {
              if (
                index === OPTIONS_LIST_MAX_DISPLAYED - 1 &&
                optionsList.length > OPTIONS_LIST_MAX_DISPLAYED
              ) {
                return (
                  <div key={index} className="list-group-item">{`and ${
                    optionsList.length - (OPTIONS_LIST_MAX_DISPLAYED - 1)
                  } more options...`}</div>
                );
              } else {
                return (
                  <div key={index} className="list-group-item">
                    {optionString}
                  </div>
                );
              }
            })
        ) : (
          <p>This list is empty :|</p>
        )}
      </ul>
    );
  }
  if (isRange) {
    randomOptionsBody = (
      <h5 className="text-wrap">
        The range from {start} to {end} inclusive
      </h5>
    );
  }

  useEffect(() => {
    findUsernameById(ownerID).then((username) => {
      setOwnerUsername(username);
    });
  }, []);

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <Link className="remove-link-decoration" to={`/RandomOptions/${_id}`}>
          <div
            className={`text-truncate ${
              !weAreOwner ? "limit-card-header" : ""
            }`}
          >
            <h3 className="mb-0">
              {title && title !== "" ? title : "Unnamed Random Options"}
            </h3>
          </div>
        </Link>
        {!weAreOwner ? (
          <Link className="remove-link-decoration" to={`/Profile/${ownerID}`}>
            <div className="text-truncate underline-on-hover">
              By {ownerUsername}
            </div>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <Link className="remove-link-decoration" to={`/RandomOptions/${_id}`}>
        {description !== "" ? (
          <div className="fst-italic text-truncate">{description}</div>
        ) : (
          <></>
        )}
        <div className="my-2">{randomOptionsBody}</div>
      </Link>
      <div className="mt-2">
        {weAreOwner ? (
          <div className="hstack gap-2">
            <button
              className="btn btn-danger btn-small"
              onClick={handleDeleteRandomOptions}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <button
              className="btn btn-warning btn-small flex-grow-1"
              onClick={() => {
                navigate(`/RandomOptions/${_id}`);
              }}
            >
              <i className="fa-solid fa-pencil"></i>&nbsp;Edit
              <span className="d-none d-sm-inline">
                &nbsp;Random&nbsp;Options
              </span>
            </button>
          </div>
        ) : (
          user !== null &&
          user !== undefined &&
          ownerID !== user._id && (
            <div className="d-grid">
              <button
                className="btn btn-warning btn-small d-block"
                onClick={handleCopyRandomOptions}
              >
                <i className="fa-solid fa-copy"></i>&nbsp;Copy
                <span className="d-none d-sm-inline">
                  &nbsp;Random&nbsp;Options
                </span>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
export default RandomOptionsCard;
