import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiRobotLine, 
  RiSendPlane2Line, 
  RiCheckLine, 
  RiCloseLine, 
  RiRestartLine, 
  RiHistoryLine, 
  RiShieldCheckLine, 
  RiDeleteBin6Line,
  RiPlayFill
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

const AIQuiz = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingQuiz, setPendingQuiz] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [approvedQuizzes, setApprovedQuizzes] = useState([]);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Load approved quizzes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('approvedQuizzes');
    if (saved) {
      setApprovedQuizzes(JSON.parse(saved));
    }
  }, []);

  // Save approved quizzes to localStorage
  const saveQuizzes = (updated) => {
    setApprovedQuizzes(updated);
    localStorage.setItem('approvedQuizzes', JSON.stringify(updated));
  };

  const generateQuizForReview = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setPendingQuiz(null);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey) {
        toast.error("Groq API kaliti topilmadi! .env faylga VITE_GROQ_API_KEY qo'shing.");
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
          model: 'llama3-8b-8192',
          max_tokens: 3000,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: `Sen 6-sinf fizika fani bo'yicha O'zbek tilida professional test tuzuvchi AI assistantsan. Foydalanuvchi mavzu kiritganda, shu mavzu bo'yicha 10 ta test savoli tuz. Savollar asosan fizik formulalar, terminlar, birliklar va fizik kattaliklar (masalan: tezlik v=S/t, massa kg, kuch F=ma, bosim P=F/S) haqida bo'lsin. Har bir savol 4 ta variant (A, B, C, D) va to'g'ri javobni o'z ichiga olsin. MUHIM: Javobni FAQAT quyidagi JSON formatida qaytar, boshqa hech narsa yozma: {"topic": "string", "questions": [{"id": 1, "question": "string", "options": {"A": "string", "B": "string", "C": "string", "D": "string"}, "correct": "A"}]}`
            },
            {
              role: 'user',
              content: `Mavzu: ${topic} bo'yicha 10 ta test savoli tuz.`
            }
          ]
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'API xatosi');
      }

      const data = await response.json();
      const rawContent = data.choices[0].message.content.trim();
      
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('JSON topilmadi');
      
      const parsedQuiz = JSON.parse(jsonMatch[0]);
      setPendingQuiz({ ...parsedQuiz, id: Date.now(), approved: false });
      setLoading(false);
      toast.success(`🤖 AI ${parsedQuiz.questions?.length || 10} ta sifatli test tayyorladi!`);
    } catch (error) {
      console.error('Groq API xatosi:', error);
      toast.error(`Xatolik: ${error.message}`);
      setLoading(false);
    }
  };

  const approveQuiz = () => {
    if (!pendingQuiz) return;
    const updated = [...approvedQuizzes, { ...pendingQuiz, approved: true }];
    saveQuizzes(updated);
    setPendingQuiz(null);
    setTopic('');
    toast.success("10 ta savoldan iborat yangi test e'lon qilindi!");
  };

  const deleteQuiz = (id) => {
    const updated = approvedQuizzes.filter(q => q.id !== id);
    saveQuizzes(updated);
    toast.success("Test o'chirib tashlandi.");
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
      toast.error(`Aslida: ${activeQuiz.questions[currentIdx].correct}`, { duration: 1500 });
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

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 px-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
          <RiRobotLine /> AI Test Tizimi
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-800 dark:text-white">
          Sun'iy Intellekt <span className="text-primary italic">Bilim Testi</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          {isAdmin 
            ? "Admin panel: 10 ta savoldan iborat testlar yarating va o'quvchilar uchun tasdiqlang." 
            : "Tasdiqlangan mavzular bo'yicha o'z bilimingizni sinab ko'ring."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Admin Controls or Status */}
        <div className="lg:col-span-1 space-y-6">
          {isAdmin ? (
            <div className="glass-card p-6 space-y-6 sticky top-24">
              <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <RiShieldCheckLine className="text-primary" /> Yangi Test Yaratish
              </h3>
              <form onSubmit={generateQuizForReview} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Mavzu nomi (Formula/Terminlar)</label>
                  <input 
                    type="text" 
                    placeholder="Masalan: Mexanika formulalari"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading || !topic.trim()}
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {loading ? <div className="animate-spin border-2 border-white/20 border-t-white rounded-full w-5 h-5"></div> : <><RiRobotLine/> 10 ta Savol Tayyorlash</>}
                </button>
              </form>

              {pendingQuiz && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-3"
                >
                  <div className="text-sm font-bold text-primary">Tekshirish uchun tayyor!</div>
                  <p className="text-xs text-slate-500 line-clamp-2">"{pendingQuiz.topic}" bo'yicha {pendingQuiz.questions.length} ta savol tayyorlandi.</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={approveQuiz}
                      className="flex-1 py-2 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 transition-all shadow-sm"
                    >
                      Tasdiqlash
                    </button>
                    <button 
                      onClick={() => setPendingQuiz(null)}
                      className="px-3 py-2 bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold"
                    >
                      Rad etish
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="glass-card p-8 text-center space-y-4 sticky top-24">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <RiRobotLine size={32} />
              </div>
              <h3 className="text-lg font-bold dark:text-white">O'quvchi rejimi</h3>
              <p className="text-sm text-slate-500">
                Faqat admin tomonidan tasdiqlangan (kamida 10 ta savolli) testlargina bu yerda ko'rinadi.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Quiz List or Active Quiz or Review Area */}
        <div className="lg:col-span-2 space-y-6">
          {isAdmin && pendingQuiz ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-dark-surface p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">AI Test: <span className="text-primary">{pendingQuiz.topic}</span></h3>
                  <p className="text-sm text-slate-400 font-medium">Iltimos, o'quvchilar uchun e'lon qilishdan oldin nazorat qiling.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button onClick={approveQuiz} className="flex-1 md:flex-none px-8 py-3 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 shadow-xl shadow-green-500/20 transition-all">Tasdiqlash</button>
                  <button onClick={() => setPendingQuiz(null)} className="flex-1 md:flex-none px-8 py-3 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-200 rounded-2xl font-bold transition-all">Bekor qilish</button>
                </div>
              </div>
              <div className="space-y-4">
                {pendingQuiz.questions.map((q, idx) => (
                  <div key={idx} className="glass-card p-6 border-l-4 border-primary bg-white dark:bg-dark-surface/50">
                    <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-6 flex gap-3">
                      <span className="text-primary">#{q.id}</span> {q.question}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(q.options).map(([key, val]) => (
                        <div key={key} className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all ${key === q.correct ? 'bg-green-500/10 text-green-600 border-2 border-green-500/20' : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-transparent'}`}>
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${key === q.correct ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>{key}</span>
                          {val}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : !activeQuiz ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {approvedQuizzes.length === 0 ? (
                  <div className="col-span-full py-20 text-center glass-card">
                    <div className="text-slate-300 dark:text-slate-700 mb-4 flex justify-center">
                      <RiHistoryLine size={64} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-400">Hozircha tasdiqlangan testlar yo'q</h4>
                  </div>
                ) : (
                  approvedQuizzes.map((q) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={q.id}
                      className="glass-card p-6 flex flex-col justify-between group h-full hover:border-primary/50 transition-all border-2 border-transparent"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                            <RiCheckLine size={24} />
                          </div>
                          {isAdmin && (
                            <button 
                              onClick={() => deleteQuiz(q.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-all bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5"
                            >
                              <RiDeleteBin6Line size={20} />
                            </button>
                          )}
                        </div>
                        <div>
                          <h4 className="text-2xl font-extrabold text-slate-800 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{q.topic}</h4>
                          <p className="text-sm text-slate-500 font-medium">10 ta savol • Fizika terminlari</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => startQuiz(q)}
                        className="mt-8 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
                      >
                        <RiPlayFill size={24} /> TESTNI BOSHLASH
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          ) : showResults ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 text-center bg-gradient-to-b from-white to-slate-50 dark:from-dark-surface dark:to-dark-bg"
            >
              <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <RiCheckLine size={48} />
              </div>
              <h2 className="text-4xl font-heading font-extrabold text-gradient mb-4">Natijangiz!</h2>
              <div className="text-7xl font-black text-slate-800 dark:text-white mb-2">{score}/{activeQuiz.questions.length}</div>
              <p className="text-lg text-slate-500 dark:text-slate-300 mb-8 font-bold">
                {score === activeQuiz.questions.length ? "A'lo! Siz daho ekansiz! 🏆" : score > activeQuiz.questions.length / 2 ? "Yaxshi natija! 👏" : "Yana o'qishingiz kerak. 💪"}
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setActiveQuiz(null)}
                  className="px-8 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all"
                >
                  <RiRestartLine /> Bo'limga qaytish
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white dark:bg-dark-surface p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-primary/20">
                    {currentIdx + 1}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Savol raqami</div>
                    <div className="text-lg font-bold dark:text-white truncate max-w-[200px]">{activeQuiz.topic}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Progress</div>
                  <div className="text-2xl font-black text-primary">{Math.round(((currentIdx + 1) / activeQuiz.questions.length) * 100)}%</div>
                </div>
              </div>

              <motion.div 
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 md:p-14 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 bg-primary h-full"></div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-12 leading-tight">
                  {activeQuiz.questions[currentIdx].question}
                </h2>
                <div className="grid grid-cols-1 gap-5">
                  {Object.entries(activeQuiz.questions[currentIdx].options).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => handleAnswer(key)}
                      disabled={!!selectedAnswer}
                      className={`
                        p-6 rounded-3xl border-2 text-left transition-all relative flex items-center gap-6 group
                        ${selectedAnswer === key 
                          ? (key === activeQuiz.questions[currentIdx].correct ? 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-300' : 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-300') 
                          : (selectedAnswer && key === activeQuiz.questions[currentIdx].correct ? 'bg-green-500/10 border-green-500' : 'bg-slate-50 dark:bg-white/5 border-transparent dark:border-white/5 hover:border-primary hover:bg-white dark:hover:bg-primary/5')
                        }
                      `}
                    >
                      <span className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all
                        ${selectedAnswer === key ? 'bg-current text-white shadow-lg' : 'bg-white dark:bg-white/10 text-slate-800 dark:text-slate-200 shadow-sm group-hover:bg-primary group-hover:text-white'}
                      `}>{key}</span>
                      <span className={`text-lg md:text-xl font-bold flex-1 ${selectedAnswer === key ? 'text-current' : 'text-slate-700 dark:text-slate-200'}`}>{value}</span>
                      {selectedAnswer === key && key === activeQuiz.questions[currentIdx].correct && <RiCheckLine size={32} className="text-green-500" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIQuiz;
