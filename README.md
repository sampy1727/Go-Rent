# 🚗 GoRent

**GoRent** is a full-stack car rental web application that allows users to browse, book, and manage rental cars seamlessly. Built with a modern tech stack and robust backend, GoRent offers both admin and customer functionalities with a clean UI and secure authentication.

---

## 🔧 Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token)


---

## ✨ Features

### 👥 Authentication & Authorization
- User registration and login
- Secure JWT-based session handling
- Role-based access (admin vs user)

### 🚘 Car Management
- Admin can add, edit, or delete car listings
- Each car has a name, image, description, price, availability, etc.

### 📅 Booking System
- Users can book available cars with specific dates
- Booking validation to prevent overlaps
- View past and upcoming bookings

### 🛡️ Protected Routes
- Users cannot access admin or other users' data
- Admin dashboard with full car/booking control
