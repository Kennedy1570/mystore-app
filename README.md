# E-Commerce Website

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js), deployed on AWS EC2.

Live demo: [http://3.145.183.238:3000/](http://3.145.183.238:3000/)

## Features

- User authentication with JWT and bcrypt password hashing
- Responsive product catalog with search, filter, and sorting
- Shopping cart and checkout functionality
- User profile management
- Admin dashboard for product management
- CI/CD workflow for seamless deployment

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: AWS EC2

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-website.git
cd ecommerce-website
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Run the application
```bash
# Run backend
cd backend
npm run dev

# Run frontend
cd ../frontend
npm start
```

## Project Structure

```
├── backend/           # Express server
├── frontend/          # React application
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## License

MIT
