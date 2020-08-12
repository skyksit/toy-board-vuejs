import axios from './axios';
import authHeader from './auth.header';

class UserService {
  update(user) {
    return axios
      .patch(`/api/user/${user.id}`, {
        headers: authHeader(),
        user: {
          id: user.id,
          password: user.password
        }
      })
      .then(res => {
        return res.data;
      });
  }
}

export default new UserService();