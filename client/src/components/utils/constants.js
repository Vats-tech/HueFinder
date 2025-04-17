/**
 * Hue extractor type i.e, Text to Color / Image to Color
 */
export const HUE_EXTRACTOR_TYPE = {
  TEXT_COLOR_EXTRACTOR: "TEXT_COLOR_EXTRACTOR",
  IMAGE_COLOR_EXTRACTOR: "IMAGE_COLOR_EXTRACTOR",
};

/**
 * Description of features to add on demo card.
 */
export const DESCRIPTION = {
  IMAGE_COLOR_EXTRACTOR:
    "Experience the magic of color extraction from images! Upload any image and hover over it to reveal the captivating colors of each area.",
  TEXT_COLOR_EXTRACTOR:
    "Explore a stunning collection of color palettes with our intuitive color tool. Generate, customize, and extract colors from images effortlessly. Perfect for designers, artists, and developers, our app helps you find the perfect shades for any project. Discover harmonious color combinations and bring your creative ideas to life with ease!",
};

/**
 * Demo colors to add on demo cards
 */
export const DEMO_COLORS = {
  TEXT_TO_COL: ["bg-green-400", "bg-green-600", "bg-green-800"],
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
  RGB_TO_HEX_CONVERTER: true,
};

export const LABEL_USED = {
  HUE_FINDER: "HUE FINDER",
  PALETTE: "Palette",
  HEX: "HEX",
  RGB: "RGB",
  CONVERT: "CONVERT",
};
