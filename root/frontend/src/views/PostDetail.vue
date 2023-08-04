<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 pt-8 pb-16 justify-center items-center">
      <div class="text-center">
        <h2 class="text-3xl font-semibold mb-4">
          {{ post.title }}
        </h2>

        <img src="../assets/activity1.jpg" alt="activity">
        <p class="text-gray-700 mb-6">
          {{ post.description }}
        </p>
        <div class="border-t pt-4">
          <p class="text-gray-600 text-muted">
            {{ post.date }}
          </p>
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
    const postId = this.$route.params.id;

    try {
      const response = await axios.get(`http://localhost:3000/post/${postId}`);
      this.post = response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  },
};
</script>

<style scoped>
/* Add your styling here */
</style>
