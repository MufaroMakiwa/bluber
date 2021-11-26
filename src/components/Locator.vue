<template>
    <div>
        <button class="get-data" v-on:click="getBlueBikesData">Bluebikes</button>
        <div class="result-list">
        </div>
    </div>
</template>

<script>
import { eventBus } from "../main";
import axios from 'axios';

export default {
  name: "Locator",
  props: [],
  methods: {
    getBlueBikesData(){
        axios
            .get("/api/bluebikes")
            .then((res) => { eventBus.$emit("mark-stations",res.data)})
            .catch((err) => {
                console.log(err);
            });
        }
  },
};
</script>

<style scoped>

 .get-data
 {
    background-color: #2185D0;
    color: white;
    border: none;
    outline: none;
    position: absolute;
    top: 24px;
    right: 32px;
    font-size: 20px;
    font-weight: bold;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
 }

</style>