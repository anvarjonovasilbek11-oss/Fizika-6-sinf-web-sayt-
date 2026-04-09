import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiRobotLine, 
  RiCheckLine, 
  RiRestartLine, 
  RiHistoryLine, 
  RiPlayFill,
  RiTrophyLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const StudentQuiz = () => {
  const [approvedQuizzes, setApprovedQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('approvedQuizzes');
    if (saved) {
      setApprovedQuizzes(JSON.parse(saved));
    }
  }, []);

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
      toast.error(`To'g'ri javob: ${activeQuiz.questions[currentIdx].correct}`, { duration: 2000 });
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
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Savol</div>
                <div className="text-lg font-bold dark:text-white">{activeQuiz.topic}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Progress</div>
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
        <h2 className="text-4xl font-heading font-extrabold text-gradient mb-2">Natijangiz!</h2>
        <div className="text-7xl font-black text-slate-800 dark:text-white mb-1">{score}/{activeQuiz.questions.length}</div>
        <div className="text-2xl font-bold text-primary mb-6">{pct}%</div>
        <p className="text-lg text-slate-500 dark:text-slate-300 mb-8 font-bold">
          {pct === 100 ? "A'lo! Siz mutlaq chempionsiz! 🏆" : pct >= 80 ? "Zo'r natija! 🎉" : pct >= 50 ? "Yaxshi harakat! Yana bir bor o'qing 📚" : "Yana urinib ko'ring va ko'proq o'qing 💪"}
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => startQuiz(activeQuiz)} className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            <RiRestartLine /> Qayta boshlash
          </button>
          <button onClick={() => setActiveQuiz(null)} className="px-6 py-3 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-2xl font-bold">
            Test tanlash
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
          Admin tomonidan tasdiqlangan testlar. O'zingizga mos mavzuni tanlang va boshlang.
        </p>
      </div>

      {approvedQuizzes.length === 0 ? (
        <div className="py-24 text-center glass-card">
          <div className="flex justify-center text-slate-300 dark:text-slate-700 mb-4">
            <RiHistoryLine size={72} />
          </div>
          <h3 className="text-2xl font-bold text-slate-400">Hali hech qanday test yo'q</h3>
          <p className="text-slate-400 mt-2">Admin testlarni tasdiqlagandan so'ng bu yerda ko'rinadi.</p>
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
                  <div className="p-3 bg-primary text-white rounded-2xl w-fit shadow-lg shadow-primary/20">
                    <RiCheckLine size={24} />
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
                  <RiPlayFill size={22} /> BOSHLASH
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
