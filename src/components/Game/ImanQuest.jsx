import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronRight, ChevronLeft, RefreshCw, Star, BookOpen, Moon, Sparkles, ArrowRight, Info, Book } from 'lucide-react';

// 1. General Quiz Questions (20 items)
const quizQuestions = [
    {
        question: "ئامانجی سەرەکی ڕۆژوو گرتن لە ڕەمەزاندا چییە؟",
        options: ["لاوازبوون", "بەدەستهێنانی تەقوا (ترسی خودا)", "پاشەکەوتکردنی پارە", "زیاتر خەوتن"],
        correct: 1,
        explanation: "وەک لە سورەتی بەقەرە (٢:١٨٣) هاتووە، ڕۆژوو فەرز کراوە بۆ ئەوەی تەقوا بەدەست بهێنن."
    },
    {
        question: "کام شەو باشترە لە هەزار مانگ؟",
        options: ["شەوی یەکەم", "شەوی پازدە", "شەوی قەدر", "شەوی کۆتایی"],
        correct: 2,
        explanation: "شەوی قەدر ئەو شەوەیە کە قورئان تێیدا دابەزی."
    },
    {
        question: "خواردنی پێش بەربانگ چی ناوی لێ دەنرێت؟",
        options: ["بەربانگ", "سەحەر", "نانی ئێوارە", "نانی نیوەڕۆ"],
        correct: 1,
        explanation: "سەحەر ئەو خواردنەیە کە موسڵمانان پێش بەربانگ دەیخۆن لە ڕەمەزاندا."
    },
    {
        question: "کام جەنگ لە مانگی ڕەمەزاندا ڕوویدا؟",
        options: ["شەڕی ئوحود", "شەڕی بەدر", "شەڕی خەندەق", "شەڕی خەیبەر"],
        correct: 1,
        explanation: "شەڕی بەدر، یەکەم شەڕی گەورەی ئیسلام، لە ١٧ی ڕەمەزاندا ڕوویدا."
    },
    {
        question: "قورئانی پیرۆز چەند سورەتی هەیە؟",
        options: ["١١٠", "١١٦", "١١٤", "١٢٠"],
        correct: 2,
        explanation: "قورئان ١١٤ سورەتی هەیە."
    },
    {
        question: "کام پێغەمبەر ماسییەکی گەورە قووتی دا؟",
        options: ["ئیبراهیم", "موسا", "یونس", "عیسا"],
        correct: 2,
        explanation: "یونس پێغەمبەر لەلایەن ماسییەکی گەورەوە قووت درا و سێ شەو و ڕۆژ لە ناوییەوە مایەوە."
    },
    {
        question: "چەند ڕوکنی ئیسلام هەیە؟",
        options: ["٣", "٤", "٥", "٦"],
        correct: 2,
        explanation: "پێنج ڕوکنی ئیسلام هەیە: شەهادەت، نوێژ، ڕۆژوو، زەکات، و حەج."
    },
    {
        question: "کام سورەت یەکەم سورەتی قورئانە؟",
        options: ["سورەتی بەقەرە", "سورەتی فاتیحە", "سورەتی یاسین", "سورەتی ئیخلاس"],
        correct: 1,
        explanation: "سورەتی فاتیحە یەکەم سورەتی قورئانە و حەوت ئایەتی هەیە."
    },
    {
        question: "کام مانگ مانگی پیرۆزی ڕەمەزانە لە ڕۆژژمێری ئیسلامیدا؟",
        options: ["مانگی ٧", "مانگی ٨", "مانگی ٩", "مانگی ١٠"],
        correct: 2,
        explanation: "ڕەمەزان نۆیەم مانگی ڕۆژژمێری ئیسلامییە."
    },
    {
        question: "کام کتێب لەسەر پێغەمبەر موسا دابەزی؟",
        options: ["قورئان", "ئینجیل", "تەورات", "زەبوور"],
        correct: 2,
        explanation: "تەورات لەسەر پێغەمبەر موسا دابەزی."
    },
    {
        question: "کام پێغەمبەر باوکی پێغەمبەرانە؟",
        options: ["نوح", "ئیبراهیم", "ئادەم", "موسا"],
        correct: 1,
        explanation: "ئیبراهیم پێغەمبەر بە باوکی پێغەمبەران ناسراوە چونکە زۆربەی پێغەمبەران لە نەوەی ئەون."
    },
    {
        question: "چەند جار لە ڕۆژێکدا نوێژ دەکەین؟",
        options: ["٣ جار", "٤ جار", "٥ جار", "٦ جار"],
        correct: 2,
        explanation: "موسڵمانان ٥ جار لە ڕۆژێکدا نوێژ دەکەن: بەیانی، نیوەڕۆ، عەسر، مەغریب، و عیشا."
    },
    {
        question: "کام سورەت کۆتا سورەتی قورئانە؟",
        options: ["سورەتی ناس", "سورەتی فەلەق", "سورەتی ئیخلاس", "سورەتی کەوسەر"],
        correct: 0,
        explanation: "سورەتی ناس کۆتا سورەتی قورئانە و ٦ ئایەتی هەیە."
    },
    {
        question: "کام شار قیبلەی موسڵمانانە؟",
        options: ["مەدینە", "قودس", "مەکە", "بەغدا"],
        correct: 2,
        explanation: "مەکە قیبلەی موسڵمانانە و تێیدا کەعبەی پیرۆز هەیە."
    },
    {
        question: "کام پێغەمبەر کەشتییەکی گەورەی دروست کرد؟",
        options: ["نوح", "ئیبراهیم", "موسا", "یوسف"],
        correct: 0,
        explanation: "نوح پێغەمبەر بە فەرمانی خوا کەشتییەکی گەورەی دروست کرد بۆ ڕزگاربوون لە لافاو."
    },
    {
        question: "کام پێغەمبەر لە ئاگردا فڕێدرا بەڵام نەسووتا؟",
        options: ["ئیبراهیم", "موسا", "عیسا", "موحەممەد"],
        correct: 0,
        explanation: "ئیبراهیم پێغەمبەر لەلایەن نمرودەوە فڕێدرایە ناو ئاگر بەڵام خودا ئاگرەکەی کرد بە فێنک و سەلامەت."
    },
    {
        question: "کام ڕۆژ ڕۆژی جومعەیە لە هەفتەدا؟",
        options: ["ڕۆژی یەکشەممە", "ڕۆژی دووشەممە", "ڕۆژی هەینی", "ڕۆژی شەممە"],
        correct: 2,
        explanation: "ڕۆژی هەینی ڕۆژی جومعەیە و گرنگترین ڕۆژی هەفتەیە بۆ موسڵمانان."
    },
    {
        question: "کام فریشتە مەسئوولی دابەزاندنی وەحییە؟",
        options: ["میکائیل", "جبرائیل", "ئیسرافیل", "عەزرائیل"],
        correct: 1,
        explanation: "جبرائیل فریشتەی وەحییە و مەسئوولی دابەزاندنی پەیامی خودایە بۆ پێغەمبەران."
    },
    {
        question: "کام پێغەمبەر تەمەنی زۆر درێژ بوو؟",
        options: ["ئادەم", "نوح", "ئیبراهیم", "موسا"],
        correct: 1,
        explanation: "نوح پێغەمبەر ٩٥٠ ساڵ گەلەکەی بانگ کرد بۆ ئیمان هێنان."
    },
    {
        question: "کام مانگ دوای ڕەمەزان دێت؟",
        options: ["شەعبان", "شەوال", "ڕەجەب", "موحەڕەم"],
        correct: 1,
        explanation: "شەوال دەیەم مانگی ڕۆژژمێری ئیسلامییە و دوای ڕەمەزان دێت. جەژنی ڕەمەزان لە یەکەم ڕۆژی شەوالە."
    }
];

