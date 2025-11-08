# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Lena Sulza (sulza.art) - a minimalist landing page with an interactive Gomoku game. Built with React, React Router, Vite, and Tailwind CSS.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Routing Structure
- Uses React Router v7 with `BrowserRouter`
- Entry point: `src/main.jsx` → `src/App.jsx`
- Routes defined in `src/App.jsx`:
  - `/` - Home landing page
  - `/gomoku` - Interactive Gomoku game

### Deployment Configuration
- Deployed on Vercel
- **Critical**: `vercel.json` contains URL rewrite rules to handle client-side routing (`{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`)
- Vite config includes `historyApiFallback: true` for local dev server routing

### Styling System
- Tailwind CSS with custom CSS variables defined in `src/index.css`
- Color scheme uses CSS custom properties (e.g., `--color-primary`, `--color-background`)
- Tailwind config at `tailwind.config.js` maps these to Tailwind classes (e.g., `bg-background`, `text-primary`)
- **Important**: When modifying colors, update the CSS variables in `:root` in `index.css`, not the Tailwind config

### Component Structure
- **Pages**: `src/pages/Home.jsx` (landing), `src/pages/Gomoku.jsx` (game wrapper)
- **Game Components**:
  - `src/components/GomokuGame.jsx` - Main game logic with infinite canvas, pan/zoom controls
  - `src/components/BlackStone.jsx` / `WhiteStone.jsx` - SVG stone components
  - `src/components/Confetti.jsx` - Winner celebration effect

### Gomoku Game Implementation
- **Infinite canvas**: SVG-based with dynamic viewBox manipulation
- **Pan**: Click and drag to pan the board
- **Zoom**: Mouse wheel to zoom in/out (centered on cursor position)
- **Game state persistence**: Uses `localStorage` with key `'gomoku-game-state'` to persist stones, player turn, winner, viewBox, and zoom level
- **Win detection**: Checks all four directions (horizontal, vertical, two diagonals) for 5 in a row
- Grid system: 30px grid size, 12px stone size
- Game state saved automatically on every state change via `useEffect`

### Styling Notes
- Global styles reset all margins/paddings via Tailwind `@layer base`
- Body has `overflow-hidden` to prevent scrolling
- Custom animations: `fadeInUp` for landing page entrance, link hover effects with arrow indicators
- The Gomoku game uses pink (#ec4899) for black stones and white (#ffffff) for white stones
