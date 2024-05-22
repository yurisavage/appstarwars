import axios from "axios";

const apiUrl = 'https://swapi.dev/api/planets';

const apiPlanetas = axios.create({
    baseURL: apiUrl
})

export default apiPlanetas;