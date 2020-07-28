import AuthService from './auth.service';

export default {
  async login (user) {
    try {
      return await AuthService.login(user);
    } catch (err) {
      console.error(err);
    }
  },
  async register (user) {
    try {
      return await AuthService.register(user);
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
  },
  async logout() {
    try {
      return await AuthService.logout();
    } catch (err) {
      console.error(err);
    }
  }
}