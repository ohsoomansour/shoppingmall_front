<template>
  <p>Google 로그인 인증 완료! What's Up!</p>

</template>

<script>
import { useQuery } from '@tanstack/vue-query';
import { mapState, useStore } from 'vuex';

 /**
  *@Date : 24.10.8
  *@setup : Vuex와 같은 외부 상태 접근 가능
   - setup() 내에서 Vuex 스토어, 라우터, 컴포넌트 간 'props' 등을 접근할 수 있습니다. 다음은 useStore()로 Vuex 스토어에 접근하고 있다.
  */
export default {
  data(){

  },
  computed: {
    ...mapState(['menuList'])
  },
  setup(){
    const store = useStore();
    const fetchMenuList =  async () => {
      await (
        await store.dispatch('getMenuList')
      )
      return store.state.menuList;

    }
    const {data, error, isLoading, isError } = useQuery({queryKey: ['myIems'], queryFn: fetchMenuList });
    console.log('OAuth2_AuthSuccess에서 useQuery의 반환 data값 ==========> ', data);
    return {
      data,
      error,
      isLoading,
      isError
    }
  }
  
  
}

</script>