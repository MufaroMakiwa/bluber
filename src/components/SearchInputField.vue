<template>
  <input
    class="input"
    :value="value"
    :placeholder="placeholder"
    type="text"
    autocomplete="off"
    @input="$emit('input', $event.target.value)"/>
</template>

<script>
export default {
  name: "SearchInputField",

  props: {
    value: String,
    placeholder: String
  }
}
</script>

<style scoped>
.input {
  flex-grow: 1;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 1rem;
}
</style>