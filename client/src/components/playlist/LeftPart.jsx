import React from "react";

const LeftPart = () => {
  return (
    <div className="bg-[#2388a7] flex lg:flex-col flex-col sm:flex-row sm:gap-6 sm:m-0 px-7 sm:px-10 py-8 dark:bg-gray-800 text-white shadow-xl rounded-lg p-4 m-4 lg:h-[calc(100vh-8rem)] lg:fixed lg:top-24 lg:left-10 lg:bottom-24 z-10 sm:w-full lg:w-[22rem]">
      <div className="h-44 lg:w-full sm:w-72 rounded-lg lg:mb-4 shrink-0 bg-gray-400"></div>
      <div className="mt-4 sm:mt-0">
        <h1 className="text-2xl font-bold">DBMS Placements Series 2022</h1>
        <p className="mt-4 mb-2">CodeHelp - by Babbar</p>
        <p>22 videos</p>
        <p className="text-sm dark:text-gray-400">
          Last updated on 21 May 2023
        </p>
      </div>
    </div>
  );
};

export default LeftPart;
