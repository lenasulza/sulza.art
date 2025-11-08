import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Lena Sulza
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Developer • Designer • Creator
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="bg-surface p-6 rounded-lg border border-border hover:border-primary transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-primary">About</h2>
            <p className="text-text-secondary leading-relaxed">
              Creative developer passionate about building interactive experiences
              and exploring the intersection of design and technology.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border hover:border-secondary transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-secondary">Projects</h2>
            <p className="text-text-secondary leading-relaxed">
              Working on innovative web applications, interactive visualizations,
              and experimental interfaces.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/gomoku"
            className="inline-block bg-primary hover:bg-secondary text-text font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Play Gomoku Game
          </Link>
        </div>

        <div className="mt-12 text-center text-text-secondary text-sm">
          <p>Built with React, Vite, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
