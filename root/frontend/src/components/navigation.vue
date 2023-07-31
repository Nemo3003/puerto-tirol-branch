<template>
    <nav class="navbar text-center  navbar-expand-lg navbar-light bg-light fixed-top     ">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 mx-auto">
            <!--Wherever you see a "!isLoggedIn" indicates that that will be shown only if the usuer is logged in-->
            <li class="nav-item active">
                <router-link to="/" class="nav-link ">Home</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/todo" class="nav-link" v-if="isLoggedIn">Posts - admin</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/about" class="nav-link nav-item">About</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/posts" class="nav-link nav-item">Posts</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/register" v-if="!isLoggedIn" class="nav-link nav-item">Register</router-link>
            </li>
            <li class=" nav-item">
                <router-link to="/login" v-if="!isLoggedIn" class="nav-link nav-item">Login</router-link>
            </li>
            
            <li class=" nav-item">
                <button v-if="isLoggedIn" @click="handleSignOut" class="btn btn-secondary nav-item"> Sign out </button>
            </li> 
        </ul>
        </div>
    </nav>
    <router-view/>
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