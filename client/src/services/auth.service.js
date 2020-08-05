import axios from './axios';

class AuthService {
  login(user) {
    return axios
      .post(`/api/users/login`, {
        user: {
          id: user.userid,
          password: user.password
        }
      })
      .then(res => {
        if (res.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(res.data));
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
        }
        return res.data;
      })
      .catch(err => {
        return err;
      });
  }

  logout() {
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  register(user) {
    return axios
      .post(`/api/users`, {
        user: {
          id: user.id,
          name: user.name,
          password: user.password
        }
      })
      .then(res => {
        return res.data;
      });
  }

  caniUseId(userid) {
    return axios
      .get(`/api/id?user_id=${userid}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err
      });
  }
}

export default new AuthService();