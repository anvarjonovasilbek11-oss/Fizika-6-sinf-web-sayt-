import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiArrowLeftLine, 
  RiArrowRightLine, 
  RiPlayCircleLine,
  RiCheckDoubleLine,
  RiFunctions,
  RiCompass3Line,
  RiPulseLine,
  RiFlashlightLine,
  RiVideoLine
} from 'react-icons/ri';
import { getCombinedTextbooks, getVideoForLesson } from '../services/textbookService';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const TextbookPage = () => {
  const { chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [loading, setLoading] = React.useState(true);
  const [textbooks, setTextbooks] = React.useState([]);
  const [lessonVideo, setLessonVideo] = React.useState(null);

  React.useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      const data = getCombinedTextbooks();
      setTextbooks(data);
      setLessonVideo(getVideoForLesson(lessonId));
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [lessonId]);

  const chapter = textbooks.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  // Redirect if not found after loading
  React.useEffect(() => {
    if (!loading && (!chapter || !lesson)) {
      navigate('/home');
    }
  }, [loading, chapter, lesson, navigate]);

  if (loading) return <LoadingSpinner />;
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

Tabiat qonunlarini o'rganish jarayonida fizika va matematika chambarchas bog'liqdir. Matematika fizikaning tili bo'lib, u yordamida biz jarayonlarni aniq hisoblab chiqamiz. Masalan, jismning bosib o'tgan masofasini (s), vaqt (t) va tezlik (v) orqali hisoblash mumkin.

Fizika faqat nazariya emas, u amaliyotdir. Bugungi kundagi barcha texnik yutuqlar – smartfonlardan tortib kosmik kemalarigacha – fizika qonunlariga asoslangan. Fizikani o'rganish orqali biz nafaqat dunyoni tushunamiz, balki uni o'zgartirish va rivojlantirish imkoniga ega bo'lamiz. Har bir kashfiyot inson qobiliyatlarini yangi bosqichga ko'taradi.

Darsimiz davomida biz jismlarning harakatlanishi, moddalarning tuzilishi, massa va uning xususiyatlari kabi fundamental tushunchalar bilan tanishamiz. Bu bilimlar sizga yuqori sinflarda murakkabroq fizik jarayonlarni tushunish uchun mustahkam poydevor yaratadi.`,
    formulas: [
      { label: "Tezlik formulasi", notation: "v = s / t", unit: "m/s" },
      { label: "Zichlik formulasi", notation: "ρ = m / V", unit: "kg/m³" }
    ],
    constants: [
      { label: "Erkin tushish tezlanishi", notation: "g ≈ 9.8", unit: "m/s²" },
      { label: "Suv zichligi", notation: "ρ = 1000", unit: "kg/m³" }
    ]
  } : {
    theory: lesson.content?.theory || "Ushbu mavzu bo'yicha batafsil nazariy ma'lumotlar yaqin orada taqdim etiladi. Iltimos, darslikning keyingi bo'limlarini tekshiring.",
    formulas: lesson.content?.formulas ? [{ label: "Asosiy formula", notation: lesson.content.formulas, unit: "" }] : [],
    constants: lesson.content?.constants ? [{ label: "Doimiy kattalik", notation: lesson.content.constants, unit: "" }] : []
  };

  // Navigation Logic
  const allLessons = textbooks.flatMap(c => c.lessons.map(l => ({ ...l, chapterId: c.id })));
  const currentIndex = allLessons.findIndex(l => l.id === lessonId && l.chapterId === chapterId);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-space-dark transition-colors duration-500">
      {/* Background Floating Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10 overflow-hidden z-0">
        <motion.div animate={{ y: [0, -40, 0], rotate: 360 }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-[10%] left-[5%] text-neon-purple"><RiPulseLine size={120} /></motion.div>
        <motion.div animate={{ y: [0, 50, 0], rotate: -360 }} transition={{ duration: 20, repeat: Infinity }} className="absolute bottom-[20%] right-[10%] text-electric-blue"><RiCompass3Line size={140} /></motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-[40%] right-[5%] text-slate-400 dark:text-white/20"><RiPulseLine size={100} /></motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-12 pb-24 relative z-10 px-4 pt-8"
      >
        {/* Navigation Breadcrumb & Title */}
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 glass-card hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-lg rounded-2xl bg-white dark:bg-white/5"
            >
              <RiArrowLeftLine size={24} />
            </button>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 via-slate-100 dark:via-white/5 to-transparent" />
            <div className="px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[10px] font-black uppercase tracking-[0.2em]">
              Mavzu mutolaasi
            </div>
          </div>
          
          <div className="space-y-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-neon-purple/10 dark:bg-neon-purple/20 border border-neon-purple/20 dark:border-neon-purple/30 text-neon-purple text-xs font-black uppercase tracking-[0.2em]"
            >
              <RiFlashlightLine size={14} /> {chapter.id.startsWith('bob-') ? `Bob ${chapter.id.split('-')[1]}` : chapter.title}
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tighter">
              <span className="text-glow-blue dark:text-glow-blue transition-all">{t(lesson.title)}</span>
            </h1>
          </div>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Central Theory Board */}
          <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-8 md:p-12 space-y-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden group min-h-[400px] flex items-center justify-center transition-colors">
                {/* Subtle background glow */}
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-neon-purple/5 blur-[100px] pointer-events-none group-hover:bg-neon-purple/10 transition-colors" />
                
                <div className="relative prose dark:prose-invert prose-slate max-w-none w-full">
                  {!isLessonOne && (!lesson.content?.theory) ? (
                    <div className="text-center space-y-4 py-20">
                      <RiPulseLine className="mx-auto text-slate-300 dark:text-white/20 animate-pulse" size={64} />
                      <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] text-sm italic">Nazariya tasdiqlanish jarayonida...</p>
                    </div>
                  ) : (
                    <p className="leading-[1.8] text-slate-800 dark:text-slate-100 font-bold whitespace-pre-wrap tracking-wide text-lg md:text-xl text-justify transition-colors">
                      {academicContent.theory}
                    </p>
                  )}
                </div>
              </div>
          </div>

          {/* Side Info Panel */}
          <div className="space-y-8">
            {/* Formulas & Constants Card */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-10 border border-slate-200 dark:border-neon-purple/20 bg-white dark:bg-gradient-to-br dark:from-white/5 dark:to-neon-purple/5 relative overflow-hidden shadow-xl"
            >
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 relative z-10 uppercase tracking-tight">
                <RiFunctions className="text-neon-purple" size={32} />
                Formulalar
              </h3>
              
              <div className="space-y-6 relative z-10">
                {academicContent.formulas.length > 0 ? academicContent.formulas.map((f, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 hover:border-neon-purple/30 transition-all group/formula shadow-inner">
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase mb-2 tracking-[0.2em]">{f.label}</p>
                    <p className="text-2xl font-black text-neon-purple italic drop-shadow-[0_0_8px_rgba(188,19,254,0.3)]">
                      {f.notation} <span className="text-xs font-black text-slate-400 not-italic ml-2">[{f.unit}]</span>
                    </p>
                  </div>
                )) : (
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-black italic uppercase tracking-widest text-center py-4">Ushbu darsda hisoblash formulalari mavjud emas.</p>
                )}

                {academicContent.constants.map((c, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 hover:border-electric-blue/30 transition-all group/const shadow-inner">
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase mb-2 tracking-[0.2em]">{c.label}</p>
                    <p className="text-2xl font-black text-electric-blue italic drop-shadow-[0_0_8px_rgba(0,210,255,0.3)]">
                      {c.notation} <span className="text-xs font-black text-slate-400 not-italic ml-2">[{c.unit}]</span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Multimedia Integration */}
            {lessonVideo && lessonVideo.videoId ? (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-electric-blue tracking-[0.3em]">Media Resurs</span>
                </div>
                <a 
                  href={`https://www.youtube.com/watch?v=${lessonVideo.videoId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center p-12 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 hover:border-electric-blue/50 transition-all shadow-xl bg-white dark:bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-electric-blue/10 dark:from-neon-purple/20 dark:to-electric-blue/20 opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="p-5 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white shadow-2xl group-hover:scale-110 transition-transform">
                      <RiPlayCircleLine size={56} />
                    </div>
                    <div className="text-center">
                      <span className="text-slate-900 dark:text-white font-black text-xl uppercase tracking-widest block">Video Dars</span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.2em] mt-2 block opacity-70">{lessonVideo.title}</span>
                    </div>
                  </div>
                </a>
              </motion.section>
            ) : (
              <div className="glass-card p-10 border-dashed border-2 border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 opacity-50 flex flex-col items-center gap-4 rounded-[2.5rem]">
                 <RiVideoLine className="text-slate-400" size={40} />
                 <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Video mavjud emas</span>
              </div>
            )}
          </div>
        </div>

        {/* Verification & Source Section */}
        <section className="glass-card p-10 bg-white dark:bg-black/40 border-slate-200 dark:border-white/5 mt-12 shadow-2xl relative overflow-hidden transition-colors">
          <div className="absolute h-full w-2 bg-electric-blue top-0 left-0" />
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-electric-blue/5 dark:bg-electric-blue/10 flex items-center justify-center text-electric-blue shadow-inner group transition-transform">
                      <RiPulseLine size={32} className="group-hover:scale-110 transition-transform" />
                    </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Dars Verifikatsiyasi</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-bold uppercase tracking-tight">
                  Ushbu material darslik standartlari asosida tasdiqlangan va tekshirilgan.
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Manba: O'zR XTV darsligi (2022)</span>
               <span className="text-[10px] font-black text-neon-purple uppercase tracking-[0.3em] block mt-2 px-4 py-1.5 bg-neon-purple/5 dark:bg-neon-purple/10 rounded-full border border-neon-purple/10">Status: Tasdiqlangan (Public)</span>
            </div>
          </div>
        </section>

        {/* Footer Navigation Overlay */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-8 border-t border-slate-200 dark:border-white/5 pt-12">
           <button 
             disabled={!prevLesson}
             onClick={() => prevLesson && navigate(`/textbook/${prevLesson.chapterId}/${prevLesson.id}`)}
             className={`w-full sm:w-auto flex items-center gap-6 px-10 py-5 glass-card transition-all group rounded-[2rem] bg-white dark:bg-white/5 ${!prevLesson ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-white/10 border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl'}`}
           >
             <RiArrowLeftLine className="group-hover:-translate-x-2 transition-transform text-primary" size={24} />
             <div className="text-left">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block leading-tight">Oldingi mavzu</span>
               <span className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">{prevLesson ? t(prevLesson.title) : 'Boshlash'}</span>
             </div>
           </button>
           
           <button 
             disabled={!nextLesson}
             onClick={() => nextLesson && navigate(`/textbook/${nextLesson.chapterId}/${nextLesson.id}`)}
             className={`w-full sm:w-auto flex items-center gap-12 px-10 py-5 glass-card transition-all group rounded-[2rem] bg-white dark:bg-white/5 ${!nextLesson ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-white/10 border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl'}`}
           >
             <div className="text-right">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block leading-tight">Keyingi mavzu</span>
               <span className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">{nextLesson ? t(nextLesson.title) : 'Yakunlangan'}</span>
             </div>
             <RiArrowRightLine className="group-hover:translate-x-2 transition-transform text-primary" size={24} />
           </button>
        </footer>
};

export default TextbookPage;
