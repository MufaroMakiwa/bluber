<template>
  <div class="outer">
    <transition name="fade">
      <ViewTemplate
        v-if="displayedMark === null"
        :contentPadded="false">
        <template v-slot:heading>
          Notifications
        </template>

        <template v-slot:content>
          <div class="notifications" v-if="hasNotifications">
            <NotificationCard 
              v-for="(notification, index) in notifications"
              :key="notification._id"
              :index="index"
              :notification="notification"
              @click.native="handleNotificationClick(notification)"/>
          </div>

          <NoContent 
            v-else
            class="notifications-padded"
            message="You do not have any notifications at the moment"/>
        </template>
      </ViewTemplate>
    </transition>
    
    <MarkDetails 
      v-if="displayedMark !== null"
      :mark="displayedMark"
      :notificationMark="true"
      @back="handleBack"/>
  </div>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";
import NotificationCard from "./NotificationCard.vue";
import MarkDetails from "./MarkDetails.vue";
import NoContent from "./NoContent.vue";
import axios from 'axios';
import  { eventBus } from "../main";


export default {
  name: "Notifications",

  data() {
    return {
      displayedMark: null
    }
  },

  components: {
    ViewTemplate, NotificationCard, MarkDetails, NoContent
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

    hasNotifications() {
      return this.notifications.length > 0;
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

  mounted() {
    // register refresh eventBus
    eventBus.$on("refresh", () => {
      this.$store.dispatch('getUser');
    })
    

  },

  beforeDestroy() {
    this.updateNotificationStatuses();
    eventBus.$off("refresh");
  },

  watch: {
    notifications: function(newNotifications) {
      if (this.displayedMark) {
        this.displayedMark = newNotifications.filter(n => this.displayedMark._id === n.mark._id)[0].mark;
      }
    }
  },


  methods: {
    handleBack() {
      this.displayedMark = null;
      eventBus.$emit('clearPlan');
    },

    updateNotificationStatuses() {
      // update all new notifications as seen
    const body = {
      status: "SEEN",
      ratingIds: this.ratingNotifications
                     .filter(notification => notification.notificationStatus === "NEW")
                     .map(notification => notification._id),
      replyIds: this.replyNotifications
                    .filter(notification => notification.notificationStatus === "NEW")
                    .map(notification => notification._id),
      commentIds: this.commentNotifications
                      .filter(notification => notification.notificationStatus === "NEW")
                      .map(notification => notification._id),
    };

    axios.patch("/api/user/notifications", body)
      .then(() => {
        this.$store.dispatch('getUser');
      })
      .catch(err => {
        console.log(err)
      })
    },

    handleNotificationClick(notification) {
      const type = notification.notificationType;

      const body = {
        status: "OPENED",
        ...(type === "REPLY" && {replyIds: [notification._id]}),
        ...(type === "COMMENT" && {commentIds: [notification._id]}),
        ...(type === "RATING" && {ratingIds: [notification._id]}),
      };

      notification.notificationStatus !== "OPENED" && 
        axios.patch("/api/user/notifications", body)
          .then(() => {
            this.$store.dispatch('updateNotificationStatus', {
              status: "OPENED",
              notificationIds: [notification._id]
            })
          })
          .catch(err => {
            console.log(err);
          })
      this.displayedMark = notification.mark;
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}

.notifications {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.notifications-padded {
  padding: 0 1.5rem;
}
</style>