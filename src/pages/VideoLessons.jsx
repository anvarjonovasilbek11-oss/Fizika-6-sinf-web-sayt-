import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSearchLine, RiPlayLine, RiCloseLine, RiDeleteBin6Line, RiAddLine, RiSave3Line } from 'react-icons/ri';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

import { VIDEOS } from '../data/videoData';

// Category key map: UZ internal name → translation key
const CATEGORY_KEY_MAP = {
  'Kirish':       'cat_intro',
  'Mexanika':     'cat_mechanics',
  'Termodynamika':'cat_thermo',
};

const VideoCard = ({ video, onSelect, categoryLabel, isAdmin, onDelete }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05, y: -8 }}
    className="glass-card overflow-hidden group relative rounded-[2rem] shadow-2xl hover:shadow-primary/20 transition-all border-white/5"
  >
    {isAdmin && (
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(video.id); }}
        className="absolute top-2 left-2 z-20 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
        title="Videoni o'chirish"
      >
        <RiDeleteBin6Line size={16} />
      </button>
    )}
    <div className="relative aspect-video">
      <img 
        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
        alt={video.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onSelect(video)}
          className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform"
        >
          <RiPlayLine size={24} />
        </button>
      </div>
      <div className="absolute top-4 right-4 px-4 py-1.5 bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl backdrop-blur-md border border-white/10 z-10">
        {categoryLabel}
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-black text-slate-900 dark:text-white line-clamp-2 md:group-hover:text-primary transition-colors duration-300 mb-2">{video.title}</h3>
      <p className="text-sm font-black text-slate-700 dark:text-slate-300 opacity-80">{video.topic}</p>
    </div>
  </motion.div>
);

const VideoLessons = () => {
  const [search, setSearch] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('__all__');
  const [customVideos, setCustomVideos] = useState([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  
  // CMS State
  const [cmsTitle, setCmsTitle] = useState('');
  const [cmsCategory, setCmsCategory] = useState('Kirish');
  const [cmsVideoId, setCmsVideoId] = useState('');

  const { t } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  React.useEffect(() => {
    const saved = localStorage.getItem('customVideos');
    if (saved) {
      setCustomVideos(JSON.parse(saved));
    }
  }, []);

  // Categories: internal key + display label
  const categories = [
    { key: '__all__',       label: t('cat_all') },
    { key: 'Kirish',        label: t('cat_intro') },
    { key: 'Mexanika',      label: t('cat_mechanics') },
    { key: 'Termodynamika', label: t('cat_thermo') },
  ];

  // Delete video logic
  const handleDeleteVideo = (id) => {
    if (!window.confirm("Rostdan ham ushbu videoni o'chirib tashlamoqchimisiz?")) return;
    const remainingCustom = customVideos.filter(v => v.id !== id);
    setCustomVideos(remainingCustom);
    localStorage.setItem('customVideos', JSON.stringify(remainingCustom));
    // Check if it's a static base video, warn if so:
    if (VIDEOS.some(v => v.id === id)) {
      toast.error("Ushbu video loyiha bazaviy (static) kodiga qotirilgan. O'chirish qismi kod bo'yicha cheklangan.");
    } else {
      toast.success("Video muvaffaqiyatli saqlovdan bekor qilindi!");
    }
  };

  // CMS Save Logic
  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!cmsTitle || !cmsVideoId) {
      toast.error("Iltimos, video nomi va linkni kiriting.");
      return;
    }

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
      topic: cmsTitle,
      category: cmsCategory,
      isCustom: true
    };

    const updatedVideos = [...customVideos, newVideo];
    setCustomVideos(updatedVideos);
    localStorage.setItem('customVideos', JSON.stringify(updatedVideos));
    
    setCmsTitle('');
    setCmsVideoId('');
    setShowAdminForm(false);
    toast.success("Muvaffaqiyatli! Darslik sayt xotirasiga saqlandi!");
  };

  // Merge static default videos with dynamically CMS uploaded offline videos
  const finalVideosData = [...VIDEOS, ...customVideos];

  const filteredVideos = finalVideosData.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) &&
    (activeCategory === '__all__' || v.category === activeCategory)
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between mt-8">
        <h1 className="text-4xl md:text-5xl font-black text-gradient uppercase tracking-tighter">{t('videos_title')}</h1>
        <div className="relative w-full md:w-96 group">
          <RiSearchLine className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={t('videos_search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white/5 dark:bg-dark-surface/30 backdrop-blur-xl border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all dark:text-white font-medium"
          />
        </div>
      </div>

      {isAdmin && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <RiAddLine size={24} /> Yangi Video Qo'shish (Admin CMS)
              </h2>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Yangi o'quv materialini baza saqloviga integratsiya qiling.</p>
            </div>
            <button 
              onClick={() => setShowAdminForm(!showAdminForm)}
              className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all"
            >
              {showAdminForm ? "Yopish" : "Formani Ochish"}
            </button>
          </div>

          <AnimatePresence>
            {showAdminForm && (
              <motion.form 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleSaveVideo} 
                className="space-y-4 overflow-hidden pt-4 border-t border-primary/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-primary/80">Dars Sargavhasi (Title)</label>
                    <input 
                      type="text" required value={cmsTitle} onChange={(e) => setCmsTitle(e.target.value)}
                      placeholder="Mavzu nomi..."
                      className="w-full px-4 py-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-primary/80">Kategoriya</label>
                    <select 
                      value={cmsCategory} onChange={(e) => setCmsCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary"
                    >
                      <option value="Kirish">Kirish moduli</option>
                      <option value="Mexanika">Mexanika</option>
                      <option value="Termodynamika">Termodinamika</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase text-primary/80">YouTube Media Linki</label>
                    <input 
                      type="text" required value={cmsVideoId} onChange={(e) => setCmsVideoId(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary font-mono"
                    />
                  </div>
                </div>
                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all">
                  <RiSave3Line /> Resursni Saqlash
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Category Tabs — fully translated */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar mb-10">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap border ${
              activeCategory === cat.key 
                ? 'bg-primary text-white shadow-xl shadow-primary/30 border-primary' 
                : 'bg-white/5 dark:bg-dark-surface/40 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        <AnimatePresence>
          {filteredVideos.length > 0 ? (
            filteredVideos.map(video => (
              <VideoCard 
                key={video.id} 
                video={video} 
                onSelect={setSelectedVideo}
                categoryLabel={t(CATEGORY_KEY_MAP[video.category] || 'cat_all')}
                isAdmin={isAdmin}
                onDelete={handleDeleteVideo}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                {t('materials_empty_title') || "Hozircha videolar yo'q"}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 font-bold max-w-md mx-auto px-6">
                {isAdmin 
                  ? "Tepada joylashgan yuklash bo'limi orqali yangi video materiallarni platformaga qo'shishingiz mumkin."
                  : "Ustozingiz tez orada yangi o'quv videolarini joylaydi. Sahifani kuzatib boring!"}
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-dark-card rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
              >
                <RiCloseLine size={24} />
              </button>
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`} 
                  title={selectedVideo.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">{selectedVideo.title}</h2>
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm font-bold">
                    {t(CATEGORY_KEY_MAP[selectedVideo.category] || 'cat_all')}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-white/90 rounded-lg text-sm">
                    {selectedVideo.topic}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoLessons;
