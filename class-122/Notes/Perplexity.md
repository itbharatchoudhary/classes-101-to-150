Day-3

# Generative AI

**Generative AI** ka matlab hota hai:

> Past data ke patterns se **naya content generate karna**

Ye different types ka content generate kar sakta hai:

* Text
* Code
* Images
* Audio
* Video

Example tools:

* ChatGPT
* Gemini
* Claude

Example:

```
Input: Write a JavaScript function for factorial
Output: AI code generate karega
```

---

# AI Service Provider

AI service provider wo companies hoti hain jo **LLM create aur provide karti hain**.

Unka kaam mainly 3 cheeze hoti hain:

### 1️. Training an LLM

Huge datasets par **Large Language Model train karna**.

Example models:

* GPT-4
* Gemini
* Mistral

Training me:

* billions of text data
* GPUs
* deep learning

use hota hai.

---

### 2️. Hosting the LLM

Model ko powerful servers par run karte hain taaki log use kar sake.

Isko **model hosting** kehte hain.

Example:

* cloud GPUs
* inference servers

---

### 3️. Providing APIs

Developers ko **API provide karte hain** jisse hum apne apps me AI use kar sakte hain.

Example:

```
POST /chat/completions
```

Developer request bhejta hai → AI response deta hai.

Chalo is flow ko **simple diagram + explanation** me samajhte hain.

---

# Generative AI Request Flow Diagram

```
+--------+        +-----------+        +---------------------+
|        |        |           |        |                     |
|  USER  | -----> |  SERVER   | -----> |  AI SERVICE PROVIDER|
|        |        | (Backend) |        |  (LLM API)          |
+--------+        +-----------+        +---------------------+
     ^                    |                        |
     |                    |                        |
     |                    |                        |
     |              +-----------+                  |
     |              |           | <----------------+
     +--------------|  SERVER   |
                    | (Backend) |
                    +-----------+
                           |
                           |
                      +---------+
                      |  USER   |
                      +---------+
```

---

## Step-by-Step Flow

### 1️ User Request

User application me prompt likhta hai.

Example:

```
User: Explain Artificial Intelligence
```

---

### 2️ Server (Backend)

Tumhara **Node.js / Python backend** request receive karta hai.

Backend ka kaam:

* authentication
* rate limiting
* prompt processing
* AI API call

Example:

```js
model.invoke(userPrompt)
```

---

### 3️ AI Service Provider

Yaha par actual **LLM run hota hai**.

Examples:

* ChatGPT
* Gemini
* Claude

AI provider:

* LLM host karta hai
* request process karta hai
* response generate karta hai

---

### 4️ Response Back to Server

AI provider response return karta hai:

```
Artificial Intelligence is a field of computer science...
```

---

### 5️ Server → User

Server response ko user tak bhej deta hai.

Example:

```
MistralAI: Artificial Intelligence is the simulation of human intelligence...
```


# GenAI App Architecture (LangChain)

```
        ┌───────────┐
        │   USER    │
        └─────┬─────┘
              │
              ▼
        ┌───────────┐
        │  SERVER   │
        │ (Node.js) │
        └─────┬─────┘
              │
              ▼
        ┌──────────────┐
        │   LangChain  │
        │  (Prompt /   │
        │   Chains)    │
        └─────┬────────┘
              │
              ▼
        ┌──────────────┐
        │      AI      │
        │  (LLM API)   │
        │ Mistral/GPT  │
        └─────┬────────┘
              │
              ▼
        ┌──────────────┐
        │   LangChain  │
        │ Response     │
        │ Processing   │
        └─────┬────────┘
              │
              ▼
        ┌──────────────┐
        │   SERVER     │
        │  Logic       │
        └─────┬────────┘
              │
              ▼
        ┌──────────────┐
        │   Mongoose   │
        │ (ODM Layer)  │
        └─────┬────────┘
              │
              ▼
        ┌──────────────┐
        │   Database   │
        │  MongoDB     │
        └─────┬────────┘
              │
              ▼
        ┌──────────────┐
        │   Mongoose   │
        │   Fetching   │
        └─────┬────────┘
              │
              ▼
        ┌──────────────┐
        │   SERVER     │
        └─────┬────────┘
              │
              ▼
        ┌───────────┐
        │   USER    │
        └───────────┘
```

---

## Step-by-Step Flow (Hinglish)

### 1️ User Request

User prompt bhejta hai.

```
User → "Explain AI"
```

---

### 2️ Server Receive karta hai

Node.js backend request receive karta hai.

```
Express / Node.js
```

---

### 3️ LangChain Processing

LangChain prompt ko process karta hai:

* prompt template
* chains
* memory
* tools

Example:

```js
prompt → model.invoke()
```

---

### 4️ AI Model Call

LangChain **LLM API call karta hai**.

Example models:

* Mistral
* GPT-4
* Gemini

---

### 5️ LangChain Response Process

AI se response aata hai:

```
Raw Response → Structured Output
```

LangChain usko format karta hai.

---

### 6️ Server Logic

Server decide karta hai:

* save chat
* process response
* send to DB

---

### 7️ Mongoose

Mongoose use hota hai database interact karne ke liye.

Example:

```
ChatSchema.save()
```

---

### 8️ Database

Database me store hota hai.

Example DB:

* MongoDB

Store hota hai:

```
User Prompt
AI Response
Timestamp
```

---

### 9️ Response Back to User

Server final response user ko bhejta hai.

```
User ← AI Answer
```


# Task

1. **Resend Verification Email**

   * If an email has already been sent to the user, but the user hasn’t received it, **show a “Resend Email” button** so that the user can request the verification email again.

2. **Skip Verification for Verified Users**

   * If the user has already verified their email, **don’t show the verification page again**.
   * Redirect verified users **directly to the Home page** instead of the verification page.
