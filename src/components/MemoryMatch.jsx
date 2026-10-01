import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sunset, Music, Coffee, Phone, Smile, Heart, ArrowDown, Sparkles, SkipForward } from 'lucide-react';
import { CONFIG } from '../config';
import './MemoryMatch.css';

const ICON_MAP = {
  sunset: Sunset,
  music: Music,
  coffee: Coffee,
  phone: Phone,
  smile: Smile,
  heart: Heart,
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const LeafPattern = () => (
  <svg viewBox="0 0 24 24" className="leaf-pattern" width="28" height="28">
    <path
      fill="currentColor"
      d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7,11.5 7,11.5C7,11.5 12,8 17,8Z"
    />
  </svg>
);

export default function MemoryMatch({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const initializeGame = useCallback(() => {
    const deckSource = CONFIG.memories.map(m => ({
      ...m,
      icon: ICON_MAP[m.id] || Heart,
    }));
    const deck = [...deckSource, ...deckSource].map((item, index) => ({
      ...item,
      uniqueId: `${item.id}-${index}`,
    }));
    setCards(shuffleArray(deck));
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setToastMessage(null);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (inView && cards.length === 0) {
      initializeGame();
    }
  }, [inView, cards.length, initializeGame]);

  const handleCardClick = (index) => {
    if (
      isProcessing ||
      flippedIndices.includes(index) ||
      matchedIds.includes(cards[index].id)
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves((m) => m + 1);

      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id === secondCard.id) {
        // Match!
        setTimeout(() => {
          setMatchedIds((prev) => {
            const nextMatched = [...prev, firstCard.id];
            if (nextMatched.length === CONFIG.memories.length) {
              setTimeout(() => setIsComplete(true), 400);
            }
            return nextMatched;
          });
          setFlippedIndices([]);
          setToastMessage(firstCard.message);
          setIsProcessing(false);
          
          setTimeout(() => setToastMessage(null), 3000);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 900);
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    }),
  };

  return (
    <section className="memory-match" ref={ref}>
      <div className="memory-match__header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Match Our Memories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find the pairs, unlock the moments 💛
        </motion.p>
      </div>

      <div className="memory-match__container">
        <div className="memory-match__grid">
          {cards.map((card, index) => {
            const isFlipped =
              flippedIndices.includes(index) || matchedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);
            const Icon = card.icon;

            return (
              <motion.div
                key={card.uniqueId}
                className="memory-match__card-wrapper"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <div
                  className={`memory-match__card ${isFlipped ? "is-flipped" : ""} ${
                    isMatched ? "is-matched" : ""
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="memory-match__card-face memory-match__card-back">
                    <LeafPattern />
                  </div>
                  <div className="memory-match__card-face memory-match__card-front">
                    <Icon className="memory-match__icon" size={36} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className="memory-match__toast"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button for gentle accessibility */}
      {!isComplete && onComplete && (
        <button className="memory-match__skip" onClick={onComplete}>
          Skip to Love Letter <SkipForward size={14} />
        </button>
      )}

      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="memory-match__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="memory-match__overlay-content"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <Sparkles className="memory-match__sparkle" size={44} />
              <h3>You matched them all! 🎉</h3>
              <p>Completed in {moves} moves</p>
              {onComplete && (
                <button className="memory-match__continue" onClick={onComplete}>
                  Read Your Letter 💌 <ArrowDown size={18} />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
