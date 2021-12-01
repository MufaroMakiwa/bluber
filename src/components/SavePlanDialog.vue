<template>
  <PageModalTemplate
    :display="display">
    <div class="save-container">
      <h3 class="save-title">Save this plan</h3>
        <v-text-field
          color="primary"
          label="Plan Name"
          placeholder="e.g Home Route"
          outlined
          clearable
          dense
          class="name-field"
          v-model="name">
      </v-text-field>
     
      <div class="save-buttons-container">
        <v-btn
          rounded
          outlined
          color="primary"
          small
          class="save-button"
          @click="$emit('cancel')">
          Cancel
        </v-btn>

        <v-btn
          rounded
          depressed
          :disabled="buttonDisabled"
          color="primary"
          small
          class="save-button"
          @click="submit">
          Save
        </v-btn>
      </div>
    </div>
  </PageModalTemplate>
</template>

<script>
import PageModalTemplate from "./PageModalTemplate.vue";

export default {
  name: "SavePlanDialog",

  components: {
    PageModalTemplate
  },

  props: {
    display: Boolean
  },

  data() {
    return {
      name: "",
      includeFilters: false
    }
  },

  methods: {
    submit() {
      this.$emit('save-plan', this.name);
      this.name = "";
    }
  },

  computed: {
    buttonDisabled() {
      return this.name === null || this.name.trim().length === 0;
    }
  }
}
</script>

<style scoped>
.save-container {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1.25rem;
  background-color: white;
  border-radius: 8px;
}

.save-container > hr {
  width: 100%;
}

.save-title {
  padding-bottom: 0.5rem;
}

.name-field {
  margin-top: 1rem;
  width: 100%;
}

.save-buttons-container {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.save-button {
  flex-grow: 1;
}

.save-button:first-of-type {
  margin-right: 0.5rem;
}

.save-button:last-of-type {
  margin-left: 0.5rem;
}
</style>