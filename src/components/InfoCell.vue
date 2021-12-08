<template>
  <div class="cell-wrapper">
    <span class="cell-header">{{ header }}</span>
    <div class="cell-body">
      <div v-if="!isAbout" class="cell-info">{{ info }}</div>
      <div v-if="isAbout" class="about-info">{{ info }}</div>

      <div v-if="!isAbout" class="cell-video">
        <youtube :video-id="videoUrl"></youtube>
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
    videoUrl: String,
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
  color: #793802;
}

.cell-video {
  margin-top: 24px;
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

.cell-info {
  margin: 12px;
  font-weight: 400;
}

.about-info {
  margin: 64px;
  font-size: 24px;
  font-weight: 800;
}
</style>