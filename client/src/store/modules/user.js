import { login, register, caniUseId, update } from '../../api/user';
import { getUser, setUser, removeUser, getAccessToken, setAccessToken, removeAccessToken } from '../../utils/auth';

const localUser = getUser();
const accessToken = getAccessToken();
const state = localUser
  ? { user: localUser, accessToken: accessToken, loggedIn: true }
  : { user: null, accessToken: null, loggedIn: false };

const getters = {
  getUser: state => state.user,
  getLoggedIn: state => state.loggedIn,
  getAccessToken: state => state.accessToken
}

const actions = {
  login ({ commit }, user) {
    return login(user).then(
      response => {
        const { data } = response;
        commit('SET_LOGGEDIN', true);
        commit('SET_USER', JSON.parse(`{ "id": "${data.id}", "name": "${data.name}" }`));
        commit('SET_ACCESSTOKEN', data.accessToken);
        setAccessToken(data.accessToken);
        setUser(JSON.stringify({ "id": `${data.id}`, "name": `${data.name}` }));
        return Promise.resolve(data);
      },
      error => {
        commit('SET_LOGGEDIN', false);
        const { data } = error.response;
        return Promise.reject(data);
      }
    );
  },
  logout ({ commit }) {
    commit('SET_LOGGEDIN', false);
    commit('SET_USER', '');
    commit('SET_ACCESSTOKEN', '');
    removeAccessToken();
    removeUser();
  },
  register(_, user) {
    return register(user).then(
      response => {
        const { data } = response;
        return Promise.resolve(data);
      },
      error => {
        const { data } = error.response;
        return Promise.reject(data);
      }
    );
  },
  caniUseId(_, userid) {
    return caniUseId(userid).then(
      response => {
        const { data } = response;
        return Promise.resolve(data.use_id);
      },
      error => {
        const { data } = error.response;
        return Promise.reject(data);
      }
    );
  },
  update({ commit }, user) {
    return update(user).then(
      response => {
        commit('SET_ACCESSTOKEN', response.accessToken);
        setAccessToken(response.accessToken);
        return Promise.resolve(response);
      },
      error => {
        return Promise.reject(error.response);
      }
    );
  }
}

const mutations = {
  SET_LOGGEDIN: (state, loggedIn) => {
    state.loggedIn = loggedIn;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_ACCESSTOKEN: (state, accessToken) => {
    state.accessToken = accessToken;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}