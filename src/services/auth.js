import { deleteLocalStorageItem, getLocalStorageItem } from './cookieHandling';

export const isAuthenticated = () => {
  const token = getLocalStorageItem('token');
  return token && token.trim().length > 0;
};

export const getLoggedUserData = () => {
  const loggedUserData = getLocalStorageItem('logged_user_data');
  return JSON.parse(loggedUserData);
};

export const logout = () => {
  deleteLocalStorageItem('token');
  deleteLocalStorageItem('refresh_token');
  deleteLocalStorageItem('logged_user_data');
};
