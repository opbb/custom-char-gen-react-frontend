import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "./client";
function SongDetails() {
  const { songID } = useParams();
  const [songData, setSongData] = useState(null);

  const initializeSongData = async () => {
    const songData = await client.findSongByID(songID);
    setSongData(songData);
  };

  useEffect(() => {
    initializeSongData();
  }, []);
  return (
    <div>
      {songData && (
        <div className="d-flex flex-column align-items-center text-center">
          <h2>{songData.title}</h2>
          <img src={songData.albumImage.url} className="m-3" />
          <div className="py-3 ps-md-2">
            <div className="fst-italic">
              By {songData.artistNames.toString()}
            </div>
            <div className="fst-italic">
              From the album {songData.albumName}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SongDetails;
