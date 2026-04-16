import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiSearchLine, 
  RiPlayLine, 
  RiCloseLine, 
  RiDeleteBin6Line, 
  RiAddLine, 
  RiSave3Line,
  RiEditLine,
  RiVideoLine
} from 'react-icons/ri';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { VIDEOS } from '../data/videoData';
import toast from 'react-hot-toast';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

const CATEGORY_KEY_MAP = {
  'Kirish': 'cat_intro',
  'Mexanika': 'cat_mechanics',
  'Termodynamika': 'cat_thermo',
  '__all__': 'cat_all'
};

const VideoCard = ({ video, onSelect, categoryLabel, isAdmin, onDelete, onEdit }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05, y: -8 }}
    className="glass-card overflow-hidden group relative rounded-[2rem] shadow-2xl hover:shadow-primary/20 transition-all border-white/5"
  >
    {isAdmin && (
      <div className="absolute top-2 left-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit ? onEdit(video) : null; }}
          className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg"
          title="Taxrirlash"
        >
          <RiEditLine size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(video.id); }}
          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center shadow-lg"
          title="O'chirish"
        >
          <RiDeleteBin6Line size={16} />
        </button>
      </div>
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

const VideoSkeleton = () => (
  <div className="glass-card overflow-hidden rounded-[2rem] border-white/5 animate-pulse">
    <div className="aspect-video bg-slate-200 dark:bg-white/5" />
    <div className="p-5 space-y-3">
      <div className="h-6 bg-slate-200 dark:bg-white/5 rounded-lg w-3/4" />
      <div className="h-4 bg-slate-200 dark:bg-white/5 rounded-lg w-1/2" />
    </div>
  </div>
);

