<template>
  <section class="vh-80">
    <br>
    <h1 class="text-3xl font-bold">Welcome to Puerto Tirol Branch</h1>
    <hr>
    <div class="container grid-parent">
      <!-- Left Column - Welcome Message -->
      <div class="col-left p-4">
        
        <hr class="my-4">
        <p>
          Discover the latest activities and announcements happening in the Puerto Tirol Branch of the Church of
          Jesus Christ of Latter-day Saints. Stay connected with the community and be part of uplifting and
          meaningful events that strengthen your faith and promote service and love for others.
        </p>
      </div>

      <!-- Right Column -->
      <div class="col-right p-4">

        <!-- Latest Activities -->
        <div>
          <h2 class="text-2xl font-bold">Latest Activities</h2>
          <div class="cards">
            <!-- Loop through activity posts -->
            <div v-for="(activity, index) in filteredPosts('activity')" :key="index" class="card">
              <h3 class="card-title">{{ activity.title }}</h3>
              <p class="card-content">{{ truncateDescription(activity.description) }}</p>
              <router-link :to="`/activity/${activity._id}`" class="activity-link">
                Learn More
              </router-link>
            </div>
          </div>
        </div>

        <!-- Latest Announcements -->
        <div>
          <h2 class="text-2xl font-bold">Latest Announcements</h2>
          <div class="cards">
            <!-- Loop through announcement posts -->
            <div v-for="(announcement, index) in filteredPosts('announcement')" :key="index" class="card">
              <h3 class="card-title">{{ announcement.title }}</h3>
              <p class="card-content">{{ truncateDescription(announcement.description) }}</p>
              <router-link :to="`/announcement/${announcement._id}`" class="announcement-link">
                Learn More
              </router-link>
            </div>
          </div>
        </div>
   
      </div>
      
    </div>
            <!-- Latest Entries -->
      <div >
        <h2 class="text-2xl font-bold">Latest Entries</h2>
        <div class="cards">
          <!-- Loop through posts -->
          <div v-for="(post, index) in posts" :key="index" class="card">
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="card-content">{{ truncateDescription(post.description) }}</p>
            <router-link :to="`/post/${post._id}`" class="post-link">
              Read More
            </router-link>
          </div>
        </div>
        </div>
  </section>
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
    
    truncateDescription(description) {
      return description.length > 20 ? description.slice(0, 20) + "..." : description;
    },
    
    async fetchPosts() {
  const response = await axios.get("http://localhost:3000/");

  if (response.status === 200) {
    // Group posts by type
    const postsByType = {};
    response.data.forEach(post => {
      if (!postsByType[post.type]) {
        postsByType[post.type] = post;
      }
    });

    // Convert the object values into an array of posts
    this.posts = Object.values(postsByType);
    } else {
      // The posts were not fetched successfully
      this.errorMessage = response.data.error;
    }
  },
  },
  computed: {
    filteredPosts() {
      return (type) => {
        return this.posts.filter(post => post.type === type);
      };
    },
  },
};
</script>

<style>
html {
  max-height: fit-content;
}

body {
  font-family: sans-serif;
}

h1,
h2,
h3 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
}
.cards {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card {
  width: 100%; /* Each list item should take up the full width */
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 1rem; 
}
/* Media query for two items per row */
@media screen and (max-width: 768px) {
  .card{
    width: calc(50% - 1rem);
    margin-bottom: 2rem;
  }
}

/* Media query for one item per row */
@media screen and (max-width: 480px) {
  .card {
    width: 100%;
    margin-bottom: 2rem;
  }
}
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}

.col-left {
  grid-column: 1 / span 1;
}

.col-right {
  grid-column: 2 / span 1;
}
</style>
