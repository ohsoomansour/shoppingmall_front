<template>
  <v-card :style="{ marginTop : '20px'}">
    <v-list>
      <v-card-title >제품 이름 : {{ title }} </v-card-title>
      <v-card-text> 제품 no.{{ id }} </v-card-text>
      <v-card-text> 제품 가격 : {{ price }}</v-card-text>
        <v-list-item
          @click="viewProductDetails(id)"
        >
            <v-list-item-title :style="{ backgroundColor : '#39FF14', borderRadius: '10px'}">제품 상세</v-list-item-title>
        </v-list-item>
    </v-list>
  </v-card>

</template>

<script>
import DetailedProduct from './DetailedProduct.vue';
import { mapState, mapActions } from 'vuex';


export default {
  name : 'ProductList',
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
  components:{
    DetailedProduct
  },  
  computed: {
    ...mapState(['products']),
  },  
  data(){
    return{
      
    }
  },
  methods:{
    ...mapActions(['setSelectedProduct']),
    viewProductDetails(id){
      this.setSelectedProduct(id);
      this.$router.push( {name : 'detailedprod' , params: { id : id} }); 
    },
    

  },  
 
  mounted(){
    console.log("options props  ==========>", this.options);
  }
}


</script>


