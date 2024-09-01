<template>
  
  <v-container>
    <v-col style="">
      <ProductList
        v-for="(product, index) in this.products"
        :key="index" 
        :id="product.id.toString()"
        :title="product.title"
        :price="product.price"
        :options="product.options"
      >
      </ProductList>  
    </v-col>

  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductList from "./ProductList.vue"

/** 
 * @computed : vuex의 store 'products' 값을 매핑 한다. 
 *             그리고 Products 컴포넌트에서 'products 변수 값'을 UI에서 바로 랜더링
 *             = 컴포넌트의 계산된 속성('computed properties')으로 직접 매핑하는 과정을 의미
 *  - products : [ { id: 0, name: 'sample cosmetic', description : 'best'} ]
 **/


export default {
  components:{
    ProductList
  },
  data(){
    return{ 
      temp_quantity : 0,
      newSelectedProduct: {},
      quantities:{},
      selectedOption: '', // 각 제품의 선택된 옵션을 저장하는 객체 selectedOption: {},
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

  },
  watch: {
  
},
  mounted(){

  }
}
</script>