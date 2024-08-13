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
          <v-card-text>
            <!-- 회원유형 -->
            <v-radio-group v-model="u_type" row @change="radiochange">
              <v-radio label="관리자" value="A"></v-radio>
              <v-radio label="기업 계정" value="BIZ"></v-radio>
              <v-radio label="일반 고객" value="CUSTOMER"></v-radio>
            </v-radio-group>
            
            <!-- 아이디 -->
            <v-text-field
              v-model="u_email"
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
              v-model="u_pw"
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
              v-model="u_name"
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
              <v-col md="1" >
                <v-text-field 
                  v-model="golbaeng"
                  readonly  
                  class="center-text" 
            

                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-if="this.selectedDomain === '직접 입력'"
                  v-model="emailDomain"
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
              
            </v-row>

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
      valid: false,
      golbaeng:"@",
      u_type: "A",
      u_email: "",
      u_pw: "",
      passwordConfirm: "",
      u_name: "",
      biz_email1: "",
      emailDomain: "",
      selectedDomain: "선택 입력",
      emailDomains: ["직접 입력", "naver.com", "gmail.com", "daum.net", "hanmail.net", "empas.com", "yahoo.com"],
      u_ph: "",
      postalCode: "",
      address: "",
      detailAddress: "",
      idCheckResult: null,
    };
  },
  name : 'signup',
  methods:{
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
      console.log("validatePasswordConfirm's v 확인 =========================>" + v)  //dhtnaksen@3
      return v === this.u_pw || "비밀번호가 일치하지 않습니다.";
    },
    validatePhoneNumber(v) {
      return /^\d+$/.test(v) || "숫자만 입력 가능합니다.";
    },
    SelectDomain(e) {
      console.log("event", e)
      /*
      if (this.selectedDomain !== "직접입력") {

        this.emailDomain = this.selectedDomain;
      } else {
        this.emailDomain = "";
      }*/
        
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
      // 아이디 중복 체크 로직
      // Ajax 요청을 통해 서버에서 중복 체크 후 결과 반환
      if (!this.u_email) {
        this.idCheckResult = { type: "error", message: "아이디를 입력해주세요." };
        return;
      }
      /* 성공 시
      params:{
            gubun : "ID",
            u_email : this.userId,
          }
      */
      this.axios
        .get('/api/member/userDuplicCheck.do', {
          params:{
            gubun : "ID",
            u_email : this.u_email,
          }
        })
        .then(res => {
          let user_count = res.data;
          if(user_count === 0){
            this.idCheckResult = { type:"success", message: "사용 가능한 아이디입니다." };

          } else if(user_count > 0) {
            this.idCheckResult = { type: "warning", message: "이미 존재하는 아이디입니다." };
          }
        });
      
      // 실패 시
      // this.idCheckResult = { type: "error", message: "중복된 아이디입니다." };
    },
    register() {
      if (!this.$refs.form.validate()) {
        return;
      }
      console.log("form 데이터 확인 =========>" + this.u_type, this.u_email, this.u_pw, this.u_name, this.address, this.detailAddress, this.biz_email1, this.selectedDomain, this.emailDomain)
      //이메일 
      let biz_email2="";
      if(this.selectedDomain === "직접 입력"){
        biz_email2 = this.emailDomain;
      } else {
        biz_email2 = this.selectedDomain; 
      }
      let formData = new FormData();
      formData.append("u_type", this.u_type);
      formData.append("u_email", this.u_email);
      formData.append("u_pw", this.u_pw);
      formData.append("u_name", this.u_name);
      formData.append("u_address", this.address + this.detailAddress );
      formData.append("biz_email1", this.biz_email1);
      formData.append("biz_email2", biz_email2);
      formData.append("u_ph", this.u_ph);
      this.axios
        .post("/api/member/signUp.do", formData, {
          headers:{
            'Content-Type' : 'multipart/form-data'
          }
        }).then(res => {
          if(res.data >= 1){
            window.location.href = "login"
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
