# Battle-Arena Project – LangGraph & State Overview

* **LangGraph**:

  * Open-source, low-level orchestration framework by **LangChain**.
  * Enables creation of **stateful, long-running AI agents** using **graph-based architectures**.
  * Supports **nodes** (actions like LLM calls or tools) and **edges** (control flow), including loops, cycles, and conditional branching.

* **Node**:

  * A Python function taking the **current graph state** as input.
  * Performs a specific operation (e.g., computation, logic, LLM call, tool integration).
  * Serves as the **fundamental building block** of workflows.

* **Edges**:

  * Functions that determine **which node executes next** based on the current state.
  * Define **flow, order, and branching logic**, enabling dynamic pipelines.
  * Facilitate **decision-making, error handling, and iterative refinement**.

* **State**:

  * The **working memory** that stores and tracks information across workflow steps.
  * Maintains **context**, stores **history**, and passes **relevant information** between chains, agents, or nodes.


---

# Battle Arena AI

**Battle Arena AI** is an experimental platform where two AI agents compete to generate the best solution for a given topic. The system ensures high-quality, original content through structured research, iterative writing, and copyright checking. A human judge evaluates the AI outputs at the end of the competition.

---

## **Workflow**

1. **User Topic Submission**
   The process starts when a user provides a topic that the AI agents will tackle.

2. **Research Phase**
   Each AI gathers relevant information, references, and context for the topic to ensure accurate and comprehensive understanding.

3. **Outline Creation**
   Both AI agents create structured outlines to organize the article logically before writing.

4. **Article Generation**
   Using the outline, each AI produces a complete article with coherent arguments, structured sections, and meaningful insights.

5. **Copyright Check**
   Generated content is automatically checked for originality to avoid plagiarism or copyright violations.

6. **Iterative Improvement**
   If copyright issues are detected, the AI rewrites or refines the article until it passes the originality check.

7. **Final Evaluation**
   After content passes all checks, a human judge evaluates the solutions on Day 10, comparing quality, clarity, originality, and effectiveness to select the winner.


---


# Terminal Command

```bash
cd class-136
→ Navigates into the "class-136" project folder

npm init -y
→ Creates a default package.json file with all settings auto-filled

npm i express
→ Installs Express.js for building a backend server

npm i -D @types/express
→ Installs TypeScript type definitions for Express (dev dependency)

npm run dev
→ Runs the "dev" script defined in package.json (starts your server with tsx)

npm install @langchain/google @langchain/core
→ Installs LangChain core library and Google AI integration package

npm install dotenv
→ Installs dotenv to manage environment variables from a .env file

npm install @langchain/mistralai
→ Installs LangChain integration for Mistral AI models

npm install @langchain/cohere
→ Installs LangChain integration for Cohere AI models

npm install @langchain/langgraph @langchain/core
→ Installs LangGraph for building agent workflows and reinstalls LangChain core
```



PS C:\Users\LENOVO\OneDrive\Desktop\my work\classes-101-to-150\class-137> npm i -D typescript tsx

added 6 packages, and audited 83 packages in 6s

24 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS C:\Users\LENOVO\OneDrive\Desktop\my work\classes-101-to-150\class-137> npx tsc --init

Created a new tsconfig.json                                    
                                                            TS 
You can learn more at https://aka.ms/tsconfig
PS C:\Users\LENOVO\OneDrive\Desktop\my work\classes-101-to-150\class-137>
