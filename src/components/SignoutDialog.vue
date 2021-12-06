<template>
  <v-dialog
    overlay-opacity="0.6"
    :width="400"
    v-model="dialog">
    <div class="confirm-container">
      <h3>Sign out of Bluber? </h3>

      <span>You can always sign in any time to add more marks and update your existing ones.</span>

      <div class="buttons-container">
        <v-btn
          color="primary"
          depressed
          rounded
          @click="agree">
          Sign out
        </v-btn>

        <v-btn 
          class="cancel" 
          color="primary"
          outlined
          rounded
          @click="dialog=false">
          Cancel
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "SignoutDialog",

  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
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

    open() {
      this.dialog = true;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.5rem;
  background-color: white;
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
  width: 100%;
}
</style>