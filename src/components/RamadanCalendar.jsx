import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronRight, ChevronLeft, Star, Clock } from 'lucide-react';

const RamadanCalendar = ({ t, language, selectedCity }) => {
    const [fastedDays, setFastedDays] = useState([]);
    const [viewDay, setViewDay] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('ramadan_fasting_tracker');
        if (saved) setFastedDays(JSON.parse(saved));
    }, []);

    const toggleFast = (day) => {
        const updated = fastedDays.includes(day)
            ? fastedDays.filter(d => d !== day)
            : [...fastedDays, day];
        setFastedDays(updated);
        localStorage.setItem('ramadan_fasting_tracker', JSON.stringify(updated));
    };

    const cities = {
        'Erbil': { name: 'هەولێر', offset: 0 },
        'Sulaymaniyah': { name: 'سلێمانی', offset: -8 },
        'Duhok': { name: 'دهۆک', offset: 3 },
        'Halabja': { name: 'هەڵەبجە', offset: -10 }
    };

    const erbilBaseTimes = {
        fajr: '05:43',
        dhuhr: '12:26',
        asr: '15:14',
        maghrib: '17:40',
        isha: '18:55'
    };

    const getDayTimes = (day) => {
        const cityData = cities[selectedCity] || cities['Erbil'];

        // Base calculation starting from Feb 5, 2026
        // Ramadan starts roughly Feb 18.
        // We'll calculate the offset from Feb 5 to the specific day of Ramadan.
        const ramadanStartDayOffset = 13; // 13 days from Feb 5 to Feb 18
        const totalDaysFromBase = ramadanStartDayOffset + (day - 1);

        const adjustTime = (baseTimeStr, cityOffset, dayShiftPerDay) => {
            const [h, m] = baseTimeStr.split(':').map(Number);
            const date = new Date();
            date.setHours(h, m + cityOffset + (totalDaysFromBase * dayShiftPerDay), 0);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        };

        return {
            fajr: adjustTime(erbilBaseTimes.fajr, cityData.offset, -1),
            dhuhr: adjustTime(erbilBaseTimes.dhuhr, cityData.offset, 0),
            asr: adjustTime(erbilBaseTimes.asr, cityData.offset, 1),
            maghrib: adjustTime(erbilBaseTimes.maghrib, cityData.offset, 1.2),
            isha: adjustTime(erbilBaseTimes.isha, cityData.offset, 1.2)
        };
    };

    const totalPoints = fastedDays.length * 100;

    return (
        <section id="calendar" className="container" style={{ padding: '6rem 0' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '4rem',
                flexDirection: language === 'ku' ? 'row-reverse' : 'row'
            }}>
                <div style={{ textAlign: language === 'ku' ? 'right' : 'left' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.ramadan_calendar}</h2>
                    <p style={{ color: 'var(--text-dim)' }}>{t.fast_tracker_game}</p>
                </div>
                <div className="glass" style={{ padding: '1.5rem 2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                    <Star color="var(--primary)" size={40} fill="var(--primary)" style={{ filter: 'drop-shadow(0 0 10px var(--primary-glow))' }} />
                    <div style={{ textAlign: language === 'ku' ? 'right' : 'left' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px' }}>{language === 'ku' ? 'کۆی خاڵەکان' : 'Total Iman Points'}</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{totalPoints}</div>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '1rem',
                direction: language === 'ku' ? 'rtl' : 'ltr'
            }}>
                {Array.from({ length: 30 }, (_, i) => {
                    const day = i + 1;
                    const isFasted = fastedDays.includes(day);
                    return (
                        <motion.div
                            key={day}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setViewDay(day)}
                            className="glass"
                            style={{
                                padding: '1.5rem',
                                cursor: 'pointer',
                                textAlign: 'center',
                                position: 'relative',
                                border: isFasted ? '2px solid var(--accent)' : '1px solid var(--surface-border)',
                                background: isFasted ? 'rgba(16, 185, 129, 0.05)' : 'var(--surface)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>{t.day}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isFasted ? 'var(--accent)' : 'white' }}>{day}</div>
                            {isFasted && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginTop: '0.5rem', color: 'var(--accent)' }}>
                                    <CheckCircle2 size={24} style={{ margin: '0 auto' }} />
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Day Details Modal */}
            <AnimatePresence>
                {viewDay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(2, 6, 23, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 3000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setViewDay(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass"
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                padding: '3rem',
                                position: 'relative',
                                direction: language === 'ku' ? 'rtl' : 'ltr'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t.day} {viewDay}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: '600' }}>{language === 'ku' ? 'خشتەی کاتژمێرەکان' : 'Daily Schedule'}</p>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                                {Object.entries(getDayTimes(viewDay)).map(([key, time]) => (
                                    <div key={key} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '12px',
                                        border: '1px solid var(--surface-border)',
                                        alignItems: 'center',
                                        flexDirection: language === 'ku' ? 'row-reverse' : 'row'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                                            <Clock size={18} color="var(--primary)" />
                                            <span style={{ fontWeight: '500', color: 'var(--text-white)' }}>{t[key]}</span>
                                        </div>
                                        <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>{time}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => toggleFast(viewDay)}
                                className={fastedDays.includes(viewDay) ? "btn-secondary" : "btn-primary"}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    background: fastedDays.includes(viewDay) ? 'rgba(16, 185, 129, 0.2)' : 'var(--primary)',
                                    borderColor: fastedDays.includes(viewDay) ? 'var(--accent)' : 'var(--primary)',
                                    color: fastedDays.includes(viewDay) ? 'var(--accent)' : 'var(--bg-dark)'
                                }}
                            >
                                {fastedDays.includes(viewDay) ? (
                                    <>
                                        <CheckCircle2 size={24} />
                                        {language === 'ku' ? 'ڕۆژووت تۆمارکراوە' : 'Fasting Completed'}
                                    </>
                                ) : (
                                    <>
                                        <Star size={24} />
                                        {t.mark_as_fasted} (+100 {t.xp})
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setViewDay(null)}
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-dim)',
                                    marginTop: '1.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {language === 'ku' ? 'داخستن' : 'Close'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default RamadanCalendar;
