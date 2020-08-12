import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

const localUser = JSON.parse(localStorage.getItem('user'));
const initialState = localUser
  ? { user: localUser, loggedIn: true }
  : { user: null, loggedIn: false };

export const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    getUser: state => state.user,
    getLoggedin: state => state.loggedIn,
  },
  actions: {
    login ({ commit }, user) {
      return AuthService.login(user).then(
        response => {
          commit('loginSuccess', response);
          return Promise.resolve(response);
        },
        error => {
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
    loginSuccess(state, user) {
      state.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.loggedIn = false;
    },
    registerFailure(state) {
      state.loggedIn = false;
    },
    updateSuccess(state, user) {
      state.user = user;
    }
  }
};