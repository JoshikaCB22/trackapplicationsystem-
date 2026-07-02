# Implementation Tasks

## Tasks

- [ ] 1. Project scaffold and configuration
  - [ ] 1.1 Create root package.json with concurrently dev script
  - [ ] 1.2 Create server package.json and install dependencies
  - [ ] 1.3 Create client package.json and install dependencies
  - [ ] 1.4 Create server .env.example and .gitignore

- [ ] 2. Backend – database and models
  - [ ] 2.1 Implement config/db.js (Mongoose connect)
  - [ ] 2.2 Implement User model with bcrypt pre-save hook
  - [ ] 2.3 Implement Task model with indexes

- [ ] 3. Backend – auth
  - [ ] 3.1 Implement authMiddleware (JWT verify)
  - [ ] 3.2 Implement authController (register, login, profile)
  - [ ] 3.3 Implement authRoutes with express-validator
  - [ ] 3.4 Implement generateToken utility

- [ ] 4. Backend – tasks
  - [ ] 4.1 Implement taskController (getTasks, getTaskById, createTask, updateTask, deleteTask)
  - [ ] 4.2 Implement taskRoutes with express-validator
  - [ ] 4.3 Implement dashboardController using MongoDB aggregation
  - [ ] 4.4 Implement dashboardRoute

- [ ] 5. Backend – server entry
  - [ ] 5.1 Implement app.js (Express app, CORS, routes, error handler)
  - [ ] 5.2 Implement server.js (connect DB, listen)

- [ ] 6. Frontend – foundation
  - [ ] 6.1 Create React app structure (index.js, App.js)
  - [ ] 6.2 Implement AuthContext with useReducer
  - [ ] 6.3 Implement Axios instance with JWT interceptor (services/api.js)
  - [ ] 6.4 Implement PrivateRoute and PublicRoute wrappers

- [ ] 7. Frontend – auth pages
  - [ ] 7.1 Implement LoginPage
  - [ ] 7.2 Implement RegisterPage
  - [ ] 7.3 Implement Navbar with logout

- [ ] 8. Frontend – task pages
  - [ ] 8.1 Implement taskService.js (all API calls)
  - [ ] 8.2 Implement TaskListPage with search/filter/sort controls
  - [ ] 8.3 Implement TaskFormPage (create + edit)
  - [ ] 8.4 Implement TaskCard component

- [ ] 9. Frontend – dashboard
  - [ ] 9.1 Implement DashboardPage with stat cards
  - [ ] 9.2 Wire dashboard to GET /api/dashboard

- [ ] 10. Responsive styling
  - [ ] 10.1 Apply responsive layout at 320px, 768px, 1280px breakpoints
  - [ ] 10.2 Style all components with Tailwind/CSS
