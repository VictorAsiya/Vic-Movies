import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vic-movies.onrender.com', // Replace with your deployed backend URL later
});

export default API;
