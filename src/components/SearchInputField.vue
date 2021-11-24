<template>
  <v-text-field
    outlined
    color="primary"
    hide-details="true"
    :label="label"
    :value="value"
    :placeholder="placeholder"
    @input="handleInput($event)"></v-text-field>
</template>

<script>
export default {
  name: "SearchInputField",

  props: {
    value: String,
    label: String,
    placeholder: String,
  },

  methods: {
    handleInput(input) {
      this.$emit('input', input);
    }
  }
}
</script>

<style scoped>

</style>