<template>
  <div class="container mt-5">
    <div v-if="product">
      <div class="row">
        <div class="col-md-6">
          <img :src="product.image" class="img-fluid" :alt="product.title" />
        </div>
        <div class="col-md-6">
          <h2>{{ product.title }}</h2>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p>{{ product.description }}</p>
          <h4 class="text-success">${{ product.price }}</h4>
          <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import products from '../assets/products.json';

export default {
  name: 'ProductDetails',
  data() {
    return {
      product: null
    };
  },
  methods: {
    addToCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(this.product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    }
  },
  mounted() {
    const productId = this.$route.params.id;
    this.product = products.find(p => p.id.toString() === productId);
  }
};
</script>

<style scoped>
img {
  max-height: 400px;
  object-fit: contain;
  margin-bottom: 1rem;
}
</style>