import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Trophy, RotateCcw } from 'lucide-react';

const allNames = [
    { arabic: "الرحمن", meaning: { en: "The Most Merciful", ku: "بەخشندەترین" } },
    { arabic: "الرحيم", meaning: { en: "The Most Kind", ku: "میهرەبانترین" } },
    { arabic: "الملك", meaning: { en: "The Sovereign", ku: "پادشا و خاوەن" } },
    { arabic: "القدوس", meaning: { en: "The Most Pure", ku: "پاک و بێگەرد" } },
    { arabic: "السلام", meaning: { en: "The Source of Peace", ku: "سەرچاوەی ئاشتی" } },
    { arabic: "المؤمن", meaning: { en: "The Giver of Faith", ku: "بەخشەری ئیمان" } },
    { arabic: "المهيمن", meaning: { en: "The Guardian", ku: "پارێزەر و چاودێر" } },
    { arabic: "العزيز", meaning: { en: "The Almighty", ku: "باڵادەست و بەدەسەڵات" } },
];

const NamesOfAllah = ({ t, language }) => {
    const [gameNames, setGameNames] = useState([]);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedMeaning, setSelectedMeaning] = useState(null);
    const [matches, setMatches] = useState([]);
    const [score, setScore] = useState(0);
    const [showWin, setShowWin] = useState(false);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        const shuffled = [...allNames].sort(() => 0.5 - Math.random()).slice(0, 6);
        setGameNames(shuffled);
        setMatches([]);
        setScore(0);
        setSelectedName(null);
        setSelectedMeaning(null);
        setShowWin(false);
    };

    const handleNameClick = (name) => {
        if (matches.includes(name.arabic)) return;
        setSelectedName(name);
        if (selectedMeaning && selectedMeaning.arabic === name.arabic) {
            setMatches([...matches, name.arabic]);
            setScore(score + 20);
            setSelectedName(null);
            setSelectedMeaning(null);
        } else if (selectedMeaning) {
            setSelectedMeaning(null);
        }
    };

    const handleMeaningClick = (meaning) => {
        if (matches.includes(meaning.arabic)) return;
        setSelectedMeaning(meaning);
        if (selectedName && selectedName.arabic === meaning.arabic) {
            setMatches([...matches, meaning.arabic]);
            setScore(score + 20);
            setSelectedName(null);
            setSelectedMeaning(null);
        } else if (selectedName) {
            setSelectedName(null);
        }
    };

    useEffect(() => {
        if (matches.length === gameNames.length && gameNames.length > 0) {
            setShowWin(true);
        }
    }, [matches, gameNames]);

    return (
        <section id="names-game" className="container" style={{ padding: '6rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.names_allah}</h2>
                <p style={{ color: 'var(--text-dim)' }}>{language === 'ku' ? 'ناو پیرۆزەکانی خودا ببەستەرەوە بە مانا جوانەکانیان.' : 'Match the Divine Names with their beautiful meanings.'}</p>
            </div>

            <div className="glass" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', minHeight: '500px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', alignItems: 'center', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                        <Trophy color="var(--primary)" size={24} />
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{score} {t.points}</span>
                    </div>
                    <button onClick={initGame} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                        <RotateCcw size={18} /> {t.reset_game}
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', direction: language === 'ku' ? 'rtl' : 'ltr' }}>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem', textAlign: language === 'ku' ? 'right' : 'left' }}>
                            {language === 'ku' ? 'ناوە پیرۆزەکان' : 'Arabic Names'}
                        </h4>
                        {gameNames.map((n) => (
                            <motion.button
                                key={n.arabic}
                                whileHover={!matches.includes(n.arabic) ? { scale: 1.02, background: 'rgba(255,255,255,0.08)' } : {}}
                                onClick={() => handleNameClick(n)}
                                style={{
                                    padding: '1.25rem',
                                    borderRadius: '12px',
                                    border: matches.includes(n.arabic) ? '1px solid var(--accent)' : (selectedName?.arabic === n.arabic ? '1px solid var(--primary)' : '1px solid var(--surface-border)'),
                                    background: matches.includes(n.arabic) ? 'rgba(16, 185, 129, 0.1)' : (selectedName?.arabic === n.arabic ? 'rgba(212, 175, 55, 0.1)' : 'transparent'),
                                    color: matches.includes(n.arabic) ? 'var(--accent)' : 'white',
                                    cursor: matches.includes(n.arabic) ? 'default' : 'pointer',
                                    fontSize: '1.25rem',
                                    fontFamily: 'var(--font-display)',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {n.arabic}
                            </motion.button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem', textAlign: language === 'ku' ? 'right' : 'left' }}>
                            {language === 'ku' ? 'ماناکان' : 'Meanings'}
                        </h4>
                        {[...gameNames].sort((a, b) => a.arabic.localeCompare(b.arabic)).map((n) => (
                            <motion.button
                                key={n.meaning[language]}
                                whileHover={!matches.includes(n.arabic) ? { scale: 1.02, background: 'rgba(255,255,255,0.08)' } : {}}
                                onClick={() => handleMeaningClick(n)}
                                style={{
                                    padding: '1.25rem',
                                    borderRadius: '12px',
                                    border: matches.includes(n.arabic) ? '1px solid var(--accent)' : (selectedMeaning?.arabic === n.arabic ? '1px solid var(--primary)' : '1px solid var(--surface-border)'),
                                    background: matches.includes(n.arabic) ? 'rgba(16, 185, 129, 0.1)' : (selectedMeaning?.arabic === n.arabic ? 'rgba(212, 175, 55, 0.1)' : 'transparent'),
                                    color: matches.includes(n.arabic) ? 'var(--accent)' : 'white',
                                    cursor: matches.includes(n.arabic) ? 'default' : 'pointer',
                                    fontSize: '1rem',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {n.meaning[language]}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {showWin && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(2, 6, 23, 0.9)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '20px',
                                zIndex: 10
                            }}
                        >
                            <Sparkles size={64} color="var(--primary)" style={{ marginBottom: '2rem' }} />
                            <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{language === 'ku' ? 'نایابە!' : 'Excellent!'}</h3>
                            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>{language === 'ku' ? 'تۆ ٦ ناوی تری خودات ناسی.' : "You've learned 6 more attributes of Allah."}</p>
                            <button className="btn-primary" onClick={initGame}>{language === 'ku' ? 'دووبارە یاری بکەوە' : 'Play Again'}</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default NamesOfAllah;
