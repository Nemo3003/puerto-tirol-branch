<template>
    <div class="mb-4 p-4">
      <h2 class="text-2xl font-bold mb-4">Latest Entries</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="(post, index) in posts" :key="index" class="bg-white p-4 m-4 rounded shadow">
          <h3 class="text-lg font-semibold">{{ post.title }}</h3>
          <p class="mt-2 text-gray-700">{{ truncateDescription(post.description) }}</p>
          <router-link :to="`/post/${post._id}`" class="text-blue-500 hover:underline mt-2 block">
            Read More
          </router-link>
        </div>
      </div>
    </div>
  </template>
  

<script>
import axios from "axios";


export default {
  name: "LatestEntriesPage",
  data() {
    return {
      posts: [],
      
    };
  },
  
  created() {
    this.fetchPosts();
  },
  methods: {
    getImageSource() {
      return require("../assets/faith.jpg");
    },
    truncateDescription(description) {
      return description.length > 20 ? description.slice(0, 20) + "..." : description;
    },
    
    async fetchPosts() {
  const response = await axios.get("https://puerto-tirol-branchs-production.up.railway.app/");

  if (response.status === 200) {
    // Group posts by type
    const postsByType = {};
    response.data.forEach(post => {
      if (!postsByType[post.type]) {
        postsByType[post.type] = post;
      }
    });

    // Convert the object values into an array of posts
    this.posts = Object.values(postsByType);
    } else {
      // The posts were not fetched successfully
      this.errorMessage = response.data.error;
    }
  },
  },
  computed: {
    filteredPosts() {
      return (type) => {
        return this.posts.filter(post => post.type === type);
      };
    },
  },
    
};
</script>

<style>

</style>
