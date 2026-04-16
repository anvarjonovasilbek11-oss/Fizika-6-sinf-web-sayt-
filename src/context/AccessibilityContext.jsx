import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [ttsEnabled, setTtsEnabled] = useState(() => {
    const saved = localStorage.getItem('ttsEnabled');
    return saved === 'true';
  });

  const speak = useCallback((text) => {
    if (!ttsEnabled || !text) return;

    // To'xtatib turish va kutishni oldini olish
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uz-UZ';
    
    // O'zbek tili uchun ovozni qidirish
    const voices = window.speechSynthesis.getVoices();
    const uzVoice = voices.find(v => v.lang.includes('uz')) || voices.find(v => v.lang.includes('ru')); // Fallback to Russian if no Uzbek
    if (uzVoice) utterance.voice = uzVoice;

    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  const handleInteraction = useCallback((e) => {
    if (!ttsEnabled) return;

    // Elementdan matnni olish (aria-label, title yoki innerText)
    const target = e.target;
    const text = target.getAttribute('aria-label') || target.title || target.innerText || target.placeholder;

    if (text && text.length < 200) { // Juda uzun matnlarni o'qimaslik uchun
      speak(text);
    }
  }, [ttsEnabled, speak]);

  useEffect(() => {
    localStorage.setItem('ttsEnabled', ttsEnabled);

    if (ttsEnabled) {
      document.addEventListener('mouseover', handleInteraction);
      document.addEventListener('focusin', handleInteraction);
    }

    return () => {
      document.removeEventListener('mouseover', handleInteraction);
      document.removeEventListener('focusin', handleInteraction);
      window.speechSynthesis.cancel();
    };
  }, [ttsEnabled, handleInteraction]);

  const toggleTts = () => setTtsEnabled(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{ ttsEnabled, toggleTts, speak }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
