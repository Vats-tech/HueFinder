import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getColorData as getColorData } from "./api/ColorAPI";
import Cards from "./Cards";
import Details from "./Detaills";
import {
  DEMO_COLORS,
  DESCRIPTION,
  FEATURES_LABEL,
  HUE_EXTRACTOR_TYPE,
} from "./utils/constants";
import { getHexFromRGB } from "./utils/util";
import React from "react";

const colorStackCount = 10;
const totalNumberOfCardsOnLandingPage = 56;
const TextColorExtractor = ({
  setLoading,
  setToastStatus,
  setToast,
  closeToast,
}) => {
  /**
   * `colors` is a state variable that holds an array of hex value to display on the cards.
   * `stColors` is a function used to update the `colors` state.
   */
  const [colors, setColors] = useState([]);

  /**
   * `userInput` is a state variable that holds user search input.
   * 'setUserInput` is a function used to update the `userInput` state.
   */
  const [userInput, setUserInput] = useState();

  /**
   * Handles user input from an event and updates the state with the input value.
   *
   * @param {*} event - The event object containing the user's input.
   */
  const onInput = (event) => {
    const inputValue = event.target.value;
    setUserInput(inputValue);
  };

  /**
   * Handles the form submission to fetch colors from the API.
   * This function is triggered when the user submits the form.
   * It makes an API call to retrieve an array of RGB colors and updates the state with the fetched colors.
   * NOTE - API return only limited number of colors so we are adding some random colors at the end, so that
   * home page can have sufficient color cards.
   *
   * @param {Event} event -  The event object to prevent the default form submission.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchColors(userInput).then((colors) => {
      const randomColors = fetchRandomColors();
      const allColors = [...(colors ?? []), ...randomColors];
      setColors(allColors);
    });
  };

  /**
   * Handle failure of api. Show required toast.
   * @param {*} error
   */
  const handleAPIError = (error) => {
    if (error?.status === 422) {
      setToast({
        type: "error",
        message:
          "Please input valid text only. Support for all text types will be added later",
      });
    } else {
      setToast({
        type: "error",
        message: "Something went wrong. Please try again",
      });
    }

    setToastStatus(true);
    closeToast();
    setLoading(false);
  };

  /**
   * Generates a random RGB color.
   *
   * This function returns a randomly generated color in the RGB format.
   * Each color component (red, green, blue) is an integer between 0 and 255,
   * inclusive. The function can be used to create an array of random colors
   * or to assign random colors to elements dynamically.
   *
   * @returns {string} - A string representing the random color in the format 'rgb(r, g, b)'.
   *
   * Example usage:
   * const randomColor = getRandomColor();
   * Returns something like 'rgb(34, 150, 243)'
   */

  const generateRandomColor = () => {
    return [
      Math.floor(Math.random() * 256), // Red
      Math.floor(Math.random() * 256), // Green
      Math.floor(Math.random() * 256), // Blue
    ];
  };

  /**
   * Groups an array of RGB colors into an array of arrays, each containing 4 colors.
   * This is used to assign 4 different colors to a card.
   *
   * @param {Array} colors - An array of RGB color strings.
   * @returns {Array} - An array of arrays, each containing 4 RGB color strings.
   */
  function groupColorsForCards(colors) {
    return Array.from(
      { length: Math.ceil(colors.length / colorStackCount) },
      (_, i) =>
        colors.slice(i * colorStackCount, i * colorStackCount + colorStackCount)
    );
  }

  /**
   * Fetch an array of RGB colors from api and grouped them in array of arrays of length `colorStackCount`, and convert to HEX value.
   *
   * @param {String} query - The user's query
   * @returns {Array} Array of HEX colors.
   */
  const fetchColors = async (query) => {
    setLoading(true);
    try {
      const { data } = await getColorData(query);
      const colorPalette = data
        .flatMap((colors) => colors)
        .map((colors) => {
          return getHexFromRGB(colors);
        });
      setLoading(false);
      return groupColorsForCards(colorPalette);
    } catch (error) {
      handleAPIError(error.response);
    }
  };

  /**
   * Fetch random colors to display on the landing page and update the `colors` state.
   * The total number of random colors is calculated as `totalNumberOfCardsOnLandingPage * colorStackCount`,
   * since each card contains `colorStackCount` colors.
   */
  function fetchRandomColors() {
    // TODO - Add infinite scroll feature to get next batch of color palette.
    const colorSet = [
      ...Array(totalNumberOfCardsOnLandingPage * colorStackCount),
    ].map((_, index) => {
      return getHexFromRGB(generateRandomColor());
    });
    const randomColors = groupColorsForCards(colorSet);
    return randomColors;
  }

  /**
   * Copies the given text to the clipboard using the modern Clipboard API.
   *
   * This function takes a string as an argument and attempts to copy it to the user's clipboard
   * using the Clipboard API, which is supported in most modern browsers. The function will log
   * success or error messages to the console based on the outcome.
   *
   * @param {string} text - The text string to be copied to the clipboard.
   *
   * Example usage:
   * copyTextToClipboard('Hello, World!');
   * // The text 'Hello, World!' is now in the user's clipboard and can be pasted.
   */
  const copyTextToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Success message
          // setCopiedText(hexValue);
          setToast({
            type: "success",
            message: `Color copied to clipboard: ${text}`,
          });
          setToastStatus(true);
          closeToast();
        })
        .catch((error) => {
          // Error handling
          alert("Failed to copy text: ", error);
        });
    } else {
      console.error(
        "Clipboard API is not supported or not in a secure context."
      );
    }
  };

  /**
   * Executes the `fetchRandomColors` function when the component mounts.
   * This effect runs only once due to the empty dependency array,
   * ensuring that the colors are fetched initially when the component is rendered.
   */
  useEffect(() => {
    const randomColors = fetchRandomColors();
    setColors(randomColors);
  }, []);

  const colorPaletteCards = (
    <div className="flex justify-center flex-wrap gap-12 mt-5">
      {colors.map((color, index) => {
        return (
          <Cards
            key={index}
            color={color}
            copyTextToClipboard={copyTextToClipboard}
          />
        );
      })}
    </div>
  );

  return (
    <div className="w-full mx-4">
      <Details
        demoColors={DEMO_COLORS.TEXT_TO_COL}
        heading={FEATURES_LABEL.TEXT_TO_COLOR}
        description={DESCRIPTION.TEXT_COLOR_EXTRACTOR}
        hueExtractorType={HUE_EXTRACTOR_TYPE.TEXT_COLOR_EXTRACTOR}
      />
      {/* <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col lg:flex-row"
          >
            <input
              type="text"
              required
              placeholder="Type here to discover the color"
              className="input input-primary w-full  lg:mr-9 rounded-3xl"
              onChange={onInput}
            />
            <button
              type="submit"
              className="w-32 btn btn-outline btn-primary mt-10 lg:mt-0 rounded-3xl"
            >
              Search
            </button>
          </form>
        </div>
      </div> */}
      {colorPaletteCards}
    </div>
  );
};

TextColorExtractor.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setToastStatus: PropTypes.func.isRequired,
  setToast: PropTypes.func.isRequired,
  closeToast: PropTypes.func.isRequired,
};

export default TextColorExtractor;
