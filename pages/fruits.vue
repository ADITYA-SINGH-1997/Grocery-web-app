<template>
  <div style="margin-top:65px;margin-bottom:250px">
     <h2>
      <span>Fruit Products</span>
    </h2>
    <div v-if="loading">
     <Loader />
    </div>
    <div v-else>
       <AppGrid  :data="fruits" />
    </div>
    
    <ScrollTop />
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";

export default {



  computed: {
    ...mapState(["fruits","loading"])
  },

  created(){
    
    this.$store.dispatch('getFruits')
  },


};
</script>

<style scoped>
h2 {
  color: #d96528;
  text-align: center;
  overflow: hidden;
}
h2 span {
  display: inline-block;
  position: relative;
}
h2 span:after,
h2 span:before {
  content: " ";
  display: block;
  height: 1px;
  width: 1000px;
  background: #e6baa4;
  position: absolute;
  top: 50%;
}
h2 span:before {
  left: -1010px;
}
h2 span:after {
  right: -1010px;
}
</style>

