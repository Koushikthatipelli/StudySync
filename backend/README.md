# StudySync Backend

Express.js backend server with MongoDB database for StudySync application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally, or MongoDB Atlas connection string

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studysync
JWT_SECRET=your_secret_key_here_change_in_production
FRONTEND_URL=http://localhost:3000
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /me` - Get current user (requires token)
- `POST /logout` - Logout user (requires token)
- `PUT /profile` - Update user profile (requires token)

### Users Routes (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/studysync |
| JWT_SECRET | Secret key for JWT tokens | (required) |
| FRONTEND_URL | Frontend application URL | http://localhost:3000 |

## Database

MongoDB collections:
- `users` - Stores user information including email, password (hashed), profile data

## Security Features

- Password hashing with bcryptjs
- JWT authentication
- Input validation with express-validator
- CORS enabled
- Environment variables for sensitive data
