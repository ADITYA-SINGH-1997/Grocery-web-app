<template>
  <div style="margin-top:55px;margin-bottom:250px">
    <h2>
      <span>Grocery Products</span>
    </h2> 
     <div v-if="loading">
     <Loader />
    </div>
    <div v-else>
    <AppGrid :data="grocery" /></div>
    <ScrollTop />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
 
  computed: {
    ...mapState(["grocery",,"loading"])
  },
   created(){
    this.$store.dispatch('getGrocery')
  }
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