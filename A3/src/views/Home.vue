<template>
  <div class="container mt-4">
    <div class="text-center mb-4">
      <h1 class="display-4">Welcome to VueStore</h1>
      <p class="lead">
        Discover the best products at unbeatable prices. Browse our collection and shop with confidence!
      </p>
    </div>

    <div class="row">
      <div class="col-md-6 mb-4">
        <img
          src="../assets/shopping.jpg"
          class="img-fluid rounded shadow"
          alt="Shopping experience"
        />
      </div>
      <div class="col-md-6 mb-4">
        <img
          src="../assets/ecommerce.jpg"
          class="img-fluid rounded shadow"
          alt="E-commerce platform"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
@media (max-width: 576px) {
  h1 {
    font-size: 1.75rem;
  }
  .lead {
    font-size: 1rem;
  }
}
img {
  height: 300px; 
  object-fit: cover;
  width: 100%; 
}
</style>

