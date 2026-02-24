import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Play, Pause, ChevronRight, ChevronLeft, Loader2, Menu, X, AlertCircle, Search, Headphones, BookOpen, ScrollText, Sparkles, Share2, Link, Maximize, Minimize, Download, FileDown, FileText } from 'lucide-react';

export const surahAyahCounts = { 1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109, 11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135, 21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60, 31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85, 41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45, 51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13, 61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44, 71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42, 81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20, 91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11, 101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3, 111: 5, 112: 4, 113: 5, 114: 6 };

export const surahInfo = [
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
    const [viewMode, setViewMode] = useState('page'); // 'ayah' | 'page'
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingAyah, setCurrentPlayingAyah] = useState(null);
    const [downloadScope, setDownloadScope] = useState('surah'); // 'surah' | 'ayah'
    const [downloadStartAyah, setDownloadStartAyah] = useState(1);
    const [downloadEndAyah, setDownloadEndAyah] = useState(1);
    const [downloadLinks, setDownloadLinks] = useState([]);
    const [downloadReciter, setDownloadReciter] = useState(reciters[0].id);
    const [showTafseer, setShowTafseer] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activePageIdx, setActivePageIdx] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedReciter, setSelectedReciter] = useState(reciters[0].id);
    const [showReciterMenu, setShowReciterMenu] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isZipping, setIsZipping] = useState(false);
    const [zipProgress, setZipProgress] = useState(0);
    const [sequentialProgress, setSequentialProgress] = useState(null);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const toggleSidebar = () => setShowMobileSidebar(prev => !prev);
    const explorerRef = useRef(null); // For fullscreen
    const containerRef = useRef(null);
    const audioRef = useRef(new Audio());
    const ayahRefs = useRef({});

    useEffect(() => {
        if (verses.length > 0) {
            setDownloadStartAyah(1);
            setDownloadEndAyah(verses.length);
        }
    }, [verses.length]);

    const downloadFile = async (url, filename) => {
        try {
            // Attempt Fetch-to-Blob (Best for forcing download)
            const corsResponse = await fetch(url).catch(() => null);
            if (corsResponse && corsResponse.ok) {
                const blob = await corsResponse.blob();
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
                return true;
            } else {
                // Fallback: This will often trigger pop-up blockers if multiple fired
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                link.setAttribute('target', '_blank');
                document.body.appendChild(link);
                const win = window.open(url, '_blank');
                if (!win) {
                    alert(language === 'ku' ? "تکایە ڕێگە بدە بە Pop-ups لە وێبگەڕەکەتدا بۆ ئەوەی فایلەکان داببەزن." : "Please allow pop-ups in your browser to enable automatic downloading.");
                    return false;
                }
                document.body.removeChild(link);
                return true;
            }
        } catch (error) {
            window.open(url, '_blank');
            return true;
        }
    };

    const handleBundleDownload = async (links) => {
        setIsZipping(true);
        setZipProgress(0);
        try {
            const JSZip = await new Promise((resolve, reject) => {
                if (window.JSZip) return resolve(window.JSZip);
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
                script.onload = () => resolve(window.JSZip);
                script.onerror = () => reject(new Error("JSZip Load Failed"));
                document.head.appendChild(script);
            });

            const zip = new JSZip();
            let completed = 0;

            for (const link of links) {
                try {
                    const resp = await fetch(link.url);
                    if (!resp.ok) throw new Error();
                    const blob = await resp.blob();
                    zip.file(link.filename, blob);
                } catch (e) {
                    throw new Error("CORS_BLOCKED");
                }
                completed++;
                setZipProgress(Math.round((completed / links.length) * 100));
            }

            const content = await zip.generateAsync({ type: 'blob' });
            const bundleName = `${surahInfo[selectedSurahIndex].name.en}_Ayahs_${links[0].id}-${links[links.length - 1].id}.zip`;
            const bundleUrl = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = bundleUrl;
            a.download = bundleName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(bundleUrl);
        } catch (err) {
            if (err.message === "CORS_BLOCKED") {
                alert(language === 'ku' ? "ببوورە، وێبگەڕەکە ڕێگری دەکات لە کۆکردنەوەی هەموویان بەیەکەوە. تکایە یەک یەک دایان بگرە یان 'دابەزاندنی هەمووی' بەکاربهێنە." : "Browser security prevents automatic bundling. Please download individually or use 'Download All (Sequential)'.");
            } else {
                alert("Zip error: " + err.message);
            }
        } finally {
            setIsZipping(false);
            setZipProgress(0);
        }
    };

    const downloadAllSequential = async (links) => {
        alert(language === 'ku' ? "دابەزاندنی هەموو ئایەتەکان دەستی پێدەکات. تکایە سەیری بەشی داگرتنەکان بکە. ئەگەر داگرتنەکان وەستان، سەیری شریتی ناونیشانی وێبگەڕەکەت بکە بۆ ئایکۆنی بلۆککراو." : "Starting sequential download of all selected ayahs. Please check your downloads folder. If downloads stop, look for a blocked pop-up icon in your browser's address bar.");
        setSequentialProgress({ current: 0, total: links.length });

        for (let i = 0; i < links.length; i++) {
            setSequentialProgress({ current: i + 1, total: links.length });
            const success = await downloadFile(links[i].url, links[i].filename);

            if (!success) {
                // If any download is blocked, inform the user and stop the sequence
                alert(language === 'ku' ? "داگرتن ڕاگیرا: وێبگەڕەکەت ڕێگری لە داگرتنێکی تر کرد. تکایە ڕێگە بدە بە Pop-ups یان بە دەستی دایانبگرە." : "Download stopped: Your browser blocked a download. Please allow pop-ups or download manually.");
                setSequentialProgress(null);
                return;
            }

            // Wait slightly longer between each to avoid browser nuisance blocks
            await new Promise(r => setTimeout(r, 2000));
        }

        setSequentialProgress(null);
        alert(language === 'ku' ? "دابەزاندنی هەمووی تەواو بوو!" : "All downloads triggered! Please check your downloads folder.");
    };

    const handleSmartDownload = () => {
        setDownloadLinks([]); // Clear previous links
        setSequentialProgress(null); // Clear sequential progress state

        const reciterMapFull = {
            'ar.alafasy': 'mishaari_raashid_al_3afaasee',
            'ar.abdulbasitmurattal': 'abdul_basit_murattal',
            'ar.abdullahbasfar': 'abdullah_basfar',
            'ar.abdurrahmaansudais': 'abdurrahmaan_as-sudays',
            'ar.shaatree': 'abu_bakr_ash-shaatree',
            'ar.ahmedajamy': 'ahmed_ibn_ali_al-ajamy',
            'ar.hanirifai': 'hani_ar-rifai',
            'ar.husary': 'mahmoud_khalil_al-hussary',
            'ar.mahermuaiqly': 'maher_al_muaiqly',
            'ar.saoodshuraym': 'saood_ash-shuraym'
        };

        const reciterMapAyah = {
            'ar.alafasy': 'Mishary_Rashid_Alafasy_128kbps',
            'ar.abdulbasitmurattal': 'Abdul_Basit_Murattal_192kbps',
            'ar.abdullahbasfar': 'Abdullah_Basfar_192kbps',
            'ar.abdurrahmaansudais': 'Abdurrahmaan_As-Sudais_192kbps',
            'ar.shaatree': 'Abu_Bakr_Ash_Shaatree_128kbps',
            'ar.ahmedajamy': 'Ahmed_ibn_Ali_al-Ajamy_128kbps',
            'ar.hanirifai': 'Hani_Rifai_192kbps',
            'ar.husary': 'Husary_128kbps',
            'ar.mahermuaiqly': 'MaherAlMuaiqly128kbps',
            'ar.saoodshuraym': 'Saood_ash-Shuraym_128kbps'
        };

        const surahNum = String(selectedSurahIndex + 1).padStart(3, '0');
        const start = Math.max(1, Math.min(downloadStartAyah, verses.length));
        const end = Math.max(start, Math.min(downloadEndAyah, verses.length));

        // If multiple verses selected, Generate Links
        if (downloadScope === 'ayah' && end > start) {
            const links = [];
            const reciterPath = reciterMapAyah[downloadReciter] || 'Mishary_Rashid_Alafasy_128kbps';

            for (let i = start; i <= end; i++) {
                const ayahNum = String(i).padStart(3, '0');
                const url = `https://everyayah.com/data/${reciterPath}/${surahNum}${ayahNum}.mp3`;
                links.push({
                    id: i,
                    label: language === 'ku' ? `ئایەتی ${i}` : `Ayah ${i}`,
                    url: url,
                    filename: `${surahInfo[selectedSurahIndex].name.en}_${surahNum}_${ayahNum}.mp3`
                });
            }
            setDownloadLinks(links);
        } else {
            // Single Download
            let url = '';
            let filename = '';

            if (downloadScope === 'surah') {
                const reciterPath = reciterMapFull[downloadReciter] || 'mishaari_raashid_al_3afaasee';
                url = `https://download.quranicaudio.com/quran/${reciterPath}/${surahNum}.mp3`;
                filename = `${surahInfo[selectedSurahIndex].name.en}_Full.mp3`;
            } else {
                const ayahNum = String(start).padStart(3, '0');
                const reciterPath = reciterMapAyah[downloadReciter] || 'Mishary_Rashid_Alafasy_128kbps';
                url = `https://everyayah.com/data/${reciterPath}/${surahNum}${ayahNum}.mp3`;
                filename = `${surahInfo[selectedSurahIndex].name.en}_${surahNum}_${ayahNum}.mp3`;
            }
            downloadFile(url, filename);
        }
    };

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

    // Mobile detection
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    const handleDownloadText = async () => {
        setIsDownloading(true);
        setDownloadProgress(0);
        let fullText = "THE NOBLE QURAN\n\nDownloaded from Ramadan Challenge App\n\n";

        try {
            for (let i = 0; i < 114; i++) {
                const surah = surahInfo[i];
                // Using the reliable CDN
                const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanienc/${surah.id}.json`);
                if (!res.ok) throw new Error("Fetch failed");
                const data = await res.json();

                fullText += `\nSurah ${surah.id}: ${surah.name.en} (${surah.arabic})\n`;
                fullText += "----------------------------------------\n";

                data.chapter.forEach((verse, idx) => {
                    fullText += `[${surah.id}:${idx + 1}] ${verse.text}\n`;
                });

                setDownloadProgress(Math.round(((i + 1) / 114) * 100));
            }

            const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Quran_Full_Text.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                setIsDownloading(false);
                setShowDownloadModal(false);
                setDownloadProgress(0);
            }, 1000);
        } catch (err) {
            console.error(err);
            setIsDownloading(false);
            alert("Download failed. Please check your connection.");
        }
    };

    const direction = language === 'ku' ? 'rtl' : 'ltr';

    // ============ MOBILE LAYOUT ============
    if (isMobile && !isFullscreen) {
        return (
            <section id="quran" ref={explorerRef} style={{
                direction,
                background: '#020617',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Mobile Top Bar */}
                <div style={{
                    padding: '0.6rem 0.8rem',
                    background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.98), rgba(10, 15, 30, 0.95))',
                    borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '9px',
                            background: 'linear-gradient(135deg, #D4AF37, #996515)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'black', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)'
                        }}>
                            <Book size={16} />
                        </div>
                        <h2 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'white', margin: 0 }}>
                            {t.quran_explorer}
                        </h2>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                            onClick={() => setShowTafseer(!showTafseer)}
                            style={{
                                padding: '5px 10px', borderRadius: '8px',
                                background: showTafseer ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                                color: showTafseer ? 'black' : 'var(--primary)',
                                border: '1px solid rgba(212, 175, 55, 0.2)',
                                fontSize: '0.65rem', fontWeight: '800', cursor: 'pointer'
                            }}
                        >
                            {language === 'ku' ? 'تەفسیر' : 'Tafseer'}
                        </button>
                        <button
                            onClick={() => setShowDownloadModal(true)}
                            style={{
                                padding: '5px 8px', borderRadius: '8px',
                                background: 'rgba(255,255,255,0.06)',
                                color: 'var(--primary)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                cursor: 'pointer'
                            }}
                        >
                            <Download size={14} />
                        </button>
                    </div>
                </div>

                {/* Mobile Surah Selector + Controls */}
                <div style={{
                    padding: '0.5rem 0.8rem',
                    background: 'rgba(8, 12, 24, 0.95)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    gap: '0.4rem',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <select
                        value={selectedSurahIndex}
                        onChange={(e) => setSelectedSurahIndex(parseInt(e.target.value))}
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.6rem',
                            borderRadius: '10px',
                            background: 'rgba(212, 175, 55, 0.06)',
                            border: '1px solid rgba(212, 175, 55, 0.15)',
                            color: 'white',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            outline: 'none',
                            cursor: 'pointer',
                            direction: 'rtl'
                        }}
                    >
                        {surahInfo.map((s, idx) => (
                            <option key={s.id} value={idx} style={{ background: '#0f172a', direction: 'rtl' }}>
                                {s.id}. {s.name[language]} - {s.arabic}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => setViewMode(viewMode === 'ayah' ? 'page' : 'ayah')}
                        style={{
                            padding: '0.5rem 0.6rem', borderRadius: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'var(--primary)', fontSize: '0.65rem',
                            fontWeight: '800', cursor: 'pointer',
                            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px'
                        }}
                    >
                        {viewMode === 'ayah' ? <BookOpen size={12} /> : <ScrollText size={12} />}
                        {viewMode === 'ayah' ? (language === 'ku' ? 'لاپەڕە' : 'Page') : (language === 'ku' ? 'ئایەت' : 'Ayah')}
                    </button>
                    <button
                        onClick={() => setShowReciterMenu(!showReciterMenu)}
                        style={{
                            padding: '0.5rem', borderRadius: '10px',
                            background: 'rgba(212, 175, 55, 0.06)',
                            border: '1px solid rgba(212, 175, 55, 0.12)',
                            color: 'var(--primary)', cursor: 'pointer'
                        }}
                    >
                        <Headphones size={14} />
                    </button>
                    <button
                        onClick={toggleMainPlay}
                        style={{
                            width: '34px', height: '34px', borderRadius: '10px',
                            background: isPlaying ? 'linear-gradient(135deg, #D4AF37, #996515)' : 'rgba(212, 175, 55, 0.1)',
                            color: isPlaying ? 'black' : 'var(--primary)',
                            border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: isPlaying ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none'
                        }}
                    >
                        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    </button>
                </div>

                {/* Reciter Menu Overlay */}
                <AnimatePresence>
                    {showReciterMenu && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowReciterMenu(false)}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 9999,
                                background: 'rgba(0,0,0,0.75)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    width: '100%', maxWidth: '320px',
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    borderRadius: '18px', padding: '1.2rem',
                                    border: '1px solid rgba(212, 175, 55, 0.2)',
                                    maxHeight: '65vh', overflowY: 'auto'
                                }}
                            >
                                <h4 style={{ color: 'var(--primary)', marginBottom: '0.8rem', textAlign: 'center', fontSize: '0.95rem' }}>
                                    {language === 'ku' ? 'خوێنەر هەڵبژێرە' : 'Select Reciter'}
                                </h4>
                                {reciters.map(reciter => (
                                    <button
                                        key={reciter.id}
                                        onClick={() => {
                                            setSelectedReciter(reciter.id);
                                            setDownloadReciter(reciter.id);
                                            setShowReciterMenu(false);
                                        }}
                                        style={{
                                            width: '100%', padding: '0.7rem 0.8rem',
                                            textAlign: language === 'ku' ? 'right' : 'left',
                                            background: selectedReciter === reciter.id ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                                            color: selectedReciter === reciter.id ? 'var(--primary)' : 'rgba(255,255,255,0.65)',
                                            border: 'none', borderRadius: '10px',
                                            cursor: 'pointer', marginBottom: '0.2rem',
                                            fontSize: '0.85rem',
                                            fontWeight: selectedReciter === reciter.id ? 'bold' : 'normal'
                                        }}
                                    >
                                        {reciter.name[language]}
                                    </button>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Verse Content - fills remaining space */}
                <div
                    ref={containerRef}
                    style={{ flex: 1, overflowY: 'auto', background: '#050810', padding: '0.8rem 0.6rem' }}
                >
                    <audio ref={audioRef} preload="auto" />
                    {loading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', marginTop: '4rem' }}>
                            <Loader2 size={40} className="animate-spin" color="var(--primary)" style={{ opacity: 0.3 }} />
                            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                {language === 'ku' ? 'چاوەڕوانبە...' : 'Loading...'}
                            </p>
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem' }}>
                            <AlertCircle size={36} color="#ff4444" style={{ margin: '0 auto 0.8rem' }} />
                            <p style={{ color: '#ff4444', fontSize: '0.9rem' }}>{error}</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: viewMode === 'page' ? '1.5rem' : '2rem' }}>
                            {viewMode === 'ayah' ? (
                                verses.map((v, idx) => (
                                    <motion.div
                                        key={idx}
                                        ref={el => ayahRefs.current[v.id] = el}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        style={{
                                            display: 'flex', flexDirection: 'column', gap: '1rem',
                                            background: currentPlayingAyah === v.id ? 'rgba(212, 175, 55, 0.04)' : 'transparent',
                                            borderRadius: '14px', padding: '0.8rem', transition: 'all 0.4s',
                                            border: currentPlayingAyah === v.id ? '1px solid rgba(212, 175, 55, 0.1)' : '1px solid transparent'
                                        }}
                                    >
                                        <div style={{
                                            fontSize: '1.4rem',
                                            lineHeight: '2.4',
                                            textAlign: 'center',
                                            fontFamily: 'var(--font-display)',
                                            color: currentPlayingAyah === v.id ? 'var(--primary)' : 'white',
                                            direction: 'rtl',
                                            transition: 'color 0.3s'
                                        }}>
                                            {v.arabic}
                                            <div style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                gap: '0.8rem', marginTop: '1rem'
                                            }}>
                                                <div style={{ width: '30px', height: '1px', background: 'linear-gradient(to left, var(--primary), transparent)', opacity: 0.25 }} />
                                                <button
                                                    onClick={() => playAyah(v.id)}
                                                    style={{
                                                        width: '30px', height: '30px',
                                                        border: '1.5px solid rgba(212, 175, 55, 0.35)', borderRadius: '8px',
                                                        fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        color: currentPlayingAyah === v.id ? 'black' : 'var(--primary)',
                                                        background: currentPlayingAyah === v.id ? 'linear-gradient(135deg, #D4AF37, #996515)' : 'rgba(212, 175, 55, 0.05)',
                                                        fontWeight: '900', transform: 'rotate(45deg)', cursor: 'pointer',
                                                        transition: 'all 0.3s'
                                                    }}>
                                                    <span style={{ transform: 'rotate(-45deg)' }}>{v.id}</span>
                                                </button>
                                                <div style={{ width: '30px', height: '1px', background: 'linear-gradient(to right, var(--primary), transparent)', opacity: 0.25 }} />
                                            </div>
                                        </div>

                                        {showTafseer && (
                                            <div style={{
                                                background: 'rgba(255,255,255,0.015)',
                                                borderRadius: '12px', padding: '0.8rem',
                                                border: '1px solid rgba(255,255,255,0.03)'
                                            }}>
                                                <div style={{
                                                    fontSize: '0.85rem', lineHeight: '1.8',
                                                    color: 'rgba(255,255,255,0.75)',
                                                    textAlign: language === 'ku' ? 'right' : 'left',
                                                    marginBottom: '0.8rem',
                                                    paddingBottom: '0.8rem',
                                                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                                                }}>
                                                    <span style={{ opacity: 0.3, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '0.4rem' }}>
                                                        {language === 'ku' ? 'واتا' : 'Translation'}
                                                    </span>
                                                    {v[language]}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.82rem', lineHeight: '1.7',
                                                    color: 'var(--primary)', textAlign: 'right'
                                                }}>
                                                    <span style={{ opacity: 0.35, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '0.4rem' }}>
                                                        تەفسیری بامۆکی
                                                    </span>
                                                    {v.tafseer}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            ) : (
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
                                            borderRadius: '14px', padding: '1rem',
                                            border: '1px solid rgba(212, 175, 55, 0.04)',
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{
                                            textAlign: 'center',
                                            fontSize: '0.55rem', opacity: 0.25, letterSpacing: '1px',
                                            textTransform: 'uppercase', marginBottom: '0.5rem'
                                        }}>
                                            Page {pageNum}
                                        </div>
                                        <div style={{
                                            fontSize: '1.15rem', lineHeight: '2.3',
                                            textAlign: 'justify', fontFamily: 'var(--font-display)',
                                            color: '#fff', direction: 'rtl'
                                        }}>
                                            {pageVerses.map((v) => (
                                                <span
                                                    key={v.id}
                                                    ref={el => ayahRefs.current[v.id] = el}
                                                    style={{
                                                        position: 'relative',
                                                        background: currentPlayingAyah === v.id ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                                                        borderRadius: '5px', transition: 'background 0.3s'
                                                    }}
                                                >
                                                    {v.arabic}
                                                    <span
                                                        onClick={() => playAyah(v.id)}
                                                        style={{
                                                            fontSize: '0.55rem', margin: '0 0.35rem',
                                                            display: 'inline-flex',
                                                            width: '22px', height: '22px',
                                                            alignItems: 'center', justifyContent: 'center',
                                                            border: currentPlayingAyah === v.id ? '1.5px solid var(--primary)' : '1px solid rgba(212, 175, 55, 0.25)',
                                                            borderRadius: '6px',
                                                            color: currentPlayingAyah === v.id ? 'black' : 'var(--primary)',
                                                            background: currentPlayingAyah === v.id ? 'linear-gradient(135deg, #D4AF37, #996515)' : 'rgba(212, 175, 55, 0.04)',
                                                            verticalAlign: 'middle', fontWeight: '900', cursor: 'pointer',
                                                            transform: 'rotate(45deg)', transition: 'all 0.3s'
                                                        }}
                                                    >
                                                        <span style={{ transform: 'rotate(-45deg)' }}>{v.id}</span>
                                                    </span>
                                                    {showTafseer && (
                                                        <div style={{
                                                            display: 'block', background: 'rgba(255,255,255,0.015)',
                                                            padding: '0.6rem', borderRadius: '10px',
                                                            margin: '0.4rem 0', fontSize: '0.8rem',
                                                            lineHeight: '1.6', color: 'rgba(255,255,255,0.65)',
                                                            textAlign: language === 'ku' ? 'right' : 'left',
                                                            borderLeft: language === 'en' ? '2px solid var(--primary)' : 'none',
                                                            borderRight: language === 'ku' ? '2px solid var(--primary)' : 'none'
                                                        }}>
                                                            <strong style={{ display: 'block', marginBottom: '0.2rem', color: 'var(--primary)', fontSize: '0.7rem' }}>
                                                                {t.ayah} {v.id}:
                                                            </strong>
                                                            {v[language]}
                                                            <div style={{ marginTop: '0.4rem', color: 'var(--primary)', opacity: 0.8, fontSize: '0.75rem' }}>
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

                {/* Bottom Navigation Bar */}
                <div style={{
                    padding: '0.5rem 0.8rem',
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.98), rgba(10, 15, 30, 0.95))',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <button
                        onClick={() => navigateSurah(-1)}
                        disabled={selectedSurahIndex === 0}
                        style={{
                            padding: '0.4rem 0.8rem', borderRadius: '9px',
                            background: selectedSurahIndex === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(212, 175, 55, 0.08)',
                            border: `1px solid ${selectedSurahIndex === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(212, 175, 55, 0.15)'}`,
                            color: selectedSurahIndex === 0 ? 'rgba(255,255,255,0.12)' : 'var(--primary)',
                            cursor: selectedSurahIndex === 0 ? 'not-allowed' : 'pointer',
                            fontSize: '0.75rem', fontWeight: '700',
                            display: 'flex', alignItems: 'center', gap: '3px'
                        }}
                    >
                        <ChevronRight size={14} />
                        {language === 'ku' ? 'پێشوو' : 'Prev'}
                    </button>
                    <span style={{
                        color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: '700',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '900' }}>{selectedSurahIndex + 1}</span>
                        /
                        <span>114</span>
                    </span>
                    <button
                        onClick={() => navigateSurah(1)}
                        disabled={selectedSurahIndex === surahInfo.length - 1}
                        style={{
                            padding: '0.4rem 0.8rem', borderRadius: '9px',
                            background: selectedSurahIndex === surahInfo.length - 1 ? 'rgba(255,255,255,0.02)' : 'rgba(212, 175, 55, 0.08)',
                            border: `1px solid ${selectedSurahIndex === surahInfo.length - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(212, 175, 55, 0.15)'}`,
                            color: selectedSurahIndex === surahInfo.length - 1 ? 'rgba(255,255,255,0.12)' : 'var(--primary)',
                            cursor: selectedSurahIndex === surahInfo.length - 1 ? 'not-allowed' : 'pointer',
                            fontSize: '0.75rem', fontWeight: '700',
                            display: 'flex', alignItems: 'center', gap: '3px'
                        }}
                    >
                        {language === 'ku' ? 'دواتر' : 'Next'}
                        <ChevronLeft size={14} />
                    </button>
                </div>

                {/* Mobile Download Modal */}
                <AnimatePresence>
                    {showDownloadModal && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 2000,
                                background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
                                style={{
                                    width: '100%', maxWidth: '360px',
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    borderRadius: '18px', padding: '1.2rem',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    position: 'relative', textAlign: 'center',
                                    maxHeight: '80vh', overflowY: 'auto'
                                }}
                            >
                                <button onClick={() => setShowDownloadModal(false)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}>
                                    <X size={14} />
                                </button>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'white' }}>
                                    {language === 'ku' ? 'داگرتنی دەنگ' : 'Download Audio'}
                                </h3>
                                <select value={downloadReciter} onChange={(e) => setDownloadReciter(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.8rem', outline: 'none', marginBottom: '0.8rem' }}>
                                    {reciters.map(r => (<option key={r.id} value={r.id} style={{ background: '#1e293b' }}>{r.name[language]}</option>))}
                                </select>
                                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.8rem' }}>
                                    <button onClick={() => setDownloadScope('surah')} style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', background: downloadScope === 'surah' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: downloadScope === 'surah' ? 'black' : 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>
                                        {language === 'ku' ? 'هەموو سورەتەکە' : 'Full Surah'}
                                    </button>
                                    <button onClick={() => setDownloadScope('ayah')} style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', background: downloadScope === 'ayah' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: downloadScope === 'ayah' ? 'black' : 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>
                                        {language === 'ku' ? 'دیاریکردنی ئایەت' : 'Select Verses'}
                                    </button>
                                </div>
                                {downloadScope === 'ayah' && (
                                    <div style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.4rem', justifyContent: 'center', alignItems: 'center' }}>
                                        <input type="number" min="1" max={verses.length} value={downloadStartAyah} onChange={(e) => { const val = Math.min(verses.length, Math.max(1, parseInt(e.target.value) || 1)); setDownloadStartAyah(val); if (val > downloadEndAyah) setDownloadEndAyah(val); }} style={{ width: '55px', padding: '0.4rem', textAlign: 'center', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 'bold' }} />
                                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>→</span>
                                        <input type="number" min={downloadStartAyah} max={verses.length} value={downloadEndAyah} onChange={(e) => setDownloadEndAyah(Math.min(verses.length, Math.max(downloadStartAyah, parseInt(e.target.value) || downloadStartAyah)))} style={{ width: '55px', padding: '0.4rem', textAlign: 'center', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 'bold' }} />
                                    </div>
                                )}
                                <div onClick={handleSmartDownload} style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', padding: '0.7rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', color: 'white', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}>
                                    <Download size={16} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{language === 'ku' ? 'داگرتن' : 'Download'}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        );
    }

    // ============ DESKTOP LAYOUT (unchanged) ============
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
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (isPlaying) {
                                        audioRef.current.pause();
                                        setIsPlaying(false);
                                    } else {
                                        if (currentPlayingAyah) audioRef.current.play();
                                        else playAyah(1);
                                        setIsPlaying(true);
                                    }
                                }}
                                style={{
                                    width: '64px', height: '64px', borderRadius: '22px',
                                    background: 'linear-gradient(135deg, #D4AF37, #996515)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'black', border: 'none', cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                                }}
                            >
                                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                            </motion.button>

                            <button
                                onClick={toggleFullscreen}
                                style={{
                                    width: '64px', height: '64px', borderRadius: '22px',
                                    background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', transition: 'all 0.3s',
                                    border: '1px solid rgba(212, 175, 55, 0.2)'
                                }}
                                title="Fullscreen"
                            >
                                {isFullscreen ? <Minimize size={32} /> : <Maximize size={32} />}
                            </button>
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
                                                                fontSize: '0.8rem',
                                                                margin: '0 0.8rem',
                                                                display: 'inline-flex',
                                                                width: '32px', height: '32px',
                                                                alignItems: 'center', justifyContent: 'center',
                                                                border: currentPlayingAyah === v.id ? '2px solid var(--primary)' : '1px solid rgba(212, 175, 55, 0.3)',
                                                                borderRadius: '50%',
                                                                color: currentPlayingAyah === v.id ? 'black' : 'var(--primary)',
                                                                background: currentPlayingAyah === v.id ? 'linear-gradient(135deg, #D4AF37, #996515)' : 'rgba(212, 175, 55, 0.05)',
                                                                verticalAlign: 'middle',
                                                                fontWeight: '900',
                                                                cursor: 'pointer',
                                                                boxShadow: currentPlayingAyah === v.id ? '0 5px 15px rgba(212, 175, 55, 0.3)' : 'none',
                                                                transition: 'all 0.3s',
                                                                flexShrink: 0
                                                            }}
                                                        >
                                                            <span>{v.id}</span>
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
                                                                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>{t.ayah} {v.id}:</strong>
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

                {/* Left Controls Sidebar */}
                <div style={{
                    width: '140px',
                    borderRight: direction === 'ltr' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    borderLeft: direction === 'rtl' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem 1rem',
                    gap: '1.2rem',
                    background: 'rgba(255,255,255,0.01)',
                    zIndex: 2,
                    borderTopRightRadius: isFullscreen ? '0' : '50px',
                    overflowY: 'auto'
                }}>


                    {/* View Toggle Vertical */}
                    <div style={{
                        display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%', alignItems: 'center'
                    }}>
                        <button
                            onClick={() => setViewMode('ayah')}
                            style={{
                                width: '90px', padding: '0.8rem 0',
                                borderRadius: '16px',
                                background: viewMode === 'ayah' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: viewMode === 'ayah' ? 'black' : 'rgba(255,255,255,0.7)',
                                border: viewMode === 'ayah' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                fontWeight: '900',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem'
                            }}
                        >
                            <ScrollText size={20} />
                            {language === 'ku' ? 'ئایەت' : 'Ayah'}
                        </button>
                        <button
                            onClick={() => setViewMode('page')}
                            style={{
                                width: '90px', padding: '0.8rem 0',
                                borderRadius: '16px',
                                background: viewMode === 'page' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: viewMode === 'page' ? 'black' : 'rgba(255,255,255,0.7)',
                                border: viewMode === 'page' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                fontWeight: '900',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem'
                            }}
                        >
                            <BookOpen size={20} />
                            {language === 'ku' ? 'لاپەڕە' : 'Page'}
                        </button>
                    </div>

                    <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.1)' }} />

                    {/* Reciter Selection */}
                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={() => setShowReciterMenu(!showReciterMenu)}
                            style={{
                                width: '90px', height: '80px',
                                borderRadius: '20px',
                                background: 'rgba(212, 175, 55, 0.1)',
                                color: 'var(--primary)',
                                border: '1px solid rgba(212, 175, 55, 0.2)',
                                cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                            }}
                            title="Select Reciter"
                        >
                            <Headphones size={24} />
                            <span style={{ fontSize: '0.75rem', marginTop: '0.3rem', fontWeight: 'bold' }}>
                                {language === 'ku' ? 'خوێنەر' : 'Reciter'}
                            </span>
                        </button>
                        {showReciterMenu && (
                            <div style={{
                                position: 'fixed',
                                top: '50%',
                                left: direction === 'rtl' ? '160px' : 'auto',
                                right: direction === 'ltr' ? '160px' : 'auto',
                                transform: 'translateY(-50%)',
                                width: '300px',
                                background: 'rgba(10, 15, 24, 0.95)',
                                border: '1px solid rgba(212, 175, 55, 0.2)',
                                borderRadius: '20px',
                                padding: '1rem',
                                zIndex: 9999,
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                                backdropFilter: 'blur(20px)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h4 style={{ margin: 0, color: 'white' }}>{language === 'ku' ? 'خوێنەر هەڵبژێرە' : 'Select Reciter'}</h4>
                                    <button onClick={() => setShowReciterMenu(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={18} /></button>
                                </div>
                                {reciters.map(reciter => (
                                    <button
                                        key={reciter.id}
                                        onClick={() => {
                                            setSelectedReciter(reciter.id);
                                            setDownloadReciter(reciter.id);
                                            setShowReciterMenu(false);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            textAlign: language === 'ku' ? 'right' : 'left',
                                            background: selectedReciter === reciter.id ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
                                            color: selectedReciter === reciter.id ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.95rem',
                                            fontWeight: selectedReciter === reciter.id ? 'bold' : 'normal',
                                            display: 'flex', alignItems: 'center', gap: '1rem'
                                        }}
                                    >
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedReciter === reciter.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)' }} />
                                        {reciter.name[language]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setShowDownloadModal(true)}
                        style={{
                            width: '90px', height: '80px', borderRadius: '20px',
                            background: 'rgba(255,255,255,0.05)', color: 'var(--primary)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.3s',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                        className="hover-bg"
                        title="Download Quran"
                    >
                        <Download size={24} />
                        <span style={{ fontSize: '0.75rem', marginTop: '0.3rem', fontWeight: 'bold' }}>
                            {language === 'ku' ? 'داگرتن' : 'Download'}
                        </span>
                    </button>



                    <button
                        onClick={() => setShowTafseer(!showTafseer)}
                        style={{
                            width: '90px', height: '80px', borderRadius: '20px',
                            background: showTafseer ? 'var(--primary)' : 'rgba(212, 175, 55, 0.1)',
                            color: showTafseer ? 'black' : 'var(--primary)',
                            border: '1px solid rgba(212, 175, 55, 0.2)',
                            fontWeight: '900',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                        }}
                        title={t.tafseer}
                    >
                        <BookOpen size={24} />
                        <span style={{ fontSize: '0.75rem', marginTop: '0.3rem', fontWeight: 'bold' }}>
                            {language === 'ku' ? 'تەفسیر' : 'Tafseer'}
                        </span>
                    </button>
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
            {/* Download Modal */}
            <AnimatePresence>
                {showDownloadModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 2000,
                            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                            style={{
                                width: '100%', maxWidth: '500px',
                                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                borderRadius: '30px', padding: '3rem 2rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative', textAlign: 'center'
                            }}
                        >
                            <button
                                onClick={() => setShowDownloadModal(false)}
                                style={{
                                    position: 'absolute', top: '15px', right: '15px',
                                    background: 'rgba(255,255,255,0.05)', border: 'none',
                                    color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer'
                                }}
                            >
                                <X size={20} />
                            </button>

                            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white', fontFamily: 'var(--font-display)' }}>
                                {language === 'ku' ? 'داگرتنی دەنگ' : 'Download Audio'}
                            </h3>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem', textAlign: language === 'ku' ? 'right' : 'left' }}>
                                    {language === 'ku' ? 'خوێنەر هەڵبژێرە' : 'Select Reciter'}
                                </label>
                                <select
                                    value={downloadReciter}
                                    onChange={(e) => setDownloadReciter(e.target.value)}
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '15px',
                                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white', fontSize: '1rem', cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                >
                                    {reciters.map(r => (
                                        <option key={r.id} value={r.id} style={{ background: '#1e293b' }}>
                                            {r.name[language]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <button
                                    onClick={() => setDownloadScope('surah')}
                                    style={{
                                        flex: 1, padding: '1rem', borderRadius: '15px',
                                        background: downloadScope === 'surah' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        color: downloadScope === 'surah' ? 'black' : 'white',
                                        border: 'none', fontWeight: 'bold', cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {language === 'ku' ? 'هەموو سورەتەکە' : 'Full Surah'}
                                </button>
                                <button
                                    onClick={() => setDownloadScope('ayah')}
                                    style={{
                                        flex: 1, padding: '1rem', borderRadius: '15px',
                                        background: downloadScope === 'ayah' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        color: downloadScope === 'ayah' ? 'black' : 'white',
                                        border: 'none', fontWeight: 'bold', cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {language === 'ku' ? 'دیاریکردنی ئایەت' : 'Select Verses'}
                                </button>
                            </div>

                            {downloadScope === 'ayah' && (
                                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                                {language === 'ku' ? 'لە ئایەتی' : 'From Verse'}
                                            </label>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                <button onClick={() => setDownloadStartAyah(Math.max(1, downloadStartAyah - 1))} style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}>-</button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={verses.length}
                                                    value={downloadStartAyah}
                                                    onChange={(e) => {
                                                        const val = Math.min(verses.length, Math.max(1, parseInt(e.target.value) || 1));
                                                        setDownloadStartAyah(val);
                                                        if (val > downloadEndAyah) setDownloadEndAyah(val);
                                                    }}
                                                    style={{
                                                        width: '60px', padding: '0.6rem', textAlign: 'center',
                                                        borderRadius: '10px', background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)',
                                                        fontSize: '1.2rem', fontWeight: 'bold'
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    const val = Math.min(verses.length, downloadStartAyah + 1);
                                                    setDownloadStartAyah(val);
                                                    if (val > downloadEndAyah) setDownloadEndAyah(val);
                                                }} style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}>+</button>
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                                {language === 'ku' ? 'بۆ ئایەتی' : 'To Verse'}
                                            </label>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                <button onClick={() => setDownloadEndAyah(Math.max(downloadStartAyah, downloadEndAyah - 1))} style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}>-</button>
                                                <input
                                                    type="number"
                                                    min={downloadStartAyah}
                                                    max={verses.length}
                                                    value={downloadEndAyah}
                                                    onChange={(e) => setDownloadEndAyah(Math.min(verses.length, Math.max(downloadStartAyah, parseInt(e.target.value) || downloadStartAyah)))}
                                                    style={{
                                                        width: '60px', padding: '0.6rem', textAlign: 'center',
                                                        borderRadius: '10px', background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)', color: 'var(--primary)',
                                                        fontSize: '1.2rem', fontWeight: 'bold'
                                                    }}
                                                />
                                                <button onClick={() => setDownloadEndAyah(Math.min(verses.length, downloadEndAyah + 1))} style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.6, color: 'var(--primary)' }}>
                                        {language === 'ku' ? `کۆی گشتی: ${downloadEndAyah - downloadStartAyah + 1} ئایەت` : `Total: ${downloadEndAyah - downloadStartAyah + 1} Verses`}
                                    </div>
                                </div>
                            )}

                            {downloadLinks.length > 0 ? (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h4 style={{ color: 'white', margin: 0 }}>{language === 'ku' ? 'ئامادەکردنی داگرتن:' : 'Prepare Download:'}</h4>
                                        <button onClick={() => setDownloadLinks([])} style={{ background: 'none', border: 'none', color: '#F43F5E', cursor: 'pointer', fontWeight: 'bold' }}>
                                            {language === 'ku' ? 'پاشگەزبوونەوە' : 'Cancel'}
                                        </button>
                                    </div>

                                    {isZipping || sequentialProgress ? (
                                        <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', marginBottom: '1.5rem' }}>
                                            <div style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1rem' }}>
                                                {isZipping
                                                    ? (language === 'ku' ? 'پەستاندنی فایلەکان...' : 'Zipping Files...')
                                                    : (language === 'ku' ? `داگرتنی ${sequentialProgress.current} لە ${sequentialProgress.total}...` : `Downloading ${sequentialProgress.current} of ${sequentialProgress.total}...`)}
                                            </div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white' }}>
                                                {isZipping ? `${zipProgress}%` : `${Math.round((sequentialProgress.current / sequentialProgress.total) * 100)}%`}
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%', background: 'var(--primary)',
                                                    width: `${isZipping ? zipProgress : (sequentialProgress.current / sequentialProgress.total * 100)}%`,
                                                    transition: 'width 0.3s'
                                                }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <button
                                                onClick={() => handleBundleDownload(downloadLinks)}
                                                style={{
                                                    padding: '1.2rem', borderRadius: '15px', background: 'var(--primary)', color: 'black',
                                                    border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem',
                                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
                                                }}
                                            >
                                                <Sparkles size={20} />
                                                {language === 'ku' ? 'هەمووی وەک یەک فایل' : 'Bundle as ZIP'}
                                            </button>
                                            <button
                                                onClick={() => downloadAllSequential(downloadLinks)}
                                                style={{
                                                    padding: '1.2rem', borderRadius: '15px', background: 'rgba(255,255,255,0.1)', color: 'white',
                                                    border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem',
                                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
                                                }}
                                            >
                                                <Download size={20} />
                                                {language === 'ku' ? 'دابەزاندنی هەمووی' : 'Download All'}
                                            </button>
                                        </div>
                                    )}

                                    <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'grid', gap: '0.6rem', paddingRight: '0.5rem', marginBottom: '1.5rem' }} className="custom-scroll">
                                        <div style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem', textAlign: 'center' }}>
                                            {language === 'ku' ? 'یان فایلەکان بە جیا دابگرە:' : 'Or download files individually:'}
                                        </div>
                                        {downloadLinks.map(link => (
                                            <div key={link.id} style={{
                                                background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1rem', borderRadius: '12px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                            }}>
                                                <span style={{ color: 'white', fontSize: '0.9rem' }}>{link.label}</span>
                                                <button
                                                    onClick={() => downloadFile(link.url, link.filename)}
                                                    style={{
                                                        background: 'rgba(212, 175, 55, 0.2)', color: 'var(--primary)', border: 'none',
                                                        padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    {language === 'ku' ? 'داگرتن' : 'Get'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{
                                        background: 'rgba(212, 175, 55, 0.05)', padding: '1rem', borderRadius: '12px',
                                        fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textAlign: language === 'ku' ? 'right' : 'left',
                                        border: '1px solid rgba(212, 175, 55, 0.1)'
                                    }}>
                                        <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <AlertCircle size={14} />
                                            {language === 'ku' ? 'تێبینی بۆ داگرتن:' : 'Download Tips:'}
                                        </div>
                                        {language === 'ku'
                                            ? 'ئەگەر داگرتنەکە کار نەکات، تکایە دڵنیابەرەوە کە ڕێگەت داوە بە Pop-ups لە وێبگەڕەکەتدا (سەیری لای ڕاستی ناونیشانی وێبگەڕەکە بکە).'
                                            : 'If downloads don\'t start, please ensure Pop-ups are allowed in your browser (check the right side of the URL bar).'}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div
                                        onClick={handleSmartDownload}
                                        style={{
                                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', padding: '1.2rem', borderRadius: '20px',
                                            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                                            transition: 'all 0.3s', cursor: 'pointer', color: 'white'
                                        }} className="hover-scale"
                                    >
                                        <Download size={24} />
                                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                            {language === 'ku' ? 'داگرتن' : 'Download Now'}
                                            {downloadScope === 'ayah' && (downloadEndAyah > downloadStartAyah) &&
                                                ` (${downloadEndAyah - downloadStartAyah + 1})`
                                            }
                                        </span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
};

export default QuranExplorer;
