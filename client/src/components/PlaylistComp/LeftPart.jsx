import React from "react";

const LeftPart = ({ playlistInfo }) => {
  const thumbnail = playlistInfo?.videos?.[0]?.thumbnail || "";

  return (
    <div
      style={{ scrollbarWidth: "thin" }}
      className="bg-[#2388a7] overflow-y-auto flex lg:flex-col flex-col sm:flex-row sm:gap-6 sm:m-0 px-4 py-6 sm:px-7 sm:py-8 dark:bg-gray-800 text-white shadow-xl rounded-lg m-4 lg:h-[calc(100vh-8rem)] lg:fixed lg:top-24 lg:left-10 lg:bottom-24 z-10 sm:w-full lg:w-[22rem]"
    >
      <div className="h-44 lg:w-full sm:w-72 rounded-lg lg:mb-4 shrink-0 bg-gray-400">
        <img
          src={thumbnail}
          alt="image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="mt-4 sm:mt-0">
        <h1 className="text-2xl font-bold">{playlistInfo?.name}</h1>
        <p className="mt-4 mb-2">{playlistInfo?.owner?.fullName}</p>
        <p>{playlistInfo?.videos?.length || 0} videos</p>
        <p className="text-sm dark:text-gray-400">
          Last updated on {new Date(playlistInfo?.updatedAt).toDateString()}
        </p>
        <p className="mt-4 text-sm dark:text-gray-200 lg:w-full sm:w-72">
          {playlistInfo?.description}
        </p>
      </div>
    </div>
  );
};

export default LeftPart;
