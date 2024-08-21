import { useState } from "react";
import ImageReader from "./ImageReader";
import TextColorExtractor from "./TextColorExtractor";
import Tabs from "./Tabs";
import { FEATURES_LABEL } from "./utils/constants";
import React from "react";
import Heading from "./heading";

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
   * Current tab.
   */
  const [activeTab, setActiveTab] = useState(1);

  /**
   * Holds all tabs.
   */
  const allTabs = {
    1: {
      label: FEATURES_LABEL.TEXT_TO_COLOR,
      component: (
        <TextColorExtractor
          setLoading={setLoading}
          setToastStatus={setToastStatus}
          setToast={setToast}
          closeToast={closeToast}
        />
      ),
    },
    2: { label: FEATURES_LABEL.IMAGE_TO_COLOR, component: <ImageReader /> },
  };

  /**
   * Handler to close the toast.
   */
  function closeToast() {
    setTimeout(() => setToastStatus(false), 1000);
  }

  /**
   * Handle change in tab.
   */
  const onChangeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };

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

  return (
    <div className="landing-page__container">
      {loading && Loader}
      {showToast && ToastContainer}
      <Heading />
      <main>
        <div className="flex justify-between landing-page__content">
          <Tabs
            allTabs={allTabs}
            activeTab={activeTab}
            onChangeTab={onChangeTab}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
