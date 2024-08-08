<!-- headers 속성은 테이블의 헤더 정보를 나타내는 배열, 이 배열은 각 열의 헤더 text, 열에 대한 추가 정보   
     items 속성은 테이블에 표시 될 실제 데이터 
     v-slot:text 의미 -  슬롯의 이름을 지정하여 해당 슬롯에 어떤 내용을 렌더링할지 명시1
     prepend-inner-icon="mdi-magnify - 텍스트 필드의 내부 왼쪽에 돋보기 아이콘을 추가
     variant="outlined" - 텍스트 필드를 외곽선 스타일로 설정 (스타일 옵션)
    
     
-->

<template>
  <v-container fluid style="color: lightgreen;">
    <v-card class="">
      <template v-slot:text>
          <v-card-title>MVNO 총판매실 실시간 데이터 집계 API 및 배치 개발</v-card-title>
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
          >

          </v-data-table>
        </template>
    </v-card>
  </v-container>        

</template>
<script>
    export default {
        data(){
          return{
            test : 'testing..',
            search: '',
            /*part_no, 제품 명, 작성자 등등, ## socket으로 실시간 통신 ->   판매량 집계 ##
              총 판매 집계 -> SELECT COUNT(SALES) AS sales_count * FROM P_SALES 
               - 시나리오1 : 구매 <socket 통신> - 클라이언트에서 new_count=2; -> 서버 총 buy_count += new_count 
                 -> 전체 클라이언트(=room에 있는 session아이디 )에 buy_count를 뿌림    
                 -> 기능 : 구매 클라이언트(임시) + ***서버 중심*** + ***MVNO 총판매실 실시간 데이터 집계*** 
            */
            posts:[
                { p_id: 1, p_title: "첫 번째 게시물", u_name: "사용자1", u_type: "G", p_contents: "게시물 내용1", created_at: "2024-08-01", p_view: 10 },
                { p_id: 2, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 3, p_title: "첫 번째 게시물", u_name: "사용자1", u_type: "G", p_contents: "게시물 내용1", created_at: "2024-08-01", p_view: 10 },
                { p_id: 4, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 5, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 6, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 7, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 8, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 9, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 10, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 11, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 12, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 13, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 14, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 15, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 16, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },
                { p_id: 17, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 },


            ],
            headers:[
              { align:'center', text: 'no',          value: 'p_id',        sortable:true,  },
              { align:'center', text: '제목',        value: 'p_title' },
              { align:'center', text: '작성자',      value: 'u_name' },
              { align:'center', text: '사용자 구분',  value: 'u_type' },
              { align:'center', text: '내용',        value: 'p_contents' },
              { align:'center', text: '작성시간',    value: 'created_at' },
              { align:'center', text: '조회수',      value: 'p_view' },
           ]
          }
        },
        name: 'PostList',
        props:{
           
        },
        mounted(){
          console.log('MVNO 총판매실 실시간 데이터 집계 랜더링 OK!!');
        },
        methods: {
          
          doGetTotalSales(){
            
          }
        }
    }

</script>