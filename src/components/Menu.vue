<template>

<div class="wrapper">
    <div>
        <span class="username">
            {{ username.substring(0, 5) }}
        </span>
       <font-awesome-icon icon="bars" class="menu-icon"/>
    </div>

    <div class="rate" >

        <font-awesome-icon v-for="index in 5"  :key="index" class="star" icon="star" :class="{ starStatus: index <= rating}"  />
        <span class="rating-number">{{ rating }}</span>
    </div>

</div>

</template>
<script>


export default {
   name: 'Menu',

   data() {
       return {
           username: "Temi",
           rating: 4,
       }
   },

   mounted() {
       this.username = this.$cookie.get("username");
   },

   methods: {
       
   }
}
</script>

<style scoped>

.wrapper {
    padding: 20px;
    background: rgb(236, 154, 168);
    width: 150px;
    border-radius: 10px;
}

.username {
    font-size: 30px;
    font-weight: bold;
}

.starStatus {
    color: gold;
}

.menu-icon {
    font-size: 30px;
    color: rgb(114, 103, 103);
    font-weight: bold;
    cursor: pointer;
 }

 .rating-number {
     margin-left: 10px;
     font-size: 18px;
     font-weight: bold;
 }

</style>