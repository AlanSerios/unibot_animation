# Unibot Studio

A web-based visualizer and emotion matrix synthesizer for Unibot. This project features dynamic SVG vector animations and a high-end UI designed with a premium compact aesthetic.

## Features
- **Emotion Synthesis:** Smooth crossfade transitions between complex neural states.
- **Export Capabilities:** 
  - Download high-fidelity SVG vector frames for each emotion.
  - Native in-browser GIF recording of the transition cascade.
- **Visuals:** Features complex ambient lighting, CSS-accelerated hardware rendering, and a glassmorphic command panel.
- **Compact UI:** Mathematically shrunken viewport architecture for "pro-max" dashboard density.

## Deployment
This static web application requires no build step.

To deploy on **Vercel**:
1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the static project.
3. The `vercel.json` file ensures that the root URL (`/`) automatically serves `code.html`.

## Local Development
Since the project relies on dynamically downloading SVGs via JavaScript Blobs and inline web workers, you should serve it over a local HTTP server instead of double-clicking the HTML file directly.

```bash
# Example using Python
python -m http.server 8000
```
Then navigate to `http://localhost:8000/code.html`
