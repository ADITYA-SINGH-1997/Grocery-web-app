import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import allData from "~/static/all.json";
import newProductData from "~/static/newProducts.json";

const API_URL = 'http://127.0.0.1:8000'

export const state = () => ({

  cartUIStatus: "idle",
  navigationDrawer: null,
  newProducts:newProductData,
  loading:true,
 // storedata: dataStore,
  all: allData,
  fruits:null,
  vegetables:null ,
  grocery:null,
  dairy: null,
  cart: [],
  userInfo: {
    address:'',
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: '',
    productTitleSearched: ''
  },
  clientSecret: "" // Required to initiate the payment from the client
});


export const getters = {
  
  getAddress:state=>{
    return state.userInfo.address;
  },
  
  cartCount: state => {
    if (!state.cart.length) return 0;
    
    //return state.cart.reduce((ac, next) => ac + next.quantity, 0);
    return state.cart.length;
  },
  cartTotal: state => {
    if (!state.cart.length) return 0;
    var total=0;

    //console.log(state.cart.reduce((ac, next) => ac + next.quantity * next.price, 0))
    //return state.cart.reduce((ac, next) => ac + next.quantity * next.price, 0);
   for (const item of state.cart){
     total+= parseInt(item.sp,10)*parseInt(item.quantity,10)
   }
    return total;
  },
  cartItems: state => {
    if (!state.cart.length) return [];
    return state.cart.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      };
    });
  },
  clientSecret: state => state.clientSecret
};

export const mutations = {

  setMsg(state,payload){
    state.msg=payload;
  },

  setUser(state,payload){
    state.user= payload;
    state.dialog=false;
  },
  setLoading(state,payload){
    
    state.loading=payload
  },
  setFruits (state, payload) {
    state.fruits = payload
    console.log(state.fruits)
  },
  setVegetables (state, payload) {
    state.vegetables = payload
  },
  setGrocery (state, payload) {
    state.grocery = payload
  },
  setDairy (state, payload) {
    state.dairy = payload
  },
 
  updateCartUI: (state, payload) => {
    state.cartUIStatus = payload;
  },

  setAddress:(state,payload)=>{
    state.userInfo.address=payload
  },
  clearCart: state => {
    //this clears the cart
    (state.cart = []), (state.cartUIStatus = "idle");
  },
  addToCart: (state, payload) => {
    let itemfound = state.cart.find(el => el.id === payload.id);
    itemfound
      ? (itemfound.quantity += payload.quantity)
      : state.cart.push(payload)
  },
   setClientSecret: (state, payload) => {
    state.clientSecret = payload;
   },
  addOneToCart: (state, payload) => {
    let itemfound = state.cart.find(el => el.id === payload.id)

    itemfound ? itemfound.quantity++ : state.cart.push(payload)
  },
  removeOneFromCart: (state, payload) => {
    let index = state.cart.findIndex(el => el.id === payload.id)
    state.cart[index].quantity
      ? state.cart[index].quantity--
      : state.cart.splice(index, 1)
  },
  removeAllFromCart: (state, payload) => {
    state.cart = state.cart.filter(el => el.id !== payload.id)
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  updateAddress: (state,payload)=>{
    state.userInfo.address=payload;
    console.log( state.userInfo.address)
  },
 
  sortProducts:(state,payload)=>{
    if(payload.category==='fruits'){
    state.fruits=payload.data.sort(function(a,b){
      if (payload.type==='lh')
      return a.sp-b.sp;
      else return b.sp-a.sp
    })}
    else if(payload.category==='Vegetables'){
      console.log('vege')
      state.vegetables=payload.data.sort(function(a,b){
        if(payload.type==='lh')
        return a.sp-b.sp
        else return b.sp-a.sp
      })}
     else if(payload.category==='Grocery'){
        state.grocery=payload.data.sort(function(a,b){
          if(payload.type==='lh')
          return a.sp-b.sp
          else return b.sp-a.sp
        })}
      else  if(payload.category==='Dairy'){
          state.dairy=payload.data.sort(function(a,b){
            if(payload.type==='lh')
            return a.sp-b.sp
            else return b.sp-a.sp
          })}
      else {
        state.newProducts= payload.data.sort(function(a,b){
          if(payload.type==='lh')
          return a.sp-b.sp
          else return b.sp-a.sp
        })
      }
  },
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const actions = {

  async getFruits ({ commit }) {
    console.log("in action")
    const { data } = await axios.get(`${API_URL}/products`)
    commit('setFruits',data)
    await sleep(1500);
    commit('setLoading',false)
    
  },
  async getVegetables ({ commit }) {
    const { data } = await axios.get(`${API_URL}/vegetables`)
    commit('setVegetables', data)
    await sleep(1500);
    commit('setLoading',false)
  },
  async getDairy ({ commit }) {
    const { data } = await axios.get(`${API_URL}/dairy`)
    commit('setDairy', data)
    await sleep(1500);
    commit('setLoading',false)
  },
  async getGrocery ({ commit }) {
    const { data } = await axios.get(`${API_URL}/grocery`)
    commit('setGrocery', data)
    await sleep(1500);
    commit('setLoading',false)
  },
}
