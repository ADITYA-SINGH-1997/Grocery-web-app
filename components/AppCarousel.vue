<template>
  <v-carousel cycle height="300px">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'c1.jpg',
          },
          {
            src: 'c2.jpg',
          },
          {
            src: 'c3.jpg',
          },
         
        ],
      }
    },
  }
</script>