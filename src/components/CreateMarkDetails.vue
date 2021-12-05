<template>
  <div class="create-mark-container">
    <ViewTemplate :backButton="true" @back="$emit('back')" class="create-inner">
      <template v-slot:heading> Create Mark </template>

      <template v-slot:content>
        <MarkPoints 
          :dense="false"
          class="mark-points"
          :startName="start"
          :endName="end"/>

        <div class="mark-details">
          <h3>Mark details</h3>

          <v-textarea
            v-model="caption"
            :auto-grow="true"
            outlined
            rows="2"
            row-height="28"
            label="Caption"
            placeholder="e.g Restaurant expanded into street"
            class="caption-input"
          >
          </v-textarea>

          <div class="tags-container">
            <v-btn
              v-for="tag in tags"
              :key="tag"
              depressed
              :outlined="!selectedTags.includes(tag)"
              color="secondary"
              class="tag"
              @click="tagClick(tag)"
            >
              {{ tag }}
            </v-btn>
          </div>
        </div>

        <v-flex class="image-uploader">
          <ImageUploader />
        </v-flex>
      </template>
    </ViewTemplate>

    <div class="submit-container">
      <v-btn
        depressed
        rounded
        :disabled="!canSubmit"
        color="primary"
        class="submit-button font-weight-bold"
        @click="handleSubmit"
      >
        Add Mark
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import ViewTemplate from "./ViewTemplate.vue";
import MarkPoints from "./MarkPoints.vue";
import ImageUploader from "./ImageUploader.vue";


export default {
  name: "CreateMarkDetails",

  components: {
    ViewTemplate, MarkPoints, ImageUploader
  },

  props: {
    start: String,

    end: {
      default: "",
      type: String,
    },
  },


  data() {
    return {
      tags: ["Blocked", "Not Safe", "Busy"],
      selectedTags: [],
      caption: "",
      imageUrl: "",
    };
  },

  mounted() {
    eventBus.$on("image-upload", (data) => {
      this.imageUrl = data;
    })
  },

  computed: {
    hasCaption() {
      return this.caption !== null && this.caption.trim().length > 0;
    },

    hasTags() {
      return this.selectedTags.length > 0;
    },

    canSubmit() {
      return this.hasCaption && this.hasTags;
    }
  },

  methods: {
    handleSubmit() {
      let mark = {
        caption: this.caption,
        tags: this.selectedTags,
        start: this.$store.getters.startMarker,
        end: this.$store.getters.endMarker,
        path: this.$store.getters.route,
        imageUrl: this.imageUrl
      };

      axios
        .post("/api/mark", mark)
        .then(async () => {
          await this.$store.dispatch('getUser');
          eventBus.$emit("mark-created");
          eventBus.$emit("display-snackbar", "Mark created successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      eventBus.$emit("clearAddMark");
    },

    tagClick(tag) {
      const tagIndex = this.selectedTags.indexOf(tag);
      tagIndex > -1
        ? this.selectedTags.splice(tagIndex, 1)
        : this.selectedTags.push(tag);
    },
  },
};
</script>

<style scoped>
.create-mark-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.create-inner {
  margin-bottom: 80px;
}

.mark-points {
  margin-top: 1.5rem;
}

.mark-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 2rem;
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
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
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
  width: 100%;
}

.tag {
  margin-right: 1rem;
}

.image-uploader {
  padding: 1rem;
}
</style>