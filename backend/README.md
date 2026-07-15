# Room Management Backend API

Node.js/Express backend with PostgreSQL database for the Room Management System.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
Copy `.env.example` to `.env` and update with your settings:
```bash
cp .env.example .env
```

Update the PostgreSQL connection settings in `.env`:
- `DB_HOST`: Your PostgreSQL host (default: localhost)
- `DB_PORT`: Your PostgreSQL port (default: 5432)
- `DB_NAME`: Database name (default: room_management)
- `DB_USER`: Your PostgreSQL username
- `DB_PASSWORD`: Your PostgreSQL password

3. **Create PostgreSQL database**
```bash
createdb room_management
```
Or using psql:
```sql
CREATE DATABASE room_management;
```

4. **Initialize database schema**
```bash
npm run db:init
```

This will create all tables and insert a default admin user:
- Email: `admin@hotel.com`
- Password: `admin123`

## Running the Server

### Development mode (with auto-reload)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout user (requires auth)

### Rooms
- `GET /api/rooms` - Get all rooms (requires auth)
- `GET /api/rooms/:id` - Get single room (requires auth)
- `POST /api/rooms` - Create room (requires auth)
- `PUT /api/rooms/:id` - Update room (requires auth)
- `DELETE /api/rooms/:id` - Delete room (requires auth)

### Bookings
- `GET /api/bookings` - Get all bookings (requires auth)
- `GET /api/bookings/:id` - Get single booking (requires auth)
- `POST /api/bookings` - Create booking (requires auth)
- `PUT /api/bookings/:id` - Update booking (requires auth)
- `DELETE /api/bookings/:id` - Delete booking (requires auth)

### Health Check
- `GET /api/health` - Check API status

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Database Schema

The database includes the following tables:
- `users` - User accounts and authentication
- `rooms` - Room inventory
- `bookings` - Booking records
- `booking_rooms` - Many-to-many relationship between bookings and rooms
- `housekeeping` - Housekeeping tasks
- `invoices` - Billing and invoices
- `settings` - Application settings
- `app_state` - User-specific application state
- `audit_log` - Audit trail for actions

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # Database configuration
│   ├── database/
│   │   ├── schema.sql        # Database schema
│   │   └── init.js           # Database initialization script
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── routes/
│   │   ├── auth.routes.js    # Authentication routes
│   │   ├── rooms.routes.js   # Rooms routes
│   │   └── bookings.routes.js # Bookings routes
│   ├── utils/
│   │   └── jwt.js            # JWT utilities
│   └── server.js             # Main server file
├── .env                      # Environment variables
├── .env.example              # Environment variables template
├── package.json
└── README.md
```

## Troubleshooting

### Database connection issues
- Ensure PostgreSQL is running
- Check your database credentials in `.env`
- Verify the database exists: `psql -l`

### Port already in use
Change the `PORT` in `.env` to a different port number.

### JWT token errors
Make sure to update `JWT_SECRET` in `.env` with a secure random string.
