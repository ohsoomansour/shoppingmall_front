<template>
  <div id="app">
    <v-app> 
    <!-- 경로와 일치하는 컴포넌트를 여기서 렌더링 합니다 -->
    <router-view></router-view> 
  </v-app>
  </div>  
</template>


<script>

export default {
  name: 'App',
  components: {
    
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
