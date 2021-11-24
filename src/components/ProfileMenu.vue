<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="true"
      :max-width="350"
      max-height="100vh"
      :min-width="300"
      offset-y>

      <template v-slot:activator="{ on, attrs }"> 
        <v-badge
          bordered
          color="red"
          offset-y="16"
          offset-x="16"
          :content="displayedNotificationCount"
          :value="isDisplayNotificationsCount && !menu">
          <v-btn
            fab
            color="white"
            v-bind="attrs"
            v-on="on">        
            <font-awesome-icon icon="user-circle" class="user-icon"/>  
          </v-btn>
        </v-badge>         
      </template>

      <v-card>      
        <div class="header-container">
          <font-awesome-icon icon="user-circle" class="user-icon-menu"/> 
          <span class="name">Mufaro Makiwa</span>
          <span class="email">mufaroemakiwa@gmail.com</span>
          <Rating class="rating-margin"/>
        </div>
          
        <v-divider></v-divider>

        <v-list>
          <v-list-item @click="displayNotifications">
            <v-list-item-avatar class="avatar">
              <font-awesome-icon icon="bell" class="menu-icon"/> 
            </v-list-item-avatar>
            <v-list-item-title>Notifications</v-list-item-title>            
            <span 
              class="notification-count"
              v-if="isDisplayNotificationsCount">
              {{ displayedNotificationCount }}
            </span>         
          </v-list-item>

          <v-list-item @click="displayMarks">
            <v-list-item-avatar class="avatar">
              <font-awesome-icon icon="map-marker" class="menu-icon"/> 
            </v-list-item-avatar>
            <v-list-item-title>My marks</v-list-item-title>
          </v-list-item>

          <v-list-item @click="displaySaved">
            <v-list-item-avatar class="avatar">
              <font-awesome-icon icon="map" class="menu-icon"/> 
            </v-list-item-avatar>
            <v-list-item-title>Saved searches</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import Rating from './Rating.vue';


export default {
  name: "ProfileMenu",

  components: {
    Rating
  },

  data() {
    return {
      menu: false
    }
  },

  props: {
    username: String,
    
    notificationCount: {
      default: 0,
      type: Number
    }
  },

  computed: {
    displayedNotificationCount() {
    return this.notificationCount < 100 
            ? this.notificationCount
            : "99+"
    },

    isDisplayNotificationsCount() {
      return this.notificationCount > 0;
    }
  },

  methods: {
    displayNotifications() {
      alert("Display notifications");
    },

    displaySaved() {
      alert("Display saved");
    },

    displayMarks() {
      alert("Display marks");
    }
  }
}
</script>

<style scoped>
.user-icon {
  font-size: 3rem;
  color: gray;
}

.user-icon-menu {
  font-size: 4rem;
  color: gray;
}

.rating-margin {
  margin-top: 0.5rem;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 0;
}

.header-container .name {
  font-weight: bold;
  margin-top: 0.5rem;
}

.header-container .email {
  color: gray;
  font-size: 0.9rem;
}

.avatar {
  margin: 0
}

.menu-icon {
  font-size: 1.25rem;
  color: gray;
}

.notification-count {
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: red;
  height: 24px;
  min-width: 24px;
  width: fit-content;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
}

</style>