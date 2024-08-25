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
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="product.image" height="200px"></v-img>
          <v-card-text class="text-subtitle-1">화장품 id: {{ product.id }}</v-card-text>
          <v-card-title class="text-h6">화장품 이름: {{ product.title }}</v-card-title>
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
              :key="product.id"
              :items="product.options"
              item-title="title"
              item-value="id"
              v-model="this.selectedOption"
              hint="Pick your favorite option"
              persistent-hint
            >
            </v-select>
          <v-row 
            v-for="(prod, index) in this.productsBeingSelected" 
            :key="index"
            >       
            <v-row
              v-for="(op, index) in prod.options"
              :key="index"
            > 
            <v-col v-if="op.id.split('_')[0] === (product.id + '')" class="d-flex flex-row align-center justify-center">
              <v-card-text class="text-h6">{{ op.title }}</v-card-text>
              <v-card-text class="text-h6">{{ op.quantity }}</v-card-text>
            </v-col>
            <v-col v-if="op.id.split('_')[0] === (product.id + '')"  class="d-flex align-center justify-end mr-2"  >
              <v-btn @click="decreaseOpNum(op)" class="mr-2" style="background-color: greenyellow;">-</v-btn>
              <v-btn @click="increaseOpNum(op)" class="mr-2" style="background-color: greenyellow;">+</v-btn>
              <v-btn @click="delOp(op)" style="background-color: #FF0003;">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              </v-btn>
            </v-col>
            </v-row>
          </v-row>
          
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
    //Order
  },
  data(){
    return{ 
      temp_quantity : 0,
      newSelectedProduct: {},
      quantities:{},
      selectedOption: {}, // 각 제품의 선택된 옵션을 저장하는 객체 selectedOption: {},
      newSelectedOp:{},
      count: 0
    }
  },
  computed: {
    ...mapState(['products']),
    ...mapState(['productsBeingSelected']), 
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
     *  #방법1. cart 에 바로 넣는 방법 
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
      } 
     * */
     checkCondition(op, product) {
      console.log('op.id SplitVal:', op.id.split('_')[0], 'product.id:', product.id, 'condition:', op.id.split('_')[0] === String(product.id));
      return op.id.split('_')[0] === String(product.id);
    },
     delOp(op){
      const prodIdToDel = op.id.split('_')[0];
      let prodInPbs = this.productsBeingSelected.find(prod => prod.id === parseInt(prodIdToDel));
      prodInPbs.options = prodInPbs.options.filter(opt => opt.id !== op.id);
     },
    increaseOpNum(op){
      //바로 this.count 값을 올리고 그 갑을 optiton을 찾아서 -> 일시적 전체 옵션에 더해주는 로직 
      if(!op.quantity){
        op.quantity = 1;
      } else {
        op.quantity += 1;
      }
    },
    decreaseOpNum(op){
      if(op.quantity < 1){
        alert('선택 옵션의 개수가 0개 입니다!');
        return;
      } else {
        op.quantity -= 1;
      }
    },
    
     addToCart(product, index){


    },
    updatePQnt(event, productId) {

      console.log("변경되고 있는 값 ========> ", event.target.value);
      this.temp_quantity = event.target.value;
    },


  },
  watch: {
  selectedOption: {
    handler(newValue, oldValue) {
      // 제품 아이디(string): newValue.split('_')[0] -  옵션 아이디 
      if (newValue ) {
        console.log("새로운 값 변경 ====>", newValue)  //
        console.log("newValue.split('_')[0] ====> ", newValue.split('_')[0])
        const productId = newValue.split('_')[0];
        const selectedIntProdId = parseInt(productId);
        const resIndex = this.productsBeingSelected.findIndex(prod => prod.id === selectedIntProdId);
        
        console.log("resIndex ======>", resIndex)
        if(resIndex === -1){
          //없으면 새로 만들어서 넣어주고 
          const selectedProduct = this.products.find(p => p.id === selectedIntProdId);
          this.newSelectedProduct.id = selectedIntProdId;
          this.newSelectedProduct.title = selectedProduct.title;
          this.newSelectedProduct.price = selectedProduct.price;
          this.newSelectedProduct.quantity += this.quantities[selectedIntProdId];
          //{ id: 0, title: 'sm cosmetic', price: 11000, quantity: 0,  } // options: [ {id: 0 + "_0", title: '+50ml', value: 3000
          this.productsBeingSelected.push(this.newSelectedProduct); 
          this.newSelectedProduct = {};
        }
        const selectedOpId =  this.selectedOption; 
        this.$store.state.productsBeingSelected.forEach((prod) => {     //집어 넣은 프로덕트  === 선택한 프로적트
          //변동 감지 제품의 아이디 0, 1 === 선택되어있는 제품들 0, 1 -> 0 두 번! 
          if(prod.id === selectedIntProdId){
            if(!Array.isArray(prod.options)){
              prod.options = [];
              const prodInList = this.products.find(prodInlist => prodInlist.id === selectedIntProdId);
              const opInList = prodInList.options.find(opInList => opInList.id === selectedOpId);          

              this.newSelectedOp.id = opInList.id;
              this.newSelectedOp.title = opInList.title;
              this.newSelectedOp.value = opInList.value;
              prod.options.push(this.newSelectedOp);
              this.newSelectedOp = {};
              console.log("product In this.productsBeingSelected ===============>", prod);
            } else if(prod.options.length >= 0) {
              // 문제: 아이디 1제품 선택의 경우, ['0'] -> ['0', '1'] 두 번째 0이 여기에서 다시 들어감 그래서 옵션이 한 번 더 들어감 !! 
              // 해결: prod.options에 제품 1이 있어 ? 그러면 return;
              console.log("prod.id value, type ==>",prod.id, typeof prod.id)
              const prodInList = this.products.find(prodInlist => prodInlist.id === selectedIntProdId);
              const opInList = prodInList.options.find(opInList => opInList.id === selectedOpId);          
              
              
              //const isExistProd = prod.id ===  prodInList.id && prod.title === prodInList.title  
              const isExistOp = prod.options.some(opSelected => {
                return opSelected.id === opInList.id && opSelected.title === opInList.title
              })
              console.log("(방어 코드.2)isExistOp ======>", isExistOp)  // 
              if(isExistOp) return;
              this.newSelectedOp.id = opInList.id;
              this.newSelectedOp.title = opInList.title;
              this.newSelectedOp.value = opInList.value;
              prod.options.push(this.newSelectedOp);
              this.newSelectedOp = {};
              console.log("this.productsBeingSelected ===============>", this.productsBeingSelected);
            }
          }
          //포맷을 만들어주기 위한 리스트에서 옵션을 가져옴  

        })
 
      } else {
        console.log("newValue가 undefined거나 null입니다.");
      } 
      
    },
      deep: true, // 객체 내부의 변화를 감지하기 위해서 deep 옵션을 사용
  }
},
  mounted(){

  }
}
</script>
