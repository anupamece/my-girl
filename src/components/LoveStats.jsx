import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, MessageCircle, Smile, Heart, Leaf, ArrowDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { CONFIG } from '../config';
import './LoveStats.css';

// Native React 19 smooth animated number counter
const AnimatedCounter = ({ value, duration = 2200, inView, separator = false }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplayValue(0);
      return;
    }

    let startTimestamp = null;
    const startVal = 0;
    const endVal = Number(value) || 0;

    let frameId;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo curve for elegant decelerating count
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(startVal + (endVal - startVal) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(endVal);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration, inView]);

  return <span>{separator ? displayValue.toLocaleString() : displayValue}</span>;
};

const LoveStats = ({ onComplete }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const daysTogether = useMemo(() => {
    const startDate = new Date(CONFIG.relationshipStartDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="love-stats" ref={ref}>
      <motion.div
        className="love-stats__title-wrapper"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={titleVariants}
      >
        <h2 className="love-stats__title">Us, in Numbers</h2>
        <p className="love-stats__subtitle">Every moment counts 🍂</p>
      </motion.div>

      <motion.div
        className="love-stats__grid"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Card 1: Days Together */}
        <motion.div className="love-stats__card" variants={itemVariants}>
          <Calendar size={32} color="var(--accent-orange)" className="love-stats__icon" />
          <div className="love-stats__value" style={{ color: 'var(--accent-orange)' }}>
            <AnimatedCounter value={daysTogether} duration={2200} inView={inView} />
          </div>
          <div className="love-stats__label">Days Together</div>
        </motion.div>

        {/* Card 2: Late Night Calls */}
        <motion.div className="love-stats__card" variants={itemVariants}>
          <Phone size={32} color="var(--accent-rose)" className="love-stats__icon" />
          <div className="love-stats__value" style={{ color: 'var(--accent-rose)' }}>
            <AnimatedCounter value={CONFIG.stats.lateNightCalls} duration={2200} inView={inView} />
          </div>
          <div className="love-stats__label">Late Night Calls</div>
        </motion.div>

        {/* Card 3: Messages Sent */}
        <motion.div className="love-stats__card" variants={itemVariants}>
          <MessageCircle size={32} color="var(--accent-gold)" className="love-stats__icon" />
          <div className="love-stats__value" style={{ color: 'var(--accent-gold)' }}>
            <AnimatedCounter value={CONFIG.stats.messagesSent} duration={2400} inView={inView} separator={true} />
          </div>
          <div className="love-stats__label">Messages Exchanged</div>
        </motion.div>

        {/* Card 4: Inside Jokes */}
        <motion.div className="love-stats__card" variants={itemVariants}>
          <Smile size={32} color="var(--accent-sage)" className="love-stats__icon" />
          <div className="love-stats__value" style={{ color: 'var(--accent-sage)' }}>
            <AnimatedCounter value={CONFIG.stats.insideJokes} duration={2000} inView={inView} />
          </div>
          <div className="love-stats__label">Inside Jokes Shared</div>
        </motion.div>

        {/* Card 5: Times Thought of You */}
        <motion.div className="love-stats__card" variants={itemVariants}>
          <Heart size={32} color="var(--accent-rose)" className="love-stats__icon" />
          <div className="love-stats__value love-stats__infinity" style={{ color: 'var(--accent-rose)' }}>
            ∞
          </div>
          <div className="love-stats__label">Times I Thought of You Today</div>
        </motion.div>
      </motion.div>

      <motion.div
        className="love-stats__decoration"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="love-stats__line"></div>
        <Leaf size={22} className="love-stats__leaf" />
        <div className="love-stats__line"></div>
      </motion.div>

      {onComplete && (
        <motion.button
          className="love-stats__continue-btn"
          onClick={onComplete}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Our Memory Game 🃏 <ArrowDown size={18} />
        </motion.button>
      )}
    </section>
  );
};

export default LoveStats;
