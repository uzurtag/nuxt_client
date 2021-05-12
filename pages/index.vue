<template>
  <div class="content">
    <div class="header">
      <button class="btn btn-primary" @click="showModalTask">
        Create Task Card
      </button>
      <button class="btn btn-primary" @click="showModalBoard">
        Create Board
      </button>
    </div>
    <div class="page">
      <task-form
        v-if="taskForm"
        :title="nameForm"
        @submitForm="add"
        @close="closeModalTask"
      />
      <board-form
        v-if="boardForm"
        @submitForm="createBoard"
        @close="closeModalBoard"
      />
      <board
        v-for="(value, key, index) in lists"
        :key="index"
        :name="value.key"
        :title="value.value"
        :identity="value.id"
        class="content-block"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskForm from '../components/TaskForm'
import BoardForm from '../components/BoardForm'
import board from '../components/Board'

export default {
  components: {
    TaskForm,
    BoardForm,
    board,
  },
  data() {
    return {
      taskForm: false,
      boardForm: false,
      nameForm: 'Create',
    }
  },
  computed: {
    ...mapGetters({
      getStatus: 'status/getStatus',
    }),
    lists: {
      get() {
        return this.getStatus
      },
      set(value) {
        return this.$store.commit('setLists', value)
      },
    },
  },
  methods: {
    ...mapActions({
      addTodo: 'todo/addTodo',
      addBoard: 'status/addBoard',
    }),
    add(event) {
      this.addTodo(event)
      this.taskForm = false
    },
    createBoard(event) {
      const key = event.value
        .trim()
        .toLowerCase()
        .replace(/([^A-Z0-9]+)(.)/gi, function (match) {
          return arguments[2].toUpperCase()
        })
      event.key = key
      this.addBoard(event)
      this.boardForm = false
    },
    showModalTask() {
      this.taskForm = true
    },
    showModalBoard() {
      this.boardForm = true
    },
    closeModalTask() {
      this.taskForm = false
    },
    closeModalBoard() {
      this.boardForm = false
    },

    updateBlock() {
      window.console.log('here')
    },

    remove(value) {
      window.console.log(value)
    },
  },
}
</script>

<style>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 5vh;
  background-color: rgba(0, 0, 0, 0.32);
  padding: 4px;
}

.page {
  overflow-x: auto;
  min-height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.content-block {
  min-width: 300px;
  max-width: 300px;
  margin: 5px 5px 5px 5px;
  background-color: #ebecf0;
  border-radius: 10px;
}

::-webkit-scrollbar {
  height: 8px;
}
</style>
