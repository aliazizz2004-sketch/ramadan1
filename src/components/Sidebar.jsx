import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Sunrise, Calendar, Book, Quote, Trophy, Heart, Fingerprint, BookText, Gamepad2, ChevronRight, BookOpen } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, t, language }) => {
    const location = useLocation();
    const direction = language === 'ku' ? 'rtl' : 'ltr';

    const menuItems = [
        { path: '/', labelKey: 'home', icon: Home },
        { path: '/prayers', labelKey: 'prayer_times', icon: Sunrise },
        { path: '/calendar', labelKey: 'ramadan_calendar', icon: Calendar },
        { path: '/quran', labelKey: 'quran_explorer', icon: Quote },
        { path: '/khatam', labelKey: 'khatam_challenge', icon: BookOpen },
        { path: '/dua', labelKey: 'daily_dua', icon: Book },
        { path: '/challenges', labelKey: 'challenges', icon: Trophy },
        { path: '/names', labelKey: 'names_allah', icon: Heart },
        { path: '/tasbih', labelKey: 'tasbih', icon: Fingerprint },
        { path: '/journal', labelKey: 'journal', icon: BookText },
        { path: '/game', labelKey: 'quest', icon: Gamepad2 },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 2000
                        }}
                    />

                    {/* Sidebar Panel */}
                    <motion.div
                        initial={{ x: direction === 'rtl' ? '-100%' : '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: direction === 'rtl' ? '-100%' : '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: direction === 'ltr' ? 0 : 'auto',
                            left: direction === 'rtl' ? 0 : 'auto',
                            bottom: 0,
                            width: '320px',
                            maxWidth: '85vw',
                            background: 'var(--bg-card)', // deeper dark
                            borderLeft: direction === 'ltr' ? '1px solid var(--surface-border)' : 'none',
                            borderRight: direction === 'rtl' ? '1px solid var(--surface-border)' : 'none',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            zIndex: 2001,
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                            overflowY: 'auto',
                            direction: direction
                        }}
                    >
                        {/* Header of Sidebar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                                {t.title}
                            </h2>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-dim)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-dim)'; }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={onClose}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '1rem 1.2rem',
                                            borderRadius: '16px',
                                            textDecoration: 'none',
                                            background: isActive ? 'linear-gradient(90deg, rgba(212, 175, 55, 0.15), transparent)' : 'transparent',
                                            borderLeft: isActive && direction === 'ltr' ? '3px solid var(--primary)' : '3px solid transparent',
                                            borderRight: isActive && direction === 'rtl' ? '3px solid var(--primary)' : '3px solid transparent',
                                            color: isActive ? 'var(--primary)' : 'var(--text-dim)',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseOver={e => !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                                        onMouseOut={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                                    >
                                        <item.icon size={20} style={{ margin: direction === 'ltr' ? '0 1rem 0 0' : '0 0 0 1rem' }} />
                                        <span style={{
                                            fontSize: '1.1rem',
                                            fontWeight: isActive ? 'bold' : 'normal',
                                            flex: 1,
                                            fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'inherit'
                                        }}>
                                            {t[item.labelKey]}
                                        </span>
                                        {isActive && <ChevronRight size={16} style={{ transform: direction === 'rtl' ? 'rotate(180deg)' : 'none' }} />}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Footer decorative */}
                        <div style={{ marginTop: 'auto', paddingTop: '2rem', textAlign: 'center', opacity: 0.3 }}>
                            <div style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>☪</div>
                            <p style={{ fontSize: '0.8rem' }}>Ramadan Kareem</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
