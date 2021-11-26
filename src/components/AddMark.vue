<template>
  <div class="outer">
    <transition name="fade">
      <Search mode="mark" v-if="!addingMarkDetails">
        <template v-slot:heading>
          Where do you want to mark?
        </template>

        <template v-slot:submit>
          <v-btn
            depressed
            rounded
            color="primary"
            class="submit-button font-weight-bold"
            @click="handleSubmit"> 
            Continue
          </v-btn>
        </template>
      </Search>
    </transition>
    
    <CreateMarkDetails 
      v-if="addingMarkDetails" 
      start="189 Vassar Street"
      end="77 Massachusetts Avenue"
      @back="addingMarkDetails=false"/>   
  </div>
</template>

<script>
import Search from "./Search";
import CreateMarkDetails from "./CreateMarkDetails";


export default {
  name: "AddMark",

  components: {
    Search, CreateMarkDetails
  },

  data() {
    return {
      addingMarkDetails: false,
    }
  },

  methods: {
    handleSubmit() {
      this.addingMarkDetails = true;
    }
  }
}
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
}
</style>