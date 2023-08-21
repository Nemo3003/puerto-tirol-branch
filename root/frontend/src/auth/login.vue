<template>
   <!-- Login form -->
   <div class="login-container">
     <div class="login-box">
       <h1 class="text-center mb-4">Log into account</h1>
       <div class="form-group">
         <label for="email" class="text-gray-600">Email</label>
         <input
           id="email"
           name="email"
           type="text"
           placeholder="Email"
           v-model="email"
           class="form-control"
         >
       </div>
       <div class="form-group">
         <label for="password" class="text-gray-600">Password</label>
         <input
           id="password"
           name="password"
           type="password"
           placeholder="Password"
           v-model="password"
           class="form-control"
         >
       </div>
       <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
       <button @click="register" class="btn btn-primary btn-block">Submit</button>
     </div>
   </div>
 </template>
 
 <script setup>
    import {ref} from 'vue';
    import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from '@firebase/auth';
    import { useRouter } from 'vue-router';
    
    const router = useRouter()
    const email = ref("");
    const password = ref("");
    const errMsg = ref("")

    const register = ()=>{
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
        // Error handling
        .then((data) =>{
            router.push('/post-creation')
        })
        .catch((error) =>{
            console.log(error.code);
            switch(error.code) {
             case "auth/invalid-email":
                //The message that will be shown to the user
                errMsg.value = "Invalid email";
                break;
             case "auth/user-not-found":
                errMsg.value = "No account with this email has been found";
                break;
             case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
             default:
                errMsg.value = "Email or password is incorrect";
                break;
            }
        })
    }
    const signInWithGoogle = ()=>{
       const provider = new GoogleAuthProvider();
         signInWithPopup(getAuth(), provider)
         .then((result) => {
             router.push("/todo")
         })
         .catch((e)=>{
             console.error(e)
         })
    }
 </script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.login-box {
  padding: 20px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
}

.btn-block {
  width: 50%;
  margin: 10px;
}
</style>