# Setup Instructions

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/carsmartclub
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service or run `mongod`
- **macOS/Linux**: `sudo systemctl start mongod` or `mongod`
- **Docker**: `docker run -d -p 27017:27017 mongo`

### 4. Run the Application

#### Development Mode (Recommended)
Open two terminal windows:

**Terminal 1 - Frontend (Next.js):**
```bash
npm run dev
```
Runs on http://localhost:3000

**Terminal 2 - Backend (Express):**
```bash
npm run server:dev
```
Runs on http://localhost:5000

#### Production Mode
```bash
# Build Next.js
npm run build

# Start Next.js
npm start

# Start Express (in another terminal)
npm run server
```

## Project Structure

```
carwebsite/
├── pages/                 # Next.js pages (routes)
│   ├── index.jsx         # Home page
│   └── _app.jsx          # App wrapper
├── public/               # Static files
│   └── assets/          # Images
├── styles/              # CSS files
│   ├── globals.css      # Global Tailwind styles
│   └── App.css          # Custom styles
├── server/              # Express backend
│   ├── index.js         # Server entry
│   ├── config/          # Config files
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── middleware/      # Middleware
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
└── package.json         # Dependencies
```

## API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get Vehicles (requires auth token)
```bash
curl http://localhost:5000/api/vehicles \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using the port

### Module Not Found Errors
- Run `npm install` again
- Delete `node_modules` and reinstall

## Next Steps

1. Configure MongoDB Atlas (cloud) if preferred
2. Set up environment variables for production
3. Configure CORS for your domain
4. Set up SSL/HTTPS for production
5. Configure JWT_SECRET with a strong random string



