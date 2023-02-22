import axios from 'axios';
const axiosClient = axios.create({
    baseURL:'https://transport-springboot.herokuapp.com'

})
export default axiosClient;