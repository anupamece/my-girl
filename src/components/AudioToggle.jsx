import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ambientPlayer } from '../utils/audio';
import './AudioToggle.css';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const checkState = () => {
      setIsPlaying(ambientPlayer.isPlaying);
    };
    const interval = setInterval(checkState, 500);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const nextState = ambientPlayer.toggle();
    setIsPlaying(nextState);
  };

  return (
    <button
      className={`audio-toggle ${isPlaying ? 'is-playing' : ''}`}
      onClick={handleToggle}
      title={isPlaying ? "Mute soundtrack" : "Play autumn melody 🎵"}
      aria-label="Toggle Soundtrack"
    >
      {isPlaying ? (
        <>
          <div className="audio-wave">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Volume2 size={20} />
        </>
      ) : (
        <>
          <VolumeX size={20} />
          <span className="audio-toggle__label">Music</span>
        </>
      )}
    </button>
  );
}
