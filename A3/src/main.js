import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

// Custom directive for highlighting products on sale
app.directive('sale', {
  mounted(el, binding) {
    if (binding.value) {
      el.style.border = '2px solid red';
      el.style.position = 'relative';

      const badge = document.createElement('div');
      badge.innerText = 'SALE';
      badge.style.position = 'absolute';
      badge.style.top = '10px';
      badge.style.right = '10px';
      badge.style.background = 'red';
      badge.style.color = 'white';
      badge.style.padding = '2px 6px';
      badge.style.fontSize = '12px';
      badge.style.borderRadius = '4px';

      el.appendChild(badge);
    }
  }
});

app.use(router).mount('#app');
