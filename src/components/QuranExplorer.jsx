import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Play, Pause, ChevronRight, ChevronLeft, Loader2, Menu, X, AlertCircle, Search, Headphones, BookOpen, ScrollText, Sparkles, Share2, Link, Maximize, Minimize } from 'lucide-react';

const surahAyahCounts = { 1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109, 11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135, 21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60, 31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85, 41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45, 51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13, 61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44, 71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42, 81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20, 91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11, 101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3, 111: 5, 112: 4, 113: 5, 114: 6 };

const surahInfo = [
    { id: 1, name: { en: "Al-Fatihah", ku: "فاتیحە" }, arabic: "الفاتحة" },
    { id: 2, name: { en: "Al-Baqarah", ku: "بەقەرە" }, arabic: "البقرة" },
    { id: 3, name: { en: "Ali 'Imran", ku: "ئالی عیمران" }, arabic: "آل عمران" },
    { id: 4, name: { en: "An-Nisa", ku: "نیسا" }, arabic: "النساء" },
    { id: 5, name: { en: "Al-Ma'idah", ku: "مائیدە" }, arabic: "المائدة" },
    { id: 6, name: { en: "Al-An'am", ku: "ئەنسام" }, arabic: "الأنعام" },
    { id: 7, name: { en: "Al-A'raf", ku: "ئەعراف" }, arabic: "الأعراف" },
    { id: 8, name: { en: "Al-Anfal", ku: "ئەنفال" }, arabic: "الأنفال" },
    { id: 9, name: { en: "At-Tawbah", ku: "تەوبە" }, arabic: "التوبة" },
    { id: 10, name: { en: "Yunus", ku: "یونس" }, arabic: "يونس" },
    { id: 11, name: { en: "Hud", ku: "هود" }, arabic: "هود" },
    { id: 12, name: { en: "Yusuf", ku: "یوسف" }, arabic: "يوسف" },
    { id: 13, name: { en: "Ar-Ra'd", ku: "ڕەعد" }, arabic: "الرعد" },
    { id: 14, name: { en: "Ibrahim", ku: "ئیبراهیم" }, arabic: "ابراهيم" },
    { id: 15, name: { en: "Al-Hijr", ku: "حجر" }, arabic: "الحجر" },
    { id: 16, name: { en: "An-Nahl", ku: "نەحل" }, arabic: "النحل" },
    { id: 17, name: { en: "Al-Isra", ku: "ئیسرا" }, arabic: "الإسراء" },
    { id: 18, name: { en: "Al-Kahf", ku: "کەهف" }, arabic: "الكهف" },
    { id: 19, name: { en: "Maryam", ku: "مریەم" }, arabic: "مريم" },
    { id: 20, name: { en: "Taha", ku: "تەها" }, arabic: "طه" },
    { id: 21, name: { en: "Al-Anbya", ku: "ئەنبیا" }, arabic: "الأنبياء" },
    { id: 22, name: { en: "Al-Hajj", ku: "حەج" }, arabic: "الحج" },
    { id: 23, name: { en: "Al-Mu'minun", ku: "موئمینون" }, arabic: "المؤمنون" },
    { id: 24, name: { en: "An-Nur", ku: "نوور" }, arabic: "النور" },
    { id: 25, name: { en: "Al-Furqan", ku: "فورقان" }, arabic: "الفرقان" },
    { id: 26, name: { en: "Ash-Shu'ara", ku: "شوعەرا" }, arabic: "الشعراء" },
    { id: 27, name: { en: "An-Naml", ku: "نەمل" }, arabic: "النمل" },
    { id: 28, name: { en: "Al-Qasas", ku: "قەسەس" }, arabic: "القصص" },
    { id: 29, name: { en: "Al-'Ankabut", ku: "عەنکەبووت" }, arabic: "العنكبوت" },
    { id: 30, name: { en: "Ar-Rum", ku: "ڕووم" }, arabic: "الروم" },
    { id: 31, name: { en: "Luqman", ku: "لوقمان" }, arabic: "لقمان" },
    { id: 32, name: { en: "As-Sajdah", ku: "سەجدە" }, arabic: "السجدة" },
    { id: 33, name: { en: "Al-Ahzab", ku: "ئەحزاب" }, arabic: "الأحزاب" },
    { id: 34, name: { en: "Saba", ku: "سەبەء" }, arabic: "سبإ" },
    { id: 35, name: { en: "Fatir", ku: "فاتر" }, arabic: "فاطر" },
    { id: 36, name: { en: "Ya-Sin", ku: "یاسین" }, arabic: "يس" },
    { id: 37, name: { en: "As-Saffat", ku: "سافات" }, arabic: "الصافات" },
    { id: 38, name: { en: "Sad", ku: "ساد" }, arabic: "ص" },
    { id: 39, name: { en: "Az-Zumar", ku: "زومەر" }, arabic: "الزمر" },
    { id: 40, name: { en: "Ghafir", ku: "غافر" }, arabic: "غافر" },
    { id: 41, name: { en: "Fussilat", ku: "فوسسیلەت" }, arabic: "فصلت" },
    { id: 42, name: { en: "Ash-Shuraa", ku: "شوورا" }, arabic: "الشورى" },
    { id: 43, name: { en: "Az-Zukhruf", ku: "زوخروف" }, arabic: "الزخرف" },
    { id: 44, name: { en: "Ad-Dukhan", ku: "دوخان" }, arabic: "الدخان" },
    { id: 45, name: { en: "Al-Jathiyah", ku: "جاسیە" }, arabic: "الجاثية" },
    { id: 46, name: { en: "Al-Ahqaf", ku: "ئەحقاف" }, arabic: "الأحقاف" },
    { id: 47, name: { en: "Muhammad", ku: "موحەممەد" }, arabic: "محمد" },
    { id: 48, name: { en: "Al-Fath", ku: "فەتح" }, arabic: "الفتح" },
    { id: 49, name: { en: "Al-Hujurat", ku: "حوجورات" }, arabic: "الحجرات" },
    { id: 50, name: { en: "Qaf", ku: "قاف" }, arabic: "ق" },
    { id: 51, name: { en: "Adh-Dhariyat", ku: "زاریات" }, arabic: "الذاريات" },
    { id: 52, name: { en: "At-Tur", ku: "توور" }, arabic: "الطور" },
    { id: 53, name: { en: "An-Najm", ku: "نەجم" }, arabic: "النجم" },
    { id: 54, name: { en: "Al-Qamar", ku: "قەمەر" }, arabic: "القمر" },
    { id: 55, name: { en: "Ar-Rahman", ku: "ڕەحمان" }, arabic: "الرحمن" },
    { id: 56, name: { en: "Al-Waqi'ah", ku: "واقیعە" }, arabic: "الواقعة" },
    { id: 57, name: { en: "Al-Hadid", ku: "حەدید" }, arabic: "الحديد" },
    { id: 58, name: { en: "Al-Mujadila", ku: "موجادیلە" }, arabic: "المجادلة" },
    { id: 59, name: { en: "Al-Hashr", ku: "حەشر" }, arabic: "الحشر" },
    { id: 60, name: { en: "Al-Mumtahanah", ku: "مومتەحەنە" }, arabic: "الممتحنة" },
    { id: 61, name: { en: "As-Saf", ku: "سەف" }, arabic: "الصف" },
    { id: 62, name: { en: "Al-Jumu'ah", ku: "جومعە" }, arabic: "الجمعة" },
    { id: 63, name: { en: "Al-Munafiqun", ku: "مونافیقون" }, arabic: "المنافقون" },
    { id: 64, name: { en: "At-Taghabun", ku: "تەغابون" }, arabic: "التغابن" },
    { id: 65, name: { en: "At-Talaq", ku: "تەڵاق" }, arabic: "الطلاق" },
    { id: 66, name: { en: "At-Tahrim", ku: "تەحریم" }, arabic: "التحريم" },
    { id: 67, name: { en: "Al-Mulk", ku: "مولک" }, arabic: "الملك" },
    { id: 68, name: { en: "Al-Qalam", ku: "قەلەم" }, arabic: "القلم" },
    { id: 69, name: { en: "Al-Haqqah", ku: "حەققە" }, arabic: "الحاقة" },
    { id: 70, name: { en: "Al-Ma'arij", ku: "مەعاریج" }, arabic: "المعارج" },
    { id: 71, name: { en: "Nuh", ku: "نووح" }, arabic: "نوح" },
    { id: 72, name: { en: "Al-Jinn", ku: "جن" }, arabic: "الجن" },
    { id: 73, name: { en: "Al-Muzzammil", ku: "موزەممیل" }, arabic: "المزمل" },
    { id: 74, name: { en: "Al-Muddaththir", ku: "مودەسیری" }, arabic: "المدثر" },
    { id: 75, name: { en: "Al-Qiyamah", ku: "قیامە" }, arabic: "القيامة" },
    { id: 76, name: { en: "Al-Insan", ku: "ئینسان" }, arabic: "الانسان" },
    { id: 77, name: { en: "Al-Mursalat", ku: "مورسەلات" }, arabic: "المرسلات" },
    { id: 78, name: { en: "An-Naba", ku: "نەبەء" }, arabic: "النبإ" },
    { id: 79, name: { en: "An-Nazi'at", ku: "نازیعات" }, arabic: "النازعات" },
    { id: 80, name: { en: "'Abasa", ku: "عەبەسە" }, arabic: "عبس" },
    { id: 81, name: { en: "At-Takwir", ku: "تەکوییر" }, arabic: "التكوير" },
    { id: 82, name: { en: "Al-Infitar", ku: "ئینفیتار" }, arabic: "الإنفطار" },
    { id: 83, name: { en: "Al-Mutaffifin", ku: "موتەفففیفین" }, arabic: "المطففين" },
    { id: 84, name: { en: "Al-Inshiqaq", ku: "ئینشیقاق" }, arabic: "الإنشقاق" },
    { id: 85, name: { en: "Al-Buruj", ku: "بورووج" }, arabic: "البروج" },
    { id: 86, name: { en: "At-Tariq", ku: "تاریق" }, arabic: "الطارق" },
    { id: 87, name: { en: "Al-A'la", ku: "ئەعلا" }, arabic: "الأعلى" },
    { id: 88, name: { en: "Al-Ghashiyah", ku: "غاسیە" }, arabic: "الغاشية" },
    { id: 89, name: { en: "Al-Fajr", ku: "فەجر" }, arabic: "الفجر" },
    { id: 90, name: { en: "Al-Balad", ku: "بەلەد" }, arabic: "البلد" },
    { id: 91, name: { en: "Ash-Shams", ku: "شەمس" }, arabic: "الشمس" },
    { id: 92, name: { en: "Al-Layl", ku: "لەیل" }, arabic: "الليل" },
    { id: 93, name: { en: "Ad-Duhaa", ku: "زوحا" }, arabic: "الضحى" },
    { id: 94, name: { en: "Ash-Sharh", ku: "شەرح" }, arabic: "الشرح" },
    { id: 95, name: { en: "At-Tin", ku: "تین" }, arabic: "التين" },
    { id: 96, name: { en: "Al-'Alaq", ku: "عەلەق" }, arabic: "العلق" },
    { id: 97, name: { en: "Al-Qadr", ku: "قەدەر" }, arabic: "القدر" },
    { id: 98, name: { en: "Al-Bayyinah", ku: "بەیینە" }, arabic: "البينة" },
    { id: 99, name: { en: "Az-Zalzalah", ku: "زەلزەلە" }, arabic: "الزلزلة" },
    { id: 100, name: { en: "Al-'Adiyat", ku: "عادیات" }, arabic: "العاديات" },
    { id: 101, name: { en: "Al-Qari'ah", ku: "قاریعە" }, arabic: "القارعة" },
    { id: 102, name: { en: "At-Takathur", ku: "تەکاسور" }, arabic: "التكاثر" },
    { id: 103, name: { en: "Al-'Asr", ku: "عەسر" }, arabic: "العصر" },
    { id: 104, name: { en: "Al-Humazah", ku: "هومەزە" }, arabic: "الهمزة" },
    { id: 105, name: { en: "Al-Fil", ku: "فیل" }, arabic: "الفيل" },
    { id: 106, name: { en: "Quraysh", ku: "قورەیش" }, arabic: "قريش" },
    { id: 107, name: { en: "Al-Ma'un", ku: "ماعون" }, arabic: "الماعون" },
    { id: 108, name: { en: "Al-Kawthar", ku: "کەوسەر" }, arabic: "الكوثر" },
    { id: 109, name: { en: "Al-Kafirun", ku: "کافیرون" }, arabic: "الكافرون" },
    { id: 110, name: { en: "An-Nasr", ku: "نەسر" }, arabic: "النصر" },
    { id: 111, name: { en: "Al-Masad", ku: "مەسەد" }, arabic: "المسد" },
    { id: 112, name: { en: "Al-Ikhlas", ku: "ئیخلاس" }, arabic: "الإخلاص" },
    { id: 113, name: { en: "Al-Falaq", ku: "فەلەق" }, arabic: "الفلق" },
    { id: 114, name: { en: "An-Nas", ku: "ناس" }, arabic: "الناس" }
];

