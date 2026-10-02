# Authentication & Product CRUD Application

A full-stack e-commerce application built with React, Node.js, Express, MongoDB and JWT authentication.

The project provides user authentication and complete Product CRUD functionality through REST APIs, along with a React frontend for consuming the APIs.

## Features

### Authentication

- User registration
- User login
- JWT access token authentication
- JWT refresh token authentication
- Logout
- Get logged-in user profile
- Password hashing using bcrypt
- Protected routes

### Product Management

- Create product
- Get all products
- Get a single product
- Update product
- Delete product
- Protected write operations
- Product validation

### Frontend

- Register page
- Login page
- Protected product page
- Add product form
- Edit product form
- Delete product
- React Router navigation
- Axios API integration
- Tailwind CSS UI

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- CORS

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Vite

## Project Structure

```text
auth-product-api/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

### Backend Setup

## Go to the backend directory:

- cd backend

Install dependencies:

- npm install

- Create a .env file:

```text
PORT=3000
MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Start the backend:

- npm run dev

The backend will run on:

- http://localhost:3000

### Frontend Setup

## Open another terminal and go to the frontend directory:

- cd frontend

Install dependencies:

- npm install

Start the development server:

- npm run dev

The frontend will run on:

- http://localhost:5173

### API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive tokens |
| POST | `/api/auth/refresh-token` | Public* | Generate a new access token |
| POST | `/api/auth/logout` | Authenticated | Logout and invalidate refresh token |
| GET | `/api/auth/me` | Authenticated | Get logged-in user |

### Products

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/products` | Authenticated | Create a product |
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get a single product |
| PUT | `/api/products/:id` | Authenticated | Update a product |
| DELETE | `/api/products/:id` | Authenticated | Delete a product |

### Authentication

Protected endpoints require an access token in the request header:

Authorization: Bearer <access_token>

# Product Example
{
  "name": "Pant",
  "description": "This is a comfortable pant",
  "price": 699,
  "stock": 5,
  "category": "pant"
}
## Validation

The application uses express-validator to validate authentication and product inputs.

# Examples include:

- Required fields
- Valid email format
- Password length
- Confirm password matching
- Product field validation
- Product price and stock validation
- Product ID validation

Invalid requests return appropriate 400 responses with validation errors.

## Submission

### GitHub Repository

[Backend - Auth Product API](https://github.com/DeeprajSaha/Backend/tree/main/auth-product-api)

### Live Project

[Auth Product API - Live Demo](https://backend-auth-drab.vercel.app/login)