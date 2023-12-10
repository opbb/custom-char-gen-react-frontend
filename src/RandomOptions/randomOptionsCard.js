import { Link, useNavigate } from "react-router-dom";
function RandomOptionsCard({ content }) {
  const navigate = useNavigate();
  const { _id, ownerID, title, description, type } = content;
  const OPTIONS_LIST_MAX_DISPLAYED = 10;

  let isList,
    isRange = false;
  let optionsList;
  let start, end, step;

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
        The range from {start} to {end} inclusive, in steps of {step}
      </h5>
    );
  }

  const ourID = "you";
  const weAreOwner = ownerID === ourID;
  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <Link className="remove-link-decoration" to={`/RandomOptions/${_id}`}>
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
              onClick={() => {
                window.confirm(`Are you sure you want to delete ${title}?`);
              }}
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
          <div className="d-grid">
            <button
              className="btn btn-warning btn-small d-block"
              onClick={() => {
                // Copy RandomOptions
                const copyID = "copyID";
                navigate(`/RandomOptions/${copyID}`);
              }}
            >
              <i className="fa-solid fa-copy"></i>&nbsp;Copy
              <span className="d-none d-sm-inline">
                &nbsp;Random&nbsp;Options
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default RandomOptionsCard;
