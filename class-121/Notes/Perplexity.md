Day-2

# Email Verification

## 1️ Email Verification Flow Diagram

```
+--------+        Register        +-----------+
|  User  | ---------------------> |  Server   |
+--------+                        +-----------+
                                      |
                                      | Create verification token
                                      v
                               +---------------+
                               |   Database    |
                               | user.verified |
                               |     = false   |
                               +---------------+
                                      |
                                      | Send Email with Link
                                      v
                                +-----------+
                                |   Email   |
                                |  Service  |
                                +-----------+
                                      |
                                      | User clicks link
                                      v
+--------+     Request with Token     +-----------+
|  User  | -------------------------> |  Server   |
+--------+                            +-----------+
                                            |
                                            | Verify Token
                                            v
                                     +---------------+
                                     |   Database    |
                                     | verified=true |
                                     +---------------+
                                            |
                                            v
                                      Account Verified
```

---

## 2️ Step by Step Explanation

### 1️ User Registration

User signup form fill karta hai.

Example:

* username
* email
* password

Server kya karta hai:

* password **hash** karta hai
* user database me save karta hai
* `verified = false` set karta hai

Example database record:

```
{
 id: 1,
 username: "bharat",
 email: "bharat@gmail.com",
 password: "hashed_password",
 verified: false
}
```

---

### 2️ Server Token Generate karta hai

Server ek **verification token** banata hai.

Usually:

* **JWT token**
* ya **random string**

Example link jo email me jata hai:

```
https://yourapp.com/api/verify-email?token=abc123xyz
```

---

### 3️ Email Send hota hai

Server email service se mail send karta hai.

Example mail:

```
Subject: Verify Your Account

Click this link to verify your email

https://yourapp.com/api/verify-email?token=abc123xyz
```

---

### 4️ User Link Click karta hai

User jab email link par click karta hai to browser server ko request bhejta hai.

Request example:

```
GET /api/verify-email?token=abc123xyz
```

---

### 5️ Server Token Verify karta hai

Server token ko decode karta hai aur check karta hai:

* token valid hai?
* token expire to nahi?

Agar valid hai to:

```
user.verified = true
```

---

### 6️ Database Update

Database me update ho jata hai:

```
{
 id: 1,
 username: "bharat",
 email: "bharat@gmail.com",
 password: "hashed_password",
 verified: true
}
```

---

### 7️ User Account Verified R

Ab user:

* login kar sakta hai
* protected features use kar sakta hai

---

# How perplexity clone working
user--->---server---->---gemini-->--server--->---user

## with the hepl of ### **Chat-model**

| Field     | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| _id       | ObjectId | Unique identifier for the chat            |
| user      | ObjectId | Reference to the `User` who owns the chat |
| title     | String   | Title of the chat session                 |
| createdAt | Date     | Chat creation timestamp                   |
| updatedAt | Date     | Last update timestamp                     |

### **Message-model**

| Field     | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| _id       | ObjectId | Unique identifier for the message     |
| chat      | ObjectId | Reference to the `Chat` it belongs to |
| content   | String   | Message content                       |
| role      | Enum     | Role of sender: `user` or `AI`        |
| createdAt | Date     | Message creation timestamp            |



[Docs-for-google-gemini](https://docs.langchain.com/oss/javascript/langchain/models)