import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Check, Moon, ChevronLeft,
    ChevronRight, Trophy, Star, X,
    Calendar, ArrowLeft, ArrowRight,
    Sparkles, Loader2, AlertCircle, Type, Book,
    Play, Pause, Volume2, Music, User, Settings,
    Headphones, RefreshCw, Layers, List
} from 'lucide-react';
import { surahInfo, surahAyahCounts } from './QuranExplorer';

const prayersData = [
    { id: 'fajr', labelKey: 'after_fajr', icon: '🌅', color: '#FF9B6A' },
    { id: 'dhuhr', labelKey: 'after_dhuhr', icon: '☀️', color: '#FFD700' },
    { id: 'asr', labelKey: 'after_asr', icon: '🕒', color: '#A0D8EF' },
    { id: 'maghrib', labelKey: 'after_maghrib', icon: '🌇', color: '#FF6B6B' },
    { id: 'isha', labelKey: 'after_isha', icon: '🌙', color: '#818CF8' }
];

const QuranViewer = ({ day, prayer, onClose, t, language, onComplete, currentPageIndex, setCurrentPageIndex }) => {
    const RECITERS = [
        { id: 7, name: 'Mishary Alafasy', nameKu: 'میشاری العفاسی', sub: 'Murattal' },
        { id: 1, name: 'AbdulBaset AbdulSamad', nameKu: 'عبدالباسط عبدالصمد', sub: 'Murattal' },
        { id: 5, name: 'Mahmoud Khalil Al-Husary', nameKu: 'محمود خلیل الحصری', sub: 'Murattal' },
        { id: 4, name: 'Mohamed Siddiq Al-Minshawi', nameKu: 'محمد صدیق المنشاوی', sub: 'Murattal' },
        { id: 3, name: 'Abdur-Rahman as-Sudais', nameKu: 'عبدالرحمن السدیس', sub: 'Murattal' }
    ];

    const [status, setStatus] = useState('loading');
    const [textData, setTextData] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [qariIdx, setQariIdx] = useState(0);
    const [showQariMenu, setShowQariMenu] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [viewMode, setViewMode] = useState('cinematic'); // 'cinematic' or 'book'
    const audioRef = useRef(null);
    const ayahRefs = useRef([]);
    const scrollContainerRef = useRef(null);

    const prayerIndex = prayersData.findIndex(p => p.id === prayer.id);
    const startPage = ((day - 1) * 20) + (prayerIndex * 4) + 1;

    const isLastPrayerOfKhatam = day === 30 && prayer.id === 'isha';
    const pages = isLastPrayerOfKhatam
        ? [startPage, startPage + 1, startPage + 2, startPage + 3, startPage + 4, startPage + 5, startPage + 6, startPage + 7, startPage + 8]
        : [startPage, startPage + 1, startPage + 2, startPage + 3];

    const currentActualPage = Math.min(pages[currentPageIndex], 604);
    const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
    const [fetchingPage, setFetchingPage] = useState(0);

    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;

        const handleEnded = () => {
            if (currentAyahIndex < textData.length - 1) {
                setCurrentAyahIndex(prev => prev + 1);
            } else {
                if (currentPageIndex < pages.length - 1) {
                    setCurrentPageIndex(p => p + 1);
                } else {
                    setIsPlaying(false);
                }
            }
        };

        // Add offset to sync highlighting with audio (positive = highlight earlier)
        const TIMING_OFFSET = 500; // Exact 0.5s ahead as requested

        const handleTimeUpdate = () => {
            // Add offset so highlighting appears slightly before the word is spoken
            setCurrentAudioTime((audio.currentTime * 1000) + TIMING_OFFSET);
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [currentAyahIndex, textData, currentPageIndex, pages.length]);

    // Auto-scroll to current playing ayah
    useEffect(() => {
        if (isPlaying && ayahRefs.current[currentAyahIndex]) {
            ayahRefs.current[currentAyahIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [currentAyahIndex, isPlaying]);

    useEffect(() => {
        if (isPlaying && textData[currentAyahIndex] && fetchingPage === currentActualPage) {
            const verse = textData[currentAyahIndex];
            // Use Quran.com audio URL from the API response for perfect sync
            if (verse.audio?.url) {
                audioRef.current.src = `https://audio.qurancdn.com/${verse.audio.url}`;
            } else {
                // Fallback to verses.quran.com audio
                audioRef.current.src = `https://verses.quran.com/${RECITERS[qariIdx].id}/${verse.verse_key.replace(':', '_')}.mp3`;
            }
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Playback error:", e);
                });
            }

            // Preload next ayah audio for seamless transition
            if (currentAyahIndex < textData.length - 1) {
                const nextVerse = textData[currentAyahIndex + 1];
                const preloadAudio = new Audio();
                if (nextVerse.audio?.url) {
                    preloadAudio.src = `https://audio.qurancdn.com/${nextVerse.audio.url}`;
                }
                preloadAudio.preload = 'auto';
            }
        }
    }, [currentAyahIndex, isPlaying, qariIdx, textData, fetchingPage, currentActualPage]);

    useEffect(() => {
        fetchText();
    }, [currentPageIndex, qariIdx]);

    const fetchText = async () => {
        setStatus('loading');
        setCurrentAyahIndex(0);
        if (audioRef.current) audioRef.current.pause();

        try {
            const response = await fetch(`https://api.quran.com/api/v4/verses/by_page/${currentActualPage}?fields=text_uthmani&words=true&word_fields=text_uthmani,char_type,position&audio=${RECITERS[qariIdx].id}&per_page=50`);
            const data = await response.json();
            if (data.verses) {
                setTextData(data.verses);
                setFetchingPage(currentActualPage);
                setStatus('text');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    const toggleAudio = () => {
        if (isPlaying) {
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setAudioError(false);
            setIsPlaying(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: viewMode === 'book' ? '#1a140f' : '#020617', display: 'flex', flexDirection: 'column', transition: '0.5s' }}
        >
            <audio
                ref={audioRef}
                onError={() => setAudioError(true)}
                preload="auto"
            />

            {/* Immersive Toolbar */}
            <div style={{
                padding: '1.2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: viewMode === 'book' ? 'rgba(44, 34, 24, 0.98)' : 'rgba(15, 23, 42, 0.98)',
                borderBottom: viewMode === 'book' ? '1px solid rgba(212, 175, 55, 0.1)' : '1px solid rgba(255,255,255,0.05)',
                zIndex: 100, backdropFilter: 'blur(20px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '12px', borderRadius: '15px', cursor: 'pointer', transition: '0.3s' }}>
                        <X size={22} />
                    </button>
                    <div>
                        <h2 style={{ fontSize: '1.1rem', color: 'var(--primary)', margin: 0, fontWeight: '700' }}>{t[prayer.label_key || prayer.labelKey]}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                            <Book size={12} />
                            <span>Page {currentActualPage}</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative' }}>
                    {/* View Mode Toggle */}
                    <button
                        onClick={() => setViewMode(viewMode === 'book' ? 'cinematic' : 'book')}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 15px', borderRadius: '14px', cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Settings size={18} color="var(--primary)" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                            {viewMode === 'book'
                                ? (language === 'ku' ? 'سینەمایی' : 'Cinematic')
                                : (language === 'ku' ? 'شێوازی کتێب' : 'Book Style')}
                        </span>
                    </button>

                    {/* Reciter Selector */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowQariMenu(!showQariMenu)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', transition: '0.3s' }}
                        >
                            <User size={16} color="var(--primary)" />
                            {language === 'ku' ? RECITERS[qariIdx].nameKu : RECITERS[qariIdx].name}
                        </button>
                        <AnimatePresence>
                            {showQariMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                                    style={{ position: 'absolute', top: '130%', right: '0', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '12px', width: '240px', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', zIndex: 110 }}
                                >
                                    {RECITERS.map((q, idx) => (
                                        <button
                                            key={q.id}
                                            onClick={() => { setQariIdx(idx); setShowQariMenu(false); }}
                                            style={{ width: '100%', padding: '12px 18px', background: qariIdx === idx ? 'var(--primary)' : 'transparent', border: 'none', borderRadius: '12px', color: qariIdx === idx ? 'black' : 'white', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '2px', transition: '0.2s', marginBottom: '4px' }}
                                        >
                                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{language === 'ku' ? q.nameKu : q.name}</span>
                                            <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{q.sub}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={toggleAudio}
                        style={{
                            background: isPlaying ? 'var(--primary)' : 'rgba(212, 175, 55, 0.1)',
                            border: `2px solid ${audioError ? '#ef4444' : 'var(--primary)'}`,
                            color: isPlaying ? 'black' : (audioError ? '#ef4444' : 'var(--primary)'),
                            padding: '10px 30px', borderRadius: '14px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                            fontWeight: '800', transition: '0.3s', minWidth: '140px', justifyContent: 'center'
                        }}
                    >
                        {audioError ? <RefreshCw size={20} /> : (isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="var(--primary)" />)}
                        {audioError ? (language === 'ku' ? 'دوبارە' : 'Retry') : (language === 'ku' ? (isPlaying ? 'ڕاگرتن' : 'گوێبگرە') : (isPlaying ? 'Pause' : 'Listen'))}
                    </button>

                    <button onClick={() => onComplete(day, prayer.id)} className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {language === 'ku' ? 'تەواو' : 'Finish'}
                    </button>
                </div>
            </div>

            {/* Reading Content */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: viewMode === 'book' ? '#1a140f' : '#000' }}>
                <div style={{
                    flex: 1, overflowY: 'auto',
                    padding: viewMode === 'book' ? '4rem 2rem 12rem' : '2rem 2rem 12rem',
                    display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
                    scrollBehavior: 'smooth'
                }}>
                    <AnimatePresence mode="wait">
                        {status === 'loading' ? (
                            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                                <Loader2 className="animate-spin" size={60} color="var(--primary)" />
                                <span style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '4px', fontWeight: 'bold' }}>SYNCHRONIZING SACRED TEXT</span>
                            </motion.div>
                        ) : status === 'error' ? (
                            <motion.div key="error" style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <AlertCircle size={80} color="#f43f5e" style={{ marginBottom: '2.5rem' }} />
                                <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1.5rem' }}>Network Issue Detected</h2>
                                <button onClick={fetchText} className="btn-primary" style={{ padding: '1.5rem 4rem', borderRadius: '20px', fontSize: '1.2rem' }}>Reconnect Now</button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    maxWidth: viewMode === 'book' ? '800px' : '950px',
                                    width: '100%',
                                    textAlign: 'center',
                                    direction: 'rtl',
                                    padding: viewMode === 'book' ? '5rem 4rem' : '0 2rem 15rem',
                                    marginTop: viewMode === 'book' ? '0' : '6rem',
                                    marginBottom: viewMode === 'book' ? '10rem' : '15rem',
                                    background: viewMode === 'book' ? 'linear-gradient(135deg, #fdfbf7 0%, #f5f1e5 100%)' : 'transparent',
                                    borderRadius: viewMode === 'book' ? '4px' : '0',
                                    boxShadow: viewMode === 'book'
                                        ? '0 40px 100px rgba(0,0,0,0.5), 0 6px 0 -2px #f5f1e5, 0 6px 1px -2px rgba(0,0,0,0.1), 0 12px 0 -4px #f5f1e5, 0 12px 1px -4px rgba(0,0,0,0.1), 0 18px 0 -6px #f5f1e5, 0 18px 1px -6px rgba(0,0,0,0.1)'
                                        : 'none',
                                    border: viewMode === 'book' ? '12px double #8b4513' : 'none',
                                    position: 'relative',
                                    transition: 'all 0.5s ease-in-out'
                                }}
                            >
                                {viewMode === 'book' && (
                                    <>
                                        <div style={{ position: 'absolute', top: '15px', left: '15px', width: '50px', height: '50px', borderTop: '4px solid #8b4513', borderLeft: '4px solid #8b4513', opacity: 0.8 }} />
                                        <div style={{ position: 'absolute', top: '15px', right: '15px', width: '50px', height: '50px', borderTop: '4px solid #8b4513', borderRight: '4px solid #8b4513', opacity: 0.8 }} />
                                        <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '50px', height: '50px', borderBottom: '4px solid #8b4513', borderLeft: '4px solid #8b4513', opacity: 0.8 }} />
                                        <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '50px', height: '50px', borderBottom: '4px solid #8b4513', borderRight: '4px solid #8b4513', opacity: 0.8 }} />
                                    </>
                                )}

                                {viewMode === 'cinematic' && (
                                    <div style={{ color: 'var(--primary)', opacity: 0.2, marginBottom: '5rem', fontSize: '2rem', letterSpacing: '10px' }}>بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
                                )}

                                <div style={{
                                    fontSize: viewMode === 'book' ? '1.8rem' : '2.5rem',
                                    lineHeight: viewMode === 'book' ? '4rem' : '5.5rem',
                                    color: viewMode === 'book' ? '#2c2218' : '#f8fafc',
                                    fontFamily: "'Amiri', serif",
                                    wordSpacing: viewMode === 'book' ? '4px' : '10px',
                                    padding: '0 1rem'
                                }}>
                                    {textData.map((v, idx) => {
                                        const isActive = isPlaying && currentAyahIndex === idx;
                                        return (
                                            <span
                                                key={v.id}
                                                onClick={() => { setCurrentAyahIndex(idx); setIsPlaying(true); }}
                                                ref={el => ayahRefs.current[idx] = el}
                                                style={{
                                                    display: 'inline',
                                                    margin: '0',
                                                    background: isActive ? (viewMode === 'book' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.08)') : 'transparent',
                                                    padding: viewMode === 'book' ? '2px 8px' : '0',
                                                    borderRadius: viewMode === 'book' ? '5px' : '25px',
                                                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    cursor: 'pointer',
                                                    border: isActive ? (viewMode === 'book' ? '1px solid #8b4513' : '1px solid rgba(212, 175, 55, 0.2)') : '1px solid transparent',
                                                    verticalAlign: 'middle'
                                                }}
                                            >
                                                <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: viewMode === 'book' ? '4px 6px' : '8px 12px' }}>
                                                    {v.words?.filter(word => word.char_type !== 'end' && word.char_type_name !== 'end').map((word) => {
                                                        const segments = v.audio?.segments || [];

                                                        // Get set of valid word positions from the text words (excluding end markers)
                                                        // We use the parent v.words to get the context of what "valid" means
                                                        const validPositions = new Set(
                                                            v.words
                                                                ?.filter(w => w.char_type !== 'end' && w.char_type_name !== 'end')
                                                                .map(w => w.position)
                                                        );

                                                        // Find which word should be active.
                                                        // Instead of strict start/end windows, we find the LATEST segment that has STARTED.
                                                        // This makes words "sticky" until the next valid word starts, solving the last-word-cutoff issue.
                                                        // Structure of segment from API: [word_index, word_position, start_time, end_time]
                                                        // We use index 1 (position) to match word.position
                                                        // We use index 2 (start_time) for timing

                                                        let activeWordPosition = null;

                                                        // Find segments that:
                                                        // 1. Match a valid word position (s[1])
                                                        // 2. Have started (s[2] <= currentAudioTime)
                                                        const startedSegments = segments.filter(s =>
                                                            validPositions.has(s[1]) && s[2] <= currentAudioTime
                                                        );

                                                        if (startedSegments.length > 0) {
                                                            // Pick the latest started segment
                                                            const currentSegment = startedSegments.reduce((prev, curr) =>
                                                                prev[2] > curr[2] ? prev : curr
                                                            );
                                                            activeWordPosition = currentSegment[1]; // Use position (index 1) to match word.position
                                                        }

                                                        const isWordActive = isActive && activeWordPosition === word.position;
                                                        return (
                                                            <motion.span
                                                                key={word.id}
                                                                animate={{
                                                                    scale: isWordActive ? 1.15 : 1,
                                                                    color: isWordActive
                                                                        ? (viewMode === 'book' ? '#8b4513' : '#FFF')
                                                                        : (isActive
                                                                            ? (viewMode === 'book' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.7)')
                                                                            : (viewMode === 'book' ? '#2c2218' : '#f8fafc'))
                                                                }}
                                                                style={{
                                                                    display: 'inline-block',
                                                                    textShadow: isWordActive ? `0 0 20px ${viewMode === 'book' ? 'rgba(139, 69, 19, 0.3)' : 'var(--primary)'}` : 'none',
                                                                    fontWeight: isWordActive ? '900' : 'normal',
                                                                    fontSize: viewMode === 'book' ? '1.8rem' : '2.5rem'
                                                                }}
                                                            >
                                                                {word.text_uthmani}
                                                            </motion.span>
                                                        );
                                                    })}
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        width: viewMode === 'book' ? '28px' : '36px',
                                                        height: viewMode === 'book' ? '28px' : '36px',
                                                        borderRadius: '50%',
                                                        border: `1.5px solid ${isActive ? '#8b4513' : (viewMode === 'book' ? '#d4af37' : 'rgba(212, 175, 55, 0.3)')}`,
                                                        fontSize: viewMode === 'book' ? '0.75rem' : '0.9rem',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        margin: viewMode === 'book' ? '0 6px' : '0 10px',
                                                        color: isActive ? '#8b4513' : (viewMode === 'book' ? '#8b4513' : 'rgba(212, 175, 55, 0.7)'),
                                                        fontWeight: 'bold',
                                                        position: 'relative',
                                                        top: viewMode === 'book' ? '0px' : '2px', // Adjusted for better baseline alignment
                                                        transition: '0.4s',
                                                        background: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                                        flexShrink: 0
                                                    }}>
                                                        {v.verse_key.split(':')[1]}
                                                    </span>
                                                </div>
                                            </span>
                                        );
                                    })}
                                </div>

                                {/* Page Footer for Book Mode */}
                                {viewMode === 'book' && (
                                    <div style={{
                                        marginTop: '5rem',
                                        paddingTop: '2rem',
                                        borderTop: '1px double rgba(139, 69, 19, 0.2)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '12px',
                                        opacity: 0.7
                                    }}>
                                        <div style={{
                                            width: '50px', height: '50px', borderRadius: '50%', border: '1px solid #8b4513',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.1rem', fontWeight: '900', color: '#8b4513',
                                            background: 'rgba(139, 69, 19, 0.03)'
                                        }}>
                                            {currentActualPage}
                                        </div>
                                        <div style={{ width: '100px', height: '1px', background: 'linear-gradient(90deg, transparent, #8b4513, transparent)', opacity: 0.3 }} />
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Cinematic Navigation */}
            <div style={{
                padding: '2.5rem 2rem', background: viewMode === 'book' ? 'rgba(26, 20, 15, 0.95)' : 'linear-gradient(to top, #080c14, transparent)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6rem',
                position: 'relative', zIndex: 10
            }}>
                <button
                    disabled={currentPageIndex === 0}
                    onClick={() => setCurrentPageIndex(p => p - 1)}
                    style={{
                        background: currentPageIndex === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(212, 175, 55, 0.1)',
                        border: `1px solid ${currentPageIndex === 0 ? 'rgba(255,255,255,0.05)' : 'var(--primary)'}`,
                        color: currentPageIndex === 0 ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        cursor: currentPageIndex === 0 ? 'not-allowed' : 'pointer',
                        transition: '0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.95rem',
                        fontWeight: '700'
                    }}
                >
                    <ArrowRight size={20} />
                    <span>پەڕەی پێشوو</span>
                </button>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {pages.map((page, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPageIndex(i)}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: currentPageIndex === i ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                border: currentPageIndex === i ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                color: currentPageIndex === i ? '#000' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: currentPageIndex === i ? '0 0 20px var(--primary)' : 'none',
                                fontSize: '1rem',
                                fontWeight: currentPageIndex === i ? '800' : '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {Math.min(page, 604)}
                        </button>
                    ))}
                </div>

                <button
                    disabled={currentPageIndex === pages.length - 1}
                    onClick={() => setCurrentPageIndex(p => p + 1)}
                    style={{
                        background: currentPageIndex === pages.length - 1 ? 'rgba(255,255,255,0.02)' : 'rgba(212, 175, 55, 0.1)',
                        border: `1px solid ${currentPageIndex === pages.length - 1 ? 'rgba(255,255,255,0.05)' : 'var(--primary)'}`,
                        color: currentPageIndex === pages.length - 1 ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        cursor: currentPageIndex === pages.length - 1 ? 'not-allowed' : 'pointer',
                        transition: '0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.95rem',
                        fontWeight: '700'
                    }}
                >
                    <span>پەڕەی دواتر</span>
                    <ArrowLeft size={20} />
                </button>
            </div>
            {textData.length > 0 && (
                <div style={{
                    position: 'fixed',
                    right: '20px',
                    top: '55%',
                    transform: 'translateY(-50%)',
                    background: viewMode === 'book' ? 'rgba(44, 34, 24, 0.95)' : 'rgba(15, 23, 42, 0.95)',
                    padding: '1.5rem',
                    borderRadius: '24px',
                    border: viewMode === 'book' ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 50,
                    width: 'auto',
                    minWidth: '180px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.2rem',
                    animation: 'fadeIn 0.5s ease-out'
                }}>
                    {(() => {
                        const surahId = parseInt(textData[0]?.verse_key.split(':')[0]);
                        const surah = surahInfo.find(s => s.id === surahId);
                        const startAyah = textData[0]?.verse_number;
                        const endAyah = textData[textData.length - 1]?.verse_number;
                        const totalAyahs = surahAyahCounts[surahId];

                        return (
                            <>
                                <div style={{ textAlign: 'center', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.3rem' }}>Surah</div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'Amiri, serif', lineHeight: 1.2 }}>
                                        {language === 'ku' ? surah?.name?.ku : surah?.name?.en}
                                    </div>
                                    <div style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.2rem', fontFamily: 'Lateef, cursive' }}>{surah?.arabic}</div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.7 }}>
                                            <Book size={16} />
                                            <span style={{ fontSize: '0.9rem' }}>Juz</span>
                                        </div>
                                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{textData[0]?.juz_number}</span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.7 }}>
                                            <Layers size={16} />
                                            <span style={{ fontSize: '0.9rem' }}>Page</span>
                                        </div>
                                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{currentActualPage}</span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.7 }}>
                                            <List size={16} />
                                            <span style={{ fontSize: '0.9rem' }}>Ayahs</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{startAyah}-{endAyah}</div>
                                            <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>of {totalAyahs}</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}
        </motion.div>
    );
};

const QuranKhatam = ({ t, language }) => {
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('q_khatam_final_v8_stable');
        return saved ? JSON.parse(saved) : {};
    });
    const [selectedDay, setSelectedDay] = useState(null);
    const [viewingPrayer, setViewingPrayer] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [celebratedDay, setCelebratedDay] = useState(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    useEffect(() => {
        localStorage.setItem('q_khatam_final_v8_stable', JSON.stringify(progress));
    }, [progress]);

    const handleTogglePrayer = (day, prayerId) => {
        setProgress(prev => {
            const dayKey = `day_${day}`;
            const dayProgress = prev[dayKey] || [];
            if (!dayProgress.includes(prayerId)) {
                const newDayProgress = [...dayProgress, prayerId];
                if (newDayProgress.length === 5) {
                    setCelebratedDay(day);
                    setShowCelebration(true);
                }
                return { ...prev, [dayKey]: newDayProgress };
            }
            return prev;
        });
        setViewingPrayer(null);
    };

    const overallProgress = () => {
        let completed = 0;
        Object.values(progress).forEach(day => completed += day.length);
        return Math.min(Math.round((completed / 150) * 100), 100);
    };

    return (
        <div style={{ minHeight: '100vh', padding: '2rem', background: '#020617' }}>
            <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ marginBottom: '3rem' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <BookOpen size={85} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 25px var(--primary-glow))' }} />
                        <motion.div animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', top: -10, right: -10 }}><Sparkles color="var(--primary)" size={30} /></motion.div>
                    </div>
                </motion.div>

                <h1 style={{ fontSize: '4.5rem', fontWeight: '1000', color: 'white', letterSpacing: '-3px', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>{t.khatam_challenge}</h1>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '1000', color: 'var(--primary)', textShadow: '0 0 40px var(--primary-glow)', lineHeight: 1 }}>{overallProgress()}%</div>
                    <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>{t.total_completion}</div>
                </div>

                <div style={{ maxWidth: '800px', margin: '4rem auto 0', height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${overallProgress()}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ height: '100%', background: 'linear-gradient(90deg, transparent, var(--primary))', boxShadow: '0 0 30px var(--primary)' }} />
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                {[...Array(30)].map((_, i) => {
                    const day = i + 1;
                    const doneCount = progress[`day_${day}`]?.length || 0;
                    const isComplete = doneCount === 5;
                    return (
                        <motion.button
                            key={day} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.01 }} whileHover={{ y: -12, scale: 1.05 }} onClick={() => setSelectedDay(day)}
                            style={{
                                width: '100%', aspectRatio: '1',
                                background: isComplete ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)' : 'rgba(30, 41, 59, 0.4)',
                                border: isComplete ? '3px solid var(--primary)' : '1px solid rgba(255,255,255,0.04)',
                                borderRadius: '35px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: isComplete ? '0 20px 40px rgba(212, 175, 55, 0.15)' : 'none'
                            }}
                        >
                            <span style={{ fontSize: '0.85rem', color: isComplete ? 'var(--primary)' : 'rgba(255,255,255,0.3)', fontWeight: '900', letterSpacing: '1px' }}>{t.day}</span>
                            <span style={{ fontSize: '3.5rem', fontWeight: '1000', color: 'white', lineHeight: 1.1 }}>{day}</span>
                            <div style={{ marginTop: '1.2rem', display: 'flex', gap: '6px' }}>
                                {[...Array(5)].map((_, idx) => (
                                    <div key={idx} style={{
                                        width: '7px', height: '7px', borderRadius: '50%',
                                        background: idx < doneCount ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                        boxShadow: idx < doneCount ? '0 0 12px var(--primary)' : 'none'
                                    }} />
                                ))}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedDay && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(2, 6, 23, 0.99)', backdropFilter: 'blur(60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                        <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} style={{ width: '100%', maxWidth: '600px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '55px', padding: '2.5rem 3rem', border: '1.5px solid rgba(255,255,255,0.06)', position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
                            <button onClick={() => setSelectedDay(null)} style={{ position: 'absolute', top: '2.5rem', right: '2.5rem', background: 'rgba(255,255,255,0.04)', border: 'none', color: 'white', padding: '16px', borderRadius: '50%', cursor: 'pointer', transition: '0.3s', zIndex: 50 }}><X size={26} /></button>
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <motion.h1 animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 4 }} style={{ fontSize: '5.5rem', fontWeight: '1000', color: 'white', lineHeight: 0.9 }}>{selectedDay}</motion.h1>
                                <p style={{ color: 'var(--primary)', letterSpacing: language === 'ku' ? '0' : '8px', fontSize: language === 'ku' ? '2.2rem' : '1.4rem', fontWeight: '900', textTransform: 'uppercase', marginTop: '1.5rem', fontFamily: language === 'ku' ? 'var(--font-display), "Noto Kufi Arabic", sans-serif' : 'inherit', lineHeight: 1.5 }}>
                                    {language === 'ku' ? 'چاڵنجی ڕەمەزان' : 'Ramadan Challenge'}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {prayersData.map((prayer) => {
                                    const isDone = progress[`day_${selectedDay}`]?.includes(prayer.id);
                                    return (
                                        <motion.button
                                            key={prayer.id} whileHover={{ x: 15, background: 'rgba(255,255,255,0.03)' }}
                                            onClick={() => { setViewingPrayer(prayer); setCurrentPageIndex(0); }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 2rem', borderRadius: '25px',
                                                background: isDone ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.02)',
                                                border: isDone ? '2.5px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                                                color: 'white', cursor: 'pointer', textAlign: 'left', width: '100%', transition: '0.4s'
                                            }}
                                        >
                                            <span style={{ fontSize: '2.8rem' }}>{prayer.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>{t[prayer.label_key || prayer.labelKey]}</h3>
                                                <p style={{ margin: '0.4rem 0 0', fontSize: '1rem', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>
                                                    {language === 'ku' ? '٤ پەڕەی پیرۆز' : '4 Sacred Pages'}
                                                </p>
                                            </div>
                                            {isDone ? <Check size={32} color="var(--primary)" strokeWidth={4} /> : <ArrowRight size={28} opacity={0.3} />}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {viewingPrayer && (
                    <QuranViewer
                        day={selectedDay} prayer={viewingPrayer} onClose={() => setViewingPrayer(null)}
                        t={t} language={language} onComplete={handleTogglePrayer}
                        currentPageIndex={currentPageIndex} setCurrentPageIndex={setCurrentPageIndex}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCelebration && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.99)', backdropFilter: 'blur(70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                            <div style={{ width: '240px', height: '240px', background: 'var(--primary)', borderRadius: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4rem', boxShadow: '0 0 140px var(--primary-glow)' }}>
                                <Trophy size={130} color="#000" />
                            </div>
                            <h2 style={{ fontSize: '6rem', fontWeight: '1000', color: 'transparent', background: 'linear-gradient(to bottom, #fff, #d4af37)', WebkitBackgroundClip: 'text', letterSpacing: '-2px', fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
                                {language === 'ku' ? 'پیرۆزە!' : 'MashaAllah!'}
                            </h2>
                            <p style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: '1rem 0', fontWeight: '900', fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
                                {language === 'ku' ? `چاڵنجی ڕۆژی ${celebratedDay} تەواو بوو!` : `Day ${celebratedDay} Complete!`}
                            </p>
                            <button onClick={() => setShowCelebration(false)} className="btn-primary" style={{ padding: '1.5rem 6rem', fontSize: '1.8rem', borderRadius: '30px', marginTop: '3rem', fontWeight: '1000', boxShadow: '0 20px 50px rgba(212, 175, 55, 0.25)', fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
                                {language === 'ku' ? 'بەردەوام بە' : 'Continue'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuranKhatam;
