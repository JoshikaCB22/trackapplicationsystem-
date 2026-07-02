# Requirements Document

## Introduction

A full-stack Task Management Web Application that allows users to securely register, log in, and manage their personal tasks from any device. Users can create, update, delete, and organize tasks with attributes such as priority, status, category, and due date. The application provides a responsive interface for desktop, tablet, and mobile devices, with a dashboard summarizing task progress and powerful search and filter capabilities.

## Glossary

- **System**: The Task Management Web Application as a whole
- **Auth_Service**: The backend service responsible for user registration, login, logout, and JWT issuance
- **Task_Service**: The backend service responsible for CRUD operations on tasks
- **Dashboard**: The frontend view displaying task summary statistics for the authenticated user
- **Task_List**: The frontend view displaying the user's tasks with search, filter, and sort controls
- **User**: A registered and authenticated person using the application
- **JWT**: JSON Web Token used to authenticate API requests
- **Task**: A unit of work with title, description, due date, priority, category, and status
- **Priority**: One of three levels assigned to a task: High, Medium, or Low
- **Status**: One of three states of a task: Pending, In Progress, or Completed
- **Protected_Route**: A frontend route or backend API endpoint that requires a valid JWT to access

---

## Requirements

### Requirement 1: User Registration

**User Story:** As a new user, I want to register an account, so that I can securely access the application and manage my personal tasks.

#### Acceptance Criteria

1. WHEN a registration request is received with a unique email, name, and password of at least 8 characters, THE Auth_Service SHALL create a new User record and return a JWT.
2. WHEN a registration request is received with an email that already exists in the database, THE Auth_Service SHALL return a 409 Conflict error with a descriptive message.
3. WHEN a registration request is received with a missing or invalid field, THE Auth_Service SHALL return a 400 Bad Request error identifying the invalid field.
4. THE Auth_Service SHALL store the user's password as a bcrypt hash and SHALL NOT store the plaintext password.

---

### Requirement 2: User Login and Logout

**User Story:** As a registered user, I want to log in and log out, so that my tasks remain private and my session is controlled.

#### Acceptance Criteria

1. WHEN a login request is received with a valid email and correct password, THE Auth_Service SHALL return a signed JWT valid for 24 hours.
2. WHEN a login request is received with an unrecognized email or incorrect password, THE Auth_Service SHALL return a 401 Unauthorized error.
3. WHEN the user logs out, THE System SHALL remove the JWT from client-side storage and redirect the user to the login page.
4. WHILE a JWT is expired or absent, THE System SHALL reject requests to Protected_Routes and return a 401 Unauthorized error.

---

### Requirement 3: User Profile

**User Story:** As an authenticated user, I want to retrieve my profile information, so that I can verify my account details.

#### Acceptance Criteria

1. WHEN an authenticated GET /api/auth/profile request is received, THE Auth_Service SHALL return the user's name, email, and account creation date, excluding the password field.
2. IF the JWT in the request is invalid or expired, THEN THE Auth_Service SHALL return a 401 Unauthorized error.

---

### Requirement 4: Task Creation

**User Story:** As an authenticated user, I want to create a task, so that I can track a new piece of work.

#### Acceptance Criteria

1. WHEN an authenticated POST /api/tasks request is received with a title, THE Task_Service SHALL create a new Task associated with the authenticated User and return the created Task with a 201 status.
2. WHEN a task creation request is received without a title, THE Task_Service SHALL return a 400 Bad Request error.
3. THE Task_Service SHALL assign a default Status of "Pending" to any newly created Task that does not specify a Status.
4. THE Task_Service SHALL assign a default Priority of "Medium" to any newly created Task that does not specify a Priority.
5. WHERE a due date is provided, THE Task_Service SHALL validate that the due date is a valid ISO 8601 date and store it on the Task.
6. IF an invalid due date format is provided, THEN THE Task_Service SHALL return a 400 Bad Request error.

---

### Requirement 5: Task Retrieval

**User Story:** As an authenticated user, I want to retrieve my tasks, so that I can view and manage my workload.

#### Acceptance Criteria

1. WHEN an authenticated GET /api/tasks request is received, THE Task_Service SHALL return only the Tasks belonging to the authenticated User.
2. WHEN an authenticated GET /api/tasks/:id request is received, THE Task_Service SHALL return the Task with the matching id if it belongs to the authenticated User.
3. IF a GET /api/tasks/:id request is received for a Task that does not belong to the authenticated User, THEN THE Task_Service SHALL return a 404 Not Found error.
4. IF a GET /api/tasks/:id request is received for a Task id that does not exist, THEN THE Task_Service SHALL return a 404 Not Found error.

---

### Requirement 6: Task Update

**User Story:** As an authenticated user, I want to update a task, so that I can reflect changes in my work.

#### Acceptance Criteria

