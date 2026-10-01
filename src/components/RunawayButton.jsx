import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Confetti from 'react-confetti';
import { Heart, Sparkles, PartyPopper, ArrowDown } from 'lucide-react';
import './RunawayButton.css';

const nopeTexts = [
  "Nope 😏",
  "Can't catch me! 🏃‍♀️",
  "Still no? 😤",
  "Okay okay... 🥲",
  "Please? 🥺",
  "FINE I'll stay 😭"
];

// Cute Illustrated Autumn Character
const AutumnCharacter = () => (
  <motion.div
    className="autumn-character"
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
  >
    <div className="char-head">
      <div className="char-ear char-ear--left"></div>
      <div className="char-ear char-ear--right"></div>
      <div className="char-face">
        <div className="char-eye char-eye--left"></div>
        <div className="char-eye char-eye--right"></div>
        <div className="char-blush char-blush--left"></div>
        <div className="char-blush char-blush--right"></div>
        <div className="char-mouth">ω</div>
      </div>
      <div className="char-scarf">
        <div className="scarf-knot"></div>
        <div className="scarf-tail"></div>
      </div>
    </div>
    <div className="char-holding-leaf">🍁</div>
  </motion.div>
);

const RunawayButton = ({ onComplete }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  });
  
  const [nopeCount, setNopeCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [nopePos, setNopePos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const moveNopeButton = (e) => {
    if (accepted || nopeCount >= 5) return;
    
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const maxX = Math.max(100, containerRect.width / 2 - 80);
      const maxY = Math.max(80, containerRect.height / 2 - 40);
      
      const newX = (Math.random() * 2 - 1) * maxX * 0.85; 
      const newY = (Math.random() * 2 - 1) * maxY * 0.85;
      
      setNopePos({ x: newX, y: newY });
      setNopeCount(prev => prev + 1);
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
    setShowConfetti(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);
  };

  const currentNopeText = nopeTexts[Math.min(nopeCount, nopeTexts.length - 1)];
  const yesScale = 1 + nopeCount * 0.12;
  const yesGlow = nopeCount > 0 
    ? `0 0 ${15 + nopeCount * 12}px var(--accent-orange)` 
    : '0 4px 20px rgba(224, 122, 58, 0.4)';
  const nopeScale = nopeCount >= 5 ? Math.max(0.65, 1 - (nopeCount - 4) * 0.1) : 1;

  return (
    <section className="runaway-container" ref={ref}>
      {showConfetti && windowDimensions.width > 0 && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={180}
          recycle={false}
          colors={['#e07a3a', '#d4878f', '#d4a24e', '#faf0e6', '#8a9a7b']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none' }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="runaway-content-wrapper"
      >
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div 
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
              className="runaway-content-wrapper"
            >
              <AutumnCharacter />

              <h2 className="runaway-title">Will you be my October girl? 🍂</h2>
              <motion.p 
                className="runaway-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Choose wisely...
              </motion.p>
              
              <div className="runaway-actions" ref={containerRef}>
                <motion.button
                  className="runaway-btn--yes"
                  onClick={handleYesClick}
                  animate={{ 
                    scale: yesScale,
                    boxShadow: yesGlow
                  }}
                  whileHover={{ scale: yesScale * 1.06 }}
                  whileTap={{ scale: yesScale * 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  Yes! 💛
                </motion.button>
                
                <motion.button
                  className="runaway-btn--nope"
                  onMouseEnter={moveNopeButton}
                  onTouchStart={(e) => { e.preventDefault(); moveNopeButton(e); }}
                  onClick={nopeCount >= 5 ? () => {} : (e) => { e.preventDefault(); moveNopeButton(e); }}
                  animate={{
                    x: nopeCount > 0 ? nopePos.x : 0,
                    y: nopeCount > 0 ? nopePos.y : 0,
                    scale: nopeScale
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 16 }}
                  style={{ position: nopeCount > 0 ? 'absolute' : 'relative' }}
                >
                  {currentNopeText}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="accepted"
              className="runaway-success"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <div className="runaway-icons">
                <motion.div
                  initial={{ rotate: -45, scale: 0, x: -40 }}
                  animate={{ rotate: 0, scale: 1, x: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Sparkles size={40} color="var(--accent-gold)" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ delay: 0.3, duration: 1.2, repeat: Infinity }}
                >
                  <Heart size={84} fill="var(--accent-rose)" color="var(--accent-rose)" />
                </motion.div>
                <motion.div
                  initial={{ rotate: 45, scale: 0, x: 40 }}
                  animate={{ rotate: 0, scale: 1, x: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <PartyPopper size={40} color="var(--accent-orange)" />
                </motion.div>
              </div>

              <motion.h2 
                className="runaway-success-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                I knew you'd say yes! 🥰
              </motion.h2>

              <motion.p
                className="runaway-success-subtext"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Here is our story in numbers...
              </motion.p>

              <motion.button
                className="runaway-next-btn"
                onClick={onComplete}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Stats 📊 <ArrowDown size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default RunawayButton;
