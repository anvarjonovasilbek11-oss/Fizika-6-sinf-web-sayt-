import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { RiUploadCloud2Line, RiFilePdfLine, RiFileWordLine, RiFileZipLine, RiDeleteBin7Line, RiDownload2Line, RiFileTextLine, RiStarFill } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../services/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// ─── Doimiy (hardcoded) ko'rinadigan qo'llanmalar ───────────────────────────
// Bu yerga qo'shilgan fayllar HAR DOIM ko'rinib turadi (login + logout ham)
const PINNED_FILES = [
  {
    id: 'pinned-fizika-darslik-2017',
    name: "Fizika 6-sinf o'quv darsligi (N.Turdiyev, 2017)",
    size: '1.8 MB',
    type: 'application/pdf',
    date: '2017',
    url: '/fizika-6-sinf-darslik.pdf',
    pinned: true
  }
];
// ────────────────────────────────────────────────────────────────────────────

const FileIcon = ({ type }) => {
  if (type.includes('pdf')) return <RiFilePdfLine className="text-red-500" />;
  if (type.includes('word') || type.includes('doc')) return <RiFileWordLine className="text-blue-500" />;
  if (type.includes('zip') || type.includes('rar')) return <RiFileZipLine className="text-amber-500" />;
  return <RiFileTextLine className="text-slate-600 dark:text-slate-400" />;
};

