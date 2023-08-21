<template>
  <div class="min-h-screen mt-4">
    <div class="container mx-auto px-4 pt-8 pb-16 ">
      <div class="bg-white rounded-lg shadow-md p-8 container-details">
        <h2 class="text-3xl font-semibold mb-4 ">
          {{ post.title }}
        </h2>

        
        <hr>
        <p class="text-gray-700 text-box mb-6 ">
          {{ post.description }}
        </p>

        <div class="border-t pt-4 text-gray-600 text-box">
          <p>FECHA: {{ post.date }}</p>
          
        </div>
        <div class="relative aspect-w-16 aspect-h-9 mb-6">
          <img :src="getImageSource(post.type)" alt="image" class="object-cover rounded-lg image-detail">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
    };
  },
  async created() {
    await this.fetchPost();
  },
  async beforeRouteUpdate(to, from, next) {
    // Fetch the new post data when the route changes
    await this.fetchPost();
    next();
  },
  methods: {
    async fetchPost() {
      const postId = this.$route.params.id;

      try {
        const response = await axios.get(`https://puerto-tirol-branch-server.onrender.com/post/${postId}`);
        this.post = response.data;
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    },
    getImageSource(type) {
      if (type === "announcement") {
        return require("../assets/announcement.jpg");
      } else if (type === "activity") {
        return require("../assets/activity1.jpg");
      }
    },
  },
};
</script>

<style scoped>
.text-box{
  font-size: larger;
}
.container-details {
  padding: 4rem;
}
.image-detail{
  max-width: 80%;
}
</style>
