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
import { eventBus } from '../main';
export default {
  name: "SearchInputField",

  props: {
    value: String,
    label: String,
    placeholder: String,
    type: String,
  },

  methods: {
    handleInput(input) {
      const emitValue = input === null ? '' : input;
      console.log(emitValue,"here")
      eventBus.$emit('input', emitValue,this.type);
    }
  }
}
</script>

<style scoped>

</style>