<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      show-arrows
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-card
        height="350"
         outlined
        >
          <v-img class="center" max-height="150"
          max-width="150"
          :src="`${item.img}`"></v-img>
          <div v-if="item.tab !== 'Cash'">
          <v-img class="center" max-height="250"
          max-width="250"
          :src="`${item.img2}`"></v-img></div>
          <div  v-if="item.tab==='Cash'">
           <nuxt-link to="/"> <v-img v-if="cartCount<1" max-height="150px" max-width="200px"
            class="center" :src="`${item.empty}`"></v-img></nuxt-link>
            <p v-if="cartCount>0" style="margin-left:30px;mar"> Please pay <span style="color:#4CAF50;">&#8377;{{data}}</span>  to the delivery executive when your order is delivered</p>
            <v-btn v-if="cartCount>0"
            class="center" color="accent" @click="complete()">Place Order</v-btn>
            
              <v-snackbar 
               color="primary" timeout="3000"
              v-model="snackbar">{{text}}</v-snackbar></div>
          
           
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>


<script>
import { mapGetters } from "vuex";
  export default {
    props:{
      data:{
        required: true
      }
    },
    data () {
      return {
        text:"You order is placed successfully", 
        snackbar:false,
        tab: null,
        items: [
           {tab:'Cash',content:'Please payto the delivery executive when your order is delivered',img:'/cashLogo.jpg', empty:'/empty.jpg'}, 
          {tab:'Wallets',content:'COMING SOON', img:'/wallet.jpg', img2:'/coming.jpg'}, 
          {tab:'Card',content:'',img:'/cardlogo.png', img2:'/coming.jpg'}, 
          {tab:'NetBanking',content:'',img:'/net.jpg', img2:'/coming.jpg'}
        ]
      }
    },
    computed:{
      ...mapGetters(["cartCount"])
    },
    methods:{
      complete(){
        //TODO: Dispatch action for order completion;
        this.snackbar=true;
        this.$store.commit("clearCart");
      }
    },
  }
</script>


<style>
.center{
  margin-top: 10px;
   display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>