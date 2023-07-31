<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-4">All Posts</h1>
    <ul>
      <li v-for="(post, index) in posts" :key="index" class="mb-4">
        <div class="bg-white rounded-lg p-4 shadow-md">
          <!-- Post content -->
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p class="text-gray-700">{{ post.content }}</p>
          <!-- Post link -->
          <router-link :to="`/post/${index}`" class="text-blue-500 hover:underline block mt-2">
            Read More
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PostCreation",
  data() {
    return {
      posts: [
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
