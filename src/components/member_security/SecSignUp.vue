<!-- 
  @blur :  blur 이벤트는 사용자가 텍스트 필드의 입력을 마치고 포커스를 잃을 때 발생
         이 경우 checkDuplicateId라는 메서드가 호출됩니다. 
          보통 이 메서드는 서버에 요청을 보내서 입력된 아이디가 이미 사용 중인지 확인
  
  <v-select
    label="도메인 선택"
    v-model="selectedDomain"
    :items="emailDomains"
    ></v-select> 
  에서 @change가 작동하지 않아도 그냥 this.selectedDomain 값을 확인하면 업데이트 되고 있음 따라서 change 이벤트를 별도로 할 필요 없음 

  #v-form  태그의 v-model="valid"는 유효성을 나타냄
   - rules 가 한 개 이상 false이면 -> v-form 태그의 v-model 값은 false이다.  
-->
<template>
    <v-container>
      <v-form ref="form" v-model="valid">
        <!-- 회원정보입력 -->
        <v-card>
          <v-card-title class="headline">회원정보입력</v-card-title>
          <v-text-field style="display: none;" v-model="login_type">login_type 기본 0</v-text-field>
          <v-card-text>
            <!-- 회원유형 -->
            <v-radio-group v-model="authority" row @change="authorChange">
              <v-radio label="관리자" value="ADMIN"></v-radio>
              <v-radio label="기업 계정" value="BIZ"></v-radio>
              <v-radio label="일반 고객" value="CUSTOMER"></v-radio>

            </v-radio-group>
            
            <!-- 아이디 -->
            <v-text-field
              v-model="login_id"
              label="아이디"
              required
              @blur="checkDuplicateId" 
              :rules="[v => !!v || '아이디는 필수입니다.']"
            ></v-text-field>
            <v-btn color="indigo" @click="checkDuplicateId">
              중복확인
            </v-btn>
            <v-alert v-if="idCheckResult" :type="idCheckResult.type">
              {{ idCheckResult.message }}
            </v-alert>

            <!-- 비밀번호 -->
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="[validatePassword]"
              required
            ></v-text-field>
            <!-- 비밀번호 확인 -->
            <v-text-field
              v-model="passwordConfirm"
              label="비밀번호 확인"
              type="password"
              :rules="[validatePasswordConfirm]"
              required
            ></v-text-field>
            <!-- 이름 -->
            <v-text-field
              v-model="user_name"
              label="이름"
              required
              :rules="[v => !!v || '이름은 필수입니다.']"
            ></v-text-field>
            <!-- 이메일 -->
            <v-row>
              <v-col>
                <v-text-field
                  v-model="biz_email1"
                  label="이메일"
                  :rules="[v => !!v || '이메일은 필수입니다.']"
                ></v-text-field>
              </v-col>
              <v-col sm="2" >
                <v-text-field 
                  v-model="golbaeng"
                  readonly  
                  class="center-text"  
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-if="this.selectedDomain === '직접 입력'"
                  v-model="w_emailDomain"
                  label="도메인 직접입력"
                  :rules="[v => !!v || '도메인은 필수입니다.']"
                  
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  label="도메인 선택"
                  v-model="selectedDomain"
                  :items="emailDomains"
                ></v-select>
              </v-col>
              <v-col>
                {{ this.selectedDomain}}
                <v-btn @click="getAuthNum" style="background-color: greenyellow; font-weight: bold">이메일 인증 </v-btn>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="authNum"
                  @keyup="onAuth"
                >
                </v-text-field>
              </v-col>  
            </v-row>
            <v-alert v-if="idCheckResult" :type="idCheckResult.type">
              {{ idCheckResult.message }}
            </v-alert>
            <v-alert v-if="emailAuthResult" :type="emailAuthResult.type">
                {{ emailAuthResult.message }}
            </v-alert>
            <!-- 휴대전화 번호 -->
            <v-text-field
              v-model="u_ph"
              label="휴대전화 번호"
              required
              :rules="[validatePhoneNumber]"
            ></v-text-field>

            <!-- 주소 -->
            <v-col class="text-left">
              <v-btn @click="execDaumPostcode" class="green lighten-3" color="indigo" >우편번호 찾기</v-btn>
            </v-col>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="postalCode"
                  label="우편번호"
                  readonly
                  style="text-align: center;"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="address"
                  label="주소"
                  readonly
                  :rules="[v => !!v || '주소는 필수입니다.']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="detailAddress"
              label="상세주소"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="register" :disabled="!valid">회원가입</v-btn>
            <v-btn @click="cancel">취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
    

</template>


<script>

