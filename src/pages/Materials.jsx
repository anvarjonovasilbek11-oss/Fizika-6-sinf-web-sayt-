import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { RiUploadCloud2Line, RiFilePdfLine, RiFileWordLine, RiFileZipLine, RiDeleteBin7Line, RiDownload2Line, RiFileTextLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';

const FileIcon = ({ type }) => {
  if (type.includes('pdf')) return <RiFilePdfLine className="text-red-500" />;
  if (type.includes('word') || type.includes('doc')) return <RiFileWordLine className="text-blue-500" />;
  if (type.includes('zip') || type.includes('rar')) return <RiFileZipLine className="text-amber-500" />;
  return <RiFileTextLine className="text-slate-400" />;
};

const Materials = () => {
  const [files, setFiles] = useLocalStorage('physics_files', []);
  const [uploading, setUploading] = useState(false);
  const { t } = useLanguage();

  const onDrop = useCallback((acceptedFiles) => {
    setUploading(true);
    
    // Simulate upload progress
    setTimeout(() => {
      const newFiles = acceptedFiles.map(file => {
        // In a real app, we'd upload to a server. 
        // Here we convert to base64 for LocalStorage (limited space!)
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              id: Date.now() + Math.random(),
              name: file.name,
              size: (file.size / 1024).toFixed(1) + ' KB',
              type: file.type,
              date: new Date().toLocaleDateString(),
              data: reader.result // Base64
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newFiles).then(resolvedFiles => {
        setFiles(prev => [...prev, ...resolvedFiles]);
        setUploading(false);
        toast.success(`${resolvedFiles.length} ta fayl yuklandi!`);
      });
    }, 1500);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    maxSize: 10485760, // 10MB
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/x-zip-compressed': ['.zip'],
      'application/x-rar-compressed': ['.rar']
    }
  });

  const deleteFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    toast.success("Fayl o'chirildi.");
  };

  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.click();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-heading text-gradient">{t('materials_title')}</h1>

      {/* Upload Zone */}
      <div 
        {...getRootProps()} 
        className={`
          glass-card p-12 border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-white/10 hover:border-primary/50'}
        `}
      >
        <input {...getInputProps()} />
        <motion.div animate={{ y: isDragActive ? -10 : 0 }}
          className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
          <RiUploadCloud2Line size={32} />
        </motion.div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('materials_drop')}</h3>
        <p className="text-slate-500 dark:text-slate-200 mt-2">{t('materials_drop_sub')}</p>
        <p className="text-xs text-slate-400 mt-1">{t('materials_drop_size')}</p>
      </div>

      {uploading && (
        <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-2 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5 }}
            className="bg-primary h-full"
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
              className="glass-card p-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">
                  <FileIcon type={file.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-white truncate" title={file.name}>
                    {file.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">{file.size} • {file.date}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <button 
                  onClick={() => downloadFile(file)}
                  className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2"
                >
                  <RiDownload2Line /> {t('materials_download')}
                </button>
                <button 
                  onClick={() => deleteFile(file.id)}
                  className="p-2 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary/20 transition-colors"
                >
                  <RiDeleteBin7Line size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {files.length === 0 && !uploading && (
        <div className="text-center py-20">
          <div className="text-6xl text-slate-200 dark:text-white/5 mb-4 flex justify-center">
            <RiFileTextLine />
          </div>
          <p className="text-slate-400 dark:text-slate-300 mt-2">{t('materials_empty')}</p>
        </div>
      )}
    </div>
  );
};

export default Materials;
