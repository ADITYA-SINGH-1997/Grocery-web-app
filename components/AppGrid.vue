<template>
  <div>
    <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>
   
    <div>
      <v-row class="mx-1">
        <v-col>
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small color="accent lighten-1" dark v-bind="attrs" v-on="on">
                  Sort Products
                  <v-icon right>mdi-arrow-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="sort('lh')">
                  <v-list-item-title>Price low to high</v-list-item-title>
                </v-list-item>
                <v-list-item @click="sort('hl')">
                  <v-list-item-title>Price high to low</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
        <v-col v-if="category!=='New'">
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="accent lighten-1" dark v-bind="attrs" v-on="on" small>
                  Filter Products
                  <v-icon right>mdi-arrow-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-radio-group v-model="radio" :mandatory="false">
                  <div v-if="category==='Grocery'">
                  <v-radio label="All " value="all"></v-radio>
                  <v-radio label="Pulses" value="pulses"></v-radio>
                  <v-radio label="Snacks" value="snacks"></v-radio>
                  <v-radio label="Soaps" value="soaps"></v-radio>
                   <v-radio label="Sanitary" value="sanitary"></v-radio>
                  <v-radio label="Dry fruits" value="dryFruits"></v-radio>
                  <v-radio label="Oil and Ghee" value="oilGhee"></v-radio>
                  <v-radio label="Atta and Flours" value="atta"></v-radio>
                  </div>
                  <div v-show="category==='Dairy'" >
                  <v-radio label="All " value="all"></v-radio>
                  <v-radio label="Cold drinks " value="drinks"></v-radio>
                  <v-radio label="Milk" value="milk"></v-radio>
                  <v-radio label="Butter" value="butter"></v-radio>
                  </div>
                  <div v-show="category==='Vegetables'">
                     <v-radio label="All " value="all"></v-radio>
                    <v-radio label="Green" value="green"></v-radio>
                  </div>
                  <div v-show="category==='Fruits'">
                       <v-radio label="All " value="all"></v-radio>
                  </div>
                </v-radio-group>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-container fluid>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="6" md="2" sm="3">
          <v-card>
            <h4 class="header">{{ product.name }}</h4>
            <NuxtLink style="text-decoration:none;" :to="`product/${product.id}`">
              <v-card flat color="grey lighten-3" max-width="100px" height="100px" class="image">
                <v-img
                  :src="`/Products/${product.image}`"
                  class="image"
                  max-width="100px"
                  :alt="product.name"
                ></v-img>
              </v-card>
            </NuxtLink>

            <div class="details">
              <span style="font-size:12px">{{product.weight}}</span>
              <br />
              <span
                style="background-color:green;color:white;display:inline-block;font-size:13px"
              >{{product.discount}}OFF</span>

              <br />
              <span class="priceSp">&#8377;{{product.sp}}</span>
              <span class="priceMRP">&#8377;{{product.mrp}}</span>
              <br />

              <v-btn small color="secondary" @click="addOneToCart(product)">Add to cart</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar color="primary" v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import {mapGetters} from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getByTitle } from "@/assets/filters";
export default {
  inject: ["theme"],
  props: {
    data: {
      required: true,
    },
  },
  data() {
    return {
      firstLoad: true,
      loading: true,
      category: '',
      snackbar: false,
      show: true,
      text: "product added to cart",
      timeout: 2000,
      min: 0,
      max: 20000,
      pricerange: 20000,
      tempcart: [],
      radio: "all",
    };
  },

  // https://vuejs.org/v2/guide/computed.html
  computed: {
    ...mapState(["all", "cart"]),
    filteredprice() {
      return this.data.filter((el) => el.mrp < this.pricerange);
    },
    products() {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else if (this.radio !== null) {
        return this.getBySubCategory();
      } else {console.log(this.data)
        return this.data;}
    },
  },

  methods: {
    /* quantity(product){
      //console.log(this.cart.length)
      if (this.cart.length>1){
      for(let item of this.cart){
        if(item.id===product.id)
        return item.quantity 
      }
      }else return "0"
      
    },*/

    getBySubCategory() {
      if (this.radio === "soaps")
        return this.data.filter((el) => el.subCategory === "soap");
      else if (this.radio === "pulses")
        return this.data.filter((el) => el.subCategory === "pulses");
      else if (this.radio === "snacks")
        return this.data.filter((el) => el.subCategory === "snacks");
      else if (this.radio === "atta")
        return this.data.filter((el) => el.subCategory === "atta");
       else if (this.radio === "drinks")
        return this.data.filter((el) => el.subCategory === "drinks");
      else if (this.radio === "milk")
        return this.data.filter((el) => el.subCategory === "milk");
      else if (this.radio === "green")
        return this.data.filter((el) => el.subCategory === "green");
      else if (this.radio === "butter")
        return this.data.filter((el) => el.subCategory === "butter");
      else if (this.radio === "sanitary")
        return this.data.filter((el) => el.subCategory === "sanitary");
      else if (this.radio === "dryFruits")
        return this.data.filter((el) => el.subCategory === "dryFruits");
     
      else return this.data;
    },
    sort(type) {
      let payload = {
        data: this.data,
        category: this.category,
        type: type,
      };
      this.$store.commit("sortProducts", payload);
    },

    getProductByTitle() {
      let listOfProducts = this.$store.state.all,
        titleSearched = this.$store.state.userInfo.productTitleSearched;

      return (this.productsFiltered = getByTitle(
        listOfProducts,
        titleSearched
      ));
    },
    getproduct(id) {
      return this.all.find((el) => el.id === id);
    },
    addOneToCart(pro) {
      // this.show = false;
      this.snackbar = true;
      let product = pro; //this.getproduct(id);
      this.text = product.name + " added to cart";

      product = {
        ...product,
        // quantity: this.getproduct(id).quantity,
      };
      this.tempcart.push(product);

      this.$store.commit("addOneToCart", { ...product });
    },
    removeAllFromCart(id) {
      this.show = true;
      this.snackbar = true;
      let product = this.getproduct(id);
      this.text = product.name + " removed from cart";
      //console.log(product)
      let data = {
        id: id,
        status: false,
      };
      // this.$store.commit('setAddedBtn', data);
      //this.$store.commit("setAddBtn",product);
      //this.$store.commit("removeOneFromCart")
      this.$store.commit("removeAllFromCart", product);
    },
    removeOneFromCart(item) {
      this.$store.commit("removeOneFromCart", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  text-align: center;
}

.detailsOther {
  display: inline-block;
  text-align: center;
}

.priceSp {
  margin-right: 10px;
  margin-left: 10px;
  font-size: 16px;
  color: red;
}
.priceMRP {
  margin-right: 10px;
  margin-left: 10px;
  font-size: 16px;
  color: gray;
  text-decoration: line-through;
}

.image {
  display: block;
  margin: auto;
}
.header {
  font-size: 0.9rem;
  text-align: center;
  font-weight: normal;
}

// https://sass-lang.com/documentation/style-rules/parent-selector

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

.discount {
  position: absolute;
  border-radius: 1000px;
  background: rgb(18, 201, 18);
  color: white;
  font-size: 10px;
  padding: 3px;
  top: 25px;
  right: 35px;
  width: 25px;
  text-align: center;
  height: 25px;

  padding: 6px 10px;
  font-weight: bold;
}

.carttotal {
  position: absolute;
  border-radius: 1000px;
  background: rgb(223, 218, 218);
  color: black;
  top: 128px;
  right: 30px;
  width: 25px;
  text-align: center;
  height: 25px;
  font-size: 10px;
  padding: 6px 10px;
  font-weight: bold;
}
</style>