# Ecommerce Backend — Node.js + Express + MongoDB

Robust, scalable, and modular eCommerce backend built with **Node.js**, **Express**, and **MongoDB**.  
Designed to power real-world eCommerce systems with features like JWT authentication, cart/order management, and Razorpay payment integration.

## Features

- **JWT Authentication** — Secure login and protected routes
- **Admin/User Roles** — Separate access flows
- **Product CRUD APIs** — Full control over product inventory (Admin only)
- **Cart System** — Add, update, and remove cart items per user
- **Order Placement** — Checkout flow connected to real payment gateway
- **Razorpay Integration** — Accept payments securely
- **Order History** — View user-specific orders
- **Admin Panel APIs** — Update order status, manage products
- **Modular MVC Architecture** — Clean and maintainable codebase

## Tech Stack

| Layer        | Tech Used                            |
|--------------|---------------------------------------|
| Backend      | Node.js, Express                     |
| Database     | MongoDB (via Mongoose)               |
| Auth         | JWT, bcrypt                          |
| Payment      | Razorpay                             |
| Dev Tools    | Postman, Nodemon, dotenv             |

## Folder Structure
Ecommerce-backend
│
├── controllers/ # Route handlers (auth, product, cart, order, payment)
├── models/ # Mongoose schemas
├── routes/ # Express routers per feature
├── middlewares/ # JWT auth, error handlers, role guards
├── config/ # DB config, Razorpay setup
├── utils/ # Helper functions
├── .env.example # Sample environment variables
├── server.js # App entry point
└── README.md

## Environment Variables

Create a `.env` file at the root of the project. Here’s the template (`.env.example` is also provided):
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

## Testing with Postman
Import the included Postman collection.
Use /auth/login to obtain a JWT token.
Pass the token as Authorization: Bearer <token> for protected routes.

## Security Notes
API keys and secrets are loaded via .env and never committed to version control.
Routes are protected with role-based middleware.
Passwords are hashed with bcrypt before storage.

## Design Principles
Separation of Concerns: Clean controller-router-model structure.
Reusable Middleware: Auth guards, admin checks, and error wrappers.
Environment-Based Config: Works seamlessly for dev and production.
Scalable & Extendable: Ready for features like wishlist, coupon codes, etc.


