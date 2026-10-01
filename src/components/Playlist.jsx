import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Pause, ExternalLink, ArrowDown, Sparkles, Disc } from 'lucide-react';
import { CONFIG } from '../config';
import { ambientPlayer } from '../utils/audio';
import './Playlist.css';

export default function Playlist({ onComplete }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeSong, setActiveSong] = useState(1); // Default to the first song (we fell in love in october)

  const handleSongClick = (id) => {
    if (activeSong === id) {
      setActiveSong(null);
      ambientPlayer.stop();
    } else {
      setActiveSong(id);
      ambientPlayer.start();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="playlist-section" ref={ref}>
      <div className="playlist-container">
        
        <motion.div 
          className="playlist-header"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="playlist-title">Songs That Remind Me of You</h2>
          <p className="playlist-subtitle">Our soundtrack 🎵</p>
        </motion.div>

        <motion.div 
          className="vinyl-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={`vinyl-record ${activeSong ? 'spinning' : ''}`}>
            <div className="vinyl-grooves"></div>
            <div className="vinyl-label">
              <Disc size={20} color="var(--bg-dark)" className="vinyl-center-icon" />
              <div className="vinyl-hole"></div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="song-list"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {CONFIG.playlist.map((song) => {
            const isPlaying = activeSong === song.id;
            return (
              <motion.div
                key={song.id}
                variants={itemVariants}
                className={`song-card ${isPlaying ? 'active' : ''}`}
                onClick={() => handleSongClick(song.id)}
              >
                <div className="song-action">
                  {isPlaying ? (
                    <Pause size={22} color="var(--accent-orange)" />
                  ) : (
                    <Play size={22} color="var(--text-cream)" />
                  )}
                </div>
                
                <div className="song-info">
                  <div className="song-title-row">
                    <span className="song-icon">{song.icon}</span>
                    <span className="song-title">{song.title}</span>
                    <span className="song-artist">— {song.artist}</span>
                  </div>
                  <div className="song-note">{song.note}</div>
                </div>

                <a 
                  href={song.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="song-link"
                  onClick={(e) => e.stopPropagation()}
                  title="Listen on Spotify"
                >
                  <ExternalLink size={18} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {onComplete && (
          <motion.button
            className="playlist-continue-btn"
            onClick={onComplete}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            One Final Message For You... ✨ <ArrowDown size={18} />
          </motion.button>
        )}

      </div>
    </section>
  );
}
