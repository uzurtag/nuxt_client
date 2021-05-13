<template>
  <div>
    <task-form
      v-if="show"
      :title="nameForm"
      :form-data="formData"
      @submitForm="update"
      @close="closeModal"
    />
    <div class="header-content">
      <div class="title-container">
        <h2>{{ title }}</h2>
      </div>
      <div class="rem-butt">
        <button class="btn btn-danger btn-sm" @click="remBoard(identity)">
          Delete
        </button>
      </div>
    </div>
    <draggable v-model="listGroup" group="people" class="list-cards">
      <div
        v-for="(item, key) in listGroup"
        :key="key"
        :data-id="item.id"
        class="item-card"
      >
        <div class="body-header">
          <h2>{{ item.title }}</h2>
          <b-badge v-if="!item.sync" variant="info" @click="clk(item.id)">
            <i>Add to calendar</i>
          </b-badge>
        </div>
        <p>{{ item.description }}</p>
        <div class="item-footer">
          <div class="date">
            <b-badge variant="info">
              <i>{{ convertTime(item.date) }}</i>
            </b-badge>
          </div>
          <div class="item-buttons">
            <button class="btn btn-primary" @click="edit(item)">Edit</button>
            <button class="btn btn-danger" @click="remove(item.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import moment from 'moment'
import TaskForm from '../components/TaskForm'

export default {
  components: {
    draggable,
    TaskForm,
  },
  props: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    identity: { type: String, default: '' },
  },
  data() {
    return {
      show: false,
      sync: true,
      nameForm: 'Edit',
      formData: {},
    }
  },
  computed: {
    ...mapGetters({
      getTodosByStatus: 'todo/getTodosByStatus',
    }),
    listGroup: {
      get() {
        return this.getTodosByStatus(this.name)
      },
      set(value) {
        this.$store.dispatch('todo/changeStatus', {
          value,
          key: this.name,
        })
      },
    },
  },
  methods: {
    ...mapActions({
      removeItem: 'todo/removeTodo',
      updateItem: 'todo/updateTodo',
      syncItem: 'todo/syncWithCalendar',
      removeBoard: 'status/removeBoard',
    }),
    clk(value) {
      this.syncItem(value)
    },
    edit(value) {
      this.show = true
      this.formData = value
    },
    remove(event) {
      this.removeItem(event)
    },
    remBoard(value) {
      this.removeBoard(value)
    },
    closeModal() {
      this.show = false
    },
    update(event) {
      this.updateItem(event)
      this.show = false
    },
    convertTime(value) {
      return moment(value).format('MMM Do YY')
    },
  },
}
</script>

<style>
h2 {
  color: #172b4d;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: 0 0 8px;
}

.header-content {
  display: flex;
  justify-content: space-between;
}

.rem-butt {
  margin: 2px 4px;
  height: 10px;
}

.rem-butt button {
  border-radius: 14px;
  padding: 0px 8px;
}

.body-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.title-container {
  padding: 0 10px;
  padding-top: 3px;
}

.list-cards {
  height: 87vh;
  margin: 0 4px;
  padding: 0 4px;
  margin-bottom: 4px;
  overflow-y: auto;
  overflow-x: hidden;
}

.item-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  margin-bottom: 10px;
  text-align: start;
  padding: 0px 10px;
  padding-top: 4px;
  cursor: pointer;
}

.item-footer {
  display: flex;
  justify-content: space-between;
}

.item-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.item-buttons button {
  margin-right: 3px;
  margin-bottom: 10px;
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-track-piece {
  background: rgba(9, 30, 66, 0.08);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdafaf;
  border-radius: 5px;
}
</style>
