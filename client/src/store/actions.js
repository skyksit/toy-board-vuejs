import api from '../service';
import { USER, ERROR_MSG, LOGGEDIN, ACCESS_TOKEN } from './mutationType';

let loginFailure = ({commit}, data) => {
  commit(USER, null);
  commit(ERROR_MSG, data.message);
  commit(LOGGEDIN, false);
  commit(ACCESS_TOKEN, null);
}

let loginSuccess = ({commit}, data) => {
  commit(USER, data);
  commit(ERROR_MSG, null);
  commit(LOGGEDIN, true);
  commit(ACCESS_TOKEN, data.accessToken);
}

let logoutSuccess = ({commit}) => {
  commit(USER, null);
  commit(ERROR_MSG, null);
  commit(LOGGEDIN, false);
  commit(ACCESS_TOKEN, null);
}

let loginProcess = (store, loginResponse) => {
  console.log(`actions.login.loginResponse = ${JSON.stringify(loginResponse)}`);
  if (loginResponse.name == 'Error') {
    loginFailure(store, loginResponse);
  } else {
    loginSuccess(store, loginResponse);
  }
}

export default {
  async login (store, user) {
    let loginResponse = await api.login(user);
    loginProcess(store, loginResponse);
    return store.getters.getLoggedin;
  },
  async register (store, user) {
    return await api.register(user);
  },
  async caniUseId (store, userid) {
    let caniUseIdResponse = await api.caniUseId(userid);
    return caniUseIdResponse.use_id;
  },
  async logout (store) {
    await api.logout();
    logoutSuccess(store);
  }
}