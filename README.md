# Room Management System

A full-stack room/hotel management system with React frontend and Node.js/Express backend using PostgreSQL.

## Project Structure

```
cheerful-den-deck/
├── frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express API server
└── README.md          # This file
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components
- React Router

### Backend
- Node.js
- Express
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### 1. Setup Backend

```bash
cd backend
npm install
```

Configure database settings in `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=room_management
DB_USER=postgres
DB_PASSWORD=your_password
```

Create database and initialize schema:
```bash
# Create database (using psql or createdb)
createdb room_management

# Initialize database schema
npm run db:init
```

Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Setup Frontend

```bash
cd frontend
npm install
```

Configure API URL in `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:8080`

## Default Login Credentials

After initializing the database, you can login with:
- **Email**: `admin@hotel.com`
- **Password**: `admin123`

## Features

- 🏨 Room Management (Create, Read, Update, Delete)
- 📅 Booking Management
- 🧹 Housekeeping Tasks
- 💰 Billing & Invoicing
- 👥 Staff Management
- 📊 Dashboard & Reports
- 🔐 JWT Authentication
- 👤 User Roles & Permissions

## API Documentation

See `backend/README.md` for detailed API documentation.

## Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server
```

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

## Environment Variables

### Backend (`backend/.env`)
- `PORT` - Server port (default: 5000)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (`frontend/.env`)
- `VITE_API_URL` - Backend API URL

## License

This project is private and confidential.
