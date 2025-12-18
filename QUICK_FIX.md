# ⚡ Quick Fix - Site Chalane Ke Liye

## Problem:
- Backend port 5001 pe chal raha hai ✅
- Frontend localhost:3000 pe nahi chal raha ❌

## Solution:

### Step 1: `.env` file update karo
Apne `.env` file mein yeh line add/update karo:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api
```

### Step 2: Next.js server restart karo
1. Terminal mein Next.js server ko stop karo (Ctrl+C)
2. Phir start karo:
```bash
npm run dev
```

### Step 3: Browser mein check karo
- http://localhost:3000 - Homepage dikhna chahiye
- http://localhost:3000/join - Registration page
- http://localhost:5001/api/health - Backend health check

## Important Notes:

1. **"Cannot GET /" on port 5001** = Normal hai! Backend sirf API routes serve karta hai
2. **Dono servers alag terminals mein chalne chahiye:**
   - Terminal 1: `npm run server:dev` (Backend - Port 5001)
   - Terminal 2: `npm run dev` (Frontend - Port 3000)

3. **Agar still error aaye:**
   - Browser console check karo (F12)
   - Terminal mein errors dekho
   - `.env` file sahi hai?

## Current Setup:
- ✅ Backend: http://localhost:5001 (Chal raha hai)
- ⚠️ Frontend: http://localhost:3000 (Restart karna padega)

## Test Commands:
```bash
# Backend check
curl http://localhost:5001/api/health

# Frontend check (browser mein)
http://localhost:3000
```
