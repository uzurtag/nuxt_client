import { GET_STATUS, ADD_BOARD, REMOVE_BOARD } from '../queries/queries'

export const state = () => ({
  status: [],
})

export const mutations = {
  SET_BOARDS(state, data) {
    state.status = data
  },
  ADD_BOARD(state, data) {
    state.status.push(data)
  },
  REMOVE_BOARD(state, data) {
    const board = state.status.filter((item) => item.id === data.id)
    const status = state.status
    status.splice(status.indexOf(board[0]), 1)
  },
  setLists(state, lists) {
    state.status = lists
  },
}

export const actions = {
  async setStatus({ commit }) {
    const response = await this.app.apolloProvider.defaultClient.query({
      query: GET_STATUS,
    })
    await commit('SET_BOARDS', response.data.status)
  },

  async addBoard({ commit }, data) {
    const response = await this.app.apolloProvider.defaultClient.mutate({
      mutation: ADD_BOARD,
      variables: {
        key: data.key,
        value: data.value,
      },
    })
    commit('ADD_BOARD', response.data.addBoard)
  },

  async removeBoard({ commit }, value) {
    const response = await this.app.apolloProvider.defaultClient.mutate({
      mutation: REMOVE_BOARD,
      variables: {
        id: value,
      },
    })
    await commit('REMOVE_BOARD', response.data.deleteBoard)
  },
}

export const getters = {
  getStatus(state) {
    return state.status
  },
}
