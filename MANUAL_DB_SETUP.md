# Manual Database Setup (No Password Required)

## Using pgAdmin (Easiest Method)

### Step 1: Open pgAdmin
- Launch **pgAdmin 4** from your Start menu
- It should connect automatically without asking for password

### Step 2: Create Database
1. In the left panel, expand **Servers** → **PostgreSQL 18**
2. Right-click on **Databases** → **Create** → **Database**
3. Enter name: `room_management`
4. Click **Save**

### Step 3: Run SQL Script
1. Select the `room_management` database in the left panel
2. Click on **Tools** → **Query Tool** (or press Alt+Shift+Q)
3. Open the file `database_setup.sql` from this folder
4. Copy all the content and paste it into the Query Tool
5. Click the **Execute/Run** button (▶) or press F5
6. You should see success messages

### Step 4: Verify Setup
In the Query Tool, run:
```sql
SELECT * FROM users;
```
You should see the admin user.

### Step 5: Update Backend Password
1. In pgAdmin, you likely connected without a password
2. Set a password for postgres user:
   - Right-click **PostgreSQL 18** → **Properties**
   - Go to **Definition** tab
   - Set password (e.g., "postgres123")
3. Update `backend/.env`:
   ```env
   DB_PASSWORD=postgres123
   ```

### Step 6: Restart Backend
Stop and restart your backend server:
```bash
cd backend
npm run dev
```

## Alternative: Using Command Line with SQL File

If PostgreSQL allows local connections without password:

```bash
# Try to connect (might work without password)
psql -U postgres

# If it works:
CREATE DATABASE room_management;
\c room_management
\i 'C:/Users/sujal/Desktop/RoomManagement/cheerful-den-deck/database_setup.sql'
\q
```

## What You'll Get

After successful setup:
- ✅ All tables created
- ✅ Indexes created
- ✅ Admin user created
  - Email: `admin@hotel.com`
  - Password: `admin123`

## Test Your Setup

Open browser: http://localhost:8080
Login with the admin credentials above.

## Still Having Issues?

The password is likely stored somewhere. Try:
1. Check Windows Credential Manager
2. Check pgAdmin saved servers
3. Or follow `POSTGRES_PASSWORD_RESET.md` to reset it
