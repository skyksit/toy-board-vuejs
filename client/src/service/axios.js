import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_APIURI;

export default axios;