// 2. Ramadan Information (Info-only instead of Quiz)
const ramadanInfo = [
    {
        title: "واتای وشەی 'ڕەمەزان'",
        content: "ڕەمەزان نۆیەم مانگی ساڵنامەی کۆچییە. ناوی ڕەمەزان لە وشەی 'ڕەمەد'ـەوە هاتووە کە بە واتای گەرمای توند یان وشکبوونی زەوی دێت بەهۆی تیشکی خۆرەوە. ئەمەش ئاماژەیە بۆ ئەو هەستەی کە تینوێتی و پەرۆشی لە دڵی ڕۆژووەواندا دروست دەکات.",
        icon: <Moon size={32} />
    },
    {
        title: "فەزڵ و گرنگی مانگەکە",
        content: "ئەم مانگە مانگی دابەزینی قورئانی پیرۆزە. تێیدا شەوێک هەیە بە ناوی 'شەوی قەدر' کە لە هەزار مانگ خێرتر و چاکترە. دەرگاکانی بەهەشت دەکرێنەوە و دەرگاکانی دۆزەخ دادەخرێن، و شەیتانەکان کۆت و زنجیر دەکرێن.",
        icon: <Sparkles size={32} />
    },
    {
        title: "سودە تەندروستییەکانی ڕۆژوو",
        content: "ڕۆژوو گرتن تەنها پەرستش نییە، بەڵکو سودێکی زۆری بۆ جەستە هەیە. یارمەتی دابەزاندنی کێش و کەمکردنەوەی چەوری دەدات. هەروەها دەبێتە هۆی پاکبوونەوەی جەستە لە ژەهرەکان و پشوودان بە کۆئەندامی هەرس بۆ ماوەی چەندین کاتژمێر.",
        icon: <Info size={32} />
    },
    {
        title: "عیبادەتە تایبەتەکان",
        content: "لە شەوانی ڕەمەزاندا نوێژی 'تەراویح' ئەنجام دەدرێت کە سوونەتێکی جێگیرە. هەروەها خوێندنی قورئان و بەخشینی سەدەقە و یارمەتیدانی هەژاران لەم مانگەدا پاداشتێکی بێوێنەی هەیە و موسڵمانان زیاتر ڕوو لە چاکە دەکەن.",
        icon: <Star size={32} />
    },
    {
        title: "کۆتایی مانگ و جەژن",
        content: "بە تەواوبوونی مانگی ڕەمەزان، موسڵمانان یەکەم ڕۆژی مانگی شەوال بە 'جەژنی ڕەمەزان' پیرۆز دەکەن. پێش نوێژی جەژن، پێویستە 'سەرەفترە' بدرێت بە هەژاران بۆ ئەوەی ئەوانیش لە خۆشی جەژندا هاوبەش بن.",
        icon: <Award size={32} />
    }
];

