import Vue from 'vue';
import Vuex from 'vuex';

//Vue.use(Vuex); // Vue 프레임워크에 Vuex plugin 시스템에 등록하고 사용하도록 지시

/** 
 * @Function : Vuex
 * @Explain : dispatch가 action을 호출 -> action내, mutation을 커밋(commit)하여 상태를 변경            
 */
export default new Vuex.Store({
  state:{
    products:[

      { id: 0, title: 'sm cosmetic', price: 11000, quantity: 0, options: [ { text : '+50ml', value : 0 + "_0", price : 3000 }, {text: '+70ml', value : 0 + "_1",  price: 5000 }]},
      { id: 1, title: '쌔럼', price : 13000, quantity: 0, options: [ {text : '+40ml', value : 1 + "_0", price : 2000 }, {text : '+80ml', value : 1 + "_1",  price : 7000 }]},
      { id: 2, title: '썬크림', price : 12000, quantity: 0, options: [ {text : '+10ml', value : 2 + "_0", price : 2000 }, {text : '+20ml', value : 2 + "_1", price : 7000 }]}
    ],
    selectedProduct: {},
    cart:[]
    
  },
  mutations: {
    setSelectedProduct(state, productId){
      state.selectedProduct = state.products.find(product => product.id.toString() === productId);

    }, 
    ADD_TO_CART(state, productForCart){

      /* 방법1. console.log("ADD_TO_CART ======> ", prodInCart)      */   
        state.cart.forEach(prodInCart => {
          productForCart.forEach((product, index) => {
            if(prodInCart.id !== product.id){
              state.cart.push(product)
            } else if(prodInCart.id === productForCart.id) {
              prodInCart.quantity += productForCart.quantity; 
              productForCart.options.forEach((opForCart, index) => {
                prodInCart.options.forEach((opInCart) => {
                  opInCart.quantity += opForCart.quantity;
                })
              })
            }
          })
        })

        
    },
    SUBMIT_ORDER(state) {
      state.cart = [];

    }
  },
  actions:{
    async setProducts({ commit }){
      try {
        const res = await (
          await fetch('/api/products', {
            method: 'GET',
            headers:{
              'Content-Type' : 'application/json'
            }
          })
        ).json();
        console.log("화장품 제품들 리스트 =================> ", res);
        commit('SET_PRODUCTS', res);
      } catch(e){
        console.error('Error fetching products:', error);
      }
    },
    setSelectedProduct({commit}, productId){
      commit('setSelectedProduct', productId)
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    /*
    updatePQnt({ commit }, {id, quantity}){
      console.log("actions=========>", id, quantity)
      commit('UPDATE_PRODUCT_QUANTITY', { id, quantity });
    },*/
  }  
})