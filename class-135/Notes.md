
# **Why We Need TypeScript**

### Notes:

1. **JavaScript type coercion can be unpredictable:**

   * `console.log("5" + 1)`     // -> output = 51       // string + number = string
   * `console.log("5" - 1)`     // -> output =  4       // string - number = number
   * `console.log("5" * 1)`     // -> output = 50       // string * number = number
   * `console.log(true + true)` // -> output = 2        // boolean + boolean = number
   * `console.log(5 + true)`    // -> output = 6        // number + boolean = number
   * `console.log("5" + true)`  // -> output = "5true"  // string + boolean = string

2. **Array and object operations can behave unexpectedly:**

* `console.log([] + [])`    // -> output = ""                // array + array = string
* `console.log([1] + 1)`    // -> output = "11"              // array + number = string
* `console.log([1,2] + 1)`  // -> output = "1,21"            // array + number = string
* `console.log({} + [])`    // -> output = "[object Object]" // object + array = string

3. **Comparison pitfalls:**

   * `console.log([] == false)`  // -> output = true    // loose equality converts types

---

### **Why TypeScript Helps**

* **Static Typing:** Prevents unexpected type coercion errors at compile time.
* **Predictable Behavior:** Errors like `"5" - 1` or `[] == false` can be caught before runtime.
* **Better Code Maintenance:** Type definitions make your code easier to read and understand.
* **IDE Support:** Autocomplete, type hints, and early error detection.



# **TypeScript Basic**

### **Step 0: Prerequisites** 
 -> Install Node.js

### **Step 1: Create Project Folder**

1. Open terminal and navigate to your desired location.
2. Create a new project folder:

```bash
mkdir class-135
cd class-135
```

---

### **Step 2: Initialize Node.js Project**

* Run:

```bash
npm init -y
```

* This creates `package.json` for your project.

---

### **Step 3: Install TypeScript**

* Install TypeScript as a dev dependency:

```bash
npm install typescript --save-dev
```

* Optional: Install Node.js types for better TypeScript support:

```bash
npm install --save-dev @types/node
```

---

### **Step 4: Create tsconfig.json**

* Generate a TypeScript config file:

```bash
npx tsc --init
```

* Update `tsconfig.json` for a beginner-friendly setup:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "nodenext",
    "target": "esnext",
    "types": ["node"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "jsx": "react-jsx",
    "sourceMap": true,
    "skipLibCheck": true,
    "isolatedModules": true
  },
  "include": ["src"]
}
```

* Make sure to **create a `src` folder** in the project.

---

### **Step 5: Create First TypeScript File**

* Inside `src/`, create `index.ts`:

```ts
// src/index.ts
const name: string = "Bharat";
console.log(`Hello, ${name}!`);
```

---

### **Step 6: Compile TypeScript**

* From project root (`class-135`), run:

```bash
npx tsc
```

* This compiles TypeScript files into JavaScript in the `dist/` folder.

---

### **Step 7: Run JavaScript**

* Run the compiled code:

```bash
node dist/index.js
```

✅ Output:

```text
Hello, Bharat!
```

---

### **Step 8: Add npm Scripts for Convenience**

* Update `package.json` scripts:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```

* Now you can run:

```bash
npm run build   # compile TS
npm start       # run JS
```

---

### ✅ **Step 9: Folder Structure After Setup**

```
class-135/
├─ dist/
│  └─ index.js
├─ src/
│  └─ index.ts
├─ package.json
├─ tsconfig.json
└─ node_modules/
```
