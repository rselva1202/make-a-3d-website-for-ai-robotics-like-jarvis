# NEXUS — 3D AI Robotics Platform

An immersive, JARVIS-style 3D web experience for an AI robotics company that operates
across every domain (healthcare, defense, manufacturing, agriculture, space, energy,
logistics, finance and more).

Built with **Vite + React + TypeScript + Tailwind CSS** and **React Three Fiber**.

## Highlights

- Real-time WebGL scene: an animated holographic AI core, orbiting rings and a live particle field.
- Interactive **JARVIS console** — type or *speak* commands (Web Speech API, degrades gracefully) and NEXUS responds with domain-aware answers.
- Live telemetry HUD, animated domain grid, capability matrix and mission timeline.
- Fully responsive, motion-rich, glassmorphic HUD aesthetic.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build          # production build -> dist/
npm run build:preview  # single-file inlined build -> dist-preview/index.html
```

No backend or API keys are required — everything runs in the browser.
