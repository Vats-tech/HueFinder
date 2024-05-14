import { useState } from "react";
import { getColorData as getColorData } from "./api/ColorAPI";
import Cards from "./Cards";

const Home = () => {
  /**
   * Holds loading state
   */
  const [loading, setLoading] = useState(false);
  /**
   * Holds colors hex value to display on the cards.
   */
  const [colors, setColors] = useState([
    {
      r: 222,
      g: 126,
      b: 40,
    },
    {
      r: 96,
      g: 41,
      b: 20,
    },
    {
      r: 250,
      g: 212,
      b: 138,
    },
    {
      r: 150,
      g: 12,
      b: 38,
    },
  ]);

  /**
   * Holds User search input.
   */
  const [userInput, setUserInput] = useState();

  /**
   * Holds toast state.
   */
  const [showToast, setToastStatus] = useState(false);

  /**
   * Holds copied text to clipboard
   */
  const [copiedText, setCopiedText] = useState();

  /**
   * Holds toast message
   */

  const [toast, setToast] = useState({ type: "success", message: "" });

  /**
   * Get user input.
   * @param {*} event
   */
  const onInput = (event) => {
    const inputValue = event.target.value;
    inputValue && setUserInput(inputValue);
  };

  /**
   * Handler to close the toast.
   */
  const closeToast = () => {
    setTimeout(() => setToastStatus(false), 1000);
  };

  /**
   * Handle submit action on form.
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchColors();
  };

  /**
   * Handle failure of api. Show required toast.
   * @param {*} error
   */
  const handleAPIError = (error) => {
    console.log("Here", error);
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
   * Fetches all colors related to the input text.
   */
  const fetchColors = async () => {
    setLoading(true);
    try {
      const { data } = await getColorData(userInput);
      const colors = data
        .map((color) => {
          const keys = Object.keys(color);
          const rgbValue = keys.map((key) => {
            const [r, g, b] = color[key].rgb;
            return { r, g, b };
          });
          return rgbValue;
        })
        .flatMap((e) => e);
      setColors(colors);
      setLoading(false);
    } catch (error) {
      handleAPIError(error.response);
    }
  };

  /**
   * Copy the hex color of card on clipboard.
   * @param {*} hexValue
   */
  const copyTextToClipboard = (hexValue) => {
    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        // Success message
        setCopiedText(hexValue);
        setToast({
          type: "success",
          message: `Color copied to clipboard: ${hexValue}`,
        });
        setToastStatus(true);
        closeToast();
      })
      .catch((err) => {
        // Error handling
        alert("Failed to copy text: ", err);
      });
  };

  /**
   * Change value to hex value
   * @param {*} value Color value (R,G,B)
   * @returns
   */
  const changeToHexValue = (value) => {
    const hex = Math.round(value).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  /**
   * Change RGB to HEX
   * @param {*} param0
   * @returns Hex value
   */
  const getHexFromRGB = ({ r, g, b }) => {
    return (
      "#" + changeToHexValue(r) + changeToHexValue(g) + changeToHexValue(b)
    );
  };

  return (
    <div className="w-full h-screen">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-green-200 bg-opacity-20 z-50">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      )}
      {showToast && (
        <div className="toast toast-top">
          <div className={`alert alert-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center p-10">
        <h1 className="text-5xl subpixel-antialiased font-extralight">
          Hue Finder
        </h1>
      </div>
      <div className="w-8/12 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col lg:flex-row"
        >
          <input
            type="text"
            required
            placeholder="Type here to discover the color"
            className="input input-primary w-full  lg:mr-9"
            onChange={onInput}
          />
          <button
            type="submit"
            className="w-32 btn btn-outline btn-primary lg:btn-wide mt-10 lg:mt-0"
          >
            Search
          </button>
        </form>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10">
          {colors.map((color, index) => {
            return (
              <Cards
                key={index}
                color={getHexFromRGB(color)}
                copyTextToClipboard={copyTextToClipboard}
              />
            );
          })}
        </div>
      </div>
      <div className="pt-12"></div>
    </div>
  );
};

export default Home;
