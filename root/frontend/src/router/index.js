import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    // The session will remain, even if the user changes tabs
    history: createWebHistory(),
    routes: [
        {path: "/", component: () => import("../views/home.vue")},
        {path: "/todo", component: () => import("../views/postCreation.vue")},
        {path: "/register", component: () => import("../auth/register.vue")},
        {path: "/login", component: () => import("../auth/login.vue")},
        {path: "/about", component: () => import("../views/about.vue")},
        {path: "/posts", component: () => import("../views/posts.vue")},
    ],
});


const getCurrentUser = () => {
    // Create a new Promise object that will either resolve with a user object or reject with an error.
    return new Promise((resolve, reject) => {
      // Call the onAuthStateChanged function with two arguments: 
      //   1. A call to the getAuth function (presumably from a Firebase Authentication library)
      //   2. A callback function that will be called with a user object when the authentication state changes
      //   3. A second callback function that will be called if there is an error
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          // Call the removeListener function to remove the callback and stop listening for changes
          removeListener();
          // Resolve the Promise with the user object
          resolve(user);
        },
        // If there is an error, reject the Promise with the error object
        reject
      );
    })
  }
  
// Checks if any route needs some sort of authentication
// If the user is trying to access something that is restricted, then it will redirect them to the registration page
router.beforeEach(async(to,from,next)=>{
    if(to.matched.some((record)=> record.meta.requiresAuth)){
        if(await getCurrentUser()){
            next();
        }else{
            alert("You do not have access to this site, sign up in order to get access");
            next("/register")
        }
    }
    else{next();}
})

export default router;