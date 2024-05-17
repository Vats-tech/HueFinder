import { useEffect, useRef, useState } from "react";
import BaseImage from "../../public/BaseImage.jpg?url";
import ColorThief from "colorthief";

const ImageReader = () => {
  /**
   * Holds current image.
   */
  const [image, setImage] = useState(BaseImage);

  /**
   * Holds color of image
   */
  const [color, setColor] = useState("rgb(12, 34, 123)");

  /**
   * Holds selected color of image
   */
  const [selectedColor, setSelectedColor] = useState("rgb(12, 34, 123)");

  /**
   * Holds color palette.
   */
  const [colorPalette, setColorPalette] = useState();

  /**
   * Set the color palette of image
   * @param {*} img - Image
   */
  const setColorPlatteOfImage = (img) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(img);
    console.log("Palette", palette);
    setColorPalette(palette);
  };

  /**
   * Get the color palette of the image
   */
  const getAllColorPlatte = () => {
    const img = document.querySelector("img");
    if (img.complete) {
      setColorPlatteOfImage(img);
    } else {
      image.addEventListener("load", function () {
        setColorPlatteOfImage(img);
      });
    }
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
        getAllColorPlatte(e.target.result);
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
    const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    setColor(rgb);
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
    <div className="w-full flex justify-between flex-col gap-10 lg:flex-row md:mt-0">
      <div id="imageContainer" className="lg:max-w-md">
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
      <div className="flex justify-evenly items-center flex-col md:max-w-d">
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
            <div className="md:w-40">
              <pre>RGB {selectedColor}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageReader;