1. WHEN an authenticated PUT /api/tasks/:id request is received with valid fields, THE Task_Service SHALL update the specified Task and return the updated Task.
2. IF a PUT /api/tasks/:id request is received for a Task that does not belong to the authenticated User, THEN THE Task_Service SHALL return a 404 Not Found error.
3. WHEN a task update sets the Status, THE Task_Service SHALL only accept one of the values: "Pending", "In Progress", or "Completed", and SHALL return a 400 Bad Request error for any other value.
4. WHEN a task update sets the Priority, THE Task_Service SHALL only accept one of the values: "High", "Medium", or "Low", and SHALL return a 400 Bad Request error for any other value.
5. THE Task_Service SHALL update the Task's updatedAt timestamp on every successful update.

---

### Requirement 7: Task Deletion

**User Story:** As an authenticated user, I want to delete a task, so that I can remove work that is no longer relevant.

#### Acceptance Criteria

1. WHEN an authenticated DELETE /api/tasks/:id request is received, THE Task_Service SHALL delete the specified Task and return a 200 success response.
2. IF a DELETE /api/tasks/:id request is received for a Task that does not belong to the authenticated User, THEN THE Task_Service SHALL return a 404 Not Found error.

---

### Requirement 8: Search, Filter, and Sort

**User Story:** As an authenticated user, I want to search, filter, and sort my tasks, so that I can quickly find relevant work items.

#### Acceptance Criteria

1. WHEN a GET /api/tasks request includes a search query parameter, THE Task_Service SHALL return only Tasks whose title contains the search string (case-insensitive).
2. WHEN a GET /api/tasks request includes a status filter parameter, THE Task_Service SHALL return only Tasks matching the specified Status.
3. WHEN a GET /api/tasks request includes a priority filter parameter, THE Task_Service SHALL return only Tasks matching the specified Priority.
4. WHEN a GET /api/tasks request includes a category filter parameter, THE Task_Service SHALL return only Tasks matching the specified category.
5. WHEN a GET /api/tasks request includes a dueDate filter parameter, THE Task_Service SHALL return only Tasks whose due date matches the specified date.
6. WHEN a GET /api/tasks request includes a sort parameter of "latest", THE Task_Service SHALL return Tasks ordered by createdAt descending.
7. WHEN a GET /api/tasks request includes a sort parameter of "oldest", THE Task_Service SHALL return Tasks ordered by createdAt ascending.
8. WHEN a GET /api/tasks request includes a sort parameter of "dueDate", THE Task_Service SHALL return Tasks ordered by dueDate ascending.
9. WHEN a GET /api/tasks request includes a sort parameter of "priority", THE Task_Service SHALL return Tasks ordered by Priority with High first, Medium second, and Low last.

---

### Requirement 9: Dashboard

**User Story:** As an authenticated user, I want to see a summary dashboard, so that I can quickly understand my overall task progress.

#### Acceptance Criteria

1. WHEN the Dashboard is loaded by an authenticated User, THE Dashboard SHALL display the total number of the User's Tasks.
2. WHEN the Dashboard is loaded by an authenticated User, THE Dashboard SHALL display the count of Tasks with Status "Completed".
3. WHEN the Dashboard is loaded by an authenticated User, THE Dashboard SHALL display the count of Tasks with Status "Pending".
4. WHEN the Dashboard is loaded by an authenticated User, THE Dashboard SHALL display the count of Tasks with Status "In Progress".
5. WHEN the Dashboard is loaded by an authenticated User, THE Dashboard SHALL display the count of Tasks whose dueDate equals the current calendar date.

---

### Requirement 10: Protected Routes

**User Story:** As a user, I want unauthenticated access to be blocked, so that my data remains private.

#### Acceptance Criteria

1. WHILE a User is not authenticated, THE System SHALL redirect any access to Protected_Routes to the login page.
2. WHEN an API request to a Protected_Route is received without a valid JWT, THE Task_Service SHALL return a 401 Unauthorized error.

---

### Requirement 11: Responsive Design

**User Story:** As a user, I want the application to work on any device, so that I can manage my tasks on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE System SHALL render a usable layout at viewport widths of 320px, 768px, and 1280px.
2. THE System SHALL use a CSS framework (Bootstrap or Tailwind CSS) to implement responsive grid layouts and components.

---

### Requirement 12: Security and Input Validation

**User Story:** As a user, I want the application to handle data securely, so that my account and tasks are protected from unauthorized access and malformed input.

#### Acceptance Criteria

1. THE Auth_Service SHALL validate all registration and login request bodies against a defined schema before processing.
2. THE Task_Service SHALL validate all task creation and update request bodies against a defined schema before processing.
3. THE System SHALL store all sensitive configuration values (JWT secret, database connection string) in environment variables and SHALL NOT hard-code them in source files.
4. THE System SHALL use parameterized queries or Mongoose schema validation to prevent injection attacks.
