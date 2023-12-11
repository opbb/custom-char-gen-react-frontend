import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { deleteCharacter, addCharacter } from "./charactersReducer";
function CharacterCard({ content }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id, ownerID, traits } = content;
  const user = useSelector((state) => state.userReducer.user);
  const weAreOwner = ownerID === (user && user.id);
  const traitsExist = traits !== undefined && traits.length >= 1;
  const title = traitsExist ? traits[0].value : "Blank Character :|";

  const handleDeleteCharacter = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      client
        .deleteCharacter(_id)
        .then((result) => {
          dispatch(deleteCharacter(_id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCopyCharacter = () => {
    client
      .createCharacter(user._id, content)
      .then((result) => {
        dispatch(addCharacter(result));
        navigate(`/Character/${result._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <Link className="remove-link-decoration" to={`/Character/${_id}`}>
          <div
            className={`text-truncate ${
              !weAreOwner ? "limit-card-header" : ""
            }`}
          >
            <h3 className="mb-0">{title}</h3>
          </div>
        </Link>
        {!weAreOwner ? (
          <Link className="remove-link-decoration" to={`/Profile/${ownerID}`}>
            <div className="text-truncate underline-on-hover">By {ownerID}</div>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <Link className="remove-link-decoration" to={`/Character/${_id}`}>
        {traitsExist ? (
          <div className="d-flex flex-row flex-wrap justify-content-around mt-1">
            {traits.map((trait, index) => {
              return (
                <div
                  key={index}
                  className="m-1 p-2 text-truncate border rounded-2 text-center"
                >
                  <h5>{trait.title}</h5>
                  <span>{trait.value}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </Link>
      <div className="mt-2">
        {weAreOwner ? (
          <div className="hstack gap-2">
            <button
              className="btn btn-danger btn-small"
              onClick={handleDeleteCharacter}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <button
              className="btn btn-warning btn-small flex-grow-1"
              onClick={() => {
                navigate(`/Character/${_id}`);
              }}
            >
              <i className="fa-solid fa-pencil"></i>&nbsp;Edit
              <span className="d-none d-sm-inline">&nbsp;Character</span>
            </button>
          </div>
        ) : (
          user !== null &&
          user !== undefined && (
            <div className="d-grid">
              <button
                className="btn btn-warning btn-small d-block"
                onClick={handleCopyCharacter}
              >
                <i className="fa-solid fa-copy"></i>&nbsp;Copy
                <span className="d-none d-sm-inline">&nbsp;Character</span>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
export default CharacterCard;
