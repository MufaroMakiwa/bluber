<template>
  <div class="mark-description-container">
    <span class="mark-caption">{{ caption }}</span>

    <div class="tags-container">
      <v-btn
        disabled
        rounded
        small
        color="secondary"
        v-for="tag in tags"
        :key="tag"
        class="padded">
        {{ tag }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkDescription",

  props: {
    caption: String,
    tags: Array,
  }
}
</script>

<style scoped>
.mark-description-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
}

.mark-caption {
  word-break: break-all;
}

.tags-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
}

.tags-container .padded {
  margin-top: 0.5rem;
  margin-right: 1rem;
}
</style>