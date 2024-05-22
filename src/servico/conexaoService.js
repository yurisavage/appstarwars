import axios from "axios";

const apiUrl = 'https://swapi.py4e.com/api/';

const api = axios.create({
    baseURL: apiUrl
});

export default api;