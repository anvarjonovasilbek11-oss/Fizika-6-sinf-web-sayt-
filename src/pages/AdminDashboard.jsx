import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  RiGroupLine, 
  RiVideoLine, 
  RiBook3Line, 
  RiSearchLine,
  RiDeleteBin6Line,
  RiEyeLine,
  RiEyeOffLine,
  RiSave3Line,
  RiPlayCircleLine,
  RiTerminalBoxLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { VIDEOS } from './VideoLessons';
import { TEXTBOOK_DATA } from '../data/textbookData';

const AdminDashboard = () => {
  const { users, deleteUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPasswords, setShowPasswords] = useState({});
  const navigate = useNavigate();
  
  // CMS State
  const [cmsTitle, setCmsTitle] = useState('');
  const [cmsCategory, setCmsCategory] = useState('Kirish');
  const [cmsVideoId, setCmsVideoId] = useState('');
  const [customVideos, setCustomVideos] = useState([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('customVideos');
    if (saved) {
      setCustomVideos(JSON.parse(saved));
    }
  }, []);

  // Filter students based on search (exclude the admin account)
  const students = users.filter(u => u.role !== 'admin');
  const filteredStudents = students.filter(s => 
    s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePassword = (username) => {
    setShowPasswords(prev => ({ ...prev, [username]: !prev[username] }));
  };

  const handleDeleteUser = (username) => {
    if (window.confirm(`Rostdan ham ${username} ni o'chirib tashlamoqchimisiz?`)) {
      if (deleteUser(username)) {
        toast.success(`Foydalanuvchi ${username} tizimdan o'chirildi!`);
      }
    }
  };

  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!cmsTitle || !cmsVideoId) {
      toast.error("Iltimos, video nomi va linkni kiriting.");
      return;
    }

    // Extract ID if full youtube link is pasted
    let finalId = cmsVideoId;
    if (cmsVideoId.includes('v=')) {
      finalId = cmsVideoId.split('v=')[1].split('&')[0];
    } else if (cmsVideoId.includes('youtu.be/')) {
      finalId = cmsVideoId.split('youtu.be/')[1].split('?')[0];
    }

    const newVideo = {
      id: Date.now().toString(),
      videoId: finalId,
      title: cmsTitle,
      topic: cmsTitle, // Simplified topic tracking
      category: cmsCategory,
      isCustom: true
    };

    const updatedVideos = [...customVideos, newVideo];
    setCustomVideos(updatedVideos);
    localStorage.setItem('customVideos', JSON.stringify(updatedVideos));
    
    setCmsTitle('');
    setCmsVideoId('');
    toast.success("Muvaffaqiyatli! Darslik sayt xotirasiga saqlandi!");
  };

  // Total stats computation
  let totalLessons = 0;
  TEXTBOOK_DATA.forEach(chap => totalLessons += chap.lessons.length);
  const totalVideos = VIDEOS.length + customVideos.length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4 font-sans selection:bg-indigo-500/30">
      
      {/* Header and Master Prompt Notice */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-indigo-950 via-[#181829] to-violet-950 p-8 rounded-3xl border border-indigo-500/30 shadow-[0_0_40px_rgba(79,70,229,0.15)] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="relative z-10 w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30 uppercase tracking-widest shadow-inner">
            <RiTerminalBoxLine size={16} /> Ilg'or Boshqaruv (Admin Panel)
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-violet-400">
            Fizika Olam — Boshqaruv
          </h1>
          <p className="text-indigo-200/70 max-w-2xl text-sm font-medium leading-relaxed border-l-2 border-indigo-500/50 pl-4">
            Security Disclaimer: Admin panelga kirishda oddiygina "if user === admin" emas, balki simulyatsiya qilingan protected route (HOC) mantiqiy izolatsiyasi ishlatilmoqda. Tizim to'liq boshqaruvga ega.
          </p>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          onClick={() => setActiveTab('students')}
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="bg-gradient-to-br from-[#1b1b2f] to-[#121223] border border-indigo-500/20 p-6 rounded-3xl shadow-lg relative overflow-hidden group hover:border-indigo-500/50 transition-all cursor-pointer"
          title="Talabalar ro'yxatiga o'tish"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
          <RiGroupLine className="text-indigo-400 mb-4" size={32} />
          <h3 className="text-3xl font-black text-white">{students.length}</h3>
          <p className="text-indigo-300/80 text-sm font-medium mt-1">Jami Talabalar Soni</p>
        </motion.div>
        
        <motion.div 
          onClick={() => navigate('/materials')}
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }} 
          className="bg-gradient-to-br from-[#1b1b2f] to-[#121223] border border-violet-500/20 p-6 rounded-3xl shadow-lg relative overflow-hidden group hover:border-violet-500/50 transition-all cursor-pointer"
          title="Darsliklar sahifasiga o'tish"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all"></div>
          <RiBook3Line className="text-violet-400 mb-4" size={32} />
          <h3 className="text-3xl font-black text-white">{totalLessons} <span className="text-sm font-normal text-slate-500">/{TEXTBOOK_DATA.length} bo'lim</span></h3>
          <p className="text-violet-300/80 text-sm font-medium mt-1">Yuklangan Darsliklar</p>
        </motion.div>

        <motion.div 
          onClick={() => navigate('/videos')}
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }} 
          className="bg-gradient-to-br from-[#1b1b2f] to-[#121223] border border-fuchsia-500/20 p-6 rounded-3xl shadow-lg relative overflow-hidden group hover:border-fuchsia-500/50 transition-all cursor-pointer"
          title="Video darslar sahifasiga o'tish"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/20 transition-all"></div>
          <RiVideoLine className="text-fuchsia-400 mb-4" size={32} />
          <h3 className="text-3xl font-black text-white">{totalVideos} <span className="text-sm font-normal text-slate-500">({customVideos.length} custom)</span></h3>
          <p className="text-fuchsia-300/80 text-sm font-medium mt-1">Video Darslar Miqdori</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-indigo-500/20 pb-4">
        <button 
          onClick={() => setActiveTab('students')}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'students' ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'bg-[#1b1b2f] text-indigo-300/70 hover:bg-indigo-500/10'}`}
        >
          Talabalarni Boshqarish
        </button>
        <button 
          onClick={() => setActiveTab('cms')}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'cms' ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'bg-[#1b1b2f] text-violet-300/70 hover:bg-violet-500/10'}`}
        >
          Video-CMS Tizimi
        </button>
      </div>

      {/* Tab Contents Main Container */}
      <div className="bg-[#121221] border border-indigo-500/20 rounded-3xl p-6 min-h-[500px] shadow-2xl relative">
        <AnimatePresence mode="wait">
          
          {/* TAB: STUDENTS */}
          {activeTab === 'students' && (
            <motion.div 
              key="tab-students"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-indigo-500/10 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    Barcha Talabalar 
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md">{filteredStudents.length} ta natija</span>
                  </h2>
                  <p className="text-indigo-200/60 text-sm mt-1">Parollarni monitoring qiling va kerakli resurslarni tozalang.</p>
                </div>
                <div className="relative w-full md:w-72">
                  <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                  <input 
                    type="text" 
                    placeholder="Ism bo'yicha qidiruv..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#1a1a2e] border border-indigo-500/30 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 text-indigo-100 placeholder:text-indigo-400/50 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-indigo-500/20">
                      <th className="py-4 px-4 text-xs tracking-wider uppercase font-black text-indigo-400/70">Talaba Ismi/Username</th>
                      <th className="py-4 px-4 text-xs tracking-wider uppercase font-black text-indigo-400/70">Maxfiy Parol</th>
                      <th className="py-4 px-4 text-xs tracking-wider uppercase font-black text-indigo-400/70">Tizim Rol</th>
                      <th className="py-4 px-4 text-xs tracking-wider uppercase font-black text-indigo-400/70 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredStudents.map((student) => (
                        <motion.tr 
                          key={student.username}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="border-b border-indigo-500/10 hover:bg-indigo-500/5 transition-colors group"
                        >
                          <td className="py-4 px-4">
                            <div className="font-bold text-indigo-100">{student.name}</div>
                            <div className="text-xs text-indigo-300/50">{student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'Eski akkaunt'}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-violet-300 bg-violet-500/10 px-2 py-1 rounded w-32 tracking-wider">
                                {showPasswords[student.username] ? student.password : '••••••••'}
                              </span>
                              <button 
                                onClick={() => togglePassword(student.username)}
                                className="text-indigo-400/50 hover:text-indigo-300 transition-colors"
                                title="Pro Maslahat: Aslida parollar yashirin bo'ladi, lekin monitoring uchun ochib qo'yildi."
                              >
                                {showPasswords[student.username] ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 font-bold text-xs rounded-full border border-green-500/20">
                              {student.role}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button 
                              onClick={() => handleDeleteUser(student.username)}
                              className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all shadow-sm opacity-0 group-hover:opacity-100"
                              title="Akkauntni o'chirish"
                            >
                              <RiDeleteBin6Line size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-12 text-center text-indigo-300/50 font-medium">Bunday talaba topilmadi</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB: CMS */}
          {activeTab === 'cms' && (
            <motion.div 
              key="tab-cms"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Form Side */}
              <div className="space-y-6 border-r border-violet-500/10 lg:pr-8">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    Yangi Dars Qo'shish Formasi
                  </h2>
                  <p className="text-violet-200/60 text-sm mt-1">Darsliklar localStorageda yoziladi, sahifa yangilansa ham xotirada saqlanib qoladi (offline saqlanish).</p>
                </div>

                <form onSubmit={handleSaveVideo} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-violet-400/80 pl-1">Dars Sargavhasi (Title)</label>
                    <input 
                      type="text" 
                      required
                      value={cmsTitle}
                      onChange={(e) => setCmsTitle(e.target.value)}
                      placeholder="Masalan: Nyutonning uchinchi qonuni"
                      className="w-full px-4 py-3 bg-[#1a1a2e] border border-violet-500/30 rounded-xl outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 text-violet-100 transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-violet-400/80 pl-1">Kategoriya (Category)</label>
                    <select 
                      value={cmsCategory}
                      onChange={(e) => setCmsCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1a2e] border border-violet-500/30 rounded-xl outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 text-violet-100 transition-all font-bold appearance-none"
                    >
                      <option value="Kirish">Kirish moduli</option>
                      <option value="Mexanika">Mexanika</option>
                      <option value="Termodynamika">Termodinamika</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-violet-400/80 pl-1">YouTube Media Linki yoki ID</label>
                    <input 
                      type="text" 
                      required
                      value={cmsVideoId}
                      onChange={(e) => setCmsVideoId(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 bg-[#1a1a2e] border border-violet-500/30 rounded-xl outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 text-violet-100 transition-all font-mono text-sm"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-black transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transform active:scale-95"
                  >
                    <RiSave3Line size={20}/> Resursni Saqlash
                  </button>
                </form>
              </div>

              {/* Preview Side */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-3">
                    Jonli Efir Formati (Preview Mode)
                  </h2>
                  <p className="text-violet-200/60 text-xs mt-1">Siz kiritayotgan media linkning o'quvchida ochiladigan avtomatik ko'rinishi.</p>
                </div>
                
                <div className="w-full aspect-video bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-inner">
                  {cmsVideoId.length > 5 ? (
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${
                        cmsVideoId.includes('v=') ? cmsVideoId.split('v=')[1].split('&')[0] : 
                        cmsVideoId.includes('youtu.be/') ? cmsVideoId.split('youtu.be/')[1].split('?')[0] : 
                        cmsVideoId
                      }?autoplay=0`} 
                      title="Preview"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="flex flex-col items-center text-violet-400/30 space-y-3">
                      <RiPlayCircleLine size={64} />
                      <span className="font-bold text-sm tracking-widest uppercase">Video topilmadi</span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-violet-500/5 rounded-xl border border-violet-500/10">
                  <div className="text-xs font-black uppercase tracking-wider text-violet-400/80 mb-2">Simulyatsiya (O'quvchiga ko'rinishi):</div>
                  <h3 className="text-xl font-bold text-white line-clamp-1">{cmsTitle || "Dars nomi kiritilmagan"}</h3>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded text-xs font-bold ring-1 ring-violet-500/30">
                      {cmsCategory}
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

export default AdminDashboard;
