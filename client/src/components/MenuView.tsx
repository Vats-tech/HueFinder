import React from "react";
import { HUE_EXTRACTOR_TYPE } from "./utils/constants";

interface MenuViewProps {
  activeHueType: string;
  onChangeHueType: (args0: string) => void;
}

const MenuView = ({ activeHueType, onChangeHueType }: MenuViewProps) => {
  const imageColorExtractorIconColor =
    activeHueType === HUE_EXTRACTOR_TYPE.IMAGE_COLOR_EXTRACTOR
      ? "fill-blue-500"
      : "fill-gray-500";

  const textColorExtractorIconColor =
    activeHueType === HUE_EXTRACTOR_TYPE.TEXT_COLOR_EXTRACTOR
      ? "fill-blue-500"
      : "fill-gray-500";

  return (
    <div className="fixed bottom-4 py-3 flex bg-black shadow-xl rounded-full w-32 justify-evenly items-center">
      <button
        onClick={() =>
          onChangeHueType(HUE_EXTRACTOR_TYPE.IMAGE_COLOR_EXTRACTOR)
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className={`bi bi-image ${imageColorExtractorIconColor}`}
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
        </svg>
      </button>
      <button
        className="mt-0"
        onClick={() => onChangeHueType(HUE_EXTRACTOR_TYPE.TEXT_COLOR_EXTRACTOR)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className={`bi bi-palette ${textColorExtractorIconColor}`}
          viewBox="0 0 16 16"
        >
          <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
          <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default MenuView;
