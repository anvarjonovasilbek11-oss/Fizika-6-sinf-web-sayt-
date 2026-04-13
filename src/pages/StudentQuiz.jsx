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
  RiHome4Line
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_AI_QUIZZES } from '../data/defaultTests';

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

  const { t } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const savedApproved = localStorage.getItem('approvedQuizzes');
    const savedPending = localStorage.getItem('pendingQuizzes');

    if (savedApproved) {
      setApprovedQuizzes(JSON.parse(savedApproved));
    }

    if (savedPending) {
      setPendingQuizzes(JSON.parse(savedPending));
    } else {
      // First time initialization: Load defaults into pending for admin to approve
      setPendingQuizzes(DEFAULT_AI_QUIZZES);
      localStorage.setItem('pendingQuizzes', JSON.stringify(DEFAULT_AI_QUIZZES));
    }
  }, []);

  const saveApproved = (updated) => {
    setApprovedQuizzes(updated);
    localStorage.setItem('approvedQuizzes', JSON.stringify(updated));
  };

  const savePending = (updated) => {
    setPendingQuizzes(updated);
    localStorage.setItem('pendingQuizzes', JSON.stringify(updated));
  };

  const generateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) {
        toast.error("API kaliti topilmadi!");
        setLoading(false);
        return;
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
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
      
      const newQuiz = { ...parsed, id: Date.now(), isApproved: false };
      const updatedPending = [...pendingQuizzes, newQuiz];
      savePending(updatedPending);
      
      toast.success("AI testni tayyorladi! 'Tasdiqlanishi kutilayotgan testlar' bo'limidan ko'rib tasdiqlang.");
      setTopic('');
      setShowGenerator(false);
    } catch (err) {
      toast.error("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const approveQuiz = (quiz) => {
    const updatedApproved = [...approvedQuizzes, { ...quiz, isApproved: true }];
    const updatedPending = pendingQuizzes.filter(q => q.id !== quiz.id);
    saveApproved(updatedApproved);
    savePending(updatedPending);
    toast.success("Test tasdiqlandi va barchaga e'lon qilindi!");
  };

  const deleteQuiz = (id, isFromPending = false) => {
    if (!window.confirm("O'chirilsinmi?")) return;
    if (isFromPending) {
      const updated = pendingQuizzes.filter(q => q.id !== id);
      savePending(updated);
    } else {
      const updated = approvedQuizzes.filter(q => q.id !== id);
      saveApproved(updated);
    }
    toast.success("Test o'chirildi");
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
      <div className="max-w-3xl mx-auto space-y-6 pb-20 px-4 mt-8">
        <div className="glass-card p-6 border-primary/20 bg-primary/5">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-black">{currentIdx + 1}</div>
              <div>
                <h3 className="font-black text-slate-800 dark:text-white truncate max-w-[250px]">{activeQuiz.topic}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Savol</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-primary">{progress}%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Jarayon</p>
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2">
            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-10 leading-tight">
            {q.question}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(q.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                disabled={!!selectedAnswer}
                className={`
                  p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-6 font-bold text-lg
                  ${selectedAnswer === key
                    ? key === q.correct ? 'bg-green-500/10 border-green-500 text-green-700' : 'bg-red-500/10 border-red-500 text-red-700'
                    : selectedAnswer && key === q.correct ? 'bg-green-500/10 border-green-500' : 'bg-white dark:bg-white/5 border-transparent hover:border-primary'
                  }
                `}
              >
                <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${selectedAnswer === key ? (key === q.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'}`}>{key}</span>
                <span className="text-lg font-bold flex-1 text-slate-700 dark:text-white">{value}</span>
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
      <div className="max-w-xl mx-auto glass-card p-12 text-center mt-10">
        <RiTrophyLine size={100} className="mx-auto text-primary mb-6" />
        <h2 className="text-5xl font-black text-gradient mb-4">Natijangiz</h2>
        <div className="text-8xl font-black mb-2 text-slate-800 dark:text-white">{score}/{activeQuiz.questions.length}</div>
        <p className="text-2xl font-bold text-slate-500 dark:text-slate-400 mb-10">{pct}% Muvaffaqiyat</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => startQuiz(activeQuiz)} 
            className="px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <RiRestartLine size={24} /> Qayta boshlash
          </button>
          <button 
            onClick={() => navigate('/home')} 
            className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <RiHome4Line size={24} /> Bosh menyu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20 px-4 pt-10">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 text-primary rounded-full font-black text-sm uppercase tracking-widest">
           <RiShieldCheckLine /> 6-Sinf Fizika Testlari
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white leading-tight">
          O'z Bilimingizni <br/> <span className="text-primary italic underline underline-offset-8">Sinab Ko'ring!</span>
        </h1>
        <p className="text-xl text-slate-400 font-bold max-w-2xl mx-auto">
           Har bir bobni mustahkamlash uchun maxsus tuzilgan 10 talik testlar jamlanmasi.
        </p>
        
        {isAdmin && (
          <div className="pt-4">
             {!showGenerator ? (
               <button 
                 onClick={() => setShowGenerator(true)}
                 className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
               >
                 <RiRobotLine size={28} /> + Yangi AI Test Yaratish
               </button>
             ) : (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 bg-primary/5 border-primary/20 max-w-3xl mx-auto text-left">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-2xl font-black dark:text-white flex items-center gap-3"><RiRobotLine className="text-primary"/> AI Bilan Test Tuzish</h3>
                     <button onClick={() => setShowGenerator(false)}><RiCloseLine size={30} className="text-slate-400 hover:text-red-500 transition-colors" /></button>
                  </div>
                  <form onSubmit={generateQuiz} className="flex flex-col sm:flex-row gap-4">
                     <input 
                       type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                       placeholder="Mavzu: Masalan, 1-bob. Fizika nimani o'rgatadi?"
                       className="flex-1 px-6 py-5 rounded-2xl border-2 border-transparent focus:border-primary outline-none dark:bg-dark-surface dark:text-white font-bold text-lg"
                     />
                     <button disabled={loading} className="px-10 py-5 bg-primary text-white rounded-2xl font-black shadow-xl disabled:opacity-50 min-w-[180px]">
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
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-500 text-white rounded-3xl shadow-xl shadow-amber-500/20">
              <RiShieldCheckLine size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black dark:text-white leading-none">Tasdiqlanishi kutilmoqda</h2>
              <p className="text-amber-500 font-bold text-lg mt-2">{pendingQuizzes.length} ta yangi test ko'rib chiqishga tayyor</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pendingQuizzes.map((q) => (
              <div key={q.id} className="glass-card p-10 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-all flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-black mb-4 leading-tight text-slate-800 dark:text-white">{q.topic}</h4>
                  <div className="flex items-center gap-3 text-slate-400 font-bold">
                     <RiHistoryLine /> 10 ta savol 
                  </div>
                </div>
                <div className="mt-10 flex gap-4">
                  <button onClick={() => approveQuiz(q)} className="flex-1 py-4 bg-green-500 text-white rounded-xl font-black shadow-xl shadow-green-500/20 hover:scale-105 active:scale-95 transition-all">Tasdiqlash</button>
                  <button onClick={() => deleteQuiz(q.id, true)} className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><RiDeleteBin6Line size={24}/></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-green-500 text-white rounded-3xl shadow-xl shadow-green-500/20">
            <RiCheckLine size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black dark:text-white leading-none">Tasdiqlangan testlar</h2>
            <p className="text-slate-400 font-bold text-lg mt-2">Barcha o'quvchilar uchun ochiq testlar</p>
          </div>
        </div>
        
        {approvedQuizzes.length === 0 ? (
          <div className="py-32 text-center glass-card border-dashed border-4">
             <RiHistoryLine size={100} className="mx-auto text-slate-200 mb-8" />
             <h3 className="text-3xl font-black text-slate-300">Hozircha testlar mavjud emas</h3>
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
                  className="glass-card p-10 group hover:border-primary transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                     <RiCheckLine size={120} />
                  </div>
                  <h4 className="text-2xl font-black mb-8 text-slate-800 dark:text-white group-hover:text-primary transition-colors leading-tight">{q.topic}</h4>
                  <div>
                    <button onClick={() => startQuiz(q)} className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black shadow-2xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all mb-4">
                       TESTNI BOSHLASH
                    </button>
                    {isAdmin && (
                      <button onClick={() => deleteQuiz(q.id)} className="w-full py-2 text-red-500 font-black text-sm uppercase tracking-tighter hover:underline">O'chirish</button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentQuiz;
