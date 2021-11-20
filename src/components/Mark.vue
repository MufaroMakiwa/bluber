<template>
  <button :class="postClass" v-on:click="displayPath">
    <div class="header">
      <div class="caption">
        {{ caption }}
      </div>

      <div class="time">
        {{ time }}
      </div>
    </div>

    <div class="body">
      <div v-bind:key="tag" v-for="tag in tags" class="tag">
        {{ tag }}
      </div>
      <div class="author">
        {{ userId }}
      </div>
    </div>

    <div class="footer">
      <div class="comment-section">
        <div class="comment-icon">
          <font-awesome-icon icon="comment" />
        </div>

        <div class="comment-count tooltip">
          <span>
            {{ commentCount }}
          </span>
        </div>

        <div>
          <button class="comment">comment</button>
        </div>
      </div>

      <div class="rate tooltip">
        <font-awesome-icon
          v-for="index in 5"
          :key="index"
          class="star"
          icon="star"
          :class="{ starStatus: index + 1 <= rating }"
          @click="rateMark(index + 1)"
        />
        <span class="tooltiptext">rate</span>
      </div>
    </div>
  </button>
</template>

<script>

import {eventBus} from "../main"

export default {
  name: "Mark",
  props: ["markId","caption", "tags", "time", "userId","path"],

  data() {
    return {
      commentCount: 0,
      stars: [1, 2, 3, 4, 5],
      rating: 0,
      postClass: "post"
    };
  },

  methods: {
    rateMark(rating) {
      this.rating = rating;
    },
    displayPath(){
      if (this.postClass==="post"){
        this.postClass = "post select"
        eventBus.$emit("render-path",this.path,this.markId)
      }else
      {
        this.postClass = "post"
        eventBus.$emit("deRender-path",this.markId)
      }
      
      
    }
  },
};
</script>

<style scoped>

.select
{
  background-color:#6DD978 !important;
}

.comment-section {
  display: flex;
}

.comment-count {
  border: none;
  margin-right: 10px;
}

.comment {
  background: #1da1f2;
  border: none;
  margin-right: 10px;

}

.comment-icon {
  margin-right: 10px;
}

.body {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.post {
  font-family: sans-serif;
  padding: 16px 16px 8px 16px;
  margin: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: 350px;
  border: 2px solid #242222c4;
  background-color: #a7a2a2c4;
  border: 1px solid #8590aa;
  outline: none;
  cursor: pointer;
}

.caption {
  text-align: start;
  margin: 8px;
  font-size: 18px;
  font-weight: lighter;
  word-wrap: break-word;
}

.header {
  display: flex;
  justify-content: space-between;
}

.user {
  display: flex;
  align-items: center;
}

.author {
  font-size: 17px;
  cursor: pointer;
}

.tag {
  font-size: 17px;
  font-weight: bold;
  margin: 10px;
}

.time {
  flex-wrap: wrap;
  cursor: pointer;
  font-weight: light;
  font-size: 15px;
}

.star {
  cursor: pointer;
}

.footer {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 60px;
  opacity: 0.9;
  color: black;
  text-align: center;
  margin-left: 10px;

  /* Position the tooltip */
  position: absolute;
  z-index: 9;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.star:hover {
  color: gold;
}

.starStatus {
  color: gold;
}
</style>