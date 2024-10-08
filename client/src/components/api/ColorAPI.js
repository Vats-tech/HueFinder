import axios from "axios";

/**
 * Fetches color data related to the user input.
 * @param {*} userInput
 * @returns {Array} RGB value of colors
 */
export const getColorData = async (userInput) => {
  const baseURL = "https://hue-finder.vercel.app";
  // const baseURL = "http://localhost:3000";
  const url = `${baseURL}/${encodeURIComponent(userInput)}`;
  return axios.get(url);
};
