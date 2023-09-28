<template>
  <div class="container">
    <div class="lider-details">
      <h2 class="leader-name">Detalles del líder: {{ $route.params.nombreLider }}</h2>
      <!-- Add more leader details here -->
      <div class="leader-info">
        <p><strong>Cargo:</strong> {{ $route.params.cargo }}</p>
        <!-- Access other route params as needed -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiderDetails',
};
</script>

<style scoped>
.lider-details {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.leader-name {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  margin-top: 4rem;
}

.leader-info {
  font-size: 16px;
  color: #555;
  margin-top: 1rem;
}

/* Add more styles as needed for leader details */
</style>
