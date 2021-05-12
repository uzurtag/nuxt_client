<template>
  <div class="form">
    <div class="form-header">
      <h2>{{ title }} card</h2>
    </div>
    <form class="sign-up" @submit.prevent="submitForm">
      <label for="title">Title:</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        placeholder="Card name..."
      />
      <label for="description">Description:</label>
      <textarea
        id="description"
        v-model="form.description"
        name="desription"
        rows="5"
        cols="34"
      ></textarea>
      <label for="date">Date:</label>
      <date-picker
        id="date"
        v-model="form.date"
        type="datetime"
        placeholder="Select datetime"
        :show-time-panel="showTimePanel"
        @close="handleOpenChange"
      >
        <template #footer>
          <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
            {{ showTimePanel ? 'select date' : 'select time' }}
          </button>
        </template>
      </date-picker>
      <div class="form-buttons">
        <button class="btn btn-danger" @click="$emit('close')">Close</button>
        <button type="submit" class="btn btn-primary">{{ title }}</button>
      </div>
    </form>
  </div>
</template>
<script>
import datePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: {
    datePicker,
  },
  props: {
    title: { type: String, default: '' },
    formData: { type: Object, default: () => {} },
  },
  data() {
    let form = {
      id: '',
      title: '',
      description: '',
      status: 'todo',
      date: new Date(),
    }

    if (this.formData !== undefined) {
      form = {
        id: this.formData.id,
        title: this.formData.title,
        description: this.formData.description,
        status: this.formData.status,
        date: new Date(this.formData.date),
      }
    }

    return {
      form,
      showTimePanel: false,
    }
  },
  methods: {
    submitForm() {
      this.$emit('submitForm', this.form)
    },
    toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel
    },
    handleOpenChange() {
      this.showTimePanel = false
    },
  },
}
</script>

<style scoped>
.form-header {
  display: flex;
  justify-content: center;
  padding-top: 4px;
}
.form {
  display: block;
  width: 300px;
  height: 420px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #f0f0f0;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  padding: 0 10px;
}
.form-control {
  width: 400px;
}
button {
  margin-top: 10px;
}

.form-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.form-buttons button {
  margin-right: 3px;
  margin-bottom: 10px;
}

input[type='text'],
select {
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
label {
  margin-top: 10px;
}
textarea {
  padding: 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
}
</style>
