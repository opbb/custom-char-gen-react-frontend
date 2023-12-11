import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { deleteTemplate, addTemplate } from "./templatesReducer";
import { useDispatch, useSelector } from "react-redux";
function TemplateCard({ content }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id, ownerID, title, description, traits } = content;
  const user = useSelector((state) => state.userReducer.user);
  const traitsExist = traits !== undefined && traits.length >= 1;
  const weAreOwner = ownerID === (user && user._id);

  const handleDeleteTemplate = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      client
        .deleteTemplate(_id)
        .then((result) => {
          dispatch(deleteTemplate(_id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEditTemplate = () => {
    navigate(`/Template/${_id}/Edit`);
  };

  const handleGenerateCharacter = () => {
    // generate new character
    const newCharID = "newCharID";
    navigate(`/Character/${newCharID}`);
  };

  const handleCopyTemplate = () => {
    client
      .createTemplate(user._id, content)
      .then((result) => {
        dispatch(addTemplate(result));
        navigate(`/Template/${result._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <Link className="remove-link-decoration" to={`/Template/${_id}`}>
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
      <Link className="remove-link-decoration" to={`/Template/${_id}`}>
        {description !== "" ? (
          <div className="fst-italic text-truncate">{description}</div>
        ) : (
          <></>
        )}
        {traits ? (
          <div className="d-flex flex-row flex-wrap justify-content-around mt-1">
            {traits.map((trait, index) => {
              return (
                <div
                  key={index}
                  className="text-truncate m-1 p-2 border rounded-2 text-center"
                >
                  <h5>{trait.title}</h5>
                  <span>{trait.randomOptionsID}</span>
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
              onClick={handleDeleteTemplate}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <button
              className="btn btn-warning btn-small flex-grow-1"
              onClick={handleEditTemplate}
            >
              <i className="fa-solid fa-pencil"></i>&nbsp;Edit
              <span className="d-none d-sm-inline">&nbsp;Template</span>
            </button>
            <button
              className="btn btn-success btn-small flex-grow-1"
              disabled={!traitsExist}
              onClick={handleGenerateCharacter}
            >
              <i className="fa-solid fa-dice-d20"></i>&nbsp;Generate
              <span className="d-none d-sm-inline">&nbsp;Character</span>
            </button>
          </div>
        ) : (
          user !== null &&
          user !== undefined && (
            <div className="d-grid">
              <button
                className="btn btn-warning btn-small d-block"
                onClick={handleCopyTemplate}
              >
                <i className="fa-solid fa-copy"></i>&nbsp;Copy
                <span className="d-none d-sm-inline">&nbsp;Template</span>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
export default TemplateCard;
