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
Bharat, tum jo **Perplexity AI clone** bana rahe ho uska flow basically **User → Server → AI Model → Server → User** hota hai. Main isko **diagram + simple explanation** me samjha raha hoon.

---

#  Perplexity Clone Working Flow

```
        ┌──────────┐
        │   User   │
        └────┬─────┘
             │
             │ Question / Prompt
             ▼
      ┌──────────────┐
      │   Backend    │
      │    Server    │
      └──────┬───────┘
             │
             │ API Request
             ▼
     ┌─────────────────┐
     │   Gemini Model  │
     │  (AI Engine)    │
     └────────┬────────┘
              │
              │ AI Response
              ▼
      ┌──────────────┐
      │   Backend    │
      │    Server    │
      └──────┬───────┘
             │
             │ JSON Response
             ▼
        ┌──────────┐
        │   User   │
        └──────────┘
```

Yaha AI engine ke liye tum **Google Gemini API use karte ho.

---

## Step-by-Step Explanation

### 1️ User Question Ask karta hai

User frontend (React website) me question likhta hai.

Example:

```
What is Artificial Intelligence?
```

Frontend request bhejta hai server ko.

```
POST /api/chat
```

---

### 2️ Request Server par aati hai

Server (Node.js + Express) request receive karta hai.

Example payload:

```json
{
  "message": "What is Artificial Intelligence?"
}
```

Server ka kaam:

* input validate karna
* AI API ko call karna
* response format karna

---

### 3️ Server AI Model ko request bhejta hai

Server prompt ko AI model ko bhejta hai.

Example:

```javascript
const response = await gemini.generateContent(prompt);
```

Yaha tum use karte ho:

* **Google Gemini**

---

### 4️ AI Model Answer Generate karta hai

AI model internally:

```
Prompt Analysis
      ↓
Knowledge Retrieval
      ↓
Response Generation
```

Example response:

```
Artificial Intelligence (AI) is a technology that allows machines to mimic human intelligence...
```

---

### 5️ AI Response Server ko milta hai

Server response receive karta hai.

Example:

```json
{
 "response": "Artificial Intelligence is..."
}
```

Server optionally:

* format karta hai
* markdown convert karta hai
* sources attach karta hai

---

### 6️ Server Response User ko bhejta hai

Server final JSON frontend ko bhejta hai.

```
{
 "answer": "Artificial Intelligence is..."
}
```

---

### 7️ Frontend UI me show hota hai

Frontend React UI me show hota hai.

User ko lagta hai AI **real time answer de raha hai**.

---
Bharat, main tumhe **step-by-step setup documentation** de raha hoon jisse tum **Perplexity-style AI search clone** bana sakte ho using **LangChain + Google Gemini**.
Yeh **sirf setup guide** hai (implementation logic nahi), exactly waise hi jaise professional docs me hota hai.

---

# Perplexity Clone Setup Guide

Using **LangChain + Gemini (JavaScript)**


## 1️ Project Overview

Perplexity clone ek **AI powered search system** hota hai jisme:

* User question puchta hai
* Backend AI model ko request bhejta hai
* AI answer generate karta hai
* Response UI me show hota hai

System Flow:

```
User
 ↓
Frontend
 ↓
Backend API
 ↓
AI Model (Gemini)
 ↓
Backend
 ↓
User
```

---

## 2️ Prerequisites

Before starting ensure:

* **Node.js 18+ installed**
* **npm or pnpm**
* Google AI API key
* Basic knowledge of JavaScript

Required Tools:

* Node.js
* Express
* LangChain
* Gemini API

---

## 3️ Create Project

Create new backend project.

```bash
mkdir perplexity-clone
cd perplexity-clone
npm init -y
```

Project structure initialize ho jayega.

---

## 4️ Install Dependencies

Install required libraries.

```bash
npm install express cors dotenv
npm install @langchain/google-genai
npm install langchain
```

Explanation:

| Package                 | Purpose                |
| ----------------------- | ---------------------- |
| express                 | backend server         |
| cors                    | frontend communication |
| dotenv                  | environment variables  |
| langchain               | AI framework           |
| @langchain/google-genai | Gemini integration     |

---

## 5️ Create Folder Structure

Recommended backend architecture:

```
perplexity-clone
│
├── src
│   ├── config
│   │   └── gemini.js
│   │
│   ├── controllers
│   │   └── ai.controller.js
│   │
│   ├── routes
│   │   └── ai.routes.js
│   │
│   └── app.js
│
├── server.js
├── .env
└── package.json
```

Ye structure **scalable backend architecture** follow karta hai.

---

## 6️ Get Gemini API Key

1. Open
   [https://aistudio.google.com](https://aistudio.google.com)

2. Create API key.

3. Copy key.

---

## 7️ Configure Environment Variables

Create `.env` file.

```
PORT=3000

GOOGLE_API_KEY=your_api_key_here
```

Environment variables secure way me API key store karte hain.

---

## 8️ Setup LangChain Gemini Model

LangChain Gemini integration provide karta hai.

Import model from:

```
@langchain/google-genai
```

Supported models example:

```
gemini-1.5-pro
gemini-1.5-flash
```

Recommended for AI chat:

```
gemini-1.5-flash
```

Because:

* faster
* cheaper
* optimized for chat apps

---

## 9️ Configure Express Server

Backend server handle karega:

* API requests
* AI communication
* response formatting

Basic server responsibilities:

```
User Request
   ↓
API Route
   ↓
AI Controller
   ↓
Gemini Model
   ↓
Return Response
```


To be continuing ...