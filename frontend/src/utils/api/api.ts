import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // Atualize para a URL do seu back-end
});

export default api;
