import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiCalculatorLine, 
  RiRobotLine, 
  RiSendPlane2Line, 
  RiDeleteBinLine, 
  RiLightbulbLine,
  RiFunctionLine,
  RiVolumeUpLine,
  RiFileCopyLine,
  RiCheckLine
} from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import toast from 'react-hot-toast';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Math Rendering Utility
const MathRenderer = ({ content }) => {
  if (!content) return null;

  // Split content by $$...$$ (block) and $...$ (inline)
  const parts = content.split(/(\$\$.*?\$\$|\$.*?\$)/gs);

  return (
    <div className="math-rendered-content leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          return <BlockMath key={index} math={math} />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return <InlineMath key={index} math={math} />;
        }
        return <span key={index} className="whitespace-pre-wrap">{part}</span>;
      })}
    </div>
  );
};

const ProblemSolver = () => {
  const { user } = useAuth();
  const { speak } = useAccessibility();
  
  // Calculator State
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcFormula, setCalcFormula] = useState('');
  
  // AI State
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Salom ${user?.name || 'foydalanuvchi'}! Masalalarni yechish bo'limiga xush kelibsiz. Qanday murakkab fizika masalasini yechamiz?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Text cleaning for speech
  const cleanTextForSpeech = (text) => {
    return text
      .replace(/\$\$(.*?)\$\$/gs, '$1') // Remove block delimiters
      .replace(/\$(.*?)\$/g, '$1') // Remove inline delimiters
      .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, "$1 bo'lingan $2") // Fractions
      .replace(/\\cdot/g, " ko'paytirilgan ")
      .replace(/\\times/g, " ko'paytirilgan ")
      .replace(/\^2/g, " kvadrati")
      .replace(/\^3/g, " kubi")
      .replace(/\\text\{(.*?)\}/g, "$1") // Text commands
      .replace(/\\Delta/g, "delta")
      .replace(/[\\{}]/g, ""); // Remove remaining slashes and braces
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Nusxa olindi");
  };

  // Calculator Logic
  const handleCalcClick = (val) => {
    if (val === '=') {
      try {
        let expr = calcDisplay.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
        const result = eval(expr);
        setCalcFormula(calcDisplay + ' =');
        setCalcDisplay(String(Number(result.toFixed(4))));
      } catch (e) {
        toast.error("Xato ifoda");
      }
      return;
    }
    
    if (val === 'C') {
      setCalcDisplay('0');
      setCalcFormula('');
      return;
    }

    if (val === '√') {
      try {
        const res = Math.sqrt(eval(calcDisplay.replace(/×/g, '*').replace(/÷/g, '/')));
        setCalcFormula(`√(${calcDisplay}) =`);
        setCalcDisplay(String(Number(res.toFixed(4))));
      } catch (e) { toast.error("Xato"); }
      return;
    }

    if (calcDisplay === '0') setCalcDisplay(val);
    else setCalcDisplay(prev => prev + val);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { 
              role: 'system', 
              content: `Siz fizika masalalarini qadamma-qadam yechish bo'yicha professional mutaxassis AI assistantsiz. 
              
              MULOQOT QOIDALARI:
              1. Masalani yechishda albatta quyidagi tartibga amal qiling:
                 - **Berilgan**: (O'zgaruvchilar va qiymatlar)
                 - **Topish kerak**: (Noma'lum o'zgaruvchi)
                 - **Formulasi**: (Asosiy va yordamchi formulalar)
                 - **Yechilishi**: (Bosqichma-bosqich hisoblashlar va tushuntirishlar)
                 - **Javob**: (Yakuniy natija birligi bilan)
              
              2. FORMULALARKING YOZILISHI:
                 - Barcha matematik ifodalarni LaTeX formatida yozing.
                 - Albatta inline matematikaga $...$ ishlating.
                 - Muhim formulalar va alohida qatordagi natijalar uchun $$...$$ (bloking) ishlating.
                 - Teztli matnlarni \text{} ichiga oling, masalan: \text{km/soat}.

              3. Til: Faqat O'zbek tilida javob bering.` 
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            userMsg
          ]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
       toast.error("AI bilan bog'lanishda xato!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4 pt-4 transition-colors">
      <header className="space-y-2">
         <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
               <RiFunctionLine size={28} />
            </div>
            <div>
               <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Masalalar Yechimi</h1>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Scientific Calculator & AI Solver</p>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
           <div className="glass-card p-8 bg-[#0a0f1a] rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <RiCalculatorLine size={120} />
              </div>
              
              <div className="space-y-1 mb-8 text-right min-h-[80px] flex flex-col justify-end">
                 <p className="text-slate-500 font-bold tracking-widest h-5 uppercase text-[10px]">{calcFormula}</p>
                 <p className="text-5xl font-black text-white tracking-tighter truncate">{calcDisplay}</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                 {['C', '√', '^', '÷'].map(btn => (
                    <button key={btn} onClick={() => handleCalcClick(btn)} className="h-14 rounded-xl bg-white/5 text-primary font-black text-lg hover:bg-primary hover:text-white transition-all">{btn}</button>
                 ))}
                 {['7', '8', '9', '×'].map(btn => (
                    <button key={btn} onClick={() => handleCalcClick(btn)} className="h-14 rounded-xl bg-white/5 text-white font-black text-lg hover:bg-white/10 transition-all">{btn}</button>
                 ))}
                 {['4', '5', '6', '-'].map(btn => (
                    <button key={btn} onClick={() => handleCalcClick(btn)} className="h-14 rounded-xl bg-white/5 text-white font-black text-lg hover:bg-white/10 transition-all">{btn}</button>
                 ))}
                 {['1', '2', '3', '+'].map(btn => (
                    <button key={btn} onClick={() => handleCalcClick(btn)} className="h-14 rounded-xl bg-white/5 text-white font-black text-lg hover:bg-white/10 transition-all">{btn}</button>
                 ))}
                 {['0', '.', '=', ' '].map(btn => (
                    <button key={btn} onClick={() => btn !== ' ' && handleCalcClick(btn)} className={`h-14 rounded-xl font-black text-lg transition-all ${btn === '=' ? 'bg-primary text-white col-span-2' : btn === ' ' ? 'hidden' : 'bg-white/5 text-white hover:bg-white/10'}`}>{btn}</button>
                 ))}
              </div>
           </div>

           <div className="glass-card p-6 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 text-primary mb-2">
                 <RiLightbulbLine size={20} />
                 <h4 className="font-black uppercase text-[10px] tracking-[0.2em]">Maslahat</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                Masalani yechishda formulalardagi o'zgaruvchilarni (m, v, F, a) va birliklarni to'g'ri kiritganingizga ishonch hosil qiling.
              </p>
           </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 flex flex-col h-[650px] glass-card bg-white dark:bg-[#0d1526] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
           <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                    <RiRobotLine size={24} />
                 </div>
                 <div>
                    <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-sm">AI Fizika Solver</h3>
                    <div className="flex items-center gap-1.5 leading-none">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                       <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Katta model faollashtirilgan</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/30 dark:bg-transparent" ref={scrollRef}>
              {messages.map((msg, idx) => (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-5 rounded-[1.5rem] font-medium text-sm leading-relaxed shadow-sm relative group ${
                       msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white dark:bg-[#1a2333] text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-white/10'
                    }`}>
                       <MathRenderer content={msg.content} />
                       
                       {msg.role === 'assistant' && idx !== 0 && (
                         <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => speak(cleanTextForSpeech(msg.content), true)}
                             className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
                             title="Ovozli o'qish"
                           >
                             <RiVolumeUpLine size={16} /> Oqish
                           </button>
                           <button 
                             onClick={() => handleCopy(msg.content)}
                             className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
                             title="Nusxa ko'chirish"
                           >
                             <RiFileCopyLine size={16} /> Nusxa
                           </button>
                         </div>
                       )}
                    </div>
                 </motion.div>
              ))}
              {loading && (
                 <div className="flex flex-col items-start gap-2">
                    <div className="bg-white dark:bg-[#1a2333] p-4 rounded-2xl rounded-tl-none flex gap-2 border border-slate-200 dark:border-white/10">
                       <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                       <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-150" />
                       <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-300" />
                    </div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse pl-2">AI Masalani yechmoqda...</p>
                 </div>
              )}
           </div>

           <form onSubmit={handleSend} className="p-6 bg-white dark:bg-black/20 border-t border-slate-100 dark:border-white/5">
              <div className="relative flex items-center gap-3">
                 <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Masalani bu yerga yozing..."
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-6 pr-14 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm dark:text-white font-bold"
                 />
                 <button type="submit" disabled={loading} className="absolute right-2 p-3 bg-primary text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                    <RiSendPlane2Line size={20} />
                 </button>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