export default {
  data() {
    return {
      authNum: "",
      rec_authNum : "",
      emailAuthResult : null,
      valid: false,
      authority: "",
      login_type: 0,
      login_id: "",
      password: "",
      address: "",
      golbaeng:"@",
      user_name: "",
      email: "",
      email_verified: false,
      passwordConfirm: "",
      biz_email1: "",
      detailAddress: "",
      postalCode: "",
      u_ph: "",
      w_emailDomain: "",
      selectedDomain: "선택 입력",
      emailDomains: ["직접 입력", "naver.com", "gmail.com", "daum.net", "hanmail.net", "empas.com", "yahoo.com"],
      idCheckResult: null,
    };
  },
  name : 'signup',
  methods:{
    authorChange(e){
        this.authorities = e.target.value;
        console.log("this.authorities=======> " + this.authorities);
    },
    onAuth(){
      console.log("authNum ===> " + this.authNum);
      console.log("rec_authNum ===>" + this.rec_authNum);

      if(this.authNum === this.rec_authNum){
        this.email_verified = true;
        this.emailAuthResult = { type:"success", message: "인증 성공!" };
        
      } else {
        this.emailAuthResult = { type:"error", message: "이메일 인증에 실패하였습니다!" };
      }
    },
    getAuthNum(){
      console.log("===== 선택된 도메인======>" + this.selectedDomain)
      console.log(" 전송된 이메일 =========>" + this.biz_email1+"@"+this.selectedDomain);
      let formData = new FormData();
      let domain="";
      if(this.selectedDomain === "선택 입력"){
        alert("도메인을 선택하세요! ");
        return;
      } else {
        domain = this.selectedDomain;
      }
      if (this.selectedDomain === "직접 입력"){
        domain = this.w_emailDomain;
      } 
      formData.append("email", this.biz_email1 + "@" + domain);
      this.email = this.biz_email1 + "@" + domain;
      this.axios
      .post("/api/send-mail/email", formData, {
        headers:{
         'Content-Type' : 'application/json', //'application/json' //'multipart/form-data'
         'Authorization' : `Bearer ${"email_test"}`
        }
      }) //c
      .then(res => {
        this.rec_authNum = res.data.authNum;
      })
    },
    directDomain(){
      console.log("================= directDomain======")
    },
    validatePassword(v) {
      return (
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,16}$/.test(v) ||
        "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상 16자 이하로 설정해주세요."
      );
    },
    validatePasswordConfirm(v) {
      console.log("validatePasswordConfirm's v 확인 =========================>" + v) 
    },
    validatePhoneNumber(v) {
      return /^\d+$/.test(v) || "숫자만 입력 가능합니다.";
    },
    SelectDomain(e) {
      //console.log("event", e)
    },
    execDaumPostcode() {
      // Daum 주소 API 연동
      new daum.Postcode({
        oncomplete: (data) => {
          this.postalCode = data.zonecode;
          this.address = data.roadAddress || data.jibunAddress;
          this.$nextTick(() => {
            this.$refs.detailAddress.focus();
          });
        },
      }).open();
    },
    checkDuplicateId() {
      // 아이디 중복 체크 
      if (!this.login_id) {
        this.idCheckResult = { type: "error", message: "아이디를 입력해주세요." };
        return;
      }
      this.axios
        .post('/api/sec_user/userDuplicCheck.do', {
            gubun:"ID",
            login_id: this.login_id,
          },
          {
            headers: {
            'Authorization': `Bearer ${"test"}` // JWT 토큰을 여기에 포함
          }
          }
        )
        .then(res => {
          let user_count = res.data;
          console.log("================= 중복 아이디 확인 ==================== ", res );
          
          if(user_count === 0){
            this.idCheckResult = { type:"success", message: "사용 가능한 아이디입니다." };

          } else if(user_count > 0) {
            this.idCheckResult = { type: "warning", message: "이미 존재하는 아이디입니다." };
          }
        });
      
    },
    register() {
      if (!this.$refs.form.validate()) {
        return;
      }
      /*
         @ModelAttribute는 기본적으로 multipart/form-data나 application/x-www-form-urlencoded 방식으로 전달되는 값을 처리   
         JSON.stringify()로 변환된 문자열은 '단순 텍스트'로 처리되기 때문에 제대로 매핑되지 않습니다.   
      */
      let formData = new FormData();
      console.log("login_id =====> " + this.login_id)
      console.log("password ====> " + this.password);
      console.log("email =====> " + this.email);
      console.log("this.email_verified ====> " + this.email_verified);
      console.log("JSON.stringify([this.authorities] ====>" + JSON.stringify([this.authorities]));
      console.log("address======>" +  JSON.stringify(this.address));
      console.log("user_name ======>" + JSON.stringify(this.user_name));
      console.log("u_ph======>" + JSON.stringify(this.u_ph));
      formData.append("login_id",  this.login_id);
      formData.append("login_type", this.login_type);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("email_verified", this.email_verified);  // false 나오는 상태 
      formData.append("authority", this.authority) // **주의: 폼 데이터는 ["ROLE_ADMIN"] -> "ROLE_ADMIN" 이렇게 인식함 
      formData.append("address", this.address);
      formData.append("user_name", this.user_name);
      formData.append("u_ph", this.u_ph);
      this.axios
        .post("/api/sec_user/join", formData
        ,{
          headers:{
            'Content-Type' : 'multipart/form-data', //application/json
            'Authorization' : `Bearer ${"join_test"}`
          }
        }).then(res => {
          if(res.data >= 1){
            //window.location.href = "login"
          }
        });
           
      alert("회원가입이 완료되었습니다.");
    },
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.v-card {
  max-width: 800px;
  margin: 0 auto;
}
.center-text .v-input__control > input {
  text-align: center;
}

</style>
