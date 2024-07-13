const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};


export const setUUid = (uuid) => {
  return saveToLocalStorage('uuid', uuid);
};

export const getUUid = () => {
  return getFromLocalStorage('uuid');
};

export const setToken = (token) => {
  return saveToLocalStorage('token', token);
};

export const getToken = () => {
  return getFromLocalStorage('token');
};