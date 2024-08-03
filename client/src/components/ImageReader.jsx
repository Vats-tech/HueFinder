import { useEffect, useRef, useState } from "react";
import BaseImage from "/BaseImage.jpg?url";
import { fetchColorPalette, getHexFromRGB } from "./utils/util";
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
   * Handles actions after uploading the image. Extracts the URL of the image from the event and stores it in the image state.
   *
   * @param {Event} event - The event object containing information about the uploaded image.
   */
  const onImageUpload = (event) => {
    const file = event.target.files[0];
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
    const rgb = { r: pixel[0], g: pixel[1], b: pixel[2] };
    const hex = getHexFromRGB(rgb);
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

  return (
    <div className="w-full">
      <Details
        demoColors={DEMO_COLORS.IMG_TO_COL}
        heading={FEATURES_LABEL.IMAGE_TO_COLOR}
        description={DESCRIPTION.IMAGE_COLOR_EXTRACTOR}
        hueExtractorType={HUE_EXTRACTOR_TYPE.IMAGE_COLOR_EXTRACTOR}
      />

      <div className="w-full flex flex-col lg:justify-between lg:gap-20 lg:flex-row md:mt-0">
        <div id="imageContainer" className="w-full lg:w-1/2">
          <div className="card lg:card-side bg-base-100 shadow-xl rounded-md">
            <div className="card-body p-0">
              {image && (
                <img
                  id="colorPaletteImage"
                  src={image}
                  ref={imageRef}
                  alt="Image for color extraction"
                  className="rounded-t cursor-pointer color_extract-image"
                  onMouseMove={handleMouseMove}
                  onClick={handleClickOnImage}
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-light font-mono">Palette</h3>
                <div className="carousel carousel-center rounded-sm">
                  <div className="carousel-item flex-wrap">
                    {colorPalette.length > 0 &&
                      colorPalette.map((color) => {
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-col gap-10 mt-10 lg:mt-0">
          <div className="card lg:card-side bg-base-100 shadow-xl rounded-md">
            <div className="card-body flex justify-evenly items-center flex-col md:max-w-d p-4 md:p-6 lg:p-10 gap-6">
              <input
                type="file"
                className="file-input file-input-bordered file-input-accent w-full font-mono"
                onChange={onImageUpload}
              />
              <div className="flex justify-between w-full">
                <span
                  className="w-20 min-h-3 rounded-md mr-1 md:mr-4"
                  style={{
                    backgroundColor: `${color}`,
                  }}
                ></span>
                <span
                  className="w-20 min-h-3 rounded-md mr-1 md:mr-4"
                  style={{
                    backgroundColor: `${selectedColor}`,
                  }}
                ></span>
                <div
                  id="colorDisplay"
                  className="w-full flex justify-around items-center border-2 border-green-200 min-h-12 font-light font-mono rounded-lg"
                >
                  <pre>HEX {selectedColor}</pre>
                </div>
              </div>
            </div>
          </div>
          {LIX.RGB_TO_HEX_CONVERTER && <ColorConverter />}
        </div>
      </div>
    </div>
  );
};

export default ImageReader;
