import axios from 'axios';

export const myHttp = axios.create({
  baseURL: 'https://backend-loft-taxi.glitch.me'
});
