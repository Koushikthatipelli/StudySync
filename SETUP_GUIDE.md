# StudySync - Full Stack Setup Guide

This is a complete full-stack application with Next.js frontend and Express.js backend with MongoDB.

## Project Structure

```
studysync/
├── src/                    # Next.js frontend
│   ├── app/               # App directory (pages)
│   ├── components/        # React components
│   └── lib/              # Utilities and API client
├── backend/              # Express.js backend
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server entry point
│   ├── package.json
│   └── .env
├── package.json         # Frontend dependencies
└── .env.local          # Frontend environment variables
```

## Quick Start

### 1. Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studysync
JWT_SECRET=your_secret_key_change_this_in_production
FRONTEND_URL=http://localhost:3000
```

Start MongoDB:
```bash
# If using local MongoDB
mongod
```

Start backend server:
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### 2. Setup Frontend

```bash
# In the root directory
npm install
```

Create/update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

## Testing the Application

1. Open `http://localhost:3000` in your browser
2. Click "Create account" to register a new user
3. Fill in email, name, and password
4. After registration, you'll be redirected to the dashboard
5. Click "Dashboard" in navbar to access your dashboard
6. Click "Logout" to sign out

## API Testing

Test the API using curl or Postman:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Current User (requires token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get All Users
```bash
curl http://localhost:5000/api/users
```

## Technologies Used

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## Features

- ✅ User registration and login
- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Protected routes (dashboard requires login)
- ✅ User profile management
- ✅ Responsive UI with Tailwind CSS

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check if port 5000 is available

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors

### Login/Register fails
- Check backend console for error messages
- Verify MongoDB connection
- Make sure backend is running

## Production Deployment

For production, you'll need to:

1. Set strong `JWT_SECRET` in backend
2. Use MongoDB Atlas or similar managed database
3. Update `FRONTEND_URL` and API URLs to production domains
4. Set `NODE_ENV=production`
5. Enable HTTPS
6. Use environment-specific `.env` files

## Support

For issues or questions, check the backend and frontend README files for more details.
