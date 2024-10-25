const VideoInfo = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600"></div>
        <div className="ml-4">
          <h3 className="text-sm font-semibold dark:text-white">
            Akshat Jaiswal
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            100K subscribers
          </p>
        </div>
      </div>
      <button className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded dark:bg-red-600">
        Subscribe
      </button>
    </div>
  );
};

export default VideoInfo;
