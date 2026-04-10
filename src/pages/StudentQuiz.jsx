import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiRobotLine, 
  RiCheckLine, 
  RiRestartLine, 
  RiHistoryLine, 
  RiPlayFill,
  RiTrophyLine,
  RiDeleteBin6Line,
  RiSendPlane2Line,
  RiShieldCheckLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_AI_QUIZZES } from '../data/defaultTests';

const StudentQuiz = () => {
  const [approvedQuizzes, setApprovedQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // AI Generation State
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingQuiz, setPendingQuiz] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const { t } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const saved = localStorage.getItem('approvedQuizzes');
    if (saved) {
      setApprovedQuizzes(JSON.parse(saved));
    } else {
      setApprovedQuizzes(DEFAULT_AI_QUIZZES);
      localStorage.setItem('approvedQuizzes', JSON.stringify(DEFAULT_AI_QUIZZES));
    }
  }, []);

  const saveQuizzes = (updated) => {
    setApprovedQuizzes(updated);
    localStorage.setItem('approvedQuizzes', JSON.stringify(updated));
  };

  const generateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setPendingQuiz(null);

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
            { role: 'system', content: `Sen 6-sinf fizika fani bo'yicha O'zbek tilida professional test tuzuvchi AI assistantsan. 10 ta test savoli tuz. Format: {"topic": "string", "questions": [{"id": 1, "question": "string", "options": {"A": "string", "B": "string", "C": "string", "D": "string"}, "correct": "A"}]}` },
            { role: 'user', content: `Mavzu: ${topic} bo'yicha 10 ta test savoli tuz.` }
          ]
        })
      });

      const data = await response.json();
      const raw = data.choices[0].message.content;
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(jsonMatch[0]);
      
      setPendingQuiz({ ...parsed, id: Date.now() });
      toast.success("AI testni tayyorladi! Tekshirib tasdiqlang.");
    } catch (err) {
      toast.error("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const approveQuiz = () => {
    const updated = [...approvedQuizzes, pendingQuiz];
    saveQuizzes(updated);
    setPendingQuiz(null);
    setTopic('');
    setShowGenerator(false);
    toast.success("Test ro'yxatga qo'shildi!");
  };

  const deleteQuiz = (id) => {
    if (!window.confirm("O'chirilsinmi?")) return;
    const updated = approvedQuizzes.filter(q => q.id !== id);
    saveQuizzes(updated);
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
      toast.success(t('quiz_correct'), { duration: 1000 });
    } else {
      toast.error(`${t('quiz_wrong')}: ${activeQuiz.questions[currentIdx].correct}`, { duration: 2000 });
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
      <div className="max-w-3xl mx-auto space-y-6 pb-20 px-4">
        {/* Progress Bar */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-md shadow-primary/30">
                {currentIdx + 1}
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">{t('quiz_question')}</div>
                <div className="text-lg font-bold dark:text-white">{activeQuiz.topic}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">{t('quiz_progress')}</div>
              <div className="text-2xl font-black text-primary">{progress}%</div>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-2.5">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 bg-primary h-full rounded-l-3xl" />
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-10 leading-tight pl-2">
            {q.question}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(q.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                disabled={!!selectedAnswer}
                className={`
                  p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-5 group
                  ${selectedAnswer === key
                    ? key === q.correct
                      ? 'bg-green-500/10 border-green-500'
                      : 'bg-red-500/10 border-red-500'
                    : selectedAnswer && key === q.correct
                      ? 'bg-green-500/10 border-green-500'
                      : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-primary hover:bg-white dark:hover:bg-primary/5'
                  }
                `}
              >
                <span className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0 transition-all
                  ${selectedAnswer === key
                    ? key === q.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    : selectedAnswer && key === q.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-white dark:bg-white/10 text-slate-800 dark:text-slate-200 shadow-sm group-hover:bg-primary group-hover:text-white'
                  }
                `}>{key}</span>
                <span className={`text-lg md:text-xl font-bold flex-1 ${selectedAnswer === key ? (key === q.correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300') : 'text-slate-700 dark:text-slate-200'}`}>
                  {value}
                </span>
                {selectedAnswer === key && key === q.correct && <RiCheckLine size={28} className="text-green-500 flex-shrink-0" />}
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto glass-card p-12 text-center mt-10"
      >
        <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 ${pct >= 80 ? 'bg-green-500/10 text-green-500' : pct >= 50 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
          <RiTrophyLine size={56} />
        </div>
        <h2 className="text-4xl font-heading font-extrabold text-gradient mb-2">{t('quiz_result')}</h2>
        <div className="text-7xl font-black text-slate-800 dark:text-white mb-1">{score}/{activeQuiz.questions.length}</div>
        <div className="text-2xl font-bold text-primary mb-6">{pct}%</div>
        <p className="text-lg text-slate-500 dark:text-slate-300 mb-8 font-bold">
          {pct === 100 ? t('quiz_excellent') : pct >= 50 ? t('quiz_good') : t('quiz_try')}
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => startQuiz(activeQuiz)} className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            <RiRestartLine /> {t('quiz_back')}
          </button>
          <button onClick={() => setActiveQuiz(null)} className="px-6 py-3 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-2xl font-bold">
            {t('quiz_title')}
          </button>
        </div>
      </motion.div>
    );
  }

  // Test list view
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
          <RiRobotLine /> AI Testlar
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-800 dark:text-white">
          Bilimingizni <span className="text-primary italic">sinang!</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {t('ai_quiz_sub_student')}
        </p>

        {isAdmin && (
          <div className="mt-8 max-w-2xl mx-auto">
            {!showGenerator ? (
              <button 
                onClick={() => setShowGenerator(true)}
                className="px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2 mx-auto"
              >
                <RiRobotLine /> + Yangi AI Test tuzish
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 border-primary/20 bg-primary/5"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold dark:text-white flex items-center gap-2">
                    <RiShieldCheckLine className="text-primary" /> Yangi test mavzusi
                  </h3>
                  <button onClick={() => setShowGenerator(false)} className="text-slate-400 hover:text-slate-600">
                    <RiCloseLine size={20} />
                  </button>
                </div>
                <form onSubmit={generateQuiz} className="flex gap-2">
                  <input 
                    type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                    placeholder="Masalan: Mexanika asoslari"
                    className="flex-1 px-4 py-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                  />
                  <button 
                    disabled={loading}
                    className="px-6 py-2 bg-primary text-white rounded-xl font-bold disabled:opacity-50"
                  >
                    {loading ? "..." : "Tuzish"}
                  </button>
                </form>

                {pendingQuiz && (
                  <div className="mt-6 p-4 bg-white/50 dark:bg-dark-surface/50 rounded-2xl border border-primary/10">
                    <p className="text-sm font-bold dark:text-white mb-3">AI 10 ta savol tuzdi: <span className="text-primary">{pendingQuiz.topic}</span></p>
                    <button 
                      onClick={approveQuiz}
                      className="w-full py-2 bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-500/20"
                    >
                      Tasdiqlash va e'lon qilish
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>

      {approvedQuizzes.length === 0 ? (
        <div className="py-24 text-center glass-card">
          <div className="flex justify-center text-slate-300 dark:text-slate-700 mb-4">
            <RiHistoryLine size={72} />
          </div>
          <h3 className="text-2xl font-bold text-slate-400">{t('quiz_empty')}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {approvedQuizzes.map((q) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                key={q.id}
                className="glass-card p-6 flex flex-col justify-between group hover:border-primary/50 transition-all border-2 border-transparent cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-primary text-white rounded-2xl w-fit shadow-lg shadow-primary/20">
                      <RiCheckLine size={24} />
                    </div>
                    {isAdmin && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteQuiz(q.id); }}
                        className="p-2 text-slate-400 hover:text-red-500 transition-all bg-white dark:bg-white/5 rounded-xl"
                      >
                        <RiDeleteBin6Line size={18} />
                      </button>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{q.topic}</h4>
                    <p className="text-sm text-slate-500 font-medium mt-1">{q.questions.length} ta savol • Fizika</p>
                  </div>
                </div>
                <button
                  onClick={() => startQuiz(q)}
                  className="mt-6 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <RiPlayFill size={22} /> {t('quiz_start')}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default StudentQuiz;
