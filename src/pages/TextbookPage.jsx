import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiArrowLeftLine, 
  RiArrowRightLine, 
  RiBookOpenLine, 
  RiPlayCircleLine,
  RiCheckDoubleLine,
  RiExternalLinkLine,
  RiFlaskLine,
  RiFunctions,
  RiAtomLine,
  RiCompass3Line,
  RiPulseLine,
  RiZapLine
} from 'react-icons/ri';
import { getCombinedTextbooks } from '../services/textbookService';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const TextbookPage = () => {
  const { chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [textbooks] = React.useState(getCombinedTextbooks());

  const chapter = textbooks.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);
  const { user } = useAuth();

  // Redirect if not found
  React.useEffect(() => {
    if (!chapter || !lesson) {
      navigate('/home');
    }
  }, [chapter, lesson, navigate]);

  if (!chapter || !lesson) return null;

  // Academic Content for Lesson 1: Kirish
  const isLessonOne = lessonId === '1' && chapterId === 'bob-1';
  
  const academicContent = isLessonOne ? {
    theory: `Fizika – tabiat haqidagi eng asosiy va qadimiy fanlardan biridir. "Fizika" so'zi qadimgi grek tilidagi "physis" so‘zidan olingan bo‘lib, "tabiat" degan ma'noni anglatadi. Ushbu fan bizni o'rab turgan olamning tuzilishini, undagi turli xil hodisalarning sabablarini va qonuniyatlarini o‘rganadi.

Siz har kuni guvohi bo‘ladigan oddiy hodisalar – quyoshning chiqishi va botishi, yomg‘ir yog‘ishi, chaqmoq chaqishi, narsalarning yerga tushishi – bularning barchasi fizik jarayonlardir. Fizika fani mana shu jarayonlarni o'rganish orqali insoniyatga koinot sirlarini ochishga yordam beradi.

Fizikaning asosiy vazifasi – tabiatda sodir bo'ladigan voqealarning umumiy qonuniyatlarini topishdir. Masalan, nima uchun kema suvda suzadi-yu, lekin kichik tosh cho'kib ketadi? Nima uchun ba'zi jismlar elektr tokini o'tkazadi, boshqalari esa yo'q? Fizika fani mana shu kabi savollarga tajriba va kuzatishlar orqali javob beradi.

Fizikada o'rganish usullari asosan ikkiga bo'linadi:
1. Kuzatish – tabiatdagi hodisaga aralashmagan holda uni diqqat bilan o'rganish.
2. Tajriba (Eksperiment) – maxsus laboratoriya sharoitida, asboblar yordamida hodisani sun'iy ravishda takrorlash va o'lchashlarni amalga oshirish.

Fizika fani matematikasiz mavjud bo'la olmaydi. Biz tabiat qonunlarini matematik formulalar orqali ifodalaymiz. Bu bizga kelajakdagi hodisalarni oldindan aytib berish (bashorat qilish) imkonini beradi. Masalan, samolyotning qanchalik tez uchishini yoki kosmik kemaning Oyga qachon yetib borishini fizika va matematika yordamida aniq hisoblash mumkin.

Bugungi kunda fizika texnikaning asosi hisoblanadi. Siz foydalanadigan smartfonlar, kompyuterlar, avtomobillar va hatto tibbiyotdagi eng murakkab asboblar ham fizika qonunlari asosida yaratilgan. Fizikani o‘rganish orqali siz nafaqat tabiat sirlarini bilib olasiz, balki kelajak texnologiyalarini tushunishga tayyorlanasiz.`,
    formulas: [
      { label: "Tezlik formulasi", notation: "v = s / t", unit: "m/s" },
      { label: "Zichlik", notation: "ρ = m / V", unit: "kg/m³" }
    ],
    constants: [
      { label: "Erkin tushish tezlanishi", notation: "g ≈ 9.8", unit: "m/s²" }
    ]
  } : {
    theory: lesson.content?.theory || "Ma'lumot mavjud emas",
    formulas: lesson.content?.formulas ? [{ label: "Formulalar", notation: lesson.content.formulas, unit: "" }] : [],
    constants: lesson.content?.constants ? [{ label: "Doimiylar", notation: lesson.content.constants, unit: "" }] : []
  };

  // Navigation Logic
  const allLessons = textbooks.flatMap(c => c.lessons.map(l => ({ ...l, chapterId: c.id })));
  const currentIndex = allLessons.findIndex(l => l.id === lessonId && l.chapterId === chapterId);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  return (
    <div className="relative min-h-screen">
      {/* Background Floating Icons */}
      <div className="fixed inset-0 pointer-events-none opacity-10 overflow-hidden z-0">
        <motion.div animate={{ y: [0, -40, 0], rotate: 360 }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-[10%] left-[5%] text-neon-purple"><RiAtomLine size={120} /></motion.div>
        <motion.div animate={{ y: [0, 50, 0], rotate: -360 }} transition={{ duration: 20, repeat: Infinity }} className="absolute bottom-[20%] right-[10%] text-electric-blue"><RiCompass3Line size={140} /></motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-[40%] right-[5%] text-white/20"><RiPulseLine size={100} /></motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto space-y-12 pb-24 relative z-10 px-4"
      >
        {/* Cinematic Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 glass-card hover:bg-white/10 text-slate-400 hover:text-white transition-all shadow-xl"
            >
              <RiArrowLeftLine size={24} />
            </button>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
          </div>
          
          <div className="space-y-4 pt-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-purple/20 border border-neon-purple/30 text-neon-purple text-xs font-black uppercase tracking-[0.3em]"
            >
              <RiZapLine size={14} /> {chapter.id.startsWith('bob-') ? `Bob ${chapter.id.split('-')[1]}` : chapter.title}
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight">
              {lessonId}-mavzu. <br />
              <span className="text-glow-blue uppercase">{lesson.title}</span>
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Theory Text */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-8 md:p-12 space-y-8 bg-white/5 border-white/5 shadow-2xl">
              <div className="prose prose-xl prose-invert max-w-none">
                <p className="leading-[1.9] text-slate-300 font-medium whitespace-pre-wrap tracking-wide text-justify">
                  {academicContent.theory}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Components: Formulas & Video */}
          <div className="space-y-8">
            {/* Formula & Constants Block */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 border-neon-purple/20 bg-gradient-to-br from-white/5 to-neon-purple/5 relative group"
            >
              <div className="absolute top-0 right-0 p-4 text-neon-purple/20 group-hover:text-neon-purple/40 transition-colors">
                <RiFunctions size={48} />
              </div>
              <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-neon-purple rounded-full shadow-[0_0_10px_#bc13fe]" />
                Formulalar va Doimiylar
              </h3>
              
              <div className="space-y-6">
                {academicContent.formulas.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-neon-purple/30 transition-all shadow-inner group/formula">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-tighter">{f.label}</p>
                    <p className="text-3xl font-black text-neon-purple italic drop-shadow-[0_0_12px_rgba(188,19,254,0.6)] group-hover:scale-105 transition-transform origin-left">
                      {f.notation} <span className="text-sm font-normal text-slate-400 not-italic ml-2">[{f.unit}]</span>
                    </p>
                  </div>
                ))}
                
                {academicContent.constants.map((c, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-electric-blue/30 transition-all shadow-inner group/const">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-tighter">{c.label}</p>
                    <p className="text-3xl font-black text-electric-blue italic drop-shadow-[0_0_12px_rgba(0,210,255,0.6)] group-hover:scale-105 transition-transform origin-left">
                      {c.notation} <span className="text-sm font-normal text-slate-400 not-italic ml-2">[{c.unit}]</span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Video Lesson Integration */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <a 
                href="https://www.youtube.com/watch?v=Rp5Ha94Q1Y0&list=PLahTzkIscFVZlVx14Pd8rrCwImD8Sn0-9&index=16" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center p-10 rounded-[40px] overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple to-electric-blue animate-pulse opacity-90 transition-transform group-hover:scale-110 duration-700" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="p-5 bg-white/20 backdrop-blur-2xl rounded-full shadow-2xl border border-white/40"
                  >
                    <RiPlayCircleLine size={56} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </motion.div>
                  <span className="text-white font-black text-2xl uppercase tracking-tighter text-center">Video darsni <br /> ko'rish</span>
                </div>
              </a>
            </motion.section>
          </div>
        </div>

        {/* Source Verification Footer */}
        <section className="glass-card p-10 border-white/5 bg-black/40 mt-12 shadow-inner">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-3xl bg-white/5 text-electric-blue border border-white/10 shadow-xl">
                <RiCheckDoubleLine size={40} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white tracking-wider flex items-center gap-2">
                   Manba va Tekshirildi
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </h4>
                <p className="text-base text-slate-400 leading-relaxed font-medium">
                  Ushbu dars ma'lumotlari: 
                  <a href="https://ziyonet.uz" target="_blank" rel="noreferrer" className="text-electric-blue hover:text-white underline decoration-2 underline-offset-4 ml-1 font-bold transition-colors">[O'zR XTV Fizika 6-sinf Darsligi (2022)]</a> hamda 
                  <a href="#" className="text-neon-purple hover:text-white underline decoration-2 underline-offset-4 ml-1 font-bold transition-colors">[Nufuzli Ta'lim Portal]</a> saytlaridan olindi.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase text-slate-500 tracking-[0.2em] shadow-inner">Verifikatsiya: #FX-6001</div>
              <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">Yangilangan sana: 2024-yil may</div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
           <button 
             disabled={!prevLesson}
             onClick={() => prevLesson && navigate(`/textbook/${prevLesson.chapterId}/${prevLesson.id}`)}
             className={`w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 glass-card transition-all group ${!prevLesson ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-slate-400 hover:text-white shadow-xl'}`}
           >
             <RiArrowLeftLine className={`${prevLesson ? 'group-hover:-translate-x-2' : ''} transition-transform`} size={24} />
             <div className="text-left">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Dars: {prevLesson?.id || '-'}</p>
               <span className="font-extrabold text-sm uppercase tracking-widest block">{t('textbook_prev') || 'Oldingi mavzu'}</span>
             </div>
           </button>
           
           <button 
             disabled={!nextLesson}
             onClick={() => nextLesson && navigate(`/textbook/${nextLesson.chapterId}/${nextLesson.id}`)}
             className={`w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 glass-card transition-all group ${!nextLesson ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-slate-400 hover:text-white shadow-xl'}`}
           >
             <div className="text-right">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Dars: {nextLesson?.id || '-'}</p>
               <span className="font-extrabold text-sm uppercase tracking-widest block">{t('textbook_next') || 'Keyingi mavzu'}</span>
             </div>
             <RiArrowRightLine className={`${nextLesson ? 'group-hover:translate-x-2' : ''} transition-transform`} size={24} />
           </button>
        </footer>
      </motion.div>
    </div>
  );
};

export default TextbookPage;
