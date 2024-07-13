import axios from "axios";


const domaim = "http://0316.gotdns.tw:35000";
const baseUrl = `${domaim}/api`;

export const userLogin = (uuid, token) => {
  const url = `${baseUrl}/users/${uuid}?auth=${token}`;
  return axios.get(url).then(res => res.data);
};

export const userUnTokenLogin = async (uuid, cell, email, nick) => {
  const url = `${baseUrl}/users/${uuid}?cell=${cell}&nick=${nick}&email=${email}`;
  return axios.post(url).then(res => res.data);
};

export const changePassword = async (data) => {
  const { p, p1, p2, uuid } = data;
  const url = `${baseUrl}/users/$userId?p=${p}&p1=${p1}&p2=${p2}&uuid=${uuid}`;
  return axios.put(url).then(res => res.data);
};

export const getUserData = async (token) => {
  const url = `${baseUrl}/userlists/${token}`;
  return axios.get(url).then(res => res.data);
};

export const getBingoData = async (token) => {
  const url = `${baseUrl}/bingo/${token}/dbf`;
  const config = {
    headers: { 'Content-Disposition': 'attachment; filename="bingo.dbf"' },
    responseType: 'blob',
  };
  return axios.get(url, config).then(res => res);
};

export const uploadFile = async (token, file) => {
  const url = `${baseUrl}/cars/${token}`;
  const config = {
    headers: { 'Content-Type': 'multipart/form-data"' },
  };
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(url, formData, config).then(res => res.data);
};

export const setUserAuth = async (token, uuid, setType) => {
  const url = `${baseUrl}/users/${token}?uuid=${uuid}&auth=${setType}`;
  return axios.put(url).then(res => res.data);
};