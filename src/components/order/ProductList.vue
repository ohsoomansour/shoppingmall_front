<!-- 동적으로 카드의 크기를 조정 
  v-slot="{ isHovering, props }"
  호버 관련 속성(예: isHovering, onMouseEnter, onMouseLeave 등) -> v-list-item 구성 요소에 직접 바인딩 
  v-bind="props" 관련된 모든 호버 속성을 자동 v-hover으로 전달한다.  
  v-hover태그는 기본적으로 '그림자 값이 있어서 먹히지 않음 '
-->
<template>
  <v-card 
    cols="8" sm="8" md="6" lg="4"
    :style="{ marginTop : '20px'}"
   >
    <v-list>
      <v-card-title >제품 이름 : {{ title }} </v-card-title>
      <v-card-text> 제품 no.{{ id }} </v-card-text>
      <v-card-text> 제품 가격 : {{ price }}</v-card-text>
        <div :style="{ borderRadius: '30px', overflow: 'hidden', margin: '0 100px' }">
        <v-hover
          v-slot="{ isHovering, props }"
          close-delay="200"
        >  
          <v-list-item
            @click="viewProductDetails(id)"
             v-bind="props"  
            :style="{ 
                backgroundColor : '#39FF14',
                borderRadius: '30px',
                overflow: 'hidden',
                padding: isHovering ? '20px' : '10px'
              }"
          >
          <!-- isHovering은 마우스가 위에 있는지 감지하는 변수, props는 -->
            <v-list-item-title 
              :class="{'on-hover': isHovering }"     
              :style="{ 
                fontWeight: 'bolder',   
              }"
            >
             제품 상세
            </v-list-item-title>
          </v-list-item>
      </v-hover>    
      </div>  
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


