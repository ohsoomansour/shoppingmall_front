<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="product.image" height="200px"></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>${{ product.price }}</v-card-text>
          <v-card-actions>
            <v-text-field
              v-model="product.quantity"
              label="Quantity"
              type="number"
              min="1"
              @change="updateQuantity(product)"
            ></v-text-field>
            <v-btn color="primary" @click="addToCart(product)">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

/** 
 * @computed : vuex의 store 'products' 값을 매핑 한다. 
 *             그리고 Products 컴포넌트에서 'products 변수 값'을 UI에서 바로 랜더링
 *             = 컴포넌트의 계산된 속성('computed properties')으로 직접 매핑하는 과정을 의미
 *  - products : [ { id: 0, name: 'sample cosmetic', description : 'best'} ]
 **/
export default {
  data(){
    return{
        
    }
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    /** 
     * @Func : 상품을 미리 담기하는 기능 
     * @param1 : 액션의 이름
     * @param2 : 액션에 전달할 payload => actions의 addToCart를 호출한다. 
     * @dedscription : 이건 새로 담는 상품의 id, name, quantity까지
     * */
    addTodo(product){
      
      this.$store.dispatch('addToCart', product);
    },
    /** 
     * @Func : 기존 담겨져 있는 상품의 양을 store에 업데이트한다.   
     * @param1 : 액션의 이름
     * @param2 : 액션에 전달할 payload . 
     * @dedscription : 이건 새로 담는 상품의 id, name, quantity까지
     * */
    //이 함수는 이미 담겨져있는 상품에 양을 업데이트 
    updateQuantity(product){
      this.$store.dispatch('updateProductQuantity', {id: product.id, quantity: product.quantity })
    }

    /********************************* 방법2 ************************************************** 
     *  ...mapActions(['addToCart', 'updateProductQuantity'])
     *  addToCart(product) {
     * this.addToCart(product);
     * },
     * updateQuantity(product) {
     *   this.updateProductQuantity({ id: product.id, quantity: product.quantity });
     * }
     * **************************************************************************************/
  }
}
</script>
