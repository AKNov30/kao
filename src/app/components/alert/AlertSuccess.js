// components/AlertSuccess.js
import React from "react";

export default function AlertSuccess({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col items-center">
        <div className="bg-green-100 rounded-full p-3 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-auto text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 text-center md:text-2xl">{message}</h2>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}