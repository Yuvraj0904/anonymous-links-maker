# Anonymous Feedback App

A full-stack anonymous feedback platform built with the MERN stack.

Users can create an account, generate a unique feedback link, share it with others, and receive anonymous feedback. Only the profile owner can view the feedback they receive.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Unique feedback link for every user
- Anonymous feedback submission
- View received feedback
- Protected API routes
- MongoDB database
- React frontend
- REST API with Express
- Dockerized frontend and backend
- Nginx reverse proxy
- Docker Compose setup
- Environment variable configuration

## Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Deployment & Infrastructure
- Docker
- Docker Compose
- Nginx
- Ubuntu Linux
- SSH

## Project Structure

```text
anonymous-links-maker/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── nginx/
│   └── default.conf
│
├── docker-compose.yml
└── README.md
