export const loadState = (key, defaultValue) => {
  try {
    const user = sessionStorage.getItem(key);
    if (!user) {
      return defaultValue;
    }

    return JSON.parse(user);
  } catch (error) {
    return defaultValue;
  }
};

export const saveState = (key, value) => {
  try {
    const user = JSON.stringify(value);
    sessionStorage.setItem(key, user);
  } catch (error) {
    console.log(error);
  }
};
