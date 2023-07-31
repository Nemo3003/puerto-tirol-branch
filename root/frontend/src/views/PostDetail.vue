<template>
    <div class="container mx-auto p-4">
      <h2 class="text-center mt-5 text-2xl font-semibold">Post Detail</h2>
      <div class="mb-4">
        <h1 class="text-3xl font-semibold">{{ post.title }}</h1>
      </div>
      <p class="text-gray-700">{{ post.content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "PostDetail",
    data() {
      return {
        post: null,
      };
    },
    async created() {
      // Get the post index from the route params
      const index = this.$route.params.index;
  
      // Assuming you have the posts data array available in the parent component (postCreation.vue)
      const posts = this.$parent.posts;
  
      // Check if the index is valid
      if (index >= 0 && index < posts.length) {
        this.post = posts[index];
      } else {
        // If the index is invalid, you can handle it here (e.g., redirect to a 404 page)
        // For simplicity, we'll redirect back to the postCreation.vue page
        this.$router.push("/todo");
      }
    },
  };
  </script>
  
  <style>
  html {
    max-height: 80vh;
  }
  
  .container {
    max-width: 500px;
  }
  </style>
  