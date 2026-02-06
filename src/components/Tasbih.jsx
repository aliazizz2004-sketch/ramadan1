import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RefreshCw, Plus, Fingerprint } from 'lucide-react';

const dhikrPool = {
    en: [
        { text: "سُبْحَانَ اللَّهِ", count: 33 },
        { text: "الْحَمْدُ لِلَّهِ", count: 33 },
        { text: "اللَّهُ أَكْبَرُ", count: 34 },
        { text: "لَا إِلَهَ إِلَّا اللَّهُ", count: 100 },
    ],
    ku: [
        { text: "سُبْحَانَ اللَّهِ", count: 33 },
        { text: "الْحَمْدُ لِلَّهِ", count: 33 },
        { text: "اللَّهُ أَكْبەرُ", count: 34 },
        { text: "لَا إِلَهَ إِلَّا اللَّهُ", count: 100 },
    ]
};

const Tasbih = ({ t, language }) => {
    const [count, setCount] = useState(0);
    const [selectedDhikr, setSelectedDhikr] = useState(0);
    const controls = useAnimation();

    const currentDhirkers = dhikrPool[language] || dhikrPool['en'];

    const handleIncrement = async () => {
        setCount(prev => prev + 1);
        await controls.start({
            scale: [1, 0.9, 1],
            transition: { duration: 0.1 }
        });
    };

    const resetCount = () => {
        setCount(0);
    };

    const progress = (count / currentDhirkers[selectedDhikr].count) * 100;

    return (
        <section id="tasbih" className="container" style={{ padding: '6rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.tasbih}</h2>
                <p style={{ color: 'var(--text-dim)' }}>{language === 'ku' ? 'هاوکارێک بۆ زیکر و یادی خودای گەورە لە هەموو کاتێکدا.' : 'A companion for your daily dhikr and remembrance.'}</p>
            </div>

            <div className="glass" style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '3rem',
                textAlign: 'center',
                position: 'relative',
                direction: language === 'ku' ? 'rtl' : 'ltr'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {currentDhirkers.map((d, i) => (
                        <button
                            key={i}
                            onClick={() => { setSelectedDhikr(i); setCount(0); }}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '10px',
                                border: '1px solid var(--surface-border)',
                                background: selectedDhikr === i ? 'var(--primary)' : 'transparent',
                                color: selectedDhikr === i ? 'var(--bg-dark)' : 'var(--text-white)',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {d.text}
                        </button>
                    ))}
                </div>

                <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 3rem' }}>
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        <circle
                            cx="110" cy="110" r="100"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="8"
                            fill="transparent"
                        />
                        <motion.circle
                            cx="110" cy="110" r="100"
                            stroke="var(--primary)"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray="628"
                            animate={{ strokeDashoffset: 628 - (628 * (Math.min(progress, 100) / 100)) }}
                            transition={{ duration: 0.3 }}
                            strokeLinecap="round"
                        />
                    </svg>

                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary)' }}>{count}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                            {language === 'ku' ? 'لە کۆی' : 'of'} {currentDhirkers[selectedDhikr].count}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <motion.button
                        animate={controls}
                        onClick={handleIncrement}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'linear-gradient(145deg, var(--primary), #b8962f)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--bg-dark)',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px var(--primary-glow)',
                        }}
                    >
                        <Fingerprint size={48} />
                    </motion.button>

                    <button
                        onClick={resetCount}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--surface)',
                            border: '1px solid var(--surface-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-white)',
                            cursor: 'pointer',
                            marginTop: 'auto'
                        }}
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Tasbih;
