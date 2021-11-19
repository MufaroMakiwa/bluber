<template>
  <div class="marker">
    <div class="header">
      <button v-if="!isFirst" type="button"  class="prev">Prev</button>
      <span class="header-label">Marker</span>
      <button v-if="!isLast" type="button"  class="next">Next</button>
    </div>
    <div class="pagination">
       {{currentMarkIndex+1}}/ {{marks.length+1}}
    </div>
    <div class="inputs">
      <div class="intersection">
        <input
          type="radio"
          name="network"
          value="intersection"
          v-on:change="onChange"
        />
        <label>Intersection</label>
      </div>
      <div class="path">
        <input
          type="radio"
          name="network"
          value="path"
           v-on:change="onChange"
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
        <button type="button" v-on:click="addTag(1)" :class="blockedClass">Blocked</button>
        <button type="button" v-on:click="addTag(2)"  :class="busyClass">Busy</button>
        <button type="button" v-on:click="addTag(3)"  :class="nsClass">Not safe</button>
      </div>
    </div>
    <div class="footer">
      <button type="button" v-on:click="addMark" class="add">Add</button>
      <button type="button" class="post">Post All Marks</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "Marking",

  data() {
    return {
      currentMarkIndex: 0,
      marks: [],
      currentMark: {
        caption: "",
        roadOption: "intersection",
        tag: "",
        startCoord: 0.00,
        endCoord: 0.00,
      },
      blockedClass: "",
      busyClass: "",
      nsClass: ""
    };
  },

  computed:{
    isLast: function (){
      return this.currentMarkIndex === this.marks.length
    },
    isFirst: function (){
      return this.currentMarkIndex === 0;
    }
  },
  methods: {
    /**
     * handles intersection/path changes
     */
    onChange(e) {
      this.currentMark.roadOption = e.target.value;
      eventBus.$emit("changeRoadOption", this.roadOption);
      // console.log(this.currentMark)
    },

    /**
     * adds a mark to the ui
     */
    addMark() {
      if (!this.checkAllFields()){
        window.alert("Please fill all fields")
        return 
      }
      this.marks.push(this.currentMark);
      this.currentMarkIndex+=1
      this.currentMark = {
        caption: "",
        roadOption: "intersection",
        tag: "",
        startCoord: "",
        endCoord: "",
      };
    },
    /**
     * checks all fields before posting a mark
     */
    checkAllFields(){
      if (this.currentMark.caption===""){
        return false
      }if (this.currentMark.tag===""){
          return false
      }
      if (this.currentMark.startCoord===0){
          return false
      }

      return true;
    },
    /**
     * posts all marks
     */
    postAllMarks() {},

    // /**
    //  *
    //  *
    //  */
    addTag(num) {
      // console.log(num)
      if (num === 1) {
        this.currentMark.tag = "blocked";
        this.blockedClass ="tagged"
        this.busyClass =""
        this.nsClass =""
      }
      else if (num === 2) {
        this.currentMark.tag = "busy";
        this.blockedClass =""
        this.busyClass ="tagged"
        this.nsClass =""
      } else if (num === 3) {
        this.currentMark.tag = "not safe";
        this.blockedClass =""
        this.busyClass =""
        this.nsClass ="tagged"
      }
    },
    // /**
    //  *
    //  */
    // editMark() {},
    // /**
    //  *
    //  */
    goToPrev() {
      this.currentMarkIndex -= 1;
      this.currentMark = this.marks[this.currentMarkIndex];
    },
    // /**
    //  *
    //  */
    goToNext() {
      this.currentMarkIndex += 1;
      this.currentMark = this.marks[this.currentMarkIndex];
    },
  },
};
</script>

<style scoped>

   .marker
   {
     font-family: sans-serif;
     width: 350px;
     border-radius: 6px;
     background: white;
     padding: 16px;
     position: absolute;
     right: 2vw;
     top: 2vw;
   }

    .prev
    {
      position: absolute;
      top: 2vw;
      left:32px;

    }
    .next
    {
      position: absolute;
      top: 2vw;
      right: 32px;
    }
    .header
    {
      margin: 8px;
      text-align: center;
      font-size: 24px;
      color: #1DA1F2;
    } 

    .tagged
    {
      background-color: #000;
      color: #fff;
    }

    .inputs
    {
      display: flex;
      margin-top: 16px;
    }
    .body
    {
      margin-top: 16px;
    }

    .tags
    {
      margin-top: 16px;
    }

    .footer
    {
      margin-top: 16px;
    }
    
    .coord-label
    {
      margin-right: 8px;
    }

    .coord
    {
      margin-top: 8px;
    }
</style>