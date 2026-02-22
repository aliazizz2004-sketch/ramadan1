import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, Sun, Moon, Cloud, Sunrise, Sunset, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
    const [viewDate, setViewDate] = useState(new Date());

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

    const generateMonthSchedule = () => {
        const schedule = [];
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const kuMonths = ['کانوونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەممووز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم'];
        const kuDays = ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە'];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const times = calculateForDate(date, selectedCity);

            schedule.push({
                dayNum: i,
                monthKu: kuMonths[month],
                dayName: kuDays[date.getDay()],
                times
            });
        }
        return schedule;
    };

    const nextMonth = () => {
        const next = new Date(viewDate);
        next.setMonth(next.getMonth() + 1);
        setViewDate(next);
    };

    const prevMonth = () => {
        const prev = new Date(viewDate);
        prev.setMonth(prev.getMonth() - 1);
        setViewDate(prev);
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
                        const now = new Date();

                        // Helper to get Date object from prayer time string
                        const getPrayerDate = (pTime) => {
                            const [timeStr, modifier] = pTime.split(' ');
                            let [hours, minutes] = timeStr.split(':').map(Number);
                            if (modifier === 'PM' && hours < 12) hours += 12;
                            if (modifier === 'AM' && hours === 12) hours = 0;
                            const d = new Date();
                            d.setHours(hours, minutes, 0, 0);
                            return d;
                        };

                        // Find the next upcoming prayer
                        const nextPrayer = calculatedTimes.find(p => getPrayerDate(p.time) > now)
                            || calculatedTimes[0]; // If all passed, it's Fajr tomorrow

                        const isActive = prayer.id === nextPrayer?.id;

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
                                    background: isActive
                                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)'
                                        : 'rgba(255,255,255,0.03)',
                                    boxShadow: isActive ? '0 0 40px rgba(212, 175, 55, 0.25)' : 'none',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    overflow: 'hidden'
                                }}
                            >
                                {isActive && (
                                    <>
                                        {/* Animated Background Pulse */}
                                        <motion.div
                                            animate={{
                                                opacity: [0.1, 0.3, 0.1],
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            style={{
                                                position: 'absolute',
                                                top: 0, left: 0, right: 0, bottom: 0,
                                                background: 'var(--primary)',
                                                zIndex: 0,
                                                pointerEvents: 'none'
                                            }}
                                        />

                                        <motion.div
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                fontSize: '0.7rem',
                                                background: 'var(--primary)',
                                                color: 'black',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontWeight: '900',
                                                textTransform: 'uppercase',
                                                letterSpacing: '2px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                zIndex: 2,
                                                boxShadow: '0 0 15px var(--primary-glow)'
                                            }}
                                        >
                                            <motion.span
                                                animate={{ opacity: [1, 0.4, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                style={{ width: '6px', height: '6px', background: 'black', borderRadius: '50%' }}
                                            />
                                            {language === 'ku' ? 'دواتر' : 'NEXT'}
                                        </motion.div>
                                    </>
                                )}

                                <div style={{
                                    color: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    transform: isActive ? 'scale(1.25)' : 'scale(1)',
                                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {prayer.icon}
                                </div>
                                <div style={{
                                    fontSize: '1rem',
                                    color: isActive ? 'white' : 'var(--text-dim)',
                                    marginBottom: '0.75rem',
                                    fontWeight: isActive ? '800' : 'normal',
                                    position: 'relative',
                                    zIndex: 1,
                                    letterSpacing: isActive ? '1px' : '0px'
                                }}>
                                    {prayer.label}
                                </div>
                                <div style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '900',
                                    color: isActive ? 'var(--primary)' : 'white',
                                    fontFamily: 'var(--font-kurdish)',
                                    textShadow: isActive ? '0 0 15px rgba(212, 175, 55, 0.5)' : 'none',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {prayer.time}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* 30-Day Schedule Modal - Redesigned as a single schedule table */}
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
                            background: 'rgba(2, 6, 23, 0.98)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 3000,
                            padding: '1rem'
                        }}
                        onClick={() => setShowSchedule(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="glass"
                            style={{
                                width: '100%',
                                maxWidth: '1000px',
                                maxHeight: '90vh',
                                padding: '2.5rem',
                                overflowY: 'auto',
                                position: 'relative',
                                background: '#0f172a',
                                border: '1px solid var(--primary)',
                                direction: 'rtl'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                                <button
                                    onClick={() => setShowSchedule(false)}
                                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '8px' }}
                                >
                                    داخستن ×
                                </button>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <button onClick={prevMonth} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <ChevronRight size={22} />
                                    </button>
                                    <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', margin: 0, fontWeight: 'bold' }}>
                                        خشتەی {viewDate.toLocaleString('ckb-IQ', { month: 'long', year: 'numeric' })} - {cities[selectedCity].name}
                                    </h2>
                                    <button onClick={nextMonth} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <ChevronLeft size={22} />
                                    </button>
                                </div>
                                <div style={{ width: '80px' }}></div>
                            </div>

                            <div style={{ overflowX: 'auto', maxHeight: '70vh', borderRadius: '12px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontFamily: 'var(--font-kurdish)' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#0f172a', zIndex: 10 }}>
                                        <tr style={{ borderBottom: '2px solid var(--primary)', color: 'var(--primary)' }}>
                                            <th style={{ padding: '1.25rem', fontWeight: '800', background: 'rgba(212, 175, 55, 0.05)' }}>ڕۆژ</th>
                                            <th style={{ padding: '1.25rem', fontWeight: '800', background: 'rgba(212, 175, 55, 0.05)' }}>ڕێکەوت</th>
                                            <th style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)' }}>بەیانی</th>
                                            <th style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)' }}>ڕۆژھەڵات</th>
                                            <th style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)' }}>نیوەڕۆ</th>
                                            <th style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)' }}>عەسر</th>
                                            <th style={{ padding: '1.25rem', background: 'rgba(212, 175, 55, 0.05)' }}>شێوان</th>
                                            <th style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)' }}>خەوتنان</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generateMonthSchedule().map((day, idx) => {
                                            const isToday = new Date().toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), day.dayNum).toDateString();
                                            return (
                                                <tr key={idx} style={{
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                    background: isToday ? 'rgba(212, 175, 55, 0.15)' : (idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent'),
                                                    color: isToday ? 'var(--primary)' : 'white',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                    onMouseEnter={e => { if (!isToday) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                                                    onMouseLeave={e => { if (!isToday) e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent'; }}
                                                >
                                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{day.dayName}</td>
                                                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{day.dayNum}ی {day.monthKu}</td>
                                                    {day.times.map(t => (
                                                        <td key={t.id} style={{ padding: '1rem', fontWeight: t.id === 'maghrib' ? '800' : 'normal' }}>{t.time}</td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PrayerTimes;
