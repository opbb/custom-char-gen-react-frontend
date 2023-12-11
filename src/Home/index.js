import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListAccordionItem from "./listAccordionItem";
import TemplateCard from "../Template/templateCard";
import RandomOptionsCard from "../RandomOptions/randomOptionsCard";
import CharacterCard from "../Character/characterCard";
import SongCard from "../ThemeSong/songCard";
import {
  createBlankTemplate,
  findTemplatesByOwner,
  getFeaturedTemplates,
} from "../Template/client";
import {
  createBlankRandomOptions,
  findMultipleRandomOptionsByOwner,
  getFeaturedMultipleRandomOptions,
} from "../RandomOptions/client";
import {
  findCharactersByOwner,
  getFeaturedCharacters,
} from "../Character/client";
import {
  findSongsBySearch,
  findSongByID,
  findSongsByID,
} from "../ThemeSong/client";
import { addTemplate, setTemplates } from "../Template/templatesReducer";
import { setCharacters } from "../Character/charactersReducer";
import {
  addRandomOptions,
  setRandomOptions,
} from "../RandomOptions/randomOptionsReducer";
function Home() {
  const yourTemplates = useSelector(
    (state) => state.templatesReducer.templates
  );
  const yourCharacters = useSelector(
    (state) => state.charactersReducer.characters
  );
  const yourRandomOptions = useSelector(
    (state) => state.randomOptionsReducer.allRandomOptions
  );
  const yourThemeSongs = [];
  const featuredThemeSongs = [];

  //const user = useSelector((state) => state.templatesReducer.user);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchCategory, setSearchCategory] = useState("ThemeSongs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(
    yourTemplates.length >= 1 ? yourTemplates[0] : undefined
  );
  const [featuredTemplates, setFeaturedTemplates] = useState([]);
  const [featuredCharacters, setFeaturedCharacters] = useState([]);
  const [featuredRandomOptions, setFeaturedRandomOptions] = useState([]);
  const loggedIn = user !== undefined && user !== null;

  // Save user friendly search category strings
  const searchCategoryValuesAndUIStrings = new Map();
  searchCategoryValuesAndUIStrings.set("Templates", "Templates");
  searchCategoryValuesAndUIStrings.set("Characters", "Characters");
  searchCategoryValuesAndUIStrings.set("RandomOptions", "Random Options");
  searchCategoryValuesAndUIStrings.set("ThemeSongs", "Theme Songs");

  const initializeData = async () => {
    // TODO: Pull data from server
    const yourPromisesToAwait = [];
    const featuredPromisesToAwait = [];

    featuredPromisesToAwait.push(getFeaturedTemplates());
    featuredPromisesToAwait.push(getFeaturedCharacters());
    featuredPromisesToAwait.push(getFeaturedMultipleRandomOptions());

    const [fTemplates, fCharacters, fRandomOptions] = await Promise.all(
      featuredPromisesToAwait
    );

    setFeaturedTemplates(fTemplates);
    setFeaturedCharacters(fCharacters);
    setFeaturedRandomOptions(fRandomOptions);

    if (loggedIn) {
      yourPromisesToAwait.push(findTemplatesByOwner(user._id));
      yourPromisesToAwait.push(findCharactersByOwner(user._id));
      yourPromisesToAwait.push(findMultipleRandomOptionsByOwner(user._id));

      const [yTemplates, yCharacters, yRandomOptions] = await Promise.all(
        yourPromisesToAwait
      );

      dispatch(setTemplates(yTemplates));
      dispatch(setCharacters(yCharacters));
      dispatch(setRandomOptions(yRandomOptions));
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const handleSearch = async () => {
    navigate(`/Search/${searchCategory}/${searchQuery}`);
  };

  const handleMakeTemplate = () => {
    console.log("making new template");
    createBlankTemplate(user._id).then((template) => {
      console.log(template);
      dispatch(addTemplate(template));
      navigate(`/Template/${template._id}/Edit`);
    });
  };

  const handleMakeCharacter = () => {
    // Make request from the server
    //createTemplate(user._id).then((template) => {
    //dispatch(addTemplate(template));
    const characterID = `newCharacterFrom${selectedTemplate}ID`;
    navigate(`/Character/${characterID}`);
    //});
  };

  const handleMakeRandomOptions = () => {
    createBlankRandomOptions(user._id).then((randomOptions) => {
      dispatch(addRandomOptions(randomOptions));
      navigate(`/RandomOptions/${randomOptions._id}`);
    });
  };

  const AboveYourTemplatesComponent = () => {
    return (
      <button className="btn btn-primary btn-sm" onClick={handleMakeTemplate}>
        <i className="fa-solid fa-plus"></i> New Template
      </button>
    );
  };
  const AboveYourRandomOptionsComponent = () => {
    return (
      <button
        className="btn btn-primary btn-sm"
        onClick={handleMakeRandomOptions}
      >
        <i className="fa-solid fa-plus"></i> New Random Options
      </button>
    );
  };
  const AboveYourCharactersComponent = () => {
    return (
      <span className="d-flex flex-row flex-nowrap align-items-center">
        <button
          className="btn btn-primary btn-sm text-nowrap"
          disabled={
            selectedTemplate === undefined ||
            selectedTemplate.traits === undefined ||
            selectedTemplate.traits.length < 1
          }
          onClick={handleMakeCharacter}
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
              yourTemplates.find((template) => template._id === e.target.value)
            )
          }
          value={selectedTemplate ? selectedTemplate._id : undefined}
        >
          {selectedTemplate === undefined ? (
            <option value="NoTemplates">No Templates</option>
          ) : (
            yourTemplates.map((template, index) => {
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
  };

  const AboveYourThemeSongsComponent = () => {
    return (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => {
          // Search for ThemeSongs
          navigate("/Search/ThemeSongs");
        }}
      >
        <i className="fa-solid fa-magnifying-glass"></i> Search for Theme Songs
      </button>
    );
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
          <option value="Templates" disabled={true}>
            Templates (Planned)
          </option>
          <option value="Characters" disabled={true}>
            Characters (Planned)
          </option>
          <option value="RandomOptions" disabled={true}>
            Random Options (Planned)
          </option>
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
        {loggedIn ? (
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
                    AboveListComponent={AboveYourTemplatesComponent}
                    listContents={yourTemplates}
                    ListContentsComponentType={TemplateCard}
                  />
                  <ListAccordionItem
                    id="yourRandomOptions"
                    title="Random Options"
                    AboveListComponent={AboveYourRandomOptionsComponent}
                    listContents={yourRandomOptions}
                    ListContentsComponentType={RandomOptionsCard}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <ListAccordionItem
                    id="yourCharacters"
                    title="Characters"
                    AboveListComponent={AboveYourCharactersComponent}
                    listContents={yourCharacters}
                    ListContentsComponentType={CharacterCard}
                  />
                  <ListAccordionItem
                    id="yourThemeSongs"
                    title="Theme Songs"
                    AboveListComponent={AboveYourThemeSongsComponent}
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
                  listContents={featuredTemplates}
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
