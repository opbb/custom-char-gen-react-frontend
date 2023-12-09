import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListAccordionItem from "./listAccordionItem";
import TemplateCard from "../Template/templateCard";
import RandomOptionsCard from "../RandomOptions/randomOptionsCard";
import CharacterCard from "../Character/characterCard";
import SongCard from "../Search/songCard";
import {
  yourTemplates,
  yourCharacters,
  yourRandomOptions,
  yourThemeSongs,
  featuredCharacters,
  featuredRandomOptions,
  featuredThemeSongs,
  feturedTemplates,
} from "../testData";
function Home() {
  //const templates = useSelector((state) => state.templatesReducer.templates);

  const user = useSelector((state) => state.templatesReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchCategory, setSearchCategory] = useState("Templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(
    yourTemplates.length >= 1 ? yourTemplates[0] : undefined
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
                    listContents={yourTemplates}
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
                    listContents={yourRandomOptions}
                    ListContentsComponentType={RandomOptionsCard}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <ListAccordionItem
                    id="yourCharacters"
                    title="Characters"
                    AboveListComponent={() => {
                      return (
                        <span className="d-flex flex-row flex-nowrap">
                          <button
                            className="btn btn-primary btn-sm text-nowrap"
                            disabled={
                              selectedTemplate === undefined ||
                              selectedTemplate.traits == undefined ||
                              selectedTemplate.traits.length < 1
                            }
                            onClick={() => {
                              // Make new blank Character from Template
                              console.log(
                                `Making new character from template ${
                                  yourTemplates.find(
                                    (t) => t._id === selectedTemplate._id
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
                          &nbsp;from&nbsp;
                          <select
                            className="btn btn-secondary text-truncate"
                            title="New Character Template"
                            disabled={selectedTemplate === undefined}
                            onChange={(e) =>
                              setSelectedTemplate(
                                yourTemplates.find(
                                  (template) => template._id === e.target.value
                                )
                              )
                            }
                            value={
                              selectedTemplate
                                ? selectedTemplate._id
                                : undefined
                            }
                          >
                            {selectedTemplate === undefined ? (
                              <option value="NoTemplates">No Templates</option>
                            ) : (
                              yourTemplates.map((template, index) => {
                                return (
                                  <option key={index} value={template._id}>
                                    <span>{template.title}</span>
                                  </option>
                                );
                              })
                            )}
                          </select>
                        </span>
                      );
                    }}
                    listContents={yourCharacters}
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
                    listContents={yourThemeSongs}
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
              data-bs-target="#featuredStuff"
              aria-expanded="false"
              aria-controls="featuredStuff"
            >
              Daily Featured Content
            </button>
          </h2>
          <div id="featuredStuff" className="accordion-collapse collapse show">
            <div className="accordion-body row px-0">
              <div className="col-12 col-md-6">
                <ListAccordionItem
                  id="featuredTemplates"
                  title="Templates"
                  listContents={feturedTemplates}
                  ListContentsComponentType={TemplateCard}
                />
                <ListAccordionItem
                  id="featuredRandomOptions"
                  title="Random Options"
                  listContents={featuredRandomOptions}
                  ListContentsComponentType={RandomOptionsCard}
                />
              </div>
              <div className="col-12 col-md-6">
                <ListAccordionItem
                  id="featuredCharacters"
                  title="Characters"
                  listContents={featuredCharacters}
                  ListContentsComponentType={CharacterCard}
                />
                <ListAccordionItem
                  id="featuredThemeSongs"
                  title="Theme Songs"
                  listContents={featuredThemeSongs}
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
