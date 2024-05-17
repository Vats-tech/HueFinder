import ColorThief from "colorthief";

/**
 * Get the color palette of the image
 */
export const fetchColorPalette = (img) => {
  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(img);
  return palette;
};
