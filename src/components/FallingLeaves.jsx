import React, { useMemo } from 'react';
import './FallingLeaves.css';

const LeafSVG = ({ color }) => (
  <svg viewBox="0 0 512 512" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M495.2 245.9l-61.9-52.9c-8.9-7.6-13-19.5-10.4-30.8l20.4-88.6c4-17.4-12.7-31.5-29.2-24.6l-84.3 35.3c-11 4.6-23.7 2.3-32.5-5.9l-67-62.8c-12.6-11.8-32.6-11.8-45.2 0l-67 62.8c-8.8 8.2-21.5 10.5-32.5 5.9l-84.3-35.3c-16.5-6.9-33.2 7.2-29.2 24.6l20.4 88.6c2.6 11.3-1.5 23.2-10.4 30.8L20 245.9c-13.4 11.5-12.4 32.8 2 43l81 57.3c10.3 7.3 15.6 19.9 13.5 32l-18.7 106.8c-3 17 14.8 29.8 30.6 22l81.2-40c11.1-5.5 24.3-5.5 35.4 0l81.2 40c15.8 7.8 33.6-5 30.6-22l-18.7-106.8c-2.1-12.1 3.2-24.7 13.5-32l81-57.3c14.4-10.2 15.4-31.5 2-43z"/>
  </svg>
);

const colors = [
  'var(--accent-orange)',
  'var(--accent-gold)',
  'var(--accent-rose)',
  'var(--accent-burgundy)'
];

const FallingLeaves = ({ density = 25 }) => {
  const leaves = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const left = Math.random() * 100; // 0 to 100% viewport width
      const animDuration = 8 + Math.random() * 12; // 8 to 20s fall duration
      const animDelay = Math.random() * 10; // 0 to 10s delay (we use negative for immediate start mid-screen)
      const size = 15 + Math.random() * 20; // 15 to 35px size
      const opacity = 0.3 + Math.random() * 0.5; // 0.3 to 0.8 opacity
      const color = colors[Math.floor(Math.random() * colors.length)];
      const endX = (Math.random() - 0.5) * 200; // drift between -100px and 100px horizontally
      const rot = Math.random() * 360 + 180; // random end rotation
      
      return { id: i, left, animDuration, animDelay, size, opacity, color, endX, rot };
    });
  }, [density]);

  return (
    <div className="falling-leaves-container">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf-wrapper"
          style={{
            left: `${leaf.left}vw`,
            animationDuration: `${leaf.animDuration}s`,
            animationDelay: `-${leaf.animDelay}s`, // Negative delay makes them start falling immediately, scattered
            '--end-x': `${leaf.endX}px`,
            '--end-rot': `${leaf.rot}deg`,
            opacity: leaf.opacity,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
          }}
        >
          <div className="leaf-sway">
            <LeafSVG color={leaf.color} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
