import { useState, useRef, useEffect } from 'react';
import BlackStone from './BlackStone';
import WhiteStone from './WhiteStone';
import Confetti from './Confetti';

const STORAGE_KEY = 'gomoku-game-state';

// Load initial state from localStorage
const loadGameState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load game state:', e);
  }
  return null;
};

export default function GomokuGame() {
  const savedState = loadGameState();

  const [viewBox, setViewBox] = useState(savedState?.viewBox || { x: -400, y: -300, width: 800, height: 600 });
  const [zoom, setZoom] = useState(savedState?.zoom || 1);
  const [stones, setStones] = useState(savedState?.stones || []);
  const [currentPlayer, setCurrentPlayer] = useState(savedState?.currentPlayer || 'black');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [winner, setWinner] = useState(savedState?.winner || null);
  const svgRef = useRef(null);

  const gridSize = 30;
  const stoneSize = 12;

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const gameState = {
      stones,
      currentPlayer,
      winner,
      viewBox,
      zoom,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [stones, currentPlayer, winner, viewBox, zoom]);

  const checkWinner = (x, y, player) => {
    const directions = [
      [1, 0],   // horizontal
      [0, 1],   // vertical
      [1, 1],   // diagonal \
      [1, -1],  // diagonal /
    ];

    for (const [dx, dy] of directions) {
      let count = 1;

      // Check positive direction
      for (let i = 1; i < 5; i++) {
        const stone = stones.find(s => s.x === x + dx * i && s.y === y + dy * i);
        if (stone && stone.player === player) {
          count++;
        } else {
          break;
        }
      }

      // Check negative direction
      for (let i = 1; i < 5; i++) {
        const stone = stones.find(s => s.x === x - dx * i && s.y === y - dy * i);
        if (stone && stone.player === player) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) {
        return true;
      }
    }
    return false;
  };

  const handleSVGClick = (e) => {
    if (isDragging || winner) return;

    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    const gridX = Math.round(svgP.x / gridSize);
    const gridY = Math.round(svgP.y / gridSize);

    const existingStone = stones.find(s => s.x === gridX && s.y === gridY);
    if (existingStone) return;

    const newStone = { x: gridX, y: gridY, player: currentPlayer };
    const newStones = [...stones, newStone];
    setStones(newStones);

    if (checkWinner(gridX, gridY, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = (e.clientX - dragStart.x) / zoom;
    const dy = (e.clientY - dragStart.y) / zoom;

    setViewBox(prev => ({
      ...prev,
      x: prev.x - dx,
      y: prev.y - dy,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();

    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    const delta = e.deltaY > 0 ? 1.1 : 0.9;
    const newZoom = zoom * delta;

    if (newZoom < 0.1 || newZoom > 10) return;

    const newWidth = viewBox.width * delta;
    const newHeight = viewBox.height * delta;

    setViewBox({
      x: svgP.x - (svgP.x - viewBox.x) * delta,
      y: svgP.y - (svgP.y - viewBox.y) * delta,
      width: newWidth,
      height: newHeight,
    });

    setZoom(newZoom);
  };

  const resetGame = () => {
    setStones([]);
    setCurrentPlayer('black');
    setWinner(null);
    setViewBox({ x: -400, y: -300, width: 800, height: 600 });
    setZoom(1);
    localStorage.removeItem(STORAGE_KEY);
  };

  const undoLastMove = () => {
    if (stones.length === 0) return;

    const newStones = stones.slice(0, -1);
    setStones(newStones);
    setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    setWinner(null);
  };

  const renderGrid = () => {
    const lines = [];
    const startX = Math.floor(viewBox.x / gridSize) - 1;
    const endX = Math.ceil((viewBox.x + viewBox.width) / gridSize) + 1;
    const startY = Math.floor(viewBox.y / gridSize) - 1;
    const endY = Math.ceil((viewBox.y + viewBox.height) / gridSize) + 1;

    for (let i = startX; i <= endX; i++) {
      lines.push(
        <line
          key={`v-${i}`}
          x1={i * gridSize}
          y1={startY * gridSize}
          x2={i * gridSize}
          y2={endY * gridSize}
          stroke="#333"
          strokeWidth={0.5 / zoom}
        />
      );
    }

    for (let i = startY; i <= endY; i++) {
      lines.push(
        <line
          key={`h-${i}`}
          x1={startX * gridSize}
          y1={i * gridSize}
          x2={endX * gridSize}
          y2={i * gridSize}
          stroke="#333"
          strokeWidth={0.5 / zoom}
        />
      );
    }

    return lines;
  };

  useEffect(() => {
    const svg = svgRef.current;
    svg.addEventListener('wheel', handleWheel, { passive: false });
    return () => svg.removeEventListener('wheel', handleWheel);
  }, [viewBox, zoom]);

  return (
    <div className="w-full h-full relative">
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className={`w-full h-full bg-background ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onClick={handleSVGClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {renderGrid()}

        {stones.map((stone, index) => {
          const StoneComponent = stone.player === 'black' ? BlackStone : WhiteStone;
          return (
            <StoneComponent
              key={index}
              x={stone.x * gridSize}
              y={stone.y * gridSize}
              size={stoneSize}
              number={index + 1}
            />
          );
        })}
      </svg>

      {winner && <Confetti color={winner === 'black' ? '#ec4899' : '#ffffff'} />}

      <div className="absolute top-5 left-5 bg-surface/90 p-4 rounded-lg text-text">
        <div className="flex items-center gap-3 mb-2">
          <div>
            {winner ? (
              <strong
                style={{
                  color: winner === 'black' ? '#ec4899' : '#ffffff',
                  textShadow: `0 0 10px ${winner === 'black' ? '#ec4899' : '#ffffff'}`
                }}
              >
                {winner === 'black' ? 'Pink' : 'White'} wins!
              </strong>
            ) : (
              <div>Current: <strong className="text-primary">{currentPlayer === 'black' ? 'Pink' : 'White'}</strong></div>
            )}
          </div>
          <button
            onClick={undoLastMove}
            disabled={stones.length === 0}
            className="px-3 py-1 cursor-pointer bg-surface hover:bg-border text-text border border-border rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Undo
          </button>
          <button
            onClick={resetGame}
            className="px-3 py-1 cursor-pointer bg-primary hover:bg-secondary text-text border-none rounded transition-colors"
          >
            New Game
          </button>
        </div>
        <div className="text-xs text-text-secondary">
          Scroll to zoom • Drag to pan • Click to place stone
        </div>
      </div>

      <style>{`
        @keyframes celebration {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(-10deg); }
          50% { transform: scale(1.3) rotate(10deg); }
          75% { transform: scale(1.2) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
}
