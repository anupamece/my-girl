import React from 'react';
import './JourneyNav.css';

const SECTIONS = [
  { id: 'entrance', label: 'Door', icon: '🚪' },
  { id: 'runaway', label: 'Question', icon: '🍂' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'memory', label: 'Memories', icon: '🃏' },
  { id: 'letter', label: 'Letter', icon: '💌' },
  { id: 'playlist', label: 'Soundtrack', icon: '🎵' },
  { id: 'finale', label: 'Finale', icon: '🌟' },
];

export default function JourneyNav({ onNavigate, activeSection }) {
  return (
    <nav className="journey-nav" aria-label="Surprise Chapters">
      <div className="journey-nav__track">
        {SECTIONS.map((sec, idx) => (
          <button
            key={sec.id}
            className={`journey-nav__dot ${activeSection === sec.id ? 'is-active' : ''}`}
            onClick={() => onNavigate(sec.id)}
            title={sec.label}
            aria-label={sec.label}
          >
            <span className="journey-nav__icon">{sec.icon}</span>
            <span className="journey-nav__tooltip">{sec.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
