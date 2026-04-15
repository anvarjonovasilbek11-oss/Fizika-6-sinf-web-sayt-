import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  RiTimeLine,
  RiSearchLine,
  RiEyeLine,
  RiEyeOffLine,
  RiKey2Line,
  RiInformationLine
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
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePasswordVisibility = (username) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quotes = [
    { text: "Fizika – bu tabiat sirlarini ochuvchi kalit.", author: "Albert Eynshteyn" },
    { text: "Ilm – bu qorong'ulikka nur bag'ishlovchi mayoq.", author: "Abu Rayhon Beruniy" },
    { text: "Haqiqat har doim oddiy, lekin har doim ham oson emas.", author: "Isaak Nyuton" }
  ];

  const dailyFacts = [
    "Yorug'lik tezligi sekundiga qariyb 300,000 kilometrni tashkil etadi.",
    "Suv 100 darajada qaynaydi, lekin tog' cho'qqisida pastroq haroratda qaynaydi.",
    "Ovoz havoda sekundiga taxminan 340 metr tezlikda tarqaladi."
  ];

  const getDailyFact = () => dailyFacts[new Date().getDay() % dailyFacts.length];

  const [counts, setCounts] = useState({ videos: 0, lessons: 0, materials: 0, users: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const textbooks = getCombinedTextbooks(true);
      const lessonsCount = textbooks.reduce((acc, curr) => acc + curr.lessons.length, 0);
      
      const customVideos = JSON.parse(localStorage.getItem('customVideos') || '[]');
      const finalVideos = VIDEOS.length + customVideos.filter(cv => !VIDEOS.some(v => v.id === cv.id)).length;

      // Qo'llanmalar sonini LocalForage (IndexedDB) dan o'qish
      let materialsCount = 0;
      try {
        const storedFiles = await localforage.getItem('physics_files');
        if (storedFiles && Array.isArray(storedFiles)) {
          materialsCount = storedFiles.length;
        }
      } catch (err) {
        console.error('Home: materiallar sonini olishda xato:', err);
      }

      setCounts({
        videos: finalVideos,
        lessons: lessonsCount,
        materials: materialsCount, 
        users: allUsers.length
      });
    };
    fetchCounts();
  }, [allUsers]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 pb-20 relative transition-colors">
      <header className="relative space-y-4 pt-4">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primary rounded-full shadow-sm shadow-primary/40" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">FIZIKA OLAMIGA XUSH KELIBSIZ</h2>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter"
        >
          FIZIKA <span className="text-primary italic">DUNYOSI</span>
        </motion.h1>
      </header>

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

              {/* Search Bar */}
              <div className="px-8 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                <div className="relative group">
                  <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="text"
                    placeholder="Foydalanuvchilarni ism yoki username bo'yicha qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm dark:text-white"
                  />
                </div>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 text-center">
                      <th className="pb-4 pl-4 text-left">Foydalanuvchi</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Bio / Ma'lumot</th>
                      <th className="pb-4">Parol</th>
                      <th className="pb-4">Sana</th>
                      <th className="pb-4">Amal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {filteredUsers.map((u) => (
                      <tr key={`${u.username}-${u.role}`} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0 ${u.role === 'admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'}`}>
                              {u.username.substring(0, 1).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-slate-800 dark:text-white truncate">@{u.username}</p>
                              <p className="text-[10px] text-slate-500 font-bold truncate tracking-wide">{u.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'}`}>
                            {u.role === 'admin' ? 'Admin' : 'Student'}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex flex-col items-center justify-center max-w-[150px] mx-auto">
                            {u.bio ? (
                              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium italic line-clamp-2" title={u.bio}>
                                {u.bio}
                              </p>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic font-bold">Mavjud emas</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <code className="bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-xs font-mono text-primary dark:text-electric-blue">
                              {visiblePasswords[u.username] ? u.password : '••••••••'}
                            </code>
                            <button 
                              onClick={() => togglePasswordVisibility(u.username)}
                              className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                            >
                              {visiblePasswords[u.username] ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                           <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 whitespace-nowrap">
                             <RiTimeLine size={14} /> {u.regDate || 'N/A'}
                           </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center">
                            {u.username !== 'Asilbek' ? (
                              <button 
                                onClick={() => {
                                  if (window.confirm(`${u.username} o'chirilsinmi?`)) {
                                    deleteUser(u.username);
                                    toast.success("Foydalanuvchi o'chirildi");
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                title="Foydalanuvchini o'chirish"
                              >
                                <RiDeleteBin6Line size={18} />
                              </button>
                            ) : (
                              <RiShieldUserLine className="text-amber-500/30" size={18} title="Asosiy Adminni o'chirib bo'lmaydi" />
                            )}
                          </div>
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
    whileHover={{ y: -10, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick}
    className={`glass-card p-8 flex flex-col items-center text-center group transition-all duration-500 hover:border-primary/20 ${glowColor} shadow-xl hover:shadow-2xl`}
  >
    <div className={`w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${accentColor}`}>
      {React.cloneElement(icon, { size: 36 })}
    </div>
    <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tighter">{count}</div>
    <div className="text-sm font-bold text-slate-900 dark:text-white/90 mb-2 tracking-tight">{label}</div>
    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed max-w-[150px]">{description}</div>
    
    <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/20`} />
  </motion.button>
);

export default Home;
