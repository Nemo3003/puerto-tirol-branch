<template>
   <!-- Login form -->
   <div>
   <div class="p-4">
   <div class="container p-4 col-4 bg-white rounded-md">
      <div class="row justify-content-center ">
        

      <h1 class="text-center mb-4">Log into account</h1>
      <div class="form-outline mb-4">
         <label for="Email" class="text-gray-600">Email</label>
         <input name="Email" type="text" placeholder="Email" v-model="email" class="form-control w-full">
      </div>
      <div class="form-outline mb-4">
         <label for="Password" class="text-gray-600">Password</label>
         <input name="Password" type="password" placeholder="Password" v-model="password" class="form-control w-full">
      </div>
      <p v-if="errMsg" class="text-red-600">{{ errMsg }}</p>
      <p><button @click="register" class="btn btn-secondary btn-block">Submit</button></p>
      <button @click="signInWithGoogle" type="button" class="btn btn-primary btn-floating mx-1">
         Sign in with Google
      </button>
   </div>
   </div>
</div>
<h3>Let us make something great!</h3>
<p>"Members are the key to establishing and building up the Church. <br>
   You and I must do everything we can to see that every member of the Church is completely fellowshipped <br>
   and enjoying all the blessings the gospel has to offer." - Elder M. Russell Ballard</p>
<p>"There is no greater friendshipping tool in the Church than a caring Relief Society president watching over those who have been recently baptized or reactivated. <br> 
   That is also true of all of the elders quorum and auxiliary leaders. All members of the ward council have a vital role in member-missionary work." - Elder M. Russell Ballard</p><br>
   <p>"My beloved brothers and sisters, may God bless you that you may be filled with the great enthusiasm that is demonstrated by our prophet.<br>
       My humble prayer is that you will find it a great joy to follow him and do what he is asking us to do. <br>
       I bear witness that Jesus is the Christ, the Son of the living God, and that this is His Church we are responsible for. <br>
       I promise you that with His love and direction we can accomplish all we need to do to enhance and improve the conversion, the retention, and the activation of His precious children." - Elder M. Russell Ballard</p>
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
            router.push('/todo')
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
 <style>

</style>