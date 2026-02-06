import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const DailyDua = ({ t, language }) => {
    const dua = {
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        en: {
            transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
            translation: "خودایە، تۆ زۆر لێبووردەی و لێبووردنیت خۆش دەوێت، دەی لە من ببورە.",
            source: "پێشنیار کراوە بۆ ١٠ شەوی کۆتایی ڕەمەزان"
        },
        ku: {
            transliteration: "ئەڵڵاھوممە ئیننەکە عەفوووەن توحیببول عەفوە فەعفو عەننی",
            translation: "خودایە، تۆ زۆر لێبووردەی و لێبووردنیت خۆش دەوێت، دەی لە من ببورە.",
            tafseer: "ئەم دوعایە یەکێکە لە پڕ ماناترین و گرنگترین دوعاکان کە پێغەمبەر (سەلامی خودای لێبێت) فێری دایکی ئیمانداران عائیشەی کردووە، کاتێک پرسیاری لێکرد ئەگەر زانیم چ شەوێک شەوی قەدرە چی بڵێم؟ فەرمووی بڵێ ئەم دوعایە. لێبووردن (عەفو) لە لایەن خوداوە بە واتای سڕینەوەی گوناهەکان دێت بە جۆرێک کە هیچ شوێنەواریان نەمێنێت.",
            source: "پێشنیار کراوە بۆ ١٠ شەوی کۆتایی ڕەمەزان"
        }
    };

    const content = language === 'ku' ? dua.ku : dua.en;

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
                        {dua.arabic}
                    </h3>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{
                            fontSize: '1.25rem',
                            fontStyle: 'italic',
                            color: 'var(--text-white)',
                            marginBottom: '1rem',
                            lineHeight: '1.6'
                        }}>
                            "{content.transliteration}"
                        </p>
                        <p style={{
                            fontSize: '1.5rem',
                            color: 'var(--text-dim)',
                            marginBottom: '2rem'
                        }}>
                            {content.translation}
                        </p>
                        {language === 'ku' && content.tafseer && (
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(212, 175, 55, 0.05)',
                                borderRadius: '15px',
                                border: '1px solid var(--primary-glow)',
                                color: 'var(--primary)',
                                marginBottom: '2rem',
                                textAlign: 'right',
                                fontSize: '1.1rem',
                                lineHeight: '1.8'
                            }}>
                                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>تەفسیر/مانا:</strong>
                                {content.tafseer}
                            </div>
                        )}
                        <div style={{ fontSize: '0.9rem', color: 'var(--primary)', opacity: 0.8 }}>
                            — {content.source}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DailyDua;
