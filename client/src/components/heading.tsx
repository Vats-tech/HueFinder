import React from "react";

const Heading = () => {
  const enableSearchInHeaderFeature = false;

  return (
    <header className="header">
      <h1 className="product-name">
        <a>HueFinder</a>
      </h1>

      {enableSearchInHeaderFeature && (
        <div className="search-container">
          <div className="pill">
            Red
            <span className="close-icon">+</span>
          </div>
          <input type="text" className="search-box" placeholder="Search..." />
        </div>
      )}
    </header>
  );
};

export default Heading;
