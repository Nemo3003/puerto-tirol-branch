<template>
    <div class="container">
      <h1>All Posts</h1>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "AllPostsPage",
    data() {
      return {
        posts: [
          // Sample data for demonstration, replace with actual posts data from the backend.
          {
            title: "Sample Post 1",
            content: "This is the content of Sample Post 1.",
          },
          {
            title: "Sample Post 2",
            content: "This is the content of Sample Post 2.",
          },
          {
            title: "Sample Post 3",
            content: "This is the content of Sample Post 3.",
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  