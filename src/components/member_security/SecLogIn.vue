<!-- #Vuetify 개념
    vuetify는  12 구획으로 나누어진 그리드 시스템을 지원 + 5 가지 유형의 매체 타입
    <v-container fluid> 중앙 중심의 페이지  전체 너비를 이용할 경우 'fluid 속성' 적용
      <v-layout>  각 섹션을 분리하는데 사용
        <v-flex>
        </v-flex>
        <v-flex>
        </v-flex>
      </v-layout>
    </v-container> 
    # <v-col md="6" >  
    - 해석: md 이전: 12그리드 / 화면이 md사이즈(=768픽셀에서 X 991픽셀) 이상에서 12 그리드 중 6그리드를 차지한다.
    # <v-col sm="6" > 
    - 해석 : 화면의 sm 사이즈(=576픽셀에서 767픽셀 사이) 전은 12그리드 / sm 이상은 6grid 
    # <v-col sm="4" > 
    - 해석 : 화면의 sm 사이즈(=576픽셀에서 767픽셀 사이) 전은 12그리드 / sm 이상은 4grid 

    10.7 git desktopTest!!!!!
-->
<template>
<v-app>
  <v-content>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-title class="headline text-center">
              <b>ShoppingMall</b>
            </v-card-title>
            <v-card-subtitle class="text-center">로그인</v-card-subtitle>
            <v-form ref="form" @submit.prevent="doLogin">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                     ref="u_email"
                      v-model="u_email"
                      label="아이디"
                      placeholder="아이디"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      ref="u_pw"
                      v-model="u_pw"
                      label="비밀번호"
                      placeholder="비밀번호"
                      outlined
                      dense
                      type="password"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-btn
                      color="primary"
                      block
                      @click="doLogin"
                      title="로그인"
                    >
                      로그인
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    
                    <v-btn color="grey lighten-3" @click="dialog = true">
                      비밀번호 찾기
                    </v-btn>
                  </v-col>
  
                </v-row>
                <v-row>  
                  <v-col>
                  <v-btn @click="googleAuth" class="social-btn google-btn" block >
                      <v-col class="text-left">
                          <v-icon left class="social-icon">mdi-google</v-icon> 
                      </v-col>
                      <v-col class="ml-10">
                          <span class=" font-weight-bold">구글 계정</span>
                      </v-col>
                    </v-btn>
                  </v-col>
                </v-row>  
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <!-- 팝업창(다이얼로그) -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">
            비밀번호 발급을 위해 이메일 계정을 입력하세요.
          </v-card-title>
          <v-card-text>
           <v-text-field v-model="emailToFindPw">
           </v-text-field>
           <v-btn
            style="background-color: greenyellow; font-weight: bold"
            @click="findPw"
           > 비밀번호 발급 
           </v-btn>
          </v-card-text>
          <v-card-actions>
            <!-- 팝업 닫기 버튼 -->
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-container>
  </v-content> 
</v-app>
</template>

<script>
//import { useStore } from 'vuex';
import store from '@/store/store';

export default {
  data() {
    return {
      token: null,
      dialog: false, // 팝업창 열림 여부를 제어하는 데이터
      emailToFindPw:"",
      u_email: '',
      u_pw: '',
      token: '',
      gourl: '/'
    };
  },
  methods: {
    async googleAuth(e){
      let accessToken = this.getCookie("accessToken");
      console.log(accessToken);
      if(accessToken.length > 0 ){
        console.log("this.accessToken =====> ", accessToken);
        //accesToken이 존재할 경우
        const res = 
        await(
          await fetch("/api/sec/login",{
          method: 'POST',
          headers:{
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${accessToken}`,
          body: JSON.stringify({
            login_id: "",
            password: "",
            login_type:2
          })
        }})
        ).json()
        console.log("google 로그인 ==========================>", res);
        if(res.message === "Authentication successful"){
          window.location.href = "/#/products"
        }
        console.log("result ===> ", res);
      } else { 
        window.location.href="http://localhost:8080/oauth2/authorize/google";
      }
    },
    popUpToFindPW(){
      
    },
    findPw(){
      //popup 창 -> user의 u-email -> pw찾기 api 
      let formData =  new FormData();
      formData.append("email", this.emailToFindPw);
      this.axios
      .post("/api/send-mail/password", formData, {
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      .then(res => alert(JSON.stringify(res.data)))
    },
    alertPopupFocus(message, ref) {
      console.log("===========>" + ref); //u_email , u_pw
      alert(message);
      //let ref = ref;
      this.$refs[ref].focus(); // #다른 방법: this.#refs.u_email.focus(); 
    },
    setCooke: function(name, value, day){
      let today = new Date();
      today.setDate(today.getDate() + day); 
      document.cookie = name + "=" + value + "; path=/; expires=" + today.toUTCString() + ";"           
      console.log("document.cookie:"  + document.cookie);
      },
    getCookie: function(name){
      //쿠키에서 token 값을 가져옴 x-jwt 이런 식으로 
      let cookie = document.cookie + ";"
      console.log('cookie :' + cookie);
      let idx = cookie.indexOf(name, 0);  // name이 처음 등장하는 위치 
      let val = "";
      console.log('idx:: ' + idx);
      if(idx > -1){
        cookie = cookie.substring(idx, cookie.length);   
        let begin = cookie.indexOf("=", 0) + 1; // accessToken=eyJhbGciOiJIUzUx...;
        let end = cookie.indexOf(";", begin);   //
        val = cookie.substring(begin, end).trim();
      }
        console.log("val::" + val);
        return val;
    },
    doLogin() {
      if (this.u_email.trim() === '') {
        this.alertPopupFocus('아이디를 입력해 주세요.', 'u_email'); 
        return false;
      } else if (this.u_pw.trim() === '') {
        this.alertPopupFocus('비밀번호를 입력해 주세요.', 'u_pw');
        return false;
      }

      console.log("===========>" + this.u_email);
      console.log("================> " + this.u_pw);
      /**/ 
      let formData = new FormData();
      formData.append("login_id", this.u_email);
      formData.append("password", this.u_pw);

      let data = {
        login_id: this.u_email,
        password: this.u_pw
      };
      let jwt = this.getCookie("token");
      console.log("jwt ====> " + this.getCookie("token"));
      if(jwt.length > 0){
        this.token = this.getCookie("token");
      } else {
        this.token = "TokenDoesNotExist";
      }
      this.axios.post('/api/sec/login', data, {
        headers: {
          'Content-Type': 'application/json',      //'application/x-www-form-urlencoded', // 
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => {
        console.log('===================== 로그인 성공 ===============');
        console.log(response.data);
        console.log(response)
        if(response.statusText === "OK"){
          this.setCooke("token", response.data.token, 1);

          store.state.authority = response.data.authorities;
          console.log("store's authority", store.state.authority);
          //this.setCooke("authorities", response.data.authorities, 1); // ["ROLE_ADMIN"] 또는 ["ROLE_CUSTOMER"] => 쿠키는 문자열만 저장 
          window.location.href="/#/products"
        } else {
          alert("아이디 혹은 비밀번호가 잘못 되었습니다")
        }

      }).catch(error => {
        console.log(error);
      });
    },
  },
  mounted(){
    console.log(this.getCookie("accessToken"));
    /*
    let token = this.getCookie("accesToken");
    if(typeof token === "string"){
      console.log("accessToken is string ");
    } */
  }

};
</script>
