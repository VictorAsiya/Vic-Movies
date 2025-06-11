import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vic-movies.onrender.com', 
});

export default API;
