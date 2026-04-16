import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  RiRobotLine, 
  RiCheckLine, 
  RiRestartLine, 
  RiHistoryLine, 
  RiPlayFill, 
  RiTrophyLine, 
  RiDeleteBin6Line, 
  RiShieldCheckLine, 
  RiCloseLine, 
  RiHome4Line,
  RiArrowLeftSLine,
  RiArrowRightSLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_AI_QUIZZES } from '../data/defaultTests';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

const StudentQuiz = () => {
  const navigate = useNavigate();
  const [approvedQuizzes, setApprovedQuizzes] = useState([]);
  const [pendingQuizzes, setPendingQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // AI Generation State
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  
  // Preview State
  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [previewIdx, setPreviewIdx] = useState(0);

  const { t } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Firebase Firestore dan testlarni real-vaqtda olish
  useEffect(() => {
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      // Fallback: LocalStorage agar kalitlar bo'lmasa
      const savedApproved = localStorage.getItem('approvedQuizzes') || JSON.stringify(DEFAULT_AI_QUIZZES);
      const savedPending = localStorage.getItem('pendingQuizzes') || '[]';
      setApprovedQuizzes(JSON.parse(savedApproved));
      setPendingQuizzes(JSON.parse(savedPending));
      return;
    }

    const unsub = onSnapshot(collection(db, 'quizzes'), (snapshot) => {
      const allQuizzes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const approved = allQuizzes.filter(q => q.isApproved);
      const pending = allQuizzes.filter(q => !q.isApproved);
      
      // Agar bazada hech narsa bo'lmasa, defaultlarni ko'rsatish
      if (approved.length === 0) {
        setApprovedQuizzes(DEFAULT_AI_QUIZZES);
      } else {
        setApprovedQuizzes(approved);
      }
      setPendingQuizzes(pending);
    });

    return () => unsub();
  }, []);

  const generateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        toast.error("AI kaliti topilmadi! .env faylni tekshiring.");
        setLoading(false);
        return;
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${apiKey}` 
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: `Sen 6-sinf fizika fani bo'yicha O'zbek tilida professional test tuzuvchi AI assistantsan. QAT'IY RAVISHDA 10 ta test savoli tuz. Format: {"topic": "string", "questions": [{"id": 1, "question": "string", "options": {"A": "string", "B": "string", "C": "string", "D": "string"}, "correct": "A"}]}` },
            { role: 'user', content: `Mavzu: ${topic} bo'yicha 10 ta test savoli tuz.` }
          ]
        })
      });

      const data = await response.json();
      const raw = data.choices[0].message.content;
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI formatda xatolik");
      const parsed = JSON.parse(jsonMatch[0]);
      
      const quizId = Date.now().toString();
      const newQuiz = { 
        ...parsed, 
        id: quizId, 
        isApproved: false,
        createdAt: new Date().toISOString()
      };
      
      // Firebase-ga saqlash
      await setDoc(doc(db, 'quizzes', quizId), newQuiz);
      
      toast.success("AI testni tayyorladi! 'Tasdiqlanishi kutilayotgan testlar' bo'limidan ko'rib tasdiqlang.");
      setTopic('');
      setShowGenerator(false);
    } catch (err) {
      console.error("Test yaratishda xato:", err);
      toast.error("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const approveQuiz = async (quiz) => {
    try {
      await setDoc(doc(db, 'quizzes', quiz.id), { ...quiz, isApproved: true });
      toast.success("Test tasdiqlandi va barchaga e'lon qilindi!");
    } catch (err) {
      console.error("Tasdiqlashda xato:", err);
      toast.error("Tasdiqlashda xatolik yuz berdi.");
    }
  };

  const deleteQuiz = async (id, isFromPending = false) => {
    const message = isFromPending 
      ? "Ushbu testni butunlay o'chirasizmi?" 
      : "Ushbu testni butunlay o'chirib tashlamoqchimisiz? (Bu amalni ortga qaytarib bo'lmaydi)";

    if (!window.confirm(message)) return;

    try {
      await deleteDoc(doc(db, 'quizzes', id));
      toast.success("Test butunlay o'chirildi");
    } catch (err) {
      console.error("O'chirishda xato:", err);
      toast.error("Testni o'chirib bo'lmadi.");
    }
  };

  const moveToPending = async (quiz) => {
    if (!window.confirm("Ushbu testni tasdiqlanmaganlar qatoriga qaytarmoqchimisiz?")) return;

    try {
      await setDoc(doc(db, 'quizzes', quiz.id), { ...quiz, isApproved: false });
      toast.success("Test tasdiqlanmaganlar qatoriga o'tkazildi");
    } catch (err) {
      console.error("O'tkazishda xato:", err);
      toast.error("Xatolik yuz berdi.");
    }
  };

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentIdx(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    
    if (option === activeQuiz.questions[currentIdx].correct) {
      setScore(prev => prev + 1);
      toast.success("To'g'ri!", { duration: 1000 });
    } else {
      toast.error(`Xato! To'g'ri javob: ${activeQuiz.questions[currentIdx].correct}`, { duration: 2000 });
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentIdx + 1 < activeQuiz.questions.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setShowResults(true);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      }
    }, 2000);
  };

  if (activeQuiz && !showResults) {
    const q = activeQuiz.questions[currentIdx];
    const progress = Math.round(((currentIdx + 1) / activeQuiz.questions.length) * 100);

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-20 px-4 mt-8 transition-colors">
        <div className="glass-card p-6 border-primary/20 bg-white/40 dark:bg-primary/5 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg">{currentIdx + 1}</div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white truncate max-w-[250px] text-lg uppercase tracking-tight">{activeQuiz.topic}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-black tracking-widest">SAVOL</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-primary drop-shadow-sm">{progress}%</div>
              <p className="text-xs text-slate-700 dark:text-slate-400 uppercase font-black tracking-widest">JARAYON</p>
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-3 overflow-hidden shadow-inner">
            <div className="bg-primary h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(108,99,255,0.4)]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 md:p-12 bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-2xl">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-12 leading-tight">
            {q.question}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(q.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                disabled={!!selectedAnswer}
                className={`
                  p-6 rounded-[2rem] border-2 text-left transition-all flex items-center gap-6 font-bold text-lg group
                  ${selectedAnswer === key
                    ? key === q.correct ? 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400' : 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-400'
                    : selectedAnswer && key === q.correct ? 'bg-green-500/10 border-green-500' : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 hover:border-primary/50 dark:hover:border-primary/50 shadow-sm hover:shadow-lg'
                  }
                `}
              >
                <span className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-colors ${selectedAnswer === key ? (key === q.correct ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30') : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white group-hover:bg-primary/10'}`}>{key}</span>
                <span className={`text-xl font-black flex-1 ${selectedAnswer === key ? (key === q.correct ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400') : 'text-slate-800 dark:text-slate-100'}`}>{value}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    const pct = Math.round((score / activeQuiz.questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto glass-card p-12 text-center mt-10 shadow-2xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 transition-colors">
        <RiTrophyLine size={120} className="mx-auto text-primary mb-6 drop-shadow-[0_0_20px_rgba(108,99,255,0.4)]" />
        <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Natijangiz</h2>
        <div className="text-9xl font-black mb-2 text-primary drop-shadow-xl">{score}/{activeQuiz.questions.length}</div>
        <p className="text-2xl font-black text-slate-700 dark:text-slate-300 mb-10 uppercase tracking-widest">{pct}% Muvaffaqiyat</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => startQuiz(activeQuiz)} 
            className="px-8 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RiRestartLine size={24} /> Qayta boshlash
          </button>
          <button 
            onClick={() => navigate('/home')} 
            className="px-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RiHome4Line size={24} /> Bosh menyu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20 px-4 pt-10 transition-colors">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-8 py-3 bg-primary/10 text-primary rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-inner">
           <RiShieldCheckLine size={18} /> 6-Sinf Fizika Testlari
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter uppercase">
          O'z Bilimingizni <br/> <span className="text-primary italic underline underline-offset-[12px] decoration-primary/30">Sinab Ko'ring!</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-black max-w-2xl mx-auto leading-relaxed">
           Har bir bobni mustahkamlash uchun maxsus tuzilgan 10 talik testlar jamlanmasi.
        </p>
        
        {isAdmin && (
          <div className="pt-8">
             {!showGenerator ? (
               <button 
                 onClick={() => setShowGenerator(true)}
                 className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto shadow-primary/30"
               >
                 <RiRobotLine size={28} /> + Yangi AI Test Yaratish
               </button>
             ) : (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 bg-white dark:bg-white/5 border border-primary/30 max-w-3xl mx-auto text-left shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="flex justify-between items-center mb-8 relative z-10">
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3"><RiRobotLine className="text-primary" size={32}/> AI Bilan Test Tuzish</h3>
                     <button onClick={() => setShowGenerator(false)} className="p-2 hover:bg-red-500/10 rounded-full transition-colors"><RiCloseLine size={30} className="text-slate-400 hover:text-red-500 transition-colors" /></button>
                  </div>
                  <form onSubmit={generateQuiz} className="flex flex-col sm:flex-row gap-4 relative z-10">
                     <input 
                       type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                       placeholder="Mavzu: Masalan, 1-bob. Fizika nimani o'rgatadi?"
                       className="flex-1 px-6 py-5 rounded-2xl border-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none bg-white dark:bg-dark-surface text-slate-900 dark:text-white font-black text-lg placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                     />
                     <button disabled={loading} className="px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl disabled:opacity-50 min-w-[200px] hover:bg-primary-dark transition-all">
                        {loading ? "Tuzilmoqda..." : "Yaratish"}
                     </button>
                  </form>
               </motion.div>
             )}
          </div>
        )}
      </div>

      {isAdmin && pendingQuizzes.length > 0 && (
        <section className="space-y-10">
          <div className="flex items-center gap-5">
            <div className="p-5 bg-amber-500 text-white rounded-3xl shadow-xl shadow-amber-500/30">
              <RiShieldCheckLine size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-none uppercase tracking-tighter">Tasdiqlanishi kutilmoqda</h2>
              <p className="text-amber-600 dark:text-amber-500 font-black text-lg mt-2 uppercase tracking-widest">{pendingQuizzes.length} ta yangi test ko'rib chiqishga tayyor</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pendingQuizzes.map((q) => (
              <div key={q.id} className="glass-card p-10 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-all flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-2xl font-black mb-4 leading-tight text-slate-900 dark:text-white uppercase tracking-tight">{q.topic}</h4>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-black uppercase text-xs tracking-widest">
                     <RiHistoryLine className="text-amber-500" /> 10 ta savol 
                  </div>
                </div>
                <div className="mt-10 space-y-3">
                  <button 
                    onClick={() => { setPreviewQuiz(q); setPreviewIdx(0); }}
                    className="w-full py-4 bg-primary/10 text-primary border border-primary/20 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <RiHistoryLine size={16} /> Ko'rib chiqish
                  </button>
                  <div className="flex gap-4">
                    <button onClick={() => approveQuiz(q)} className="flex-1 py-4 bg-green-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-green-600/20 hover:scale-105 active:scale-95 transition-all">Tasdiqlash</button>
                    <button onClick={() => deleteQuiz(q.id, true)} className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"><RiDeleteBin6Line size={24}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-10">
        <div className="flex items-center gap-5">
          <div className="p-5 bg-green-500 text-white rounded-3xl shadow-xl shadow-green-500/30">
            <RiCheckLine size={40} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-none uppercase tracking-tighter">Tasdiqlangan testlar</h2>
            <p className="text-slate-700 dark:text-slate-400 font-black text-lg mt-2 uppercase tracking-widest">Barcha o'quvchilar uchun ochiq testlar</p>
          </div>
        </div>
        
        {approvedQuizzes.length === 0 ? (
          <div className="py-32 text-center glass-card bg-white dark:bg-white/5 border-dashed border-4 border-slate-200 dark:border-white/10 rounded-[3rem] opacity-50">
             <RiHistoryLine size={100} className="mx-auto text-slate-300 dark:text-slate-700 mb-8" />
             <h3 className="text-3xl font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Hozircha testlar mavjud emas</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {approvedQuizzes.map((q) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={q.id}
                  className="glass-card p-10 group bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-primary/50 transition-all relative overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-primary">
                     <RiCheckLine size={120} />
                  </div>
                  <h4 className="text-2xl font-black mb-8 text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight uppercase tracking-tight">{q.topic}</h4>
                  <div className="relative z-10">
                    <button onClick={() => startQuiz(q)} className="w-full py-5 bg-slate-900 dark:bg-primary text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-primary dark:hover:bg-primary-dark transition-all mb-4">
                       TESTNI BOSHLASH
                    </button>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => moveToPending(q)} 
                          className="flex-1 py-3 bg-amber-500/10 text-amber-600 dark:text-amber-500 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center gap-1"
                          title="Tasdiqlanmagan qatorga o'tkazish"
                        >
                          <RiRestartLine size={14} /> Qaytarish
                        </button>
                        <button 
                          onClick={() => deleteQuiz(q.id)} 
                          className="px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-1 font-black text-[10px] uppercase tracking-widest"
                          title="Butunlay o'chirish"
                        >
                          <RiDeleteBin6Line size={14} /> O'chirish
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
      {/* Quiz Preview Modal */}
      <AnimatePresence>
        {previewQuiz && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl bg-white dark:bg-[#0d1526] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10 flex flex-col h-[85vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-500/20">
                    <RiShieldCheckLine size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Testni Ko'rib Chiqish</h2>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mt-1">{previewQuiz.topic} • Savol: {previewIdx + 1}/{previewQuiz.questions.length}</p>
                  </div>
                </div>
                <button onClick={() => setPreviewQuiz(null)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-red-500 rounded-full transition-all">
                  <RiCloseLine size={24} />
                </button>
              </div>

              {/* Question Area */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar">
                <div className="space-y-12">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                    {previewQuiz.questions[previewIdx].question}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(previewQuiz.questions[previewIdx].options).map(([key, value]) => {
                      const isCorrect = key === previewQuiz.questions[previewIdx].correct;
                      return (
                        <div 
                          key={key}
                          className={`p-6 rounded-3xl border-2 flex items-center gap-6 transition-all ${isCorrect ? 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5'}`}
                        >
                          <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${isCorrect ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-white dark:bg-white/10 text-slate-400'}`}>{key}</span>
                          <span className="text-xl font-bold flex-1">{value}</span>
                          {isCorrect && <RiCheckLine size={24} className="text-green-500" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer / Navigation */}
              <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex gap-4 w-full md:w-auto">
                  <button 
                    disabled={previewIdx === 0}
                    onClick={() => setPreviewIdx(prev => prev - 1)}
                    className="flex-1 md:flex-none p-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-600 dark:text-white disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                  >
                    <RiArrowLeftSLine size={24} />
                  </button>
                  <button 
                    disabled={previewIdx === previewQuiz.questions.length - 1}
                    onClick={() => setPreviewIdx(prev => prev + 1)}
                    className="flex-1 md:flex-none p-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-600 dark:text-white disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                   <RiArrowRightSLine size={24} />
                  </button>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                  <button 
                    onClick={() => {
                      if (window.confirm("Ushbu testni o'chirib tashlaysizmi?")) {
                        deleteQuiz(previewQuiz.id, true);
                        setPreviewQuiz(null);
                      }
                    }}
                    className="flex-1 md:flex-none px-8 py-5 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 rounded-2xl transition-all"
                  >
                    O'chirish
                  </button>
                  <button 
                    onClick={() => {
                      approveQuiz(previewQuiz);
                      setPreviewQuiz(null);
                    }}
                    className="flex-1 md:flex-none px-12 py-5 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-green-600/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    TASDIQLASH
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentQuiz;
