<template>
  <div class="form">
    <div class="form-header">
      <h2>Create board</h2>
    </div>
    <form class="sign-up" @submit.prevent="submitForm">
      <label for="title">Title:</label>
      <input
        id="title"
        v-model="form.value"
        type="text"
        placeholder="Title of board..."
      />
      <div class="form-buttons">
        <button class="btn btn-danger" @click="$emit('close')">Close</button>
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        value: '',
      },
    }
  },
  methods: {
    submitForm() {
      this.$emit('submitForm', this.form)
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
  height: 190px;
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
