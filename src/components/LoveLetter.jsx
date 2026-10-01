import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, ArrowDown, Music } from 'lucide-react';
import { CONFIG } from '../config';
import './LoveLetter.css';

export default function LoveLetter({ onComplete }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [envelopeState, setEnvelopeState] = useState('sealed'); // 'sealed' | 'opening' | 'opened'

  const handleOpen = () => {
    if (envelopeState === 'sealed') {
      setEnvelopeState('opening');
      setTimeout(() => {
        setEnvelopeState('opened');
      }, 1400);
    }
  };

  const hearts = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    x: Math.random() * 120 - 60,
    y: Math.random() * 100 - 50,
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 1.5,
  }));

  return (
    <section className="love-letter-section" ref={ref}>
      <div className="love-letter-container">
        <AnimatePresence mode="wait">
          {envelopeState !== 'opened' ? (
            <motion.div
              key="envelope"
              className="envelope-wrapper"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="envelope-text top">A letter for you... 💌</div>
              
              <motion.div
                className={`envelope ${envelopeState === 'opening' ? 'opening' : ''}`}
                onClick={handleOpen}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: envelopeState === 'sealed' ? Infinity : 0,
                  duration: 3,
                  ease: 'easeInOut'
                }}
              >
                <div className="envelope__body"></div>
                <div className="envelope__flap"></div>
                {envelopeState === 'sealed' && (
                  <div className="envelope__seal">
                    <Heart className="seal-heart" fill="var(--accent-rose)" color="var(--accent-rose)" />
                  </div>
                )}
                
                {envelopeState === 'opening' && (
                  <motion.div 
                    className="envelope__letter-preview"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -80, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
                  >
                     <div className="preview-lines"></div>
                     <div className="preview-lines"></div>
                     <div className="preview-lines"></div>
                  </motion.div>
                )}
              </motion.div>
              
              {envelopeState === 'sealed' && (
                <motion.div 
                  className="envelope-text bottom"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  tap to open 💌
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              className="letter-wrapper"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.35 }}
            >
              {hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="floating-heart"
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, heart.scale, heart.scale],
                    x: heart.x * 3,
                    y: heart.y * 3 - 60,
                  }}
                  transition={{
                    duration: 3.5,
                    delay: heart.delay,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                  }}
                >
                  <Heart size={22} fill="var(--accent-rose)" color="var(--accent-rose)" />
                </motion.div>
              ))}

              <div className="letter-paper">
                <div className="letter-content">
                  <p className="letter-salutation">{CONFIG.letter.salutation}</p>
                  
                  {CONFIG.letter.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                  
                  <div className="letter-signature">
                    <p>{CONFIG.letter.signoff}</p>
                    <p className="letter-signature-name">{CONFIG.senderName} 💛</p>
                  </div>
                </div>
              </div>

              {onComplete && (
                <motion.button
                  className="letter-continue-btn"
                  onClick={onComplete}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Listen to Our Songs 🎵 <ArrowDown size={18} />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
