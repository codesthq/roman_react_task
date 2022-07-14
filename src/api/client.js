import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://dog.ceo/api"
});

export default apiClient;
