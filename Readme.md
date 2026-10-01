# Project Management Application

A full-stack **Project Management Application** built using the **MERN stack**. The application allows administrators to create and manage projects, create tasks, assign tasks to project users, and track task progress through different stages.

Users can view the projects assigned to them and manage the progress of their assigned tasks through:

**TODO → IN PROGRESS → COMPLETE**

---

## 📌 Project Overview

The Project Management Application is designed to provide a simple and scalable platform for managing projects and tasks within a team.

The application supports two types of users:

* **Admin**
* **User**

### Admin

An administrator can:

* Create projects
* Add users to projects
* Create tasks under projects
* Assign tasks to users
* Manage task priority
* Track task progress
* Move tasks between different statuses

### User

A regular user can:

* Login to the application
* View projects assigned to them
* View tasks associated with their projects
* View task details
* Update task status
* Move tasks through the workflow:

```text
TODO → IN PROGRESS → COMPLETE
```

---

# 🚀 Features

## Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Password hashing using bcrypt
* Role-based access control
* Admin and User roles
* Protected application routes

## Project Management

Admins can:

* Create projects
* Add project description
* Assign multiple users to a project
* Set project status
* View project details

Supported project statuses:

```text
Active
Completed
Archived
```

## Task Management

Admins can create tasks within projects.

Each task contains information such as:

* Task title
* Description
* Priority
* Assigned user
* Task status

Task workflow:

```text
┌──────────┐
│   TODO   │
└────┬─────┘
     │
     ▼
┌──────────────┐
│ IN PROGRESS  │
└──────┬───────┘
       │
       ▼
┌──────────┐
│ COMPLETE │
└──────────┘
```

## State Management

**Redux** is used for managing global application state such as authenticated user information and other shared application data.

## Responsive UI

The frontend is developed using **React** and styled using **Tailwind CSS**.

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Redux
* React Router
* Tailwind CSS
* JavaScript

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JSON Web Token (JWT)
* bcrypt

## Development & API Tools

* Git / GitHub
* Postman
* REST APIs

---

# 🏗️ High-Level System Design

The application follows a typical three-layer architecture:

```text
                    ┌──────────────────────┐
                    │       CLIENT         │
                    │                      │
                    │      React.js        │
                    │      Redux           │
                    │   React Router       │
                    │    Tailwind CSS      │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │       SERVER         │
                    │                      │
                    │     Node.js          │
                    │     Express.js       │
                    │                      │
                    │ Authentication       │
                    │ Authorization        │
                    │ Business Logic       │
                    │ API Controllers      │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               │
                               ▼
                    ┌──────────────────────┐
                    │       DATABASE       │
                    │                      │
                    │      MongoDB         │
                    │                      │
                    │  Users               │
                    │  Projects            │
                    │  Tasks               │
                    └──────────────────────┘
```

---

# 🔐 Authentication Flow

The application uses **JWT and bcrypt** for authentication.

### Registration

```text
User
  │
  ▼
Registration Form
  │
  ▼
Express API
  │
  ▼
Validate User
  │
  ▼
Hash Password using bcrypt
  │
  ▼
Store User in MongoDB
```

### Login

```text
User
  │
  ▼
Login Form
  │
  ▼
Login API
  │
  ▼
Find User
  │
  ▼
Compare Password
  │
  ▼
Generate JWT
  │
  ▼
Authenticated User
```

JWT is then used to authenticate protected API requests.

---

# 👥 Role-Based Access

The application has two roles:

```text
                 ┌──────────────┐
                 │     User     │
                 └──────┬───────┘
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
        View Projects        Manage Tasks
                              Status
                        
                        
                 ┌──────────────┐
                 │    Admin     │
                 └──────┬───────┘
                        │
             ┌──────────┼──────────┐
             │          │          │
             ▼          ▼          ▼
          Projects    Tasks     Assign Users
```

---

# 📋 Functional Requirements

## FR-01: User Registration

The system should allow a new user to register with:

* Name
* Email
* Password
* Confirm Password
* Role

The password should be securely hashed before being stored in the database.

---

## FR-02: User Login

The system should allow registered users to login using:

* Email
* Password

After successful authentication, the system should generate an authentication token.

---

## FR-03: Role-Based Authorization

The system should distinguish between:

* Admin
* User

Administrative operations should only be accessible to authorized administrators.

---

## FR-04: Project Creation

An admin should be able to create a project with:

* Project name
* Description
* Project users
* Project status

A project can contain multiple users.

---

## FR-05: Project Assignment

An admin should be able to assign multiple users to a project.

Users should only be able to access projects assigned to them.

---

## FR-06: Task Creation

An admin should be able to create tasks under a project.

A task should contain:

* Title
* Description
* Priority
* Assigned user
* Status

---

## FR-07: Task Assignment

An admin should be able to assign a task to a single user belonging to the project.

---

## FR-08: Task Status Management

Users should be able to update the status of their tasks.

Supported statuses:

```text
TODO
IN PROGRESS
COMPLETE
```

---

## FR-09: Project-Based Task Management

Tasks should belong to a specific project.

Users should be able to see the tasks associated with the projects they are members of.

---

## FR-10: Project Navigation

Users should be able to select a project from the sidebar and view the corresponding project tasks.

---

# ⚙️ Non-Functional Requirements

## NFR-01: Security

* Passwords must not be stored as plain text.
* Passwords should be hashed using bcrypt.
* Protected APIs should require authentication.
* JWT should be used for authenticated requests.
* Role-based authorization should restrict administrative operations.

---

## NFR-02: Scalability

The application should be structured in a modular way so that additional features can be added without significantly modifying existing functionality.

