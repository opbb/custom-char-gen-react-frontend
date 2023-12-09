import { Link, useNavigate } from "react-router-dom";
function TemplateCard({ content }) {
  const navigate = useNavigate();
  const { _id, ownerID, title, description, traits } = content;
  const ourID = "you";
  const weAreOwner = ownerID === ourID;
  return (
    <div>
      <Link className="remove-link-decoration" to={`/Template/${_id}`}>
        <div className="d-flex flex-row justify-content-between">
          <div
            className={`text-truncate ${
              !weAreOwner ? "limit-card-header" : ""
            }`}
          >
            <h3 className="mb-0">{title}</h3>
          </div>
          {!weAreOwner ? (
            <Link className="remove-link-decoration" to={`/Profile/${ownerID}`}>
              <div className="text-truncate underline-on-hover">
                By {ownerID}
              </div>
            </Link>
          ) : (
            <></>
          )}
        </div>
        {description !== "" ? (
          <div className="fst-italic text-truncate">{description}</div>
        ) : (
          <></>
        )}
        {traits ? (
          <div className="d-flex flex-row flex-wrap justify-content-around mt-1">
            {traits.map((trait, index) => {
              return (
                <div className="text-truncate m-1 p-2 border rounded-2 text-center">
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
              onClick={() => {
                window.confirm(`Are you sure you want to delete ${title}?`);
              }}
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button
              className="btn btn-warning btn-small flex-grow-1"
              onClick={() => {
                window.confirm(`Are you sure you want to delete ${title}?`);
              }}
            >
              <i class="fa-solid fa-pencil"></i>&nbsp;Edit
              <span className="d-none d-sm-inline">&nbsp;Template</span>
            </button>
            <button
              className="btn btn-success btn-small flex-grow-1"
              onClick={() => {
                window.confirm(`Are you sure you want to delete ${title}?`);
              }}
            >
              <i class="fa-solid fa-dice-d20"></i>&nbsp;Generate
              <span className="d-none d-sm-inline">&nbsp;Character</span>
            </button>
          </div>
        ) : (
          <div className="d-grid">
            <button
              className="btn btn-warning btn-small d-block"
              onClick={() => {
                // Copy Character
                const copyID = "copyID";
                navigate(`/Template/${copyID}`);
              }}
            >
              <i class="fa-solid fa-copy"></i>&nbsp;Copy
              <span className="d-none d-sm-inline">&nbsp;Template</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default TemplateCard;
