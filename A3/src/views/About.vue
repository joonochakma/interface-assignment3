<template>
  <div class="container mt-4">
    <h2>About This App</h2>
    <p>
      VueStore is a modern e-commerce platform designed for seamless online shopping. It combines performance, interactivity, and mobile-first design.
    </p>

    <div class="row mt-4">
      <div class="col-md-6">
        <label for="firstName" class="form-label">First Name</label>
        <input
          v-model="firstName"
          type="text"
          class="form-control"
          id="firstName"
          placeholder="Enter your first name"
        />
      </div>

      <div class="col-md-6">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          v-model="lastName"
          type="text"
          class="form-control"
          id="lastName"
          placeholder="Enter your last name"
        />
      </div>
    </div>

    <div v-if="firstName || lastName" class="mt-3">
      <h4>Welcome, {{ fullName }}!</h4>
    </div>

    <div class="mt-4">
      <label class="form-label">Choose a theme:</label>
      <div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="shopping"
            value="Shopping"
            v-model="selectedImage"
          />
          <label class="form-check-label" for="shopping">Shopping</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="ecommerce"
            value="Ecommerce"
            v-model="selectedImage"
          />
          <label class="form-check-label" for="ecommerce">Ecommerce</label>
        </div>
      </div>

      <div class="mt-3">
        <img
          v-if="selectedImage"
          :src="imageUrl"
          alt="Selected theme image"
          class="img-fluid rounded shadow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import shoppingImage from '@/assets/shopping.jpg'
import ecommerceImage from '@/assets/ecommerce.jpg'

export default {
  name: 'About',
  data() {
    return {
      firstName: '',
      lastName: '',
      selectedImage: '',
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`.trim()
    },
    imageUrl() {
      if (this.selectedImage === 'Shopping') return shoppingImage
      if (this.selectedImage === 'Ecommerce') return ecommerceImage
      return ''
    },
  },
}
</script>

<style scoped>
img {
  max-height: 400px;
  object-fit: cover;
}
</style>
