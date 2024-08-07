<!-- headers 속성은 테이블의 헤더 정보를 나타내는 배열, 이 배열은 각 열의 헤더 text, 열에 대한 추가 정보   
     items 속성은 테이블에 표시 될 실제 데이터 
     v-slot:text 의미 -  슬롯의 이름을 지정하여 해당 슬롯에 어떤 내용을 렌더링할지 명시1
     prepend-inner-icon="mdi-magnify - 텍스트 필드의 내부 왼쪽에 돋보기 아이콘을 추가
     variant="outlined" - 텍스트 필드를 외곽선 스타일로 설정 (스타일 옵션)
    
     
-->

<template>
  <v-container fluid style="color: lightgreen;">
    <v-card class="">
        <v-card-title>게시판</v-card-title>
        <template v-slot:text>
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
            search: '',
            posts:[
                { p_id: 1, p_title: "첫 번째 게시물", u_name: "사용자1", u_type: "G", p_contents: "게시물 내용1", created_at: "2024-08-01", p_view: 10 },
                { p_id: 2, p_title: "두 번째 게시물", u_name: "사용자2", u_type: "A", p_contents: "게시물 내용2", created_at: "2024-08-02", p_view: 20 }

            ],
            headers:[
              { align:'center', key: 'no',   sortable:false,  title: 'p_id'},
              { align:'center', key: '제목',  title: 'p_title' },
              { align:'center', key: '작성자', title: 'u_name' },
              { align:'center', key: '사용자 구분', title: 'u_type' },
              { align:'center', key: '내용', title: 'p_contents' },
              { align:'center', key: '작성시간', title: 'created_at' },
              { align:'center', key: '조회수', title: 'p_view' },
           ]
          }
        },
        name: 'PostList',
        props:{
           
        },
        mounted(){

        },
        methods: {
            
        }
    }

</script>