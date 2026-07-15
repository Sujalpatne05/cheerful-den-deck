# Remaining Work - Migration from Supabase to Node.js Backend

## ✅ COMPLETED

### Backend
- ✅ Express server setup with PostgreSQL (Neon DB)
- ✅ JWT authentication system
- ✅ Database schema and tables created
- ✅ Auth routes (login, register, logout, get user)
- ✅ Rooms routes (CRUD operations)
- ✅ Bookings routes (CRUD operations)
- ✅ Database configuration with Neon DB
- ✅ CORS setup for frontend communication

### Frontend
- ✅ API client service (`src/lib/api.ts`)
- ✅ AuthContext updated to use backend API
- ✅ Login page updated
- ✅ Environment configuration

## 🔄 NEEDS TO BE UPDATED

### 1. **Rooms Page** (`src/pages/Rooms.tsx`)
**Status**: Still uses Supabase
**What needs updating**:
- Replace Supabase room fetching with `api.getRooms()`
- Replace Supabase room creation with `api.createRoom()`
- Replace Supabase room update with `api.updateRoom()`
- Replace Supabase room deletion with `api.deleteRoom()`
- Remove Supabase image upload (implement backend upload or use base64/URLs)

### 2. **Bookings Page** (`src/pages/Bookings.tsx`)
**Status**: Still uses Supabase
**What needs updating**:
- Replace Supabase booking fetching with `api.getBookings()`
- Replace Supabase booking creation with `api.createBooking()`
- Replace Supabase booking update with `api.updateBooking()`
- Replace Supabase check-in/check-out with API calls

### 3. **Billing Page** (`src/pages/Billing.tsx`)
**Status**: Still uses Supabase
**What needs updating**:
- Create backend routes for invoices
- Update API client with invoice methods
- Replace Supabase invoice operations with API calls

### 4. **Housekeeping Page** (`src/pages/Housekeeping.tsx`)
**Needs**:
- Create backend routes for housekeeping tasks
- Update API client with housekeeping methods
- Update page to use API instead of local storage

### 5. **Guests Page** (`src/pages/Guests.tsx`)
**Needs**:
- Create backend routes for guests (if separate from bookings)
- Update API client
- Update page to use API

### 6. **Staff Page** (`src/pages/Staff.tsx`)
**Needs**:
- Create backend routes for staff management
- Update API client
- Update page to use API

### 7. **Settings Page** (`src/pages/SettingsPage.tsx`)
**Needs**:
- Create backend routes for settings
- Update API client
- Update page to use API

### 8. **Reports Page** (`src/pages/Reports.tsx`)
**Needs**:
- Create backend routes for analytics/reports
- Update API client
- Update page to use API

### 9. **Dashboard Page** (`src/pages/Dashboard.tsx`)
**Needs**:
- Ensure it uses API endpoints for all data
- May need aggregation endpoints on backend

## 🛠️ ADDITIONAL BACKEND ROUTES NEEDED

Create these routes in the backend:

### Priority 1 (Core Features)
- ✅ `/api/auth/*` - Already done
- ✅ `/api/rooms/*` - Already done
- ✅ `/api/bookings/*` - Already done

### Priority 2 (Important Features)
- ⏳ `/api/housekeeping/*` - CRUD for housekeeping tasks
- ⏳ `/api/invoices/*` - CRUD for billing/invoices
- ⏳ `/api/guests/*` - Guest management (or use booking data)

### Priority 3 (Management Features)
- ⏳ `/api/staff/*` - Staff management
- ⏳ `/api/settings/*` - App settings
- ⏳ `/api/reports/*` - Analytics and reports

### Priority 4 (Nice to Have)
- ⏳ `/api/app-state/*` - User preferences sync
- ⏳ `/api/audit-log/*` - Audit trail
- ⏳ File upload endpoint for room images

## 🎯 CURRENT STATUS

### What Works NOW:
1. ✅ User login/logout
2. ✅ Authentication with JWT
3. ✅ Basic room operations (via API)
4. ✅ Basic booking operations (via API)

### What's Using Old Supabase Code:
1. ❌ Rooms page UI (not connected to API yet)
2. ❌ Bookings page UI (not connected to API yet)
3. ❌ All other features (housekeeping, billing, etc.)

## 📋 RECOMMENDED ORDER

1. **Immediate** - Update Rooms page to use API
2. **Immediate** - Update Bookings page to use API
3. **High** - Add housekeeping backend routes + update page
4. **High** - Add invoices backend routes + update billing page
5. **Medium** - Add staff management
6. **Medium** - Add settings management
7. **Low** - Add reports/analytics
8. **Low** - Add file upload for images

## 🚀 QUICK START FOR REMAINING WORK

### To update Rooms page:
1. Open `frontend/src/pages/Rooms.tsx`
2. Import `api` from `@/lib/api`
3. Replace all `supabase` calls with `api` calls
4. Remove `isSupabaseConfigured` checks

### To add new backend routes:
1. Create file in `backend/src/routes/` (e.g., `housekeeping.routes.js`)
2. Add CRUD operations using pool queries
3. Add route to `backend/src/server.js`
4. Add methods to `frontend/src/lib/api.ts`

## 💡 NOTES

- The app is functional but using old Supabase code for most pages
- Login/Auth is fully working with new backend
- Core infrastructure is complete
- Just need to connect existing UI to new API
- Most frontend code can stay the same, just swap data fetching
