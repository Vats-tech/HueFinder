import React from "react";
import PropTypes from "prop-types";

const colorStackCount = 4;

const Cards = ({ color, copyTextToClipboard }) => {
  return (
    <div
      className="color__card-container mt-12"
      onClick={() => copyTextToClipboard(color)}
    >
      {[...Array(colorStackCount)].map((_, index) => {
        return (
          <div
            className="color__card-stack"
            key={index}
            style={{ backgroundColor: color[index] }}
            onClick={() => copyTextToClipboard(color[index])}
          >
            <span className="color__card-value">{color[index]}</span>
          </div>
        );
      })}
    </div>
  );
};

Cards.propTypes = {
  color: PropTypes.array.isRequired,
  copyTextToClipboard: PropTypes.func.isRequired,
};

export default Cards;
