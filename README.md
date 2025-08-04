# 🛍️ Vue.js E-Commerce Web App

A simple multi-page e-commerce-style web application built with Vue.js 3, Vue Router, and Bootstrap. This project was created for Assignment 3 to demonstrate key front-end development skills such as routing, component use, and user interaction. To access the logging in component, use [Accounts Credentials](https://github.com/joonochakma/interface-assignment3/blob/main/A3/src/assets/users.json) 
```
[
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  },
  {
    "name": "Regular User",
    "email": "user@example.com",
    "password": "user123",
    "role": "user"
  }
]
```

---

## 🔑 Features

- Vue Router navigation (Home, News, About, Shop, etc.)
- Product details with dynamic routing
- User registration and login with role-based access
- Shopping cart functionality
- Admin dashboard (admin-only access)
- Form validation and custom directives
- Responsive design using Bootstrap grid
- Data persistence with JSON and `localStorage`

---

## 🧰 Tech Stack

- Vue.js 3 + Vite
- Vue Router
- Bootstrap (grid system)
- HTML, CSS, JavaScript
- JSON (local file)
- Amazon S3 (deployed)
- Mercury Server (final host)

---

## 🚀 How to Run

```bash
npm install
npm run dev
