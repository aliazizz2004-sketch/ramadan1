import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Calculator, Info } from 'lucide-react';

const ZakatCalc = ({ t, language }) => {
    const [assets, setAssets] = useState({
        cash: '',
        gold: '',
        silver: '',
        other: ''
    });

    const nisabGold = 85;
    const goldPrice = 65;
    const nisabValue = nisabGold * goldPrice;

    const totalAssets = (Number(assets.cash) || 0) +
        ((Number(assets.gold) || 0) * goldPrice) +
        ((Number(assets.silver) || 0) * 0.8) +
        (Number(assets.other) || 0);

    const zakatDue = totalAssets >= nisabValue ? totalAssets * 0.025 : 0;

    const fields = [
        { id: 'cash', label: language === 'ku' ? 'پارەی کاش و پاشەکەوت (دۆلار)' : 'Cash & Savings (USD)', placeholder: '0.00' },
        { id: 'gold', label: language === 'ku' ? 'ئاڵتون (گرام)' : 'Gold (grams)', placeholder: '0.00' },
        { id: 'silver', label: language === 'ku' ? 'زیو (گرام)' : 'Silver (grams)', placeholder: '0.00' },
        { id: 'other', label: language === 'ku' ? 'سەرمایەی تر (دۆلار)' : 'Other Assets (USD)', placeholder: '0.00' },
    ];

    return (
        <section id="zakat" className="container" style={{ padding: '6rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t.zakat}</h2>
                <p style={{ color: 'var(--text-dim)' }}>{language === 'ku' ? 'بە ئاسانی زەکاتی ساڵانەت هەژمار بکە.' : 'Easily calculate your obligatory charity for the year.'}</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '3rem',
                alignItems: 'start',
                direction: language === 'ku' ? 'rtl' : 'ltr'
            }}>
                <div className="glass" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {fields.map(field => (
                            <div key={field.id} style={{ textAlign: language === 'ku' ? 'right' : 'left' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>
                                    {field.label}
                                </label>
                                <input
                                    type="number"
                                    value={assets[field.id]}
                                    onChange={(e) => setAssets({ ...assets, [field.id]: e.target.value })}
                                    placeholder={field.placeholder}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--surface-border)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        textAlign: language === 'ku' ? 'right' : 'left'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass" style={{
                    padding: '2.5rem',
                    background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.1) 0%, rgba(2, 6, 23, 0.1) 100%)',
                    border: '1px solid var(--primary-glow)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                        <Calculator color="var(--primary)" size={32} />
                        <h3 style={{ fontSize: '1.75rem', color: 'white' }}>{language === 'ku' ? 'کورتەی هەژمارکراو' : 'Calculated Summary'}</h3>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                            <span>{language === 'ku' ? 'کۆی سەرمایە:' : 'Total Asset Value:'}</span>
                            <span style={{ color: 'white' }}>${totalAssets.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', flexDirection: language === 'ku' ? 'row-reverse' : 'row' }}>
                            <span>{language === 'ku' ? 'ڕێژەی نیساب:' : 'Nisab Threshold:'}</span>
                            <span style={{ color: 'white' }}>~${nisabValue.toLocaleString()}</span>
                        </div>
                    </div>

                    <div style={{
                        padding: '2rem',
                        borderRadius: '15px',
                        background: 'var(--surface)',
                        textAlign: 'center',
                        border: '1px solid var(--surface-border)'
                    }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            {language === 'ku' ? 'زەکاتی شایستە بۆ ئەمڕۆ' : 'Zakat Due Today'}
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                            ${zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    <div style={{
                        marginTop: '2rem',
                        display: 'flex',
                        gap: '1rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-dim)',
                        lineHeight: '1.4',
                        flexDirection: language === 'ku' ? 'row-reverse' : 'row'
                    }}>
                        <Info size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
                        <p style={{ textAlign: language === 'ku' ? 'right' : 'left' }}>
                            {language === 'ku'
                                ? 'ئەمە خەمڵاندنێکی گشتییە. زەکات بریتییە لە ٢.٥٪ی سەرمایەکەت ئەگەر گەیشتبێتە نیساب بۆ ماوەی ساڵێکی کۆچی. تکایە بۆ بارودۆخی تایبەت پرسیار لە زانایانی ئایینی بکە.'
                                : 'This is a general estimation. Zakat is 2.5% of your wealth if it exceeds the Nisab for one lunar year. Please consult a scholar for complex cases.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ZakatCalc;
