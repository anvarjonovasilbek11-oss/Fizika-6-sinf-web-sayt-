import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  RiVideoLine, 
  RiBookReadLine, 
  RiQuestionAnswerLine, 
  RiDoubleQuotesL, 
  RiUser3Line, 
  RiFileTextLine,
  RiCloseLine,
  RiDeleteBin6Line,
  RiShieldUserLine,
  RiTimeLine
} from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { VIDEOS } from '../data/videoData';
import { getCombinedTextbooks } from '../services/textbookService';
import localforage from 'localforage';

const Home = () => {
  const { user, users: allUsers, deleteUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [showUserModal, setShowUserModal] = useState(false);

  // ... (quotes, dailyFacts, getDailyFact, counts state remains same)

  // ... (fetchData useEffect remains same)

  return (
    <div className="space-y-12 pb-20 relative transition-colors">
      {/* ... (Announcement Ticker, Hero Section remains same) */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         <ActionCard 
           icon={<RiVideoLine />} 
           count={counts.videos} 
           label="Video darslar" 
           description="Mavzuga oid videolar"
           accentColor="text-red-500"
           glowColor="group-hover:shadow-red-500/10"
           onClick={() => navigate('/videos')}
         />
         <ActionCard 
           icon={<RiBookReadLine />} 
           count={counts.lessons} 
           label="Nazariy darslar" 
           description="Kitobdagi barcha boblar"
           accentColor="text-electric-blue"
           glowColor="group-hover:shadow-electric-blue/10"
           onClick={() => navigate('/textbook/bob-1/1')}
         />
         <ActionCard 
           icon={<RiFileTextLine />} 
           count={counts.materials} 
           label="O'quv qo'llanmalar" 
           description="PDF, Word va Zip fayllar"
           accentColor="text-amber-500"
           glowColor="group-hover:shadow-amber-500/10"
           onClick={() => navigate('/materials')}
         />
         <ActionCard 
           icon={<RiUser3Line />} 
           count={counts.users} 
           label="Obunachilar" 
           description="Ro'yxatdan o'tganlar"
           accentColor="text-neon-purple"
           glowColor="group-hover:shadow-neon-purple/10"
           onClick={() => isAdmin && setShowUserModal(true)}
         />
      </div>

      <AnimatePresence>
        {showUserModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-white dark:bg-[#0d1526] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10"
            >
              <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                    <RiUser3Line size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Obunachilar Boshqaruvi</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mt-1">Jami: {allUsers.length} ta foydalanuvchi</p>
                  </div>
                </div>
                <button onClick={() => setShowUserModal(false)} className="p-3 bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-red-500 rounded-full transition-all">
                  <RiCloseLine size={24} />
                </button>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5">
                      <th className="pb-4 pl-4">Foydalanuvchi</th>
                      <th className="pb-4">Username</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Sana</th>
                      <th className="pb-4 text-center">Amal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {allUsers.map((u) => (
                      <tr key={u.username} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${u.role === 'admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'}`}>
                              {u.username.substring(0, 1).toUpperCase()}
                            </div>
                            <span className="font-black text-slate-800 dark:text-white">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-4 font-bold text-slate-600 dark:text-slate-400">@{u.username}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'}`}>
                            {u.role === 'admin' ? 'Admin' : 'O\'quvchi'}
                          </span>
                        </td>
                        <td className="py-4">
                           <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                             <RiTimeLine size={14} /> {u.regDate || 'Noma\'lum'}
                           </div>
                        </td>
                        <td className="py-4 text-center">
                          {u.username !== 'Asilbek' && (
                            <button 
                              onClick={() => {
                                if (window.confirm(`${u.username} o'chirilsinmi?`)) {
                                  deleteUser(u.username);
                                  toast.success("Foydalanuvchi o'chirildi");
                                }
                              }}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <RiDeleteBin6Line size={20} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card bg-white dark:bg-white/5 p-8 flex flex-col justify-center min-h-[200px] border border-slate-200 dark:border-white/5 shadow-2xl">
          <RiDoubleQuotesL className="text-4xl text-primary/30 mb-4" />
          <motion.div key={quoteIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="text-xl italic font-black text-slate-900 dark:text-white">"{quotes[quoteIdx].text}"</p>
            <p className="mt-4 text-primary font-black uppercase tracking-widest">— {quotes[quoteIdx].author}</p>
          </motion.div>
        </div>

        <div className="glass-card bg-white dark:bg-white/5 p-8 space-y-4 border border-slate-200 dark:border-white/5 shadow-2xl">
          <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-3">
             <div className="w-2 h-8 bg-primary rounded-full" /> Kun Fakt
          </h3>
          <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 dark:border-primary/10 italic text-lg text-slate-800 dark:text-slate-100 font-bold">
             "{getDailyFact()}"
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-black tracking-[0.2em] text-right">— Bilasizmi?</p>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ icon, count, label, description, accentColor, glowColor, onClick }) => (
  <motion.button
    whileHover={{ y: -12, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick}
    className={`glass-card p-8 flex flex-col items-center text-center group transition-all duration-500 border-slate-100 dark:border-white/5 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 ${glowColor} shadow-xl hover:shadow-2xl`}
  >
    <div className={`w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${accentColor}`}>
      {React.cloneElement(icon, { size: 40 })}
    </div>
    <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">{count}</div>
    <div className="text-sm font-black text-slate-700 dark:text-white/90 mb-2 uppercase tracking-widest">{label}</div>
    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight leading-relaxed">{description}</div>
    
    <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-current to-transparent ${accentColor}`} />
  </motion.button>
);

export default Home;
