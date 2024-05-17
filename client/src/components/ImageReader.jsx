import { useEffect, useRef, useState } from "react";
import BaseImage from "../../public/BaseImage.jpg?url";
import { fetchColorPalette, getHexFromRGB } from "./utils/util";
import Details from "./Detaills";
import {
  DEMO_COLORS,
  DESCRIPTION,
  HUE_EXTRACTOR_TYPE,
} from "./utils/constants";

const ImageReader = () => {
  /**
   * Holds current image.
   */
  const [image, setImage] = useState(BaseImage);

  /**
   * Holds color of image
   */
  const [color, setColor] = useState("#380132");

  /**
   * Holds selected color of image
   */
  const [selectedColor, setSelectedColor] = useState("#380132");

  /**
   * Holds color palette.
   */
  const [colorPalette, setColorPalette] = useState();

  /**
   * Get the color palette of the image
   */
  const getAllColorPlatte = () => {
    const img = document.querySelector("img");
    let palette = [];
    if (img.complete) {
      palette = fetchColorPalette(img);
    } else {
      img.addEventListener("load", function () {
        palette = fetchColorPalette(img);
      });
    }
    setColorPalette(palette);
  };

  /**
   * Handle action after uploading the image.
   * @param {*} event
   */
  const onImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        setImage(e.target.result);
        const palette = getAllColorPlatte(e.target.result);
        setColorPalette(palette);
      };
    };
    reader.readAsDataURL(file);
  };

  /**
   * Handle mouse action on image, fetches color of hovered area.
   * @param {*} e
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
   * Handle click on image.
   */
  const handleClickOnImage = () => {
    setSelectedColor(color);
  };

  useEffect(() => {
    getAllColorPlatte();
  }, []);

  return (
    <div className="w-full">
      <Details
        demoColors={DEMO_COLORS.IMG_TO_COL}
        description={DESCRIPTION.IMAGE_COLOR_EXTRACTOR}
        hueExtractorType={HUE_EXTRACTOR_TYPE.IMAGE_COLOR_EXTRACTOR}
      />

      <div className="w-full lg:flex lg:justify-between lg:gap-10 lg:flex-row md:mt-0">
        <div id="imageContainer" className="w-full lg:w-1/2">
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="rounded-lg cursor-pointer"
              onMouseMove={handleMouseMove}
              onClick={handleClickOnImage}
            />
          )}
        </div>
        <div className="flex justify-evenly items-center flex-col md:max-w-d mt-10">
          <div className="w-full">
            <input
              type="file"
              className="file-input file-input-bordered file-input-accent w-full "
              onChange={onImageUpload}
            />
          </div>

          <div className="flex justify-between mt-10 w-full">
            <div
              className="w-20 min-h-3 rounded-md mr-1 md:mr-4"
              style={{
                backgroundColor: `${color}`,
              }}
            ></div>
            <div
              className="w-20 min-h-3 rounded-md mr-1 md:mr-4"
              style={{
                backgroundColor: `${selectedColor}`,
              }}
            ></div>
            <div
              id="colorDisplay"
              className="w-full flex justify-around items-center bg-white min-h-12 font-light font-mono rounded-lg"
            >
              <pre>HEX {selectedColor}</pre>
            </div>
            {/* TODO - Show all color palette here*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageReader;
