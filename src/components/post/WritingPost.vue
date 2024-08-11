<!--
 @rules="[v => !!v || '내용을 입력하세요 ' ]"   
 람다 함수, 입력 값을 검증하기 위한 규칙을 지정할 때 사용
 v 변수는 입력값을 나타냄 -> boolean 값으로 변환 
-->
<template>
    <v-container fluid>
      <v-card class="pa-5">
        <v-card-title style="font-weight: bolder;">게시 글 작성</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field
              v-model="u_email"
              label="사용자 아이디"
              :rules="[v => !!v  || '로그인이 필요합니다.']"
            >
            </v-text-field>
            <v-text-field
              v-model="p_title"
              label="제목"
              :rules="[v => !!v || '제목을 입력하세요']"
              required
            ></v-text-field>
            <v-textarea
              v-model="p_contents"
              label="내용"
              :rules="[v => !!v || '내용을 입력하세요']"
              required
            ></v-textarea>
            <v-file-input
              v-model="files"
              label="파일 업로드"
              prepend-icon="mdi-paperclip"
              :rules="[v => !!v || '파일을 선택하세요']"
              multiple
              required
            ></v-file-input>
            <v-btn color="primary" @click="submitForm" style="margin-right: 10px;">제출</v-btn>
            <v-btn color="secondary" @click="resetForm">초기화</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>


<script>
   export default {
        name: 'WrigingPost',
        props:{
           
        },
        components:{
          //자식 컴포넌트 등록     
        },
        data() {
        return {
          u_id: 3, 
          u_email: '',
          p_title: '',
          p_contents: '',
          files: [],
        };
       },
       methods:{
        submitForm(){

        // 지정된 검증 규칙을 검사하고, 모든 필드가 유효한 경우 true 그렇지 않은 경우 false
         console.log(this.$refs.form.validate())
         if(this.$refs.form.validate()){
            /* 24.8.10 (토)
              u_id, u_email은 sessionStorage에서 가져옴 
              But 현재 로그인 기능 x
              임시 :  
            */
            //## 회원가입 및 LOGIN 기능 추가 후 this.u_id = sessionStorage.getItem("u_id");
            let formData = new FormData();
            formData.append("u_id", this.u_id);
            formData.append("u_email",this.u_email);
            formData.append("p_title", this.p_title);
            formData.append("p_contents", this.p_contents);
            Array.from(this.files).forEach((file) => {
              formData.append('files', file);
              console.log(file);
            });
            
            this.axios
             .post('/api/vuePost/pubPost.do', formData, {
                headers:{
                    'Content-Type' : 'multipart/form-data',
                },
             }).then(res => console.log("게시 글 등록 결과" + res))
             .catch(e => console.error(e));
          }
        },
        resetForm(){
            // v-form 컴포넌트 내의 모든 입력 필드를 초기 상태로 재설정하는 역할
            this.$this.$refs.form.reset();
        }
       }
    }

</script>

