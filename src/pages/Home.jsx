import { Link } from 'react-router-dom';

export default function Home() {
  const links = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alena-sulza-b887b292/' },
    { name: 'Gomoku Game', url: '/gomoku', internal: true }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center bg-background relative">
      <div className="max-w-2xl mx-auto px-8 py-16 text-center animate-fade-in-up">
        {/* Main Name - Large Display */}
        <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-6 text-text neon-text" style={{ fontFamily: 'monospace, sans-serif', letterSpacing: '-0.02em' }}>
          LENA SULZA
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base uppercase tracking-widest text-text-secondary mb-16" style={{ letterSpacing: '0.15em' }}>
          motion designer · in Amsterdam
        </p>

        {/* Link List */}
        <nav className="space-y-6 mb-20">
          {links.map((link, index) => (
            link.internal ? (
              <Link
                key={index}
                to={link.url}
                className="block text-xl md:text-2xl text-text-secondary link-item font-light tracking-wide"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block text-xl md:text-2xl text-text-secondary link-item font-light tracking-wide"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </a>
            )
          ))}
        </nav>

      </div>
    </div>
  );
}
