import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // Vue 프레임워크에 Vuex plugin 시스템에 등록하고 사용하도록 지시

/** 
 * @Function : Vuex
 * @Explain : dispatch가 action을 호출 -> action내, mutation을 커밋(commit)하여 상태를 변경
 *             
 */
export default new Vuex.Store({
  state:{
    products:[
      { id: 0, name: 'sample cosmetic', quantity: 0}
    ],
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, product){
      const itemInCart = state.cart.find(item => item.id === product.id);
      if(itemInCart){
        console.log("temInCart =========> ", itemInCart);
        itemInCart.quantity += product.quantity;
      } else {
        state.cart.push(...product);
      }
      state.cart.push(product)
    },
    UPDATE_PRODUCT_QUANTITY(state, { id, quantity }){
      const productToUpdate = state.products.find(p => p.id === id);
      console.log("productToUpdate =========>", productToUpdate);
      productToUpdate.quantity = quantity;
    },
    SUBMIT_ORDER(state) {
      state.cart = [];
    }
  },
  actions:{
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    submitOrder({ commit }){
      commit('SUBMIT_ORDER');
    },
    updateQuantity({ commit}, { id, quantity } ){
      commit('UPDATE_PRODUCT_QUANTITY')
    }
  }  
})