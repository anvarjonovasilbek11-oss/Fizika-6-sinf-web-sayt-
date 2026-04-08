import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobotLine, RiSendPlane2Line, RiQuestionLine, RiCheckLine, RiCloseLine, RiRestartLine, RiHistoryLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const AIQuiz = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const generateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setQuiz(null);
    setCurrentIdx(0);
    setScore(0);
    setShowResults(false);

    try {
      // Note: In production, this should be done via a backend proxy.
      // We use import.meta.env.VITE_ANTHROPIC_API_KEY as requested.
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      
      if (!apiKey) {
        // Fallback for demo if no API key is provided
        setTimeout(() => {
          const mockQuiz = {
            topic: topic,
            questions: [
              {
                id: 1,
                question: `${topic} bo'yicha asosiy tushuncha nima?`,
                options: { A: "Variant 1", B: "Variant 2", C: "To'g'ri javob", D: "Variant 4" },
                correct: "C"
              },
              {
                id: 2,
                question: `Fizikada ${topic} qanday o'lchanadi?`,
                options: { A: "Metr", B: "Kilogramm", C: "Sekund", D: "Maxsus birlik" },
                correct: "D"
              }
            ]
          };
          setQuiz(mockQuiz);
          setLoading(false);
          toast.success("Test tayyor!");
        }, 2000);
        return;
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'dangerously-allow-browser': 'true' // For frontend demo only
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          system: "Sen 6-sinf fizika fani bo'yicha Uzbek tilida test tuzuvchi AI assistantsan. Foydalanuvchi mavzu kiritganda, shu mavzu bo'yicha 10 ta test savoli tuz. Har bir savol 4 ta variant (A, B, C, D) va to'g'ri javobni o'z ichiga olsin. Javobni faqat JSON formatida qaytar, quyidagi tuzilmada: {topic: string, questions: [{id: number, question: string, options: {A: string, B: string, C: string, D: string}, correct: string}]}",
          messages: [{ role: 'user', content: `Mavzu: ${topic}` }]
        })
      });

      const data = await response.json();
      const content = data.content[0].text;
      const parsedQuiz = JSON.parse(content);
      setQuiz(parsedQuiz);
      setLoading(false);
      toast.success("Test muvaffaqiyatli yaratildi!");
    } catch (error) {
      console.error(error);
      toast.error("AI bilan bog'lanishda xatolik yuz berdi.");
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    
    if (option === quiz.questions[currentIdx].correct) {
      setScore(prev => prev + 1);
      toast.success("To'g'ri!", { duration: 1000 });
    } else {
      toast.error(`Noto'g'ri! To'g'ri javob: ${quiz.questions[currentIdx].correct}`, { duration: 1500 });
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentIdx + 1 < quiz.questions.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setShowResults(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-heading text-gradient">AI Test Generator</h1>
        <p className="text-slate-500 mt-2">Istalgan mavzuni yozing va AI sizga test tuzib beradi</p>
      </div>

      {!quiz && !showResults && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <RiRobotLine size={40} />
          </div>
          <form onSubmit={generateQuiz} className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Mavzuni kiriting (masalan: Bosim, Arximed kuchi...)" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading}
                className="w-full pl-6 pr-16 py-4 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary text-lg dark:text-white"
              />
              <button 
                type="submit"
                disabled={loading || !topic.trim()}
                className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all"
              >
                {loading ? <div className="animate-spin border-2 border-white/30 border-t-white rounded-full w-5 h-5"></div> : <RiSendPlane2Line size={24} />}
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {['Zichlik', 'Issiqlik', 'Elektr', 'Optika'].map(t => (
                <button 
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-all"
                >
                  {t}
                </button>
              ))}
            </div>
          </form>
        </motion.div>
      )}

      {quiz && !showResults && (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-sm text-slate-500">
            <span>Mavzu: <b className="text-primary">{quiz.topic}</b></span>
            <span>Savol: <b>{currentIdx + 1}/{quiz.questions.length}</b></span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-2">
            <motion.div 
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>

          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
              {quiz.questions[currentIdx].id}. {quiz.questions[currentIdx].question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(quiz.questions[currentIdx].options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  disabled={!!selectedAnswer}
                  className={`
                    p-4 rounded-2xl border text-left transition-all relative overflow-hidden
                    ${selectedAnswer === key 
                      ? (key === quiz.questions[currentIdx].correct ? 'bg-green-500/20 border-green-500 text-green-700 dark:text-green-300' : 'bg-red-500/20 border-red-500 text-red-700 dark:text-red-300') 
                      : (selectedAnswer && key === quiz.questions[currentIdx].correct ? 'bg-green-500/20 border-green-500' : 'bg-white dark:bg-dark-surface border-slate-200 dark:border-white/10 hover:border-primary')
                    }
                  `}
                >
                  <span className="inline-block w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center font-bold mr-3">{key}</span>
                  {value}
                  {selectedAnswer === key && key === quiz.questions[currentIdx].correct && <RiCheckLine className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={24} />}
                  {selectedAnswer === key && key !== quiz.questions[currentIdx].correct && <RiCloseLine className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" size={24} />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {showResults && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center"
        >
          <h2 className="text-4xl font-heading font-extrabold text-gradient mb-4">Natijangiz!</h2>
          <div className="text-6xl font-black text-slate-800 dark:text-white mb-2">{score}/{quiz.questions.length}</div>
          <p className="text-slate-500 mb-8">
            {score === quiz.questions.length ? "A'lo! Siz daho ekansiz!" : score > quiz.questions.length / 2 ? "Yaxshi natija! Yana biroz harakat qiling." : "Yana o'qishingiz kerak. Bo'shashmang!"}
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => { setQuiz(null); setShowResults(false); }}
              className="btn-primary flex items-center gap-2"
            >
              <RiRestartLine /> Yangi test
            </button>
            <button className="bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
              <RiHistoryLine /> Tarix
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIQuiz;