const Materials = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Firebase Firestore dan fayl ma'lumotlarini real-vaqtda olish
  useEffect(() => {
    // Hardcoded config ishlatilmoqda

    const q = query(collection(db, 'materials'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const filesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFiles(filesList);
    });

    return () => unsub();
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Hardcoded config ishlatilmoqda, env check shart emas

    setUploading(true);
    
    for (const file of acceptedFiles) {
      try {
        const fileId = Date.now() + '-' + file.name;
        const storageRef = ref(storage, `materials/${fileId}`);
        
        // 1. Firebase Storage-ga yuklash
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // 2. Firestore-ga ma'lumotlarni yozish
        await setDoc(doc(db, 'materials', fileId), {
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          type: file.type,
          url: downloadURL,
          date: new Date().toLocaleDateString(),
          createdAt: new Date().toISOString()
        });

        toast.success(`${file.name} muvaffaqiyatli yuklandi!`);
      } catch (err) {
        console.error('Yuklashda xato:', err);
        toast.error(`${file.name} ni yuklab bo'lmadi.`);
      }
    }
    
    setUploading(false);
  }, [t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    maxSize: 52428800, // 50MB
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/x-zip-compressed': ['.zip'],
      'application/x-rar-compressed': ['.rar']
    }
  });

  const deleteFile = async (file) => {
    if (!window.confirm(t('quiz_toast_delete') || "Fayl o'chirilsinmi?")) return;

    try {
      // 1. Storage dan o'chirish
      const storageRef = ref(storage, `materials/${file.id}`);
      await deleteObject(storageRef);

      // 2. Firestore dan o'chirish
      await deleteDoc(doc(db, 'materials', file.id));
      
      toast.success("Fayl o'chirildi.");
    } catch (err) {
      console.error('O\'chirishda xato:', err);
      toast.error("Faylni o'chirib bo'lmadi.");
    }
  };

  const downloadFile = (file) => {
    if (!file.url) {
      toast.error("Fayl manzili topilmadi.");
      return;
    }

    try {
      // Eng ishonchli usul - yangi oynada ochish. 
      // Brauzer fayl turiga qarab uni yuklab oladi yoki ko'rsatadi.
      const win = window.open(file.url, '_blank');
      if (!win) {
        // Agar popup blocker to'ssa, to'g'ridan-to'g'ri link orqali urinib ko'ramiz
        window.location.href = file.url;
      }
      toast.success("Yuklab olish boshlandi...");
    } catch (err) {
      console.error('Yuklab olishda xatolik:', err);
      toast.error('Faylni yuklab bo\'lmadi.');
    }
  };

  return (
    <div className="space-y-8 transition-colors">
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter transition-colors">
        O'quv <span className="text-primary italic">qo'llanmalar</span>
      </h1>

      {/* ── Doim ko'rinadigan (Pinned) qo'llanmalar ── */}
      {PINNED_FILES.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <RiStarFill className="text-amber-400" size={18} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500">Tavsiya etilgan qo'llanmalar</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PINNED_FILES.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6 group bg-amber-50 dark:bg-amber-500/5 border-2 border-amber-300 dark:border-amber-500/30 shadow-lg hover:shadow-2xl transition-all relative"
              >
                {/* Pinned badge */}
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-amber-400 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1">
                  <RiStarFill size={10} /> Tavsiya
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-5xl drop-shadow-lg">
                    <FileIcon type={file.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 dark:text-white truncate text-lg" title={file.name}>
                      {file.name}
                    </h4>
                    <p className="text-xs font-black text-slate-600 dark:text-slate-500 mt-1 uppercase tracking-widest">{file.size} • {file.date}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex-1 w-full px-6 py-3 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                  >
                    <RiDownload2Line size={18} /> Yuklab olish
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {isAdmin && (
        <div 
          {...getRootProps()} 
          className={`
            glass-card p-12 border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center bg-white dark:bg-white/5
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-white/10 hover:border-primary/50'}
          `}
        >
          <input {...getInputProps()} />
          <motion.div animate={{ y: isDragActive ? -10 : 0 }}
            className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 shadow-inner">
            <RiUploadCloud2Line size={40} />
          </motion.div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t('materials_drop')}</h3>
          <p className="text-slate-700 dark:text-slate-200 mt-2 font-black italic">{t('materials_drop_sub')}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-black uppercase tracking-widest">{t('materials_drop_size')} (Max: 50MB)</p>
        </div>
      )}

      {uploading && (
        <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5 }}
            className="bg-primary h-full shadow-[0_0_15px_rgba(108,99,255,0.5)]"
          />
        </div>
      )}

      {/* File Library */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-6 group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl drop-shadow-lg">
                  <FileIcon type={file.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-slate-900 dark:text-white truncate text-lg" title={file.name}>
                    {file.name}
                  </h4>
                  <p className="text-xs font-black text-slate-600 dark:text-slate-500 mt-1 uppercase tracking-widest">{file.size} • {file.date}</p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <button 
                  onClick={() => downloadFile(file)}
                  className="flex-1 px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <RiDownload2Line size={18} /> {t('materials_download')}
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => deleteFile(file)}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors shadow-sm"
                    title={t('quiz_toast_delete')}
                  >
                    <RiDeleteBin7Line size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {files.length === 0 && !uploading && PINNED_FILES.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 glass-card bg-white dark:bg-white/5 border-dashed border-slate-300 dark:border-white/5 max-w-2xl mx-auto shadow-inner"
        >
          <div className="w-24 h-24 bg-electric-blue/10 dark:bg-electric-blue/5 text-electric-blue rounded-full flex items-center justify-center mb-6 mx-auto shadow-sm">
            <RiFileTextLine size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">
            {t('materials_empty_title') || "Hozircha qo'llanmalar yo'q"}
          </h3>
          <p className="text-slate-700 dark:text-slate-400 font-bold max-w-md mx-auto px-6">
            {isAdmin 
              ? "Tepada joylashgan yuklash bo'limi orqali yangi PDF yoki DOCX materiallarni platformaga qo'shishingiz mumkin."
              : "Ustozingiz tez orada yangi o'quv qo'llanmalari va foydali materiallarni joylaydi. Sahifani kuzatib boring!"}
          </p>
          {!isAdmin && (
            <div className="mt-10 flex justify-center gap-4">
               <div className="w-2 h-2 rounded-full bg-electric-blue animate-bounce [animation-delay:-0.3s]" />
               <div className="w-2 h-2 rounded-full bg-electric-blue animate-bounce [animation-delay:-0.15s]" />
               <div className="w-2 h-2 rounded-full bg-electric-blue animate-bounce" />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Materials;
