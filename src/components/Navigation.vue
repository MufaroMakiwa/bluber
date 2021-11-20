<template>

 <div class="wrapper">
    <div class="header">
        <div>
            <button class="nav-button" @click="getMyMarks" v-bind:class="{ buttonStatus: getMyMarksTab }">
                My Marks
            </button>
        </div>

        <div>
            <button class="nav-button" @click="getMySaved" v-bind:class="{ buttonStatus: getMySavedTab }">
               My Saved Searches
            </button>
        </div>

        <div>
            <button class="nav-button" @click="planTrip" v-bind:class="{ buttonStatus: planTripTab}">
                Plan Trip
            </button>
        </div>
        <div>
            <button class="nav-button" @click="markArea" v-bind:class="{ buttonStatus: markAreaTab}">
                Mark Area
            </button>
        </div>
    </div>
 </div>

</template>
<script>

import { eventBus } from "../main.js";

export default {
   name: 'Navigation',


   data() {
       return {
           markAreaTab: false,
           planTripTab: false,
           getMySavedTab: false,
           getMyMarksTab: false
       }
   },

   beforeMount() {
   },

   methods: {
       getMyMarks() {
           this.getMyMarksTab = !this.getMyMarksTab;
           eventBus.$emit("get-my-marks");
       },

       markArea() {
           
       },

       getMySaved() {

       },

       planTrip(){
           this.planTripTab = !this.planTripTab;
           eventBus.$emit("toggle-marks");

       } 
   }
}
</script>

<style scoped>

.empty-mark-list {
    display: flex;
    justify-content: center;
    padding: 20px;
}

.empty-message{
    font-weight: bold;
    font-size: 20px;
    text-align: center;
}
.header {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
}

.buttonStatus {
    color: white;
    font-weight: bold;
    background: black !important;
}

.nav-button {
    font-size: 15px;
    font-weight: bold;
    background: #959090c4;
    border: none;
    width: 100px;
    height: 60px;
    cursor: pointer;
}

.wrapper {
    border: solid 1px red;
    background: rgb(238, 235, 235);
    width: 600px;
    padding: 16px 16px 8px 16px;
    margin: 10px;
    overflow-y: scroll;
}

.MarkList{
    display: flex;
    flex-direction: column;
    /* align-items: center; */  
}

.list-enter {
    transition: all 0.3s;
}

.list-leave-active {
    transition: all 0.3s;
    position: absolute;
    opacity: 0;
}

.buttonStatus {
    color: white;
    font-weight: bold;
    background: black !important;
}

  
</style>