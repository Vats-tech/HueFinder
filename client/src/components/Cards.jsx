import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const Cards = ({ color, copyTextToClipboard }) => {
  const [showCopyIcon, toggleCopyIcon] = useState(false);

  const getCopyIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="copy">
        <path
          fill="none"
          stroke="#37a849"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M47,17v6a2,2,0,0,0,2,2h6l-8-8H41V46a2,2,0,0,1-2,2H11a2,2,0,0,1-2-2V7a2,2,0,0,1,2-2H33l8,8H35a2,2,0,0,1-2-2V5"
        ></path>
        <path
          fill="none"
          stroke="#37a849"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M55,29V57a2,2,0,0,1-2,2H25a2,2,0,0,1-2-2V48"
        ></path>
      </svg>
    );
  };

  return (
    <div
      className="flex justify-center items-center p-12 rounded-md text-center relative uppercase color-card"
      style={{
        backgroundColor: `${color}`,
      }}
      onMouseEnter={() => toggleCopyIcon(true)}
      onMouseLeave={() => toggleCopyIcon(false)}
    >
      {showCopyIcon && (
        <button
          onClick={() => copyTextToClipboard(color)}
          className="w-7 bg-white rounded-md absolute top-0 right-0 mt-2 mr-2"
        >
          {getCopyIcon()}
        </button>
      )}
      <span className="text-sm md:text-lg lg:text-lg text-white">{color}</span>
    </div>
  );
};

Cards.propTypes = {
  color: PropTypes.string.isRequired,
  copyTextToClipboard: PropTypes.func.isRequired,
};

export default Cards;
