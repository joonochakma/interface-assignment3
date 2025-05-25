export default {
  mounted(el, binding) {
    if (binding.value) {
      el.style.border = '2px solid red';
      el.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
    }
  }
};
