<template>
  <div class="container mt-5">
    <h2 class="mb-4">Register</h2>
    <form @submit.prevent="registerUser" novalidate aria-label="User registration form">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          class="form-control"
          required
          :aria-invalid="submitted && !name ? 'true' : 'false'"
          aria-required="true"
          aria-describedby="nameError"
        />
        <div v-if="submitted && !name" id="nameError" class="text-danger" role="alert">
          Name is required.
        </div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="form-control"
          required
          :aria-invalid="submitted && !validEmail ? 'true' : 'false'"
          aria-required="true"
          aria-describedby="emailError"
        />
        <div v-if="submitted && !validEmail" id="emailError" class="text-danger" role="alert">
          Enter a valid email.
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="form-control"
          required
          minlength="6"
          :aria-invalid="submitted && password.length < 6 ? 'true' : 'false'"
          aria-required="true"
          aria-describedby="passwordError"
        />
        <div v-if="submitted && password.length < 6" id="passwordError" class="text-danger" role="alert">
          Password must be at least 6 characters.
        </div>
      </div>

      <button type="submit" class="btn btn-primary" aria-label="Register account">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      submitted: false
    };
  },
  computed: {
    validEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    }
  },
  methods: {
    registerUser() {
      this.submitted = true;

      if (!this.name || !this.validEmail || this.password.length < 6) {
        return;
      }

      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      localStorage.setItem('authUser', JSON.stringify(newUser));
      alert('Registration successful!');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.text-danger {
  font-size: 0.9rem;
  color: red;
}
</style>
