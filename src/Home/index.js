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
  const yourTemplates = [
    {
      _id: "1",
      ownerID: "you",
      visibility: "public",
      title: "Template 1",
      description: "A cool template.",
      traits: [
        { title: "Trait 1", type: "text", randomOptionsID: "randomOptionsID1" },
        {
          title: "Trait 2",
          type: "longText",
          randomOptionsID: "randomOptionsID2",
        },
        {
          title: "Trait 3",
          type: "number",
          randomOptionsID: "randomOptionsID3",
        },
        { title: "Trait 1", type: "text", randomOptionsID: "randomOptionsID1" },
        {
          title: "Trait 2",
          type: "longText",
          randomOptionsID: "randomOptionsID2",
        },
        {
          title: "Trait 3",
          type: "number",
          randomOptionsID: "randomOptionsID3",
        },
        { title: "Trait 1", type: "text", randomOptionsID: "randomOptionsID1" },
        {
          title: "Trait 2",
          type: "longText",
          randomOptionsID: "randomOptionsID2",
        },
        {
          title: "Trait 3",
          type: "number",
          randomOptionsID: "randomOptionsID3",
        },
      ],
    },
    {
      _id: "2",
      ownerID: "you",
      visibility: "private",
      title: "Template 2",
      description: "A really cool template!",
      traits: [
        { title: "Trait 1", type: "text", randomOptionsID: "randomOptionsID1" },
        {
          title: "Trait 2",
          type: "longText",
          randomOptionsID: "randomOptionsID2",
        },
        {
          title: "Trait 3",
          type: "number",
          randomOptionsID: "randomOptionsID3",
        },
      ],
    },
    {
      _id: "3",
      ownerID: "you",
      visibility: "public",
      title: "Template 3",
      traits: [
        { title: "Trait 1", type: "text", randomOptionsID: "randomOptionsID1" },
        {
          title: "Trait 2",
          type: "longText",
          randomOptionsID: "randomOptionsID2",
        },
        {
          title: "Trait 3",
          type: "number",
          randomOptionsID: "randomOptionsID3",
        },
      ],
    },
  ]; // Testing data
  const feturedTemplates = [
    {
      _id: "4",
      ownerID: "owner2",
      visibility: "private",
      title: "Template 2",
      description: "A really cool template!",
      traits: [
        { title: "Trait 1", type: "text", randomOptionsID: "randomOptionsID1" },
        {
          title: "Trait 2",
          type: "longText",
          randomOptionsID: "randomOptionsID2",
        },
        {
          title: "Trait 3",
          type: "number",
          randomOptionsID: "randomOptionsID3",
        },
      ],
    },
    {
      _id: "5",
      ownerID: "owner3",
      visibility: "public",
      title: "Template 3",
      traits: [
        { title: "Trait 1", type: "text", randomOptionsID: "randomOptionsID1" },
        {
          title: "Trait 2",
          type: "longText",
          randomOptionsID: "randomOptionsID2",
        },
        {
          title: "Trait 3",
          type: "number",
          randomOptionsID: "randomOptionsID3",
        },
      ],
    },
  ];
  const yourCharacters = [
    {
      _id: "1",
      ownerID: "you",
      visibility: "public",
      traits: [
        { title: "Name", type: "text", value: "Heskan of Kerhylon" },
        { title: "Race", type: "text", value: "Dragonborn" },
        {
          title: "Class",
          type: "text",
          value: "Bard",
        },
        {
          title: "Level",
          type: "number",
          value: 3,
        },
        {
          title: "Backstory",
          type: "longText",
          value:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
    {
      _id: "2",
      ownerID: "you",
      visibility: "public",
      traits: [
        { title: "Name", type: "text", value: "Val Atmin" },
        { title: "Form", type: "text", value: "Lightworlder Human" },
        { title: "Origin", type: "text", value: "H0M3" },
        {
          title: "Class",
          type: "text",
          value: "Expert",
        },
        {
          title: "Level",
          type: "number",
          value: 10,
        },
        {
          title: "Backstory",
          type: "longText",
          value: `I was born and raised in a habitat floating in the upper atmosphere of the gas giant Dioulosco in the Aganame system. 

            The habitat, being the precursor/support-vessel for later installations deployed to the planet and the third version of this specific design, was officially designated Habitat 0 Mark 3 (H0M.3), but everyone just affectionately called it Home. It was an ancient, pre-scream installation housing around 5,000 people, which had been kept running by a combination of ceaseless hackjob fixes and slowly failing pre-tech. The station had no central government and hadn’t for at least a century. The habitat existed as a loose network of communities operating like villages, with each community taking up a section of the ship and its corresponding role. The communities could be somewhat distrustful of eachother, but cooperated out of necessity to keep the habitat afloat. There were folk tales of a terrible period of martial law directly following the scream (called “the lockdown”) and an even worse period of violence as all order broke down without anything to take its place (called simply “the violence”), but those are mainly seen as old legends of some past tragedy or another with no real bearing on the present.
            
            I was born in the Atmospheric-Mining (Atmin) section of the habitat, and spent my youth and early adulthood working there as a technician. As I grew older I began to realize a truth that everyone knew but nobody talked about. The station was falling apart. Every year our altitude control got more hectic and the margins of error for every system were being pushed down to zero. I was terrified by the thought of losing my home, and so I threw myself into the effort to hold the habitat together. At first I tried doing everything myself. I studied every system late into the night, often sleeping in maintenance shafts and among cargo crates far from my home section. I tried to be a jack of all trades and address every issue but soon realized that it was simply too much for one woman to handle alone. So I made it my duty to make sure I wasn’t alone. I began talking to everyone in my community, leaning on old friendships and building new ones. I learned how to agitate, asking the hard questions, and how to inspire, with appeals to anything from communal love to civic duty to pure self-interest. I began traveling the many sections of the habitat and, instead of isolating myself in tunnels and cargo, I crawled the pubs and attended the sermons and spoke in the busy hallway junctions and connected myself with as many people as possible. As I traveled the station I found others doing the same thing as me, organizing their own sections. We formed a network throughout the ship to support eachother in our struggle to coordinate repair efforts, share resources and keep tensions to a minimum. This movement fought against decades of entrenched apathy and denial, but as the situation grew mode dire, support began increasing exponentially and it seemed that the whole habitat might pull together and rebuild the many essential systems that were slowly decaying. And maybe that would have happened, if we’d only had a few more years.
            
            But, one day, we all felt a lurch. A big lurch. The kind of lurch that makes grounders cry earthquake and spacers cry their last prayers. As soon as the initial panic began to fade, the news spread. One of our main sources of lift, the old, reliable pre-tech anti-grav engine, had finally given out. All non-essential power was now being pumped into keeping the station afloat, but we were sinking. In a rush of frantic, dreamlike, half-remembered activity, everyone grabbed everything they could carry and made for the shuttles, the lifeboats, any way off the habitat. This exodus left no time for planning and no time for goodbyes. My people had never been the most unified, but in a mere tens of hours, they became completely fractured and scattered to the winds. We became refugees, going wherever people would take us. Some of us went to other habitats surrounding Dioulosco, but that felt like living in purgatory. Most of us headed out to other systems. Staying with old friends or relatives, pursuing work or just trying to find any place to set down. I stuck with my immediate family for a year or two, but as money ran out, I set off to find work so I could send money back to my relatives. I put my head down and for a few years, simply coasted through life, feeling like a shooting star, extinguished just before its fleeting moment of glory.
            
            But after a few years of grunt techie work, feeling my soul being ground out of my body, I realized fixing other people’s ships for nothing but survival had never been and would never be enough for me. I needed a new Home.
            
            I recontacted the network of organizers from before the Exodus and began to mentally map out the diaspora that had formed from my people’s scattered communities. I began to intentionally pick jobs that stopped at hubs of this diaspora, and I made my real work the gradual reconnection of these disparate nodes. Slowly but surely, my hope was rekindled, burning lower than before, but infinitely stronger, and I hatched a dream in my head to one day find a real home for my people. A home that would not only support them, but entice them all back together again. This is my reason for setting out, and this is where we find me at the start of this campaign.
            `,
        },
      ],
    },
  ];
  const featuredCharacters = [
    {
      _id: "6",
      ownerID: "owner1",
      visibility: "public",
      traits: [
        { title: "Name", type: "text", value: "Pecan Nutsier" },
        { title: "Race", type: "text", value: "Elf" },
        {
          title: "Class",
          type: "text",
          value: "Cleric",
        },
        {
          title: "Level",
          type: "number",
          value: 6,
        },
        {
          title: "Backstory",
          type: "longText",
          value: "He just loves pecans. That is all.",
        },
      ],
    },
    {
      _id: "7",
      ownerID: "owner2",
      visibility: "public",
      traits: [
        { title: "Name", type: "text", value: "Mulligan" },
        { title: "Form", type: "text", value: "Robot Centaur" },
        { title: "Origin", type: "text", value: "Unknown" },
        {
          title: "Class",
          type: "text",
          value: "Warrior",
        },
        {
          title: "Level",
          type: "number",
          value: 10,
        },
        {
          title: "Backstory",
          type: "longText",
          value: `I was deployed to a planet to kill all hostile fauna in anticipation of colonization that never came. Once the dust of The Scream settled and humans did return to the world, I had already shut down, and was overgrown. Eventually, a farmer discovered me and decided to put me to work as a mule, only repairing me enough to get my cognition to 10%. I pulled a plow for a who knows how long, until Val signed on as a tech on the farm. She made fixing me her pet project the rest is history. So is the farm owner. Whoops.`,
        },
      ],
    },
  ];
  const yourRandomOptions = [
    {
      _id: "1",
      ownerID: "you",
      visibility: "public",
      title: "SWN Classes",
      type: "list",
      optionsList: [
        "Expert",
        "Warrior",
        "Psion",
        "Adventurer (Expert-Psion)",
        "Adventurer (Expert-Warrior)",
        "Adventurer (Warrior-Psion)",
      ],
    },
    {
      _id: "2",
      ownerID: "you",
      visibility: "public",
      title: "SWN Levels",
      type: "range",
      start: 1,
      end: 10,
      step: 1,
    },
  ];
  const featuredRandomOptions = [
    {
      _id: "3",
      ownerID: "owner4",
      visibility: "public",
      title: "D&D 5E Classes",
      type: "list",
      optionsList: [
        "Barbarian",
        "Bard",
        "Cleric",
        "Paladin",
        "Druid",
        "Rogue",
        "Monk",
        "Fighter",
        "Ranger",
        "Sorcerer",
        "Warlock",
        "Wizard",
      ],
    },
    {
      _id: "4",
      ownerID: "you",
      visibility: "public",
      title: "Adult Human Height (m)",
      type: "range",
      start: 1.2,
      end: 2.4,
      step: 0.1,
    },
    {
      _id: "5",
      ownerID: "owner5",
      visibility: "public",
      title: "Half-Elf names",
      type: "list",
      optionsList: [
        "Charamar Ulaleth",
        "Charword Ianrona",
        "Alreak Trarie",
        "Reynphon Bryneiros",
        "Corovar Keyralei",
        "Grayeras Balquinal",
        "Jamesin Adwarin",
        "Tophar Caisandoral",
        "Audmanas Perberos",
        "Jamegotin Elrie",
        "Henxiron Presnala",
        "Addithas Brymaris",
        "Ultar Eiltumal",
        "Micrym Urihorn",
        "Osnall Yelfina",
        "Ysemnaril Quiran",
        "Rafphon Zinfir",
        "Jenqarim Vawraek",
        "Rafmitar Adcaryn",
        "Adlis Elaxidor",
        "Contaor Trislynn",
        "Horlanann Eilkalyn",
        "Elverel Daerie",
        "Isemfire Adrel",
        "Warlen Qigella",
        "Wilnaril Phisandoral",
        "Reynfyndar Yelra",
        "Wyphon Zylmyar",
        "Ranthorn Aehorn",
        "Ricmar Beidithas",
      ],
    },
  ];
  const yourThemeSongs = ["themeSong1", "themeSong2", "themeSong3"];
  const featuredThemeSongs = ["themeSong4", "themeSong5", "themeSong6"];
  const user = useSelector((state) => state.templatesReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchCategory, setSearchCategory] = useState("Templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplateID, setSelectedTemplateID] = useState(
    yourTemplates.length >= 1 ? yourTemplates[0]._id : undefined
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
                            disabled={selectedTemplateID === undefined}
                            onClick={() => {
                              // Make new blank Character from Template
                              console.log(
                                `Making new character from template ${
                                  yourTemplates.find(
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
                          &nbsp;from&nbsp;
                          <select
                            className="btn btn-secondary text-truncate"
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
