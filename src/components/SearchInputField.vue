<template>
  <v-text-field
    :label="label"
    :value="value"
    color="primary"
    outlined
    :placeholder="placeholder"
    hide-details="true"
    @input="$emit('input', $event.target.value)"></v-text-field>
</template>

<script>
export default {
  name: "SearchInputField",

  props: {
    value: String,
    label: String,
    placeholder: String,
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