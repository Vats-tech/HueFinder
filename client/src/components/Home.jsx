import { useState } from "react";
import { getColorData as getColorData } from "./api/ColorAPI";
import Cards from "./Cards";
import ImageReader from "./ImageReader";
import TextColorExtractor from "./TextColorExtractor";
import Tabs from "./Tabs";

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
      label: "Text to Color",
      component: (
        <TextColorExtractor
          setLoading={setLoading}
          setToastStatus={setToastStatus}
          setToast={setToast}
          closeToast={closeToast}
        />
      ),
    },
    2: { label: "Color From Image", component: <ImageReader /> },
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

  return (
    <div className="w-full h-screen">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-green-200 bg-opacity-20 z-50">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      )}
      {showToast && (
        <div className="toast toast-top">
          <div className={`alert alert-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <header>
        <nav>
          <div className="flex justify-center items-center pt-4 pb-8 xsm:p-8">
            <h1 className="text-4xl subpixel-antialiased font-extralight">
              Hue Finder
            </h1>
          </div>
        </nav>
      </header>
      <div className="w-10/12 md:w-8/12 mx-auto">
        <Tabs
          allTabs={allTabs}
          activeTab={activeTab}
          onChangeTab={onChangeTab}
        />
      </div>

      <div className="pt-12"></div>
    </div>
  );
};

export default Home;
