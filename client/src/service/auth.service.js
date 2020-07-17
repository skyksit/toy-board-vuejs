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
        console.log(`AuthService.login=${JSON.stringify(res)}`);
        if (res.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios
      .post(`/api/users`, {
        user: {
          id: user.userid,
          name: user.username,
          password: user.password
        }
      })
      .then(res => {
        console.log(`res = ${JSON.stringify(res)}`);
        return res.data;
      });
  }

  caniUseId(userid) {
    return axios
      .get(`/api/id?user_id=${userid}`)
      .then((res) => {
        return res.data;
      });

  }
}

export default new AuthService();