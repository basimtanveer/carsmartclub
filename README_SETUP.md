# Car Smart Club - Setup Instructions

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Setup Environment Variables
Create a `.env` file in the root directory with:
```env
MONGODB_URI=mongodb://localhost:27017/carsmartclub
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 3. Start MongoDB (if running locally)
Make sure MongoDB is running on your system. If not installed, you can:
- Install MongoDB locally, OR
- Use MongoDB Atlas (cloud) and update MONGODB_URI in .env

### 4. Seed Initial Data (Optional but Recommended)
```bash
npm run seed
```
This will populate:
- Plans (Free, Smart, Premium, Family)
- Sample Rewards
- Sample Providers
- Sample Deals

### 5. Start the Application

**IMPORTANT: You need TWO terminal windows!**

#### Terminal 1 - Backend Server (Express + MongoDB)
```bash
npm run server:dev
```
This starts the Express backend on `http://localhost:5000`

#### Terminal 2 - Frontend Server (Next.js)
```bash
npm run dev
```
This starts the Next.js frontend on `http://localhost:3000`

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## Troubleshooting

### "Failed to fetch" or "ERR_CONNECTION_REFUSED" Errors
- **Solution**: Make sure the backend server is running in Terminal 1
- Check if port 5000 is available: `netstat -ano | findstr :5000`

### MongoDB Connection Errors
- **Solution**: Make sure MongoDB is running
- Check connection string in `.env` file
- For local MongoDB: `mongodb://localhost:27017/carsmartclub`
- For MongoDB Atlas: Use your Atlas connection string

### Port Already in Use
- **Solution**: Change PORT in `.env` or kill the process using the port
- Windows: `netstat -ano | findstr :5000` then `taskkill /PID <pid> /F`

## Project Structure

```
carwebsite/
├── pages/              # Next.js pages (frontend)
│   ├── index.jsx      # Home page
│   ├── garage.jsx    # Vehicle management
│   ├── diagnostics.jsx
│   ├── evaluation.jsx
│   ├── earn-points.jsx
│   ├── redeem-points.jsx
│   ├── plans.jsx
│   └── ...
├── server/            # Express backend
│   ├── index.js      # Server entry point
│   ├── config/       # Database configuration
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── scripts/      # Seed scripts
└── public/           # Static assets
```

## API Endpoints

All APIs are available at `http://localhost:5000/api`

- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/vehicles` - Vehicle CRUD
- `/api/diagnostics` - Diagnostic tools
- `/api/providers` - Provider directory
- `/api/deals` - Deal listings
- `/api/points` - Points system
- `/api/rewards` - Rewards redemption
- `/api/referrals` - Referral system
- `/api/evaluations` - Car evaluation
- `/api/plans` - Membership plans

## Features

✅ User Authentication (Register/Login with JWT)
✅ Vehicle Management (CRUD operations)
✅ Diagnostic Tools
✅ Car Smart Evaluation (Multi-step flow)
✅ Points & Rewards System
✅ Referral System
✅ Membership Plans (Free, Smart, Premium, Family)
✅ Provider Directory
✅ Deal Listings
✅ Dynamic Data (All from APIs, no static content)

