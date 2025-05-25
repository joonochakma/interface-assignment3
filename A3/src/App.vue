<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/news">News</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/shop">Shop</router-link> |
      <router-link to="/cart">Cart</router-link> |
      <router-link v-if="!isAuthenticated" to="/register">Register</router-link> |
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="isAdmin" to="/dashboard">Admin Dashboard</router-link>
      <span v-if="isAuthenticated">
        | <a href="#" @click.prevent="logout">Logout</a>
      </span>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.user;
    },
    isAdmin() {
      return this.user?.role === 'admin';
    }
  },
  created() {
    const storedUser = localStorage.getItem('authUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  },
  methods: {
    logout() {
      localStorage.removeItem('authUser');
      this.user = null; // reset user state
      this.$router.push('/');
    }
  }
};
</script>


<style scoped>
nav {
  background-color: #333;
  padding: 1rem;
  text-align: center;
}
nav a {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
}
nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
main {
  padding: 2rem;
}
</style>
