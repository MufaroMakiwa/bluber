<template>
  <div class="marker">
    <div class="header">
      <span class="header-label">Marker</span>
    </div>

    <div class="body">
      <div class="caption">
        <textarea class="text-area" v-model="currentMark.caption" placeholder="Caption..." />
      </div>
      <div class="coords">
        <div class="coord">
          <label class="coord-label">Start Coord</label>
          <input class="start-coord" :value="currentMark.start[0]" readonly>
          <input class="start-coord" :value="currentMark.start[1]" readonly>
        </div>
        <div class="coord">
          <label class="coord-label">End Coord</label>
          <input class="end-coord" :value="currentMark.end[0]" readonly>
          <input class="end-coord" :value="currentMark.end[1]" readonly>
        </div>
      </div>
      <div class="tags">
        <button type="button" v-on:click="addTag(1)" :class="blockedClass">
          Blocked
        </button>
        <button type="button" v-on:click="addTag(2)" :class="busyClass">
          Busy
        </button>
        <button type="button" v-on:click="addTag(3)" :class="nsClass">
          Not safe
        </button>
      </div>
    </div>
    <div class="footer">
      <button type="button" v-on:click="postAllMarks" class="post">Post</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";

import axios from "axios";

export default {
  name: "Marking",

  data() {
    return {
      currentMarkIndex: 0,
      marks: [],
      currentMark: {
        caption: "",
        roadOption: "path",
        tags: [],
        start: [],
        end: [],
        path: [],
      },
      blockedClass: "",
      busyClass: "",
      nsClass: "",
    };
  },
  beforeCreate() {
    eventBus.$on("path", (path) => {
      this.currentMark["path"] = path;
      this.currentMark["start"] = path[0];
      this.currentMark["end"] = path[path.length - 1];
    });
  },
  computed: {
    isLast: function () {
      return this.currentMarkIndex === this.marks.length;
    },
    isFirst: function () {
      return this.currentMarkIndex === 0;
    },
  },

  methods: {
    /**
     * handles intersection/path changes
     */
    onChange(e) {
      this.currentMark["roadOption"] = e.target.value;
      eventBus.$emit("change", this.currentMark["roadOption"]);
    },

    /**
     * adds a mark to the ui
     */
    addMark() {
      if (!this.checkAllFields()) {
        window.alert("Please fill all fields");
        return;
      }
      this.marks.push(this.currentMark);
      this.currentMarkIndex += 1;
      this.currentMark = {
        caption: "",
        roadOption: "path",
        tags: [],
        path: [],
        start: [],
        end: [],
      };
    },
    /**
     * checks all fields before posting a mark
     */
    checkAllFields() {
     
      if (this.currentMark.caption === "") {
        window.alert("Please insert a caption");
        return false;
      }
      if (this.currentMark.tags.length === 0) {
        window.alert("Please insert a tag");
        return false;
      }
      if (this.currentMark.start.length === 0) {
        window.alert("Please insert a start coord");
        return false;
      }
      return true;
    },
    /**
     * posts all marks
     */
    postAllMarks() {
        axios
          .get("/api/user")
          .then(() => console.log("hello"))
          .catch((err) => {
            console.log(err);
          });
      // if (!this.checkAllFields()) {
      //   return;
      // }
      // this.marks.push(this.currentMark);
      // this.marks.forEach((mark) => {
      //   axios
      //     .post("/api/mark", mark)
      //     .then((mark) => eventBus.$emit("addVector", mark.markId, mark.path))
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // });

      // this.marks = [];
      // this.currentMark = {
      //   caption: "",
      //   roadOption: "path",
      //   tags: [],
      //   path: [],
      //   start: [],
      //   end: [],
      // };
      // window.alert("Marks successfully posted");
      // eventBus.$emit("clearMarks");
      // this.blockedClass = "";
      // this.busyClass = "";
      // this.nsClass = "";
    },
    // /**
    //  *
    //  *
    //  */
    addTag(num) {
      // console.log(num)
      if (num === 1) {
        this.currentMark.tags = ["blocked"];
        this.blockedClass = "tagged";
        this.busyClass = "";
        this.nsClass = "";
      } else if (num === 2) {
        this.currentMark.tags = ["busy"];
        this.blockedClass = "";
        this.busyClass = "tagged";
        this.nsClass = "";
      } else if (num === 3) {
        this.currentMark.tags = ["not safe"];
        this.blockedClass = "";
        this.busyClass = "";
        this.nsClass = "tagged";
      }
    },

    doNothing() {},
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
.marker {
  font-family: sans-serif;
  width: 350px;
  border-radius: 6px;
  background: white;
  padding: 16px;
  position: absolute;
  right: 2vw;
  top: 2vw;
}

.prev {
  position: absolute;
  top: 2vw;
  left: 32px;
}
.next {
  position: absolute;
  top: 2vw;
  right: 32px;
}
.header {
  margin: 8px;
  text-align: center;
  font-size: 24px;
  color: #1da1f2;
}

.tagged {
  background-color: #000;
  color: #fff;
}

.inputs {
  display: flex;
  margin-top: 16px;
}
.body {
  margin-top: 16px;
}

.tags {
  margin-top: 16px;
}

.footer {
  margin-top: 16px;
}

.coord-label {
  margin-right: 8px;
}

.coord {
  margin-top: 8px;
}

.text-area {
  width: 300px;
  height: 80px;
  font-family: sans-serif;
  margin: 8px 16px;
  font-weight: 200;
  font-size: 16px;
  position: relative;
  border-radius: 3px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
  outline: 0;
  padding: 8px 6px;
  /*https://gist.github.com/nrrrdcore/3309046
  /* https://stackoverflow.com/questions/16156594/how-to-change-border-color-of-textarea-on-focus */
  outline-color: #719ece;
}

</style>