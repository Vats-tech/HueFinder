/**
 * Hue extractor type i.e, Text to Color / Image to Color
 */
export const HUE_EXTRACTOR_TYPE = {
  TEXT_COLOR_EXTRACTOR: 1,
  IMAGE_COLOR_EXTRACTOR: 2,
};

/**
 * Description of features to add on demo card.
 */
export const DESCRIPTION = {
  IMAGE_COLOR_EXTRACTOR:
    "Experience the magic of color extraction from images! Upload any image and hover over it to reveal the captivating colors of each area.",
  TEXT_COLOR_EXTRACTOR:
    "Explore the vibrant world of colors with our innovative text-based color extraction tool. Simply enter any text, and watch as our application fetches a delightful array of color palettes inspired by your input.",
};

/**
 * Demo colors to add on demo cards
 */
export const DEMO_COLORS = {
  TEXT_TO_COL: ["#fcfc24", "#fcf47c", "#fcbb04"],
  IMG_TO_COL: ["rgb(12, 34, 123)", "rgb(2, 1, 96)", "rgb(1, 52, 30)"],
};

/**
 * Heading label for each features
 */
export const FEATURES_LABEL = {
  IMAGE_TO_COLOR: "Color From Image",
  TEXT_TO_COLOR: "Text To Color",
};

/**
 * LIX to enable and disable the features.
 */
export const LIX = {
  RGB_TO_HEX_CONVERTER: false,
};
