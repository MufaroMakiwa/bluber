<template>
  <div class="result-item">
    <span class="place-text">{{ text }}</span>
    <span class="place-name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "SearchSuggestion",

  props: {
    text: String,
    name: String
  }
}
</script>

<style scoped>
.result-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  cursor: pointer;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  border-radius: 3px;
  transition: all 0.3s;
}

.result-item:first-of-type {
  margin-top: 0;
}

.place-text {
  color: #74adb6;
  font-weight: bold;
  font-size: 1.15rem;
  text-align: start;
}

.place-name {
  font-weight: bold;
  text-align: start;
}

.result-item:hover {
  background-color: #74adb6;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  transform: scale(1.01);
}

.result-item:hover .place-text {
  color: #ffea00;
}
.result-item:hover .place-name {
  color: #fff;
}
</style>