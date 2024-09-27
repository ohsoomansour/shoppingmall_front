<template>
  <h1> 회원 관리 </h1>
  <!--회원 검색-->
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          label="Search"
          v-model="keyword"
          clearable
          outlined
        ></v-text-field>
        <v-btn @click="searchUser(this.keyword)" append-icon="mdi-magnify">검색</v-btn>
      </v-col>
    </v-row>
    {{ this.userBySearch }}
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      keyword:"",
      userBySearch: {},
      token:""
    }
  },
  methods:{
    getCookie: function(name){
      //쿠키에서 token 값을 가져옴 x-jwt 이런 식으로 
      let cookie = document.cookie + ";"
      console.log('cookie' + cookie);
      let idx = cookie.indexOf(name, 0);
      let val = "";
      if(idx > -1){
        cookie = cookie.substring(idx, cookie.length);
        let begin = cookie.indexOf("=", 0) + 1; //  eyJhbGciOiJIUzUx...;
        let end = cookie.indexOf(";", begin);   //
        val = cookie.substring(begin, end);
        
      }

      return val;
    },
    async searchUser(keyword){
      this.userBySearch = {};  //그 전 검색 값 -> 현재 검색 값으로 '인식 방지' 
      let userBySearch = await(
        await fetch(`/admin/searchForUsers?keyword=${keyword}`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${this.token}` 
          }
        })
      ).json();
      this.userBySearch = userBySearch;
    }
  },
  mounted(){
    this.token = this.getCookie("token");
    console.log("=========== token was mounted =========");
    console.log(this.token);
  }

}


</script>