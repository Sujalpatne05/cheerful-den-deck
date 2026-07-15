# PostgreSQL Password Reset Guide for Windows

## Method 1: Reset Password (Recommended)

### Step 1: Locate PostgreSQL Configuration
Find your `pg_hba.conf` file, typically located at:
```
C:\Program Files\PostgreSQL\18\data\pg_hba.conf
```

### Step 2: Edit pg_hba.conf
1. Open the file as Administrator in Notepad
2. Find the line that looks like:
   ```
   host    all             all             127.0.0.1/32            scram-sha-256
   ```
3. Change `scram-sha-256` to `trust`:
   ```
   host    all             all             127.0.0.1/32            trust
   ```
4. Also change this line if present:
   ```
   host    all             all             ::1/128                 scram-sha-256
   ```
   to:
   ```
   host    all             all             ::1/128                 trust
   ```

### Step 3: Restart PostgreSQL Service
1. Open **Services** (Press Win + R, type `services.msc`)
2. Find **postgresql-x64-18** (or similar)
3. Right-click → **Restart**

### Step 4: Reset Password
Open Command Prompt and run:
```bash
psql -U postgres
ALTER USER postgres PASSWORD 'newpassword123';
\q
```

### Step 5: Restore Security
1. Edit `pg_hba.conf` again
2. Change `trust` back to `scram-sha-256`
3. Restart PostgreSQL service again

### Step 6: Update Your .env File
Edit `backend/.env`:
```env
DB_PASSWORD=newpassword123
```

## Method 2: Use pgAdmin (Easier)

If you have pgAdmin installed:

1. Open **pgAdmin 4**
2. When connecting, it may already be saved or ask for password
3. If connected:
   - Right-click on **PostgreSQL 18** → **Properties**
   - Go to **Definition** tab
   - Set a new password
4. Note this password and update `backend/.env`

## Method 3: Reinstall PostgreSQL (Last Resort)

If nothing works, you can reinstall PostgreSQL and set a password you'll remember.

---

After resetting, run:
```bash
cd backend
npm run db:init
```
