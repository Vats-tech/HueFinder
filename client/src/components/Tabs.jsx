import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";

const Tabs = ({ allTabs, activeTab, onChangeTab }) => {
  /**
   * Render current active tab.
   * @returns {Object} tabs
   */
  const renderActiveTab = () => {
    return allTabs[activeTab].component;
  };

  return (
    <div role="tablist" className="tabs tabs-bordered justify-center">
      {Object.keys(allTabs).map((tabIndex) => (
        <Fragment key={tabIndex}>
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab font-mono text-base"
            style={{ width: "max-content" }}
            aria-label={allTabs[tabIndex].label}
            onClick={() => onChangeTab(Number(tabIndex))}
            checked={Number(tabIndex) === activeTab}
          />
          <div role="tabpanel" className="tab-content pt-10" key={tabIndex}>
            {renderActiveTab()}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  allTabs: PropTypes.array.isRequired,
  activeTab: PropTypes.number.isRequired,
  onChangeTab: PropTypes.func.isRequired,
};
export default Tabs;
