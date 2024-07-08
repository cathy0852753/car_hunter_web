import axios from "axios";


const domaim = "http://0316.gotdns.tw:35000";
const baseUrl = `${domaim}/api`;

export const userLogin = (userID, password) => {
  const url = `${baseUrl}/users/${userID}?p=${password}`;
  return axios.get(url);
};

export const changePassword = (data) => {
  const { p, p1, p2, uuid } = data;
  const url = `${baseUrl}/users/$userId?p=${p}&p1=${p1}&p2=${p2}&uuid=${uuid}`;
  return axios.put(url);
};

export const getUserData = () => {
  const url = `${baseUrl}`;
  return axios.get(url);
};