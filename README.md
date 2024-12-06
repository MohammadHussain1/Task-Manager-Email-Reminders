# Todo App API

## Description

A simple **Todo App API** built with **Node.js** and **TypeScript**. Users can register, log in, and manage their daily tasks. The app also supports email reminders for upcoming tasks.

## Features

- User Registration
- User Login with JWT authentication
- Create, View, Edit, and Delete Todo tasks
- Mark tasks as completed
- Set and receive email reminders for tasks

## Technologies

- Node.js
- TypeScript
- Express.js
- MongoDB
- JWT (JSON Web Token)
- Nodemailer (for email reminders)
- Joi (for validation)

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB (local or cloud database)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/MohammadHussain1/Task-Manager-Email-Reminders.git
    cd todo-app-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables in a `.env` file:

    ```env
    MONGODB_URI=mongodb://localhost:27017/todoApp
    JWT_SECRET=your-jwt-secret
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    ```

4. Run the application:

    ```bash
    npm run dev
    ```

    The API will be available at `http://localhost:5000`.

## API Endpoints

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login and get JWT token
- **POST** `/api/todos` - Create a new Todo task
- **GET** `/api/todos/:date` - View tasks for a specific date
- **PUT** `/api/todos/:id` - Edit a Todo task
- **DELETE** `/api/todos/:id` - Delete a Todo task
- **PATCH** `/api/todos/:id/completed` - Mark a task as completed
- **PATCH** `/api/todos/:id/uncompleted` - Unmark a completed task
- **POST** `/api/todos/:id/reminder` - Set a reminder for a task

## License

MIT License
