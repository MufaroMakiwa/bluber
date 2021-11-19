<template>
  <div class="marker">
    <div class="header">
      <button type="button" v-on:click="goToPrev" class="prev">Prev</button>
      <span class="header-label">Marker</span>
      <button type="button" v-on:click="goToNext" class="next">Next</button>
    </div>
    <div class="inputs">
      <div class="intersection">
        <input
          type="radio"
          v-on:change="onChange"
          name="network"
          value="intersection"
        />
        <label>Intersection</label>
      </div>
      <div class="path">
        <input
          type="radio"
          v-on:change="onChange"
          name="network"
          value="path"
        />
        <label>Path</label>
      </div>
    </div>
    <div class="body">
      <div class="caption">
        <textarea v-model="currentMark.caption" placeholder="Caption..." />
      </div>
      <div class="coords">
        <div class="coord">
          <label class="coord-label">Start Coord</label>
          <span class="start-coord">{{currentMark.startCoord}}</span>
        </div>
        <div class="coord">
          <label class="coord-label">End Coord</label>
          <span class="end-coord">{{currentMark.endCoord}}</span>
        </div>
      </div>
      <div class="tags">
        <button type="button" v-on:click="addTag(1)" class="blocked">
          Blocked
        </button>
        <button type="button" v-on:click="addTag(2)" class="busy">Busy</button>
        <button type="button" v-on:click="addTag(3)" class="notsafe">
          Not safe
        </button>
      </div>
    </div>
    <div class="footer">
      <button type="button" class="add">Add</button>
      <button type="button" class="post">Post All Marks</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "Marker",

  data() {
    return {
      currentMarkIndex: 0,
      marks: [],
      currentMark: {
        caption: "",
        roadOption: "intersection",
        tag: "",
        startCoord: "",
        endCoord: "",
      },
    };
  },
  methods: {
    /**
     * handles intersection/path changes
     */
    onChange(e) {
      this.currentMark.roadOption = e.target.value;
      eventBus.$emit("changeRoadOption", this.roadOption);
    },

    /**
     * adds a mark to the ui
     */
    addMark() {
      this.marks.push(this.currentMark);
      this.currentMark = {
        caption: "",
        roadOption: "intersection",
        tag: "",
        startCoord: "",
        endCoord: "",
      };
    },

    /**
     * posts all marks
     */
    postAllMarks() {},

    /**
     *
     *
     */
    addTag(num) {
      if (num === 1) {
        this.currentMark.tag = "blocked";
      }
      if (num === 2) {
        this.currentMark.tag = "busy";
      } else {
        this.currentMark.tag = "not safe";
      }
    },
    /**
     *
     */
    editMark() {},
    /**
     *
     */
    goToPrev() {
      this.currentMarkIndex -= 1;
      this.currentMark = this.marks[this.currentMarkIndex];
    },
    /**
     *
     */
    goToNext() {
      this.currentMarkIndex += 1;
      this.currentMark = this.marks[this.currentMarkIndex];
    },
  },
};
</script>

<style scoped>
</style>