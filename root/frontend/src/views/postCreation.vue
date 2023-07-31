<template>
  <div class="container mx-auto p-4">
    <h2 class="text-center mt-5 text-2xl font-semibold">Create a New Post</h2>
    <form class="mt-4 flex flex-col">
      <input
        type="text"
        placeholder="Enter Post Title"
        v-model="postTitle"
        class="p-2 border rounded-md"
      />
      <textarea
        placeholder="Enter Post Content"
        v-model="postContent"
        class="p-2 mt-2 border rounded-md h-40"
      ></textarea>
      <!-- Add type input field -->
      <label class="mt-2">Type:</label>
      <select v-model="postType" class="p-2 border rounded-md">
        <option value="announcement">Announcement</option>
        <option value="activity">Activity</option>
      </select>
      <button
        class="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        @click="submitPost"
      >
        Submit
      </button>
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
export default {
  name: "PostApp",
  data() {
    return {
      editedPost: null,
      postTitle: "",
      postContent: "",
      postType: "announcement", // Default type
      posts: [],
    };
  },
  methods: {
    submitPost() {
      if (this.postTitle.length === 0 || this.postContent.length === 0) {
        this.errorMessage = "Title and Content cannot be empty";
        return;
      }

      // Check for duplicate post titles
      const duplicatePost = this.posts.find((p) => p.title === this.postTitle);
      if (duplicatePost) {
        this.errorMessage = "Post title already exists";
        return;
      }

      // Reset error message if there were no errors
      this.errorMessage = "";

      // BEGIN Check whether the user wants to edit or create a new post
      if (this.editedPost === null) {
        this.posts.push({
          title: this.postTitle,
          content: this.postContent,
          type: this.postType, // Add the selected type to the new post
        });
      } else {
        this.posts[this.editedPost].title = this.postTitle;
        this.posts[this.editedPost].content = this.postContent;
        this.posts[this.editedPost].type = this.postType; // Update the type in the edited post
        this.editedPost = null;
      }
      // END

      this.postTitle = "";
      this.postContent = "";

      // Save posts to local storage
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    editPost(index) {
      this.postTitle = this.posts[index].title;
      this.postContent = this.posts[index].content;
      this.postType = this.posts[index].type; // Set the type for editing
      this.editedPost = index;
    },
    deletePost(index) {
      // Remove the post at the specified index from the posts array
      this.posts.splice(index, 1);

      // Save the updated posts array to local storage
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
  },
  mounted() {
    // Load posts from local storage
    if (localStorage.getItem("posts")) {
      this.posts = JSON.parse(localStorage.getItem("posts"));
    }
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
</style>
