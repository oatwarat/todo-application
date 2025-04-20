# Todo Application

A full-stack Todo Application built with MERN stack (MongoDB, Express, React, Node.js) that includes user authentication and CRUD operations for managing todo tasks with image upload capability.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Features
- User authentication (register, login, logout)
- Create, read, update, and delete todo items
- Status management for todos (Not Started, In Progress, Done)
- Image upload capability for todo items
- Responsive design for all devices

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer

## Installation

Clone the repository:
```bash
git clone https://github.com/oatwarat/todo-application.git
cd todo-application
```

Install server dependencies:
```bash
npm install
```

Install client dependencies:
```bash
cd client
npm install
cd ..
```

Create environment variables:
```bash
cd server
touch .env
```

Add the following to your .env file:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

## Usage
To run the application in development mode:
```bash
npm run dev
```

Or run backend and frontend separately:
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

Access the application:
```bash
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
```

## API Reference

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login a user |
| `/api/auth/me` | GET | Get current user |

### Todo Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/todos` | GET | Get all todos for authenticated user |
| `/api/todos` | POST | Create a new todo |
| `/api/todos/:id` | PUT | Update a todo |
| `/api/todos/:id` | DELETE | Delete a todo |