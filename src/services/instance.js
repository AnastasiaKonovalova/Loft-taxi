import axios from 'axios';

export const myHttp = axios.create({
    baseURL: 'https://loft-taxi.glitch.me'
})