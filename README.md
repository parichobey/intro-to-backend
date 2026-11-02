# 🚀 Backend Web Development – Node.js, Express & MongoDB (CRUD APIs)

This project is a complete implementation of the **Intro to Backend Web Development** tutorial (freeCodeCamp / Hack Club). It features a modular **Model-Route-Controller (MRC/MVC)** architecture, user authentication with **bcrypt** password hashing, and full **CRUD** (Create, Read, Update, Delete) operations using **Express.js** and **MongoDB (Mongoose)**.

---

## 📁 Project Architecture

```
intro-to-backend/
├── backend/
│   └── src/
│       ├── config/
│       │   └── database.js          # MongoDB connection handler
│       ├── controllers/
│       │   ├── post.controller.js   # CRUD logic for Posts
│       │   └── user.controller.js   # Logic for Register, Login, Logout
│       ├── models/
│       │   ├── post.model.js        # Mongoose Schema & Model for Post
│       │   └── user.model.js        # User Schema with bcrypt hooks & methods
│       ├── routes/
│       │   ├── post.route.js        # Express routes for Post CRUD
│       │   └── user.route.js        # Express routes for User Auth
│       ├── app.js                   # Express app configuration & middleware
│       └── index.js                 # Server entry point & DB startup
├── .env.example                     # Sample environment variables
├── .gitignore                       # Files to exclude from Git (node_modules, .env)
├── package.json                     # Project scripts and dependencies
├── postman_collection.json          # 1-Click ready Postman API collection
└── README.md                        # Documentation & evaluation guide
```

---

## 🛠️ Tech Stack & Dependencies

* **Node.js** (v18+) – Runtime environment (configured with `"type": "module"` for ES6 syntax)
* **Express.js** – Minimalist web framework for routing and middleware
* **Mongoose** – Object Data Modeling (ODM) library for MongoDB
* **bcrypt** – Secure password hashing using salt rounds
* **dotenv** – Environment variable management
* **nodemon** – Development server auto-reloader

---

## ⚙️ Step-by-Step Setup Guide

### 1. Install Dependencies
Open your terminal in the `intro-to-backend` directory and run:
```bash
npm install
```

### 2. Set Up Free Online MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up / log in.
2. Click **Create a Deployment** and choose the **M0 Free** cluster.
3. Under **Security Quickstart**:
   - Create a database user with a **Username** and **Password** (save these!).
   - Under **Where would you like to connect from?**, select **My Local Environment** and add IP `0.0.0.0/0` (Allow Access from Anywhere) so your laptop can connect.
4. Click **Connect** > **Drivers** (Node.js).
5. Copy your connection string. It will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
6. Replace `<username>` and `<password>` with your actual credentials, and specify your database name before the `?` (e.g. `...mongodb.net/backend_db?...`).

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
PORT=4000
MONGODB_URI="mongodb+srv://<your_username>:<your_password>@cluster0.xxxxx.mongodb.net/backend_db?retryWrites=true&w=majority"
```

### 4. Run the Server
* **Development Mode** (with auto-restart):
  ```bash
  npm run dev
  ```
* **Production Mode**:
  ```bash
  npm start
  ```
When connected successfully, you will see:
```
MONGODB_URI: mongodb+srv://...
MongoDB connected !!! DB HOST: cluster0-...
🚀 Server is running at port : 4000
👉 Local URL: http://localhost:4000
```

---

## 📡 API Reference & Endpoints

Base URL: `http://localhost:4000`

### 👤 User Authentication Routes (`/api/v1/users`)

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users/register` | Register new user & hash password | `{"username": "pari", "email": "pari@test.com", "password": "mypassword123"}` |
| `POST` | `/api/v1/users/login` | Log in & verify bcrypt password | `{"email": "pari@test.com", "password": "mypassword123"}` |
| `POST` | `/api/v1/users/logout` | Log out user | `{"email": "pari@test.com"}` |

### 📝 Post CRUD Routes (`/api/v1/posts`)

| Operation | Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- | :--- |
| **Create** | `POST` | `/api/v1/posts/create` | Create a new post | `{"name": "Pari", "description": "My first backend post", "age": 21}` |
| **Read** | `GET` | `/api/v1/posts/getPosts` | Fetch all posts | *(No body required)* |
| **Update** | `PATCH` | `/api/v1/posts/update/:id` | Update post by `_id` | `{"description": "Updated post content", "age": 22}` |
| **Delete** | `DELETE` | `/api/v1/posts/delete/:id` | Delete post by `_id` | *(No body required)* |

---

## 🧪 Testing with Postman Desktop App

1. Open **Postman Desktop**.
2. Click the **Import** button in the top left.
3. Select and import the [`postman_collection.json`](file:///c:/Users/PARI%20CHOBEY/OneDrive/Desktop/DSA/intro-to-backend/postman_collection.json) file included in this repository.
4. You will see two pre-configured folders:
   - **User Authentication**:
     1. Run `1. Register User` → Expect status `201 Created`
     2. Run `2. Login User` → Expect status `200 OK`
     3. Run `3. Logout User` → Expect status `200 OK`
   - **Post CRUD APIs**:
     1. Run `1. Create Post` → Expect status `201 Created`. Copy the returned `_id`.
     2. Run `2. Get All Posts` → Expect status `200 OK` (returns array of posts).
     3. Run `3. Update Post` → Paste the copied `_id` in the URL params and click Send.
     4. Run `4. Delete Post` → Paste the `_id` in the URL params and click Send.

---

## 🐙 Step-by-Step GitHub Submission Guide

Follow these steps to push your completed project to your GitHub account:

1. **Initialize Git** in the project directory:
   ```bash
   cd "c:\Users\PARI CHOBEY\OneDrive\Desktop\DSA\intro-to-backend"
   git init
   ```
2. **Add and Commit all files**:
   ```bash
   git add .
   git commit -m "feat: complete backend tutorial with express, mongoose, and CRUD APIs"
   ```
3. **Create a New Public Repository on GitHub**:
   - Go to [GitHub](https://github.com/new) and log in.
   - Enter Repository Name (e.g., `intro-to-backend` or `backend-crud-tutorial`).
   - Select **Public**.
   - Do **NOT** check "Add a README" or ".gitignore" (we already created them).
   - Click **Create repository**.
4. **Link Remote and Push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
5. **Copy your Public Repository URL** for submission!

---

## 🎓 3rd Evaluation Preparation & Viva Q&A

Be prepared to answer these core concepts during your laptop demonstration:

1. **Why separate `app.js` and `index.js`?**
   - `app.js` configures the Express application (middleware, route mounting) without starting the HTTP server. This allows for unit/integration testing without binding to a network port.
   - `index.js` connects to the database and starts the server listening on the designated PORT.

2. **What does `app.use(express.json())` do?**
   - It is a built-in middleware in Express that parses incoming requests with JSON payloads (putting the parsed data into `req.body`).

3. **How does bcrypt secure passwords?**
   - Plaintext passwords are never stored in the database. A salt (10 rounds) is generated, and a one-way mathematical hash is created in the Mongoose `pre("save")` hook. During login, `bcrypt.compare()` compares the plain password with the stored hash.

4. **What is the difference between `PUT` and `PATCH`?**
   - `PUT` replaces the entire resource.
   - `PATCH` applies partial modifications to the resource (used in `updatePost`).

5. **What do the HTTP Status Codes mean?**
   - `200 OK` – Request succeeded.
   - `201 Created` – Resource successfully created.
   - `400 Bad Request` – Client sent invalid or missing data.
   - `404 Not Found` – Resource (user or post) not found.
   - `500 Internal Server Error` – Unhandled server or database exception.
