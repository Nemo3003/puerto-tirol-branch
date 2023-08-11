<template>

<div class="container p-2 max-h-[calc(100vh - 2rem)] overflow-y-auto">
  <div class="flex container p-2">
    <h2 class="text-center mt-6 text-2xl font-semibold">Create a New Post</h2>
    <div class="w-full max-w-xs p-2">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200 mt-4">
        <div class="grid grid-cols-1 gap-4">
          <div class="m-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
              Post Title
            </label>
            <br>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              v-model="title"
              placeholder="Post Title"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
              Post Content
            </label>
            <br>
            <textarea
              id="description"
              v-model="description"
              placeholder="Enter Post Content"
              class="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div class="m-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
              Date
            </label>
            <br>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="text"
              v-model="date"
              placeholder="Post date"
              @blur="validateDate"
              required
            />
          </div>
          <div>
            <label for="postType" class="text-gray-600">Type:</label>
            <br>
            <select
              id="postType"
              v-model="postType"
              class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              <option value="announcement">Announcement</option>
              <option value="activity">Activity</option>
            </select>
          </div>
          <br>
          
          <div>
            <button
            class="bg-teal-900 mb-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            @click="submitPost"
          >
            {{ editingPost ? "Update Post" : "Submit Post" }}
          </button>
            <br>
          </div>
          <p class="text-red-600" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
      </form>
    </div>
  </div>

  <div class="pb-5 mb-4 bg-red-800">
      <div class="container p-2 mb-5 overflow-y-auto max-w-3xl mx-auto rounded-md">
        <table class="mt-5 w-full table-auto border border-gray-800 bg-white">
      <thead>
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Content</th>
          <th class="px-4 py-2">Type</th>
          <th class="px-4 py-2">Date</th>
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
            <span>{{ truncateDescription(post.description) }}</span>
          </td>
          <!-- Display post type in the table -->
          <td class="px-4 py-2">
            <span>{{ post.type }}</span>
          </td>
          <td class="px-4 py-2">
            <span>{{ post.date }}</span>
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
</div>



</div>

</template>

<script>
import axios from "axios";


export default {
  name: "PostApp",

  data() {
    return {
      editedPost: null,
      title: "",
      description: "",
      date: "",
      postType: "announcement", // Default type
      posts: [],
      errorMessage: "",
      editingPost: null,
      errorMessage: "",

    };
  },
  
  methods: {
    truncateDescription(description) {
      return description.length > 20 ? description.slice(0, 20) + "..." : description;
    },
  
    toggleTodoList() {
    this.showTodoList = !this.showTodoList;
  },
    editPost(index) {
    this.editingPost = this.posts[index];
    this.title = this.editingPost.title;
    this.description = this.editingPost.description;
    this.date = this.editingPost.date;
    this.postType = this.editingPost.type;
  },
  validateDate() {
    // Simple date validation using regular expression
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/; // Updated date format regex
    if (!dateRegex.test(this.date)) {
      this.errorMessage = "Please enter a valid date in the format DD-MM-YYYY.";
      return;
    }

    const [day, month, year] = this.date.split("-");
    const parsedMonth = parseInt(month, 10);

    if (parsedMonth > 12) {
      this.errorMessage = "Invalid month. Month should be between 01 and 12.";
      return;
    }

    const isValidDate = !isNaN(Date.parse(`${year}-${month}-${day}`));
    if (!isValidDate) {
      this.errorMessage = "Invalid date. Please enter a valid date.";
      return;
    }

    this.errorMessage = "";
  },
  // Submit the post to the backend API
  async submitPost() {
  if (this.editingPost) {
    // Editing an existing post
    this.updatePost();
  } else {
    // Creating a new post

    // Check for title and description validity
    if (this.title.length === 0 || this.description.length === 0) {
      this.errorMessage = "Title and Content cannot be empty";
      return;
    }

     // Check for date validity
     const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      if (!dateRegex.test(this.date)) {
        this.errorMessage = "Please enter a valid date in the format DD-MM-YYYY.";
        return;
      }

    this.errorMessage = "";

    const newPost = {
      title: this.title,
      description: this.description,
      date: this.date,
      type: this.postType,
    };

    try {
      const response = await axios.post('https://puerto-tirol-branch-server.onrender.com/create', newPost, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // The post was created successfully
        this.title = "";
        this.description = ""; // Fix: Clear the description as well
        this.date = "";
        this.errorMessage = ""; // Clear the error message
        // Fetch posts again to refresh the second container
        await this.fetchPosts();
      } else {
        // The post was not created successfully
        this.errorMessage = response.data.error;
      }
    } catch (error) {
      this.errorMessage = 'Failed to create post';
    }
  }
},


    // Fetch all posts from the backend API
    async fetchPosts() {
      const response = await axios.get("https://puerto-tirol-branch-server.onrender.com/");

      if (response.status === 200) {
        // The posts were fetched successfully
        this.posts = response.data;
      } else {
        // The posts were not fetched successfully
        this.errorMessage = response.data.error;
      }
    },
  async updatePost() {
  if (this.title.length === 0 || this.description.length === 0) {
    this.errorMessage = "Title and Content cannot be empty";
    return;
  }

  const updatedPost = {
    _id: this.editingPost._id, // Make sure to include the _id of the post being edited
    title: this.title,
    description: this.description,
    date: this.date,
    type: this.postType,
  };

  try {
    const response = await axios.put(
      `https://puerto-tirol-branch-server.onrender.com/update/${this.editingPost._id}`, // Use the correct URL with the _id
      updatedPost,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      this.editingPost = null;
      this.title = "";
      this.description = "";
      this.date = "";
      this.errorMessage = "";
      await this.fetchPosts();
    } else {
      this.errorMessage = response.data.error;
    }
  } catch (error) {
    this.errorMessage = "Failed to update post";
  }
},

  async deletePost(index) {
    try {
      const postId = this.posts[index]._id;
      const response = await axios.delete(
        `https://puerto-tirol-branch-server.onrender.com/delete/${postId}`
      );

      if (response.status === 200) {
        this.posts.splice(index, 1); // Remove the deleted post from the local list
      } else {
        this.errorMessage = response.data.error;
      }
    } catch (error) {
      this.errorMessage = "Failed to delete post";
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
  scroll-behavior: smooth;
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