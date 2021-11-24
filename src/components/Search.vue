<template>
  <div class="search-container shadow">
    <div class="search-outer">
      <div class="search-inner">
        <span class="search-greeting">
          Hello, Mufaro
        </span>

        <h2 class="search-heading">
          {{ heading }}
        </h2>

        <div class="input-container start">
          <SearchInputField 
            v-model="start"
            :label="startLabel"
            :placeholder="placeholder"/>
          <v-btn
            icon
            color="primary"
            class="side-icon"
            @click="setSearchType">
            <font-awesome-icon 
              :icon="searchType === 'path' ? 'minus' : 'plus'" 
              class="button-icon"/>
          </v-btn>
        </div>

        <div class="input-container end" v-if="searchType === 'path'">
          <SearchInputField 
            v-model="end"
            :label="endLabel"
            :placeholder="placeholder"/>

          <v-btn
            icon
            :disabled="isSwitchButtonDisabled"
            color="primary"
            class="side-icon fa-rotate-90"
            @click="switchStartEnd">
            <font-awesome-icon icon="exchange-alt" class="button-icon"/>
          </v-btn>
        </div>

        <div class="suggestions">
          
        </div>
      </div>
      <div class="submit-container">
        <v-btn
          depressed
          rounded
          color="primary"
          class="submit-button font-weight-bold"
          @click="handleSubmit"> 
          {{ mode }}
        </v-btn>
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

  props: {
    mode: {
      default: "Add Mark",
      type: String
    }
  },

  computed: {
    heading() {
      return this.mode === "Plan Trip" 
              ? "Where are you going?"
              : "Where do you want to mark?"
    },

    startLabel() {
      const directive = this.searchType === "intersection" ? "intersection" : "start";
      return `Enter ${directive} point, or click on the map`;
    },

    endLabel() {
      return "Enter end point";
    },

    isSwitchButtonDisabled() {
      return this.start.trim() === "" && this.end.trim() === "";
    }
  },

  data() {
    return {
      placeholder: "e.g 189 Vassar Street",
      start: "",
      end: "",
      searchType: "intersection"
    }
  },

  methods: {
    setSearchType() {
      this.searchType === "intersection" 
        ? (this.searchType = "path")
        : (this.searchType = "intersection");
    },

    switchStartEnd() {
      const previousStart = this.start;
      this.start = this.end;
      this.end = previousStart;
    },

    handleSubmit() {
      alert('To hanlde submit');
    }
  }
}
</script>

<style scoped>
.search-container {
  top: 1rem;
  right: 1rem;
  bottom: 1rem;
  background-color: white;
  width: 450px;
}

.search-outer {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;
}

.submit-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  height: 80px;
  border-top: 1px solid rgba(0, 0, 0, 0.20);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.20);
}

.submit-button {
  width: 100%;
  height: 100% !important;
}

.search-inner {
  width: 100%;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: scroll;
  margin-bottom: 80px;
}

.search-greeting {
  width: 100%;
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

.side-icon {
  margin-left: 1rem;
}

.button-icon {
  font-size: 1.1rem;
}

.suggestions {
  display: flex;
  flex-direction: column;
}
</style>