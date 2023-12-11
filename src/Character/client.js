import axios from "axios";
const BASE_API = process.env.REACT_APP_BASE_API_URL;
const CHARACTERS_URL = `${BASE_API}/api/characters`;
const CHARACTER_URL = `${BASE_API}/api/character`;
export const deleteCharacter = async (characterID) => {
  const response = await axios.delete(`${CHARACTER_URL}/${characterID}`);
  return response.data;
};
export const findCharactersByOwner = async (ownerID) => {
  const response = await axios.get(`${CHARACTERS_URL}/${ownerID}`);
  return response.data;
};
export const findCharacterByID = async (characterID) => {
  const response = await axios.get(`${CHARACTER_URL}/${characterID}`);
  return response.data;
};
export const createCharacter = async (ownerID, character) => {
  const response = await axios.post(`${CHARACTER_URL}/${ownerID}`, character);
  return response.data;
};
export const getFeaturedCharacters = async () => {
  const response = await axios.get(`${CHARACTERS_URL}/featured`);
  return response.data;
};
export const findCharactersBySearch = async (searchQuery) => {
  const response = await axios.get(`${CHARACTERS_URL}/search/${searchQuery}`);
  return response.data;
};
export const updateCharacter = async (character) => {
  const response = await axios.put(
    `${CHARACTER_URL}/${character._id}`,
    character
  );
  return response.data;
};
