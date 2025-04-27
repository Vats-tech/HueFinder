import React from "react";
import { createPortal } from "react-dom";

interface HueModalProps {
  title?: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  description?: string;
  onSubmit?: () => void;
  buttonText?: string;
}

const HueModal = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  description,
  onSubmit,
  buttonText = "Submit",
}: HueModalProps) => {
  if (!isOpen) return null; // Don't render if not open

  // use createPortal to render the modal in a different part of the DOM
  // This is useful for modals to avoid overflow issues and z-index problems
  // when using a parent component with overflow hidden or z-index issues
  // This assumes you have a div with id "modal-outlet" in your index.html or main HTML file
  // <div id="modal-outlet"></div>
  // This is where the modal will be rendered
  // You can add this div in your index.html or main HTML file
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center font-roboto">
      <div
        className="bg-black bg-opacity-70 fixed top-0 left-0 w-full h-full"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-[90%] lg:max-w-md max-w-sm p-6 relative">
        {title && <h2 className="text-lg text-black">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute rounded-full top-5 right-5 text-gray-500 hover:text-black text-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-x-lg stroke-gray-800 hover:stroke-gray-950"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        {subtitle && (
          <p className="text-gray-600 text-xs lg:text-sm mb-4">{subtitle}</p>
        )}
        <div className="my-2 font-roboto font-thin text-gray-700 ">
          {description && (
            <p className="text-gray-800 text-xs lg:text-sm">{description}</p>
          )}
          {children}
        </div>
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 text-sm font-light flex ml-auto"
        >
          {buttonText}
        </button>
      </div>
    </div>,
    document.getElementById("modal-outlet") as HTMLElement
  );
};

export default HueModal;
