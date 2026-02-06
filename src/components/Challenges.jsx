import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Heart, Coffee, BookOpen, Clock, Sunrise } from 'lucide-react';

const challengePool = {
    en: [
        { id: 1, title: 'Morning Remembrance', desc: 'Recite morning Adhkar after Fajr.', icon: Sunrise, points: 50 },
        { id: 2, title: 'Digital Detox', desc: 'No social media for 2 hours before Iftar.', icon: Zap, points: 100 },
        { id: 3, title: 'Charitable Act', desc: 'Help someone today or give small Sadaqah.', icon: Heart, points: 150 },
        { id: 4, title: 'Sunnah Revival', desc: 'Break your fast with an odd number of dates.', icon: Coffee, points: 50 },
        { id: 5, title: 'Quran Deep Dive', desc: 'Read a translation of 5 verses you read today.', icon: BookOpen, points: 120 },
        { id: 6, title: 'Patience Test', desc: 'Avoid getting angry or complaining today.', icon: Clock, points: 200 },
    ],
    ku: [
        { id: 1, title: 'زیکری بەیانیان', desc: 'خوێندنی ئەزکارەکانی بەیانی لەدوای نوێژی بەیانی.', icon: Sunrise, points: 50 },
        { id: 2, title: 'دوورکەوتنەوە لە سۆشیاڵ', desc: 'بۆ ماوەی ٢ کاتژمێر پێش بەربانگ سۆشیاڵ مەدیا بەکارمەهێنە.', icon: Zap, points: 100 },
        { id: 3, title: 'کاری خێرخوازی', desc: 'یارمەتی کەسێک بدە یان سەدەقەیەکی بچووک بدە.', icon: Heart, points: 150 },
        { id: 4, title: 'زیندووکردنەوەی سوننەت', desc: 'بە ژمارەیەکی تاک لە خورما بەربانگ بکەرەوە.', icon: Coffee, points: 50 },
        { id: 5, title: 'قووڵبوونەوە لە قورئان', desc: 'مانای ٥ ئایەت بخوێنەرەوە کە ئەمڕۆ خوێندووتە.', icon: BookOpen, points: 120 },
        { id: 6, title: 'تاقیکردنەوەی ئارامی', desc: 'ئەمڕۆ توڕە مەبە و سکاڵا مەکە.', icon: Clock, points: 200 },
    ]
};

const Challenges = ({ t, language }) => {
    const [completed, setCompleted] = useState([]);
    const currentPool = challengePool[language] || challengePool['en'];

    const toggleChallenge = (id) => {
        if (completed.includes(id)) {
            setCompleted(completed.filter(item => item !== id));
        } else {
            setCompleted([...completed, id]);
        }
    };

    const totalPoints = currentPool
        ? currentPool.filter(c => completed.includes(c.id)).reduce((sum, c) => sum + c.points, 0)
        : 0;

    return (
        <section id="challenges" className="container" style={{ padding: '6rem 0' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '4rem',
                flexDirection: language === 'ku' ? 'row-reverse' : 'row'
            }}>
                <div style={{ textAlign: language === 'ku' ? 'right' : 'left' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.challenges}</h2>
                    <p style={{ color: 'var(--text-dim)' }}>{language === 'ku' ? 'کردەوەیەکی کەم، پاداشتێکی زۆر.' : 'Small deeds, big rewards.'}</p>
                </div>
                <div className="glass" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                    <Trophy color="var(--primary)" size={32} />
                    <div style={{ textAlign: language === 'ku' ? 'right' : 'left' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{t.points}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{totalPoints}</div>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {currentPool.map((c, i) => {
                    const isDone = completed.includes(c.id);
                    return (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => toggleChallenge(c.id)}
                            className="glass"
                            style={{
                                padding: '2rem',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                border: isDone ? '1px solid var(--accent)' : '1px solid var(--surface-border)',
                                background: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--surface)',
                                direction: language === 'ku' ? 'rtl' : 'ltr'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: isDone ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                    color: isDone ? 'white' : 'var(--primary)'
                                }}>
                                    <c.icon size={24} />
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        marginBottom: '0.5rem',
                                        color: isDone ? 'var(--accent)' : 'var(--text-white)',
                                        textDecoration: isDone ? 'line-through' : 'none'
                                    }}>
                                        {c.title}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                                        {c.desc}
                                    </p>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        background: isDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(212, 175, 55, 0.1)',
                                        color: isDone ? 'var(--accent)' : 'var(--primary)'
                                    }}>
                                        +{c.points} {t.xp}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Challenges;