const VideoLessons = () => {
  const [search, setSearch] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('__all__');
  const [customVideos, setCustomVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  
  const [cmsTitle, setCmsTitle] = useState('');
  const [cmsCategory, setCmsCategory] = useState('Kirish');
  const [cmsVideoId, setCmsVideoId] = useState('');

  const { t } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'videos'), (snapshot) => {
      const videoList = snapshot.docs.map(doc => doc.data());
      setCustomVideos(videoList);
      setLoading(false);
    }, (err) => {
      setLoading(false);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (editingVideo) {
      setCmsTitle(editingVideo.title);
      setCmsCategory(editingVideo.category || 'Kirish');
      setCmsVideoId(`https://www.youtube.com/watch?v=${editingVideo.videoId}`);
      setShowAdminForm(true);
    }
  }, [editingVideo]);

  const categories = [
    { key: '__all__',       label: t('cat_all') },
    { key: 'Kirish',        label: t('cat_intro') },
    { key: 'Mexanika',      label: t('cat_mechanics') },
    { key: 'Termodynamika', label: t('cat_thermo') },
  ];

  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Rostdan ham ushbu videoni o'chirib tashlamoqchimisiz?")) return;
    
    try {
      await deleteDoc(doc(db, 'videos', id));
      toast.success("Muvaffaqiyatli o'chirildi!");
    } catch (err) {
      console.error("Video o'chirishda xato:", err);
      const remainingCustom = customVideos.filter(v => v.id !== id);
      setCustomVideos(remainingCustom);
      localStorage.setItem('customVideos', JSON.stringify(remainingCustom));
    }
  };

  const handleSaveVideo = async (e) => {
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
    } else if (cmsVideoId.includes('embed/')) {
        finalId = cmsVideoId.split('embed/')[1].split('?')[0];
    }

    const videoId = editingVideo ? editingVideo.id : Date.now().toString();
    const videoData = {
      id: videoId,
      videoId: finalId,
      title: cmsTitle,
      topic: cmsTitle,
      category: cmsCategory,
      isCustom: true,
      updatedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'videos', videoId), videoData);
      toast.success("Muvaffaqiyatli saqlandi!");
    } catch (err) {
      console.error("Video saqlashda xato:", err);
      toast.error("Cloud-ga saqlab bo'lmadi, localda saqlandi.");
      const updated = [...customVideos.filter(v => v.id !== videoId), videoData];
      setCustomVideos(updated);
      localStorage.setItem('customVideos', JSON.stringify(updated));
    }
    
    setCmsTitle('');
    setCmsVideoId('');
    setShowAdminForm(false);
    setEditingVideo(null);
  };

  const finalVideosData = VIDEOS.map(v => {
    const custom = customVideos.find(cv => cv.id === v.id);
    return custom ? custom : v;
  }).concat(customVideos.filter(cv => !VIDEOS.some(v => v.id === cv.id)));

  const filteredVideos = finalVideosData.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) &&
    (activeCategory === '__all__' || v.category === activeCategory)
  );

  return (
    <div className="space-y-12 transition-colors">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between mt-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter transition-colors">
          Video <span className="text-primary italic">darslar</span>
        </h1>
        <div className="relative w-full md:w-96 group">
          <RiSearchLine className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={t('videos_search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-dark-surface/30 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all text-slate-900 dark:text-white font-bold"
          />
        </div>
      </div>

      {isAdmin && (
        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/20 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-black text-primary flex items-center gap-2 uppercase tracking-tight">
                {editingVideo ? <RiEditLine size={24}/> : <RiAddLine size={24} />} 
                {editingVideo ? "Videoni Tahrirlash" : "Yangi Video Qo'shish"}
              </h2>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {editingVideo ? "Video ma'lumotlarini o'zgartiring." : "Yangi o'quv materialini baza saqloviga integratsiya qiling."}
              </p>
            </div>
            <div className="flex gap-2">
              {editingVideo && (
                <button 
                  onClick={() => { setEditingVideo(null); setShowAdminForm(false); setCmsTitle(''); setCmsVideoId(''); }}
                  className="px-6 py-2 bg-slate-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-slate-600 transition-all"
                >
                  Bekor qilish
                </button>
              )}
              <button 
                onClick={() => { setShowAdminForm(!showAdminForm); if(showAdminForm && editingVideo) setEditingVideo(null); }}
                className="px-6 py-2 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary/90 transition-all shadow-lg"
              >
                {showAdminForm ? "Yopish" : "Formani Ochish"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showAdminForm && (
              <motion.form 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleSaveVideo} 
                className="space-y-4 overflow-hidden pt-4 border-t border-primary/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-primary/80 tracking-widest">Dars Sargavhasi (Title)</label>
                    <input 
                      type="text" required value={cmsTitle} onChange={(e) => setCmsTitle(e.target.value)}
                      placeholder="Mavzu nomi..."
                      className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary text-slate-900 dark:text-white font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-primary/80 tracking-widest">Kategoriya</label>
                    <select 
                      value={cmsCategory} onChange={(e) => setCmsCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary text-slate-900 dark:text-white font-bold"
                    >
                      <option value="Kirish">Kirish moduli</option>
                      <option value="Mexanika">Mexanika</option>
                      <option value="Termodynamika">Termodinamika</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase text-primary/80 tracking-widest">YouTube Media Linki</label>
                    <input 
                      type="text" required value={cmsVideoId} onChange={(e) => setCmsVideoId(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <button type="submit" className="px-8 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary-dark transition-all shadow-primary/20 shadow-lg">
                  <RiSave3Line size={18} /> {editingVideo ? "Saqlash" : "Resursni Saqlash"}
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
            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap border shadow-sm ${
              activeCategory === cat.key 
                ? 'bg-primary text-white shadow-xl shadow-primary/30 border-primary' 
                : 'bg-white dark:bg-dark-surface/40 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
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
        <AnimatePresence mode="popLayout">
          {loading ? (
            [...Array(8)].map((_, i) => <VideoSkeleton key={i} />)
          ) : filteredVideos.length > 0 ? (
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
            <div className="col-span-full py-20 text-center glass-card bg-slate-50/50 dark:bg-white/5 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem]">
              <RiVideoLine className="mx-auto mb-6 text-slate-300 dark:text-slate-700" size={80} />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 transition-colors">
                {t('materials_empty_title') || "Hozircha videolar yo'q"}
              </h3>
              <p className="text-slate-700 dark:text-slate-400 font-bold max-w-md mx-auto px-6">
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
              className="w-full max-w-4xl bg-white dark:bg-dark-card rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/20"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all shadow-xl"
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
              <div className="p-8 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">
                    {t(CATEGORY_KEY_MAP[selectedVideo.category] || 'cat_all')}
                  </span>
                  <span className="px-4 py-1 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/90 rounded-xl text-xs font-bold uppercase tracking-widest">
                    {selectedVideo.topic}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">{selectedVideo.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoLessons;