// 3. Prophet Stories
const prophetStories = [
    {
        id: 'adam',
        title: "پێغەمبەر ئادەم (س.خ)",
        content: "ئادەم یەکەم مرۆڤ و یەکەم پێغەمبەر بوو کە خودا دروستی کرد. لە قوڕ دروستی کرد و دواتر ڕۆحی پێدا. ژیانی لە بەهەشت دەستی پێکرد لەگەڵ هاوسەرەکەی (حەوا). بەڵام بەهۆی فێڵی شەیتانەوە و خواردنی میوەیەکی قەدەغەکراو، خودا ناردنی بۆ سەر زەوی بۆ ئەوەی ببێتە سەرپەرشتیاری زەوی و نەوەکانی تێدا بڵاوببنەوە. ئادەم باوکی هەموو مرۆڤایەتییە.",
        icon: "🌱"
    },
    {
        id: 'nuh',
        title: "پێغەمبەر نوح (س.خ)",
        content: "نوح بۆ ماوەی ٩٥٠ ساڵ گەلەکەی بانگ کرد بۆ لای خودا و پەرستنی خودای تاق و تەنها، بەڵام تەنها کەمێکیان باوەڕیان هێنا. خودا فەرمانی پێکرد کەشتییەکی گەورە دروست بکات لە ناوەڕاستی وشکانیدا، کە خەڵکەکە پێی پێدەکەنین. کاتێک لافاوە گەورەکە دەستیپێکرد، تەنها ئەوانەی لە کەشتییەکەدا بوون و جووتێک لە هەموو گیاندارەکان ڕزگاریان بوو.",
        icon: "🚢"
    },
    {
        id: 'ibrahim',
        title: "پێغەمبەر ئیبراهیم (س.خ)",
        content: "ئیبراهیم بە باوکی پێغەمبەران ناسراوە. ئەو کەعبەی پیرۆزی دروست کرد لەگەڵ ئیسماعیلی کوڕی لە مەکە. کاتێک گەلەکەی خستیانە ناو ئاگرێکی یەکجار گەورەوە چونکە بتەکانی شکاندبوو، خودا فەرمانی بە ئاگرەکە کرد کە سارد و سەلامەت بێت بۆی. تاقیکردنەوەی زۆری بۆ هات بەڵام هەمیشە ملکەچی فەرمانی خودا بوو.",
        icon: "🔥"
    },
    {
        id: 'yosef',
        title: "پێغەمبەر یوسف (س.خ)",
        content: "یوسف جوانترین پێغەمبەر بوو. بەهۆی حەسودییەوە براکانی خستیانە ناو بیرێکەوە، بەڵام خودا ڕزگاری کرد و ناردی بۆ میسر. لەوێ بووە سەپەرشتیاری گەنجینەکانی میسر و دوای ساڵانێکی زۆر براکانی و باوکی بینییەوە. چیرۆکی یوسف بە 'باشترین چیرۆکەکان' لە قورئاندا باسکراوە چونکە وانەی ئارامگرتنی تێدایە.",
        icon: "✨"
    },
    {
        id: 'younis',
        title: "پێغەمبەر یونس (س.خ)",
        content: "یونس فڕێدرایە ناو دەریاوە و ماسییەکی یەکجار گەورە قووتی دا. لە ناو سکی ماسییەکەدا سێ شەو و ڕۆژ مایەوە و لەو تاریکییەدا بەردەوام دوعای دەکرد و دەیگوت: 'لا إله إلا أنت سبحانك إني كنت من الظالمين'. خودا نزاكەی وەڵام دایەوە و ماسییەکە لە کەنارێکدا فڕێی دایە دەرەوە و گەشتەوە لای گەلەکەی.",
        icon: "🐋"
    },
    {
        id: 'mohammad',
        title: "پێغەمبەر موحەممەد (د.خ)",
        content: "موحەممەد کۆتا پێغەمبەرە و قورئانی بۆ دابەزیوە وەک هیدایەت بۆ هەموو جیهان. لە تەمەنی ٤٠ ساڵیدا لە ئەشکەوتی حیڕا یەکەم وەحی بۆ هات. ئەو بانگەوازی بۆ یەکتاپەرستی کرد و توانی ئیسلام لە هەموو جیهاندا بڵاو بکاتەوە بە ڕەوشتە بەرزەکەی. ئەو باشترین نموونەی مرۆڤایەتییە بۆ ئێمە تا شوێنی بکەوین.",
        icon: "🕌"
    }
];

