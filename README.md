# MERN Travel Diaries - Backend

A RESTful API backend for the Travel Diaries application built with Node.js, Express, and MongoDB. This API allows users to create accounts, authenticate, and manage their travel diary posts.

## 🚀 Features

- **User Authentication**: Register and login functionality with password hashing
- **Travel Posts Management**: Create, read, update, and delete travel diary entries
- **User-Post Relationship**: Each post is linked to its author
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd MERN-Travel-Diaries-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_PASSWORD=your_mongodb_password
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

## 📁 Project Structure

```
MERN-Travel-Diaries-backend/
├── controllers/          # Request handlers
│   ├── post-controller.js
│   └── user-controllers.js
├── models/              # MongoDB schemas
│   ├── Posts.js
│   └── User.js
├── routing/             # API routes
│   ├── post-routes.js
│   └── user-routes.js
├── app.js              # Application entry point
├── .babelrc            # Babel configuration
├── .env                # Environment variables
└── package.json        # Project dependencies
```

## 🔌 API Endpoints

### User Routes (`/user`)

- **POST** `/user/signup` - Register a new user
- **POST** `/user/login` - Authenticate user

### Post Routes (`/posts`)

- **GET** `/posts` - Get all posts
- **POST** `/posts` - Create a new post
- **GET** `/posts/:id` - Get a specific post
- **PUT** `/posts/:id` - Update a post
- **DELETE** `/posts/:id` - Delete a post
- **GET** `/posts/user/:id` - Get all posts by a specific user

## 📊 Data Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, min: 6),
  posts: [ObjectId] (ref: Post)
}
```

### Post Model

```javascript
{
  title: String (required),
  description: String (required),
  image: String (required),
  location: String (required),
  date: Date (required),
  user: ObjectId (ref: User, required)
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon and Babel
- `npm run build` - Build production-ready code
- `npm start` - Start production server
- `npm test` - Run tests (not configured yet)

## 🔐 Environment Variables

| Variable           | Description                           |
| ------------------ | ------------------------------------- |
| `MONGODB_PASSWORD` | Password for MongoDB Atlas connection |

## 🌐 MongoDB Connection

The application connects to MongoDB Atlas using the connection string:

```
mongodb+srv://admin:<password>@cluster0.5whbtes.mongodb.net/?appName=Cluster0
```

Make sure to:

1. Whitelist your IP address in MongoDB Atlas
2. Set the correct password in your `.env` file
3. Ensure your cluster is active

## 🛡️ Security Features

- Password hashing with bcryptjs
- CORS protection
- Environment variable configuration for sensitive data

## 🚧 Development

This project uses:

- **Babel** for ES6+ transpilation
- **Nodemon** for automatic server restarts during development
- **Express** for routing and middleware
- **Mongoose** for MongoDB object modeling

**Note**: This is a backend API. Make sure to have a corresponding frontend application to interact with these endpoints.
