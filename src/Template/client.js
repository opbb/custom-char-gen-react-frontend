import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
const TEMPLATES_URL = `${BASE_API}/api/templates`;
const TEMPLATE_URL = `${BASE_API}/api/template`;
export const deleteTemplate = async (templateID) => {
  const response = await axios.delete(`${TEMPLATE_URL}/${templateID}`);
  return response.data;
};
export const createTemplate = async (ownerID, template) => {
  const response = await axios.post(`${TEMPLATE_URL}/${ownerID}`, template);
  return response.data;
};
export const createBlankTemplate = async (ownerID) => {
  const response = await axios.post(`${TEMPLATE_URL}/${ownerID}/blank`);
  return response.data;
};
export const findTemplatesByOwner = async (ownerID) => {
  const response = await axios.get(`${TEMPLATES_URL}/${ownerID}`);
  return response.data;
};
export const getFeaturedTemplates = async () => {
  const response = await axios.get(`${TEMPLATES_URL}/featured`);
  return response.data;
};
export const findTemplatesBySearch = async (searchQuery) => {
  const response = await axios.get(`${TEMPLATES_URL}/search/${searchQuery}`);
  return response.data;
};
export const updateTemplate = async (template) => {
  const response = await axios.put(`${TEMPLATE_URL}/${template._id}`, template);
  return response.data;
};