const ImanQuest = ({ t, language }) => {
    const [gameState, setGameState] = useState('start'); // start, playing, finished
    const [gameMode, setGameMode] = useState(null); // quiz, ramadan, prophets
    const [currentStage, setCurrentStage] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // State for Prophet Stories list navigation
    const [selectedProphetIndex, setSelectedProphetIndex] = useState(0);

    const startGame = (mode) => {
        setGameMode(mode);
        setGameState('playing');
        setCurrentStage(0);
        setScore(0);
        setSelectedOption(null);
        setShowExplanation(false);
        setSelectedProphetIndex(0);
    };

    const handleAnswer = (index) => {
        if (showExplanation || gameMode !== 'quiz') return;

        setSelectedOption(index);
        if (index === quizQuestions[currentStage].correct) {
            setScore(score + 10);
        }
        setShowExplanation(true);
    };

    const nextQuizQuestion = () => {
        if (currentStage < quizQuestions.length - 1) {
            setCurrentStage(currentStage + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setGameState('finished');
        }
    };

    const nextRamadanInfo = () => {
        if (currentStage < ramadanInfo.length - 1) {
            setCurrentStage(currentStage + 1);
        } else {
            setGameState('finished');
        }
    };

    const resetGame = () => {
        setGameState('start');
        setGameMode(null);
        setCurrentStage(0);
        setScore(0);
        setSelectedOption(null);
        setShowExplanation(false);
    };

    const direction = language === 'ku' ? 'rtl' : 'ltr';

    return (
        <section id="game" className="container" style={{ padding: '6rem 0', direction }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>گەشتی ئیمان</h2>
                <p style={{ color: 'var(--text-dim)' }}>زانیارییەکانت بەهێز بکە لەڕێگەی ئەم گەشتە ڕۆحییەوە.</p>
            </div>

            <div className="glass" style={{
                maxWidth: gameMode === 'prophets' ? '1000px' : '800px',
                margin: '0 auto',
                padding: gameMode === 'prophets' ? '0' : '3rem',
                minHeight: '550px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: gameState === 'start' ? 'center' : 'flex-start',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Glow */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 50%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
                    <AnimatePresence mode="wait">
                        {gameState === 'start' && (
                            <motion.div
                                key="start"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                style={{ textAlign: 'center' }}
                            >
                                <Award size={80} color="var(--primary)" style={{ marginBottom: '2rem' }} />
                                <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>ئامادەیت بۆ گەشتەکە؟</h3>
                                <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>
                                    جۆرێکیان هەڵبژێرە بۆ دەستپێکردن!
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => startGame('quiz')}
                                        className="glass-btn"
                                        style={{
                                            padding: '2rem',
                                            borderRadius: '20px',
                                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                                            border: '1px solid var(--primary-glow)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}
                                    >
                                        <BookOpen size={40} color="var(--primary)" />
                                        <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>پرسیار و وەڵام</span>
                                        <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>زانیاری گشتی ئیسلامی</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => startGame('ramadan')}
                                        style={{
                                            padding: '2rem',
                                            borderRadius: '20px',
                                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
                                            border: '1px solid rgba(16, 185, 129, 0.3)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}
                                    >
                                        <Moon size={40} color="var(--accent)" />
                                        <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>زانیاری ڕەمەزان</span>
                                        <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>تەنهـا زانیاری و فێربوون</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => startGame('prophets')}
                                        style={{
                                            padding: '2rem',
                                            borderRadius: '20px',
                                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 100%)',
                                            border: '1px solid rgba(139, 92, 246, 0.3)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}
                                    >
                                        <Sparkles size={40} color="#8b5cf6" />
                                        <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>چیرۆکی پێغەمبەران</span>
                                        <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>خوێندنەوەی چیرۆکەکان</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {gameState === 'playing' && (
                            <motion.div
                                key={`${gameMode}-${currentStage}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{ height: '100%' }}
                            >
                                {/* Mode Header/Back Button */}
                                {gameMode !== 'prophets' && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <button onClick={resetGame} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <ChevronLeft size={20} /> گەڕانەوە
                                        </button>
                                        {gameMode === 'quiz' && (
                                            <div style={{ color: 'white', fontWeight: 'bold' }}>خاڵەکان: {score}</div>
                                        )}
                                    </div>
                                )}

                                {/* Mode 1: Quiz */}
                                {gameMode === 'quiz' && (
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>پرسیاری {currentStage + 1} لە {quizQuestions.length}</div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'white' }}>{quizQuestions[currentStage].question}</h3>
                                        <div style={{ display: 'grid', gap: '1rem' }}>
                                            {quizQuestions[currentStage].options.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleAnswer(i)}
                                                    className="glass"
                                                    style={{
                                                        padding: '1.25rem',
                                                        textAlign: 'right',
                                                        border: selectedOption === i ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                                        background: showExplanation && i === quizQuestions[currentStage].correct ? 'rgba(16, 185, 129, 0.2)' :
                                                            showExplanation && i === selectedOption ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                                                        color: 'white',
                                                        cursor: showExplanation ? 'default' : 'pointer'
                                                    }}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                        {showExplanation && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                                                <p style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{quizQuestions[currentStage].explanation}</p>
                                                <button className="btn-primary" onClick={nextQuizQuestion} style={{ width: '100%' }}>پرسیاری دواتر</button>
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                {/* Mode 2: Ramadan Info */}
                                {gameMode === 'ramadan' && (
                                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', color: 'var(--accent)' }}>
                                            {ramadanInfo[currentStage].icon}
                                        </div>
                                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>{ramadanInfo[currentStage].title}</h3>
                                        <p style={{ fontSize: '1.25rem', color: 'var(--text-dim)', lineHeight: '1.8', marginBottom: '3rem' }}>{ramadanInfo[currentStage].content}</p>
                                        <button className="btn-primary" onClick={nextRamadanInfo} style={{ width: '100%' }}>
                                            {currentStage < ramadanInfo.length - 1 ? 'زانیاری دواتر' : 'کۆتایی فێربوون'}
                                        </button>
                                    </div>
                                )}

                                {/* Mode 3: Prophet Stories (Split Pane) */}
                                {gameMode === 'prophets' && (
                                    <div style={{ display: 'flex', height: '550px', background: 'rgba(0,0,0,0.2)' }}>
                                        {/* Left Sidebar: List of Stories */}
                                        <div style={{
                                            width: '300px',
                                            borderRight: '1px solid rgba(255,255,255,0.1)',
                                            padding: '1.5rem',
                                            overflowY: 'auto',
                                            background: 'rgba(255,255,255,0.02)'
                                        }}>
                                            <button onClick={resetGame} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <ChevronLeft size={18} /> گەڕانەوە
                                            </button>
                                            <h4 style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>لیستی پێغەمبەران</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {prophetStories.map((p, idx) => (
                                                    <button
                                                        key={p.id}
                                                        onClick={() => setSelectedProphetIndex(idx)}
                                                        style={{
                                                            padding: '1rem',
                                                            textAlign: 'right',
                                                            background: selectedProphetIndex === idx ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                                                            border: selectedProphetIndex === idx ? '1px solid #8b5cf6' : '1px solid transparent',
                                                            borderRadius: '10px',
                                                            color: selectedProphetIndex === idx ? 'white' : 'var(--text-dim)',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        <span>{p.icon}</span>
                                                        <span style={{ fontWeight: selectedProphetIndex === idx ? 'bold' : 'normal' }}>{p.title}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Side: Story Content */}
                                        <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', position: 'relative' }}>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={prophetStories[selectedProphetIndex].id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                >
                                                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                                                        {prophetStories[selectedProphetIndex].icon}
                                                    </div>
                                                    <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#8b5cf6', textAlign: 'center' }}>
                                                        {prophetStories[selectedProphetIndex].title}
                                                    </h3>
                                                    <p style={{ fontSize: '1.2rem', color: 'white', lineHeight: '2', textAlign: 'right', whiteSpace: 'pre-wrap' }}>
                                                        {prophetStories[selectedProphetIndex].content}
                                                    </p>
                                                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                                                        <button className="btn-primary" onClick={() => setGameState('finished')} style={{ background: '#8b5cf6', borderColor: '#8b5cf6' }}>
                                                            کۆتایی گەشت
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {gameState === 'finished' && (
                            <motion.div
                                key="finish"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center' }}
                            >
                                <Star size={80} color="var(--primary)" fill="var(--primary)" style={{ marginBottom: '2rem' }} />
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>دەستخۆش! گەشتەکە تەواو بوو</h3>
                                {gameMode === 'quiz' ? (
                                    <p style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '2rem' }}>تۆ {score} خاڵت کۆکردەوە!</p>
                                ) : (
                                    <p style={{ fontSize: '1.25rem', color: 'var(--text-dim)', marginBottom: '2rem' }}>هیوادارین سودت لەم زانیاریانە بینرابێت.</p>
                                )}
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    <button className="btn-primary" onClick={() => startGame(gameMode)}>دووبارە دەستپێکردن</button>
                                    <button className="btn-secondary" onClick={resetGame}>گەڕانەوە بۆ سەرەتا</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ImanQuest;
