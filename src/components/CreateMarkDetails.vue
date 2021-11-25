<template>
  <div class="create-mark-container">
    <div class="create-mark-inner">
      <div class="header-container">
        <v-btn
          icon
          color="gray"
          class="side-icon"
          @click="$emit('back')">
          <font-awesome-icon icon="arrow-left" class="back-icon"/>
        </v-btn>

        <h2 class="section-heading">Create Mark</h2>
      </div>

      <div class="point-container start">
        <span class="point-label">{{ startLabel }}:</span>
        <span class="point-details">{{ start }}</span>
      </div>

      <div class="point-container end" v-if="displayEnd">
        <span class="point-label">End:</span>
        <span class="point-details">{{ end }}</span>
      </div>

      <div class="mark-details">
        <h3>Mark details</h3>

        <v-textarea
          :auto-grow="true"
          outlined
          rows="2"
          row-height="28"
          label="Caption"
          placeholder="e.g Restaurant expanded into street"
          class="caption-input">
        </v-textarea>

        <div class="tags-container">
          <v-btn
            v-for="tag in tags"
            :key="tag"
            depressed
            :color="selectedTags.includes(tag) ? 'secondary' : 'gray'"
            class="tag"
            @click="tagClick(tag)">
            {{ tag }}
            </v-btn>
        </div>
      </div>
    </div>

    <div class="submit-container">
      <v-btn
        depressed
        rounded
        color="primary"
        class="submit-button font-weight-bold"
        @click="handleSubmit"> 
        Add Mark
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateMarkDetails",

  props: {
    start: String,
    end: {
      default: "",
      type: String,
    }
  },

  computed: {
    displayEnd() {
      return this.end.trim() !== "";
    },

    startLabel() {
      return this.displayEnd ? "Start" : "Intersection";
    }
  },

  data() {
    return {
      tags: ["Blocked", "Not Safe", "Busy"],
      selectedTags: []
    }
  },

  methods: {
    handleSubmit() {
      alert("Handle create mark");
    },

    tagClick(tag) {
      const tagIndex = this.selectedTags.indexOf(tag);
      tagIndex > -1 ? this.selectedTags.splice(tagIndex, 1) : this.selectedTags.push(tag);    
    }
  }
}
</script>

<style scoped>
.create-mark-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.create-mark-inner {
  width: 100%;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: scroll;
  margin-bottom: 80px;
}

.header-container {
  display: flex;
  flex-direction: row;
}

.section-heading {
  margin-left: 1rem;
}

.point-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.point-container.start {
  margin-top: 1rem;
}

.point-container.end {
  margin-top: 0.5rem;
}

.point-label {
  width: 100px;
  flex-shrink: 0; 
  font-weight: bold;
}

.point-details {
  flex-grow: 1;
}

.mark-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 2rem
}

.caption-input {
  width: 100%;
  margin-top: 1rem;
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

.tags-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%
}

.tag {
  margin-right: 1rem;
}
</style>