<template>
  <nav class="navbar text-center navbar-expand-lg navbar-light bg-light fixed-top">
    <button @click="isMenuCollapsed = !isMenuCollapsed" class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div :class="isMenuCollapsed ? 'collapse' : 'show'" @click.outside="isMenuCollapsed = true" class="navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0 mx-auto">
        <!--Wherever you see a "!isLoggedIn" indicates that that will be shown only if the user is logged in-->
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/todo" class="nav-link">Posts - admin</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>

        <li class="nav-item">
          <button v-if="isLoggedIn" @click="handleSignOut" class="btn btn-secondary nav-link">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </nav>
    
    <router-view />
    <footer class="bg-light text-center text-lg-start fixed-bottom">
      <!-- Copyright -->
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2023 Copyright
        <p class="text-dark">Ulises Mariano Melgarejo</p>
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