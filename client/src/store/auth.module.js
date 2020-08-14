import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

const localUser = JSON.parse(localStorage.getItem('user'));
const accessToken = JSON.parse(localStorage.getItem('accessToken'));
const initialState = localUser
  ? { user: localUser, accessToken: accessToken, loggedIn: true }
  : { user: null, accessToken: null, loggedIn: false };

export const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    getUser: state => state.user,
    getLoggedin: state => state.loggedIn,
    getAccessToken: state => state.accessToken
  },
  actions: {
    login ({ commit }, user) {
      return AuthService.login(user).then(
        response => {
          console.log(`response=${JSON.stringify(response)}`);
          commit('loginSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          console.log(`error.response=${JSON.stringify(error.response)}`);
          commit('loginFailure');
          return Promise.reject(error.response);
        }
      );
    },
    logout ({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error.response);
        }
      );
    },
    caniUseId(_, userid) {
      return AuthService.caniUseId(userid).then(
        response => {
          return Promise.resolve(response.use_id);
        },
        error => {
          return Promise.reject(error.response);
        }
      );
    },
    update({ commit }, user) {
      return UserService.update(user).then(
        response => {
          commit('updateSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error.response);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, response) {
      state.loggedIn = true;
      state.user = JSON.parse(`{ "id": "${response.id}", "name": "${response.name}" }`);
      state.accessToken = response.accessToken;
    },
    loginFailure(state) {
      state.loggedIn = false;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
      state.accessToken = null;
    },
    registerSuccess(state) {
      state.loggedIn = false;
    },
    registerFailure(state) {
      state.loggedIn = false;
    },
    updateSuccess(state, response) {
      state.accessToken = response.accessToken;
    }
  }
};