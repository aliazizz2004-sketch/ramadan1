import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { RefreshCw, Fingerprint, Sparkles, Volume2, VolumeX, List, CheckCircle2 } from 'lucide-react';

const dhikrPool = {
    en: [
        { text: "سُبْحَانَ اللَّهِ", transliteration: "SubhanAllah", translation: "Glory be to Allah", count: 33 },
        { text: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", translation: "Praise be to Allah", count: 33 },
        { text: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah is Greatest", count: 34 },
        { text: "لَا إِلَهَ إِلَّا اللَّهُ", transliteration: "La ilaha illa Allah", translation: "None has the right to be worshipped but Allah", count: 100 },
    ],
    ku: [
        { text: "سُبْحَانَ اللَّهِ", transliteration: "SubhanAllah", translation: "پاک و بێگەردی بۆ خودا", count: 33 },
        { text: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", translation: "سوپاس و ستایش بۆ خودا", count: 33 },
        { text: "اللَّهُ أَكْبەرُ", transliteration: "Allahu Akbar", translation: "خودا لە هەموو شتێک گەورەترە", count: 34 },
        { text: "لَا إِلَهَ إِلَّا اللَّهُ", transliteration: "La ilaha illa Allah", translation: "هیچ پەرستراوێک نییە شایستەی پەرستن بێت جگە لە خودا", count: 100 },
    ]
};

const Tasbih = ({ t, language }) => {
    const [count, setCount] = useState(0);
    const [selectedDhikr, setSelectedDhikr] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const controls = useAnimation();

    const currentDhirkers = dhikrPool[language] || dhikrPool['en'];
    const activeDhikr = currentDhirkers[selectedDhikr];
    const progress = (count / activeDhikr.count) * 100;

    const handleIncrement = async () => {
        setCount(prev => prev + 1);

        try {
            if (!isMuted) {
                const context = new (window.AudioContext || window.webkitAudioContext)();
                const osc = context.createOscillator();
                const gain = context.createGain();
                osc.connect(gain);
                gain.connect(context.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, context.currentTime);
                gain.gain.setValueAtTime(0, context.currentTime);
                gain.gain.linearRampToValueAtTime(0.05, context.currentTime + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.1);
                osc.start();
                osc.stop(context.currentTime + 0.1);
                setTimeout(() => context.close(), 200);
            }
        } catch (e) { console.warn(e); }

        await controls.start({
            scale: [1, 0.85, 1.1, 1],
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.2, type: 'spring' }
        });
    };

    return (
        <section style={{ padding: '6rem 0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                            {t.tasbih}
                        </h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>
                            {language === 'ku' ? 'زیکر و یادی خودای گەورە ئارامی بە دڵەکان دەبەخشێت.' : 'The remembrance of Allah brings peace to the hearts.'}
                        </p>
                    </motion.div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 300px',
                    gap: '2rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    alignItems: 'start'
                }}>
                    {/* Main Counter Card */}
                    <div className="glass" style={{
                        padding: '4rem 2rem',
                        borderRadius: '40px',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid rgba(212, 175, 55, 0.1)'
                    }}>
                        <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05 }}>
                            <Fingerprint size={300} color="var(--primary)" />
                        </div>

                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            style={{
                                position: 'absolute', top: '2rem', right: '2rem',
                                background: 'rgba(255,255,255,0.05)', border: 'none',
                                padding: '0.8rem', borderRadius: '15px', color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedDhikr}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                >
                                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-arabic)' }}>
                                        {activeDhikr.text}
                                    </div>
                                    <div style={{ fontSize: '1rem', color: 'white', opacity: 0.6, fontWeight: 'bold' }}>
                                        {activeDhikr.transliteration}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Circular Counter */}
                        <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto 4rem' }}>
                            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                <circle cx="120" cy="120" r="110" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                                <motion.circle
                                    cx="120" cy="120" r="110"
                                    stroke="var(--primary)"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray="691"
                                    animate={{ strokeDashoffset: 691 - (691 * (Math.min(progress, 100) / 100)) }}
                                    transition={{ duration: 0.5, type: 'spring' }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <motion.div key={count} initial={{ scale: 0.5 }} animate={{ scale: 1 }} style={{ fontSize: '5rem', fontWeight: '900', color: 'white', lineHeight: 1 }}>
                                    {count}
                                </motion.div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', marginTop: '0.5rem' }}>
                                    / {activeDhikr.count}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                            <motion.button
                                animate={controls}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleIncrement}
                                style={{
                                    width: '120px', height: '120px', borderRadius: '40px',
                                    background: 'linear-gradient(135deg, var(--primary) 0%, #b8962f 100%)',
                                    border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'black', cursor: 'pointer', boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)'
                                }}
                            >
                                <Fingerprint size={50} />
                            </motion.button>
                            <button onClick={() => setCount(0)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '20px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <RefreshCw size={16} /> {language === 'ku' ? 'سفرکردنەوە' : 'RESET'}
                            </button>
                        </div>
                    </div>

                    {/* Right Selection Bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                            <List size={20} />
                            <span style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.9rem' }}>
                                {language === 'ku' ? 'لیستی زیکرەکان' : 'DHIKR LIST'}
                            </span>
                        </div>
                        {currentDhirkers.map((d, i) => (
                            <motion.button
                                key={i}
                                onClick={() => { setSelectedDhikr(i); setCount(0); }}
                                whileHover={{ x: -5, background: 'rgba(212, 175, 55, 0.08)' }}
                                style={{
                                    padding: '1.2rem',
                                    borderRadius: '20px',
                                    background: selectedDhikr === i ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.02)',
                                    border: selectedDhikr === i ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    textAlign: language === 'ku' ? 'right' : 'left',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{
                                        fontSize: '1.2rem',
                                        fontFamily: 'var(--font-arabic)',
                                        color: selectedDhikr === i ? 'var(--primary)' : 'white',
                                        marginBottom: '0.2rem'
                                    }}>
                                        {d.text}
                                    </span>
                                    <span style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: 'bold' }}>
                                        {d.count} {language === 'ku' ? 'جار' : 'TIMES'}
                                    </span>
                                </div>
                                {selectedDhikr === i && (
                                    <motion.div layoutId="active-indicator">
                                        <CheckCircle2 size={18} color="var(--primary)" />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}

                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            borderRadius: '20px',
                            background: 'rgba(212, 175, 55, 0.03)',
                            border: '1px dashed rgba(212, 175, 55, 0.2)',
                            textAlign: 'center'
                        }}>
                            <Sparkles size={24} color="var(--primary)" style={{ marginBottom: '1rem', opacity: 0.3 }} />
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: '1.5' }}>
                                {language === 'ku'
                                    ? 'هەڵبژاردنی هەر زیکرێک ژمێرەرەکە سفر دەکاتەوە بۆ دەستپێکردنێکی نوێ.'
                                    : 'Selecting any dhikr will reset the counter for a fresh start.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tasbih;
