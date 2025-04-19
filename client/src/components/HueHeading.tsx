import React from "react";
import { HUE_EXTRACTOR_TYPE } from "./utils/constants";
import MenuView from "./MenuView";

interface HueHeading {
  activeHueType: string;
  onChangeHueType: (args0: string) => void;
}

// This component is used to display the heading of the application
// It contains the title and the buttons to change the hue type
const HueHeading = ({ onChangeHueType, activeHueType }: HueHeading) => {
  /**
   * Checks if the current view is mobile or not
   */
  const isMobileView = (): boolean => {
    const isMobileUA =
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isSmallScreen = window.innerWidth <= 768;
    return isMobileUA || isSmallScreen;
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="p-5 bg-slate-900 flex justify-around items-center">
        <h1 className="ml-2 text-slate-700 font-roboto text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          HUE / FINDER
        </h1>
        {!isMobileView() ? (
          <div className="text-gray-200 text-lg">
            <ul className="flex space-x-8">
              <li>
                <button
                  onClick={() =>
                    onChangeHueType(HUE_EXTRACTOR_TYPE.TEXT_COLOR_EXTRACTOR)
                  }
                >
                  Color Palette
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onChangeHueType(HUE_EXTRACTOR_TYPE.IMAGE_COLOR_EXTRACTOR)
                  }
                >
                  Image Upload
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <MenuView
            onChangeHueType={onChangeHueType}
            activeHueType={activeHueType}
          />
        )}
      </div>
    </header>
  );
};

export default HueHeading;
