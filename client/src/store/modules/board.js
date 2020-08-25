// initial state
const state = {
  boards: [],
  posts: []
}

// getters
const getters = {
  getBoardList: state => state.boards,
  getPostList: state => state.posts
}

// actions
const actions = {
}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}