const reciters = [
    { id: 'ar.alafasy', name: { en: 'Mishary Rashid Alafasy', ku: 'مشاری راشید العفاسی' } },
    { id: 'ar.abdulbasitmurattal', name: { en: 'Abdul Basit (Murattal)', ku: 'عبدالباسط عبدالصمد (مورەتەل)' } },
    { id: 'ar.abdullahbasfar', name: { en: 'Abdullah Basfar', ku: 'عبدالله بصفر' } },
    { id: 'ar.abdurrahmaansudais', name: { en: 'Abdurrahmaan As-Sudais', ku: 'عبدالرحمن السدیس' } },
    { id: 'ar.shaatree', name: { en: 'Abu Bakr Ash-Shatri', ku: 'ابوبکر الشاطری' } },
    { id: 'ar.ahmedajamy', name: { en: 'Ahmed al-Ajmy', ku: 'احمد العجمی' } },
    { id: 'ar.hanirifai', name: { en: 'Hani Ar-Rifai', ku: 'هانی الرفاعی' } },
    { id: 'ar.husary', name: { en: 'Mahmoud Khalil Al-Husary', ku: 'محمود خلیل الحصری' } },
    { id: 'ar.mahermuaiqly', name: { en: 'Maher Al Muaiqly', ku: 'ماهر المعیقلی' } },
    { id: 'ar.saoodshuraym', name: { en: 'Saood ash-Shuraym', ku: 'سعود الشریم' } }
];

