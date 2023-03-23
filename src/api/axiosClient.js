import axios from 'axios';
const axiosClient = axios.create({
    baseURL:'https://transport-springboot.herokuapp.com',
    timeout:150000,
    headers: {
        'Authorization':`Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
    }

})
export default axiosClient;