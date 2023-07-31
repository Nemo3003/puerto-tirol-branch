<template>
  <div class="container mx-auto p-4">
    <h2 class="text-center mt-5 text-2xl font-semibold">Create a New Post</h2>
    <form class="mt-4 space-y-4">
      <div class="flex flex-col">
        <label for="postTitle" class="text-gray-600">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          placeholder="Enter Post Title"
          v-model="postTitle"
          class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div class="flex flex-col">
        <label for="postContent" class="text-gray-600">Post Content:</label>
        <textarea
          id="postContent"
          placeholder="Enter Post Content"
          v-model="postContent"
          class="p-2 mt-2 border rounded-md h-40 focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>
      <div class="flex flex-col">
        <label for="postType" class="text-gray-600">Type:</label>
        <select
          id="postType"
          v-model="postType"
          class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="announcement">Announcement</option>
          <option value="activity">Activity</option>
        </select>
      </div>
      <button
        type="button"
        class="w-full mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
        @click="submitPost"
      >
        Submit
      </button>
      <p class="text-red-600" v-if="errorMessage">{{ errorMessage }}</p>
    </form>

    <!-- Here comes the table for our posts -->
    <table class="mt-5 w-full table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Content</th>
          <th class="px-4 py-2">Type</th>
          <th class="px-4 py-2">Edit</th>
          <th class="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index">
          <td class="px-4 py-2">
            <span class="cursor-pointer">{{ post.title }}</span>
          </td>
          <td class="px-4 py-2">
            <span>{{ post.content }}</span>
          </td>
          <!-- Display post type in the table -->
          <td class="px-4 py-2">
            <span>{{ post.type }}</span>
          </td>
          <td class="px-4 py-2">
            <div class="text-center cursor-pointer" @click="editPost(index)">
              <span class="fas fa-pen"></span>
            </div>
          </td>
          <td class="px-4 py-2">
            <div class="text-center cursor-pointer" @click="deletePost(index)">
              <span class="fas fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "PostApp",
  data() {
    return {
      editedPost: null,
      postTitle: "",
      postContent: "",
      postType: "announcement", // Default type
      posts: [],
      errorMessage: "",
    };
  },
  methods: {
    // Your existing methods go here...

    // Submit the post to the backend API
    async submitPost() {
      if (this.postTitle.length === 0 || this.postContent.length === 0) {
        this.errorMessage = "Title and Content cannot be empty";
        return;
      }

      const newPost = {
        title: this.postTitle,
        content: this.postContent,
        type: this.postType,
      };
      try {
        const response = await axios.post("http://localhost:8080/api/create", newPost);
        // Add the new post to the local posts array
        this.posts.push(response.data);

        this.postTitle = "";
        this.postContent = "";

        // Save posts to local storage
        localStorage.setItem("posts", JSON.stringify(this.posts));
      } catch (error) {
        this.errorMessage = "Failed to create post";
      }
    },


    // Fetch all posts from the backend API
    async fetchPosts() {
      try {
        const response = await axios.get("http://localhost:8080/api/");
        this.posts = response.data;
        localStorage.setItem("posts", JSON.stringify(this.posts));
      } catch (error) {
        this.errorMessage = "Failed to fetch posts";
      }
    },
  },
  mounted() {
    // Load posts from local storage
    if (localStorage.getItem("posts")) {
      this.posts = JSON.parse(localStorage.getItem("posts"));
    }

    // Fetch posts from the backend API
    this.fetchPosts();
  },
};
</script>
<style>
html {
  max-height: 100vh;
}
.pointer {
  cursor: pointer;
}
.error-message {
  color: red;
  margin-top: 10px;
}

.container {
  max-width: 500px;
}
</style>