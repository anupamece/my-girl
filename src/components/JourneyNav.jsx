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
        {SECTIONS.map((sec) => {
          const section = sec.id === 'memory'
            ? { ...sec, id: 'timeline', label: 'Our Journey', icon: '♥' }
            : sec;

          return (
            <button
              key={section.id}
              className={`journey-nav__dot ${activeSection === section.id ? 'is-active' : ''}`}
              onClick={() => onNavigate(section.id)}
              title={section.label}
              aria-label={section.label}
            >
              <span className="journey-nav__icon">{section.icon}</span>
              <span className="journey-nav__tooltip">{section.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
