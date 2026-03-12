# Project perplexity Clone
## **Project Features**

1. **Authentication System**

   * Secure user registration and login.
   * Email verification for account activation.
   * Password hashing and secure storage.

2. **AI Chat Functionality**

   * Real-time chat with AI.
   * AI capable of internet-based research to provide updated responses.

3. **Chat History**

   * Maintain a record of all user chats.
   * Support multiple chat sessions per user.

4. **Message Storage**

   * Store messages with clear metadata including sender role.
   * Efficient retrieval of past conversations.

---

## **Data Modeling**

### **User**

| Field     | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| id        | ObjectId | Unique identifier for the user |
| username  | String   | User’s display name            |
| email     | String   | User’s email address           |
| password  | String   | Hashed password                |
| verified  | Boolean  | Indicates if email is verified |
| createdAt | Date     | Account creation timestamp     |
| updatedAt | Date     | Last profile update timestamp  |

### **Chat**

| Field     | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| _id       | ObjectId | Unique identifier for the chat            |
| user      | ObjectId | Reference to the `User` who owns the chat |
| title     | String   | Title of the chat session                 |
| createdAt | Date     | Chat creation timestamp                   |
| updatedAt | Date     | Last update timestamp                     |

### **Message**

| Field     | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| _id       | ObjectId | Unique identifier for the message     |
| chat      | ObjectId | Reference to the `Chat` it belongs to |
| content   | String   | Message content                       |
| role      | Enum     | Role of sender: `user` or `AI`        |
| createdAt | Date     | Message creation timestamp            |

## Setup basic terminal Command ->
### 1️. `npm init -y`

* **Purpose:** Ye command aapke project ke liye **`package.json`** file automatically create karta hai.
* **`-y` flag:** Ye saare default options ko accept kar leta hai bina manually prompt ke.
* **Effect:**

  * Project ka name, version, main file (`index.js` by default) define ho jaata hai.
  * Ye file dependency management ke liye bhi zaruri hai.

---

### 2. `npm i express mongoose jsonwebtoken dotenv cookie-parser bcryptjs`

* **Purpose:** Ye command multiple **npm packages** ko install karta hai jo aapke project me chahiye.

#### Breakdown of packages:

1. **`express`**

   * Node.js ke liye popular framework.
   * Server aur routing setup karne ke liye use hota hai.

2. **`mongoose`**

   * MongoDB ke liye ODM (Object Data Modeling) library.
   * Database schemas aur models handle karne ke liye.

3. **`jsonwebtoken`**

   * User authentication aur authorization ke liye token generate karne aur verify karne ke liye.

4. **`dotenv`**

   * Environment variables ko `.env` file me store karne ke liye.
   * Jaise DB connection string, secret keys, port number.

5. **`cookie-parser`**

   * HTTP cookies ko read aur manage karne ke liye middleware.
   * Mostly authentication ke liye use hota hai.

6. **`bcryptjs`**

   * Passwords ko securely **hash** karne ke liye.
   * Login ke time comparePassword method me use hota hai.

* **Effect:** Ye packages `node_modules` folder me install ho jaate hai aur `package.json` me dependencies ke under list ho jaate hai.

---




## 🔹 User Registration Flow Diagram

```
User
  |
  | 1️⃣ Register (username, email, password)
  v
Server (Express API)
  |
  | 2️⃣ Validate Input
  | 3️⃣ Hash Password (pre-save hook)
  | 4️⃣ Save User in Database (MongoDB)
  v
Database (MongoDB)
  |
  | 5️⃣ User Saved
  v
Server
  |
  | 6️⃣ Create Verification Token (JWT / UUID)
  | 7️⃣ Send Token to User (Response / Email)
  v
User
  |
  | 8️⃣ Receives Token
  | 9️⃣ Verify Email or Save Token
```

---

### 🔹 Step Explanation:

1. **User submits form** → username, email, password.
2. **Server validates** → check email uniqueness, password length etc.
3. **Password hashed** → `pre("save")` hook in User model.
4. **Save user** → MongoDB.
5. **User saved successfully** → server confirms.
6. **Generate token** → JWT token or verification code.
7. **Send token** → JSON response or email link.
8. **User receives token** → can use to verify email or login.


npm install express-validator

## Server-types

### 1️ Web Server 

**Web Server** wo server hota hai jo **client (browser / app)** se request receive karta hai aur response send karta hai.

Example:

* User register karta hai
* Request server ko jaati hai
* Server database me data save karta hai
* Response user ko bhejta hai

#### Common Web Servers

* Node.js
* Express.js
* Apache HTTP Server
* Nginx

#### Flow

```
User (Browser / App)
        |
        v
Web Server (Node.js / Express)
        |
        v
Database (MongoDB)
```

**Example use in your project**

* Register user
* Login user
* Create chat
* Save message

Ye sab **Web Server handle karta hai**.

---

### 2️ SMTP Server 

**SMTP Server** ka full form hai **Simple Mail Transfer Protocol**.

Ye server **email send karne ke liye use hota hai**.

Jab tum Node.js se email send karte ho using Nodemailer, tab ye **SMTP server se connect karta hai**.

#### Example SMTP Servers

* Gmail SMTP
* Outlook SMTP
* SendGrid
* Amazon Simple Email Service

#### Flow

```
Web Server
   |
   v
Mail Transporter (Nodemailer)
   |
   v
SMTP Server
   |
   v
User Email Inbox
```


##  Email Sending Flow Diagram

```
WEB SERVER (Node.js / Express)
        |
        | 1️ Request to send email
        v
MAIL TRANSPORTER (Nodemailer)
        |
        | 2️ Authenticate with OAuth2 / SMTP
        v
SMTP SERVER (Gmail SMTP)
        |
        | 3️ Process & deliver message
        v
USER EMAIL ADDRESS (Inbox)
```

---

###  Step-by-Step Explanation

### 1️ Web Server

Yeh aapka **Node.js / Express server** hota hai.

Example:

* User register karta hai
* Server decide karta hai **verification email send karna hai**

```js
await sendMail(email, subject, text, html);
```

---

### 2️ Mail Transporter

Yeh **Nodemailer transporter** hota hai jo email send karne ka kaam karta hai.

Isme hota hai:

* SMTP configuration
* OAuth authentication
* Email formatting

Example:

```js
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER
  }
});
```

Transporter basically **post office clerk** ki tarah kaam karta hai 📮.

---

### 3️ SMTP Server

SMTP ka full form hai **Simple Mail Transfer Protocol**.

Example SMTP servers:

* Gmail SMTP
* Outlook SMTP
* SendGrid
* Amazon SES

SMTP server ka kaam:

* Email accept karna
* Security check karna
* Correct mail server tak forward karna

---

### 4 Email Address (Recipient Inbox)

Finally email deliver ho jata hai user ke inbox me.

Example:

```
To: user@gmail.com
Subject: Verify your email
```

User ko milta hai:

```
Welcome to My App
Click here to verify your email
```



# 📁  Folder Structure Diagram

```
->
│
├── Server.js
│
└── src/
    │
    ├── App.js
    │
    ├── Config/
    │     └── Database.js
    │
    ├── Controllers/
    │     └── Auth.Controller.js
    │
    ├── Middlewares/
    │     └── ValidateRequest.js
    │
    ├── Models/
    │     └── User.Model.js
    │
    ├── Routes/
    │     └── Auth.Routes.js
    │
    ├── Services/
    │     └── Mail.Service.js
    │
    └── Validators/
          └── Auth.Validators.js
```

---

# ⚙️  System Flow Diagram

