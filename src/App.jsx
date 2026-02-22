import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

import Header from './components/Header';
import Home from './components/Home';

// Separate Feature Components
import PrayerTimes from './components/PrayerTimes';
import RamadanCalendar from './components/RamadanCalendar';
import DailyDua from './components/DailyDua';
import QuranExplorer from './components/QuranExplorer';
import Tracker from './components/Tracker';
import Challenges from './components/Challenges';
import NamesOfAllah from './components/NamesOfAllah';
import Tasbih from './components/Tasbih';
import Journal from './components/Journal';
import ImanQuest from './components/Game/ImanQuest';
import Sidebar from './components/Sidebar';
import LoadingScreen from './components/LoadingScreen';
import QuranKhatam from './components/QuranKhatam';

import { translations } from './translations';

function App() {
  const [selectedCity, setSelectedCity] = useState('Erbil');
  const [language, setLanguage] = useState('ku'); // Default to Kurdish
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[language];
  const direction = language === 'ku' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {/* Scroll Progress Bar */}
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'var(--primary)',
                transformOrigin: '0%',
                zIndex: 2000,
                scaleX
              }}
            />

            <Header
              language={language}
              setLanguage={setLanguage}
              t={t}
              onMenuClick={() => setIsMenuOpen(true)}
            />

            <Sidebar
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              t={t}
              language={language}
            />

            <main style={{ flex: 1, paddingTop: '80px', direction }}>
              <Routes>
                <Route path="/" element={<Home selectedCity={selectedCity} t={t} language={language} />} />
                <Route path="/prayers" element={
                  <div className="container" style={{ padding: '2rem 0' }}>
                    <PrayerTimes selectedCity={selectedCity} setSelectedCity={setSelectedCity} t={t} language={language} />
                  </div>
                } />
                <Route path="/calendar" element={
                  <div className="container" style={{ padding: '2rem 0' }}>
                    <RamadanCalendar t={t} language={language} selectedCity={selectedCity} />
                  </div>
                } />
                <Route path="/dua" element={
                  <div className="container" style={{ padding: '2rem 0' }}>
                    <DailyDua t={t} />
                  </div>
                } />
                <Route path="/quran" element={<QuranExplorer t={t} language={language} />} />
                <Route path="/khatam" element={
                  <div className="container" style={{ padding: '2rem 0' }}>
                    <QuranKhatam t={t} language={language} />
                  </div>
                } />
                <Route path="/tracker" element={<Tracker t={t} language={language} />} />
                <Route path="/challenges" element={<Challenges t={t} language={language} />} />
                <Route path="/names" element={<NamesOfAllah t={t} language={language} />} />
                <Route path="/tasbih" element={<Tasbih t={t} language={language} />} />
                <Route path="/journal" element={<Journal t={t} language={language} />} />
                <Route path="/game" element={<ImanQuest t={t} language={language} />} />
              </Routes>
            </main>

            <footer style={{
              padding: '4rem 0',
              textAlign: 'center',
              opacity: 0.5,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              marginTop: '4rem'
            }}>
              <p style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                Ramadan Kareem • {new Date().getFullYear()} • 1447
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
