<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold p-4">All Posts</h1>
    <div class="cards">
      <div v-for="(post, index) in posts" :key="index" class="card">
        <h2 class="card-title">{{ post.title }}</h2>
        <h6>Description</h6>
        <p class="card-content">{{ post.description }}</p>
        <h6>Date</h6>
        <p class="card-content">{{ post.date }}</p>
        <router-link :to="`/post/${index}`" class="card-link">
          Read More
        </router-link>
      </div>
    </div>
   </div>
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
    async fetchPosts() {
      const response = await axios.get("http://localhost:3000/");

      if (response.status === 200) {
        // The posts were fetched successfully
        this.posts = response.data;
      } else {
        // The posts were not fetched successfully
        this.errorMessage = response.data.error;
      }
    },
  },
};
</script>


<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;
}

.card {
  flex: 0 0 calc(33.333% - 1rem); /* Adjust the percentage as per your preference */
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  /* Add any other styling you want to the individual cards */
}

/* Media query for two cards per row */
@media screen and (max-width: 768px) {
  .card {
    flex: 0 0 calc(50% - 1rem);
  }
}

/* Media query for one card per row */
@media screen and (max-width: 480px) {
  .card {
    flex: 0 0 100%;
  }
}


</style>
