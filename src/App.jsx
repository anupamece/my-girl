import React, { useState, useRef, useCallback, useEffect } from 'react';
import GrandEntrance from './components/GrandEntrance';
import RunawayButton from './components/RunawayButton';
import LoveStats from './components/LoveStats';
import MemoryMatch from './components/MemoryMatch';
import LoveLetter from './components/LoveLetter';
import Playlist from './components/Playlist';
import GrandFinale from './components/GrandFinale';
import AudioToggle from './components/AudioToggle';
import JourneyNav from './components/JourneyNav';
import './App.css';

function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('entrance');

  const entranceRef = useRef(null);
  const runawayRef = useRef(null);
  const statsRef = useRef(null);
  const memoryRef = useRef(null);
  const letterRef = useRef(null);
  const playlistRef = useRef(null);
  const finaleRef = useRef(null);

  const scrollToRef = useCallback((ref, sectionId) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (sectionId) setActiveSection(sectionId);
    }
  }, []);

  const handleEntranceComplete = useCallback(() => {
    setEntranceComplete(true);
    setTimeout(() => {
      scrollToRef(runawayRef, 'runaway');
    }, 250);
  }, [scrollToRef]);

  const handleRunawayComplete = useCallback(() => {
    scrollToRef(statsRef, 'stats');
  }, [scrollToRef]);

  const handleStatsComplete = useCallback(() => {
    scrollToRef(memoryRef, 'memory');
  }, [scrollToRef]);

  const handleMemoryComplete = useCallback(() => {
    scrollToRef(letterRef, 'letter');
  }, [scrollToRef]);

  const handleLetterComplete = useCallback(() => {
    scrollToRef(playlistRef, 'playlist');
  }, [scrollToRef]);

  const handlePlaylistComplete = useCallback(() => {
    scrollToRef(finaleRef, 'finale');
  }, [scrollToRef]);

  const handleRestart = useCallback(() => {
    scrollToRef(entranceRef, 'entrance');
  }, [scrollToRef]);

  const handleNavClick = useCallback((id) => {
    switch (id) {
      case 'entrance':
        scrollToRef(entranceRef, 'entrance');
        break;
      case 'runaway':
        scrollToRef(runawayRef, 'runaway');
        break;
      case 'stats':
        scrollToRef(statsRef, 'stats');
        break;
      case 'memory':
        scrollToRef(memoryRef, 'memory');
        break;
      case 'letter':
        scrollToRef(letterRef, 'letter');
        break;
      case 'playlist':
        scrollToRef(playlistRef, 'playlist');
        break;
      case 'finale':
        scrollToRef(finaleRef, 'finale');
        break;
      default:
        break;
    }
  }, [scrollToRef]);

  // Update active section on scroll
  useEffect(() => {
    if (!entranceComplete) return;

    const sections = [
      { id: 'entrance', ref: entranceRef },
      { id: 'runaway', ref: runawayRef },
      { id: 'stats', ref: statsRef },
      { id: 'memory', ref: memoryRef },
      { id: 'letter', ref: letterRef },
      { id: 'playlist', ref: playlistRef },
      { id: 'finale', ref: finaleRef },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].ref.current;
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [entranceComplete]);

  return (
    <div className="app">
      {/* Floating Ambient Soundtrack Toggle */}
      <AudioToggle />

      {/* Floating Journey Progress Navigation */}
      {entranceComplete && (
        <JourneyNav onNavigate={handleNavClick} activeSection={activeSection} />
      )}

      {/* Chapter 1: The Grand Entrance */}
      <section className="app__section" ref={entranceRef} id="chapter-entrance">
        <GrandEntrance onComplete={handleEntranceComplete} />
      </section>

      {/* Chapters 2 to 7: Unlocked once the door is opened */}
      {entranceComplete && (
        <div className="app__journey app__journey--revealed">
          {/* Chapter 2: Will you be my October girl? */}
          <section className="app__section" ref={runawayRef} id="chapter-runaway">
            <RunawayButton onComplete={handleRunawayComplete} />
          </section>

          {/* Chapter 3: Love Stats Dashboard */}
          <section className="app__section" ref={statsRef} id="chapter-stats">
            <LoveStats onComplete={handleStatsComplete} />
          </section>

          {/* Chapter 4: Memory Match Game */}
          <section className="app__section" ref={memoryRef} id="chapter-memory">
            <MemoryMatch onComplete={handleMemoryComplete} />
          </section>

          {/* Chapter 5: Sealed Love Letter */}
          <section className="app__section" ref={letterRef} id="chapter-letter">
            <LoveLetter onComplete={handleLetterComplete} />
          </section>

          {/* Chapter 6: October Playlist */}
          <section className="app__section" ref={playlistRef} id="chapter-playlist">
            <Playlist onComplete={handlePlaylistComplete} />
          </section>

          {/* Chapter 7: Grand Finale */}
          <section className="app__section" ref={finaleRef} id="chapter-finale">
            <GrandFinale onRestart={handleRestart} />
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
