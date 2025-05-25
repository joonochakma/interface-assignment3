<template>
  <div class="container mt-5">
    <h2>Your Cart</h2>
    <div v-if="cart.length > 0">
      <table class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.name }}</td>
            <td>${{ item.price }}</td>
            <td><button class="btn btn-danger btn-sm" @click="removeFromCart(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <h4>Total: ${{ totalPrice }}</h4>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: []
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
    }
  },
  methods: {
    removeFromCart(index) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  },
  mounted() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
