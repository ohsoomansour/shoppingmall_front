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
  -->

<template>
  <v-container>
    <v-treeview
      :items="items"
      open-on-click
      activatable
      :open.sync="open"
      :active.sync="active"
      item-key="id"
      item-text="name"
      item-children="children"
      :load-children="fetchChildren"
      :selection-type="selectionType"
      selectable
    >
    </v-treeview>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectionType: 'leaf',
      open: [], // 열린 노드를 추적
      active: [], // 활성화된 노드를 추적
      items: [
        /*
        {
          id: 1,
          name: "Root 1",
          children: [
            {
              id: 2,
              name: "Child 1",
              children: [
                { id: 3, name: "Grandchild 1" },
                { id: 4, name: "Grandchild 2" },
              ],
            },
            { id: 5, name: "Child 2" },
          ],
        },
        {
          id: 6,
          name: "Root 2",
          children: [
            { id: 7, name: "Child 3" },
            { id: 8, name: "Child 4" },
          ],
        },
        */
      ],
    };
  },
  methods: {
      
    
    fetchChildren(item) {
      return new Promise(resolve => {
        // 서버에서 데이터를 가져오거나 추가적인 처리를 통해 '자식 노드'를 생성
        if (item.name === "Child 2") {
          setTimeout(() => {
            item.children = [
              { id: 9, name: "Grandchild 3" },
              { id: 10, name: "Grandchild 4" },
            ];
            resolve(item.children);
          }, 1000); // 예시로 1초 후에 자식 노드 추가
        } else {
          resolve([]);
        }
      });
    },
  },
  mounted(){
    let loginMenu =  sessionStorage.getItem("loginMenu");
    console.log("loginMenu==========>")
    console.log(JSON.parse(loginMenu))
    this.items = JSON.parse(loginMenu);
  }
};
</script>
