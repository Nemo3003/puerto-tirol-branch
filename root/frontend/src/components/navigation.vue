<template>
  
  <nav class="navbar text-2xl text-center navbar-expand-lg fixed-top p-4" style="background-color: #0074D9;">
    <br>
    <button @click="isMenuCollapsed = !isMenuCollapsed" class="navbar-toggler bg-white mx-3" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div :class="isMenuCollapsed ? 'collapse' : 'show'" @click.outside="isMenuCollapsed = true" class="navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0 mx-auto">
      <li class="nav-item active">
        <router-link to="/" class="nav-link " >Inicio</router-link>
      </li>
      <li class="nav-item ">
        <router-link to="/posts" class="nav-link " >Anuncios y Actividades</router-link>
      </li>
        <li class="nav-item">
          <router-link to="/post-creation" class="nav-link"  v-if="isLoggedIn">Posts - admin</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" >Acerca de</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link" >Iniciar Sesion</router-link>
        </li>
        <li class="nav-item">
          <button v-if="isLoggedIn" @click="handleSignOut" class="btn btn-secondary nav-link" style="color: #FFFFFF;">
            Cerrar Sesion
          </button>
        </li>
      </ul>
    </div>
  </nav>
    
    <router-view />
    <footer class="text-center text-lg-start fixed-bottom" style="background-color: #FF851B;">
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      <p class="text-dark" style="color: #333333;">&copy; 2023 Ulises Mariano Melgarejo</p>
    </div>
    <!-- Copyright -->
  </footer>
  </template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import router from '@/router';

const isMenuCollapsed = ref(true); // Add the new ref variable

//By default, the user is not logged in
const isLoggedIn = ref(false)
let auth;
onMounted(()=> {
    auth = getAuth();
    // This prevents the user from having their session expired when they refresh the page
    onAuthStateChanged(auth, (user)=>{
    if(user){isLoggedIn.value = true;}
    else {isLoggedIn.value = false;}
    });
});

const handleSignOut = () => {
    signOut(auth).then(()=>{
        router.push("/");
    });
}
</script>
<style scoped>
.nav-link {
  color: #FFFFFF; 
  font-size: large;
}
.nav-link:hover {
  color: #d7da46; 
  font-size: larger;
}

</style>