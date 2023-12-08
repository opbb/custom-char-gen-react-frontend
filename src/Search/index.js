import { useParams } from "react-router";
function Search() {
  const { searchCategory, searchQuery } = useParams();
  return (
    <div>
      <h1>Search</h1>
      {`Search with category ${searchCategory} and query ${searchQuery}`}
    </div>
  );
}
export default Search;
