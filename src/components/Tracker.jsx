import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const trackerEntries = {
    en: [
        { id: 1, text: 'Fasting (Sawm)', completed: true },
        { id: 2, text: 'Fajr Prayer', completed: false },
        { id: 3, text: 'Dhuhr Prayer', completed: false },
        { id: 4, text: 'Asr Prayer', completed: false },
        { id: 5, text: 'Maghrib Prayer', completed: false },
        { id: 6, text: 'Isha & Taraweeh', completed: false },
        { id: 7, text: 'Read 1 juz of Quran', completed: false },
        { id: 8, text: 'Give Sadaqah', completed: false },
    ],
    ku: [
        { id: 1, text: 'ڕۆژووی ئەمڕۆ', completed: true },
        { id: 2, text: 'نوێژی بەیانی', completed: false },
        { id: 3, text: 'نوێژی نیوەڕۆ', completed: false },
        { id: 4, text: 'نوێژی عەسر', completed: false },
        { id: 5, text: 'نوێژی مەغریب', completed: false },
        { id: 6, text: 'نوێژی عیشا و تەراویح', completed: false },
        { id: 7, text: 'خوێندنی یەک جزمی قورئان', completed: false },
        { id: 8, text: 'پێدانی سەدەقە', completed: false },
    ]
};

const Tracker = ({ t, language }) => {
    const [tasks, setTasks] = useState(trackerEntries[language]);

    // Update tasks when language changes
    React.useEffect(() => {
        setTasks(trackerEntries[language]);
    }, [language]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const progress = tasks ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;

    return (
        <section id="tracker" className="container" style={{ padding: '6rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.daily_deeds}</h2>
                <p style={{ color: 'var(--text-dim)' }}>{t.consistency_key}</p>
            </div>

            <div className="glass" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontWeight: '600' }}>{t.today_progress}</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{progress}%</span>
                    </div>
                    <div style={{
                        height: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '5px',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            whileHover={{ x: language === 'ku' ? -10 : 10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem 1.5rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                border: '1px solid transparent',
                                transition: 'all 0.2s ease',
                                background: task.completed ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                                flexDirection: language === 'ku' ? 'row-reverse' : 'row'
                            }}
                        >
                            {task.completed ? (
                                <CheckCircle2 color="var(--accent)" size={24} />
                            ) : (
                                <Circle color="var(--text-dim)" size={24} />
                            )}
                            <span style={{
                                fontSize: '1.125rem',
                                color: task.completed ? 'var(--text-white)' : 'var(--text-dim)',
                                textDecoration: task.completed ? 'line-through' : 'none',
                                opacity: task.completed ? 0.6 : 1,
                                flexGrow: 1,
                                textAlign: language === 'ku' ? 'right' : 'left'
                            }}>
                                {task.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tracker;
