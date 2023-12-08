import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListAccordionItem from "./listAccordionItem";
import TemplateCard from "../Template/templateCard";
import RandomOptionsCard from "../RandomOptions/randomOptionsCard";
import CharacterCard from "../Character/characterCard";
import SongCard from "../Search/songCard";
function Home() {
  //const templates = useSelector((state) => state.templatesReducer.templates);
  const templates = [
    { _id: "1", title: "Template 1" },
    { _id: "2", title: "Template 2" },
  ]; // Testing data
  const user = useSelector((state) => state.templatesReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchCategory, setSearchCategory] = useState("Templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplateID, setSelectedTemplateID] = useState(
    templates.length >= 1 ? templates[0]._id : undefined
  );
  const loggedIn = user !== undefined;

  // Save user friendly search category strings
  const searchCategoryValuesAndUIStrings = new Map();
  searchCategoryValuesAndUIStrings.set("Templates", "Templates");
  searchCategoryValuesAndUIStrings.set("Characters", "Characters");
  searchCategoryValuesAndUIStrings.set("RandomOptions", "Random Options");
  searchCategoryValuesAndUIStrings.set("ThemeSongs", "Theme Songs");

  useEffect(() => {}, []);

  const handleSearch = () => {
    console.log(`Searching for ${searchCategory} matching ${searchQuery}`);
    navigate(`/Search/${searchCategory}/${searchQuery}`);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column flex-md-row mb-2">
        <button className="btn btn-primary m-1" onClick={handleSearch}>
          Search
        </button>
        <select
          className="btn btn-secondary m-1"
          title="Search Category"
          onChange={(e) => setSearchCategory(e.target.value)}
          value={searchCategory}
        >
          <option value="Templates">Templates</option>
          <option value="Characters">Characters</option>
          <option value="RandomOptions">Random Options</option>
          <option value="ThemeSongs">Theme Songs</option>
        </select>
        <input
          className="form-control m-1"
          value={searchQuery}
          placeholder={`Search for ${searchCategoryValuesAndUIStrings
            .get(searchCategory)
            .toLowerCase()}`}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="accordion accordion-flush" id="homeContent">
        {!loggedIn ? (
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#yourStuff"
                aria-expanded="true"
                aria-controls="yourStuff"
              >
                Your Stuff
              </button>
            </h2>
            <div id="yourStuff" className="accordion-collapse collapse show">
              <div className="accordion-body row px-0">
                <div className="col-12 col-md-6">
                  <ListAccordionItem
                    id="yourTemplates"
                    title="Templates"
                    AboveListComponent={() => {
                      return (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            // Make new blank template
                            const templateID = "GetNewID";
                            if (templateID !== undefined) {
                              navigate(`/Template/${templateID}/Edit`);
                            } else {
                              // Inform user
                            }
                          }}
                        >
                          <i className="fa-solid fa-plus"></i> New Template
                        </button>
                      );
                    }}
                    listContents={[{ title: "Item 1" }, { title: "Item 2" }]}
                    ListContentsComponentType={TemplateCard}
                  />
                  <ListAccordionItem
                    id="yourRandomOptions"
                    title="Random Options"
                    AboveListComponent={() => {
                      return (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            // Make new blank RandomOptions
                            const randomOptionsID = "GetNewID";
                            if (randomOptionsID !== undefined) {
                              navigate(`/RandomOptions/${randomOptionsID}`);
                            } else {
                              // Inform user
                            }
                          }}
                        >
                          <i className="fa-solid fa-plus"></i> New Random
                          Options
                        </button>
                      );
                    }}
                    listContents={[{ title: "Item 1" }, { title: "Item 2" }]}
                    ListContentsComponentType={RandomOptionsCard}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <ListAccordionItem
                    id="yourCharacters"
                    title="Characters"
                    AboveListComponent={() => {
                      return (
                        <span>
                          <button
                            className="btn btn-primary btn-sm"
                            disabled={selectedTemplateID === undefined}
                            onClick={() => {
                              // Make new blank Character from Template
                              console.log(
                                `Making new character from template ${
                                  templates.find(
                                    (t) => t._id === selectedTemplateID
                                  ).title
                                }`
                              );
                              const characterID = "GetNewID";
                              if (characterID !== undefined) {
                                navigate(`/Character/${characterID}`);
                              } else {
                                // Inform user
                              }
                            }}
                          >
                            <i className="fa-solid fa-plus"></i> New Character
                          </button>
                          {" from "}
                          <select
                            className="btn btn-secondary"
                            title="New Character Template"
                            disabled={selectedTemplateID === undefined}
                            onChange={(e) =>
                              setSelectedTemplateID(e.target.value)
                            }
                            value={selectedTemplateID}
                          >
                            {selectedTemplateID === undefined ? (
                              <option value="NoTemplates">No Templates</option>
                            ) : (
                              templates.map((template, index) => {
                                return (
                                  <option key={index} value={template._id}>
                                    {template.title}
                                  </option>
                                );
                              })
                            )}
                          </select>
                        </span>
                      );
                    }}
                    listContents={[{ title: "Item 1" }, { title: "Item 2" }]}
                    ListContentsComponentType={CharacterCard}
                  />
                  <ListAccordionItem
                    id="yourThemeSongs"
                    title="Theme Songs"
                    AboveListComponent={() => {
                      return (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            // Search for ThemeSongs
                            navigate("/Search/ThemeSongs");
                          }}
                        >
                          <i className="fa-solid fa-magnifying-glass"></i>{" "}
                          Search for Theme Songs
                        </button>
                      );
                    }}
                    listContents={[{ title: "Item 1" }, { title: "Item 2" }]}
                    ListContentsComponentType={SongCard}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#publicStuff"
              aria-expanded="false"
              aria-controls="publicStuff"
            >
              Other's Public Stuff
            </button>
          </h2>
          <div id="publicStuff" className="accordion-collapse collapse show">
            <div className="accordion-body row px-0">
              <div className="col-12 col-md-6">
                <ListAccordionItem
                  id="publicTemplates"
                  title="Templates"
                  listContents={[{ title: "Item 1" }, { title: "Item 2" }]}
                  ListContentsComponentType={TemplateCard}
                />
                <ListAccordionItem
                  id="publicRandomOptions"
                  title="Random Options"
                  listContents={[{ title: "Item 1" }, { title: "Item 2" }]}
                  ListContentsComponentType={RandomOptionsCard}
                />
              </div>
              <div className="col-12 col-md-6">
                <ListAccordionItem
                  id="publicCharacters"
                  title="Characters"
                  listContents={[{ title: "Item 1" }, { title: "Item 2" }]}
                  ListContentsComponentType={CharacterCard}
                />
                <ListAccordionItem
                  id="publicThemeSongs"
                  title="Theme Songs"
                  listContents={[{ title: "Item 1" }, { title: "Item 2" }]}
                  ListContentsComponentType={SongCard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
