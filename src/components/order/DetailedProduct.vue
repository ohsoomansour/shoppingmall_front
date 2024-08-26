<template>
  <h1>CartOrder</h1>
  <v-select
    :items="this.selectedProduct.options"
    item-title="text"
    item-value="value"
    v-model="this.selectedOption"
  >
  </v-select>
  <v-card-actions>
    <v-text-field
      label="Quantity"
      type="number"
      min="1"
      v-model="p_quantities"
      @change="updatePQnt($event)"
    ></v-text-field>  
    <v-btn color="primary" @click="addToCart(product)">Add to Cart</v-btn>
  </v-card-actions>
  <v-row
    v-for="(op, index) in productsBeingSelected.options"
    :key="index"
  > 
    <v-col  class="d-flex flex-row align-center justify-center">
      <v-card-text class="text-h6">{{ op.text }}</v-card-text>
      <v-card-text class="text-h6">{{ op.quantity }}</v-card-text>
      
    </v-col>
    <v-col  class="d-flex align-center justify-end mr-2"  >
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

</template>


<script>
import { mapState, mapActions } from 'vuex';
export default {
  name : 'DetailedProduct',
  props: {
    id:{
      type : String,
      required : true
    },  
    title: {
      type : String,
      required: true
    },
    price:{
      type : Number,
      required: true,

    },
    options: {
      type :Array,
      default: () => []
    }
  },
  data(){
    return{ 
      selectedOption: '', // 각 제품의 선택된 옵션을 저장하는 객체 selectedOption: {},
      productsBeingSelected:{ id: 0, options: [] },
      temp_quantity : 0,
      newSelectedProduct: {},
      newSelectedOp:{},
      p_quantities:0,
      count: 0
    }
  },
  computed: {
    ...mapState(['products']),
    ...mapState(['selectedProduct']),
    
  },
  methods: {
     test(){
      console.log("changed!!!")
     }, 
     delOp(op){
      if (Array.isArray(this.productsBeingSelected.options)) {
        this.productsBeingSelected.options = this.productsBeingSelected.options.filter(opt => opt.value !== op.value);
      } else {
        console.log("productsBeingSelected.options가 정의되지 않았습니다.");
  }
     },
    increaseOpNum(op){
      //바로 this.count 값을 올리고 그 갑을 optiton을 찾아서 -> 일시적 전체 옵션에 더해주는 로직 
      if(!op.quantity){
        op.quantity = 1;
        this.productsBeingSelected.total += op.price * 1
      } else {
        op.quantity += 1;
        this.productsBeingSelected.total += op.price * 1;
      }
      console.log("this.productsBeingSelected ===============>", this.productsBeingSelected);
    },
    decreaseOpNum(op){
      if(op.quantity < 1){
        alert('선택 옵션의 개수가 0개 입니다!');
        return;
      } else {
        op.quantity -= 1;
      }
      console.log("this.productsBeingSelected ===============>", this.productsBeingSelected);
    },
    
    addToCart(product, index){


    },
    updatePQnt(event, productId) {

      console.log("updatePQnt 변경되고 있는 값 ========> ", event.target.value);
      this.p_quantities = parseInt(event.target.value);
      this.productsBeingSelected.quantity = this.p_quantities;
      this.productsBeingSelected.total += (this.productsBeingSelected.price * 1);
      console.log("this.productsBeingSelected =======>", this.productsBeingSelected)
      
    },


  },
  watch: {
  selectedOption:{
    handler(newValue, oldValue) {
      // 제품 아이디(string): newValue.split('_')[0]  = 제품의 이이디를 알 수 있음  
      console.log("새로운 값 변경 ====>", newValue)  //
      if (newValue && typeof newValue === 'string') {
        console.log("newValue.split('_')[0] ====> ", newValue.split('_')[0])
        const productId = newValue.split('_')[0];
        const selectedIntProdId = parseInt(productId);
        const isExistPId = Object.keys(this.productsBeingSelected).includes('title');
        console.log(" isExistPId =============> ", isExistPId);
        if(!isExistPId){
          //없으면 새로 만들어서 넣어주고 
          const selectedProduct = this.products.find(p => p.id === selectedIntProdId);
          this.newSelectedProduct.id = selectedIntProdId;
          this.newSelectedProduct.title = selectedProduct.title;
          this.newSelectedProduct.price = selectedProduct.price;
          this.newSelectedProduct.quantity += this.p_quantities;
          //{ id: 0, title: 'sm cosmetic', price: 11000, quantity: 0,  } // options: [ {id: 0 + "_0", title: '+50ml', value: 3000
          this.productsBeingSelected = this.newSelectedProduct; 
          this.newSelectedProduct = {};
        }
        const selectedOpId =  this.selectedOption; 
        const prodBeingSelected = this.productsBeingSelected;

          //변동 감지 제품의 아이디 0, 1 === 선택되어있는 제품들 0, 1 -> 0 두 번! 
          if(prodBeingSelected.id === selectedIntProdId){
            console.log("옵션 만들어주는 곳 여기 들어와 ???? ")
            if(!Array.isArray(prodBeingSelected.options)){
              prodBeingSelected.options = [];
              const prodInList = this.products.find(prodInlist => prodInlist.id === selectedIntProdId);
              const opInList = prodInList.options.find(opInList => opInList.value === selectedOpId);          

              this.newSelectedOp.text = opInList.text;
              this.newSelectedOp.value = opInList.value;
              this.newSelectedOp.price = opInList.price;
              prodBeingSelected.options.push(this.newSelectedOp);
              this.newSelectedOp = {};
              console.log("product In this.productsBeingSelected ===============>", this.productsBeingSelected);
            } else if(prodBeingSelected.options.length >= 0) {
              // 문제: 아이디 1제품 선택의 경우, ['0'] -> ['0', '1'] 두 번째 0이 여기에서 다시 들어감 그래서 옵션이 한 번 더 들어감 !! 
              // 해결: prod.options에 제품 1이 있어 ? 그러면 return;
              const prodInList = this.products.find(prodInlist => prodInlist.id === selectedIntProdId);
              const opInList = prodInList.options.find(opInList => opInList.value === selectedOpId);          
              
              
              //const isExistProd = prod.id ===  prodInList.id && prod.title === prodInList.title  
              const isExistOp = prodBeingSelected.options.some(opSelected => {
                return opSelected.text === opInList.text && opSelected.value === opInList.value 
              })
              console.log("(방어 코드.2)isExistOp ======>", isExistOp)  // 
              if(isExistOp) return;
              this.newSelectedOp.text = opInList.text;
              this.newSelectedOp.value = opInList.value;
              this.newSelectedOp.price = opInList.price;
              prodBeingSelected.options.push(this.newSelectedOp);
              this.newSelectedOp = {};
              console.log("this.productsBeingSelected ===============>", this.productsBeingSelected);
            }
          }
          //포맷을 만들어주기 위한 리스트에서 옵션을 가져옴  


 
      } else {
        console.log("newValue가 undefined거나 null입니다.");
      } 
      
    },
      deep: true, // 객체 내부의 변화를 감지하기 위해서 deep 옵션을 사용
  }
},  



  mounted() {
    console.log("디테일 프로덕트 props's options =====>", this.options)
  }
}


</script>