import { useParams, useNavigate } from "react-router";
import {
  findSongsBySearch,
  findSongByID,
  findSongsByID,
} from "../ThemeSong/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchCategory,
  setSearchQuery,
  setSearchResults,
} from "./searchReducer";
import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
function Search() {
  const { searchCategory, searchQuery } = useParams();
  const searchResults = useSelector(
    (state) => state.searchReducer.searchResults
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddThemeSong = () => {
    // TODO
  };

  const updateSearchResults = async (searchCategory, searchQuery) => {
    let searchResults;
    console.log(searchCategory, searchQuery);
    if (
      searchCategory !== undefined &&
      searchQuery !== undefined &&
      searchQuery !== ""
    ) {
      switch (searchCategory) {
        case "ThemeSongs":
          searchResults = await findSongsBySearch(searchQuery, 10);
          break;
        default:
          throw new Error(`Unsuported Search Category ${searchCategory}`);
      }
    } else {
      searchResults = [];
    }
    dispatch(setSearchResults(searchResults));
  };

  useEffect(() => {
    updateSearchResults(searchCategory, searchQuery);
  }, [searchQuery, searchCategory]);

  return (
    <div>
      <SearchBar />
      <ul className="m-0 p-2">
        {searchResults &&
          searchResults.map((result, index) => {
            return (
              <Link
                key={index}
                to={`/SongDetails/${result._id}`}
                className="remove-link-decoration"
              >
                <div className="d-flex flex-column align-items-center align-items-md-start flex-md-row m-0  px-2 py-2 border">
                  <img
                    src={result.albumImage.url}
                    width={300}
                    height={300}
                    className="me-md-2"
                  />
                  <div className="py-3 ps-md-2">
                    <h3 className="underline-on-hover">{result.title}</h3>
                    <div className="fst-italic">
                      By {result.artistNames.toString()}
                    </div>
                    {/* <button
                      className="btn mt-2 btn-outline-primary btn-sm"
                      onClick={handleAddThemeSong}
                    >
                      <i className="fa-solid fa-plus"></i> Add Theme Song
                    </button> */}
                  </div>
                </div>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
export default Search;
