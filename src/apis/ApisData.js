import axios from "axios";

const urlAuth = `${process.env.REACT_APP_API_KEY_YT}`;
const urlGsheet = `${process.env.REACT_APP_API_KEY_GG}`;
const urlFina = `${process.env.REACT_APP_API_KEY_FG}`;
const urlFinaSend = `${process.env.REACT_APP_API_KEY_FS}`;

export const API_GUDANG = axios.create({
    baseURL: urlAuth,
});

export const API_GSHEET = axios.create({
  baseURL: urlGsheet,
})

export const API_FINA = axios.create({
  baseURL: urlFina,
})

export const API_FINASEND = axios.create({
  baseURL: urlFinaSend,
})