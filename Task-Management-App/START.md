# How to Start the Task Management App

## Prerequisites
- MongoDB Atlas connection configured in `server/.env`
- Node.js installed

## Step-by-Step Startup

### Option 1: Run Both Servers (Recommended for Development)

**Terminal 1 - Start Backend Server:**
```bash
cd Task-Management-App/server
npm run dev
```
Wait for: `Server running on port 5000` and `MongoDB Connected`

**Terminal 2 - Start Frontend:**
```bash
cd Task-Management-App/client
npm start
```
Wait for: Browser opens at `http://localhost:3000`

### Option 2: Use Concurrently (Single Terminal)

```bash
cd Task-Management-App
npm run dev
```

## Verify Everything is Working

1. **Check Backend Health:**
   - Open browser: http://localhost:5000/api/health
   - Should see: `{"status":"OK","message":"Server is running"}`

2. **Test Registration/Login:**
   - Open: http://localhost:3000
   - Click "Register" 
   - Fill in the form (password must be 8+ chars)
   - Submit

## Troubleshooting

### Problem: "Login failed" or "Registration failed"

**Check 1: Is the backend running?**
- Open http://localhost:5000/api/health
- If it doesn't load, backend is not running

**Check 2: Check browser console (F12)**
- Look for errors like "Failed to fetch" or "Network Error"
- These mean backend is not reachable

**Check 3: Check MongoDB connection**
- Look at server terminal
- Should see "MongoDB Connected: cluster0.hqkzrnw.mongodb.net"
- If connection fails, check your `.env` file

**Check 4: Check server terminal for errors**
- Look for validation errors or stack traces
- Common issue: Password too short (needs 8+ characters)

### Problem: CORS errors in browser console

The backend already has CORS enabled. If you still see CORS errors:
- Make sure both servers are running
- Backend on port 5000
- Frontend on port 3000

### Problem: "Proxy error" in browser

This means the backend (port 5000) is not running. Start it first.

## Common Issues

1. **Port already in use:**
   - Kill the process: `npx kill-port 5000` or `npx kill-port 3000`
   
2. **MongoDB connection string issues:**
   - Check `server/.env` has correct `MONGO_URI`
   - Verify your MongoDB Atlas IP whitelist includes your current IP
   
3. **Module not found errors:**
   - Run `npm install` in both `server/` and `client/` directories
