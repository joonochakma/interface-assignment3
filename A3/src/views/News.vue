<template>
  <div class="container mt-4">
    <h2 class="mb-4">Latest News</h2>

    <div class="row mb-3">
      <div class="col-md-6">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search by date, title, content, or category"
        />
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-6 mb-4"
        v-for="item in paginatedNews"
        :key="item.id"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {{ item.date }} | {{ item.category }}
            </h6>
            <p class="card-text">{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <nav>
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
        >
          <button class="page-link" @click="prevPage">Previous</button>
        </li>

        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
        >
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import newsData from '../assets/news.json'

export default {
  name: 'News',
  data() {
    return {
      newsItems: newsData,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 4,
    }
  },
  computed: {
    filteredNews() {
      const query = this.searchQuery.toLowerCase()
      return this.newsItems.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.date.includes(query)
        )
      })
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage)
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredNews.slice(start, start + this.itemsPerPage)
    },
  },
  methods: {
    goToPage(page) {
      this.currentPage = page
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
  },
}
</script>

<style scoped>
.card {
  height: 100%;
}
</style>
