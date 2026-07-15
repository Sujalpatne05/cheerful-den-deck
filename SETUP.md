# Setup Instructions

## Step 1: Install PostgreSQL

If you don't have PostgreSQL installed:
1. Download from https://www.postgresql.org/download/windows/
2. Install and remember the password you set for the `postgres` user
3. PostgreSQL typically runs on port 5432

## Step 2: Configure Backend Database Connection

Edit `backend/.env` and update these values with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=room_management
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
```

Replace `YOUR_POSTGRES_PASSWORD_HERE` with your actual PostgreSQL password.

## Step 3: Create Database

Open Command Prompt or PowerShell and run:

```bash
# Option 1: Using psql
psql -U postgres
CREATE DATABASE room_management;
\q

# Option 2: Using createdb command
createdb -U postgres room_management
```

You'll be prompted for your PostgreSQL password.

## Step 4: Initialize Database Schema

```bash
cd backend
npm run db:init
```

This will:
- Create all necessary tables
- Set up indexes
- Create a default admin user

**Default admin credentials:**
- Email: admin@hotel.com
- Password: admin123

## Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on http://localhost:5000

## Step 6: Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:8080

## Step 7: Login

Open your browser and go to http://localhost:8080

Login with:
- Email: admin@hotel.com
- Password: admin123

## Troubleshooting

### "password authentication failed for user postgres"
- Check that your DB_PASSWORD in backend/.env matches your PostgreSQL password
- Try connecting with psql to verify: `psql -U postgres -h localhost`

### "database room_management does not exist"
- Create the database first: `createdb -U postgres room_management`

### Backend port 5000 already in use
- Change PORT in backend/.env to another port (e.g., 5001)
- Update VITE_API_URL in frontend/.env to match

### Frontend port 8080 already in use
- Vite will automatically try the next available port
- Check the console output for the actual port being used

## Next Steps

After successful login, you can:
1. Create rooms in the Rooms section
2. Make bookings in the Bookings section
3. Manage housekeeping tasks
4. Generate bills and invoices
5. View reports and analytics

## Security Note

Remember to change the JWT_SECRET in backend/.env to a strong random string in production!
