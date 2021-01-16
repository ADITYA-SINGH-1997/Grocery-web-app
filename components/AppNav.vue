<template>
  <div>
    <v-card>
      
     <v-app-bar
      fixed
      color="primary"
     >
          <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click.stop="drawer = !drawer"/>
        <nuxt-link to="/"> <v-avatar
         class="hidden-md-and-up" 
         color="white">
            <v-img
        src="/logoMobile.jpg"
        alt="Fresskart"
      ></v-img>
         </v-avatar></nuxt-link>
        <nuxt-link to="/">
        <v-img 
        max-height="200"
        max-width="200"
        style="margin-right:20px;"
        src="/logo.png"
        class="hidden-sm-and-down"></v-img>
        </nuxt-link>
         <div v-if="$auth.loggedIn" class="hidden-sm-and-down">
        <DropDownUser/>
         </div>
        <div v-else class="hidden-sm-and-down">
          <DropDown/>
    
         </div>
        <v-container > 
       <Search/></v-container>
        
     <v-spacer />
    <v-card class="card" > 
      <nuxt-link style="text-decoration:none;" to="/cart">
      <v-icon>mdi-cart</v-icon>
      <div class="carttotal" 
      v-if="cartCount > 0">{{ cartCount }}
      </div></nuxt-link>
    </v-card>
    <v-card v-if="cartTotal>0"> 
      <h5 style="padding:1px">&#8377;{{cartTotal}}</h5>
      </v-card> 
     </v-app-bar>
      </v-card>
      
      <v-navigation-drawer
      style="position:fixed; top:0; left:0; "
      v-model="drawer"
      temporary 
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="/a.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Aditya</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense >

        <v-list-item
          style="text-decoration:none;"
          v-for="item in items"
          :key="item.title"
          nuxt :to="`/${item.route}`"          
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> 

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
         
        </v-list-item>
        <v-divider/>
        <v-list-item link>
          <v-list-item-content style="margin-top:10px;">
            
            </v-list-item-content>
            </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
  
</template>

<script>

import {mapGetters } from "vuex";
import {mapState} from "vuex";
import DropDown from './DropDown'

export default {

      data () {
      return {
        loading:true,
         drawer: null,
        items: [
         
          { title: 'Home', icon: 'mdi-home', route:''},
          { title: 'Login', icon: 'mdi-account-circle', route:'login'},
          { title: 'Cart', icon: 'mdi-cart', route:'cart' },
          { title: 'Your Orders', icon: 'mdi-receipt', route:'orders' },

        ],
      }
    },
    methods:{
    
    },

   computed: {
    ...mapGetters(["cartCount","cartTotal"]),
    ...mapState(['navigationDrawer','user']),
  }
}
</script>

<style scoped lang="scss">

.search{
margin-left: 200px;
margin-right: 100px;
}

.card{
font-size: 20px;
margin-right: 20px;

}

.carttotal {
  position: absolute;
  border-radius: 1000px;
  background: rgb(73, 10, 248);
  color: white;
  font-size: 10px;
  padding: 3px;
  top: -15px;
  right: -18px;
  width: 25px;
  text-align: center;
  height: 25px;
  font-size: 10px;
  padding: 6px 10px;
  font-weight: bold;
  
}
.nav {
  align-items: center;
  background: salmon;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  
  &__header {
    font-size: 2.5rem;
  }
  
  &__cart {
    position: relative;
    
    button {
      background: none;
      border: 0;
      color: white;
      cursor: pointer;
    }
    
    i {
      font-size: 2rem;
    }
    
    .total-quantity {
      align-items: center;
      background: lightblue;
      border-radius: 50%;
      display: flex;
      font-weight: bold;
      height: 2rem;
      justify-content: center;
      padding: 0.5rem;
      position: absolute;
      right: -10px;
      top: -10px;
      width: 2rem;
    }
    
    .cart-dropdown {
      background: white;
      border: 1px solid lightgray;
      border-radius: 10px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
      color: #333;
      font-size: 1.3rem;
      overflow: auto;
      padding: 0 1rem;
      position: absolute;
      right: 0;
      width: 12rem;
      
      .cart-dropdown__list {
        list-style: none;
        
        li {
          margin: 1rem 0;
        }
      }
    }
  }
}

.span{
  margin-left: 10px;
  text-decoration: none;
  color: white;
}
.btn{
  margin-right: 28px;
}
</style>