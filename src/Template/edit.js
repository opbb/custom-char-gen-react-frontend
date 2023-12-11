import { useParams } from "react-router";
import * as client from "./client";
import { findUsernameById } from "../Profile/client";
import {
  updateTemplate,
  setTemplate,
  deleteTemplate,
} from "./templatesReducer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findTemplateByID } from "./client";
import { findMultipleRandomOptionsByOwner } from "../RandomOptions/client";
import { setRandomOptions } from "../RandomOptions/randomOptionsReducer";
function EditTemplate() {
  const { templateID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const template = useSelector((state) => state.templatesReducer.template);
  const user = useSelector((state) => state.userReducer.user);
  const allRandomOptions = useSelector(
    (state) => state.randomOptionsReducer.allRandomOptions
  );
  useEffect(() => {
    // findUsernameById(templateID.ownerID).then((username) => {
    //   setOwnerUsername(username);
    // });
    findTemplateByID(templateID).then((template) => {
      if (user && user._id === template.ownerID) {
        dispatch(setTemplate(template));
        findMultipleRandomOptionsByOwner(user._id).then((yourRandomOptions) => {
          console.log(yourRandomOptions);
          dispatch(setRandomOptions(yourRandomOptions));
        });
      } else {
        navigate(`/Template/${templateID}`);
      }
    });
  }, []);

  const handleSave = () => {
    if (user._id === template.ownerID) {
      client.updateTemplate(template).then(() => {
        dispatch(updateTemplate(template));
      });
    }
  };

  const handleDelete = () => {
    if (
      user._id === template.ownerID &&
      window.confirm(
        `Are you sure you want to delete ${
          template.title ? template.title : "Unnamed Template"
        }?`
      )
    ) {
      client.deleteTemplate(templateID).then(() => {
        dispatch(deleteTemplate(templateID));
        navigate("/Home");
      });
    }
  };

  const handleStopEditing = () => {
    navigate(`/Template/${templateID}`);
  };

  return (
    <div>
      <h5>Title: </h5>
      <input
        className="form-control my-2"
        value={template.title}
        onChange={(e) =>
          dispatch(setTemplate({ ...template, title: e.target.value }))
        }
      />
      {/* <Link
        className="remove-link-decoration"
        to={`/Profile/${template.ownerID}`}
      >
        <div className="text-truncate underline-on-hover">
          By {ownerUsername}
        </div>
      </Link> */}
      <h5>Description: </h5>
      <input
        className="form-control my-2"
        value={template.description}
        onChange={(e) =>
          dispatch(setTemplate({ ...template, description: e.target.value }))
        }
      />
      <h5>Visibility: </h5>
      <select
        className="form-control my-2"
        value={template.visibility}
        onChange={(e) =>
          dispatch(setTemplate({ ...template, visibility: e.target.value }))
        }
      >
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
      <h5>Traits: </h5>
      <ul className="list-group">
        {template.traits.map((trait, index) => {
          return (
            <li
              key={index}
              className="list-group-item text-truncate m-1 p-2 border rounded-2"
            >
              <h6>Title: </h6>
              <input
                className="form-control my-2"
                value={trait.title}
                onChange={(e) => {
                  const alteredTraits = template.traits.map((t, i) =>
                    i === index
                      ? {
                          title: e.target.value,
                          type: t.type,
                          randomOptionsID: t.randomOptionsID,
                        }
                      : t
                  );
                  dispatch(setTemplate({ ...template, traits: alteredTraits }));
                }}
              />
              <h6>Type: </h6>
              <select
                className="form-control my-2"
                value={trait.type}
                onChange={(e) => {
                  const alteredTraits = template.traits.map((t, i) =>
                    i === index
                      ? {
                          title: t.title,
                          type: e.target.value,
                          randomOptionsID: t.randomOptionsID,
                        }
                      : t
                  );
                  dispatch(setTemplate({ ...template, traits: alteredTraits }));
                }}
              >
                <option value="text">Text</option>
                <option value="longText">Long Text</option>
                <option value="number">Number</option>
              </select>
              <h6>Random Options: </h6>
              <select
                className="form-control my-2"
                value={trait.randomOptionsID}
                onChange={(e) => {
                  const alteredTraits = template.traits.map((t, i) =>
                    i === index
                      ? {
                          title: t.title,
                          type: t.type,
                          randomOptionsID: e.target.value,
                        }
                      : t
                  );
                  dispatch(setTemplate({ ...template, traits: alteredTraits }));
                }}
              >
                {allRandomOptions.map((randomOptions) => {
                  return (
                    <option value={randomOptions._id}>
                      {randomOptions.title
                        ? randomOptions.title
                        : "Unnamed Random Options"}
                    </option>
                  );
                })}
              </select>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  const alteredTraits = template.traits.filter(
                    (t, i) => i !== index
                  );
                  dispatch(setTemplate({ ...template, traits: alteredTraits }));
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="btn btn-success"
        onClick={() => {
          dispatch(
            setTemplate({
              ...template,
              traits: template.traits.concat([
                { title: "", type: "text", randomOptionsID: "" },
              ]),
            })
          );
        }}
      >
        Add New Trait
      </button>
      <hr />
      <button className="btn btn-primary me-1" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-secondary mx-1" onClick={handleStopEditing}>
        Stop Editing
      </button>
      <button className="btn btn-danger ms-1" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
export default EditTemplate;
