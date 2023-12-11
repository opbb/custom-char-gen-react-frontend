import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  setSearchCategory,
  setSearchQuery,
  setSearchResults,
} from "./searchReducer";
import { useState } from "react";
import { findSongsBySearch } from "../ThemeSong/client";
function SearchBar() {
  const { searchCategoryParam, searchQueryParam } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState(
    searchCategoryParam ? searchCategoryParam : "ThemeSongs"
  );
  const [query, setQuery] = useState(searchQueryParam ? searchQueryParam : "");

  // Save user friendly search category strings
  const categoryValuesAndUIStrings = new Map();
  categoryValuesAndUIStrings.set("Templates", "Templates");
  categoryValuesAndUIStrings.set("Characters", "Characters");
  categoryValuesAndUIStrings.set("RandomOptions", "Random Options");
  categoryValuesAndUIStrings.set("ThemeSongs", "Theme Songs");

  const updateSearchResults = async (searchCategory, searchQuery) => {
    let searchResults;
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

  const handleSearch = () => {
    let cleanedQuery = query;
    cleanedQuery.replace(" ", "%20");
    dispatch(setSearchCategory(category));
    dispatch(setSearchQuery(query));
    navigate(`/Search/${category}/${cleanedQuery}`);
    updateSearchResults(category, cleanedQuery);
  };

  return (
    <div className="d-flex flex-column flex-md-row mb-2">
      <button className="btn btn-primary m-1" onClick={handleSearch}>
        Search
      </button>
      <select
        className="btn btn-secondary m-1"
        title="Search Category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
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
        value={query}
        placeholder={`Search for ${categoryValuesAndUIStrings
          .get(category)
          .toLowerCase()}`}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
export default SearchBar;
