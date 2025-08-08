# 🚘 Car Rental System - Backend API (Express + MongoDB + Firebase)

This repository hosts the backend for the **Car Rental System**, a full-featured application enabling users to add, book, update, and delete car rentals, manage bookings, and securely authenticate using Firebase with JWT support.

---

## 🔌 Live 

- **Backend  API:** [`https://car-sale-web-server.vercel.app`](https://car-sale-web-server.vercel.app)
## 🔍 Live Demo

**Client:** [https://car-sale-website-aea7c.web.app](https://car-sale-website-aea7c.web.app)\
**Server:** [https://car-sale-web-server.vercel.app](https://car-sale-web-server.vercel.app)\
**Client Side Repo :** [https://github.com/shakib071/Car-Sale-Website-Server-Side](https://github.com/shakib071/Car-Sale-Website-Server-Side)

---

## 🎯 Project Objective

To provide RESTful API endpoints to support a modern car rental platform, including:

- Car listing management (add/update/delete)
- Car booking system with live availability
- Firebase Authentication & JWT Protection
- Secure MongoDB operations
- Sorting, filtering, and search functionality

---

## 🚀 Tech Stack

- **Node.js** + **Express.js** - Backend Framework
- **MongoDB** - NoSQL Database
- **Firebase Admin SDK** - User Authentication & Token Verification
- **JWT (via Firebase)** - Secure Authorization
- **dotenv** - Manage Environment Variables

---

## 🧩 API Features

### 🔐 Authentication

- Firebase token verification middleware (`verifyFirebaseToken`)
- Restricts access to private user-specific routes

### 🚗 Car APIs

- `GET /allCars` - Fetch all cars (with optional sorting by `date` or `price`)
- `GET /myCars/:userId` - Get cars listed by a specific user (protected)
- `GET /car-details/:id` - Fetch car details by ID
- `POST /addCar` - Add new car entry (includes default `bookingCount: 0`)
- `PATCH /update-my-car/:id` - Update existing car details
- `DELETE /delete-cars/:id` - Delete a car listing

### 📅 Booking APIs

- `POST /booking` - Book a car, and increment its `bookingCount`
- `GET /bookings/:userId` - Get bookings by user (protected)
- `PATCH /update-booking-data/:id` - Modify booking date/details

---

## 🔒 Protected Routes

- `GET /myCars/:userId`
- `GET /bookings/:userId`

These routes use `verifyFirebaseToken` middleware to match user UID with the request.

---

## 📦 Environment Variables (.env)

PORT=5000
DB_USER=your_db_user
DB_PASS=your_db_password
FIREBASE_SERVICE_KEY=your_base64_encoded_service_account_key
```

> 🔐 **Note:** Firebase Admin key is base64 encoded and parsed server-side to enhance security.

---


## 🛠️ Backend Dependencies

| Package            | Purpose                                                         |
| ------------------ | --------------------------------------------------------------- |
| **express**        | Web framework for building RESTful APIs                         |
| **cors**           | Enable Cross-Origin Resource Sharing                            |
| **dotenv**         | Load environment variables from a `.env` file                   |
| **mongodb**        | Official MongoDB driver for Node.js                             |
| **firebase-admin** | Manage Firebase from server side, verify tokens                 |
| **jsonwebtoken**   | Generate and verify JWT tokens                                  |
| **cookie-parser**  | Parse cookies in requests, especially useful for JWT in cookies |
| **nodemon** (dev)  | Development tool that auto-restarts the server on changes       |


---

## 🧪 Sample Request

### Booking a Car

```http
POST /booking
Content-Type: application/json
Authorization: Bearer <firebase_token>

{
  "carId": "car_mongodb_id",
  "userWhoAdded": { "uid": "firebase_uid" },
  "bookingDate": "2025-08-10",
  "bookingDetails": { ... }
}
```

---

## 🧰 Core Middleware

- `express.json()` for parsing body
- `cors()` to handle CORS
- `verifyFirebaseToken()` for authorization

---




## 🧠 Notable Backend Logic

- Sorting on `/allCars` and `/myCars` using query params:
  - `?sort=date-asc`
  - `?sort=price-desc`
- Booking updates with `$inc` operator for `bookingCount`
- Error handling with `try-catch` and status codes

---

## 🧪 Development & Deployment

### Dev Start

```bash
npm install
npm run dev
```

### Deployment

- Hosted on **Render** for backend
- MongoDB Atlas cloud DB connection

---

## 👨‍💻 Author

**Shakib Hasan**\
[GitHub](https://github.com/shakib071) • 

---

> 💬 "Drive your code like you drive your car – smart, fast, and bug-free!"

