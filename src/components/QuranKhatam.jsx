import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Trophy, Star, BookMarked } from 'lucide-react';

const QuranKhatam = ({ t, language }) => {
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('quran_khatam_progress');
        return saved ? JSON.parse(saved) : {};
    });

    const prayers = [
        { id: 'fajr', labelKey: 'after_fajr' },
        { id: 'dhuhr', labelKey: 'after_dhuhr' },
        { id: 'asr', labelKey: 'after_asr' },
        { id: 'maghrib', labelKey: 'after_maghrib' },
        { id: 'isha', labelKey: 'after_isha' }
    ];

    useEffect(() => {
        localStorage.setItem('quran_khatam_progress', JSON.stringify(progress));
    }, [progress]);

    const togglePrayer = (day, prayerId) => {
        setProgress(prev => {
            const dayKey = `day_${day}`;
            const dayProgress = prev[dayKey] || [];
            if (dayProgress.includes(prayerId)) {
                return { ...prev, [dayKey]: dayProgress.filter(p => p !== prayerId) };
            } else {
                return { ...prev, [dayKey]: [...dayProgress, prayerId] };
            }
        });
    };

    const calculateOverallProgress = () => {
        let completed = 0;
        const total = 30 * 5;
        Object.values(progress).forEach(day => {
            completed += day.length;
        });
        return Math.round((completed / total) * 100);
    };

    const overallProgress = calculateOverallProgress();

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        width: '80px', height: '80px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid var(--primary)',
                        borderRadius: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: 'var(--primary)'
                    }}
                >
                    <BookOpen size={40} />
                </motion.div>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                    {t.khatam_challenge}
                </h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    {t.khatam_desc} • <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{t.khatam_strategy}</span>
                </p>
            </header>

            {/* Progress Overview Card */}
            <div className="glass" style={{ padding: '2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>{t.completion}</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{overallProgress}%</span>
                    </div>
                    <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${overallProgress}%` }}
                            style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 20px var(--primary-glow)' }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>604</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Total Pages</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>20</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Daily Pages</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>4</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Per Prayer</div>
                    </div>
                </div>
            </div>

            {/* Days Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem'
            }}>
                {[...Array(30)].map((_, i) => {
                    const day = i + 1;
                    const dayKey = `day_${day}`;
                    const completedInDay = progress[dayKey]?.length || 0;
                    const isDayComplete = completedInDay === 5;

                    return (
                        <motion.div
                            key={day}
                            whileHover={{ y: -5 }}
                            className="glass"
                            style={{
                                padding: '1.5rem',
                                border: isDayComplete ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                                background: isDayComplete ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)' : 'var(--surface)',
                                transition: 'all 0.3s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '12px',
                                        background: isDayComplete ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        color: isDayComplete ? 'black' : 'var(--text-dim)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        {day}
                                    </div>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{t.day} {day}</span>
                                </div>
                                {isDayComplete && <Trophy size={20} color="var(--primary)" />}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {prayers.map(prayer => {
                                    const isDone = progress[dayKey]?.includes(prayer.id);
                                    return (
                                        <button
                                            key={prayer.id}
                                            onClick={() => togglePrayer(day, prayer.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '0.8rem 1rem',
                                                borderRadius: '12px',
                                                background: isDone ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.02)',
                                                border: isDone ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                                                color: isDone ? 'white' : 'var(--text-dim)',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                transition: 'all 0.2s',
                                                width: '100%',
                                                fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'inherit'
                                            }}
                                        >
                                            <div style={{
                                                width: '24px', height: '24px',
                                                borderRadius: '6px',
                                                border: '2px solid',
                                                borderColor: isDone ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'var(--primary)',
                                                flexShrink: 0
                                            }}>
                                                {isDone && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={16} /></motion.div>}
                                            </div>
                                            <span style={{ flex: 1, fontSize: '0.95rem' }}>{t[prayer.labelKey]}</span>
                                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>4 pgs</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Daily Progress Bar */}
                            <div style={{ marginTop: '1.5rem', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                <motion.div
                                    animate={{ width: `${(completedInDay / 5) * 100}%` }}
                                    style={{ height: '100%', background: 'var(--primary)' }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Info Footer */}
            <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-dim)', opacity: 0.7 }}>
                <BookMarked size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p>Reading 20 pages a day completes the entire Quran (604 pages) in 30 days.</p>
                <p style={{ marginTop: '0.5rem' }}>May your effort be blessed.</p>
            </div>
        </div>
    );
};

export default QuranKhatam;
