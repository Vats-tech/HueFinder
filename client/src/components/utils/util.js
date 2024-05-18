import ColorThief from "colorthief";

/**
 * Get the color palette of the image
 */
export const fetchColorPalette = (img) => {
  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(img, 10);
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
export const changeToHexValue = (value) => {
  const hex = Math.round(value).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

/**
 * Change RGB to HEX
 * @param {*} param0
 * @returns Hex value
 */
export const getHexFromRGB = ({ r, g, b }) => {
  return "#" + changeToHexValue(r) + changeToHexValue(g) + changeToHexValue(b);
};
