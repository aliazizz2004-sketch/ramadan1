import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { ramadanDuas } from '../data/ramadanDuas';

const DailyDua = ({ t, language }) => {
    const now = new Date();
    const month = now.getMonth();
    const date = now.getDate();

    let duaIndex = (date - 1) % 30;

    if (month === 2) {
        duaIndex = Math.min(date - 1, 29);
    } else if (month === 3 && date <= 1) {
        duaIndex = 29;
    }

    const currentDua = ramadanDuas[duaIndex] || ramadanDuas[30];

    return (
        <section id="dua" className="container" style={{ padding: '6rem 0' }}>
            <div className="glass" style={{
                padding: '4rem',
                textAlign: 'center',
                background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
                position: 'relative',
                overflow: 'hidden',
                direction: language === 'ku' ? 'rtl' : 'ltr'
            }}>
                <Quote
                    size={120}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: language === 'ku' ? 'auto' : '5%',
                        right: language === 'ku' ? '5%' : 'auto',
                        opacity: 0.05,
                        color: 'var(--primary)'
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '20px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '2rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        {t.daily_dua}
                    </div>

                    <h3 style={{
                        fontSize: 'max(2rem, 4vw)',
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-display)',
                        lineHeight: '1.4',
                        direction: 'rtl',
                        color: 'var(--primary)'
                    }}>
                        {currentDua.arabic}
                    </h3>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{
                            fontSize: '1.75rem',
                            color: 'var(--text-white)',
                            lineHeight: '1.8',
                            fontFamily: 'var(--font-kurdish)',
                            marginBottom: '2rem'
                        }}>
                            "{currentDua.ku}"
                        </p>
                        <div style={{ fontSize: '1rem', color: 'var(--primary)', opacity: 0.8, letterSpacing: '2px' }}>
                            — {language === 'ku' ? `بەشی ڕۆژی ${duaIndex + 1}` : `Day ${duaIndex + 1} Selection`}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DailyDua;
