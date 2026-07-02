# Task Management App

A full-stack MERN application for managing tasks with authentication, CRUD operations, search/filter, and a responsive UI.

## Tech Stack

- **Frontend**: React.js, React Router, Axios, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcrypt.js

## Project Structure

```
Task-Management-App/
├── client/          # React frontend
└── server/          # Express backend
```

## Setup

### 1. Clone and install dependencies

```bash
cd Task-Management-App
npm run install-all
```

### 2. Configure environment variables

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=24h
NODE_ENV=development
```

### 3. Start the application

```bash
# Run both server and client
npm run dev

# Or separately
npm run server   # runs on http://localhost:5000
npm run client   # runs on http://localhost:3000
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get profile (protected) |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (with filters) |
| GET | /api/tasks/:id | Get task by ID |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Task Filters (query params)

- `search` — search by title
- `status` — Pending / In Progress / Completed
- `priority` — High / Medium / Low
- `category` — any string
- `dueDate` — YYYY-MM-DD
- `sort` — latest / oldest / dueDate / priority
