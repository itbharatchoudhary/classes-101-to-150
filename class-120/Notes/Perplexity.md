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
