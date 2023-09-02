<template>
  <section class="page-container">
    <br>
    <h1 class="page-title">Bienvenidos a la Rama Puerto Tirol</h1>
    
    <p class="page-description">
      Descubre las últimas actividades y anuncios que ocurren en la Rama Puerto Tirol de La Iglesia de Jesucristo de los Santos de los Últimos Días. Mantente conectado con la comunidad y forma parte de eventos edificantes y significativos que fortalecen tu fe y promueven el servicio y el amor hacia los demás.
    </p>
    <hr>
    <div class="container">
      <!-- Left Column - Welcome Message -->
      <div class="col-left">
        <hr class="section-divider">
        <img :src="getImageSource()" alt="image" class="welcome-image">
        <hr class="section-divider">
      </div>

      <!-- Right Column -->
      <div class="col-right">

        <!-- Latest Activities -->
        <div>
          <h2 class="section-title">Últimas Actividades</h2>
          <div class="card-container">
            <!-- Loop through activity posts -->
            <div v-for="(activity, index) in filteredPosts('activity')" :key="index" class="card">
              <h3 class="card-title">{{ activity.title }}</h3>
              <p class="card-content">{{ truncateDescription(activity.description) }}</p>
              <router-link :to="`/post/${activity._id}`" class="activity-link">
                Más Información
              </router-link>
            </div>
          </div>
        </div>

        <!-- Latest Announcements -->
        <div>
          <h2 class="section-title">Últimos Anuncios</h2>
          <div class="card-container">
            <!-- Loop through announcement posts -->
            <div v-for="(announcement, index) in filteredPosts('announcement')" :key="index" class="card">
              <h3 class="card-title">{{ announcement.title }}</h3>
              <p class="card-content">{{ truncateDescription(announcement.description) }}</p>
              <router-link :to="`/post/${announcement._id}`" class="announcement-link">
                Más Información
              </router-link>
            </div>
          </div>
        </div>
   
      </div>
    </div>
    <LDSLinksPage></LDSLinksPage>
    <!-- Latest Entries -->
    <div class="latest-entries">
      <LatestEntriesPage></LatestEntriesPage>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import LDSLinksPage from "./Links.vue";
import LatestEntriesPage from "./LatestEntries.vue";


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
    getImageSource() {
      return require("../assets/faith.jpg");
    },
    truncateDescription(description) {
      return description.length > 20 ? description.slice(0, 20) + "..." : description;
    },
    
    async fetchPosts() {
  const response = await axios.get("https://puerto-tirol-branchs-production.up.railway.app/");

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
  components: {
    LDSLinksPage,
    LatestEntriesPage,
  },
};
</script>

<style scoped>
.page-container {
  padding: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.section-divider {
  margin: 2rem 0;
}

.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: center;
  justify-items: center;
}

.col-left img.welcome-image {
  max-width: 100%;
  height: auto;
}

.col-right {
  width: 24rem;
}

.col-right .section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1.5fr));
  gap: 1.5rem;
}

.card {
  padding: .5rem;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.latest-entries {
  margin-top: 2rem;
}

/* Media query for tablet screens */
@media screen and (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
  
  .col-left img.welcome-image {
    max-width: 100%;
    height: auto;
  }
  
  .card-container {
    grid-template-columns: 1fr;
  }
}

/* Media query for mobile screens */
@media screen and (max-width: 480px) {
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }
}
</style>
