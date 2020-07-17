import api from '../service';

export default {
  async login (store, user) {
    let loginResponse = await api.login(user);
    console.log(`${loginResponse}`);
    return loginResponse;
  },
  async register (store, user) {
    return await api.register(user);
  },
  async caniUseId (store, userid) {
    let caniUseIdResponse = await api.caniUseId(userid);
    return caniUseIdResponse.use_id;
  }
}