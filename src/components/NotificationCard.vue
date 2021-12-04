<template>
  <div
    :class="[ 'notification-card-container', notificationClass ]"
    @click.stop="$emit('notification-click')">

    <div class="notification-card-user-icon">
      <UserIcon 
        :class="notOpened ? '' : 'tinted'"
        :imageUrl="notification.user.imageUrl"
        :username="name"/>

      <div class="info-icon-container">
        <div :class="[ 'inner', details.iconClass ]">
          <font-awesome-icon :icon="details.notificationIcon" class="info-icon"/>
        </div>
      </div>
    </div>

    <div class="notification-card-details">
      <span class="summary">
        <b>{{ name }}</b> {{ details.message }}.
      </span>

      <p 
        v-if="!isRating"
        class="notification-card-content">
        {{ details.content }}
      </p>

      <v-rating
        v-else
        class="notification-rating"
        :value="notification.rating"
        half-increments
        :color="notOpened ? 'yellow darken-3' : 'grey darken-1'"
        :empty-icon="notOpened ? '$ratingFull' : '$ratingEmpty'"
        background-color="grey darken-1"
        :readonly="true"
        size="16"></v-rating>

      <span class="date">{{ formatDate }}</span>

    </div>

    <div class="dot-container">
      <div class="dot" v-if="notOpened"></div>
    </div>

  </div>
</template>

<script>
import { formatDate } from '../utils';
import UserIcon from "./UserIcon.vue";

export default {
  name: "NotificationCard",

  components: {
    UserIcon
  },

  props: {
    notification: Object
  },

  computed: {
    currentUser() {
      return this.$store.getters.user;
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },

    formatDate() {
      return formatDate(this.notification.dateAdded);
    },

    notOpened() {
      return this.notificationClass !== "opened";
    },

    notificationClass() {
      return this.notification.notificationStatus.toLowerCase();
    },

    name() {
      return this.notification.user.name;
    },

    isRating() {
      return this.notification.notificationType === "RATING";
    },

    details() {
      switch (this.notification.notificationType) {
        case "REPLY":
          return {
            notificationIcon: "comments",
            iconClass: "reply",
            message: "replied to one of your comments",
            content: this.notification.content,
          }

        case "COMMENT":
          return {
            notificationIcon: "comment",
            iconClass: "comment",
            message: "commented on one of your marks",
            content: this.notification.content
          }

        case "RATING":
          return {
            notificationIcon: "star",
            iconClass: "rating",
            message: "added a rating to one of your marks"
          };
        
        default:
          // not supposed to get here
          return {
            notificationIcon: "",
            message: ""
          }
      }
    }
  },
}
</script>

<style scoped>
.notification-card-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1.5rem 0;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  transition: all 0.3s;
}

.notification-card-container.new {
  background-color: #dfecee;
}

.notification-card-container:hover {
  background-color: whitesmoke;
}

.notification-card-user-icon {
  position: relative;
  margin: 0 1.5rem;
}

.tinted {
  filter: grayscale(100%);
}

.notification-card-user-icon .icon {
  font-size: 2.2rem;
}

.info-icon-container {
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: white;
  padding: 2px;
}

.info-icon-container .inner {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-icon-container .inner.rating {
  background-color: orange;
}

.info-icon-container .inner.comment {
  background-color: green;
}

.info-icon-container .inner.reply {
  background-color: #1ba9bf;
}

.info-icon-container .info-icon {
  font-size: 0.9rem;
  color: white;
}

.notification-card-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;
}

.notification-card-details .summary {
   word-break: normal;
}

.notification-card-details .date {
  margin-top: 0.5rem;
  color: #1ba9bf;
  font-size: 0.9rem;
}

.notification-card-content {
  margin-top: 1rem;
  margin-bottom: 0;
  color: gray;
  word-break: normal;
  font-size: 0.9rem
}

.notification-rating {
  margin-top: 1rem;
}

.notification-card-container.opened .summary,
.notification-card-container.opened .date {
  color: gray;
}

.notification-card-container.opened .info-icon-container .inner {
  background-color: gray;
}

.dot-container {
  margin-right: 2rem;
  margin-left: 1.5rem;
  display: flex;
  justify-content: center;
  align-self: center;
}

.dot-container .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1ba9bf;
}
</style>