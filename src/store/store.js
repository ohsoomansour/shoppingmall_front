import Vue from 'vue';
import Vuex from 'vuex';

//Vue.use(Vuex); // Vue 프레임워크에 Vuex plugin 시스템에 등록하고 사용하도록 지시

/** 
 * @Function : Vuex
 * @Explain : dispatch가 action을 호출 -> action내, mutation을 커밋(commit)하여 상태를 변경
 *             
 */
export default new Vuex.Store({
  state:{
    products:[
      { id: 0, name: 'sample cosmetic', price: 11000, quantity: 0},
      { id: 1, name: '쌔럼 ', price : 13000, quantity: 0}
    ],
    cart: []
    
  },
  mutations: {
    //#주의 : cart에 product값이 들어간 후 처음부터 product.quantity 의 값을 바꾸게 되면 초기 값이 바껴서 중복 계산하게 될 가능성이 있음 
    ADD_TO_CART(state, {product, temp_qnt}){
      let itemInCart = state.cart.find(item => item.id === product.id); //여기로 인해서 

      if(!itemInCart){
        product.quantity += parseInt(temp_qnt, 10) || 0;;
        state.cart.push(product);
        console.log("첫 카트에 넣고 난 후 ========>", state.cart);
      } else {
        //product.quantity = product_qnt;
        itemInCart.quantity += parseInt(temp_qnt, 10) || 0;; //여기는 정상 계산ss
        console.log("아이템이 존재하는 경우 개수를 넣은 후 결과 =====>", state.cart);
      }
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