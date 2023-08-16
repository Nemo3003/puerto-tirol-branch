<template>
  
  <nav class="navbar text-center navbar-expand-lg navbar-light fixed-top " style="background-color: #001F3F;">
    <br>
    <button @click="isMenuCollapsed = !isMenuCollapsed" class="navbar-toggler bg-white mx-3" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div :class="isMenuCollapsed ? 'collapse' : 'show'" @click.outside="isMenuCollapsed = true" class="navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0 mx-auto">
      <li class="nav-item active">
        <router-link to="/" class="nav-link " style="color: #FFFFFF;">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/posts" class="nav-link" style="color: #FFFFFF;">Posts</router-link>
      </li>
        <li class="nav-item">
          <router-link to="/post-creation" class="nav-link" style="color: #FFFFFF;" v-if="isLoggedIn">Posts - admin</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" style="color: #FFFFFF;">About</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link" style="color: #FFFFFF;">Login</router-link>
        </li>

        <li class="nav-item">
          <button v-if="isLoggedIn" @click="handleSignOut" class="btn btn-secondary nav-link" style="color: #FFFFFF;">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </nav>
    
    <router-view />
    <footer class="bg-light text-center text-lg-start fixed-bottom" style="background-color: #F5F5F5;">
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
