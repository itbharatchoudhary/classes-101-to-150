
# Face Expression Tracker

A real-time **Face Expression Tracker** built with **React**, **Face API.js**, and **Tailwind CSS**.
This project detects faces from a webcam stream, analyzes emotions, and displays them in a clean dashboard with probability bars. You can toggle emotion tracking on or off with a button.

---

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Folder Structure](#folder-structure)
* [Installation](#installation)
* [Setup from Scratch](#setup-from-scratch)
* [Components Overview](#components-overview)
* [Custom Hooks](#custom-hooks)
* [Utilities](#utilities)
* [Face API Models](#face-api-models)
* [Styling](#styling)
* [How It Works](#how-it-works)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)

---

## Demo

You can view a working demo locally by following the installation steps below.

---

## Features

* Real-time face detection from webcam
* Emotion analysis (happy, sad, angry, surprised, neutral, etc.)
* Dominant emotion display with probability bars
* Toggle tracking on/off with a button
* Responsive and modern UI using Tailwind CSS
* Professional architecture using React components and custom hooks

---

## Folder Structure

```
face-expression-tracker/
│
├─ public/
│  ├─ models/                  # Face API models
│  │  ├─ face_expression_model-shard1
│  │  ├─ face_expression_model-weights_manifest.json
│  │  ├─ face_landmark_68_model-shard1
│  │  ├─ face_landmark_68_model-weights_manifest.json
│  │  ├─ tiny_face_detector_model-shard1
│  │  └─ tiny_face_detector_model-weights_manifest.json
│  └─ index.html
│
├─ src/
│  ├─ components/
│  │  ├─ CameraFeed.jsx         # Video display component
│  │  ├─ FaceOverlay.jsx        # Canvas overlay with face boxes, landmarks, expressions
│  │  └─ EmotionPanel.jsx       # Dashboard showing dominant emotion & probability bars
│  │
│  ├─ hooks/
│  │  ├─ useCamera.js           # Custom hook for webcam access
│  │  └─ useFaceApiModels.js    # Custom hook for loading Face API models
│  │
│  ├─ utils/
│  │  └─ imageUtils.js          # Helper functions like getDominantEmotion
│  │
│  ├─ App.jsx                   # Main application logic
│  └─ main.jsx                  # Entry point, ReactDOM rendering
│
└─ package.json                 # Project dependencies
```

---

## Installation

1. **Clone the repository:**

```
git clone https://github.com/yourusername/face-expression-tracker.git
cd face-expression-tracker
```

2. **Install dependencies:**

```bash
npm install
```

> Dependencies include: `react`, `react-dom`, `face-api.js`, `tailwindcss`, `vite` (or `react-scripts` if CRA).

3. **Set up Tailwind CSS** (if using Vite):

```bash
npx tailwindcss init -p
```

Configure `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

4. **Download Face API models**:

From [face-api.js GitHub](https://github.com/justadudewhohacks/face-api.js/tree/master/weights), copy all model files into `public/models/`:

* `tiny_face_detector_model-shard1`
* `tiny_face_detector_model-weights_manifest.json`
* `face_landmark_68_model-shard1`
* `face_landmark_68_model-weights_manifest.json`
* `face_expression_model-shard1`
* `face_expression_model-weights_manifest.json`

---

## Setup from Scratch

1. **Create a React app**:

```bash
npm create vite@latest face-expression-tracker --template react
cd face-expression-tracker
npm install
```

2. **Install dependencies**:

```bash
npm install face-api.js
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Set up Tailwind** in `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. **Download models** from [face-api.js](https://github.com/justadudewhohacks/face-api.js) and place them in `public/models/`.

5. **Build components and hooks** as outlined below.

---

## Components Overview

### CameraFeed.jsx

Displays live webcam video. Pure UI component:

```jsx
<video ref={videoRef} autoPlay muted playsInline width="720" height="560" className="rounded-2xl shadow-lg border border-slate-700" />
```

* Shows webcam stream
* No business logic

---

### FaceOverlay.jsx

Canvas overlay above video for drawing detections:

* Matches canvas size to video
* Draws bounding boxes, landmarks, and emotion labels
* Clears previous frame before drawing

---

### EmotionPanel.jsx

Shows emotion probabilities:

* Highlights dominant emotion
* Displays progress bars for all emotions
* Updates automatically as detections change

---

## Custom Hooks

### useCamera.js

Handles webcam access:

* Requests permission
* Streams video to `videoRef`
* Waits for metadata to load
* Handles errors safely

### useFaceApiModels.js

Loads Face API models:

* Loads `tinyFaceDetector`, `faceLandmark68Net`, and `faceExpressionNet`
* Ensures models are ready before detection
* Only runs once on app startup

---

## Utilities

### imageUtils.js

Contains helper functions like `getDominantEmotion`:

```javascript
export function getDominantEmotion(expressions) {
  return Object.entries(expressions).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )[0];
}
```

* Returns highest probability emotion
* Can be reused for analytics or alerts

---

## Face API Models

All models are stored in `public/models/`:

| Model                   | Purpose                         |
| ----------------------- | ------------------------------- |
| `tiny_face_detector`    | Fast face detection             |
| `face_landmark_68`      | Detects facial landmarks        |
| `face_expression_model` | Classifies expressions/emotions |

> Models are downloaded from [face-api.js weights repo](https://github.com/justadudewhohacks/face-api.js/tree/master/weights).

---

## Styling

* **Tailwind CSS** is used for all styling
* Components have **cards, progress bars, rounded borders, shadows**
* Responsive and clean UI
* Toggle button changes color based on tracking status (red = stop, green = start)

---

## How It Works

1. **App loads** and models are loaded via `useFaceApiModels`
2. **Webcam starts** via `useCamera`
3. **Detection loop** runs using `requestAnimationFrame`
4. **Faces and expressions detected** using Face API.js
5. **Overlay draws** boxes, landmarks, and emotion labels
6. **Emotion panel updates** in real-time with probabilities
7. **Tracking toggle** stops/resumes detection

---

## Usage

```bash
npm run dev
```

1. Allow camera access
2. Observe live video with face detection overlay
3. Watch emotion probabilities in real-time
4. Click the **Stop Tracking / Start Tracking** button to pause/resume detection

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push branch (`git push origin feature/new-feature`)
5. Create a Pull Request

---

## License

MIT License. See `LICENSE` file for details.

---

 This README is **professional, detailed, and covers everything from setup to usage**, including all components, hooks, models, and Tailwind integration.

---

