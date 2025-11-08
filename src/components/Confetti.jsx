import { useEffect, useState } from 'react';

export default function Confetti({ color }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const pieces = [];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        animationDuration: 3 + Math.random() * 2,
        size: 5 + Math.random() * 10,
        rotation: Math.random() * 360,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: color,
            animationDelay: `${piece.animationDelay}s`,
            animationDuration: `${piece.animationDuration}s`,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: piece.opacity,
            boxShadow: `0 0 ${piece.size * 2}px ${color}`,
          }}
        />
      ))}
      <style>{`
        .confetti {
          position: absolute;
          top: -10%;
          animation: fall linear infinite;
          border-radius: 50%;
        }

        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
