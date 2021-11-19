<template>

 <div class="wrapper">
    <div class="header">
        <div>
            <button class="nav-button" @click="getAllMarks" v-bind:class="{ buttonStatus: displayAll }">
                My Marks
            </button>
        </div>

        <div>
            <button class="nav-button" @click="getBusyMarks" v-bind:class="{ buttonStatus: displayBusy }">
               My Saved Searches
            </button>
        </div>

        <div>
            <button class="nav-button" @click="getBlockedMarks" v-bind:class="{ buttonStatus: displayBlocked}">
                Plan Trip
            </button>
        </div>
        <div>
            <button class="nav-button" @click="getNotSafeMarks" v-bind:class="{ buttonStatus: displayNotSafe}">
                Mark Area
            </button>
        </div>
    </div>
 </div>

</template>
<script>


export default {
   name: 'Navigation',

   data() {
       return {

       }
   },

   beforeMount() {
   },

   methods: {    
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