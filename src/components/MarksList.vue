<template>

 <div class="wrapper">
    <div class="header">
        <div>
            <button class="header-button" @click="getAllMarks" v-bind:class="{ buttonStatus: displayAll }">
                All
            </button>
        </div>

        <div>
            <button class="header-button" @click="getBusyMarks" v-bind:class="{ buttonStatus: displayBusy }">
                Busy
            </button>
        </div>

        <div>
            <button class="header-button" @click="getBlockedMarks" v-bind:class="{ buttonStatus: displayBlocked}">
                Blocked
            </button>
        </div>

        <div>
            <button class="header-button" @click="getNotSafeMarks" v-bind:class="{ buttonStatus: displayNotSafe}">
                Not Safe
            </button>
        </div>
    </div>
    <div class="MarkList" v-if="this.marksToDisplay.length">
       <transition-group name="list" tag="div">
       <Mark v-for="mark in this.marksToDisplay"
             v-bind:key="mark.markId"
             v-bind:caption="mark.caption"
             v-bind:tag="mark.tag"
             v-bind:time="mark.time"
             />
        </transition-group>

     </div>

     <div v-else class="empty-mark-list">
         <span class="empty-message">
             No marks on this area
         </span>
     </div>
 </div>

</template>
<script>

import Mark from "./Mark";
import { eventBus } from '../main.js';

export default {
   name: 'MarksList',
   components: { Mark },
   props: ["marks"],

   mounted() {
    eventBus.$on("get-my-marks", () => {
        this.marksToDisplay = this.marks.filter((mark) => {
            return mark.username === this.username;
        })
    });
   },

   data() {
       return {
           displayAll : true,
           displayBusy : false,
           displayBlocked: false,
           displayNotSafe: false,
           marksToDisplay: [],
           username: "Hillary"
       }
   },

   beforeMount() {
       this.marksToDisplay = this.marks; 
   },

   methods: {
       getAllMarks() {
           this.marksToDisplay = this.marks;
           this.displayAll = true;
           this.displayBusy = false;
           this.displayBlocked = false,
           this.displayNotSafe = false

       },

       getNotSafeMarks() {
           this.marksToDisplay = this.marks.filter((mark) => mark.tag === "not safe");
           this.displayAll = false;
           this.displayBusy = false;
           this.displayBlocked = false,
           this.displayNotSafe = true

       },

       getBusyMarks() {
           this.marksToDisplay = this.marks.filter((mark) => mark.tag === "busy");

           this.displayAll = false;
           this.displayBusy = true;
           this.displayBlocked = false,
           this.displayNotSafe = false

       },

       getBlockedMarks() {
           this.marksToDisplay = this.marks.filter((mark) => mark.tag === "blocked");
           this.displayAll = false;
           this.displayBusy = false;
           this.displayBlocked = true,
           this.displayNotSafe = false

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

.header-button {
    font-size: 15px;
    font-weight: bold;
    background: #959090c4;
    border: none;
    width: 90px;
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

  
</style>