# Unibot Studio: Emotion Matrix Synthesizer

![Live Demo](https://img.shields.io/badge/Live_Demo-View_Site-blue?style=for-the-badge)  
**[https://unibot-animation.vercel.app/](https://unibot-animation.vercel.app/)**

Unibot Studio is a cutting-edge, web-based visualizer designed to synthesize, preview, and export high-fidelity neural states (facial emotions) for the Unibot system. 

It uses raw dynamic SVG injection to recreate complex face animations natively in the browser, providing a seamless visual bridge between cognitive baseline states and target emotions.

## 🚀 Key Features

* **Live Matrix Synthesis:** Watch real-time transition cascades as Unibot morphs between different emotional states (e.g., from *Happy* to *Furious*) with staggered delays, bouncy timeline effects, and smooth crossfades.
* **SVG Vector Extraction:** Natively extracts and downloads the exact, perfectly parsed raw SVG XML of both the baseline emotion and the synthesized target emotion directly from the live DOM memory.
* **Built-in GIF Rendering:** Includes an internal background frame recorder that snapshots the HTML DOM at 15 Frames Per Second during the synthesis phase. It perfectly captures the initial matrix shake, the timeline cascade, and the final bouncy result into a downloadable `.gif` format.
* **Interactive Chat Playground:** A fully draggable, interactive chat interface where you can talk to Unibot. Powered by a contextual memory state machine and fuzzy-string matching, Unibot can track conversation topics, play mini-games (like Rock-Paper-Scissors), and calculate simulated 3D print costs!
* **Asynchronous Web Capabilities:** Unibot's engine utilizes asynchronous Javascript Promises to fetch live internet data from public APIs (e.g., fetching real-time facts or advice).
* **DOM Awareness & Page Navigation:** Unibot can actively read the current state of the webpage (such as detecting his active glowing colors) and can be commanded to programmatically navigate the UI (e.g., "switch to visualizer").
* **Pro-Max Compact Architecture:** A meticulously balanced, "dashboard density" frontend built with Tailwind CSS. It features ambient responsive glowing elements, glassmorphic (`backdrop-blur`) UI panels, hardware-accelerated CSS properties, and custom asymmetric grid structures designed to sit beautifully on high-resolution screens.

## 🛠 Tech Stack

* **Structure:** Pure HTML5, Vanilla JavaScript.
* **Styling:** Tailwind CSS (via CDN for raw rapid iteration), Custom Keyframe CSS.
* **Animation Engine:** [Anime.js](https://animejs.com/) for choreographed sequencing, springing physics, and multi-step timeline animations.
* **NLP & Brain Engine:** [Fuse.js](https://fusejs.io/) for lightweight fuzzy-search intent matching and contextual memory tracking.
* **Export Engines:** `gif.js` with background Web Workers for smooth GIF encoding without blocking the main UI thread.
* **Deployment:** Zero-build static architecture. Served globally via [Vercel](https://vercel.com).

## 📂 Project Architecture

* `code.html`: The core application matrix (HTML structure, JS logic, and SVG/GIF rendering loops).
* `assets.js`: A massive dictionary of base SVG vectors and raw node structures loaded dynamically into the DOM.
* `vercel.json`: Strict routing configuration ensuring the root domain safely points to `code.html`.

## 🌐 Quick Start

You don't need `npm` or `node_modules` to run the visualizer. Simply serve the files over any local HTTP server:

```bash
# Clone the repository
git clone https://github.com/yourusername/uni_animation.git
cd uni_animation

# Start a local python web server
python -m http.server 8000
```

Then open `http://localhost:8000/code.html` in your browser.
