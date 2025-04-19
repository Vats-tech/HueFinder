import { useState } from "react";
import ImageReader from "./ImageReader";
import TextColorExtractor from "./TextColorExtractor";
import { HUE_EXTRACTOR_TYPE } from "./utils/constants";
import React from "react";
import HueHeading from "./HueHeading";

const Home = () => {
  /**
   * Holds loading state
   */
  const [loading, setLoading] = useState(false);

  /**
   * Holds toast state.
   */
  const [showToast, setToastStatus] = useState(false);

  /**
   * Holds toast message
   */
  const [toast, setToast] = useState({ type: "success", message: "" });

  /**
   * Currently active hue type.
   * Default is image color extractor.
   */
  const [activeHueType, setActiveHueType] = useState(
    HUE_EXTRACTOR_TYPE.IMAGE_COLOR_EXTRACTOR
  );

  /**
   * Handler to close the toast.
   */
  function closeToast() {
    setTimeout(() => setToastStatus(false), 1000);
  }

  const Loader = (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-green-200 bg-opacity-20 z-50">
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  );

  const ToastContainer = (
    <div className="toast toast-top">
      <div className={`alert alert-${toast.type}`}>
        <span>{toast.message}</span>
      </div>
    </div>
  );

  const onChangeHueType = (type) => {
    setActiveHueType(type);
  };

  return (
    <div className="w-full">
      {loading && Loader}
      {showToast && ToastContainer}
      <HueHeading
        onChangeHueType={onChangeHueType}
        activeHueType={activeHueType}
      />
      <main>
        <div data-test-main-container className="lg:mx-12 flex justify-between">
          {activeHueType === HUE_EXTRACTOR_TYPE.TEXT_COLOR_EXTRACTOR ? (
            <TextColorExtractor
              setLoading={setLoading}
              setToastStatus={setToastStatus}
              setToast={setToast}
              closeToast={closeToast}
            />
          ) : (
            <ImageReader />
          )}
        </div>
      </main>
      <footer className="p-4 mt-12 bg-slate-900 text-sm">
        <div className="p-4 flex justify-center">
          <ul className="text-white">
            <li className="p-2"></li>
            <li className="p-2"></li>
            <li className="p-2"></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Home;