The frontend and backend should maintain separation of concerns through:

* Components
* Services/API layer
* Controllers
* Routes
* Models
* Middleware

---

## NFR-03: Maintainability

The codebase should follow a proper folder structure and separation of responsibilities.

This makes the application easier to:

* Understand
* Debug
* Test
* Maintain
* Extend

---

## NFR-04: Performance

The application should:

* Avoid unnecessary API requests
* Manage application state efficiently using Redux
* Load only the required project/task information
* Use database queries efficiently

---

## NFR-05: Usability

The application should provide:

* Simple navigation
* Clear project organization
* Easy task status management
* Clear indication of task priority
* Responsive user interface

---

## NFR-06: Reliability

The application should handle:

* Invalid login credentials
* Unauthorized requests
* Invalid project/task IDs
* Missing required fields
* API failures

with appropriate error responses.

---

# 📁 Project Structure

The application follows a modular folder structure.

### Frontend

```text
frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── TaskBoard/
│   │   ├── TaskCard/
│   │   └── CreateProjectModal/
│   │
│   ├── pages/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── Dashboard/
│   │
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │
│   ├── services/
│   │   └── api/
│   │
│   ├── routes/
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

### Backend

```text
backend/
│
├── controllers/
│   ├── userController.js
│   ├── projectController.js
│   └── taskController.js
│
├── models/
│   ├── userModel.js
│   ├── projectModel.js
│   └── taskModel.js
│
├── routes/
│   ├── userRouter.js
│   ├── projectRouter.js
│   └── taskRouter.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── config/
│   └── dbConfig.js
│
├── app.js
├── server.js
└── package.json
```

---

# 🗄️ Database Design

The application primarily contains three entities:

```text
┌──────────────┐
│     User     │
└──────┬───────┘
       │
       │ assigned to
       │
       ▼
┌──────────────┐
│   Project    │
└──────┬───────┘
       │
       │ contains
       │
       ▼
┌──────────────┐
│     Task     │
└──────────────┘
```

### User

```text
User
├── _id
├── name
├── email
├── password
└── role
```

### Project

```text
Project
├── _id
├── name
├── description
├── createdBy
├── users[]
├── status
├── createdAt
└── updatedAt
```

### Task

```text
Task
├── _id
├── title
├── description
├── priority
├── status
├── project
├── assignedTo
├── createdAt
└── updatedAt
```

---

# 🔄 Application Flow

```text
                 User
                  │
                  ▼
          ┌───────────────┐
          │ Login/Register│
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ Authentication│
          │     JWT       │
          └───────┬───────┘
                  │
          ┌───────┴────────┐
          │                │
          ▼                ▼
      Admin Role        User Role
          │                │
          ▼                ▼
   Create Project      View Projects
          │                │
          ▼                ▼
    Assign Users        View Tasks
          │                │
          ▼                ▼
    Create Tasks       Update Status
          │                │
          ▼                ▼
    Assign Tasks     TODO → IN PROGRESS
                           │
                           ▼
                        COMPLETE
```

---

# 🔌 API Architecture

The frontend communicates with the backend through REST APIs.

Example API structure:

```text
/api
│
├── /auth
│   ├── POST /register
│   └── POST /login
│
├── /projects
│   ├── GET    /
│   ├── GET    /:id
│   ├── POST   /
│   └── PUT    /:id
│
└── /tasks
    ├── GET    /project/:projectId
    ├── POST   /
    ├── PUT    /:id
    └── DELETE /:id
```

Authentication and authorization middleware can be applied to protected endpoints.

---

# 🎨 Frontend Architecture

The frontend follows a component-based architecture.

```text
App
│
├── Authentication
│   ├── Login
│   └── Register
│
└── Dashboard
    │
    ├── Header
    │
    ├── Sidebar
    │   └── Project List
    │
    └── TaskBoard
        │
        ├── TODO
        ├── IN PROGRESS
        └── COMPLETE
             │
             └── TaskCard
```

Redux is used to maintain global state where required, while component-level state is used for local UI state such as modal visibility, form fields, and selected tabs.

---

# 🔒 Security

The application implements the following security mechanisms:

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Role-based authorization
* Server-side validation
* Authentication middleware
* Authorization checks for administrative operations

Passwords are never stored directly in plain text.

---

# 📦 Installation

## Clone the repository

```bash
git clone <repository-url>
```

## Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8080
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

Start the backend:

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🧪 Testing API

The REST APIs can be tested using tools such as:

* Postman
* Swagger (if configured)

---

# 🚧 Future Improvements

Possible future enhancements include:

* Drag-and-drop task movement
* Task comments
* Task due dates
* Task attachments
* Project search
* Task filtering
* Notifications
* Email notifications
* Activity/history tracking
* Real-time updates using Socket.IO
* Pagination for large project/task lists
* Advanced role and permission management

---

# 📚 Key Concepts Demonstrated

This project demonstrates practical implementation of:

* MERN Stack
* REST API development
* JWT Authentication
* bcrypt password hashing
* Role-Based Access Control
* MongoDB relationships using Mongoose references
* React component architecture
* Redux state management
* React Router
* Tailwind CSS
* CRUD operations
* API integration
* Protected routes
* Modular and scalable folder structure

---

# 👨‍💻 Project Summary

This project was developed as a full-stack project management solution using the MERN stack. It demonstrates how authentication, authorization, project management, task management, state management, and REST APIs can be combined to build a scalable team collaboration application.

```

This version should work well as a **GitHub README and also as a project explanation during interviews**. One thing I'd particularly recommend before you put it on GitHub is adding a **screenshot/demo section** near the top and your actual API endpoint names once your backend routes are finalized.
```
