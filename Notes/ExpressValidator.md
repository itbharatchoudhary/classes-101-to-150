# Express Validator — Final Notes

## Purpose:

* **Ensure correct input format**
  → User jo data bhej raha hai (email, password etc.), uska format sahi hai ya nahi ye check karna.

* **Prevent invalid data from reaching controllers**
  → Galat ya incomplete data controller tak pahunchne se rokna.

* **Protect database and business logic from bad input**
  → Database aur application logic ko wrong data se safe rakhna.

**Validation must happen before controller execution.**
→ Validation hamesha **controller run hone se pehle** hona chahiye.

---

# 2. Installation

```bash
npm install express-validator
```

Is command se **express-validator package install** ho jata hai.

Import required functions:

```js
import { body, param, query, validationResult } from "express-validator"
```

Yaha hum kuch important functions import karte hain:

* **body()** → request body validate karne ke liye
* **param()** → URL parameters validate karne ke liye
* **query()** → query parameters validate karne ke liye
* **validationResult()** → validation errors check karne ke liye

---

# 3. Request Flow with Validation

```
Client Request
      ↓
Validation
      ↓
Controller
      ↓
Database
      ↓
Response
```

Flow ka matlab:

1. Client request bhejta hai
2. Pehle **validation check hoti hai**
3. Agar validation pass ho jaye to **controller execute hota hai**
4. Controller database se interact karta hai
5. Fir response client ko bheja jata hai

**Validation acts as a gatekeeper before business logic.**
→ Validation ek **gatekeeper (security gate)** ki tarah kaam karta hai jo galat data ko aage nahi jaane deta.

---

# 4. Basic Validation Example

Route with validation rules.

```js
import { body } from "express-validator"

app.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  registerController
)
```

Yaha `/register` route me validation rules add kiye gaye hain.

Validation rules:

* `body("email")` → request body me **email field validate karta hai**
* `isEmail()` → check karta hai ki email ka **format valid hai ya nahi**
* `isLength()` → check karta hai ki **minimum length condition satisfy ho rahi hai ya nahi**

---

# 5. Accessing Validation Errors

Use `validationResult()` to check validation results.

```js
import { validationResult } from "express-validator"

const errors = validationResult(req)

if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array()
  })
}
```

Explanation:

* `validationResult(req)` → request me jo validation rules lage the unka result nikalta hai
* `errors.isEmpty()` → check karta hai ki errors hai ya nahi
* Agar errors hain to **400 status ke saath error response return kar dete hain**

Example response:

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "path": "email"
    }
  ]
}
```

Is response me:

* **msg** → error message
* **path** → kaunsi field me error aaya

---

# 6. Validating Different Request Parts

### Request Body

```js
body("email")
```

Ye **request body ke fields validate karta hai**.

---

### URL Parameters

```js
param("id").isMongoId()
```

Ye **URL parameters validate karta hai**.

Example route:

```
GET /user/:id
```

Yaha `:id` ek URL parameter hai jisko `param()` validate karta hai.

---

### Query Parameters

```js
query("page").isInt()
```

Ye **query parameters validate karta hai**.

Example request:

```
GET /users?page=2
```

Yaha `page` ek query parameter hai jisko `query()` validate karega.

---

# 7. Common Validators

Required field:

```js
body("name").notEmpty()
```

→ Check karta hai ki **name field empty na ho**.

---

Email format:

```js
body("email").isEmail()
```

→ Check karta hai ki **email valid format me hai**.

---

Minimum length:

```js
body("password").isLength({ min: 8 })
```

→ Check karta hai ki password **kam se kam 8 characters ka ho**.

---

Numeric value:

```js
body("age").isNumeric()
```

→ Check karta hai ki value **number hai ya nahi**.

---

Custom message:

```js
body("email")
  .isEmail()
  .withMessage("Valid email required")
```

→ Agar validation fail ho jaye to **custom error message show karega**.

---

# 8. Sanitization

Sanitization ka matlab hai **input data ko clean ya modify karna before processing**.

Example:

```js
body("email").trim().normalizeEmail()
```

Explanation:

Functions:

* **trim()** → extra spaces remove karta hai
* **normalizeEmail()** → email ko standard format me convert karta hai

Example:

```
"   USER@GMAIL.COM   "
```

Sanitize hone ke baad:

```
user@gmail.com
```

---

# 9. Validation Middleware

Create middleware to handle validation errors.

```js
import { validationResult } from "express-validator"

export const validate = (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  next()
}
```

Purpose:

* Validation errors ko **centralized way me handle karna**
* Controllers ko **clean aur readable rakhna**

---

# 10. Reusable Validation Rules

Validation rules ko **separate files me create kar sakte hain** taaki reuse ho sake.

Example:

```js
import { body,validationResult } from "express-validator"

export const registerValidation = [

  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

      const error = new Error("Validation failed")
      error.statusCode = 400
      error.details = errors.array()

      return next(error)

    }

    next()

  }

]
```

Explanation:

* Validation rules ek **array me define kiye gaye hain**
* Agar validation fail hota hai to **custom error object create hota hai**
* Error me **statusCode aur details add ki jati hain**
* `next(error)` se error **error handling middleware ko bhej diya jata hai**

---

# 11. Route Implementation

```js
router.post(
  "/register",
  registerValidation,
  registerController
)
```

Execution order:

```
Validation 
      ↓
Controller
```

Matlab:

1. Pehle **registerValidation run hoga**
2. Agar validation pass ho jaye tab **registerController run hoga**

---

# 12. Folder Structure

```
src
│
├─ validators
│     └─ authValidator.js
├─ controllers
├─ routes
```

Is structure ka benefit:

* Code **clean aur organized** rehta hai
* Validation logic **reusable** ban jata hai
* Large projects me **maintain karna easy hota hai**

---

# 13. Best Practices

1. Requests ko **controller se pehle validate karo**
2. Validation ko **business logic se separate rakho**
3. Validation errors ke liye **middleware use karo**
4. Clear aur meaningful **error messages do**
5. Input data ko clean karne ke liye **sanitization use karo**
6. **Sirf client-side validation par depend mat karo**

**Server-side validation is mandatory for secure APIs.**
→ Secure APIs banane ke liye **server-side validation zaroori hai**, warna malicious ya invalid data system me aa sakta hai.

