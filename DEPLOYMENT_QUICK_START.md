# 🚀 Quick Start: Deploy to Render

## 5-Minute Deployment

### Step 1: Go to Render
```
https://render.com
```
Sign up/Login with GitHub

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect repository: `Sujalpatne05/cheerful-den-deck`
3. Click **"Connect"**

### Step 3: Configure Service

#### Basic Info:
```
Name: cheerful-den-deck-backend
Region: Oregon (US West) or Ohio (US East)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

#### Environment Variables:
Click **"Advanced"** → Add these:

```env
DATABASE_URL=postgresql://neondb_owner:npg_XdF6nzf8kHio@ep-red-lab-atgoga9w-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require

NODE_ENV=production

JWT_SECRET=your-super-secret-key-change-this

FRONTEND_URL=http://localhost:8080
```

⚠️ **Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4: Deploy
Click **"Create Web Service"** → Wait 2-5 minutes

### Step 5: Test
Visit: `https://your-app-name.onrender.com/api/health`

Should see:
```json
{
  "status": "OK",
  "message": "Room Management API is running"
}
```

### Step 6: Update Frontend
In `frontend/.env`:
```
VITE_API_URL=https://your-app-name.onrender.com/api
```

---

## 🎯 That's it! Your backend is live!

Your API URL: `https://your-app-name.onrender.com/api`

### Test Login:
```bash
curl -X POST https://your-app-name.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hotel.com","password":"admin123"}'
```

---

## 📖 Need More Details?
See: **RENDER_DEPLOYMENT_GUIDE.md**
