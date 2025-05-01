import { useState } from "react";
import { getHexFromRGB, hexToRgb } from "./utils/util";
import React from "react";

const ColorConverter = () => {
  const [inputColor, setInputColor] = useState();
  const [transformedColor, setTransformedColor] = useState();

  const handleUserInput = (event) => {
    const colorCode = event.target.value;
    setInputColor(colorCode);
  };

  const handleColorConversion = () => {
    const isHex = inputColor.startsWith("#");
    let convertedColor = "";
    if (isHex) {
      convertedColor = hexToRgb(inputColor);
    } else {
      let colorCode = inputColor;
      if (colorCode.startsWith("rgb")) {
        // Remove "rgb(" and ")" if they exist
        colorCode = inputColor.replace(/rgb\(|\)/g, "");
      }

      let colorArray = colorCode.split(",");
      // Convert the elements to numbers
      let rgbArray = colorArray.map(Number);
      convertedColor = getHexFromRGB({
        r: rgbArray[0],
        g: rgbArray[1],
        b: rgbArray[2],
      });
    }
    setTransformedColor(convertedColor);
  };

  return (
    <div>
      <div className="p-8 items-center">
        <h3 className="flex items-center">
          <p className="mr-2 font-mono text-lg">RGB</p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="28"
              height="28"
              viewBox="0 0 50 50"
            >
              <path d="M 20 4 C 15.054545 4 11 8.0545455 11 13 L 11 35.585938 L 5.7070312 30.292969 L 4.2929688 31.707031 L 12 39.414062 L 19.707031 31.707031 L 18.292969 30.292969 L 13 35.585938 L 13 13 C 13 12.759091 13.01313 12.521884 13.037109 12.287109 C 13.396795 8.7654918 16.386364 6 20 6 L 30 6 L 30.5 6 L 30.5 4 L 30 4 L 20 4 z M 38 10.585938 L 30.292969 18.292969 L 31.707031 19.707031 L 37 14.414062 L 37 37 C 37 40.613636 34.234508 43.603205 30.712891 43.962891 C 30.478116 43.98687 30.240909 44 30 44 L 20 44 L 19.5 44 L 19.5 46 L 20 46 L 30 46 C 30.309091 46 30.614657 45.984029 30.916016 45.953125 C 35.436391 45.489569 39 41.636364 39 37 L 39 14.414062 L 44.292969 19.707031 L 45.707031 18.292969 L 38 10.585938 z"></path>
            </svg>
          </span>
          <p className="ml-2 font-mono text-lg">HEX</p>
        </h3>
        <input
          type="text"
          placeholder="Enter RGB as rgb(0,0,0) and HEX as #343RFYT"
          onChange={handleUserInput}
          className="input input-bordered input-accent w-full max-w-xs text-xs scroll-m-1"
        />
        {transformedColor && (
          <div className="w-56 border-2 min-h-12 flex gap-7 items-center rounded-md border-green-200">
            <div
              className="w-10 h-10 ml-1 rounded-md"
              style={{ backgroundColor: `${transformedColor}` }}
            ></div>
            <div className="font-mono uppercase">{transformedColor}</div>
          </div>
        )}
        <button
          className="btn btn-accent w-32 font-mono mt-4"
          onClick={handleColorConversion}
          disabled={inputColor ? false : true}
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default ColorConverter;
