import { useEffect, useRef, useState } from "react";
import BaseImage from "/BaseImage.jpg?url";
import { fetchColorPalette, getHexFromRGB, hexToRgb } from "./utils/util";
import Details from "./Detaills";
import {
  DEMO_COLORS,
  DESCRIPTION,
  FEATURES_LABEL,
  HUE_EXTRACTOR_TYPE,
  LIX,
} from "./utils/constants";
import ColorConverter from "./ColorConverter";
import React from "react";
import HueModal from "./HueModal";

/**
 * ImageReader component :
 * - Extracting colors from an image.
 * - Displaying the color palette of the image.
 * - Allowing color selection by hovering over the image.
 *
 * @component ImageReader
 */

const ImageReader = () => {
  /**
   * State hook to store the current image URL for color extraction.
   *
   * @constant {string} image - The current image URL.
   * @function setImage - Function to update the image URL.
   * @default BaseImage
   */
  const [image, setImage] = useState(BaseImage);

  /**
   * State hook that holds the color extracted from the image.
   *
   * @constant {string} color - The color extracted from the image.
   * @function setColor - Function to update the extracted color.
   * @default "#380132" - The initial color value.
   */
  const [color, setColor] = useState("#380132");

  /**
   * State hook that holds the selected color from the image.
   *
   * @constant {string} selectedColor - The selected color from the image.
   * @default "#380132" - The initial selected color value.
   * @function setSelectedColor - Function to update the selected color.
   */
  const [selectedColor, setSelectedColor] = useState("#380132");

  /**
   * State hook that holds the color palette extracted from the image.
   *
   * @constant {Array} colorPalette - The array of colors in the palette extracted from the image.
   * @default [] - The initial color palette is an empty array.
   * @function setColorPalette - Function to update the color palette.
   */
  const [colorPalette, setColorPalette] = useState([]);

  /**
   * Reference to the image element for color extraction.
   *
   * @constant {object} imageRef - The reference object for the image element.
   * @default null - The initial value is null.
   */
  const imageRef = useRef(null);

  /**
   * State hook that holds the modal state.
   */
  const [isModalOpen, setIsModalOpen] = useState(true); // Placeholder for modal state

  /**
   * State hook that holds the details UI state.
   * This state is used to control the visibility of the details UI.
   */
  const [enableDetailsUI, setEnableDetailsUI] = useState(false); // Placeholder for details UI state

  /**
   * Handles actions after uploading the image. Extracts the URL of the image from the event and stores it in the image state.
   * @param {Event} event - The event object containing information about the uploaded image.
   */
  const onImageUpload = (event) => {
    const file = event.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };
  };

  /**
   * Handles mouse actions on the image to fetch the color of the hovered area.
   *
   * @param {Event} e - The mouse event object.
   */
  const handleMouseMove = (e) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const rect = e.target.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    canvas.width = e.target.width;
    canvas.height = e.target.height;
    ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = getHexFromRGB(pixel);
    setColor(hex);
  };

  /**
   * Handle click on image, keep the current color as selected color.
   */
  const handleClickOnImage = () => {
    setSelectedColor(color);
  };

  /**
   * Extracts the color palette each time an image is uploaded:
   * - Begins extraction immediately if the image is already rendered.
   * - Sets up an event listener to trigger extraction when the image finishes loading, if not yet rendered.
   * - Cleans up the event listener once the image is fully loaded.
   */
  useEffect(() => {
    const currentImage = imageRef.current;
    const onLoad = () => {
      const palette = fetchColorPalette(currentImage) ?? [];
      setColorPalette(palette);
    };

    if (currentImage.complete) {
      onLoad();
    } else {
      currentImage.addEventListener("load", onLoad);
    }

    return () => {
      currentImage.removeEventListener("load", onLoad);
    };
  }, [image]);

  const colorPaletteStyle = (paletteCount, className) => (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {colorPalette.length > 0 &&
        colorPalette.slice(0, paletteCount).map((color) => {
          return (
            <div
              key={color}
              className="w-12 h-12"
              style={{
                backgroundColor: color,
              }}
            ></div>
          );
        })}
    </div>
  );

  const selectedColorBlock = (color, styles) => {
    return (
      <div
        className={`w-1/2 h-12 ${styles}`}
        style={{
          backgroundColor: `${color}`,
        }}
      ></div>
    );
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col mx-4 px-0 lg:px-8">
        <div className="my-12 w-full overflow-hidden">
          <h1 className="text-5xl font-mono font-semibold text-center mb-2 scale-x-110 lg:scale-x-150 text-slate-600">
            Image Extractor
          </h1>
          <p className="text-center font-mono font-extralight antialiased tracking-tight text-base text-gray-400 scale-x-110">
            Extract colors from an image
          </p>
        </div>
        <HueModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Image to Color Extractor"
          subtitle="Extract colors from an image"
          description={DESCRIPTION.IMAGE_COLOR_EXTRACTOR}
          buttonText="Got it!"
          onSubmit={() => setIsModalOpen(false)}
        >
          <div className="mt-4">{colorPaletteStyle(8, "flex-nowrap")}</div>
        </HueModal>
        <div className="bg-slate-50 flex items-start flex-col md:flex-row lg:flex-row rounded-md border border-slate-200  lg:gap-16 justify-between w-fit">
          <div className="p-4 rounded-sm max-w-[680px]">
            {image && (
              <img
                src={image}
                ref={imageRef}
                alt="Image for color extraction"
                className="rounded-t cursor-pointer color_extract-image w-full"
                onMouseMove={handleMouseMove}
                onClick={handleClickOnImage}
              />
            )}
          </div>
          <div className="flex flex-col justify-between p-4 h-full w-fit md:w-[420px] lg:w-[330px]">
            <div className=" border-slate-200 rounded-md">
              <div className="flex items-center mb-4 gap-[0.5px]">
                {selectedColorBlock(color, "rounded-l-md")}
                {selectedColorBlock(selectedColor, "rounded-r-md")}
              </div>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-accent w-full"
                onChange={onImageUpload}
              />
            </div>
            <div className="my-4">
              <h3 className="text-lg font-light font-mono">All Palette</h3>
              {colorPaletteStyle(18)}
            </div>
            {/* <button className="w-full bg-blue-600 p-3 rounded-md text-white self-end">
              Palette Details
            </button> */}
            {/* {<ColorConverter />} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageReader;
