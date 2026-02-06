import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, Sun, Moon, Cloud, Sunrise, Sunset, ChevronDown } from 'lucide-react';

const cities = {
    Erbil: {
        name: 'هەولێر',
        offsets: { fajr: 0, sunrise: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
    },
    Sulaymaniyah: {
        name: 'سلێمانی',
        offsets: { fajr: -9, sunrise: -9, dhuhr: -8, asr: -6, maghrib: -3, isha: -1 }
    },
    Duhok: {
        name: 'دهۆک',
        offsets: { fajr: -6, sunrise: 2, dhuhr: 4, asr: 8, maghrib: 2, isha: 9 }
    },
    Halabja: {
        name: 'هەڵەبجە',
        offsets: { fajr: -14, sunrise: -5, dhuhr: -11, asr: -5, maghrib: -6, isha: -6 }
    }
};

// Official Erbil times for reference (Feb 6, 2026)
const erbilBaseTimes = {
    fajr: '05:42',
    sunrise: '07:04',
    dhuhr: '12:26',
    asr: '15:15',
    maghrib: '17:41',
    isha: '18:56'
};

const PrayerTimes = ({ selectedCity, setSelectedCity, language }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [hijriDate, setHijriDate] = useState('');
    const [gregorianDate, setGregorianDate] = useState('');
    const [calculatedTimes, setCalculatedTimes] = useState([]);
    const [showSchedule, setShowSchedule] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        const now = new Date();
        const gDate = new Intl.DateTimeFormat(language === 'ku' ? 'ckb-IQ' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(now);
        setGregorianDate(gDate);

        const hDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-uma', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(now);
        setHijriDate(hDate);

        const prayerList = calculateForDate(now, selectedCity);
        setCalculatedTimes(prayerList);

        return () => clearInterval(timer);
    }, [selectedCity, language]);

    const calculateForDate = (date, city) => {
        const baseDate = new Date('2026-02-06');
        const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
        const cityData = cities[city] || cities.Erbil;

        const adjustTime = (baseTimeStr, offset, dayShiftPerDay) => {
            const [h, m] = baseTimeStr.split(':').map(Number);
            const targetDate = new Date(date);
            targetDate.setHours(h, m + offset + (diffDays * dayShiftPerDay), 0);
            return targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        };

        return [
            { id: 'fajr', label: 'بەیانی', time: adjustTime(erbilBaseTimes.fajr, cityData.offsets.fajr, -1), icon: <Sunrise size={22} /> },
            { id: 'sunrise', label: 'ڕۆژھەڵات', time: adjustTime(erbilBaseTimes.sunrise, cityData.offsets.sunrise, -1), icon: <Sun size={22} /> },
            { id: 'dhuhr', label: 'نیوەڕۆ', time: adjustTime(erbilBaseTimes.dhuhr, cityData.offsets.dhuhr, 0), icon: <Sun size={26} /> },
            { id: 'asr', label: 'عەسر', time: adjustTime(erbilBaseTimes.asr, cityData.offsets.asr, 1), icon: <Cloud size={22} /> },
            { id: 'maghrib', label: 'شێوان', time: adjustTime(erbilBaseTimes.maghrib, cityData.offsets.maghrib, 1.1), icon: <Sunset size={22} /> },
            { id: 'isha', label: 'خەوتنان', time: adjustTime(erbilBaseTimes.isha, cityData.offsets.isha, 1.1), icon: <Moon size={22} /> }
        ];
    };

    const generate30DaySchedule = () => {
        const schedule = [];
        const today = new Date();

        const kuMonths = ['کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەممووز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم'];
        const kuDays = ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە'];

        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const times = calculateForDate(date, selectedCity);

            // Manual Kurdish formatting for 100% reliability
            const dayNum = date.getDate();
            const monthKu = kuMonths[date.getMonth()];
            const dayKu = kuDays[date.getDay()];

            schedule.push({
                date: `${dayNum}ی ${monthKu}`,
                dayName: dayKu,
                times
            });
        }
        return schedule;
    };

    return (
        <section id="prayer-times" className="container" style={{ padding: '6rem 0' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '4rem',
                alignItems: 'center'
            }}>
                {/* Left Side: Dynamic Display */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="glass"
                    style={{ padding: '3.5rem', position: 'relative', overflow: 'hidden' }}
                >
                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.1 }}>
                        <Clock size={200} color="var(--primary)" />
                    </div>

                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Clock className="text-primary" /> کاتەکانی بانگ
                    </h2>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid var(--surface-border)', cursor: 'pointer', position: 'relative' }}>
                            <MapPin color="var(--primary)" />
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    width: '100%',
                                    appearance: 'none',
                                    fontFamily: 'inherit'
                                }}
                            >
                                {Object.keys(cities).map(city => (
                                    <option key={city} value={city} style={{ background: '#0f172a' }}>
                                        {cities[city].name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={20} style={{ pointerEvents: 'none' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="date-badge" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                            <Calendar size={20} color="var(--primary)" />
                            <span>{gregorianDate}</span>
                        </div>
                        <div className="date-badge" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                            <Moon size={20} />
                            <span>{hijriDate}</span>
                        </div>
                        <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'white', marginTop: '1rem', fontFamily: 'var(--font-kurdish)', letterSpacing: '1px' }}>
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                        </div>

                        {/* Next Prayer Countdown Card */}
                        {calculatedTimes.length > 0 && (() => {
                            const now = new Date();
                            const next = calculatedTimes.find(p => {
                                const [timeStr, modifier] = p.time.split(' ');
                                let [h, m] = timeStr.split(':').map(Number);
                                if (modifier === 'PM' && h < 12) h += 12;
                                if (modifier === 'AM' && h === 12) h = 0;
                                const d = new Date();
                                d.setHours(h, m, 0, 0);
                                return d > now;
                            }) || calculatedTimes.find(p => p.id === 'fajr');

                            if (!next) return null;

                            const [tStr, mod] = next.time.split(' ');
                            let [th, tm] = tStr.split(':').map(Number);
                            if (mod === 'PM' && th < 12) th += 12;
                            if (mod === 'AM' && th === 12) th = 0;
                            let target = new Date();
                            target.setHours(th, tm, 0, 0);
                            if (target < now) target.setDate(target.getDate() + 1);

                            const diff = target - now;
                            const dh = Math.floor(diff / (1000 * 60 * 60));
                            const dm = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            const ds = Math.floor((diff % (1000 * 60)) / 1000);

                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="glass"
                                    style={{
                                        marginTop: '2rem',
                                        padding: '1.5rem',
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.4) 100%)',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            مـاوە بـۆ بانـگی {next.label}
                                        </span>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}
                                        />
                                    </div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', fontFamily: 'var(--font-kurdish)', textAlign: 'center' }}>
                                        {dh.toString().padStart(2, '0')}:{dm.toString().padStart(2, '0')}:{ds.toString().padStart(2, '0')}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', letterSpacing: '2px' }}>
                                        HOURS : MINUTES : SECONDS
                                    </div>
                                </motion.div>
                            );
                        })()}

                        {/* Full Month Schedule Button - Moved here */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowSchedule(true)}
                            style={{
                                marginTop: '2rem',
                                padding: '1.25rem',
                                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%)',
                                border: '1px solid var(--primary)',
                                color: 'var(--primary)',
                                fontWeight: 'bold',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '1.1rem',
                                width: '100%',
                                fontFamily: 'var(--font-kurdish)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.2)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <Calendar size={20} /> خشتەی تەواوی مانگ
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Side: Grid of Times */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    {calculatedTimes.map((prayer, index) => {
                        // Detect if this is the current active prayer
                        const now = new Date();
                        const [timeStr, modifier] = prayer.time.split(' ');
                        let [hours, minutes] = timeStr.split(':').map(Number);
                        if (modifier === 'PM' && hours < 12) hours += 12;
                        if (modifier === 'AM' && hours === 12) hours = 0;

                        const prayerDate = new Date();
                        prayerDate.setHours(hours, minutes, 0, 0);

                        // Basic logic: If now is after this prayer and before next, or just the next upcoming
                        // To keep it simple and visual, let's find the 'Next' prayer as active
                        // Or find the one that matches the current range.

                        // Find the next prayer in the sequence
                        const nextPrayer = calculatedTimes.find(p => {
                            const [pTime, pMod] = p.time.split(' ');
                            let [pHours, pMins] = pTime.split(':').map(Number);
                            if (pMod === 'PM' && pHours < 12) pHours += 12;
                            if (pMod === 'AM' && pHours === 12) pHours = 0;
                            const d = new Date();
                            d.setHours(pHours, pMins, 0, 0);
                            return d > now;
                        }) || calculatedTimes[0]; // If all passed, it's Fajr tomorrow

                        const isActive = prayer.id === (nextPrayer?.id);

                        return (
                            <motion.div
                                key={prayer.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass"
                                style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    position: 'relative',
                                    border: isActive ? '2px solid var(--primary)' : '1px solid var(--surface-border)',
                                    background: isActive ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)' : 'rgba(255,255,255,0.03)',
                                    boxShadow: isActive ? '0 0 30px rgba(212, 175, 55, 0.2)' : 'none',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            fontSize: '0.65rem',
                                            background: 'var(--primary)',
                                            color: 'black',
                                            padding: '2px 8px',
                                            borderRadius: '20px',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}
                                    >
                                        Next
                                    </motion.div>
                                )}
                                <div style={{
                                    color: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                                    transition: 'transform 0.3s ease'
                                }}>
                                    {prayer.icon}
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: isActive ? 'white' : 'var(--text-dim)',
                                    marginBottom: '0.75rem',
                                    fontWeight: isActive ? '600' : 'normal'
                                }}>
                                    {prayer.label}
                                </div>
                                <div style={{
                                    fontSize: '1.6rem',
                                    fontWeight: '900',
                                    color: isActive ? 'var(--primary)' : 'white',
                                    fontFamily: 'var(--font-kurdish)',
                                    textShadow: isActive ? '0 0 10px rgba(212, 175, 55, 0.3)' : 'none'
                                }}>
                                    {prayer.time}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* 30-Day Schedule Modal - Redesigned */}
            <AnimatePresence>
                {showSchedule && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(2, 6, 23, 0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '1rem'
                        }}
                        onClick={() => setShowSchedule(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            className="glass"
                            style={{
                                width: '100%',
                                maxWidth: '1200px',
                                maxHeight: '90vh',
                                padding: '3rem',
                                overflowY: 'auto',
                                position: 'relative',
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))',
                                border: '1px solid rgba(212, 175, 55, 0.2)',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'var(--primary) transparent'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowSchedule(false)}
                                style={{
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '2rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--surface-border)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                ✕
                            </button>

                            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary)', textAlign: 'center', fontFamily: 'var(--font-display)' }}>
                                خشتەی کاتەکانی بانگ - {cities[selectedCity].name}
                            </h2>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '2rem'
                            }}>
                                {generate30DaySchedule().map((day, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: Math.min(idx * 0.03, 1) }}
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '20px',
                                            padding: '1.5rem',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        whileHover={{ y: -5, background: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                            <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>{day.date}</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary)' }}>{day.dayName}</div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                            {day.times.map(t => (
                                                <div key={t.id} style={{
                                                    textAlign: 'center',
                                                    padding: '1rem 0.5rem',
                                                    background: 'rgba(0,0,0,0.2)',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(255,255,255,0.03)'
                                                }}>
                                                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', fontWeight: '500' }}>{t.label}</div>
                                                    <div style={{
                                                        fontSize: '1.1rem',
                                                        fontWeight: '700',
                                                        color: 'white',
                                                        fontFamily: 'var(--font-kurdish)',
                                                        letterSpacing: '0.5px'
                                                    }}>{t.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >
        </section >
    );
};

export default PrayerTimes;
