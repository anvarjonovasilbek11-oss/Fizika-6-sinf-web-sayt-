import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [ttsEnabled, setTtsEnabled] = useState(() => {
    const saved = localStorage.getItem('ttsEnabled');
    return saved === 'true';
  });

  const speak = useCallback((text, force = false) => {
    if ((!ttsEnabled && !force) || !text) return;

    // To'xtatib turish va kutishni oldini olish
    window.speechSynthesis.cancel();

    // Browser ovozlar yuklanishini kutish (ayrim hollarda kerak)
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => speak(text, force);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uz-UZ';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    const voices = window.speechSynthesis.getVoices();
    // O'zbek tili yo'q bo'lsa, fonetik yaqin tillar yoki tizim ovozini tanlaymiz
    let selectedVoice = voices.find(v => v.lang.toLowerCase().includes('uz')) || 
                        voices.find(v => v.lang.toLowerCase().includes('tr')) || 
                        voices.find(v => v.lang.toLowerCase().includes('ru')) ||
                        voices[0];
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }

    window.speechSynthesis.speak(utterance);
  }, [ttsEnabled]);

  const handleInteraction = useCallback((e) => {
    if (!ttsEnabled) return;

    // Elementdan matnni olish (aria-label PRIORITETLI)
    const target = e.target.closest('[aria-label], button, a, h1, h2, h3, p');
    if (!target) return;

    const text = target.getAttribute('aria-label') || target.title || target.innerText || target.placeholder;

    if (text && text.length < 250) { 
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
