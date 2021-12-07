<template>
  <div class="cell-wrapper">
    <span class="cell-header">{{ header }}</span>
    <div class="cell-body">
      <div class="cell-info">{{ info }}</div>
      <div class="cell-video">
        <youtube video-id="Aforhf_LpgU"></youtube>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCell",
  props: {
    header: String,
    info: String,
    imageUrls: Array,
    cellName: String,
  },
  data() {
    return {};
  },

  computed: {
    isAbout: function () {
      return this.cellName === "about";
    },
    isLocator: function () {
      return this.cellName === "locator";
    },
  },
};
</script>

<style scoped>
.cell-header {
  font-size: 36px;
  font-weight: bold;
  color: #ff77bc;
}

.cell-wrapper {
  text-align: center;
}

.cell-body {
  /* margin-top: 16px; */
  color: #8b4000;
}

.cell-video {
  margin-top: 16px;
}

.step-header {
  color: #813f0b;
  font-size: 18px;
  font-weight: bold;
}
.content {
  margin-top: 8px;
  overflow-y: scroll;
}
</style>