import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import News from '../views/News.vue';
import About from '../views/About.vue';
import Shop from '../views/Shop.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Cart from '../views/Cart.vue';
import AdminDashboard from '../views/AdminDashboard.vue'; 

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/news', name: 'News', component: News },
  { path: '/about', name: 'About', component: About },
  { path: '/shop', name: 'Shop', component: Shop, meta: { requiresAuth: true } },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/dashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, requiresAdmin: true } 
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const authUser = localStorage.getItem('authUser');
  const user = authUser ? JSON.parse(authUser) : null;
  const isAuthenticated = !!user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAdmin && (!user || user.role !== 'admin')) {
    // block access if user is not admin
    next('/'); // redirect to home or unauthorized page if you have one
  } else {
    next();
  }
});

export default router;
