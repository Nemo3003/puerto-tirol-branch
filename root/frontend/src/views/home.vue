<template>
  <section class="vh-80">
    <div class="container mx-auto">
      <div class="flex justify-center items-center h-100">
        <div class="w-full lg:w-6/12">
          <h1 class="text-3xl font-bold p-4">Welcome to Puerto Tirol Branch</h1>
          <hr>
          <p class="mt-4">
            Discover the latest activities and announcements happening in the Puerto Tirol Branch of the Church of
            Jesus Christ of Latter-day Saints. Stay connected with the community and be part of uplifting and
            meaningful events that strengthen your faith and promote service and love for others.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Display All Posts -->
    <div class="container mt-5 mb-4">
      <hr>
    <h2 class="text-2xl font-bold">Latest Entries</h2>
    <div class="pb-5 mb-4">
      <div class="cards">
      <div v-for="(post, index) in posts" :key="index" class="card">
        <h3 class="card-title">{{ post.title }}</h3>
        <p class="card-content">{{truncateDescription(post.description) }}</p>
        <router-link :to="`/post/${post._id}`" class="post-link">
          Read More
        </router-link>
      </div>
    </div>
    </div>
  </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
    };
  },
  
  created() {
    this.fetchPosts();
  },
  methods: {
    truncateDescription(description) {
      return description.length > 20 ? description.slice(0, 20) + "..." : description;
    },
    async fetchPosts() {
      const response = await axios.get("https://puerto-tirol-branch-server.onrender.com/");

      if (response.status === 200) {
        // The posts were fetched successfully
        this.posts = response.data.slice(0, 3); // Limit to the latest 3 posts
      } else {
        // The posts were not fetched successfully
        this.errorMessage = response.data.error;
      }
    },
  }
};
</script>

<style>
html {
  max-height: fit-content;
}

body {
  font-family: sans-serif;
}

h1,
h2,
h3 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
}
.cards {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card {
  width: 100%; /* Each list item should take up the full width */
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 1rem; 
}
/* Media query for two items per row */
@media screen and (max-width: 768px) {
  .card{
    width: calc(50% - 1rem);
    margin-bottom: 2rem;
  }
}

/* Media query for one item per row */
@media screen and (max-width: 480px) {
  .card {
    width: 100%;
    margin-bottom: 2rem;
  }
}
</style>
