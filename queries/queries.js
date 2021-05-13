import gql from 'graphql-tag'

export const GET_TODOS = gql`
  query {
    todos {
      id
      title
      description
      status
      date
      sync
    }
  }
`
export const ADD_TODO = gql`
  mutation(
    $title: String
    $description: String
    $status: String
    $date: String
    $sync: Boolean
  ) {
    addTodo(
      title: $title
      description: $description
      status: $status
      date: $date
      sync: $sync
    ) {
      id
      title
      description
      status
      date
      sync
    }
  }
`
export const CHANGE_STATUS = gql`
  mutation($id: ID, $status: String) {
    updateTodoStatus(id: $id, status: $status) {
      id
      status
    }
  }
`
export const REMOVE_TODO = gql`
  mutation($id: ID) {
    deleteTodo(id: $id) {
      id
      title
    }
  }
`
export const UPDATE_TODO = gql`
  mutation($id: ID, $title: String, $description: String, $date: String) {
    updateTodo(id: $id, title: $title, description: $description, date: $date) {
      id
      title
      description
      status
      date
    }
  }
`
export const GET_STATUS = gql`
  query {
    status {
      id
      key
      value
    }
  }
`
export const ADD_BOARD = gql`
  mutation($key: String, $value: String) {
    addBoard(key: $key, value: $value) {
      id
      key
      value
    }
  }
`
export const REMOVE_BOARD = gql`
  mutation($id: ID) {
    deleteBoard(id: $id) {
      id
      key
      value
    }
  }
`

export const SYNC_WITH_CALENDAR = gql`
  mutation($id: ID, $sync: Boolean) {
    sync(id: $id, sync: $sync) {
      id
      sync
    }
  }
`
