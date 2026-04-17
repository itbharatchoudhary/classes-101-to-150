# Clothing E-Commerce Platform

A professional full-stack e-commerce application designed for both buyers and sellers, built with a modern tech stack to ensure high performance, security, and a premium user experience.

## 🚀 Project Overview

This project is a comprehensive marketplace for clothing, featuring a robust backend and a highly interactive frontend. It supports multi-role users (Buyer & Seller) and integrates advanced features like OAuth authentication and optimized image management.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Utilizing the latest React features for efficient rendering.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS 4**: Modern styling for a clean, responsive, and aesthetic UI.
- **Redux Toolkit**: Centralized state management for a predictable application flow.
- **Framer Motion**: Smooth, high-performance animations for a premium feel.
- **React Router**: Seamless client-side navigation.
- **Axios**: Efficient API communication with the backend.

### Backend
- **Node.js & Express 5**: Scalable server-side logic using the latest Express version.
- **MongoDB & Mongoose**: Flexible and powerful NoSQL database management.
- **Passport.js**: robust authentication middleware supporting:
  - **Google OAuth 2.0**: Easy social login.
  - **Local Auth**: Traditional email/password signup and login.
- **JWT & Cookies**: Secure, stateful authentication using JSON Web Tokens and HTTP-only cookies.
- **ImageKit**: Cloud-based image optimization and management.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.

## 📂 Project Structure

```text
├── Backend/
│   ├── src/
│   │   ├── config/      # System configurations
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth & validation checks
│   │   ├── model/       # Database schemas (User, Product)
│   │   ├── routes/      # API endpoints (Auth, Products)
│   │   ├── services/    # Business logic
│   │   └── validator/   # Data validation schemas
│   └── server.js        # Server entry point
└── Frontend/
    ├── src/
    │   ├── app/         # Redux store & global logic
    │   ├── features/    # Modular business features (Auth, Products)
    │   ├── assets/      # Static files
    │   └── main.jsx     # Frontend entry point
```

## ✨ Key Features Implemented So Far

- [x] **Secure Authentication**: Implementation of both local and Google OAuth 2.0 systems.
- [x] **State Management**: Redux Toolkit integration for managing user session and product data.
- [x] **Database Modeling**: Mongoose schemas for Users (Buyer/Seller roles) and Products (Clothing details).
- [x] **API Architecture**: Clean RESTful API design with separation of routes and controllers.
- [x] **File Handling**: Image upload capability via Multer and cloud hosting with ImageKit.
- [x] **Premium UI/UX**: Responsive layout using Tailwind 4 and micro-animations with Framer Motion.
- [x] **Environment Security**: Sensitive data managed via `.env` files.

## 🛠️ Next Steps & Roadmap
- [ ] Implement Product Search and Filtering (Aggregation pipelines).
- [ ] Integrated Payment Gateway (Stripe/Razorpay).
- [ ] Seller Dashboard for product management.
- [ ] Real-time Order Tracking and Notifications.
- [ ] Deployment on AWS/ASM.

---
*Created as part of the Web Development Practice series (Classes 101-150).*