import Vue from 'vue';
import Vuex from 'vuex'; 
import axios from 'axios'; // axios import
//Vue.use(Vuex); // Vue 프레임워크에 Vuex plugin 시스템에 등록하고 사용하도록 지시

/** 
 * @Function : Vuex
 * @Explain : dispatch가 action을 호출 -> mutation을 커밋(commit)하여   state값을 변경            
 */

// #플러그인 함수 :  mutation의 어떤 type이 발생한 후 store에 대한 참조를 받음, Store가 생성될 때 실행
function putGoodsInCartPlugins(store){
  store.subscribe((mutation, state) => {
    // state의 cart값이 변경했을 때, 값이 있었다가 -> 리프레쉬 
    //PUT_GOODS_InCART 호출, 최신 state의 cart 값 + 서버에 저장-> (플러그인을 통해서 작업)localStorage에 저장
    //(리프레쉬 또는 로그 아웃) 최신 state.cart값 localStorage에서 가져오고 
    if(mutation.type === 'PUT_GOODS_InCART'){
      console.log("========= putGoodsInCartPlugins 동작중 =========")
      console.log("putGoodsInCartPlugins내 state.cart ============>", state.cart);
      localStorage.setItem('itemsInCart', JSON.stringify(state.cart));
      // 로컬 스토리지에 가져오는 경우, 로그 아웃 상태 인지 또는 cart의 값이 []이다. -> localStorage.getItem('itemsInCart');
    }
  })
}

export default new Vuex.Store({
  //Store가 생성될 때 실행
  plugins:[putGoodsInCartPlugins],
  state:{
    products:[
      { id: 0, title: 'sm cosmetic', price: 11000, quantity: 0, options: [ { text : '+50ml', value : 0 + "_0", price : 3000, quantity:0 }, {text: '+70ml', value : 0 + "_1",  price: 5000, quantity:0 }]},
      { id: 1, title: '쌔럼', price : 13000, quantity: 0, options: [ {text : '+40ml', value : 1 + "_0", price : 2000, quantity:0 }, {text : '+80ml', value : 1 + "_1",  price : 7000, quantity:0 }]},
      { id: 2, title: '썬크림', price : 12000, quantity: 0, options: [ {text : '+10ml', value : 2 + "_0", price : 2000, quantity:0 }, {text : '+20ml', value : 2 + "_1", price : 7000, quantity:0 }]}
    ],
    selectedProduct: {},
    cart:[],
    menuList:[]
  },
  mutations: {
    setSelectedProduct(state, productId){
      state.selectedProduct = state.products.find(product => product.id.toString() === productId);
    }, 
    PUT_GOODS_InCART(state, prodToBeIncludedInCart){
       // 로컬 스토리지에 가져오는 경우, 로그 아웃 상태 인지 또는 cart의 값이 []이다. -> localStorage.getItem('itemsInCart');
       //string값 반환 
       let ls_itemsInCart = 
       localStorage.getItem('itemsInCart')
        ? JSON.parse(localStorage.getItem('itemsInCart'))
        : [];
       if(ls_itemsInCart.length > 0){
         state.cart = ls_itemsInCart;
       } 
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

    },
    STORE_MENU_LIST(state, menuToBeStoredInMenuList){
      state.menuList = menuToBeStoredInMenuList;
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
      commit('setSelectedProduct', productId);
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
        }).then(res => console.log("카트 저장 성공!!" + JSON.stringify(res)))
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
      commit('GET_ITEMS_FROM_CART', JSON.parse(myItemsInCart.items_cart));
      console.log(this.state.cart)
    },
    async getMenuList({ commit }){
      //## 소셜 로그인 인증 후 메뉴 리스트 가져오기 쿼리
      const menuList = await(
        await fetch('/api/auth/success', {
          method: 'GET'
        })
      ).json();
      console.log("store에서 =============>", menuList);
      commit('STORE_MENU_LIST', JSON.parse(menuList))
    }

  }
})
