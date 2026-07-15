# 🚀 Deploy Backend on Render - Complete Guide

## Prerequisites
- ✅ GitHub account with your repository
- ✅ Render account (sign up at https://render.com)
- ✅ Neon PostgreSQL database (you already have this)

---

## Step 1: Prepare Your Backend for Deployment

### 1.1 Verify package.json has the correct start script
Your `backend/package.json` should have:
```json
"scripts": {
  "start": "node src/server.js"
}
```
✅ **Already configured!**

### 1.2 Ensure environment variables are properly configured
Your backend uses these environment variables (already set up):
- `PORT`
- `NODE_ENV`
- `DATABASE_URL` (Neon PostgreSQL connection string)
- `JWT_SECRET`
- `FRONTEND_URL`

---

## Step 2: Create Render Account & New Web Service

### 2.1 Sign Up/Login to Render
1. Go to https://render.com
2. Click **"Get Started"** or **"Sign In"**
3. Sign up with GitHub (recommended for easy repo access)

### 2.2 Create New Web Service
1. Click **"New +"** button in the top right
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Search and select your repository: **`Sujalpatne05/cheerful-den-deck`**
5. Click **"Connect"**

---

## Step 3: Configure Web Service Settings

### 3.1 Basic Settings
Fill in these fields:

| Field | Value |
|-------|-------|
| **Name** | `cheerful-den-deck-backend` (or any name you prefer) |
| **Region** | Choose closest to you (e.g., `Oregon (US West)` or `Ohio (US East)`) |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ **IMPORTANT** |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### 3.2 Instance Type
- Select **"Free"** plan (or paid if you need more resources)
- Free plan includes:
  - 750 hours/month
  - Auto-sleep after 15 minutes of inactivity
  - Spins up on first request (may take 30-60 seconds)

---

## Step 4: Add Environment Variables

Click **"Advanced"** and then **"Add Environment Variable"** for each:

### Required Environment Variables:

#### 1. DATABASE_URL
```
postgresql://neondb_owner:npg_XdF6nzf8kHio@ep-red-lab-atgoga9w-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require
```
**Note:** This is your Neon PostgreSQL connection string

#### 2. JWT_SECRET
```
your-super-secret-jwt-key-change-this-in-production-2024
```
**⚠️ IMPORTANT:** Generate a strong random secret for production!
You can generate one using:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 3. NODE_ENV
```
production
```

#### 4. FRONTEND_URL
```
http://localhost:8080
```
**Note:** Update this later with your frontend deployment URL (e.g., Vercel, Netlify)

#### 5. PORT (Optional)
Render automatically sets PORT, but you can explicitly set:
```
10000
```

### Summary of Environment Variables:
| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string |
| `JWT_SECRET` | Strong random secret key |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your frontend URL (update after deploying frontend) |

---

## Step 5: Deploy

1. Click **"Create Web Service"** button at the bottom
2. Render will start building and deploying your app
3. Wait for the deployment to complete (usually 2-5 minutes)
4. You'll see logs in real-time showing:
   - Installing dependencies
   - Building the app
   - Starting the server

### Deployment Logs Should Show:
```
==> Building...
npm install
...
==> Starting service...
🚀 Server running on http://0.0.0.0:10000
📡 API endpoints available at http://0.0.0.0:10000/api
```

---

## Step 6: Test Your Deployment

### 6.1 Get Your Backend URL
After deployment, Render provides a URL like:
```
https://cheerful-den-deck-backend.onrender.com
```

### 6.2 Test Health Endpoint
Open in browser or use curl:
```
https://your-app-name.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Room Management API is running",
  "timestamp": "2024-07-15T..."
}
```

### 6.3 Test Login Endpoint
Use Postman, Thunder Client, or curl:
```bash
curl -X POST https://your-app-name.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hotel.com",
    "password": "admin123"
  }'
```

Should return a token!

---

## Step 7: Update Frontend to Use Backend URL

### 7.1 Update API Base URL in Frontend
Edit `frontend/src/lib/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  'https://your-app-name.onrender.com/api';
```

### 7.2 Create `.env` file in frontend folder
```bash
VITE_API_URL=https://your-app-name.onrender.com/api
```

### 7.3 Update CORS in Backend (if needed)
Once you deploy frontend, update `FRONTEND_URL` environment variable in Render dashboard:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## Step 8: Monitor & Manage

### 8.1 View Logs
- Go to Render dashboard
- Click on your service
- Click **"Logs"** tab to see real-time logs

### 8.2 Restart Service
- Click **"Manual Deploy"** > **"Deploy latest commit"**
- Or click **"Restart"** to restart without rebuilding

### 8.3 Custom Domain (Optional)
- Go to **"Settings"** tab
- Scroll to **"Custom Domain"**
- Add your domain and configure DNS

---

## 🔥 Important Notes

### Free Plan Limitations:
- ⚠️ **Auto-sleep**: Service sleeps after 15 minutes of inactivity
- 🐌 **Cold Start**: First request after sleep takes 30-60 seconds to wake up
- ✅ **Solution**: Use a free uptime monitor (like UptimeRobot) to ping your health endpoint every 14 minutes

### Database Connection:
- ✅ Your Neon database is already configured with connection pooling
- ✅ SSL mode is required and already set in your connection string

### Security:
- 🔒 Always use strong JWT secrets in production
- 🔒 Never commit `.env` files to Git
- 🔒 Use environment variables for all secrets

---

## 📋 Quick Checklist

Before deploying, ensure:
- [ ] Repository pushed to GitHub
- [ ] `backend` folder contains all necessary files
- [ ] `package.json` has correct `start` script
- [ ] Database is accessible (Neon PostgreSQL)
- [ ] All environment variables ready
- [ ] CORS configured for frontend URL

---

## 🆘 Troubleshooting

### Issue: "Build Failed"
**Solution:** Check build logs, ensure `package.json` is correct

### Issue: "Application Failed to Respond"
**Solution:** 
- Check if PORT is properly configured
- Ensure database connection string is correct
- Check logs for errors

### Issue: "Database Connection Failed"
**Solution:**
- Verify DATABASE_URL environment variable
- Check Neon database is active
- Ensure SSL mode is enabled

### Issue: "CORS Error"
**Solution:**
- Update FRONTEND_URL in Render environment variables
- Verify CORS middleware in `server.js`

---

## 🎉 Success!

Your backend is now deployed and accessible at:
```
https://your-app-name.onrender.com/api
```

### Next Steps:
1. ✅ Deploy frontend (Vercel/Netlify recommended)
2. ✅ Update FRONTEND_URL environment variable
3. ✅ Update frontend API_BASE_URL
4. ✅ Test all functionality end-to-end
5. ✅ Set up monitoring/alerts

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Your GitHub Repo:** https://github.com/Sujalpatne05/cheerful-den-deck

Happy Deploying! 🚀
