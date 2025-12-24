# Port Configuration Fix

## Issue
Your backend server is running on port **5001**, but the frontend was trying to connect to port **5000**, causing "Failed to fetch" and "ERR_CONNECTION_REFUSED" errors.

## Solution Applied

1. ✅ Created `lib/api.js` utility file that uses the correct API base URL
2. ✅ Updated `next.config.js` to use `BACKEND_URL` from `.env` (which is `http://localhost:5001`)
3. ✅ Updated critical pages (`index.jsx`, `join.jsx`, `_app.jsx`) to use the new API utility
4. ✅ Backend server is now running successfully on port 5001

## Current Status

- ✅ Backend server: Running on `http://localhost:5001`
- ✅ Frontend: Should now connect to port 5001 via `BACKEND_URL` env variable
- ⚠️ Some pages still have hardcoded `localhost:5000` - they will use the default from `lib/api.js` which now defaults to 5001

## Next Steps

### Option 1: Update .env file (Recommended)
Add this line to your `.env` file:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api
```

Then restart your Next.js dev server (`npm run dev`).

### Option 2: Change backend to port 5000
If you prefer to use port 5000, update your `.env`:
```env
PORT=5000
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

Then restart the backend server.

## Testing

1. Make sure backend is running: `npm run server:dev`
2. Check health endpoint: `curl http://localhost:5001/api/health`
3. Start frontend: `npm run dev`
4. Try registering a new user at `http://localhost:3000/join`

The errors should now be resolved! 🎉




