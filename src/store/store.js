import Vue from 'vue';
import Vuex from 'vuex'; 
import axios from 'axios'; // axios import
//Vue.use(Vuex); // Vue 프레임워크에 Vuex plugin 시스템에 등록하고 사용하도록 지시

/** 
 * @Function : Vuex
 * @Explain : dispatch가 action을 호출 -> action내, mutation을 커밋(commit)하여 상태를 변경            
 */
export default new Vuex.Store({
  state:{
    products:[

      { id: 0, title: 'sm cosmetic', price: 11000, quantity: 0, options: [ { text : '+50ml', value : 0 + "_0", price : 3000, quantity:0 }, {text: '+70ml', value : 0 + "_1",  price: 5000, quantity:0 }]},
      { id: 1, title: '쌔럼', price : 13000, quantity: 0, options: [ {text : '+40ml', value : 1 + "_0", price : 2000, quantity:0 }, {text : '+80ml', value : 1 + "_1",  price : 7000, quantity:0 }]},
      { id: 2, title: '썬크림', price : 12000, quantity: 0, options: [ {text : '+10ml', value : 2 + "_0", price : 2000, quantity:0 }, {text : '+20ml', value : 2 + "_1", price : 7000, quantity:0 }]}
    ],
    selectedProduct: {},
    cart:[]
    
  },
  mutations: {
    setSelectedProduct(state, productId){
      state.selectedProduct = state.products.find(product => product.id.toString() === productId);
    }, 
    PUT_GOODS_InCART(state, prodToBeIncludedInCart){
      const prodExistInCart = state.cart.find(prodInCart => prodInCart.id === prodToBeIncludedInCart.id);
      if(!prodExistInCart){
        state.cart.push({...prodToBeIncludedInCart})
      } else {
        prodToBeIncludedInCart.options.forEach(opToBeIncludedInCart => {
          const opExistInCart = prodExistInCart.options.find(op => op.value === opToBeIncludedInCart.value);
          if(opExistInCart){
            opExistInCart.quantity += opToBeIncludedInCart.quantity;
            opExistInCart.total += opToBeIncludedInCart.total;
          } else {
            prodExistInCart.options.push({...opToBeIncludedInCart});
          }

        })
      }
    },
    GET_ITEMS_FROM_CART(state, myItemsInCart){
      state.cart = myItemsInCart;
      
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
    putGoodsInCart({ dispatch, commit }, product) {
      //1.현재 카트에 담겨져있는 아이템들을 필터 
      commit('PUT_GOODS_InCART', product);
      dispatch('storeItemsIncart'); 
      //이렇게 하면 state.cart값에는 정상적으로 채워지지만 서버 입장, 1개 -> 1개+1개 -> 1개(수정)+1개
    },
    async storeItemsIncart({ commit, state }){
      //{ commit, state }는 context의 구조 분해 할당 
      //state.cart 값 -> /store_ItemsInCart 경로 서버로 보내고(저장한 아이디 & 카트 목록) -> cart 
      
      try {

        const data = {
          items_cart: state.cart,
        };
        await axios.post('/api/products/store_items_inCart', JSON.stringify(data), {
          headers:{
            'Content-Type': 'application/json',
        },
        }).then(res => console.log("카트 저장 성공!!" + res))
        .catch(e => console.error(e));

      } catch (e) {
        console.error('Error storing items in cart:', e);
      }
    },
    async getItemsFromCart({ commit }){
      //### 나의 카트 화면의 비즈니스 로직 ### 
      // REST API -> 경로  /get_storedProducts
      const u_email = sessionStorage.getItem('u_email'); 
      console.log("myItems's u_email =======>", u_email);
      const myItemsInCart =  await(
        await fetch(`/api/products/get_storedMyItems?u_email=${u_email}`, {
          method : 'GET'
        })
      ).json();
      console.log("getItemsFromCart============>", myItemsInCart );+
      commit('GET_ITEMS_FROM_CART', JSON.parse(myItemsInCart.items_cart));
      console.log(this.state.cart)
    }

  }  
})