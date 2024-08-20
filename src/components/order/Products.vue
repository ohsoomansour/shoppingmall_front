<!-- @Input  
   input 이벤트가 발생할 때 실행할 메서드를 연결하는 역할
   :value = "product.quantity" 는 product.quantity의 값이 input의 값으로 바인딩하는 것이다. 즉, defaultValue 같은 거 
   /********************************* 방법2 ************************************************** 
     *  ...mapActions(['addToCart', 'updateProductQuantity'])
     *  addToCart(product) {
     * this.addToCart(product);
     * },
     * updateQuantity(product) {
     *   this.updateProductQuantity({ id: product.id, quantity: product.quantity });
     * }
     * ************************************************************************************* */
   ### v-model의 이해 ### 
   $event.target.value와 동일 + 양쪽 바인딩 
   1) 단일 선택의 경우
    selectedOptions: {
     1: 'optionA', // product.id가 1인 경우, 'optionA'가 선택됨
     2: 'optionB'  // product.id가 2인 경우, 'optionB'가 선택됨
   }    
   2) 다중 선택의 경우
    selectedOptions: {
     1: ['optionA', 'optionC'],
     2: ['optionB']           
   }  
   
-->

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(product, index) in this.$store.state.products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="product.image" height="200px"></v-img>
          <v-card-text class="text-subtitle-1">화장품 id: {{ product.id }}</v-card-text>
          <v-card-title class="text-h6">화장품 이름: {{ product.name }}</v-card-title>
          <v-card-text class="text-subtitle-1">화장품 가격: ${{ product.price }}</v-card-text>
          <v-card-actions>
            <v-text-field
              label="Quantity"
              type="number"
              min="1"
              v-model="quantities[product.id]"
              @input="updatePQnt($event, product.id)"
            ></v-text-field>
            
            
            <v-btn color="primary" @click="addToCart(product)">Add to Cart</v-btn>
          </v-card-actions>
            <v-select
              label="Select an option"  
              :items="product.options"
              item-title="title"
              item-value="value"
              v-model="selectedOptions[product.id]"
              hint="Pick your favorite option"
              persistent-hint
            >
            </v-select>
          <Order />
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Order from '@/components/order/Order.vue';

/** 
 * @computed : vuex의 store 'products' 값을 매핑 한다. 
 *             그리고 Products 컴포넌트에서 'products 변수 값'을 UI에서 바로 랜더링
 *             = 컴포넌트의 계산된 속성('computed properties')으로 직접 매핑하는 과정을 의미
 *  - products : [ { id: 0, name: 'sample cosmetic', description : 'best'} ]
 **/
export default {
  components:{
    Order
  },
  data(){
    return{ 
      temp_quantity : 0,
      quantities: {},
      options:[],

      selectedOptions: {}, // 각 제품의 선택된 옵션을 저장하는 객체
      quantities: {},
    }
  },
  computed: {
    ...mapState(['products']), 
    ...mapState(['cart'])
  },
  methods: {
    /** 
     * @Func : 상품을 미리 담기하는 기능 
     * @param1 : 액션의 이름
     * @param2 : 액션에 전달할 payload => actions의 addToCart를 호출한다. 
     * @dedscription : 이건 새로 담는 상품의 id, name, quantity까지
     * @단방향binding : ##########:value 또는 @input  ###################
     *  :vaule는 데이터 -> UI 는 데이터를 가져와서 해당 요쇼의 value 속성에 설정 
     * 
     * */
     addToCart(product, index){
      console.log("=====> ", this.selectedOptions);
      /*#방법1. cart 에 바로 넣는 방법 
      const cart = this.$store.state.cart;
      const itemInCart = cart.find(item => item.id === product.id);
      console.log("itemInCart ======>" ,itemInCart)
      if(!itemInCart){
        product.quantity = parseInt(this.temp_quantity);
        this.$store.state.cart.push(product);
        console.log("첫 cart에 담은 items ======> ", this.$store.state.cart);
      } else {
        console.log("========== 카트에 존재한다면 수량 추가 후 그 아이템: ===========")
        const quantityToAdd = parseInt(this.temp_quantity, 10) || 0; 
        itemInCart.quantity += quantityToAdd;
        console.log(itemInCart.quantity)
        console.log(this.$store.state.cart);
      } */
      
      const temp_qnt = this.temp_quantity;
      this.$store.dispatch('addToCart', {product, temp_qnt}).then(() => {
        alert(`${product.name}를 ${this.temp_quantity}개를 담았습니다!`)
        this.temp_quantity = 0;
        this.quantities[product.id] = 0; 
      }).catch((e) => {
        console.error('Error adding to cart:', error);
      })
    },
    updatePQnt(event, productId) {

      console.log("변경되고 있는 값 ========> ", event.target.value);
      this.temp_quantity = event.target.value;
    },

  },
  
  mounted(){
    //this.$store.dispatch('setProducts');
  }
}
</script>
