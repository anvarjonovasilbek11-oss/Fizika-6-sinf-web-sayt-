import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSearchLine, RiPlayLine, RiCloseLine } from 'react-icons/ri';

const VIDEOS = [
  { id: '1', videoId: 'vx1Nkb_-srE', title: '1. Kirish', topic: 'Kirish', category: 'Kirish' },
  { id: '2', videoId: 'NetSwSnu5T0', title: '2. Fizika nimani oʻrganadi?', topic: 'Fizika asoslari', category: 'Kirish' },
  { id: '3', videoId: 'vIX3X8AM3nE', title: '3. Fizikada ishlatiladigan ayrim kattaliklar', topic: 'Kattaliklar', category: 'Kirish' },
  { id: '4', videoId: 'pLyZsiz4ud4', title: '4. Kuzatishlar va tajribalar', topic: 'Metodika', category: 'Kirish' },
  { id: '5', videoId: 'U2yX4SIc7FU', title: "5. Fizika kattaliklar va ularni o'lchash", topic: "O'lchash", category: 'Kirish' },
  { id: '6', videoId: 'aAUPfJr1K78', title: "6. O'lchash va o'lchash aniqligi", topic: "O'lchash", category: 'Kirish' },
  { id: '7', videoId: 'dL6uNZyOkpQ', title: '7. Modda tuzilishi haqida Demokrit, Ar-Roziy fikrlari', topic: 'Modda', category: 'Termodynamika' },
  { id: '8', videoId: 'YFQFFiFP5XY', title: '8. Molekulalar va ularning oʻlchamlari', topic: 'Molekulalar', category: 'Termodynamika' },
  { id: '9', videoId: '75S7Qv6lZeU', title: '9. Diffuziya hodisasi', topic: 'Diffuziya', category: 'Termodynamika' },
  { id: '10', videoId: 'uzQ3ymb161M', title: '10. Qattiq jism, suyuqlik va gazlarning molekulyar tuzilishi', topic: 'Modda holati', category: 'Termodynamika' },
  { id: '11', videoId: 'mumNfuYtu_E', title: '11. Massa va uning birliklari', topic: 'Massa', category: 'Mexanika' },
];

const VideoCard = ({ video, onSelect }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5 }}
    className="glass-card overflow-hidden group"
  >
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
      <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded-lg shadow-lg">
        {video.category}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-2">{video.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">Mavzu: {video.topic}</p>
    </div>
  </motion.div>
);

const VideoLessons = () => {
  const [search, setSearch] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Hammasi');

  const categories = ['Hammasi', 'Kirish', 'Mexanika', 'Termodynamika'];

  const filteredVideos = VIDEOS.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase()) &&
    (activeCategory === 'Hammasi' || v.category === activeCategory)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-heading text-gradient">Video darslar</h1>
        <div className="relative w-full md:w-80">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Mavzuni qidiring..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-white dark:bg-dark-surface text-slate-600 dark:text-slate-200 hover:bg-primary/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
          ))}
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
                    {selectedVideo.category}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-white/90 rounded-lg text-sm">
                    Mavzu: {selectedVideo.topic}
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
