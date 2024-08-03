import { useState } from "react";
import ImageReader from "./ImageReader";
import TextColorExtractor from "./TextColorExtractor";
import Tabs from "./Tabs";
import { FEATURES_LABEL } from "./utils/constants";
import React from "react";

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
      <div className="w-11/12 md:w-4/5 mx-auto">
        <Tabs
          allTabs={allTabs}
          activeTab={activeTab}
          onChangeTab={onChangeTab}
        />
      </div>
      <div className="divider mt-40"></div>
      <footer className="footer footer-center p-10 text-primary-content text-white">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="inline-block fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="font-bold">
            Copyright © Vats Tech <br />
          </p>
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://github.com/Vats-tech/HueFinder"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 64 64"
              >
                <path d="M32,10c12.15,0,22,9.85,22,22c0,9.768-6.369,18.045-15.179,20.916c0.002-0.008,0.006-0.021,0.006-0.021	s-1.485-0.696-1.453-1.938c0.035-1.367,0-4.556,0-5.727c0-2.01-1.272-3.434-1.272-3.434s9.977,0.112,9.977-10.533	c0-4.107-2.147-6.245-2.147-6.245s1.128-4.385-0.39-6.245c-1.701-0.184-4.749,1.626-6.05,2.472c0,0-2.062-0.846-5.492-0.846	c-3.43,0-5.492,0.846-5.492,0.846c-1.301-0.846-4.348-2.656-6.05-2.472c-1.518,1.86-0.39,6.245-0.39,6.245s-2.147,2.137-2.147,6.245	c0,10.645,9.977,10.533,9.977,10.533s-1.005,1.136-1.225,2.806c-0.696,0.236-1.721,0.528-2.549,0.528	c-2.165,0-3.812-2.105-4.416-3.078c-0.595-0.96-1.815-1.766-2.953-1.766c-0.749,0-1.115,0.375-1.115,0.803s1.05,0.727,1.743,1.521	c1.461,1.674,1.435,5.438,6.641,5.438c0.565,0,1.719-0.139,2.588-0.256c-0.005,1.185-0.007,2.436,0.012,3.167	c0.031,1.242-1.453,1.938-1.453,1.938s0.004,0.012,0.006,0.021C16.369,50.045,10,41.768,10,32C10,19.85,19.85,10,32,10z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
