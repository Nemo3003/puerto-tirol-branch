<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold">{{ post.title }}</h1>
      <p class="text-gray-700 mt-4">{{ post.content }}</p>
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
  