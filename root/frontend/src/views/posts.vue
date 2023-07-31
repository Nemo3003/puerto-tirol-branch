<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold p-4">All Posts</h1>
    <ul class="cards">
      <li v-for="(post, index) in posts" :key="index" class="card">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-content">{{ post.content }}</p>
        <router-link :to="`/post/${index}`" class="card-link">
          Read More
        </router-link>
      </li>
    </ul>
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
    fetchPosts() {
      axios
        .get("http:localhost:8080/api/posts")
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
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
}

.card {
  margin-bottom: 1rem;
  width: 25%;
  padding: 1rem;
  gap: 1rem;
}
</style>
