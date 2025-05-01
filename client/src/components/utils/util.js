import ColorThief from "colorthief";

/**
 * Get the color palette of the image
 */
export const fetchColorPalette = (img) => {
  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(img, 20);
  const helper = palette.reduce((acc, curr) => {
    const r = curr[0];
    const g = curr[1];
    const b = curr[2];
    acc.push(`rgb(${r},${g},${b})`);
    return acc;
  }, []);
  return helper;
};

/**
 * Change value to hex value
 * @param {*} value Color value (R,G,B)
 * @returns
 */
export const changeRGBToHexValue = (value) => {
  const validValue = Math.max(0, Math.min(255, Math.round(value)));
  const hex = Math.round(validValue).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

/**
 * Change RGB to HEX
 * @param {Array} RGB value of color/
 * @returns HEX value of color.
 */
export const getHexFromRGB = ([r, g, b]) => {
  return (
    "#" +
    changeRGBToHexValue(r) +
    changeRGBToHexValue(g) +
    changeRGBToHexValue(b)
  );
};

/**
 * Change Hex to RGB.
 * @param {*} hex - Hex value
 * @returns {String} - RGB Value
 */
export const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  let bigint;
  if (hex.length === 3) {
    // Handle shorthand hex notation (#RGB)
    bigint = parseInt(
      hex
        .split("")
        .map((char) => char + char)
        .join(""),
      16
    );
  } else if (hex.length === 6) {
    // Handle full hex notation (#RRGGBB)
    bigint = parseInt(hex, 16);
  } else {
    throw new Error("Invalid hex color format");
  }

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r},${g},${b})`;
};
