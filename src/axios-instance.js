import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/web/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'Accept': 'application/json'
    }
  });
  export default instance;