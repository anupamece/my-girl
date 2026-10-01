import React from 'react';
import { ArrowDown, Heart, MessageCircle, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './JourneyTimeline.css';

const MOMENTS = [
  { date: '07 Aug 2024', title: 'It Started With a Hello', copy: 'A simple conversation became the beginning of something neither of us could have planned.', icon: MessageCircle, art: 'first-talk' },
  { date: '04 Nov 2024', title: 'We Chose Us', copy: 'We gave our story a name. From that day, every little moment felt a little more like home.', icon: Heart, art: 'official' },
  { date: 'Dec 2024', title: 'The Stormy Pages', copy: 'There were ups and downs, doubts and difficult days. We did not always know what we were, but what we felt was real.', icon: Sparkles, art: 'storm' },
  { date: '2025', title: 'We Built Again', copy: 'Slowly, honestly, we found our way back to the love worth fighting for. We grew stronger together.', icon: Heart, art: 'rebuild' },
  { date: 'Jan 2026', title: 'A Pause We Never Wanted', copy: 'After nearly a year, circumstances asked us to let go. It hurt, but it never erased what we had.', icon: Send, art: 'goodbye' },
  { date: 'Sep - 01 Oct 2026', title: 'Destiny Brought You Home', copy: 'Then destiny wrote another chapter and brought you back to me. And now, it is finally our October 1.', icon: Sparkles, art: 'reunion' },
];

export default function JourneyTimeline({ onComplete }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section className="journey-timeline" ref={ref}>
      <motion.header className="journey-timeline__header" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
        <p className="journey-timeline__eyebrow">Our story, in every season</p>
        <h2>What We Found Our Way Through</h2>
        <p className="journey-timeline__intro">Not a straight line. Not a perfect story. Just ours, and worth every page.</p>
      </motion.header>

      <div className="journey-timeline__track" aria-label="Our journey timeline">
        {MOMENTS.map((moment, index) => {
          const Icon = moment.icon;
          const isLeft = index % 2 === 0;
          return (
            <motion.article className={`journey-timeline__moment ${isLeft ? 'journey-timeline__moment--left' : 'journey-timeline__moment--right'}`} key={moment.date} initial={{ opacity: 0, x: isLeft ? -28 : 28, y: 20 }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.13 }}>
              <div className={`journey-timeline__art journey-timeline__art--${moment.art}`} role="img" aria-label="Illustration for this chapter" />
              <div className="journey-timeline__marker" aria-hidden="true"><Icon size={18} strokeWidth={2.2} /></div>
              <div className="journey-timeline__copy">
                <p className="journey-timeline__date">{moment.date}</p>
                <h3>{moment.title}</h3>
                <p>{moment.copy}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      {onComplete && (
        <motion.button className="journey-timeline__continue" onClick={onComplete} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9, duration: 0.5 }}>
          Read My Letter <ArrowDown size={18} />
        </motion.button>
      )}
    </section>
  );
}
