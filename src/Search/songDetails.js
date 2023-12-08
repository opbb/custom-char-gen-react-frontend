import { useParams } from "react-router";
function SongDetails() {
  const { songID } = useParams();
  return (
    <div>
      <h1>Song Details</h1>
      <p>SongID is {songID}</p>
    </div>
  );
}
export default SongDetails;
