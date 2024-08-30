<!-- Property "my_items" was accessed during render but is not defined on instance -->
<template>
  <div>
    <h1>카트에 담은 아이템 리스트</h1>
    <v-card v-if="isLoading">Loading...</v-card>
    <v-card v-if="isError">{{ error.message }}</v-card>
    <v-card v-if="data.length > 0" >
      <ul>
        <li v-for="item in data" :key="item.id">{{ item.title }}</li>
      </ul>
    </v-card>
    
  </div>

</template>

<script>
import { useQuery } from '@tanstack/vue-query';
import { useStore } from 'vuex';
import { mapState, mapActions } from 'vuex';
import { computed } from 'vue';
//
/**
 * @mapActions :  ...mapActions(['getItemsFromCart'])를 사용해서 useQuery(['myitems', this.getItemsFromCart]); 사용은 적절하지 않음 
 *   -  this(vuex 인스턴스)는 컴포넌트가 초기화 되기 전에 호출 : this.getItemsFromCart 에러 -> useQuery 에러  
 */

export default {
  name: 'MyShoppingItems',
  data(){
    return{
      test: []
    }
  },
  computed: {
    ...mapState(['cart'])
  },
  setup(){
  // Vuex store에 접근
  const store = useStore();
  // Vuex 액션을 호출하는 함수
  const fetchItemsFromCart = async() => {
    await(
      await store.dispatch('getItemsFromCart')
    )
    return store.state.cart;
  }

  //const items = data ? data._object.data : [];
  //DOC : https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
  const {data, error, isLoading, isError} = useQuery({queryKey : ['myitems'], queryFn : fetchItemsFromCart });

  console.log("data =========>", data);
  //console.log("this.cart =========>", this.cart);
  return {
    data,
    error,
    isLoading,
    isError
  }

  },
   

}


</script>