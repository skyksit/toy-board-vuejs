import axios from 'axios';
//import VueCookies from 'vue-cookies';

axios.defaults.baseURL = process.env.VUE_APP_APIURI;

export default axios;