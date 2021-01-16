<template>
<div style="margin-top:65px;margin-bottom:250px">
  <v-stepper  vertical
   v-model="e6" >
    <v-stepper-step 
    color="secondary"
    :complete="e6 > 1" step="1">
      Verify Phone number
      <small>We need your phone number so that we can update you about your order.</small>
      <p style="margin-top:5px;color:#4CAF50;">{{phone}}</p>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card 
      color="white" 
      >
        <div><p>Your 10 digit mobile number</p></div>
        <v-text-field
        v-model="phone"
        type="number">
        </v-text-field>
        <v-btn v-if="phone.length===10"
        color="secondary" @click="e6=2">Next</v-btn>
      </v-card>

    </v-stepper-content>

    <v-stepper-step 
    color="secondary"
    :complete="e6 > 2" step="2">
    Delivery Address<p style="margin-top:5px;color:#4CAF50;">{{getAddress}}</p>
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="white" >
       <Address />
        <v-btn v-if="getAddress" small 
        color="secondary"
        @click="e6=3">continue</v-btn>
      </v-card>
    </v-stepper-content>

    <v-stepper-step
    color="secondary" 
    step="3">Payment</v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="white" class="mb-5" >
       <div style="margin-bottom:10px;"><h4 style="color:#4CAF50;">Cart Total is &#8377;{{cartTotal}} </h4></div>
        <AppPayment :data="cartTotal"/>
      </v-card>
      <v-btn color="error" @click="clearCart()">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
 
</div>
</template>


<script>
import { mapState } from "vuex";
import {mapGetters} from "vuex";
  export default {
    data () {
      return {
        e6: 1,
        phone:''
      }
    },
    computed:{
       ...mapState(["userInfo"]),
       ...mapGetters(['cartCount', 'cartTotal', 'getAddress']),  
    },
    methods:{
       clearCart() {
      
      this.$store.commit("clearCart");
    }
    }
  }
</script>
<style scoped>

</style>