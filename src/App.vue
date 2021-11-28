<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
}
</script>

<style>
* {
 box-sizing: border-box;
}

html {
  --border-radius: 8px;
  --overlay-z-index: 999;
  font: 16px sans-serif;
}

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

input, textarea {
  transition: all 0.3s;
  border: none;
  outline: none;
}

textarea:hover:not(:focus) {
  background-color: var(--input-color-hover);
}

.shadow {
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  border: 1px solid lightgray;
  border-radius: var(--border-radius);
}

.overflow-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.fade-enter-active {
  animation: fade-in .2s linear;
}

.fade-leave-active {
  animation: fade-in .2s linear reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 1rem !important;
}

.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  margin-top: 1.5rem;
  transition: all 0.3s;
  background-color: whitesmoke;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}

.card:first-of-type {
  margin-top: 0;
}


</style>
