import * as types from './mutationType';

export default {
  [types.USER] (state, user) {
    state.user = user;
  },
  [types.ERROR_MSG] (state, errorMsg) {
    state.errorMsg = errorMsg;
  },
  [types.LOGGEDIN] (state, loggedin) {
    state.loggedin = loggedin;
  },
  [types.ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken;
  }
}