import React from "react";
import PropTypes from "prop-types";
import BaseImage from "../../public/BaseImage.jpg?url";
import { HUE_EXTRACTOR_TYPE } from "./utils/constants";

/**
 * Details card component that provides detailed information about the current feature.
 *
 * @component Details
 * @prop {Array} demoColors - Some colors used in the description card for the Image to Color feature.
 * @prop {String} heading - Heading used in the card.
 * @prop {String} description - Description for the Image to Color feature.
 * @prop {Number} hueExtractorType - Extractor type: Image to color.
 */

const Details = ({ heading, demoColors, description, hueExtractorType }) => {
  return (
    <div className="card lg:card-side shadow-xl my-20">
      <div className="w-2/5 p-10">
        <div className="indicator">
          <div className="indicator-item indicator-bottom">
            <button className="btn btn-default font-mono font-extralight disabled:opacity-75 text-green-600 pointer-events-none">
              {hueExtractorType === HUE_EXTRACTOR_TYPE.IMAGE_COLOR_EXTRACTOR
                ? "HOVER ON BELOW IMAGE"
                : "DEMO"}
            </button>
          </div>
          <span className="indicator-item badge badge-secondary bg-green-600 border-green-600"></span>
          <div className="grid w-32 h-32 bg-base-300 place-items-center font-mono font-extralight">
            {hueExtractorType === HUE_EXTRACTOR_TYPE.IMAGE_COLOR_EXTRACTOR ? (
              <img
                src={BaseImage}
                alt="Uploaded"
                className="rounded-lg cursor-pointer w-full h-full"
              />
            ) : (
              <span className="text-green-500">&quot;Green ...&quot;</span>
            )}
          </div>
        </div>
      </div>

      <div className="card-body">
        <h2 className="card-title font-mono font-semibold">{heading}</h2>
        <p className="font-mono font-extralight antialiased tracking-tight text-base text-gray-500">
          {description}
        </p>
        <div className="flex justify-evenly">
          {demoColors.map((color) => {
            return (
              <div
                key={color}
                className={`w-20 h-20 rounded-full ${color} `}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
Details.propTypes = {
  heading: PropTypes.string.isRequired,
  demoColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string,
  hueExtractorType: PropTypes.number.isRequired,
};

export default Details;
