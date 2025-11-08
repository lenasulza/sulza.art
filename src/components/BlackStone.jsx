export default function BlackStone({ x, y, size = 20, number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <radialGradient id="pinkStoneGradient">
          <stop offset="0%" stopColor="#ff6ec7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </radialGradient>
      </defs>
      <circle
        cx="0"
        cy="0"
        r={size}
        fill="url(#pinkStoneGradient)"
        stroke="#ff1493"
        strokeWidth="1.5"
      />
      <circle
        cx="-3"
        cy="-3"
        r={size * 0.3}
        fill="#ffb3e6"
        opacity="0.6"
      />
      {number && (
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          fontSize={size * 0.8}
          fontWeight="bold"
        >
          {number}
        </text>
      )}
    </g>
  );
}
