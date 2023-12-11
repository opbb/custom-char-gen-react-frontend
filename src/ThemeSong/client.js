import axios from "axios";
const BASE_API = process.env.REACT_APP_BASE_API_URL;
const SONGS_URL = `${BASE_API}/api/songs`;
const SONG_URL = `${BASE_API}/api/song`;
export const findSongsBySearch = async (searchQuery, limit) => {
  const safeLimit = limit === undefined ? 10 : limit;
  const response = await axios.get(
    `${SONGS_URL}/search/${safeLimit}/${searchQuery}`
  );
  return response.data;
};
export const findSongByID = async (songID) => {
  const response = await axios.get(`${SONG_URL}/${songID}`);
  return response.data;
};
export const findSongsByID = async (songIDs) => {
  let songIDsString = "";
  songIDs.forEach((songID, index) => {
    if (index !== 0) {
      songIDsString = songIDsString.concat(`,${songID}`);
    } else {
      songIDsString = songID;
    }
  });
  const response = await axios.get(`${SONGS_URL}/${songIDsString}`);
  return response.data;
};
// export const deleteTemplate = async (templateID) => {
//   const response = await axios.delete(`${TEMPLATE_URL}/${templateID}`);
//   return response.data;
// };
// export const createTemplate = async (ownerID, template) => {
//   const response = await axios.post(`${TEMPLATE_URL}/${ownerID}`, template);
//   return response.data;
// };
// export const createBlankTemplate = async (ownerID) => {
//   const response = await axios.post(`${TEMPLATE_URL}/${ownerID}/blank`);
//   return response.data;
// };
// export const findTemplatesByOwner = async (ownerID) => {
//   const response = await axios.get(`${TEMPLATES_URL}/${ownerID}`);
//   return response.data;
// };
// export const getFeaturedTemplates = async () => {
//   const response = await axios.get(`${TEMPLATES_URL}/featured`);
//   return response.data;
// };

// export const updateTemplate = async (template) => {
//   const response = await axios.put(`${TEMPLATE_URL}/${template._id}`, template);
//   return response.data;
// };
