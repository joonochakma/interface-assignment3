<template>
  <div class="container mt-4">
    <h2 class="mb-4">Shop</h2>

    <!-- Search & Filters -->
    <div class="row mb-3">
      <div class="col-md-4">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Search products...">
      </div>
      <div class="col-md-4">
        <select v-model="selectedCategory" class="form-select">
          <option value="">All Categories</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Products List -->
    <div class="row">
      <div v-for="product in paginatedProducts" :key="product.id" class="col-md-3 mb-4">
        <div class="card h-100" v-sale="product.sale">
          <img :src="product.image" class="card-img-top" alt="Product image">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text fw-bold">${{ product.price }}</p>
            <button class="btn btn-outline-primary me-2" @click="likeProduct(product)">
              ❤️ {{ product.likes }}
            </button>
            <button class="btn btn-success" @click="addToCart(product)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import products from '../assets/products.json';

export default {
  name: 'Shop',
  data() {
    return {
      products: products.map(p => ({ ...p, likes: 0 })),
      searchQuery: '',
      selectedCategory: '',
      currentPage: 1,
      perPage: 4,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             p.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === '' || p.category === this.selectedCategory;
        return matchesQuery && matchesCategory;
      });
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredProducts.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.perPage);
    },
    uniqueCategories() {
      return [...new Set(this.products.map(p => p.category))];
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) this.currentPage = page;
    },
    likeProduct(product) {
      product.likes++;
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart`);
    }
  }
};
</script>

<style scoped>
.card img {
  object-fit: cover;
  height: 200px;
}
</style>
