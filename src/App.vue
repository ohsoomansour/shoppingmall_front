<template>
    <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to MVNO"/>
    <post-list post-title="게시판 리스트"> </post-list>
 </div>
</template>


<script>
import HelloWorld from './components/HelloWorld.vue'
import PostList from './components/PostList.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    PostList
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
