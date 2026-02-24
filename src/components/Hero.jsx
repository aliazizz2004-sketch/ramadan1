import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ramadanDuas } from '../data/ramadanDuas';

const cityIftarTimes = {
    'Erbil': '18:12:00',
    'Sulaymaniyah': '18:07:00',
    'Duhok': '18:15:00',
    'Halabja': '18:06:00'
};

const Hero = ({ selectedCity, t }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const getCityName = (cityId) => {
        const cityMap = {
            'Erbil': 'city_erbil',
            'Sulaymaniyah': 'city_sulaymaniyah',
            'Duhok': 'city_duhok',
            'Halabja': 'city_halabja'
        };
        return t[cityMap[cityId]] || cityId;
    };

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const iftarTimeStr = cityIftarTimes[selectedCity];
            const [h, m, s] = iftarTimeStr.split(':');

            let target = new Date();
            target.setHours(parseInt(h), parseInt(m), parseInt(s));

            if (now > target) {
                target.setDate(target.getDate() + 1);
            }

            const diff = target - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({ hours, minutes, seconds });
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [selectedCity]);

    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* High-End Brand Watermark Layer */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                opacity: 0.15
            }}>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    style={{
                        fontSize: 'clamp(10rem, 30vw, 30rem)',
                        fontWeight: '900',
                        margin: 0,
                        lineHeight: '0.8',
                        fontFamily: 'var(--font-display)',
                        WebkitTextStroke: '1px rgba(212, 175, 55, 0.3)',
                        color: 'transparent',
                        letterSpacing: '20px',
                        textAlign: 'center'
                    }}
                >
                    RAMADAN
                </motion.h2>
                <div style={{
                    fontFamily: "'Aref Ruqaa', serif",
                    fontSize: 'clamp(5rem, 15vw, 15rem)',
                    color: 'var(--primary)',
                    marginTop: '-5%',
                    opacity: 0.2
                }}>
                    كريم
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <div style={{
                    fontSize: '1rem',
                    color: 'var(--primary)',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    fontWeight: 'bold'
                }}>
                    {t.current_city} {getCityName(selectedCity)}
                </div>

                <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', marginBottom: '1rem', lineHeight: '1' }}>{t.title}</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '600px', margin: '0 auto 4rem' }}>
                    {t.hero_subtitle}
                </p>
            </motion.div>

            <div style={{ display: 'flex', gap: 'clamp(1rem, 4vw, 2.5rem)', marginBottom: '4rem' }}>
                {[
                    { label: t.hours, value: timeLeft.hours },
                    { label: t.minutes, value: timeLeft.minutes },
                    { label: t.seconds, value: timeLeft.seconds }
                ].map((unit, i) => (
                    <motion.div
                        key={unit.label}
                        className="glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        style={{
                            padding: 'clamp(1rem, 3vw, 2rem)',
                            minWidth: 'clamp(80px, 15vw, 140px)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            border: '1px solid var(--primary-glow)'
                        }}
                    >
                        <div style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: 'bold', color: 'var(--primary)' }}>
                            {String(unit.value).padStart(2, '0')}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.5rem' }}>
                            {unit.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '2px', marginBottom: '3rem' }}
            >
                {t.countdown_iftar} {getCityName(selectedCity).toUpperCase()}
            </motion.div>

            {/* Important Ramadan Dua Section */}
            {(() => {
                const now = new Date();
                const month = now.getMonth(); // 0-indexed, Jan = 0, Feb = 1, Mar = 2
                const date = now.getDate();

                let duaIndex = (date - 1) % 30; // Default rotation

                // Specific logic for Ramadan 2026 (Starting around March 1st)
                if (month === 2) { // March
                    duaIndex = Math.min(date - 1, 29);
                } else if (month === 3 && date <= 1) { // April 1st might still be Ramadan/Eid
                    duaIndex = 29;
                }

                const currentDua = ramadanDuas[duaIndex] || ramadanDuas[30];

                return (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        style={{
                            maxWidth: '800px',
                            padding: '2.5rem',
                            borderRadius: '30px',
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%)',
                            border: '1px solid rgba(212, 175, 55, 0.1)',
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        <div style={{
                            fontFamily: "'Amiri', serif",
                            fontSize: '2rem',
                            color: 'white',
                            marginBottom: '1rem',
                            direction: 'rtl',
                            lineHeight: '1.6'
                        }}>
                            {currentDua.arabic}
                        </div>
                        <div style={{
                            color: 'var(--primary)',
                            fontSize: '1.2rem',
                            fontWeight: '500',
                            fontFamily: 'var(--font-kurdish)',
                            opacity: 0.9,
                            lineHeight: '1.6'
                        }}>
                            "{currentDua.ku}"
                        </div>
                        <div style={{
                            marginTop: '1.5rem',
                            fontSize: '0.75rem',
                            color: 'rgba(255,255,255,0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '3px'
                        }}>
                            {t.daily_dua} - {language === 'ku' ? `ڕۆژی ${duaIndex + 1}` : `Day ${duaIndex + 1}`}
                        </div>
                    </motion.div>
                );
            })()}
        </section>
    );
};

export default Hero;
