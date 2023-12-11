import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import { findUsernameById } from "../Profile/client";
import { updateTemplate, setTemplate } from "./templatesReducer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findTemplateByID } from "./client";
import { findRandomOptionsByID } from "../RandomOptions/client";
function Template() {
  const { templateID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const template = useSelector((state) => state.templatesReducer.template);
  const user = useSelector((state) => state.userReducer.user);
  const [allRandomOptions, setAllRandomOptions] = useState(null);

  useEffect(() => {
    // findUsernameById(templateID.ownerID).then((username) => {
    //   setOwnerUsername(username);
    // });
    findTemplateByID(templateID).then(async (template) => {
      dispatch(setTemplate(template));
      const allRandomOptionsPromises = template.traits.map((trait) =>
        findRandomOptionsByID(trait.randomOptionsID)
      );
      setAllRandomOptions(await Promise.all(allRandomOptionsPromises));
    });
  }, []);

  const handleEditTemplate = () => {
    navigate(`/Template/${templateID}/Edit`);
  };

  return (
    <div>
      <h2>
        {template.title && template.title !== ""
          ? template.title
          : "Unnamed Template"}
      </h2>
      {/* <Link
        className="remove-link-decoration"
        to={`/Profile/${template.ownerID}`}
      >
        <div className="text-truncate underline-on-hover">
          By {ownerUsername}
        </div>
      </Link> */}
      <h4>{template.description}</h4>
      <p className="fst-italic">Visibility: {template.visibility}</p>
      <ul className="list-group">
        {template.traits.map((trait, index) => {
          return (
            <li
              key={index}
              className="list-group-item text-truncate m-1 p-2 border rounded-2 text-center"
            >
              <h5>{trait.title}</h5>
              <span>
                {allRandomOptions
                  ? allRandomOptions.find(
                      (r) => trait.randomOptionsID === r._id
                    ).title
                  : trait.randomOptionsID}
              </span>
            </li>
          );
        })}
      </ul>
      {user && user._id === template.ownerID && (
        <button className="btn btn-warning" onClick={handleEditTemplate}>
          <i className="fa-solid fa-pencil"></i>&nbsp;Edit Template
        </button>
      )}
    </div>
  );
}
export default Template;
