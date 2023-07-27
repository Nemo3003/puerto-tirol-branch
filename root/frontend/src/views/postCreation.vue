<template>
  <div class="container">
    <h2 class="text-center mt-5">Create a New Post</h2>
    <form class="d-flex">
      <input type="text" placeholder="Enter Post Title" v-model="postTitle" class="form-control">
      <textarea placeholder="Enter Post Content" v-model="postContent" class="form-control"></textarea>
      <button class="btn btn-warning rounded-0" @click="submitPost">Submit</button>
    </form>

    <!--Here comes the table for our posts-->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Content</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index">
          <th>
            <span class="pointer">{{ post.title }}</span>
          </th>
          <td>
            <span>{{ post.content }}</span>
          </td>
          <td>
            <div class="text-center" @click="editPost(index)">
              <span class="fa fa-pen pointer"></span>
            </div>
          </td>
          <td>
            <div class="text-center" @click="deletePost(index)">
              <span class="fa fa-trash pointer"></span>
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
        });
      } else {
        this.posts[this.editedPost].title = this.postTitle;
        this.posts[this.editedPost].content = this.postContent;
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
