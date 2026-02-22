import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Sparkles, BookOpen, Info, Hash } from 'lucide-react';

const allNames = [
    { id: 1, arabic: "الرحمن", transliteration: "Ar-Rahman", meaning: { en: "The Most Merciful", ku: "بەخشندەترین" }, description: { en: "He who wills goodness and mercy for all His creatures.", ku: "ئەو زاتەی کە بەزەیی و خێر و خۆشی بۆ هەموو دروستکراوەکانی دەوێت." } },
    { id: 2, arabic: "الرحيم", transliteration: "Ar-Rahim", meaning: { en: "The Most Kind", ku: "میهرەبانترین" }, description: { en: "He who bestows special mercy upon the believers.", ku: "ئەو زاتەی کە بەزەیی تایبەتی هەیە بۆ بڕواداران." } },
    { id: 3, arabic: "الملك", transliteration: "Al-Malik", meaning: { en: "The Sovereign", ku: "پادشا" }, description: { en: "The Absolute Ruler, the Owner of everything.", ku: "پادشای ڕاستەقینە و خاوەنی هەموو شتێک." } },
    { id: 4, arabic: "القدوس", transliteration: "Al-Quddus", meaning: { en: "The Most Pure", ku: "پیرۆز و بێگەرد" }, description: { en: "The One who is pure from any imperfection.", ku: "پاک و بێگەرد لە هەموو کەم و کوڕییەک." } },
    { id: 5, arabic: "السلام", transliteration: "As-Salam", meaning: { en: "The Source of Peace", ku: "سەرچاوەی ئاشتی" }, description: { en: "The Giver of peace and security.", ku: "پەروەردگارێک کە سەرچاوەی ئاشتی و سەلامەتییە." } },
    { id: 6, arabic: "المؤمن", transliteration: "Al-Mu'min", meaning: { en: "The Giver of Faith", ku: "بەخشەری ئیمان" }, description: { en: "The Giver of belief and the One who provides safety.", ku: "ئەو زاتەی کە ئیمان دەبەخشێت و دڵنیایی دەدات بە بەندەکانی." } },
    { id: 7, arabic: "المهيمن", transliteration: "Al-Muhaymin", meaning: { en: "The Guardian", ku: "چاودێر و پارێزەر" }, description: { en: "The One who watches over His creatures.", ku: "چاودێر و پارێزەری هەموو دروستکراوەکانی." } },
    { id: 8, arabic: "العزيز", transliteration: "Al-Aziz", meaning: { en: "The Almighty", ku: "باڵادەست" }, description: { en: "The Victorious, the Mighty who is never defeated.", ku: "خاوەن دەسەڵاتی بێ وێنە کە هەرگیز شکست ناهێنێت." } },
    { id: 9, arabic: "الجبار", transliteration: "Al-Jabbar", meaning: { en: "The Compeller", ku: "ناچارکار و بەهێز" }, description: { en: "The One who repairs all broken things.", ku: "ئەو زاتەی کە هەر شتێکی تێکچوو چاک دەکاتەوە و بەهێزە." } },
    { id: 10, arabic: "المتكبر", transliteration: "Al-Mutakabbir", meaning: { en: "The Majestic", ku: "گەورە و خۆبەگەورەزان" }, description: { en: "The Supreme, the Possessor of greatness.", ku: "خاوەنی گەورەیی و شکۆمەندی بێ کۆتایی." } },
    { id: 11, arabic: "الخالق", transliteration: "Al-Khaliq", meaning: { en: "The Creator", ku: "دروستکەر" }, description: { en: "The One who creates from nothing.", ku: "ئەو زاتەی هەموو شتێکی لە نەبوونەوە دروست کردووە." } },
    { id: 12, arabic: "البارئ", transliteration: "Al-Bari", meaning: { en: "The Producer", ku: "بەدیهێنەر" }, description: { en: "The Maker who shapes and organizes.", ku: "بەدیهێنەرێک کە هەموو شتێکی بە ڕێکی بەدیهێناوە." } },
    { id: 13, arabic: "المصور", transliteration: "Al-Musawwir", meaning: { en: "The Fashioner", ku: "وێنەکێش" }, description: { en: "The Giver of forms and shapes.", ku: "ئەو زاتەی کە شێوە و وێنەی بە هەموو شتێک بەخشیوە." } },
    { id: 14, arabic: "الغفار", transliteration: "Al-Ghaffar", meaning: { en: "The All-Forgiving", ku: "زۆر لێخۆشبوو" }, description: { en: "The One who forgives sins repeatedly.", ku: "ئەو زاتەی کە زۆر لێخۆشبووە و گوناهی بەندەکانی دادەپۆشێت." } },
    { id: 15, arabic: "القهار", transliteration: "Al-Qahhar", meaning: { en: "The Subduer", ku: "زۆر بەدەسەڵات" }, description: { en: "The One who prevails over all.", ku: "سەرکەوتوو بەسەر هەموو شتێکدا و خاوەن دەسەڵاتی ڕەها." } },
    { id: 16, arabic: "الوهاب", transliteration: "Al-Wahhab", meaning: { en: "The Bestower", ku: "بەخشەری بێ بەرامبەر" }, description: { en: "The One who gives without expectations.", ku: "ئەو زاتەی کە بەخشینەکانی بێ بەرامبەر و هەمیشەیین." } },
    { id: 17, arabic: "الرزاق", transliteration: "Ar-Razzaq", meaning: { en: "The Provider", ku: "ڕۆزی دەر" }, description: { en: "The Giver of sustenance to all creatures.", ku: "ڕۆزی دەری هەموو گیاندار و دروستکراوەکانی." } },
    { id: 18, arabic: "الفتاح", transliteration: "Al-Fattah", meaning: { en: "The Opener", ku: "کەرەوەی دەرگاکانی خێر" }, description: { en: "The One who opens the doors of mercy.", ku: "ئەو زاتەی کە دەرگاکانی خێر و میهرەبانی دەکاتەوە." } },
    { id: 19, arabic: "العليم", transliteration: "Al-Alim", meaning: { en: "The All-Knowing", ku: "زۆر زانا" }, description: { en: "The One who knows everything.", ku: "ئەو پیرۆزەی کە زانیاری بە هەموو شتێک هەیە." } },
    { id: 20, arabic: "القابض", transliteration: "Al-Qabid", meaning: { en: "The Restrainer", ku: "گرتەرەوە" }, description: { en: "The One who withholds sustenance as He wills.", ku: "ئەو زاتەی کە ڕۆزی دەگرێتەوە لە کێ بیەوێت." } },
    { id: 21, arabic: "الباسط", transliteration: "Al-Basit", meaning: { en: "The Extender", ku: "فراوانکەر" }, description: { en: "The One who grants abundance as He wills.", ku: "ئەو زاتەی کە ڕۆزی فراوان دەکات بۆ کێ بیەوێت." } },
    { id: 22, arabic: "الخافض", transliteration: "Al-Khafid", meaning: { en: "The Abaser", ku: "نزمکەرەوە" }, description: { en: "The One who humbles the arrogant.", ku: "ئەو زاتەی کە ستەمکاران و خۆبەگەورەزانان نزم دەکاتەوە." } },
    { id: 23, arabic: "الرافع", transliteration: "Ar-Rafi", meaning: { en: "The Exalter", ku: "بەرزکەرەوە" }, description: { en: "The One who exalts the humble.", ku: "ئەو زاتەی کە بڕواداران و دڵسۆزان بەرز دەکاتەوە." } },
    { id: 24, arabic: "المعز", transliteration: "Al-Mu'izz", meaning: { en: "The Giver of Honor", ku: "عیزەت بەخش" }, description: { en: "The One who bestows honor.", ku: "ئەو زاتەی کە عیزەت و شکۆ دەبەخشێت." } },
    { id: 25, arabic: "المذل", transliteration: "Al-Mudhill", meaning: { en: "The Giver of Dishonor", ku: "سەرشۆڕکەر" }, description: { en: "The One who humiliates His enemies.", ku: "ئەو زاتەی کە دوژمنانی سەرشۆڕ دەکات." } },
    { id: 26, arabic: "السميع", transliteration: "As-Sami", meaning: { en: "The All-Hearing", ku: "بیسەر" }, description: { en: "The One who hears everything.", ku: "ئەو زاتەی کە هەموو دەنگ و گازندەیەک دەبیستێت." } },
    { id: 27, arabic: "البصير", transliteration: "Al-Basir", meaning: { en: "The All-Seeing", ku: "بینەر" }, description: { en: "The One who sees everything.", ku: "بینەری هەموو شتێکی شاراوە و دیار." } },
    { id: 28, arabic: "الحكم", transliteration: "Al-Hakam", meaning: { en: "The Judge", ku: "دادوەر" }, description: { en: "The Ultimate Judge whose word is final.", ku: "دادوەرێکی دادپەروەر کە حوکمی کۆتایی لایە." } },
    { id: 29, arabic: "العدل", transliteration: "Al-Adl", meaning: { en: "The Just", ku: "دادپەروەر" }, description: { en: "The Utterly Just who never oppresses.", ku: "ئەو زاتەی کە لەوپەڕی دادپەروەریدایە." } },
    { id: 30, arabic: "اللطيف", transliteration: "Al-Latif", meaning: { en: "The Subtle", ku: "ناسک و میهرەبان" }, description: { en: "The One who is kind in subtle ways.", ku: "میهرەبان بە شێوەیەکی ورد و ناسک." } },
    { id: 31, arabic: "الخبير", transliteration: "Al-Khabir", meaning: { en: "The All-Aware", ku: "زۆر ئاگادار" }, description: { en: "The One who knows the secret reality of things.", ku: "بەتەواوی ئاگادار لە هەموو نهێنییەک." } },
    { id: 32, arabic: "الحليم", transliteration: "Al-Halim", meaning: { en: "The Forbearing", ku: "بەحەوسەڵە" }, description: { en: "The One who is slow to punish.", ku: "ئارامگرێک کە پەلە ناکات لە سزادان." } },
    { id: 33, arabic: "العظيم", transliteration: "Al-Azim", meaning: { en: "The Magnificent", ku: "پڕ شکۆ و گەورە" }, description: { en: "The One whose greatness is beyond limit.", ku: "خاوەنی گەورەیی و دەسەڵاتی بێ وێنە." } },
    { id: 34, arabic: "الغفور", transliteration: "Al-Ghafur", meaning: { en: "The Forgiving", ku: "زۆر لێخۆشبوو" }, description: { en: "The One who is ready to forgive.", ku: "ئەو زاتەی کە زۆر داپۆشەر و لێخۆشبووە." } },
    { id: 35, arabic: "الشكور", transliteration: "Ash-Shakur", meaning: { en: "The Grateful", ku: "سوپاسگوزار" }, description: { en: "The One who rewards good deeds abundantly.", ku: "پاداشتدەرەوەی کارە چاکەکان بە زۆری." } },
    { id: 36, arabic: "العلي", transliteration: "Al-Ali", meaning: { en: "The Sublime", ku: "بەرز و بڵند" }, description: { en: "The High, none is above Him.", ku: "بەرزترین زات کە هیچ شتێک لە سەرووی ئەوەوە نییە." } },
    { id: 37, arabic: "الكبير", transliteration: "Al-Kabir", meaning: { en: "The Greatest", ku: "گەورە" }, description: { en: "The Infinite and Infinite.", ku: "گەورەترین زات لە زات و سیفاتیدا." } },
    { id: 38, arabic: "الحفيظ", transliteration: "Al-Hafiz", meaning: { en: "The Preserver", ku: "پارێزەر" }, description: { en: "The Guard and Protector.", ku: "پارێزەری هەموو دروستکراوەکانی لە تیاچوون." } },
    { id: 39, arabic: "المقيت", transliteration: "Al-Muqit", meaning: { en: "The Nourisher", ku: "بەهێزکەر و ڕۆزی دەر" }, description: { en: "The One who supplies all needs.", ku: "ئەو زاتەی کە پێداویستی هەموو شتێک دابین دەکات." } },
    { id: 40, arabic: "الحسيب", transliteration: "Al-Hasib", meaning: { en: "The Accounter", ku: "بەسبەسی و لێپێچەرەوە" }, description: { en: "The One who takes account of all states.", ku: "ئەو زاتەی کە بەسە بۆ بەندەکانی و لێپێچەرەوەیە." } },
    { id: 41, arabic: "الجليل", transliteration: "Al-Jalil", meaning: { en: "The Majestic", ku: "خاوەن شکۆ" }, description: { en: "The One who has the attributes of greatness.", ku: "خاوەن شکۆمەندی و دەسەڵاتی گەورە." } },
    { id: 42, arabic: "الكريم", transliteration: "Al-Karim", meaning: { en: "The Bountiful", ku: "بەخشندە" }, description: { en: "The Most Generous and Bestower.", ku: "زۆر بەخشندە و خاوەن کەرەمی بێ کۆتایی." } },
    { id: 43, arabic: "الرقيب", transliteration: "Ar-Raqib", meaning: { en: "The Watchful", ku: "چاودێر" }, description: { en: "The One who watches every single thing.", ku: "چاودێرێکی ورد بەسەر هەموو کردارێکەوە." } },
    { id: 44, arabic: "المجيب", transliteration: "Al-Mujib", meaning: { en: "The Responsive", ku: "وەڵامدەرەوە" }, description: { en: "The One who answers prayers.", ku: "وەڵامدەرەوەی نزا و پاڕانەوەکانی بەندەکانی." } },
    { id: 45, arabic: "الواسع", transliteration: "Al-Wasi", meaning: { en: "The Vast", ku: "فراوان و دەستڕۆیشتوو" }, description: { en: "The All-Encompassing, the Infinite.", ku: "فراوان لە زانین و میهرەبانی و دەسەڵاتیدا." } },
    { id: 46, arabic: "الحكيم", transliteration: "Al-Hakim", meaning: { en: "The All-Wise", ku: "دانا" }, description: { en: "The One who has absolute wisdom.", ku: "ئەو زاتەی کە هەموو کارێکی لەوپەڕی داناییدایە." } },
    { id: 47, arabic: "الودود", transliteration: "Al-Wadud", meaning: { en: "The Loving", ku: "خۆشەویست" }, description: { en: "The Most Loving and Beloved.", ku: "ئەو زاتەی کە بەندە چاکەکانی خۆش دەوێت." } },
    { id: 48, arabic: "المجيد", transliteration: "Al-Majid", meaning: { en: "The Glorious", ku: "خاوەن شانازی" }, description: { en: "The Most Honorable and Glorious.", ku: "خاوەنی شکۆ و شانازی و ڕێزی بێ پایان." } },
    { id: 49, arabic: "الباعث", transliteration: "Al-Ba'ith", meaning: { en: "The Resurrector", ku: "زیندووکەرەوە" }, description: { en: "The One who awakens the dead.", ku: "ئەو زاتەی کە مردووەکان زیندوو دەکاتەوە بۆ لێپێچینەوە." } },
    { id: 50, arabic: "الشهيد", transliteration: "Ash-Shahid", meaning: { en: "The Witness", ku: "شایەت" }, description: { en: "The Witness of everything.", ku: "ئاگادار و شایەت بەسەر هەموو شتێکەوە." } },
    { id: 51, arabic: "الحق", transliteration: "Al-Haqq", meaning: { en: "The Truth", ku: "ڕاستەقینە" }, description: { en: "The Only Reality, the Absolute Truth.", ku: "پەروەردگاری ڕاستەقینە کە هیچ گومانێکی تێدا نییە." } },
    { id: 52, arabic: "الوكيل", transliteration: "Al-Wakil", meaning: { en: "The Trustee", ku: "کارساز" }, description: { en: "The Ultimate Trustee for all affairs.", ku: "باشترین پشت و پەنا و کارسازی بەندەکان." } },
    { id: 53, arabic: "القوي", transliteration: "Al-Qawi", meaning: { en: "The Strong", ku: "زۆر بەهێز" }, description: { en: "The Possessor of all strength.", ku: "خاوەن هێزی ڕەها کە هیچ شتێک بێ هێزی ناکات." } },
    { id: 54, arabic: "المتين", transliteration: "Al-Matin", meaning: { en: "The Firm One", ku: "پتەو و بەدەسەڵات" }, description: { en: "The Firm and Steadfast.", ku: "ئەوپەڕی هێز و پتەوی لە کارەکانیدا." } },
    { id: 55, arabic: "الولي", transliteration: "Al-Wali", meaning: { en: "The Supporting Friend", ku: "خۆشەویست و سەرخەر" }, description: { en: "The Protecting Friend of believers.", ku: "سەرخەر و پشتیوانی بەندە بڕوادارەکانی." } },
    { id: 56, arabic: "الحميد", transliteration: "Al-Hamid", meaning: { en: "The Praiseworthy", ku: "شایستەی سوپاس" }, description: { en: "The One worthy of all praise.", ku: "ئەو زاتەی کە شایستەی هەموو سوپاس و ستایشێکە." } },
    { id: 57, arabic: "المحصي", transliteration: "Al-Muhsi", meaning: { en: "The Counter", ku: "ژمێرەر" }, description: { en: "The Knower of each individual thing.", ku: "ئەو زاتەی کە ژمارەی هەموو شتێک دەزانێت." } },
    { id: 58, arabic: "المبدئ", transliteration: "Al-Mubdi", meaning: { en: "The Originator", ku: "دەستپێکەر" }, description: { en: "The One who creates for the first time.", ku: "ئەو زاتەی کە دروستکردنی بۆ یەکەمجار دەستپێکرد." } },
    { id: 59, arabic: "المعيد", transliteration: "Al-Mu'id", meaning: { en: "The Restorer", ku: "گێڕەرەوە" }, description: { en: "The One who restores what He created.", ku: "ئەو زاتەی کە دوای مردن گیان دەگێڕێتەوە." } },
    { id: 60, arabic: "المحيي", transliteration: "Al-Muhyi", meaning: { en: "The Giver of Life", ku: "ژیانبەخش" }, description: { en: "The Giver of life.", ku: "ئەو زاتەی کە ژیان بە هەموو گیاندارێک دەبەخشێت." } },
    { id: 61, arabic: "المميت", transliteration: "Al-Mumit", meaning: { en: "The Bringer of Death", ku: "مرێنەر" }, description: { en: "The Creator of death.", ku: "ئەو زاتەی کە بڕیاری مردن بەدەست ئەوە." } },
    { id: 62, arabic: "الحي", transliteration: "Al-Hayy", meaning: { en: "The Living", ku: "هەمیشە زیندوو" }, description: { en: "The Ever Living One.", ku: "زیندوویەک کە هەرگیز نامرێت." } },
    { id: 63, arabic: "القيوم", transliteration: "Al-Qayyum", meaning: { en: "The Self-Sustaining", ku: "ڕاگەر" }, description: { en: "The One who supports and maintains all.", ku: "ئەو زاتەی کە هەڵسوڕێنەری هەموو گەردوونە." } },
    { id: 64, arabic: "الواجد", transliteration: "Al-Wajid", meaning: { en: "The Perceiver", ku: "دۆزەرەوە" }, description: { en: "The One who finds whatever He desires.", ku: "ئەو زاتەی کە هەرچی بوێت دەستی دەکەوێت." } },
    { id: 65, arabic: "الماجد", transliteration: "Al-Majid", meaning: { en: "The Noble", ku: "شکۆدار" }, description: { en: "The Most Noble and Magnanimous.", ku: "خاوەن شکۆ و ڕێزی تایبەت." } },
    { id: 66, arabic: "الواحد", transliteration: "Al-Wahid", meaning: { en: "The Unique", ku: "تاک" }, description: { en: "The One, the Unique.", ku: "تاکە پەرستراوێک کە هیچ هاوبەشێکی نییە." } },
    { id: 67, arabic: "الاحد", transliteration: "Al-Ahad", meaning: { en: "The One", ku: "تەنیای بێ هاوتا" }, description: { en: "The Absolute One.", ku: "تەنیا لە زات و سیفاتی بێ وێنەیدا." } },
    { id: 68, arabic: "الصمد", transliteration: "As-Samad", meaning: { en: "The Eternal", ku: "بێ نیاز" }, description: { en: "The Self-Sufficient, needed by all.", ku: "ئەو زاتەی کە بێ نیازە و هەمووان پێویستیان پێیەتی." } },
    { id: 69, arabic: "القادر", transliteration: "Al-Qadir", meaning: { en: "The Capable", ku: "بەدەسەڵات" }, description: { en: "The All-Powerful and Able.", ku: "توانای بەسەر هەموو شتێکدا هەیە." } },
    { id: 70, arabic: "المقتدر", transliteration: "Al-Muqtadir", meaning: { en: "The All-Determining", ku: "توانادار" }, description: { en: "The One with absolute power over each detail.", ku: "خاوەن توانی تەواو لە دیاریکردنی هەموو شتێک." } },
    { id: 71, arabic: "المقدم", transliteration: "Al-Muqaddim", meaning: { en: "The Expediter", ku: "پێشخەر" }, description: { en: "The One who brings things forward.", ku: "ئەو زاتەی کە کێ بیەوێت پێشی دەخات." } },
    { id: 72, arabic: "المؤخر", transliteration: "Al-Mu'akhkhir", meaning: { en: "The Delayer", ku: "دواخەر" }, description: { en: "The One who delays what He wills.", ku: "ئەو زاتەی کە کێ بیەوێت دوای دەخات." } },
    { id: 73, arabic: "الأول", transliteration: "Al-Awwal", meaning: { en: "The First", ku: "یەکەم" }, description: { en: "The First, before whom there was nothing.", ku: "یەکەمی بێ سەرەتا." } },
    { id: 74, arabic: "الأخر", transliteration: "Al-Akhir", meaning: { en: "The Last", ku: "کۆتایی" }, description: { en: "The Last, after whom there is nothing.", ku: "کۆتایی بێ کۆتایی." } },
    { id: 75, arabic: "الظاهر", transliteration: "Az-Zahir", meaning: { en: "The Manifest", ku: "ئاشکرا" }, description: { en: "The Outward, the Evident.", ku: "ئاشکرا لە ڕێگەی بەدیهێنراوەکانییەوە." } },
    { id: 76, arabic: "الباطن", transliteration: "Al-Batin", meaning: { en: "The Hidden", ku: "نهێنی" }, description: { en: "The Inward, the Hidden.", ku: "پەنهان و نهێنی لە چاوی دروستکراوەکانی." } },
    { id: 77, arabic: "الوالي", transliteration: "Al-Wali", meaning: { en: "The Governor", ku: "سەرپەرشتیار" }, description: { en: "The Sole Manager of everything.", ku: "سەرپەرشتیار و بەڕێوەبەری هەموو شتێک." } },
    { id: 78, arabic: "المتعالي", transliteration: "Al-Muta'ali", meaning: { en: "The Most Exalted", ku: "بڵند و باڵا" }, description: { en: "The Most High, above all descriptions.", ku: "بەرزترین زات لە هەموو وەسفێک." } },
    { id: 79, arabic: "البر", transliteration: "Al-Barr", meaning: { en: "The Source of Goodness", ku: "چاکەکار" }, description: { en: "The Source of all goodness and piety.", ku: "سەرچاوەی هەموو خێر و چاکەکارییەک." } },
    { id: 80, arabic: "التواب", transliteration: "At-Tawwab", meaning: { en: "The Acceptor of Repentance", ku: "تەوبە وەرگر" }, description: { en: "The Relenting, the Acceptor of regret.", ku: "ئەو زاتەی کە تەوبەی بەندەکانی وەردەگرێت." } },
    { id: 81, arabic: "المنتقم", transliteration: "Al-Muntaqim", meaning: { en: "The Avenger", ku: "تۆڵەسێنەر" }, description: { en: "The One who punishes transgressors.", ku: "تۆڵەسێنەر لە ستەمکاران و تاوانباران." } },
    { id: 82, arabic: "العفو", transliteration: "Al-Afuww", meaning: { en: "The Pardoner", ku: "بورێنەر" }, description: { en: "The One who erases sins.", ku: "ئەو زاتەی کە گوناهەکان دەسڕێتەوە." } },
    { id: 83, arabic: "الرؤوف", transliteration: "Ar-Ra'uf", meaning: { en: "The Compassionate", ku: "بەۆزەیی" }, description: { en: "The Most Compassionate and Kind.", ku: "زۆر بە سۆز و میهرەبان بۆ بەندەکانی." } },
    { id: 84, arabic: "مالك الملك", transliteration: "Malik-ul-Mulk", meaning: { en: "The Owner of Sovereignty", ku: "خاوەنی هەموو گەردوون" }, description: { en: "The King of all absolute rulers.", ku: "خاوەن و پادشای ڕاستەقینەی هەموو جیهانەکان." } },
    { id: 85, arabic: "ذو الجلال والإكرام", transliteration: "Dhul-Jalali wal-Ikram", meaning: { en: "The Lord of Majesty and Generosity", ku: "خاوەن شکۆمەندی و ڕێز" }, description: { en: "The Lord of Majesty and Bounty.", ku: "پەروەردگاری خاوەن شکۆ و کەرەمی بێ وێنە." } },
    { id: 86, arabic: "المقسط", transliteration: "Al-Muqsit", meaning: { en: "The Equitable", ku: "دادپەروەر" }, description: { en: "The One who is equitable and just.", ku: "دادپەروەرێک کە مافی کەس ناخوات." } },
    { id: 87, arabic: "الجامع", transliteration: "Al-Jami", meaning: { en: "The Gatherer", ku: "کۆکەرەوە" }, description: { en: "The Gatherer on the Day of Judgment.", ku: "کۆکەرەوەی هەموو خەڵک لە ڕۆژی دواییدا." } },
    { id: 88, arabic: "الغني", transliteration: "Al-Ghani", meaning: { en: "The Self-Sufficient", ku: "دەوڵەمەند" }, description: { en: "The Rich, who is independent of all.", ku: "دەوڵەمەندێکی بێ نیاز کە پێویستی بە هیچ کەس نییە." } },
    { id: 89, arabic: "المغني", transliteration: "Al-Mughni", meaning: { en: "The Enricher", ku: "دەوڵەمەندکەر" }, description: { en: "The Enricher who bestows wealth.", ku: "ئەو زاتەی کە کێ بیەوێت دەوڵەمەندی دەکات." } },
    { id: 90, arabic: "المانع", transliteration: "Al-Mani", meaning: { en: "The Preventer", ku: "پێشگر" }, description: { en: "The One who prevents what He wills.", ku: "ئەو زاتەی کە پێش دەگرێت لە هەر زیانێک." } },
    { id: 91, arabic: "الضار", transliteration: "Ad-Darr", meaning: { en: "The Distresser", ku: "زیانبەخش" }, description: { en: "The One who can inflict distress for a purpose.", ku: "زیانبەخش بەو کەسانەی سەرپێچی دەکەن." } },
    { id: 92, arabic: "النافع", transliteration: "An-Nafi", meaning: { en: "The Propitious", ku: "سوودبەخش" }, description: { en: "The Bestower of benefits.", ku: "سوودبەخش و خێرخواز بۆ هەموو بەندەکانی." } },
    { id: 93, arabic: "النور", transliteration: "An-Nur", meaning: { en: "The Light", ku: "ڕووناکی" }, description: { en: "The Light of the heavens and the earth.", ku: "ڕووناکی ئاسمانەکان و زەوی." } },
    { id: 94, arabic: "الهادي", transliteration: "Al-Hadi", meaning: { en: "The Guide", ku: "ڕێپیشاندەر" }, description: { en: "The One who guides to the Truth.", ku: "پارێزەر و ڕێپیشاندەری بەندەکان بەرەو ڕاستی." } },
    { id: 95, arabic: "البديع", transliteration: "Al-Badi", meaning: { en: "The Incomparable", ku: "سەرسوڕهێنەر" }, description: { en: "The Originator without precedents.", ku: "دروستکەرێکی بێ وێنە و بێ نموونە." } },
    { id: 96, arabic: "الباقي", transliteration: "Al-Baqi", meaning: { en: "The Everlasting", ku: "پایەدار" }, description: { en: "The One who remains forever.", ku: "ئەو زاتەی کە هەمیشە دەمێنێتەوە." } },
    { id: 97, arabic: "الوارث", transliteration: "Al-Warith", meaning: { en: "The Inheritor", ku: "میراتگر" }, description: { en: "The Inheritor of all after they perish.", ku: "میراتگری هەموو شتێک دوای نەمانیان." } },
    { id: 98, arabic: "الرشيد", transliteration: "Ar-Rashid", meaning: { en: "The Righteous Teacher", ku: "ڕاستەڕێ" }, description: { en: "The Guide who is perfectly wise.", ku: "ڕێنیشاندەرێکی دانا بەرەو ڕێگای ڕاست." } },
    { id: 99, arabic: "الصبور", transliteration: "As-Sabur", meaning: { en: "The Patient", ku: "ئارامگر" }, description: { en: "The One who is infinitely patient.", ku: "زۆر ئارامگر لەسەر کردارە خراپەکانی بەندەکانی." } },
];

