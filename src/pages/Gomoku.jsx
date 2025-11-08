import { Link } from 'react-router-dom';
import GomokuGame from '../components/GomokuGame';

export default function Gomoku() {
  return (
    <div className="w-full h-full relative">
      <GomokuGame />
      <Link
        to="/"
        className="absolute top-5 right-5 bg-surface/90 hover:bg-primary/90 text-text px-4 py-2 rounded-lg transition-colors"
      >
        ← Back Home
      </Link>
    </div>
  );
}
