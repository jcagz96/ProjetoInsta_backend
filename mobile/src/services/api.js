import axios from 'axios';


const api = axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.1.104:3333',
});

export default api;
