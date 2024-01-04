export const setCookie = (name, value) => {
  localStorage.setItem(name, value);
};
export const getCookie = name => {
  return localStorage.getItem(name);
};
export const deleteCookie = name => {
  localStorage.removeItem(name);
};
export const deleteAll = () => {
  localStorage.clear();
};

export const setLocalStorageItem = (name, value) => {
  localStorage.setItem(name, value);
};
export const getLocalStorageItem = name => {
  return localStorage.getItem(name);
};
export const deleteLocalStorageItem = name => {
  localStorage.removeItem(name);
};
export const deleteAllLocalStorageItems = () => {
  localStorage.clear();
};
