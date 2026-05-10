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
│   └── package.json          # Backend dependencies & scripts
│
├── Re-Cart/                  # React + Vite Frontend
│   ├── public/               # Static assets
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

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- Accounts for Stripe and Cloudinary (for API keys)

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Buysell
```

### 2. Setup the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Setup the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Re-Cart
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Re-Cart` directory and configure the backend URL:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License.
