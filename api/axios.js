// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'https://vic-movies.onrender.com', 
//   Credentials: true //New Code
// });

// export default API;



import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vic-movies.onrender.com',
  withCredentials: true,
});

// Automatically attach the token to every request if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;





// Local-Host
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Replace with your deployed backend URL later
// });

// export default API;