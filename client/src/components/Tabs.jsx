const Tabs = ({ allTabs, activeTab, onChangeTab }) => {
  /**
   * Render current active tab.
   * @returns {Object} tabs
   */
  const renderActiveTab = () => {
    return allTabs[activeTab].component;
  };

  return (
    <div role="tablist" className="tabs tabs-bordered">
      {Object.keys(allTabs).map((tabIndex) => (
        <>
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab "
            style={{ width: "max-content" }}
            aria-label={allTabs[tabIndex].label}
            onClick={() => onChangeTab(Number(tabIndex))}
            checked={Number(tabIndex) === activeTab}
          />
          <div role="tabpanel" className="tab-content pt-10 w-64 xsm:w-full">
            {renderActiveTab()}
          </div>
        </>
      ))}
    </div>
  );
};

export default Tabs;
