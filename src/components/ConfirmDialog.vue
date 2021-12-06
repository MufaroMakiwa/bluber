<template>
  <PageModalTemplate 
    :display="dialog"
    :clickToDismiss="true"
    @dismiss-dialog="dialog=false">
    <div class="confirm-container">
      <h3>{{ title }}</h3>

      <span>{{ summary }}</span>

      <div class="buttons-container">
        <v-btn
          class="action"
          color="red"
          depressed
          rounded
          @click="agree">
          {{ actionButtonLabel }}
        </v-btn>

        <v-btn 
          class="cancel" 
          color="grey"
          outlined
          rounded
          @click="dialog=false">
          Cancel
        </v-btn>
      </div>
    </div>
  </PageModalTemplate>
</template>

<script>
import PageModalTemplate from "./PageModalTemplate"


export default {
  name: "ConfirmDialog",

  components: {
    PageModalTemplate
  },

  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      title: "",
      summary: "",
      actionButtonLabel: "",
    }
  },

  methods: {
    cancel() {
      this.dialog = false;
      this.resolve(false);
    },

    agree() {
      this.dialog = false;
      this.resolve(true);
    },

    open(title, summary, actionButtonLabel) {
      this.dialog = true;
      this.title = title;
      this.summary = summary;
      this.actionButtonLabel = actionButtonLabel;

      return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
    }
  }
}
</script>

<style scoped>
.confirm-container {
  display: flex;
  width: 320px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
}

.confirm-container > * {
  width: 100%;
}

.confirm-container span {
  color: gray;
  width: 100%;
  margin-top: 1rem;
  word-break: normal;
}

.buttons-container {
  display: grid;
  margin-top: 1.5rem;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
}

.action {
  color: white !important;
}
</style>