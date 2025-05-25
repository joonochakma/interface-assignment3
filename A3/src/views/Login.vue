<template>
  <div class="container mt-5">
    <h2 class="mb-4">Login</h2>
    <form @submit.prevent="loginUser" novalidate>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input v-model="form.email" type="email" class="form-control" id="email" required>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="form.password" type="password" class="form-control" id="password" required>
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
      <p class="mt-3 text-danger" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import users from '../assets/users.json';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    loginUser() {
      this.error = '';
      const matchedUser = users.find(
        user =>
          user.email === this.form.email &&
          user.password === this.form.password
      );

      if (!matchedUser) {
        this.error = 'Invalid email or password.';
        return;
      }

      localStorage.setItem('authUser', JSON.stringify(matchedUser));

      // Force reload so App.vue picks up the new login state
      this.$router.push(matchedUser.role === 'admin' ? '/dashboard' : '/shop');


    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
