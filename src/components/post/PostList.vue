<!-- headers 속성은 테이블의 헤더 정보를 나타내는 배열, 이 배열은 각 열의 헤더 text, 열에 대한 추가 정보   
     items 속성은 테이블에 표시 될 실제 데이터 
     v-slot:text 의미 -  슬롯의 이름을 지정하여 해당 슬롯에 어떤 내용을 렌더링할지 명시1
     prepend-inner-icon="mdi-magnify - 텍스트 필드의 내부 왼쪽에 돋보기 아이콘을 추가
     variant="outlined" - 텍스트 필드를 외곽선 스타일로 설정 (스타일 옵션)
    
  <axios 통신 문제>
  :8088/#/posts:1 Access to XMLHttpRequest at 'http://localhost:8083/api/vuePost/list.do' from origin 
   'http://localhost:8088' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. 

-->

<template>

  <v-container fluid style="color: lightgreen;">
    <!-- <VTreeViewSample ></VTreeViewSample> -->
    <MenuList /> 
    <v-card class="mt-4">
      <v-card-title> 화장품 총판매 실시간 데이터 집계 API 및 배치 개발</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="posts"
        :search="search"
        item-class="text-center"
      >
      </v-data-table>
      <v-btn href="/#/writing" target="_blank" style="background-color: greenyellow;">
        <v-icon left>mdi-open-in-new</v-icon>
        게시 글 작성
      </v-btn>
    </v-card-text>  

    </v-card>
  </v-container>        

</template>
<script>
import MenuList from '@/components/common/MenuList.vue';
import VTreeViewSample from "../common/VTreeViewSample.vue";

export default {
  components:{
    MenuList,
    //VTreeViewSample
  },
  data(){
    return{
      search: '',
      /*part_no, 제품 명, 작성자 등등, ## socket으로 실시간 통신 ->   판매량 집계 ##
        총 판매 집계 -> SELECT COUNT(SALES) AS sales_count * FROM P_SALES 
          - 시나리오1 : 구매 <socket 통신> - 클라이언트에서 new_count=2; -> 서버 총 buy_count += new_count 
            -> 전체 클라이언트(=room에 있는 session아이디 )에 buy_count를 뿌림    
            -> 기능 : 구매 클라이언트(임시) + ***서버 중심*** + ***MVNO 총판매실 실시간 데이터 집계*** 
      */
      posts:[],
      headers:[
        { align:'center', title: 'no',          key: 'p_id',        sortable:true,  },
        { align:'center', title: '제목',        key: 'p_title' },
        { align:'center', title: '작성자',      key: 'u_name' },
        { align:'center', title: '사용자 구분',  key: 'u_type' },
        { align:'center', title: '내용',        key: 'p_contents' },
        { align:'center', title: '작성시간',    key: 'created_at' },
        { align:'center', title: '조회수',      key: 'p_view' }
      ]
    }
  },
  name: 'PostList',
  props:{
      
  },

  methods: {
    
    doGetTotalSales(){
      this.axios
      .get('/api/vuePost/list')
      .then(res => {
        this.posts = res.data.postlist;
        //console.log(res.data.postlist)
      }) 
      .catch(err => console.error(err));
    }
  },
  mounted(){
    this.doGetTotalSales();
  },
}

</script>