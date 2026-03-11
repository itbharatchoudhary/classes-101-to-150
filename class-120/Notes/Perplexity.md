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

start the Project setUp process

npm init -y 
npm i express mongoose jsonwebtoken dotenv cookie-parser