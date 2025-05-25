<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Admin Dashboard - Manage Products</h2>
    

    <!-- Add/Edit Product Form -->
    <div class="card shadow-sm mb-5">
      <div class="card-header bg-dark text-white">
        {{ isEditing ? 'Edit Product' : 'Add New Product' }}
      </div>
      <div class="card-body">
        <form @submit.prevent="saveProduct">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="name" class="form-label">Product Name</label>
              <input v-model="productForm.name" type="text" id="name" class="form-control" required />
            </div>

            <div class="col-md-6">
              <label for="category" class="form-label">Category</label>
              <input v-model="productForm.category" type="text" id="category" class="form-control" required />
            </div>

            <div class="col-md-12">
              <label for="description" class="form-label">Description</label>
              <textarea v-model="productForm.description" id="description" class="form-control" rows="3" required></textarea>
            </div>

            <div class="col-md-4">
              <label for="price" class="form-label">Price ($)</label>
              <input v-model.number="productForm.price" type="number" id="price" class="form-control" min="0" step="0.01" required />
            </div>

            <div class="col-md-4">
              <label for="image" class="form-label">Image URL</label>
              <input v-model="productForm.image" type="url" id="image" class="form-control" />
            </div>

            <div class="col-md-4 d-flex align-items-center">
              <div class="form-check mt-4">
                <input v-model="productForm.sale" type="checkbox" id="sale" class="form-check-input" />
                <label for="sale" class="form-check-label">On Sale</label>
              </div>
            </div>
          </div>

          <div class="mt-4 d-flex justify-content-end">
            <button type="submit" class="btn btn-success me-2">{{ isEditing ? 'Update' : 'Add' }} Product</button>
            <button v-if="isEditing" type="button" @click="resetForm" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Product List Table -->
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white">
        Product List
      </div>
      <div class="card-body p-0">
        <table class="table table-striped mb-0">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Sale</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>${{ product.price.toFixed(2) }}</td>
              <td>{{ product.sale ? 'Yes' : 'No' }}</td>
              <td>
                <button class="btn btn-sm btn-warning me-2" @click="editProduct(product)">Edit</button>
                <button class="btn btn-sm btn-danger" @click="deleteProduct(product.id)">Delete</button>
              </td>
            </tr>
            <tr v-if="products.length === 0">
              <td colspan="5" class="text-center py-3">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      products: [],
      productForm: {
        id: null,
        name: '',
        description: '',
        price: 0,
        category: '',
        sale: false,
        image: ''
      },
      isEditing: false
    };
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const saved = localStorage.getItem('products');
      this.products = saved ? JSON.parse(saved) : [];
    },
    saveProducts() {
      localStorage.setItem('products', JSON.stringify(this.products));
    },
    resetForm() {
      this.productForm = {
        id: null,
        name: '',
        description: '',
        price: 0,
        category: '',
        sale: false,
        image: ''
      };
      this.isEditing = false;
    },
    saveProduct() {
      if (this.isEditing) {
        const index = this.products.findIndex(p => p.id === this.productForm.id);
        if (index !== -1) {
          this.products.splice(index, 1, { ...this.productForm });
        }
      } else {
        const newId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        this.products.push({ ...this.productForm, id: newId });
      }
      this.saveProducts();
      this.resetForm();
      alert('Product saved successfully!');
    },
    editProduct(product) {
      this.productForm = { ...product };
      this.isEditing = true;
      window.scrollTo(0, 0);
    },
    deleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.products = this.products.filter(p => p.id !== id);
        this.saveProducts();
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 950px;
}

.card {
  border-radius: 10px;
}

.card-header {
  font-weight: 500;
  font-size: 1.1rem;
}

.table td,
.table th {
  vertical-align: middle;
}

.table tr:hover {
  background-color: #f9f9f9;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
