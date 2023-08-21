<template>
  <div class="p-4 m-4 bg-gray-100 ">
    <h1 class="text-3xl font-bold mb-4">Algunos recursos útiles</h1>
    <br>
    <hr>
    <div class="links-container">
      <a href="https://www.churchofjesuschrist.org/" target="_blank" rel="noopener noreferrer" class="link">
        Sitio Oficial de la Iglesia
      </a>
      <a href="https://www.comeuntochrist.org/" target="_blank" rel="noopener noreferrer" class="link">
        ComeUntoChrist.org
      </a>
      <a href="https://newsroom.churchofjesuschrist.org/" target="_blank" rel="noopener noreferrer" class="link">
        Sala de prensa
      </a>
      <a href="https://speeches.byu.edu/" target="_blank" rel="noopener noreferrer" class="link">
        Discursos de BYU
      </a>
    </div>
    <hr>
  </div>
</template>

<style scoped>
.links-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.link {
  color: #007acc;
  text-decoration: none;
  transition: color 0.2s, text-decoration 0.2s;
}

.link:hover {
  color: #00569e;
  text-decoration: underline;
}

@media (min-width: 768px) {
  .links-container {
    flex-direction: row;
  }

  .link {
    margin: 0 1rem;
  }
}
</style>
