import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookText, Save, History, Sparkles } from 'lucide-react';

const Journal = ({ t, language }) => {
    const [entry, setEntry] = useState('');
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('ramadan_journal_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const saveEntry = () => {
        if (!entry.trim()) return;
        const newEntry = {
            id: Date.now(),
            text: entry,
            date: new Date().toLocaleDateString(language === 'ku' ? 'ku-IQ' : 'en-GB', { day: 'numeric', month: 'long' })
        };
        const updatedHistory = [newEntry, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('ramadan_journal_history', JSON.stringify(updatedHistory));
        setEntry('');
        alert(language === 'ku' ? 'بیرەوەرییەکە تۆمارکرا لە مۆبایلەکەتدا.' : 'Reflection saved to your local storage.');
    };

    return (
        <section id="journal" className="container" style={{ padding: '6rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.journal}</h2>
                <p style={{ color: 'var(--text-dim)' }}>{language === 'ku' ? 'گەشەی ڕۆحی و سوپاسگوزارییەکانت بنووسەوە لەم مانگە پیرۆزەدا.' : 'Reflect on your growth, gratitude, and goals during this blessed month.'}</p>
            </div>

            <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', direction: language === 'ku' ? 'rtl' : 'ltr' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <BookText color="var(--primary)" size={32} />
                        <h3 style={{ fontSize: '1.5rem', color: 'white' }}>{language === 'ku' ? 'بیرەوەری ئەمڕۆ' : "Today's Reflection"}</h3>
                    </div>
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        style={{
                            background: 'transparent', border: '1px solid var(--surface-border)',
                            color: 'var(--text-dim)', padding: '0.5rem 1rem',
                            borderRadius: '8px', cursor: 'pointer', display: 'flex',
                            alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        <History size={18} /> {showHistory ? (language === 'ku' ? 'نووسینی نوێ' : 'New Entry') : (language === 'ku' ? 'بەرگی ڕابردوو' : 'View History')}
                    </button>
                </div>

                {!showHistory ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{
                            padding: '1.5rem',
                            background: 'rgba(212, 175, 55, 0.05)',
                            borderRadius: '12px',
                            border: '1px solid var(--primary-glow)',
                            marginBottom: '2rem',
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'flex-start'
                        }}>
                            <Sparkles size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
                            <p style={{ fontSize: '0.95rem', color: 'var(--primary)', fontStyle: 'italic' }}>
                                {language === 'ku'
                                    ? '"ڕۆژووەکەی ئەمڕۆت چۆن کارگەری هەبوو لەسەر دڵت؟ یەک شت چییە کە ئەمڕۆ سوپاسگوزاری خودای بۆ بکەیت؟"'
                                    : '"How did today\'s fasting impact your heart? What is one thing you are grateful to Allah for today?"'}
                            </p>
                        </div>

                        <textarea
                            value={entry}
                            onChange={(e) => setEntry(e.target.value)}
                            placeholder={language === 'ku' ? 'لێرە شتەکانت بنووسە...' : 'Write your thoughts here...'}
                            style={{
                                width: '100%',
                                minHeight: '200px',
                                padding: '1.5rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--surface-border)',
                                borderRadius: '16px',
                                color: 'white',
                                fontSize: '1.1rem',
                                lineHeight: '1.6',
                                outline: 'none',
                                resize: 'none',
                                marginBottom: '2rem',
                                textAlign: language === 'ku' ? 'right' : 'left',
                                direction: language === 'ku' ? 'rtl' : 'ltr'
                            }}
                        />

                        <button
                            className="btn-primary"
                            onClick={saveEntry}
                            style={{ width: '100%', py: '1.5rem' }}
                        >
                            <Save size={20} style={{ marginRight: '0.5rem' }} /> {t.save_reflection}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gap: '1.5rem' }}>
                        {history.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '3rem' }}>{language === 'ku' ? 'هیچ بیرەوەرییەک نییە جارێ.' : 'No reflections saved yet.'}</p>
                        ) : (
                            history.map((h) => (
                                <div key={h.id} className="glass" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>{h.date}</div>
                                    <p style={{ color: 'var(--text-white)', lineHeight: '1.5', textAlign: language === 'ku' ? 'right' : 'left' }}>{h.text}</p>
                                </div>
                            ))
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Journal;
