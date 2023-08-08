<template>
  <div id="post">

    <post-app>
        
    </post-app>
  </div>
</template>

<script>

import PostApp from "./components/navigation.vue";

export default {
  name: "App",
  components: {
    PostApp
  }
};
</script>

<style>
body{
  background-image: url(./assets/background.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;


}
.cards {
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin-bottom: 1rem;
}


</style>