import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Calendar, Sunrise, Gamepad2, Heart, Quote, Trophy, Fingerprint, BookText, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import Hero from './Hero';
import { motion } from 'framer-motion';

const Home = ({ selectedCity, t, language }) => {
    const newestFeatures = [
        { path: '/khatam', labelKey: 'khatam_challenge', descKey: 'khatam_desc', icon: BookOpen, color: '#A855F7' },
        { path: '/calendar', labelKey: 'ramadan_calendar', descKey: 'desc_calendar', icon: Calendar, color: '#F59E0B' }
    ];

    const mainFeatures = [
        { path: '/prayers', labelKey: 'prayer_times', descKey: 'desc_prayers', icon: Sunrise, color: '#10B981' },
        { path: '/quran', labelKey: 'quran_explorer', descKey: 'desc_quran', icon: Quote, color: '#D4AF37' },
        { path: '/dua', labelKey: 'daily_dua', descKey: 'desc_dua', icon: Book, color: '#06B6D4' },
        { path: '/challenges', labelKey: 'challenges', descKey: 'desc_challenges', icon: Trophy, color: '#EF4444' },
        { path: '/names', labelKey: 'names_allah', descKey: 'desc_names', icon: Heart, color: '#EC4899' },
        { path: '/tasbih', labelKey: 'tasbih', descKey: 'desc_tasbih', icon: Fingerprint, color: '#D4AF37' },
        { path: '/journal', labelKey: 'journal', descKey: 'desc_journal', icon: BookText, color: '#6366F1' },
        { path: '/game', labelKey: 'quest', descKey: 'desc_quest', icon: Gamepad2, color: '#14B8A6' },
    ];

    const renderFeatureCard = (feature, idx) => (
        <Link to={feature.path} key={idx} style={{ textDecoration: 'none' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{
                    y: -15,
                    scale: 1.03,
                    rotateZ: 0.5,
                    borderColor: 'rgba(212, 175, 55, 0.4)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 30px rgba(212, 175, 55, 0.15)',
                    background: 'linear-gradient(135deg, rgba(40, 50, 70, 0.5) 0%, rgba(20, 30, 50, 0.7) 100%)'
                }}
                whileTap={{ scale: 0.94, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}
                style={{
                    padding: '3rem 2rem',
                    borderRadius: '35px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                    backdropFilter: 'blur(25px)',
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle, ${feature.color}15 0%, transparent 70%)`,
                    pointerEvents: 'none'
                }} />

                <div style={{
                    width: '70px', height: '70px',
                    borderRadius: '22px',
                    background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                    color: feature.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '0.5rem',
                    border: `1px solid ${feature.color}30`,
                    boxShadow: `0 10px 20px ${feature.color}10`
                }}>
                    <feature.icon size={32} />
                </div>
                <h3 style={{
                    fontSize: language === 'ku' ? '1.5rem' : '1.75rem',
                    fontWeight: '800',
                    color: 'white',
                    fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'var(--font-display)',
                    letterSpacing: language === 'ku' ? '0' : '-0.5px'
                }}>
                    {t[feature.labelKey]}
                </h3>
                <p style={{
                    color: 'var(--text-dim)',
                    lineHeight: '1.8',
                    fontSize: '1.05rem',
                    maxWidth: '260px',
                    fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'var(--font-body)'
                }}>
                    {t[feature.descKey]}
                </p>

                <div style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--primary)',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    {language === 'ku' ? 'زیاتر ببینە' : 'Explore'}
                    <ChevronRight size={16} />
                </div>
            </motion.div>
        </Link>
    );

    const renderNewestCard = (feature, idx) => (
        <Link to={feature.path} key={idx} style={{ textDecoration: 'none' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: `0 30px 60px ${feature.color}30`,
                    borderColor: feature.color
                }}
                whileTap={{ scale: 0.96 }}
                style={{
                    padding: '2rem',
                    borderRadius: '30px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    border: `1px solid ${feature.color}40`,
                    background: `linear-gradient(135deg, ${feature.color}15 0%, rgba(15, 23, 42, 0.8) 100%)`,
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                }}
            >
                {/* Badge */}
                <div style={{
                    position: 'absolute', top: '15px', right: language === 'ku' ? 'auto' : '15px', left: language === 'ku' ? '15px' : 'auto',
                    background: feature.color, padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold', color: 'white',
                    boxShadow: `0 0 15px ${feature.color}`
                }}>
                    NEW
                </div>

                <div style={{
                    width: '80px', height: '80px', flexShrink: 0,
                    borderRadius: '25px',
                    background: `linear-gradient(135deg, ${feature.color}30 0%, ${feature.color}10 100%)`,
                    color: feature.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${feature.color}40`,
                    boxShadow: `0 10px 30px ${feature.color}20`
                }}>
                    <feature.icon size={36} />
                </div>

                <div style={{ flex: 1, textAlign: language === 'ku' ? 'right' : 'left' }}>
                    <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '0.5rem',
                        fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'var(--font-display)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        {t[feature.labelKey]}
                    </h3>
                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: '1.6',
                        fontSize: '0.95rem',
                        fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'var(--font-body)'
                    }}>
                        {t[feature.descKey]}
                    </p>
                </div>

                <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%', padding: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: language === 'ku' ? 'rotate(180deg)' : 'none'
                }}>
                    <ChevronRight size={24} color="white" />
                </div>
            </motion.div>
        </Link>
    );

    return (
        <div>
            <Hero selectedCity={selectedCity} t={t} />

            <div className="container" style={{ padding: '4rem 2rem' }}>
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px', fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'var(--font-display)' }}>
                        <Sparkles color="var(--primary)" size={32} />
                        {language === 'ku' ? 'نوێترین' : 'The Newest'}
                    </h2>
                    <motion.div
                        layout
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', // Wider cards for newest
                            gap: '2rem'
                        }}
                    >
                        {newestFeatures.map(renderNewestCard)}
                    </motion.div>
                </div>

                <div>
                    <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px', fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'var(--font-display)' }}>
                        {language === 'ku' ? 'تایبەتمەندییەکان' : 'Explore Features'}
                    </h2>
                    <motion.div
                        layout
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '2.5rem'
                        }}
                    >
                        {mainFeatures.map(renderFeatureCard)}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;
