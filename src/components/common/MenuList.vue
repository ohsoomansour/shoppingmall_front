<!--#slot 설명 
  '컴포넌트의 재사용성'을 높여주는 기능 
   - 하위 컴포넌트의 마크업을 확장하거나 재정의 
   - 
   <template>
      <div class="tab panel">
        <slot></slot>   "slot태그로 작성하지 않으면 해당 부분은 공백으로 표시 "
        <div class="content">
          Tab Contents
        </div>
      </div>
    </template>
  #v-treeview : Vuetify의 트리 구조를 구현하는 컴포넌트 
   open-on-click : 노드를 클릭하면 노드의 자식들이 열림 
   activatable : 노드를 클릭하면 '활성화 상태'가 됩니다.
   open.sync="open" :  현재 열린 노드를 추적하는 배열
   item-key="id" : 각 노드의 고유 식별자를 나타내는 키
   item-text : 각 노드에 표시될 텍스트
   item-children="children"
   :load-children="fetchChildren"  : '비동기적'으로 자식 노드를 로드하는 함수
   
  Q. id와 name외 'key'와 'value'을 가져올 것인가
  A. 
  
   <template v-slot:prepend="{ item }" >
   </template>
   - v-slot : 부모 컴포넌트가 자식 컴포넌트의 슬롯에 콘텐츠를 삽입 
   - v-slot:prepend는 특정 컴포넌트의 prepend 영역에 콘텐츠를 삽입하기 위해 사용되는 슬롯 디렉티브
    prepend 슬롯은 '특정 컴포넌트'에서 자주 제공되는 슬롯 중 하나로, 주로 '콘텐츠나 요소의 앞부분에 추가적인 내용을 삽입'하고 싶을 때 사용됩니다. 
    예를 들어, 텍스트 필드 앞에 아이콘을 추가하거나, 리스트 항목 앞에 체크박스를 넣는 경우

   #v-card 와꾸 
    <v-card class="mx-auto" max-width="400">
        <v-card-title>Card Title</v-card-title>
        <v-card-text>This is some text within a card.</v-card-text>
        <v-card-actions>
          <v-btn color="primary">Action</v-btn>
        </v-card-actions>
    </v-card>

  # v-model:opened="open": v-treeview 컴포넌트에서 어떤 항목들이 열려 있는지를 open이라는 배열과 동기화  
  # :custom-filter="filterFn" 
   const filterFn = (value, search, item) => {
    
    return caseSensitive.value ? value.indexOf(search) > -1 : value.toLowerCase().indexOf(search.toLowerCase()) > -1
   }
  **** 반환 값이 true, true를 반환한 항목만 표시 OR false를 반환! " ****
  -->

<template>
  <v-card>
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        clear-icon="mdi-close-circle-outline"
        label="Search Shoppingmall Category"
        clearable
        dark
        flat
        hide-details
        solo-inverted
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        label="대/소문자 구분 검색"
        dark
        hide-details
      ></v-checkbox>
    </v-sheet class="pa-4 primary lighten-2">
      <v-card-text>
      <v-treeview
        v-model:opened="open"
        :custom-filter="filterFn"
        :items="items"
        :search="search"
        item-value="id"
      >
        <template v-slot:prepend="{ item }">
          <router-link :to="item.menu_url">
            <v-btn 
              v-if="item.menu_url"
              icon
            >
              <!-- 아이콘을 넣거나 버튼 내용 추가 가능 -->
              <v-icon>mdi-link</v-icon>
            </v-btn>
          </router-link>
        </template>

      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(['A0', 'A1', 'G0', 'G1', 'G2']); // id 필드 값 기준
const search = ref(null);
const caseSensitive = ref(false);
let items = ref([]);
let loginMenu =  sessionStorage.getItem("loginMenu"); // 
console.log("======================== MenuList -loginMenu ========================");
console.log(JSON.parse(loginMenu)) // parse 안 해줌면 에러터지고 아래 쭉 ~  에러 
if(loginMenu) {
  //loginMeneu 값은 문자열로 가져오고 있음 ==> JSON 문자열을 파싱하여 배열로 변환 후 ref로 설정
    items.value = JSON.parse(loginMenu);
  }

const filterFn = function (value, search, item) {
    return caseSensitive.value ? value.indexOf(search) > -1 : value.toLowerCase().indexOf(search.toLowerCase()) > -1
  }

</script>
