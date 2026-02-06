import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Star, Book, CheckSquare, Gamepad2, Sunrise, Trophy, Fingerprint, Landmark, Quote, Heart, BookText, Languages, Calendar } from 'lucide-react';
const Header = ({ language, setLanguage, t, onMenuClick }) => {
    return (
        <header className="glass" style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            zIndex: 1000,
            padding: '0.75rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            direction: 'ltr'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <Moon fill="var(--primary)" color="var(--primary)" size={24} />
                    <span style={{
                        fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: 'var(--primary)',
                        letterSpacing: '1px'
                    }}>
                        {t.title}
                    </span>
                </Link>

                {/* Language Switcher */}
                <button
                    onClick={() => setLanguage(language === 'en' ? 'ku' : 'en')}
                    style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid var(--primary-glow)',
                        color: 'var(--primary)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        fontFamily: 'var(--font-kurdish)'
                    }}
                >
                    <Languages size={16} />
                    {language === 'en' ? 'کوردی' : 'English'}
                </button>
            </div>

            {/* Desktop Nav */}
            <nav className="desktop-nav" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <Link to="/" className="nav-link" title="Home"><Star size={18} /></Link>
                <Link to="/prayers" className="nav-link" title="Prayer Times"><Sunrise size={18} /></Link>
                <Link to="/calendar" className="nav-link" title="Ramadan Schedule"><Calendar size={18} /></Link>
                <Link to="/dua" className="nav-link" title="Daily Dua"><Book size={18} /></Link>
                <Link to="/quran" className="nav-link" title="Quran Explorer"><Quote size={18} /></Link>
                <Link to="/challenges" className="nav-link" title="Challenges"><Trophy size={18} /></Link>
                <Link to="/names" className="nav-link" title="Names of Allah"><Heart size={18} /></Link>
                <Link to="/tasbih" className="nav-link" title="Tasbih"><Fingerprint size={18} /></Link>
                <Link to="/journal" className="nav-link" title="Journal"><BookText size={18} /></Link>
                <Link to="/game" className="nav-link" title="Iman Quest"><Gamepad2 size={18} /></Link>
            </nav>

            {/* Mobile/Menu Button */}
            <button
                className="menu-btn"
                onClick={onMenuClick}
                style={{
                    display: 'none', // Shown via media query
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    cursor: 'pointer'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            <style>{`
                .nav-link {
                    color: var(--text-dim);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                }
                .nav-link:hover {
                    color: var(--primary);
                    transform: translateY(-2px);
                }
                @media (max-width: 1024px) {
                    .desktop-nav { display: none !important; }
                    .menu-btn { display: block !important; }
                }
            `}</style>
        </header>
    );
};

export default Header;