const NamesOfAllah = ({ t, language }) => {
    const [search, setSearch] = useState('');
    const [selectedName, setSelectedName] = useState(null);

    const filteredNames = allNames.filter(n =>
        n.arabic.includes(search) ||
        n.transliteration.toLowerCase().includes(search.toLowerCase()) ||
        n.meaning[language].toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section style={{ padding: '6rem 0', minHeight: '100vh' }}>
            <div className="container" style={{ position: 'relative' }}>
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        style={{
                            width: '80px', height: '80px',
                            background: 'rgba(212, 175, 55, 0.1)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 2rem',
                            border: '1px solid var(--primary)'
                        }}
                    >
                        <Sparkles size={40} color="var(--primary)" />
                    </motion.div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        fontWeight: '900',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-display)',
                        background: 'linear-gradient(to bottom, #fff, var(--primary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {t.names_allah}
                    </h1>
                    <p style={{
                        color: 'var(--text-dim)',
                        fontSize: '1.1rem',
                        maxWidth: '700px',
                        margin: '0 auto 3rem',
                        lineHeight: '1.8'
                    }}>
                        {language === 'ku'
                            ? 'ناوە پیرۆزەکانی پەروەردگار و مانا بەرز و بڵندەکانیان بناسە بۆ نزیکبوونەوەی زیاتر لە خودا.'
                            : 'Explore the 99 attributes of Allah and their profound meanings to deepen your spiritual connection.'}
                    </p>

                    {/* Search Bar */}
                    <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                        <div style={{ position: 'absolute', left: language === 'ku' ? 'auto' : '1.5rem', right: language === 'ku' ? '1.5rem' : 'auto', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.5 }}>
                            <Search size={22} />
                        </div>
                        <input
                            type="text"
                            placeholder={language === 'ku' ? 'بگەڕێ بۆ ناوێک...' : 'Search for a name...'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1.2rem 3.5rem',
                                borderRadius: '30px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                fontSize: '1.1rem',
                                outline: 'none',
                                transition: 'all 0.3s',
                                textAlign: language === 'ku' ? 'right' : 'left'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>
                </motion.div>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredNames.map((name, index) => (
                        <motion.div
                            key={name.id}
                            layoutId={`card-${name.id}`}
                            onClick={() => setSelectedName(name)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index % 12) * 0.03 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="glass"
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                borderRadius: '24px',
                                background: 'rgba(15, 23, 42, 0.4)',
                                border: '1px solid rgba(212, 175, 55, 0.1)'
                            }}
                        >
                            <span style={{
                                position: 'absolute', top: '1rem', left: '1.5rem',
                                opacity: 0.2, fontSize: '0.8rem', fontWeight: 'bold'
                            }}>#{name.id}</span>

                            <motion.h3
                                layoutId={`text-arabic-${name.id}`}
                                style={{
                                    fontSize: '3rem',
                                    fontFamily: 'var(--font-display)',
                                    color: 'var(--primary)',
                                    marginBottom: '0.5rem',
                                    textShadow: '0 0 20px rgba(212, 175, 55, 0.2)'
                                }}
                            >
                                {name.arabic}
                            </motion.h3>
                            <motion.div layoutId={`text-translit-${name.id}`} style={{ fontWeight: 'bold', fontSize: '0.9rem', opacity: 0.8 }}>
                                {name.transliteration}
                            </motion.div>
                            <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '0.8rem' }}>
                                {name.meaning[language]}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredNames.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-dim)' }}
                    >
                        <Info size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                        <p>{language === 'ku' ? 'هیچ ناوێک نەدۆزرایەوە.' : 'No names found for your search.'}</p>
                    </motion.div>
                )}

                {/* Animated Overlay Detail View */}
                <AnimatePresence>
                    {selectedName && (
                        <div key="overlay">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedName(null)}
                                style={{
                                    position: 'fixed', inset: 0,
                                    background: 'rgba(0,0,0,0.85)',
                                    backdropFilter: 'blur(15px)',
                                    zIndex: 10000
                                }}
                            />

                            <div style={{
                                position: 'fixed', inset: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                pointerEvents: 'none', zIndex: 10001, padding: '2rem'
                            }}>
                                <motion.div
                                    layoutId={`card-${selectedName.id}`}
                                    className="glass"
                                    style={{
                                        maxWidth: '600px', width: '100%',
                                        padding: '4rem 3rem',
                                        textAlign: 'center',
                                        position: 'relative',
                                        borderRadius: '35px',
                                        border: '2px solid var(--primary)',
                                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(212, 175, 55, 0.1) 100%)',
                                        pointerEvents: 'auto',
                                        boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    <button
                                        onClick={() => setSelectedName(null)}
                                        style={{
                                            position: 'absolute', top: '1.5rem', right: '1.5rem',
                                            background: 'rgba(255,255,255,0.05)', border: 'none',
                                            width: '40px', height: '40px', borderRadius: '50%',
                                            color: 'white', cursor: 'pointer', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        ✕
                                    </button>

                                    <motion.h3
                                        layoutId={`text-arabic-${selectedName.id}`}
                                        style={{
                                            fontSize: '6rem',
                                            fontFamily: 'var(--font-display)',
                                            color: 'var(--primary)',
                                            marginBottom: '1rem',
                                            textShadow: '0 0 40px var(--primary-glow)'
                                        }}
                                    >
                                        {selectedName.arabic}
                                    </motion.h3>

                                    <motion.div
                                        layoutId={`text-translit-${selectedName.id}`}
                                        style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}
                                    >
                                        {selectedName.transliteration}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        style={{ marginBottom: '2.5rem' }}
                                    >
                                        <div style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                            {language === 'ku' ? 'ماناکەی' : 'The Meaning'}
                                        </div>
                                        <div style={{ fontSize: '1.4rem', opacity: 0.9 }}>
                                            {selectedName.meaning[language]}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        style={{
                                            padding: '2rem',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)',
                                            fontFamily: language === 'ku' ? 'var(--font-kurdish)' : 'inherit'
                                        }}>
                                            {selectedName.description[language]}
                                        </p>
                                    </motion.div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedName(null)}
                                        style={{
                                            marginTop: '3rem',
                                            background: 'var(--primary)',
                                            color: 'black',
                                            padding: '1rem 3rem',
                                            borderRadius: '16px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            border: 'none',
                                            boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)'
                                        }}
                                    >
                                        {language === 'ku' ? 'تەواو' : 'Close'}
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Footer Hadith */}
                <div style={{ marginTop: '8rem', padding: '4rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <Heart size={40} color="var(--primary)" style={{ marginBottom: '2rem', opacity: 0.3 }} />
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                        {language === 'ku'
                            ? 'پێغەمبەری خودا (ﷺ) دەفەرموێت: "خودا نەوەد و نۆ ناوی هەیە، هەرکەسێک بیانخوێنێت و پەیڕەویان بکات دەچێتە بەهەشتەوە."'
                            : 'The Prophet (ﷺ) said: "Allah has ninety-nine names, and whoever preserves them will enter Paradise."'}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NamesOfAllah;
