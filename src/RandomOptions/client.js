import axios from "axios";
const BASE_API = process.env.REACT_APP_BASE_API_URL;
const MULTIPLE_RANDOM_OPTIONS_URL = `${BASE_API}/api/multipleRandomOptions`;
const RANDOM_OPTIONS_URL = `${BASE_API}/api/randomOptions`;
export const deleteRandomOptions = async (randomOptionsID) => {
  const response = await axios.delete(
    `${RANDOM_OPTIONS_URL}/${randomOptionsID}`
  );
  return response.data;
};
export const createRandomOptions = async (ownerID, randomOptions) => {
  const response = await axios.post(
    `${RANDOM_OPTIONS_URL}/${ownerID}`,
    randomOptions
  );
  return response.data;
};
export const createBlankRandomOptions = async (ownerID) => {
  const response = await axios.post(`${RANDOM_OPTIONS_URL}/${ownerID}/blank`);
  return response.data;
};
export const findMultipleRandomOptionsByOwner = async (ownerID) => {
  const response = await axios.get(`${MULTIPLE_RANDOM_OPTIONS_URL}/${ownerID}`);
  return response.data;
};
export const findRandomOptionsByID = async (randomOptionsID) => {
  const response = await axios.get(`${RANDOM_OPTIONS_URL}/${randomOptionsID}`);
  return response.data;
};
export const getFeaturedMultipleRandomOptions = async () => {
  const response = await axios.get(`${MULTIPLE_RANDOM_OPTIONS_URL}/featured`);
  return response.data;
};
export const findMultipleRandomOptionsBySearch = async (searchQuery) => {
  const response = await axios.get(
    `${MULTIPLE_RANDOM_OPTIONS_URL}/search/${searchQuery}`
  );
  return response.data;
};
export const updateRandomOptions = async (randomOptions) => {
  const response = await axios.put(
    `${RANDOM_OPTIONS_URL}/${randomOptions._id}`,
    randomOptions
  );
  return response.data;
};
