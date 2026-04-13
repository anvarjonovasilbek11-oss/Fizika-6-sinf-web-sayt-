import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { RiUploadCloud2Line, RiFilePdfLine, RiFileWordLine, RiFileZipLine, RiDeleteBin7Line, RiDownload2Line, RiFileTextLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import localforage from 'localforage';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

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

  // Component yuklanganda IndexedDB dan fayllarni o'qish
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const storedFiles = await localforage.getItem('physics_files');
        if (storedFiles) {
          setFiles(storedFiles);
        }
      } catch (err) {
        console.error('Xotiradan oqishda xatolik:', err);
        // Silently fail or toast
      }
    };
    loadFiles();
  }, []);

  const saveFiles = async (newFiles) => {
    try {
      await localforage.setItem('physics_files', newFiles);
      setFiles(newFiles);
    } catch (err) {
      console.error('Xotiraga yozishda xatolik:', err);
      toast.error(t('materials_upload_error'));
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploading(true);
    
    setTimeout(() => {
      const newFilesPromises = acceptedFiles.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              id: Date.now() + Math.random(),
              name: file.name,
              size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
              type: file.type,
              date: new Date().toLocaleDateString(),
              data: reader.result // Base64
            });
          };
          reader.onerror = () => reject(new Error("File read error"));
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newFilesPromises)
        .then(async (resolvedFiles) => {
          const updatedFiles = [...files, ...resolvedFiles];
          try {
            await localforage.setItem('physics_files', updatedFiles);
            setFiles(updatedFiles);
            toast.success(`${resolvedFiles.length} ta fayl yuklandi!`);
          } catch (err) {
            console.error('IndexedDB xatosi:', err);
            toast.error(t('materials_upload_error'));
          }
          setUploading(false);
        })
        .catch(err => {
          console.error('Fayl yozish xatosi', err);
          toast.error(t('materials_upload_error'));
          setUploading(false);
        });
    }, 1500);
  }, [files, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    maxSize: 52428800, // IndexedDB ruxsat beradi 50MB gacha xavfsiz fayllar
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/x-zip-compressed': ['.zip'],
      'application/x-rar-compressed': ['.rar']
    }
  });

  const deleteFile = async (id) => {
    const updated = files.filter(f => f.id !== id);
    await saveFiles(updated);
    toast.success(t('quiz_toast_delete') || "Fayl o'chirildi.");
  };

  const downloadFile = (file) => {
    try {
      // Base64 dan Blob-ga o'tkazish (Mobil qurilmalarda xavfsizroq yuklash uchun)
      const byteString = atob(file.data.split(',')[1]);
      const mimeString = file.data.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Yuklab olishda xatolik:', err);
      toast.error('Faylni yuklab bo\'lmadi.');
    }
  };

  return (
  return (
    <div className="space-y-8 transition-colors">
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter transition-colors">{t('materials_title')}</h1>

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
                    onClick={() => deleteFile(file.id)}
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

      {files.length === 0 && !uploading && (
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
