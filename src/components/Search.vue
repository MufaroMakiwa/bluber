<template>
  <div class="search-container shadow">
    <div class="search-inner">
      <span class="search-greeting">
        Hello, Mufaro
      </span>

      <h2 class="search-heading">
        Where are you going?
      </h2>

      <div class="input-container start">
        <SearchInputField 
          v-model="start.query"
          :placeholder="start.placeholder"/>
        <div class="side-icon-container">

        </div>
      </div>

      <div class="input-container end">
        <SearchInputField 
          v-model="end.query"
          :placeholder="end.placeholder"/>

        <div class="side-icon-container">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInputField from "./SearchInputField.vue";

export default {
  name: "Search",

  components: {
    SearchInputField
  },

  data() {
    return {
      start: {
        query: "",
        placeholder: "Choose start point, or double click on the map"
      },

      end: {
        query: "",
        placeholder: "Choose end point"
      }
    }
  }
}
</script>

<style scoped>
.search-container {
  top: 1rem;
  right: 1rem;
  background-color: white;
  padding: 1rem;
  max-width: 400px;
  width: 100%;
  bottom: 1rem;
  overflow: scroll;
}

.search-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.search-greeting {

}

.search-heading {
  margin: 1rem 0;
}

.input-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.input-container.end {
  margin-top: 1rem;
}

.side-icon-container {
  
}
</style>