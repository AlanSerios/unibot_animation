# Eye Animation Guidelines — UNIBOT Cozmo-Style Eye System v3

> **Owner**: Antigravity  
> **Last Updated**: 2026-05-24  
> **Status**: IMPLEMENTED (v3 — Pure Cozmo-Style, No Pupils)

---

## Design Philosophy

Inspired by **Cozmo** — the robot whose eyes ARE the emotion. No pupils, no mouths, no extra decorative elements. The solid white eye shapes themselves morph, tilt, resize, reposition, and blink to convey feeling.

### Rules
1. **Eyes only** — no mouths, no sparkles, no veins, no spirals, no question marks
2. **Solid white** (`#f2f2f2`) shapes on the dark blue screen
3. **Shape = Emotion** — each emotion has a unique eye shape created via SVG path morphing
4. **Entrance transitions** — eyes morph from resting state to target shape with spring physics
5. **Natural blinking** — all emotions blink at random intervals (2–6s)
6. **Gaze shifting** — whole eye shapes translate to simulate looking around

---

## Architecture

```
setupSVGAnimations(svg, emotionKey)
├── Hide native dark eyes (opacity: 0)
├── Create faceGroup <g class="custom-vector-face">
├── Create leftEye & rightEye <path> (start at resting shape)
├── Per-emotion block:
│   ├── Entrance morph (anime d: [{ value: targetShape }])
│   ├── Idle animations (breathe, gaze, jitter, wobble)
│   └── Blink cycle (recursive setTimeout-style)
├── Append faceGroup to SVG
└── Body animations (bounce, wave, shake, tilt, shine)
```

### Eye Shapes

| Shape | Helper | Used By |
|-------|--------|---------|
| Rounded Rectangle | `makeRoundedRectEye(cx, cy, halfW, halfH, radius)` | Resting, Excited, Mad, Confused |
| Upward Arc (^ ^) | `makeHappyArc(cx, cy, halfW, halfH)` | Happy |
| Blink Line | `makeBlinkLine(cx, cy, halfW)` | All (blink state) |

---

## Per-Emotion Breakdown

### 😊 HAPPY / HAPPY_WAVE — "Content & Present"
| Animation | Target | Behavior | Timing |
|-----------|--------|----------|--------|
| Entrance | leftEye, rightEye | Morph from resting rect → upward arc (^ ^) | 400ms, spring |
| Blink | Both eyes | scaleY: 1→0.05→1 | Random 2–6s |
| Gaze | faceGroup | Translate left→center→right→center | ~7300ms loop |
| Breathe | Both eyes | scaleX 1→1.03, scaleY 1→0.96 | 3000ms alternating |

### 🤩 EXCITED — "Overwhelmed Energy"
| Animation | Target | Behavior | Timing |
|-----------|--------|----------|--------|
| Entrance | leftEye, rightEye | Morph to TALL eyes (halfH=35) | 300ms, spring |
| Blink | Both eyes | scaleY: 1→0.05→1 | Random 3–7s |
| Energy pulse | Both eyes | scaleY 1→1.1, scaleX 1→1.05 | 500ms alternating |
| Micro-jitter | faceGroup | Random ±1px translate | 80ms loop |
| Saccades | faceGroup | 6-step dart timeline | ~1900ms loop |

### 😡 MAD — "Furious & Locked On"
| Animation | Target | Behavior | Timing |
|-----------|--------|----------|--------|
| Entrance | leftEye, rightEye | Morph to wider/squarer eyes | 150ms, easeIn |
| V-angle tilt | leftEye: +8°, rightEye: -8° | Angry inward tilt | Instant |
| Brow overlay | polygon (#255796) | Covers top of eyes = half-lidded | Static + slam TL |
| Brow slam | brow | 3 aggressive drops (6px→4px→8px) + spring | ~2370ms loop |
| Eye tension | Both eyes | scaleY squeeze 0.85→1→0.75→1 | ~3550ms loop |
| Gaze lock-on | faceGroup | Stare left(600ms)→jerk right→stare(500ms) | ~2060ms loop |
| Blink | Both eyes | scaleY: 1→0.05→1 | Random 3–8s |

### 😵 CONFUSED — "Malfunction & Processing Error"
| Animation | Target | Behavior | Timing |
|-----------|--------|----------|--------|
| Entrance | leftEye (squint: h=14), rightEye (wide: h=30) | Asymmetric morph | 350ms, spring |
| Eye tilt | leftEye: -6°, rightEye: +4° | Opposite tilts | Instant |
| Desync blink | Left: 1.5–4s, Right: 2–5.5s | Independent blink cycles | Separate loops |
| Shape swap | Both eyes | Squint↔wide swap sides periodically | ~6100ms loop |
| Gaze wander | faceGroup | 6-step random wander | ~4400ms loop |
| Eye wobble | leftEye: steps(3), rightEye: steps(2) | Glitchy squish | 400ms/300ms |

---

## Gaze System

Gaze is achieved by translating `faceGroup` (the container holding both eyes). This moves both eyes together as a unit, simulating the robot "looking" in a direction without needing pupils.

| Emotion | Gaze Behavior |
|---------|--------------|
| Happy | Gentle drift left → right (idle curiosity) |
| Excited | Rapid saccades (darting around overwhelmed) |
| Mad | Lock-on stare → angry jerk (tracking a target) |
| Confused | Erratic wander (can't figure out where to look) |

---

## Adding a New Emotion

1. Add entry to `emotions` object with `label` and `glow`
2. Add SVG assets to `assets.js`
3. Choose a **target eye shape** (use helpers or define new path)
4. Add `else if (emotionKey === 'new')` block
5. Add entrance morph animation (`d: [{ value: targetShape }]`)
6. Add blink cycle (copy `happyBlink` pattern)
7. Add gaze behavior (timeline on `faceGroup`)
8. Add any unique idle animations (wobble, jitter, squeeze)
9. Add body animation if needed
10. Add UI button in the emotion track
