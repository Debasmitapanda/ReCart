# Re-Cart Marketplace

Re-Cart is a full-stack MERN (MongoDB, Express, React, Node.js) application designed as a comprehensive marketplace for buying and selling items. It features user authentication, real-time notifications, a dashboard for both buyers and sellers, secure payments using Stripe, and image uploads via Cloudinary.

## Features

- **User Authentication**: Secure signup and login using JWT (JSON Web Tokens).
- **Role-Based Access**: Specialized dashboards for different user roles (e.g., Buyer, Seller, Agent).
- **Real-Time Communication**: Live updates and notifications integrated with Socket.io.
- **Product Management**: Sellers can add, edit, and manage their product listings with images uploaded via Cloudinary.
- **Payment Gateway**: Secure checkout and payments processed by Stripe.
- **Responsive Design**: Modern UI/UX built with React and optimized for all devices.

## Tech Stack

### Frontend (Re-Cart)
- **Framework**: React 19 (via Vite)
- **Styling**: Vanilla CSS (index.css, App.css)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Real-Time**: Socket.io Client

### Backend (backend)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs, jsonwebtoken
- **File Uploads**: Multer, Cloudinary
- **Payments**: Stripe
- **Real-Time**: Socket.io

## Project Structure

```text
Buysell/
├── backend/                  # Node.js + Express Backend API
│   ├── src/
│   │   ├── config/           # Configuration files (Database, etc.)
│   │   ├── controllers/      # Route controllers (Business logic)
│   │   ├── middlewares/      # Custom middlewares (Auth, Error handling)
│   │   ├── models/           # Mongoose schemas (Database models)
│   │   ├── routes/           # Express API routes
│   │   ├── services/         # External services integration
│   │   └── server.js         # Entry point for the backend server
│   ├── .env                  # Backend environment variables
│   ├── .env.example          # Example backend environment file
│   └── package.json          # Backend dependencies & scripts
│
├── Re-Cart/                  # React + Vite Frontend
│   ├── public/               # Static assets
│   ├── .env                  # Frontend environment variables
│   ├── .env.example          # Example frontend environment file
│   ├── src/
│   │   ├── api/              # Axios configuration and API calls
│   │   ├── assets/           # Images, icons, and static files
│   │   ├── components/       # Reusable UI components (e.g., NotificationBell)
│   │   ├── context/          # React Context API (e.g., ProductsContext)
│   │   ├── data/             # Mock data or static data definitions
│   │   ├── pages/            # Page-level components (Dashboard, Agent, Seller)
│   │   ├── App.jsx           # Main React component
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # Entry point for the frontend app
│   ├── .env                  # Frontend environment variables
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.js        # Vite configuration
│
└── README.md                 # Project documentation
```
<<<<<<< Updated upstream
Hosted link - https://recart-mgtd.onrender.com
=======

Environment setup
-----------------

Create local `.env` files from the example files and add your real Stripe test keys there.

- `backend/.env`
  - `STRIPE_SECRET_KEY=sk_test_...`
  - `STRIPE_PUBLISHABLE_KEY=pk_test_...`

- `Re-Cart/.env`
  - `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`
  - `VITE_BACKEND_URL=http://localhost:5000`

Do not commit `.env` files. Use `.env.example` as the template

Hosted link - https://recart-mgtd.onrender.com
>>>>>>> Stashed changes
