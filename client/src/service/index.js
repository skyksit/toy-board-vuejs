import AuthService from './auth.service';

export default {
  async login (user) {
    try {
      const loginResponse = await AuthService.login(user);
      console.log(`${loginResponse}`);
      return loginResponse;
    } catch (err) {
      console.error(err);
    }
  },
  async register (user) {
    try {
      let response = await AuthService.register(user);
      console.log(`register = ${JSON.stringify(response)}`);
      return response;
    } catch (err) {
      console.error(err);
    }
  },
  async caniUseId(userid) {
    try {
      return await AuthService.caniUseId(userid);
    } catch (err) {
      console.error(err);
    }
  }
}