```
User (Frontend / Postman)
        │
        │ HTTP Request
        ▼
Server.js
        │
        ▼
App.js
        │
        ▼
Routes (Auth.Routes.js)
        │
        ▼
Validators (Auth.Validators.js)
        │
        ▼
Middleware (ValidateRequest.js)
        │
        ▼
Controller (Auth.Controller.js)
        │
        ├────────► Model (User.Model.js)
        │              │
        │              ▼
        │          Database (MongoDB)
        │
        └────────► Service (Mail.Service.js)
                       │
                       ▼
                  SMTP Server
                       │
                       ▼
                  User Email Inbox
```

---

# 🔹 File by File Explanation

## 1️ Server.js (Application Entry Point)

Ye **main starting file** hoti hai.

Kaam:

* Server start karna
* Database connect karna
* App run karna

Example flow

```
Start Server
   │
   ▼
Connect Database
   │
   ▼
Run Express App
```

---

# 2️ App.js (Express Application Setup)

Yaha **Express configuration hoti hai**

Kaam:

* Middleware setup
* JSON parsing
* Routes connect karna

Example

```
Express App
   │
   ├── JSON Middleware
   │
   └── Auth Routes
```

---

# 3️ Database.js (MongoDB Connection)

Ye file **MongoDB connection handle karti hai**.

Kaam:

* MongoDB connect
* Connection error handle

Flow

```
Node Server
     │
     ▼
MongoDB Driver
     │
     ▼
MongoDB Database
```

---

# 4️ Auth.Routes.js (API Routes)

Yaha **API endpoints define hote hain**

Example routes

```
POST /register
POST /login
```

Flow

```
Request
   │
   ▼
Route
   │
   ▼
Controller
```

---

# 5️ Auth.Validators.js (Input Validation)

Ye file **user input validate karti hai**

Example checks:

```
email valid hai?
password length correct hai?
username empty toh nahi?
```

Example

```
User Input
   │
   ▼
Validator Check
```

---

# 6️ ValidateRequest.js (Middleware)

Ye middleware **validation errors handle karta hai**

Flow

```
Validator
   │
   ▼
ValidateRequest Middleware
   │
   ├── Error → Send response
   │
   └── Valid → Next()
```

---

# 7️ Auth.Controller.js (Business Logic)

Ye file **main backend logic handle karti hai**

Example:

### Register Flow

```
User Register
     │
     ▼
Check Existing User
     │
     ▼
Create User
     │
     ▼
Hash Password
     │
     ▼
Save to Database
     │
     ▼
Send Verification Email
```

---

### Login Flow

```
Login Request
     │
     ▼
Find User
     │
     ▼
Compare Password
     │
     ▼
Generate JWT Token
     │
     ▼
Send Response
```

Token generation library:
jsonwebtoken

---

# 8️ User.Model.js (Database Schema)

Ye file **MongoDB structure define karti hai**

Example schema

```
User
 ├── username
 ├── email
 ├── password
 ├── verified
 ├── createdAt
 └── updatedAt
```

Special features

```
Pre Hook
   │
   ▼
Password Hashing
```

Password encryption library:
bcryptjs

---

# 9️ Mail.Service.js (Email System)

Ye file **email sending system handle karti hai**

Use karta hai:

* Nodemailer
* Gmail SMTP

Flow

```
Controller
   │
   ▼
Mail Service
   │
   ▼
SMTP Server
   │
   ▼
User Email
```

---

# 🔗 How All Files Connect

Complete request lifecycle

```
User Request
     │
     ▼
Server.js
     │
     ▼
App.js
     │
     ▼
Auth.Routes.js
     │
     ▼
Auth.Validators.js
     │
     ▼
ValidateRequest.js
     │
     ▼
Auth.Controller.js
     │
     ├──► User.Model.js → MongoDB
     │
     └──► Mail.Service.js → SMTP → Email
```

---

Ye system **user authentication backend** create karta hai. User register aur login kar sakta hai, password securely hash hota hai, data database me save hota hai, JWT token generate hota hai, aur verification email bhi send hoti hai. 
