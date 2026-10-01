import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoorOpen, Heart, Sparkles, ArrowDown, Music } from 'lucide-react';
import FallingLeaves from './FallingLeaves';
import { ambientPlayer } from '../utils/audio';
import './GrandEntrance.css';

const GrandEntrance = ({ onComplete }) => {
  const [doorState, setDoorState] = useState('closed'); // 'closed' | 'opening' | 'opened'
  
  const handleOpen = () => {
    if (doorState !== 'closed') return;
    setDoorState('opening');

    // Start soothing autumn ambient music on first interaction
    try {
      ambientPlayer.start();
    } catch {
      // Audio safety
    }
    
    // Simulate door opening time then reveal message
    setTimeout(() => {
      setDoorState('opened');
      if (onComplete) {
        setTimeout(onComplete, 4500); // Auto-advance after 4.5s
      }
    }, 1500); 
  };

  const messageText = "My girl, my girl, my girl...";
  
  return (
    <section className="grand-entrance">
      <FallingLeaves density={28} />
      
      <div className="grand-entrance__content">
        <div className="grand-entrance__text-container">
          <AnimatePresence mode="wait">
            {doorState === 'closed' ? (
              <motion.h1 
                key="pre-text"
                className="grand-entrance__title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
              >
                Someone has a surprise for you... <Sparkles className="icon-sparkle" size={24} />
              </motion.h1>
            ) : (
              <motion.div 
                key="post-text"
                className="grand-entrance__message-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <h1 className="grand-entrance__message">
                  {messageText.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.08, duration: 0.1 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + messageText.length * 0.08 + 0.3, type: 'spring' }}
                  >
                    <Heart className="icon-heart" size={32} />
                  </motion.span>
                </h1>
                <motion.p
                  className="grand-entrance__subquote"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8, duration: 0.8 }}
                >
                  "you will be my world." 🍂
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="door-container">
          <div className="door-frame">
            <div className="door-glow"></div>
            <div className={`door-leaf ${doorState !== 'closed' ? 'door-open' : ''}`}>
              <div className="door-handle"></div>
            </div>
          </div>
        </div>

        <div className="grand-entrance__action-container">
          <AnimatePresence>
            {doorState === 'closed' ? (
              <motion.button 
                className="open-button"
                onClick={handleOpen}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open <DoorOpen size={20} />
              </motion.button>
            ) : (
              <motion.button
                className="enter-button"
                onClick={onComplete}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Step Inside 🍁 <ArrowDown size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GrandEntrance;