const QuranExplorer = ({ t, language }) => {
    const [selectedSurahIndex, setSelectedSurahIndex] = useState(0);
    const [viewMode, setViewMode] = useState('ayah'); // 'ayah' | 'page'
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingAyah, setCurrentPlayingAyah] = useState(null);
    const [showTafseer, setShowTafseer] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activePageIdx, setActivePageIdx] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedReciter, setSelectedReciter] = useState(reciters[0].id);
    const [showReciterMenu, setShowReciterMenu] = useState(false);
    const explorerRef = useRef(null); // For fullscreen
    const containerRef = useRef(null);
    const audioRef = useRef(new Audio());
    const ayahRefs = useRef({});

    useEffect(() => {
        const fetchSurahData = async () => {
            setLoading(true);
            setError(null);

            const surahId = surahInfo[selectedSurahIndex].id;

            try {
                // Parallel fetch for text and metadata
                const [araRes, enRes, kuRes, tafRes, metaRes] = await Promise.all([
                    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanienc/${surahId}.json`),
                    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-ummmuhammad/${surahId}.json`),
                    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/kur-burhanmuhammada/${surahId}.json`),
                    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/kur-muhammadsalehba/${surahId}.json`),
                    fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surahId}?language=en&per_page=500`)
                ]);

                if (!araRes.ok || !enRes.ok || !kuRes.ok || !tafRes.ok || !metaRes.ok) throw new Error("Connection Error");

                const [ara, en, ku, taf, meta] = await Promise.all([
                    araRes.json(), enRes.json(), kuRes.json(), tafRes.json(), metaRes.json()
                ]);

                const combined = ara.chapter.map((v, i) => ({
                    id: i + 1,
                    arabic: v.text,
                    en: en.chapter[i]?.text,
                    ku: ku.chapter[i]?.text,
                    tafseer: taf.chapter[i]?.text,
                    page: meta.verses[i]?.page_number || 1
                }));

                setVerses(combined);
                setActivePageIdx(0);
                if (containerRef.current) containerRef.current.scrollTo(0, 0);

                // Reset audio when surah changes
                audioRef.current.pause();
                setIsPlaying(false);
                setCurrentPlayingAyah(null);
            } catch (err) {
                console.error("Quran Fetch Error:", err);

                // Partial Fallback locally if network fails for metadata
                if (surahId === 1) {
                    const fatihahFallback = [
                        { id: 1, arabic: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", en: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", ku: "بەناوی خودای بەخشندەی میهرەبان", tafseer: "دەست پێ دەکەم بە ناوی ئەو خودایەی کە ناوی (الله)ـیە، و زۆر بەبەزەیی و میهرەبانە بۆ هەموو دروستکراوەکانی لە دنیادا و تایبەت بۆ باوەڕداران لە قیامەتدا.", page: 1 },
                        { id: 2, arabic: "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَـٰلَمِینَ", en: "[All] praise is [due] to Allah, Lord of the worlds -", ku: "سوپاس و ستایش بۆ پەروەردگاری جیهانیان", tafseer: "هەموو جۆرە سوپاس و ستایشێکی شایستە تەنها بۆ خودایە کە بەدیهێنەر و پەروەردگاری هەموو جیهانیانە.", page: 1 },
                        { id: 3, arabic: "ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", en: "The Entirely Merciful, the Especially Merciful,", ku: "بەخشندەی میهرەبان", tafseer: "خودایەک کە زۆر بەبەزەییە بۆ هەموو دروستکراوەکانی و زۆر میهرەبانە بۆ باوەڕداران.", page: 1 },
                        { id: 4, arabic: "مَـٰلِكِ یَوۡمِ ٱلدِّینِ", en: "Sovereign of the Day of Recompense.", ku: "خاوەنی ڕۆژی دوایی", tafseer: "تەنها خودا خاوەن و دەسەڵاتداری ڕۆژی قیامەتە کە تێیدا پاداشت و سزای خەڵکی دەدرێتەوە.", page: 1 },
                        { id: 5, arabic: "إِیَّاكَ نَعۡبُدُ وَإِیَّاكَ نَسۡتَعِینُ", en: "It is You we worship and You we ask for help.", ku: "تەنها تۆ دەپەرستین و تەنها لە تۆش یارمەتی دەخوازین", tafseer: "ئێمە تەنها تۆ بە تاک و تەنها دەپەرستين و تەنها لە تۆش داوای کۆمەک و یارمەتی دەکەین.", page: 1 },
                        { id: 6, arabic: "ٱهۡدِنَا ٱلصِّرَ ٰطَ ٱلۡمُسۡتَقِیمَ", en: "Guide us to the straight path -", ku: "شارەزامان بکە لە ڕێگای ڕاست", tafseer: "ئەی پەروەردگار، هیدایەتمان بدە و جێگیرمان بکە لەسەر ڕێگای ڕاست کە ئیسلامە.", page: 1 },
                        { id: 7, arabic: "صِرَ ٰطَ ٱلَّذِینَ أَنۡعَمۡتَ عَلَیۡهِمۡ غەیۡرِ ٱلۡمَغۡضُوبِ عَلَیۡهِمۡ وَلَا ٱلضَّاۤلِّینَ", en: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.", ku: "ڕێگای ئەوانەی کە نیعمەتت ڕشتووە بەسەریاندا، نەک ئەوانەی خەشم لێگیراون و نە ئەوانەی سەرلێشێواون", tafseer: "ڕێگای ئەو پێغەمبەر و پیاوچاکانەی کە نیعمەتت پێ بەخشین، نەک ڕێگای ئەو جوولەکانەی خەشم لێگیراون یان گاورەکان کە لە ڕێگا لایانداوە.", page: 1 }
                    ];
                    setVerses(fatihahFallback);
                } else {
                    setError(language === 'ku' ? "دڵنیابەرەوە لە پەیوەندی ئینتەرنێتەکەت (یان ئەم سورەتە دواتر باردەکرێت)" : "Please check your internet connection or try again later.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchSurahData();
    }, [selectedSurahIndex]);

    // Audio Playback Logic
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            if (currentPlayingAyah < verses.length) {
                playAyah(currentPlayingAyah + 1);
            } else {
                setIsPlaying(false);
                setCurrentPlayingAyah(null);
            }
        };

        audio.addEventListener('ended', handleEnded);
        return () => audio.removeEventListener('ended', handleEnded);
    }, [currentPlayingAyah, verses, selectedReciter]);

    // Update audio source when reciter changes
    useEffect(() => {
        if (currentPlayingAyah !== null) {
            const surahId = surahInfo[selectedSurahIndex].id;
            const globalId = surahInfo.slice(0, selectedSurahIndex).reduce((acc, s) => acc + (surahAyahCounts[s.id] || 0), 0) + currentPlayingAyah;
            const wasPlaying = isPlaying; // Rely on state we manage

            // 1. Force pause to clear buffer/stream
            audioRef.current.pause();

            // 2. Update source
            audioRef.current.src = `https://cdn.islamic.network/quran/audio/64/${selectedReciter}/${globalId}.mp3`;

            // 3. Force load properly
            audioRef.current.load();

            // 4. Resume if needed
            if (wasPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Auto-switch playback failed:", error);
                        // Optional: setIsPlaying(false) if we want to reflect failure
                    });
                }
            }
        }
    }, [selectedReciter]);

    const playAyah = (id) => {
        const surahId = surahInfo[selectedSurahIndex].id;
        // Global Ayah number calculation if needed, but the CDN also supports chapter-based paths or meta mappings
        // For simplicity and 100% reliability, we calculate the global index based on a standard mapping or 
        // use the surah-specific ayah index if the API supports it.
        // alquran.cloud uses global ayah IDs (1-6236). 
        // We'll calculate it: sum of previous surahs ayahs + current id.
        const globalId = surahInfo.slice(0, selectedSurahIndex).reduce((acc, s) => acc + (surahAyahCounts[s.id] || 0), 0) + id;

        audioRef.current.src = `https://cdn.islamic.network/quran/audio/64/${selectedReciter}/${globalId}.mp3`;
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentPlayingAyah(id);

        // Scroll into view
        if (ayahRefs.current[id]) {
            ayahRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // Fullscreen Sync
    useEffect(() => {
        const handleFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const toggleMainPlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (currentPlayingAyah) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                playAyah(1); // Start from first verse
            }
        }
    };

    const copyVerseLink = (id) => {
        const surahId = surahInfo[selectedSurahIndex].id;
        const link = `https://quran.com/${surahId}/${id}`;
        navigator.clipboard.writeText(link);
        // Simple visual feedback could be added here
    };

    const shareSurahLink = () => {
        const link = window.location.href.split('#')[0] + `#quran?surah=${surahInfo[selectedSurahIndex].id}`;
        navigator.clipboard.writeText(link);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            explorerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const navigateSurah = (direction) => {
        const nextIdx = selectedSurahIndex + direction;
        if (nextIdx >= 0 && nextIdx < surahInfo.length) {
            setSelectedSurahIndex(nextIdx);
        }
    };

    const navigatePage = (direction) => {
        // Find unique pages in current surah
        const uniquePages = [...new Set(verses.map(v => v.page))].sort((a, b) => a - b);

        const nextIdx = activePageIdx + direction;
        if (nextIdx >= 0 && nextIdx < uniquePages.length) {
            setActivePageIdx(nextIdx);
            const targetPage = uniquePages[nextIdx];
            const firstVerseOfPage = verses.find(v => v.page === targetPage);
            if (firstVerseOfPage && ayahRefs.current[firstVerseOfPage.id]) {
                ayahRefs.current[firstVerseOfPage.id].scrollIntoView({ behavior: 'smooth' });
            }
        } else if (nextIdx >= uniquePages.length) {
            // Next Surah
            navigateSurah(1);
        } else if (nextIdx < 0) {
            // Prev Surah
            navigateSurah(-1);
        }
    };

    const filteredSurahs = surahInfo.filter(s =>
        s.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.ku.includes(searchQuery) ||
        s.id.toString().includes(searchQuery)
    );

    const direction = language === 'ku' ? 'rtl' : 'ltr';

    return (
        <section id="quran" ref={explorerRef} className="container" style={{
            padding: isFullscreen ? '0' : '8rem 0',
            direction,
            background: isFullscreen ? '#020408' : 'transparent',
            maxWidth: isFullscreen ? '100%' : '1300px',
            minHeight: isFullscreen ? '100vh' : 'auto'
        }}>
            {/* Elegant Header */}
            {!isFullscreen && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '6rem',
                    textAlign: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        style={{
                            width: '80px', height: '80px', borderRadius: '24px',
                            background: 'linear-gradient(135deg, #D4AF37, #996515)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'black', boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)',
                            marginBottom: '2rem', position: 'relative'
                        }}
                    >
                        <Book size={36} />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{
                                position: 'absolute', inset: -10, borderRadius: '30px',
                                border: '1px solid var(--primary)', opacity: 0.2
                            }}
                        />
                    </motion.div>
                    <h2 style={{
                        fontSize: '4.5rem',
                        fontWeight: '900',
                        color: 'white',
                        marginBottom: '1rem',
                        letterSpacing: '-2px',
                        background: 'linear-gradient(to bottom, #fff, #aaa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: 'Playfair Display'
                    }}>
                        {t.quran_explorer}
                    </h2>
                    <p style={{ color: 'var(--primary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: '800' }}>
                        {t.reflect_words}
                    </p>
                </div>
            )}

            <div style={{
                display: 'flex',
                height: isFullscreen ? '100vh' : '900px',
                background: 'rgba(5, 8, 15, 0.4)',
                backdropFilter: 'blur(40px)',
                borderRadius: isFullscreen ? '0' : '50px',
                overflow: 'hidden',
                border: isFullscreen ? 'none' : '1px solid rgba(212, 175, 55, 0.1)',
                boxShadow: isFullscreen ? 'none' : '0 60px 120px rgba(0,0,0,0.6)',
                position: 'relative'
            }}>
                {/* Modern Sidebar */}
                <div style={{
                    width: '380px',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(255,255,255,0.01)',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <div style={{ padding: '3rem 2rem' }}>
                        <div style={{
                            position: 'relative',
                            background: 'rgba(212, 175, 55, 0.03)',
                            borderRadius: '24px',
                            border: '1px solid rgba(212, 175, 55, 0.1)',
                            padding: '0.4rem',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
                        }}>
                            <Search style={{
                                position: 'absolute',
                                left: direction === 'rtl' ? '1.5rem' : 'auto',
                                right: direction === 'ltr' ? '1.5rem' : 'auto',
                                top: '50%', transform: 'translateY(-50%)', opacity: 0.4
                            }} size={20} color="var(--primary)" />
                            <input
                                type="text"
                                placeholder={language === 'ku' ? 'گەڕان بۆ سورەت...' : 'Search Surah...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem 1.5rem',
                                    paddingRight: direction === 'ltr' ? '3.5rem' : '1.5rem',
                                    paddingLeft: direction === 'rtl' ? '3.5rem' : '1.5rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '500'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem 2.5rem 1.5rem' }} className="custom-scroll">
                        {filteredSurahs.map((surah) => {
                            const originalIdx = surahInfo.findIndex(s => s.id === surah.id);
                            const isActive = selectedSurahIndex === originalIdx;
                            return (
                                <motion.div
                                    key={surah.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{ position: 'relative', marginBottom: '0.8rem' }}
                                >
                                    <button
                                        onClick={() => {
                                            setSelectedSurahIndex(originalIdx);
                                            if (window.innerWidth < 1024) toggleSidebar();
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '1.2rem 1.4rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1.2rem',
                                            borderRadius: '24px',
                                            background: isActive ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))' : 'transparent',
                                            border: isActive ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid transparent',
                                            color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                                            cursor: 'pointer',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            textAlign: direction === 'rtl' ? 'right' : 'left',
                                            position: 'relative'
                                        }}
                                        onMouseOver={e => !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                                        onMouseOut={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                                    >
                                        <div style={{
                                            width: '46px', height: '46px', borderRadius: '14px',
                                            background: isActive ? 'linear-gradient(135deg, #D4AF37, #996515)' : 'rgba(212, 175, 55, 0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: isActive ? 'black' : 'var(--primary)',
                                            fontSize: '1rem', fontWeight: '900',
                                            flexShrink: 0,
                                            boxShadow: isActive ? '0 8px 20px rgba(212,175,55,0.3)' : 'none'
                                        }}>
                                            {surah.id}
                                        </div>
                                        <div style={{ flex: 1, textAlign: direction === 'rtl' ? 'right' : 'left' }}>
                                            <div style={{
                                                fontWeight: '800',
                                                fontSize: '1.1rem',
                                                marginBottom: '0.1rem',
                                                color: isActive ? 'white' : 'inherit'
                                            }}>
                                                {surah.name[language]}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                opacity: 0.5,
                                                fontFamily: 'var(--font-display)',
                                                color: isActive ? 'var(--primary)' : 'inherit'
                                            }}>
                                                {surah.arabic}
                                            </div>
                                        </div>
                                        {isActive && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <Sparkles size={16} color="var(--primary)" />
                                            </motion.div>
                                        )}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Immersive Area */}
                <div
                    ref={containerRef}
                    style={{ flex: 1, overflowY: 'auto', position: 'relative', background: '#05080f' }}
                    className="custom-scroll"
                >
                    <div style={{
                        position: 'sticky', top: 0, zIndex: 10,
                        background: 'rgba(2, 4, 8, 0.85)', backdropFilter: 'blur(30px)',
                        padding: isFullscreen ? '1.5rem 3rem' : '2.5rem 5rem',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}>
                        <div style={{ textAlign: language === 'ku' ? 'right' : 'left' }}>
                            <motion.h3
                                key={selectedSurahIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ fontSize: isFullscreen ? '2.5rem' : '3.5rem', fontWeight: '900', color: 'white', letterSpacing: '-1.5px' }}
                            >
                                {surahInfo[selectedSurahIndex].name[language]}
                            </motion.h3>
                            <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', alignItems: 'center' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1rem', color: 'var(--primary)', fontWeight: '700' }}>
                                    <ScrollText size={18} /> {verses.length}
                                </span>
                                <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'white', opacity: 0.6 }}>
                                    {surahInfo[selectedSurahIndex].arabic}
                                </span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {/* Control Icons Cluster */}
                            <div style={{ display: 'flex', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '20px', padding: '0.4rem', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                                <button
                                    onClick={toggleFullscreen}
                                    style={{
                                        width: '46px', height: '46px', borderRadius: '15px',
                                        background: 'transparent', color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', transition: 'all 0.3s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                </button>
                            </div>

                            {/* Reciter Selection */}
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setShowReciterMenu(!showReciterMenu)}
                                    style={{
                                        padding: '0.8rem 1.2rem',
                                        borderRadius: '20px',
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        color: 'var(--primary)',
                                        border: '1px solid rgba(212, 175, 55, 0.2)',
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                                    }}
                                >
                                    <Headphones size={18} />
                                    <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {(() => {
                                            const r = reciters.find(r => r.id === selectedReciter);
                                            return r ? r.name[language].split(' ')[0] : '';
                                        })()}
                                    </span>
                                </button>
                                {showReciterMenu && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '110%',
                                        right: 0,
                                        width: '260px',
                                        background: '#0a0f18',
                                        border: '1px solid rgba(212, 175, 55, 0.2)',
                                        borderRadius: '20px',
                                        padding: '0.5rem',
                                        zIndex: 100,
                                        maxHeight: '300px',
                                        overflowY: 'auto'
                                    }}>
                                        {reciters.map(reciter => (
                                            <button
                                                key={reciter.id}
                                                onClick={() => {
                                                    setSelectedReciter(reciter.id);
                                                    setShowReciterMenu(false);
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem 1rem',
                                                    textAlign: 'left',
                                                    background: selectedReciter === reciter.id ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
                                                    color: selectedReciter === reciter.id ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    cursor: 'pointer',
                                                    marginBottom: '2px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: selectedReciter === reciter.id ? 'bold' : 'normal'
                                                }}
                                            >
                                                {reciter.name[language]}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* View Toggle */}
                            <div style={{
                                display: 'flex',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '20px',
                                padding: '0.4rem',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <button
                                    onClick={() => setViewMode('ayah')}
                                    style={{
                                        padding: '0.6rem 1.4rem',
                                        borderRadius: '16px',
                                        background: viewMode === 'ayah' ? 'var(--primary)' : 'transparent',
                                        color: viewMode === 'ayah' ? 'black' : 'white',
                                        border: 'none',
                                        fontWeight: '900',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    {language === 'ku' ? 'ئایەت' : 'Ayah'}
                                </button>
                                <button
                                    onClick={() => setViewMode('page')}
                                    style={{
                                        padding: '0.6rem 1.4rem',
                                        borderRadius: '16px',
                                        background: viewMode === 'page' ? 'var(--primary)' : 'transparent',
                                        color: viewMode === 'page' ? 'black' : 'white',
                                        border: 'none',
                                        fontWeight: '900',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    {language === 'ku' ? 'لاپەڕە' : 'Page'}
                                </button>
                            </div>

                            <button
                                onClick={() => setShowTafseer(!showTafseer)}
                                style={{
                                    padding: '0.8rem 1.8rem', borderRadius: '20px',
                                    background: showTafseer ? 'var(--primary)' : 'rgba(212, 175, 55, 0.1)',
                                    color: showTafseer ? 'black' : 'var(--primary)',
                                    border: '1px solid rgba(212, 175, 55, 0.2)',
                                    fontWeight: '900',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {t.tafseer}
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMainPlay}
                                style={{
                                    width: '64px', height: '64px', borderRadius: '24px',
                                    background: 'linear-gradient(135deg, #D4AF37, #996515)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'black', border: 'none', cursor: 'pointer'
                                }}
                            >
                                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                            </motion.button>
                        </div>
                    </div>

                    <div style={{ padding: viewMode === 'page' ? '3rem 10%' : '6rem 10%' }}>
                        {loading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', marginTop: '10rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <Loader2 size={80} className="animate-spin" color="var(--primary)" style={{ opacity: 0.2 }} />
                                    <Sparkles size={30} color="var(--primary)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                </div>
                                <p style={{ color: 'var(--text-dim)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    Verifying Holy Verses...
                                </p>
                            </div>
                        ) : error ? (
                            <div style={{ textAlign: 'center', marginTop: '10rem', background: 'rgba(255,0,0,0.05)', padding: '4rem', borderRadius: '30px', border: '1px solid rgba(255,0,0,0.1)' }}>
                                <AlertCircle size={60} color="#ff4444" style={{ margin: '0 auto 2rem' }} />
                                <p style={{ color: '#ff4444', fontSize: '1.2rem' }}>{error}</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: viewMode === 'page' ? '6rem' : '8rem' }}>
                                {viewMode === 'ayah' ? (
                                    verses.map((v, idx) => (
                                        <motion.div
                                            key={idx}
                                            ref={el => ayahRefs.current[v.id] = el}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            style={{
                                                display: 'flex', flexDirection: 'column', gap: '4rem',
                                                background: currentPlayingAyah === v.id ? 'rgba(212, 175, 55, 0.03)' : 'transparent',
                                                borderRadius: '30px', padding: '2rem', transition: 'all 0.5s'
                                            }}
                                        >
                                            <div style={{
                                                fontSize: '3rem',
                                                lineHeight: '2',
                                                textAlign: 'center',
                                                fontFamily: 'var(--font-display)',
                                                color: currentPlayingAyah === v.id ? 'var(--primary)' : 'white',
                                                direction: 'rtl',
                                                textShadow: currentPlayingAyah === v.id ? '0 0 30px rgba(212, 175, 55, 0.3)' : '0 10px 40px rgba(0,0,0,0.5)',
                                                position: 'relative'
                                            }}>
                                                {v.arabic}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '1.5rem',
                                                    marginTop: '3.5rem'
                                                }}>
                                                    <div style={{ width: '80px', height: '1.5px', background: 'linear-gradient(to left, var(--primary), transparent)', opacity: 0.2 }} />
                                                    <button
                                                        onClick={() => playAyah(v.id)}
                                                        style={{
                                                            width: '60px', height: '60px',
                                                            border: '2px solid rgba(212, 175, 55, 0.4)', borderRadius: '18px',
                                                            fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            color: currentPlayingAyah === v.id ? 'black' : 'var(--primary)',
                                                            background: currentPlayingAyah === v.id ? 'linear-gradient(135deg, #D4AF37, #996515)' : 'rgba(212, 175, 55, 0.05)',
                                                            fontWeight: '900', transform: 'rotate(45deg)', cursor: 'pointer',
                                                            boxShadow: currentPlayingAyah === v.id ? '0 10px 25px rgba(212, 175, 55, 0.4)' : 'none',
                                                            transition: 'all 0.4s'
                                                        }}>
                                                        <span style={{ transform: 'rotate(-45deg)' }}>{v.id}</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {showTafseer && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <div style={{
                                                            background: 'rgba(255,255,255,0.02)',
                                                            borderRadius: '35px',
                                                            padding: '3.5rem',
                                                            border: '1px solid rgba(255,255,255,0.04)',
                                                            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)'
                                                        }}>
                                                            <div style={{
                                                                fontSize: '1.5rem',
                                                                lineHeight: '2.2',
                                                                color: 'rgba(255,255,255,0.85)',
                                                                marginBottom: '3.5rem',
                                                                textAlign: language === 'ku' ? 'right' : 'left',
                                                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                                paddingBottom: '3.5rem'
                                                            }}>
                                                                <div style={{ opacity: 0.3, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1.5rem' }}>
                                                                    {language === 'ku' ? 'واتا' : 'Translation'}
                                                                </div>
                                                                {v[language]}
                                                            </div>
                                                            <div style={{
                                                                fontSize: '1.4rem',
                                                                lineHeight: '2.1',
                                                                color: 'var(--primary)',
                                                                textAlign: 'right'
                                                            }}>
                                                                <div style={{ opacity: 0.4, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1.5rem' }}>
                                                                    تەفسیری بامۆکی
                                                                </div>
                                                                {v.tafseer}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))
                                ) : (
                                    // Page View Logic: Grouping verses by page
                                    Object.entries(verses.reduce((acc, v) => {
                                        if (!acc[v.page]) acc[v.page] = [];
                                        acc[v.page].push(v);
                                        return acc;
                                    }, {})).map(([pageNum, pageVerses], pIdx) => (
                                        <motion.div
                                            key={pageNum}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            style={{
                                                background: 'rgba(212, 175, 55, 0.01)',
                                                borderRadius: '30px',
                                                padding: isFullscreen ? '2rem' : '3rem',
                                                border: '1px solid rgba(212, 175, 55, 0.05)',
                                                position: 'relative',
                                                margin: '0 auto',
                                                maxWidth: '900px'
                                            }}
                                        >
                                            <div style={{
                                                position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)',
                                                fontSize: '0.7rem', opacity: 0.3, letterSpacing: '2px', textTransform: 'uppercase'
                                            }}>
                                                Page {pageNum}
                                            </div>

                                            <div style={{
                                                fontSize: isFullscreen ? '2.2rem' : '1.8rem',
                                                lineHeight: '2.2',
                                                textAlign: 'justify',
                                                fontFamily: 'var(--font-display)',
                                                color: '#fff',
                                                direction: 'rtl'
                                            }}>
                                                {pageVerses.map((v, vIdx) => (
                                                    <span
                                                        key={v.id}
                                                        ref={el => ayahRefs.current[v.id] = el}
                                                        style={{
                                                            position: 'relative',
                                                            background: currentPlayingAyah === v.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                                            borderRadius: '10px', transition: 'background 0.3s'
                                                        }}
                                                    >
                                                        {v.arabic}
                                                        <span
                                                            onClick={() => playAyah(v.id)}
                                                            style={{
                                                                fontSize: '0.9rem',
                                                                margin: '0 1rem',
                                                                display: 'inline-flex',
                                                                width: '38px', height: '38px',
                                                                alignItems: 'center', justifyContent: 'center',
                                                                border: currentPlayingAyah === v.id ? '2px solid var(--primary)' : '1px solid rgba(212, 175, 55, 0.3)',
                                                                borderRadius: '12px',
                                                                color: currentPlayingAyah === v.id ? 'black' : 'var(--primary)',
                                                                background: currentPlayingAyah === v.id ? 'linear-gradient(135deg, #D4AF37, #996515)' : 'rgba(212, 175, 55, 0.05)',
                                                                verticalAlign: 'middle',
                                                                fontWeight: '900',
                                                                cursor: 'pointer',
                                                                transform: 'rotate(45deg)',
                                                                boxShadow: currentPlayingAyah === v.id ? '0 5px 15px rgba(212, 175, 55, 0.3)' : 'none',
                                                                transition: 'all 0.3s'
                                                            }}
                                                        >
                                                            <span style={{ transform: 'rotate(-45deg)' }}>{v.id}</span>
                                                        </span>
                                                        {showTafseer && (
                                                            <div style={{
                                                                display: 'block',
                                                                background: 'rgba(255,255,255,0.02)',
                                                                padding: '2rem',
                                                                borderRadius: '25px',
                                                                margin: '2rem 0',
                                                                fontSize: '1.2rem',
                                                                lineHeight: '1.8',
                                                                color: 'rgba(255,255,255,0.7)',
                                                                textAlign: language === 'ku' ? 'right' : 'left',
                                                                borderLeft: language === 'en' ? '4px solid var(--primary)' : 'none',
                                                                borderRight: language === 'ku' ? '4px solid var(--primary)' : 'none'
                                                            }}>
                                                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>Ayah {v.id}:</strong>
                                                                {v[language]}
                                                                <div style={{ marginTop: '1rem', color: 'var(--primary)', opacity: 0.8 }}>
                                                                    {v.tafseer}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <style>{`
                .custom-scroll::-webkit-scrollbar { width: 4px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.1); border-radius: 10px; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: var(--primary); }
                .animate-spin { animation: spin 4s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </section >
    );
};

export default QuranExplorer;
