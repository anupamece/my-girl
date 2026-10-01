import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Confetti from 'react-confetti';
import { Heart, Moon, Sparkles, RotateCcw } from 'lucide-react';
import { CONFIG } from '../config';
import './GrandFinale.css';

// Hook to get window dimensions for confetti
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const GrandFinale = ({ onRestart }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { width, height } = useWindowSize();
  
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(0);
  
  const [moonClicks, setMoonClicks] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Generate stars once
  const stars = useMemo(() => {
    const starCount = 50;
    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.5,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  // Floating hearts for celebration
  const floatingHearts = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
      size: Math.random() * 20 + 20,
    }));
  }, []);

  // Handle celebration start
  const handleStartCelebration = () => {
    setCelebrationMode(true);
    setConfettiPieces(320);
  };

  // Confetti decrease timer
  useEffect(() => {
    if (celebrationMode && confettiPieces > 0) {
      const timer = setInterval(() => {
        setConfettiPieces(prev => Math.max(0, prev - 4));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [celebrationMode, confettiPieces]);

  // Handle moon clicks
  const handleMoonClick = (e) => {
    e.stopPropagation();
    const newCount = moonClicks + 1;
    setMoonClicks(newCount);
    if (newCount >= 3) {
      setShowPopup(true);
      setMoonClicks(0);
    }
  };

  const closePopup = () => {
    if (showPopup) setShowPopup(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.9,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 3.2,
        type: "spring",
        stiffness: 100
      }
    },
  };

  const celebrationTitle = CONFIG.finale.celebrationText.replace(
    "{name}",
    CONFIG.recipientName || "Baby"
  );

  return (
    <section 
      className={`grand-finale ${celebrationMode ? 'grand-finale--celebrating' : ''}`}
      onClick={closePopup}
      ref={ref}
    >
      {/* Confetti overlay */}
      {celebrationMode && width && height && confettiPieces > 0 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={confettiPieces}
          colors={['#e07a3a', '#d4878f', '#d4a24e', '#faf0e6', '#8a9a7b', '#6b2d3e']}
          recycle={false}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none' }}
        />
      )}

      {/* Star Particles */}
      <div className="grand-finale__stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="grand-finale__star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grand-finale__content">
        <AnimatePresence mode="wait">
          {!celebrationMode ? (
            <motion.div
              key="intro"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}
            >
              <motion.h1 variants={itemVariants} className="grand-finale__line1">
                {CONFIG.finale.line1}
              </motion.h1>
              
              <motion.h2 variants={itemVariants} className="grand-finale__line2">
                {CONFIG.finale.line2}
              </motion.h2>
              
              <motion.p variants={itemVariants} className="grand-finale__line3">
                {CONFIG.finale.line3}
              </motion.p>
              
              <motion.button 
                variants={buttonVariants}
                className="grand-finale__button"
                onClick={handleStartCelebration}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <Heart size={24} fill="currentColor" />
                I Love You 💛
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, type: "spring", bounce: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}
            >
              <h1 className="grand-finale__celebration-text">
                {celebrationTitle}
              </h1>
              
              <p className="grand-finale__celebration-subtext">
                {CONFIG.finale.celebrationSubtext}
              </p>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={48} color="var(--accent-gold)" />
              </motion.div>

              {onRestart && (
                <button className="grand-finale__restart-btn" onClick={onRestart}>
                  <RotateCcw size={16} /> Replay from Start 🍂
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Hearts for Celebration Mode */}
      {celebrationMode && (
        <div className="grand-finale__floating-hearts">
          {floatingHearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ y: "100vh", opacity: 0, x: "-50%" }}
              animate={{ 
                y: "-20vh", 
                opacity: [0, 1, 1, 0],
                x: ["-50%", "-100%", "50%", "-50%"]
              }}
              transition={{ 
                duration: heart.duration, 
                delay: heart.delay, 
                repeat: Infinity,
                ease: "easeOut"
              }}
              style={{
                position: 'absolute',
                left: heart.left,
                color: 'var(--accent-rose)',
              }}
            >
              <Heart size={heart.size} fill="currentColor" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="grand-finale__footer">
        <p className="grand-finale__footer-text">Made with 💛 just for you</p>
        <p className="grand-finale__footer-date">October 1st, 2026</p>
      </footer>

      {/* Easter Egg Moon */}
      <div className="grand-finale__easter-egg" title="Click me 3 times 🌙">
        <Moon 
          size={26} 
          color="var(--accent-gold)" 
          style={{ opacity: 0.4, transition: 'opacity 0.3s ease' }}
          onClick={handleMoonClick}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
        />
        
        {showPopup && <div className="grand-finale__popup-overlay" />}
        
        <AnimatePresence>
          {showPopup && (
            <motion.div 
              className="grand-finale__popup"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <p>{CONFIG.finale.easterEggPrompt}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GrandFinale;
