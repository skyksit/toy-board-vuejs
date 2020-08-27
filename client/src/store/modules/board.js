import { getStore, setStore } from '../../utils';
import { getBoardList } from '../../api/board';

const initBoardList = getStore('boardList');

// initial state
const state = initBoardList
? { boardList: initBoardList, posts: [] }
: { boardList: [], posts: [] }

// getters
const getters = {
  getBoardList: state => state.boardList,
  getPostList: state => state.posts
}

// actions
const actions = {
  setBoardList({ commit }) {
    return getBoardList().then(
      response => {
        const { data } = response;
        commit('SET_BOARDLIST', data)
        setStore('boardList', data);
        return Promise.resolve(data);
      },
      error => {
        const { data } = error.response;
        return Promise.reject(data);
      }
    );
    
  }
}

// mutations
const mutations = {
  SET_BOARDLIST: (state, boardList) => {
    state.boardList = boardList;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}