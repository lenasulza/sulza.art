export default function WhiteStone({ x, y, size = 20, number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <radialGradient id="neonWhiteStoneGradient">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </radialGradient>
      </defs>
      <circle
        cx="0"
        cy="0"
        r={size}
        fill="url(#neonWhiteStoneGradient)"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
      <circle
        cx="-3"
        cy="-3"
        r={size * 0.4}
        fill="#ffffff"
        opacity="0.8"
      />
      {number && (
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#000000"
          fontSize={size * 0.8}
          fontWeight="bold"
        >
          {number}
        </text>
      )}
    </g>
  );
}
