function getTimeDifference(updatedTime) {
  const currentTime = new Date();
  const updatedDate = new Date(updatedTime);

  const diffInMilliseconds = currentTime - updatedDate;

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Approximate number of days in a month
  const years = Math.floor(days / 365.25); // Approximate number of days in a year

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

const VideoStats = ({ views, time }) => {
  const timeDifference = getTimeDifference(time);

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      <p>
        {views} views • {timeDifference}{" "}
      </p>
    </div>
  );
};

export default VideoStats;
