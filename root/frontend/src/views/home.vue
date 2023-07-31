<template>
  <section class="vh-80">
    <div class="container mx-auto">
      <div class="flex justify-center items-center h-100">
        <div class="w-full lg:w-6/12">
          <h1 class="text-3xl font-bold p-4">Welcome to Puerto Tirol Branch</h1>
          <hr>
          <p class="mt-4">
            Discover the latest activities and announcements happening in the Puerto Tirol Branch of the Church of
            Jesus Christ of Latter-day Saints. Stay connected with the community and be part of uplifting and
            meaningful events that strengthen your faith and promote service and love for others.
          </p>
        </div>
      </div>
    </div>

    <!-- Display All Posts -->
    <div class="container mt-5">
      <h2 class="text-2xl font-bold">Upcoming Activities and Announcements</h2>
      <hr>
      <ul class="list-reset">
        <!-- Replace this part with the actual list of activities and announcements -->
        <li>
          <h3 class="text-xl font-bold mb-2">Activity 1</h3>
          <p>Join us for a service project at the local orphanage this Saturday at 10 AM.</p>
        </li>
        <li>
          <h3 class="text-xl font-bold mb-2">Announcement 1</h3>
          <p>The branch leadership meeting will be held on Sunday after the sacrament meeting.</p>
        </li>
        <li>
          <h3 class="text-xl font-bold mb-2">Activity 2</h3>
          <p>Come and participate in the youth fireside next week on Wednesday at 7 PM.</p>
        </li>
        <!-- Add more activities and announcements as needed -->
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
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
</style>
