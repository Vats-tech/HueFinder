import React from "react";
import PropTypes from "prop-types";

const colorStackCount = 6;

const Cards = ({ color, copyTextToClipboard }) => {
  return (
    <div>
      <div className="flex h-28 md:h-32 overflow-auto rounded-lg shadow-[2px_2px_8px_rgba(0,0,0,0.2)]">
        {[...Array(colorStackCount)].map((_, index) => {
          return (
            <div
              className="group flex items-center justify-center flex-1 h-full hover:flex-[2] transition-all duration-300 ease-in-out"
              key={index}
              style={{ backgroundColor: color[index] }}
              onClick={() => copyTextToClipboard(color[index])}
            >
              <span className="hidden group-hover:inline uppercase">
                {color[index]}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 justify-end mt-4">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-palette2 hover:cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 .5.5v5.277l4.147-4.131a.5.5 0 0 1 .707 0l3.535 3.536a.5.5 0 0 1 0 .708L10.261 10H15.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H3a3 3 0 0 1-2.121-.879A3 3 0 0 1 0 13.044m6-.21 7.328-7.3-2.829-2.828L6 7.188zM4.5 13a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0M15 15v-4H9.258l-4.015 4zM0 .5v12.495zm0 12.495V13z" />
          </svg>
        </span>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-suit-heart hover:cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
          </svg>
          {/* [TODO] - Replace hardcode values */}
          <span className="text-xs font-[robot] font-normal">7.3k</span>
        </div>
      </div>
    </div>
  );
};

Cards.propTypes = {
  color: PropTypes.array.isRequired,
  copyTextToClipboard: PropTypes.func.isRequired,
};

export default Cards;
