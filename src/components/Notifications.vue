<template>
  <ViewTemplate>
    <template v-slot:heading>
      Notifications
    </template>

    <template v-slot:content>
      <pre 
        v-for="(notification, index) in notifications"
        :key="index">
        {{ JSON.stringify(notification, null, 4) }}
      </pre>
    </template>
  </ViewTemplate>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";
import axios from 'axios';


export default {
  name: "Notifications",

  components: {
    ViewTemplate
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },

    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },

    notifications() {
      return this.isSignedIn ? this.user.notifications : [];
    },

    replyNotifications() {
      return this.notifications.filter(notification => notification.notificationType === "REPLY");
    },

    commentNotifications() {
      return this.notifications.filter(notification => notification.notificationType === "COMMENT");
    },

    ratingNotifications() {
      return this.notifications.filter(notification => notification.notificationType === "RATING");
              
    }
  },

  async created() {
    // get an updated user object
    await this.$store.dispatch('getUser');
    
    // update all the notifications as seen
    const body = {
      status: "SEEN",
      ratingIds: this.ratingNotifications.map(notification => notification._id),
      replyIds: this.replyNotifications.map(notification => notification._id),
      commentIds: this.commentNotifications.map(notification => notification._id)
    };

    axios.patch("/api/user/notifications", body)
      .then(() => {
        //
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
</style>