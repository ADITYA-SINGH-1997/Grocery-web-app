<template>
  <div style="margin-top:70px; margin-bottom-200px">
   
    <h1 class="center">Your Cart</h1>
    <section style="margin-bottom:250px" v-if="cartUIStatus === 'idle'">
     <AppCartDisplay />
  <nuxt-link style="text-decoration:none;" to="/checkout">
  <v-btn style="margin-left:20px" v-if="cartCount>0" color="accent">Proceed to Checkout</v-btn></nuxt-link>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {mapGetters} from "vuex";

export default {

  computed: {
    ...mapState(["cartUIStatus"]),
    ...mapGetters(["cartCount"])
  }
};
</script>

<style lang="scss" scoped>

</style>