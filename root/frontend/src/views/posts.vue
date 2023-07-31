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
export default {
  data() {
    return {
      posts: [
        {
          title: "My First Post",
          content: "This is my first post. I'm excited to start blogging!",
        },
        {
          title: "My Second Post",
          content: "This is my second post. I'm learning a lot about blogging.",
        },
        {
          title: "My Third Post",
          content: "This is my third post. I'm having a lot of fun with it.",
        },
        {
          title: "My Fourth Post",
          content: "This is my fourth post. I'm still learning a lot.",
        },
        {
          title: "My Fifth Post",
          content: "This is my fifth post. I'm starting to get the hang of it.",
        },
      ],
    };
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
