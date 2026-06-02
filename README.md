# Pomodoro Timer

---

## Overview

This is a personal Pomodoro timer app built to support deep study sessions. The interface was partially designed in **Figma** before code was written.

---

## Features

- **Multiple timer modes** — Focus, Short Break, and Long Break
- **Countdown display** — Clear, readable timer with start/pause control
- **Task input & sidebar** — Add and track tasks alongside your timer
- **Progress bar** — Visual feedback for the current session
- **Action buttons** — Reset, skip, and manage your session flow
- **Clean, modular architecture** — Components are small and focused

---

## Tech Stack

| Technology      | Role                            |
| --------------- | ------------------------------- |
| **React**       | UI component library            |
| **TypeScript**  | Type safety across the codebase |
| **TailwindCSS** | Utility-first styling           |
| **Vite**        | Fast dev server & bundler       |
| **Figma**       | wireframing                     |

---

## Project Structure

```
pomodoro-timer/
├── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks (timer logic, etc.)
│   ├── types/             # TypeScript type definitions
│   └── App.tsx            # Root component
├── global.css             # Global styles
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
└── package.json
```

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** (v18+) and **npm** installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/SepideNorouzi/pomodoro-timer.git

# Navigate into the project
cd pomodoro-timer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

---

## Design Process

- Layout wireframes in figma (two-column structure)
- Component hierarchy planning
- Color palette and typography decisions
- Interactive states (hover, active, disabled)

---

## What I Learned

- Translating a Figma wireframe into production React components
- Managing timer state with `useEffect` and `useRef`
- Structuring a TypeScript + React project with clean component boundaries
- Using TailwindCSS for responsive, utility-driven styling

---

## License

This project is open source and available under the [MIT License](LICENSE).

---
