# 🚀 Server Start Guide (Hindi/English)

## Important Notes:
- **Port 5001** = Backend API Server (Express + MongoDB)
- **Port 3000** = Frontend Next.js Website
- **"Cannot GET /"** on port 5001 is NORMAL - backend sirf API routes serve karta hai

## Steps to Start:

### Terminal 1 - Backend Server (Port 5001)
```bash
npm run server:dev
```
Ya phir:
```bash
node server/index.js
```

**Check karo:** http://localhost:5001/api/health
**Expected:** `{"status":"OK","message":"Car Smart Club API is running"}`

### Terminal 2 - Frontend Server (Port 3000)
```bash
npm run dev
```

**Check karo:** http://localhost:3000
**Expected:** Website homepage dikhna chahiye

## Troubleshooting:

### Agar localhost:3000 pe kuch nahi dikh raha:
1. Check karo Next.js server chal raha hai:
   ```bash
   netstat -ano | findstr ":3000"
   ```

2. Browser console check karo (F12) - koi error hai?

3. Terminal mein Next.js errors check karo

### Agar API calls fail ho rahe hain:
1. Backend server chal raha hai? (Port 5001)
2. `.env` file mein yeh add karo:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api
   ```
3. Next.js server restart karo (Ctrl+C, phir `npm run dev`)

### MongoDB Connection Issues:
- `.env` file mein `MONGODB_URI` check karo
- MongoDB Atlas ka connection string sahi hai?

## Quick Test:
1. Backend: http://localhost:5001/api/health ✅
2. Frontend: http://localhost:3000 ✅
3. Register: http://localhost:3000/join ✅

## Current Status:
- ✅ Backend running on port 5001
- ✅ Frontend should run on port 3000
- ⚠️ Make sure `.env` has `NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api`
