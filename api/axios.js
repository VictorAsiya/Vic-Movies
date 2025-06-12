import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vic-movies.onrender.com', 
  Credentials: true //New Code
});

export default API;



// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Replace with your deployed backend URL later
// });

// export default API;