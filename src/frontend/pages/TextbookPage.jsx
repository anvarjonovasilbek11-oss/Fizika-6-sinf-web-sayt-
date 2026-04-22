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
  RiVideoLine,
  RiEditLine,
  RiEyeOffLine,
  RiSave3Line,
  RiCloseLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
  RiStopCircleLine,
  RiLoader4Line
} from 'react-icons/ri';
import { getCombinedTextbooks, getVideoForLesson, saveCustomLesson, hideLesson } from '../../backend/services/textbookService';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

// ─── TTS Hook ───────────────────────────────────────────────────────────────
// Voices oldindan yuklash (Chrome-da kechikishni oldini olish)
let _cachedVoices = [];
const _loadVoices = () => {
  const v = window.speechSynthesis.getVoices();
  if (v.length) _cachedVoices = v;
};
_loadVoices();
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = _loadVoices;
}

const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused]     = React.useState(false);
  const utteranceRef = React.useRef(null);
  const keepAliveRef = React.useRef(null);

  // Nutqni to'xtatish
  const stopSpeech = React.useCallback(() => {
    clearInterval(keepAliveRef.current);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    utteranceRef.current = null;
  }, []);

  // Matnni o'qib berish — darhol, kechikishsiz
  const speak = React.useCallback((text) => {
    if (!text || !text.trim()) return;

    clearInterval(keepAliveRef.current);
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text.trim());

    // Voices ro'yxatidan ovoz tanlash
    const voices = _cachedVoices.length
      ? _cachedVoices
      : window.speechSynthesis.getVoices();

    const uzVoice  = voices.find(v => v.lang.startsWith('uz'));
    const ruVoice  = voices.find(v => v.lang.startsWith('ru'));
    const enVoice  = voices.find(v => v.lang.startsWith('en'));
    utterance.voice = uzVoice || ruVoice || enVoice || voices[0] || null;
    utterance.lang  = uzVoice ? 'uz-UZ' : ruVoice ? 'ru-RU' : 'en-US';
    utterance.rate   = 0.88;
    utterance.pitch  = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      clearInterval(keepAliveRef.current);
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };
    utterance.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('TTS xato:', e.error);
      }
      clearInterval(keepAliveRef.current);
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    setIsSpeaking(true); // UI ni darhol yangilash

    // Chrome 14+ bug: uzun matnlarda speechSynthesis o'z-o'zidan to'xtab qoladi.
    // Har 10 sekundda resume() chaqirib turamiz.
    keepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);

    window.speechSynthesis.speak(utterance);
  }, []);

  // Pause / Resume
  const togglePause = React.useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  // Komponent unmount bo'lganda tozalash
  React.useEffect(() => {
    return () => {
      clearInterval(keepAliveRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  return { isSpeaking, isPaused, speak, stopSpeech, togglePause };
};


// ─── Hover-to-Read Paragraph ────────────────────────────────────────────────
const HoverReadParagraph = ({ text, onHoverRead, className = '' }) => {
  const hoverTimerRef = React.useRef(null);

  const handleMouseEnter = () => {
    // 600ms hover pauzadan keyin o'qib berish
    hoverTimerRef.current = setTimeout(() => {
      if (text && text.trim()) {
        onHoverRead(text);
      }
    }, 600);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimerRef.current);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-context-menu hover:bg-primary/10 hover:text-primary rounded transition-all duration-200 px-0.5 ${className}`}
      title="Ovoz bilan o'qish uchun ustiga turing"
    >
      {text}
    </span>
  );
};

// ─── TTS Control Panel ──────────────────────────────────────────────────────
const TTSPanel = ({ text, isSpeaking, isPaused, onPlay, onStop, onTogglePause }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-3 glass-card bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-lg"
    >
      {/* Nutq holati */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {isSpeaking ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <RiVolumeUpLine className="text-primary flex-shrink-0" size={20} />
          </motion.div>
        ) : (
          <RiVolumeMuteLine className="text-slate-400 flex-shrink-0" size={20} />
        )}
        <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">
          {isSpeaking
            ? isPaused
              ? 'To\'xtatildi...'
              : 'O\'qilmoqda...'
            : 'Ovozli o\'qish'}
        </span>
      </div>

      {/* Tugmalar */}
      <div className="flex items-center gap-2">
        {/* Play tugmasi */}
        {!isSpeaking ? (
          <button
            onClick={() => onPlay(text)}
            title="O'qishni boshlash"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
          >
            <RiVolumeUpLine size={16} />
            O'qib ber
          </button>
        ) : (
          <>
            {/* Pause/Resume */}
            <button
              onClick={onTogglePause}
              title={isPaused ? 'Davom ettirish' : 'To\'xtatib turish'}
              className="p-2 bg-amber-500/20 text-amber-500 rounded-xl hover:bg-amber-500/30 transition-all"
            >
              {isPaused ? (
                <RiVolumeUpLine size={18} />
              ) : (
                <RiLoader4Line size={18} className="animate-spin" />
              )}
            </button>
            {/* Stop */}
            <button
              onClick={onStop}
              title="To'xtatish"
              className="p-2 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-all"
            >
              <RiStopCircleLine size={18} />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const TextbookPage = () => {
  const { chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [loading, setLoading] = React.useState(true);
  const [textbooks, setTextbooks] = React.useState([]);
  const [lessonVideo, setLessonVideo] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);

  // TTS
  const { isSpeaking, isPaused, speak, stopSpeech, togglePause } = useTTS();

  // Edit State
  const [editTheory, setEditTheory] = React.useState('');
  const [editFormula, setEditFormula] = React.useState('');

  React.useEffect(() => {
    const data = getCombinedTextbooks(isAdmin);
    setTextbooks(data);
    setLessonVideo(getVideoForLesson(lessonId));
    setLoading(false);
  }, [lessonId, isAdmin]);

  const chapter = textbooks.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  React.useEffect(() => {
    if (lesson) {
      setEditTheory(lesson.content?.theory || '');
      setEditFormula(lesson.content?.formulas || '');
    }
  }, [lesson]);

  // Sahifadan chiqqanda nutqni to'xtatish
  React.useEffect(() => {
    return () => stopSpeech();
  }, [lessonId, stopSpeech]);

  // Handle Save
  const handleSave = () => {
    const updatedLesson = {
      ...lesson,
      content: {
        ...lesson.content,
        theory: editTheory,
        formulas: editFormula
      }
    };
    saveCustomLesson(chapterId, updatedLesson);
    setIsEditing(false);
    toast.success("Mavzu muvaffaqiyatli saqlandi!");
    // Refresh local state
    setTextbooks(getCombinedTextbooks(isAdmin));
  };

  // Handle Hide
  const handleHide = () => {
    if (!window.confirm("Ushbu mavzuni o'quvchilardan yashirib, ko'rib chiqishga o'tkazasizmi?")) return;
    hideLesson(lessonId);
    toast.success("Mavzu yashirildi va ko'rib chiqishga o'tkazildi");
    navigate(-1);
  };

  // Butun matn uchun TTS teksti
  const fullText = React.useMemo(() => {
    const parts = [];
    if (lesson?.title) parts.push(t(lesson.title));
    if (editTheory || lesson?.content?.theory) parts.push(editTheory || lesson.content.theory);
    if (editFormula || lesson?.content?.formulas) parts.push(`Formula: ${editFormula || lesson.content.formulas}`);
    return parts.join('. ');
  }, [lesson, editTheory, editFormula, t]);

  if (loading) return <LoadingSpinner />;
  if (!chapter || !lesson) return null;

  // Navigation Logic
  const allLessons = textbooks.flatMap(c => c.lessons.map(l => ({ ...l, chapterId: c.id })));
  const currentIndex = allLessons.findIndex(l => l.id === lessonId && l.chapterId === chapterId);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  // Matnni paragrafga bo'lib, har biri hover-read qilish uchun
  const theoryText = editTheory || lesson.content?.theory || '';
  const theorySegments = theoryText
    ? theoryText.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0)
    : [];

  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-space-dark transition-colors duration-500">

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
            
            {isAdmin && (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                >
                  <RiEditLine size={16} /> Taxrirlash
                </button>
                <button 
                  onClick={handleHide}
                  className="px-6 py-2 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                >
                  <RiEyeOffLine size={16} /> Yashirish
                </button>
              </div>
            )}
            
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
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter uppercase">
              <span className="text-glow-blue dark:text-glow-blue transition-all">{t(lesson.title)}</span>
            </h1>
          </div>

          {/* ── TTS Panel ── */}
          <TTSPanel
            text={fullText}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            onPlay={speak}
            onStop={stopSpeech}
            onTogglePause={togglePause}
          />
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Central Theory Board */}
          <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-8 md:p-12 space-y-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden group min-h-[400px] flex flex-col transition-colors">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-neon-purple/5 blur-[100px] pointer-events-none group-hover:bg-neon-purple/10 transition-colors" />
                
                <div className="relative prose dark:prose-invert prose-slate max-w-none w-full flex-1 flex flex-col justify-center">
                  {!theoryText ? (
                    <div className="text-center space-y-4 py-20">
                      <RiPulseLine className="mx-auto text-slate-300 dark:text-white/20 animate-pulse" size={64} />
                      <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] text-sm italic">Nazariya tasdiqlanish jarayonida...</p>
                    </div>
                  ) : (
                    <div className="leading-[1.8] text-slate-800 dark:text-slate-100 font-bold tracking-wide text-lg md:text-xl text-justify transition-colors space-y-1">
                      {/* Har bir gap/jumla alohida hover-read segment */}
                      {theorySegments.length > 1 ? (
                        theorySegments.map((segment, idx) => (
                          <React.Fragment key={idx}>
                            <HoverReadParagraph
                              text={segment}
                              onHoverRead={speak}
                            />
                            {idx < theorySegments.length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))
                      ) : (
                        <HoverReadParagraph
                          text={theoryText}
                          onHoverRead={speak}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Hover hint */}
                {theoryText && (
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                    <RiVolumeUpLine className="text-slate-300 dark:text-white/20" size={16} />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
                      Matn ustiga sichqonchani olib boring — o'qib beradi
                    </p>
                  </div>
                )}
              </div>
          </div>

          {/* Side Info Panel */}
          <div className="space-y-8">
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
                {(editFormula || (lesson.content?.formulas)) ? (
                  <div
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 hover:border-neon-purple/30 transition-all group/formula shadow-inner text-center cursor-context-menu"
                    onMouseEnter={() => {
                      const f = editFormula || lesson.content?.formulas;
                      if (f) setTimeout(() => speak(`Formula: ${f}`), 600);
                    }}
                    title="Ovoz bilan o'qish uchun ustiga turing"
                  >
                    <p className="text-2xl font-black text-neon-purple italic drop-shadow-[0_0_8px_rgba(188,19,254,0.3)]">
                      {editFormula || lesson.content?.formulas}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-black italic uppercase tracking-widest text-center py-4">Ushbu darsda hisoblash formulalari mavjud emas.</p>
                )}
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
                <button 
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${lessonVideo.videoId}`, '_blank')}
                  className="group relative flex flex-col items-center justify-center p-12 w-full rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 hover:border-electric-blue/50 transition-all shadow-xl bg-white dark:bg-transparent"
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
                </button>
              </motion.section>
            ) : (
              <div className="glass-card p-10 border-dashed border-2 border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 opacity-50 flex flex-col items-center gap-4 rounded-[2.5rem]">
                 <RiVideoLine className="text-slate-400" size={40} />
                 <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Video mavjud emas</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-4xl bg-white dark:bg-[#0d1526] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col"
              >
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-primary/5">
                  <div className="flex items-center gap-4">
                    <RiEditLine size={32} className="text-primary" />
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Mavzuni Taxrirlash</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mt-1">{t(lesson.title)}</p>
                    </div>
                  </div>
                  <button onClick={() => setIsEditing(false)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-red-500 rounded-full transition-all">
                    <RiCloseLine size={24} />
                  </button>
                </div>

                <div className="p-8 space-y-8 overflow-y-auto no-scrollbar">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Nazariy qism (Theory)</label>
                    <textarea 
                      value={editTheory} onChange={(e) => setEditTheory(e.target.value)}
                      rows={10}
                      className="w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-primary outline-none transition-all text-slate-800 dark:text-slate-100 font-bold leading-relaxed scrollbar-hide"
                      placeholder="Mavzu matnini bu yerga yozing..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Asosiy Formula</label>
                    <input 
                      value={editFormula} onChange={(e) => setEditFormula(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-primary outline-none transition-all text-slate-800 dark:text-slate-100 font-black text-xl italic"
                      placeholder="Masalan: v = s / t"
                    />
                  </div>
                </div>

                <div className="p-8 bg-slate-50 dark:bg-white/5 flex justify-end gap-4">
                  <button onClick={() => setIsEditing(false)} className="px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all">Bekor qilish</button>
                  <button onClick={handleSave} className="px-10 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <RiSave3Line size={18} /> Saqlash
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation */}
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
      </motion.div>
    </div>
  );
};

export default TextbookPage;
