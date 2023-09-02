<template>
  <div class="container mx-auto px-4 py-8 container-posts">
    <h1 class="text-3xl font-semibold p-4">All Posts</h1>
    <div>
      <label for="filter">Filtrar por tipo:</label>
      <select id="filter" v-model="selectedType">
        <option value="">Todos</option>
        <option value="announcement">Anuncios</option>
        <option value="activity">Actividades</option>
      </select>
    </div>
    <div class="cards">
      <div v-for="(post, index) in filteredPosts" :key="index" class="card">
        <h2 class="card-title">{{ post.title }}</h2>
        <h6>Descripcion</h6>
        <p class="card-content">{{ post.description }}</p>
        <h6>Fecha</h6>
        <p class="card-content">{{ post.date }}</p>
        <router-link :to="`/post/${post._id}`" class="card-link">
          Más Información
        </router-link>
      </div>
    </div>
   </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      selectedType: "", // Holds the selected type for filtering
    };
  },

  created() {
    this.fetchPosts();
  },

  beforeRouteUpdate(to, from, next) {
    // Fetch the updated posts when the route changes
    this.fetchPosts();
    next();
  },

  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get("https://puerto-tirol-branchs-production.up.railway.app/");

        if (response.status === 200) {
          // The posts were fetched successfully
          this.posts = response.data;
        } else {
          // The posts were not fetched successfully
          this.errorMessage = response.data.error;
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
  
  computed: {
    filteredPosts() {
      if (this.selectedType === "") {
        return this.posts; // Show all posts if no filter selected
      } else {
        return this.posts.filter(post => post.type === this.selectedType);
      }
    },
  },

};
</script>


<style scoped>
.container-posts {
  padding: 2rem;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;
  margin-bottom: 3rem;
}

.card {
  flex: 0 0 calc(33.333% - 1rem); /* Adjust the percentage as per your preference */
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  /* Add any other styling you want to the individual cards */
}

/* Media query for two cards per row */
@media screen and (max-width: 768px) {
  .card {
    flex: 0 0 calc(50% - 1rem);
  }
}

/* Media query for one card per row */
@media screen and (max-width: 480px) {
  .card {
    flex: 0 0 100%;
  }
}


</style>
