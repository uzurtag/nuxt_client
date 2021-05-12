import {
  GET_TODOS,
  ADD_TODO,
  CHANGE_STATUS,
  REMOVE_TODO,
  UPDATE_TODO,
} from '../queries/queries'

export const state = () => ({
  todos: [],
  newTodo: {},
})

export const mutations = {
  SET_DATA(state, data) {
    state.todos = data
  },
  ADD_TODO(state, data) {
    state.todos.push(data)
  },
  UPDATE_TODO(state, data) {
    const card = state.todos.filter((item) => item.id === data.id)
    card[0].title = data.title
    card[0].description = data.description
    card[0].date = data.date
  },
  CHANGE_STATUS(state, { data, key }) {
    data.status = key
  },
  REMOVE_TODO(state, data) {
    const card = state.todos.filter((item) => item.id === data.id)
    const todos = state.todos
    todos.splice(todos.indexOf(card[0]), 1)
  },
}

export const actions = {
  async callData({ commit }) {
    const response = await this.app.apolloProvider.defaultClient.query({
      query: GET_TODOS,
    })
    await commit('SET_DATA', response.data.todos)
  },

  async addTodo({ commit }, data) {
    const response = await this.app.apolloProvider.defaultClient.mutate({
      mutation: ADD_TODO,
      variables: {
        title: data.title,
        description: data.description,
        status: data.status,
        date: data.date,
      },
    })
    await commit('ADD_TODO', response.data.addTodo)
  },

  // NEED DEVELOP UPDATE SOLUTION FOR TODO see after
  async updateTodo({ commit }, data) {
    const response = await this.app.apolloProvider.defaultClient.mutate({
      mutation: UPDATE_TODO,
      variables: {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        date: data.date,
      },
    })
    await commit('UPDATE_TODO', response.data.updateTodo)
  },

  async changeStatus({ commit, state }, { value, key }) {
    const item = value.filter((item) => item.status !== key)
    if (item[0]) {
      const data = item[0]
      await commit('CHANGE_STATUS', { data, key })

      await this.app.apolloProvider.defaultClient.mutate({
        mutation: CHANGE_STATUS,
        variables: {
          id: data.id,
          status: key,
        },
      })
    }
  },

  async removeTodo({ commit }, value) {
    const response = await this.app.apolloProvider.defaultClient.mutate({
      mutation: REMOVE_TODO,
      variables: {
        id: value,
      },
    })
    await commit('REMOVE_TODO', response.data.deleteTodo)
  },
}

export const getters = {
  getTodosByStatus: (state) => (status) => {
    return state.todos.filter((items) => items.status === status)
  },
}
