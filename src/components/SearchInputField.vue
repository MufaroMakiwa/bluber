<template>
  <v-text-field
    outlined
    clearable
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
      const emitValue = input === null ? '' : input;
      this.$emit('input', emitValue);
    }
  }
}
</script>

<style scoped>

</style>