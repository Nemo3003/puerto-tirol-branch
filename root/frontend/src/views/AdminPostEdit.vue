<template>
    <div class="container mx-auto p-4">
      <h2 class="text-center mt-5 text-2xl font-semibold">Edit Post</h2>
      <form class="mt-4 flex flex-col">
        <input
          type="text"
          v-model="editedPost.title"
          class="p-2 border rounded-md"
        />
        <textarea
          v-model="editedPost.content"
          class="p-2 mt-2 border rounded-md h-40"
        ></textarea>
        <!-- Add type input field -->
        <label class="mt-2">Type:</label>
        <select v-model="editedPost.type" class="p-2 border rounded-md">
          <option value="announcement">Announcement</option>
          <option value="activity">Activity</option>
        </select>
        <button
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          @click="updatePost"
        >
          Update Post
        </button>
        <button
          class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          @click="deletePost"
        >
          Delete Post
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminPostEdit",
    data() {
      return {
        editedPost: {
          title: "",
          content: "",
          type: "announcement",
        },
      };
    },
    methods: {
      // Retrieve the post to be edited based on the route parameter (index)
      getPostToEdit() {
        const index = this.$route.params.index;
        const posts = this.$parent.posts;
  
        if (index >= 0 && index < posts.length) {
          this.editedPost = { ...posts[index] };
        } else {
          // Handle invalid index (redirect or show an error, etc.)
          // For simplicity, we'll redirect back to the postCreation.vue page
          this.$router.push("/todo");
        }
      },
      updatePost() {
        // Find the index of the post in the posts array
        const index = this.$route.params.index;
        const posts = this.$parent.posts;
  
        // Update the post in the posts array
        if (index >= 0 && index < posts.length) {
          posts[index] = { ...this.editedPost };
        }
  
        // Save the updated posts array to local storage
        localStorage.setItem("posts", JSON.stringify(posts));
  
        // Redirect back to the post list page
        this.$router.push("/todo");
      },
      deletePost() {
        // Find the index of the post in the posts array
        const index = this.$route.params.index;
        const posts = this.$parent.posts;
  
        // Remove the post from the posts array
        if (index >= 0 && index < posts.length) {
          posts.splice(index, 1);
        }
  
        // Save the updated posts array to local storage
        localStorage.setItem("posts", JSON.stringify(posts));
  
        // Redirect back to the post list page
        this.$router.push("/todo");
      },
    },
    mounted() {
      // Load the post to edit when the component is mounted
      this.getPostToEdit();
    },
  };
  </script>
  
  <style>
  html {
    max-height: 100vh;
  }
  </style>
  