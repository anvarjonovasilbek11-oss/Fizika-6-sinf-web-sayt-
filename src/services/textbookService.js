import { TEXTBOOK_DATA } from '../data/textbookData';
import { VIDEOS } from '../pages/VideoLessons';

const STORAGE_KEY = 'custom_textbooks';

/**
 * Helper to find a video for a specific lesson
 */
export const getVideoForLesson = (lessonId) => {
  // Try to find by id directly
  return VIDEOS.find(v => v.id === lessonId) || null;
};

export const getCombinedTextbooks = () => {
  try {
    let customData = [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      customData = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Local Storage Error:", e);
      customData = [];
    }
    
    // Clone static data to avoid mutations
    let combined = JSON.parse(JSON.stringify(TEXTBOOK_DATA));

    // Safety check: ensure combined is an array
    if (!Array.isArray(combined)) combined = [];

    // Merge customData into combined
    if (Array.isArray(customData)) {
      customData.forEach(customChapter => {
        if (!customChapter || !customChapter.chapterId) return;
        
        const existingChapter = combined.find(c => c.id === customChapter.chapterId);
        if (existingChapter) {
          if (Array.isArray(customChapter.lessons)) {
            customChapter.lessons.forEach(customLesson => {
              if (!customLesson || !customLesson.id) return;
              const lessonIdx = existingChapter.lessons.findIndex(l => l.id === customLesson.id);
              if (lessonIdx > -1) {
                existingChapter.lessons[lessonIdx] = { ...existingChapter.lessons[lessonIdx], ...customLesson };
              } else {
                existingChapter.lessons.push(customLesson);
              }
            });
          }
        } else {
          combined.push(customChapter);
        }
      });
    }

    return combined;
  } catch (error) {
    console.error("Critical Textbook Service Error:", error);
    return TEXTBOOK_DATA || [];
  }
};

export const saveCustomLesson = (chapterId, lesson) => {
  const saved = localStorage.getItem(STORAGE_KEY);
  let customData = saved ? JSON.parse(saved) : [];
  
  let chapter = customData.find(c => c.id === chapterId);
  if (!chapter) {
    chapter = { id: chapterId, title: `Yangi Bob (${chapterId})`, lessons: [] };
    customData.push(chapter);
  }

  const lessonIdx = chapter.lessons.findIndex(l => l.id === lesson.id);
  if (lessonIdx > -1) {
    chapter.lessons[lessonIdx] = { ...chapter.lessons[lessonIdx], ...lesson };
  } else {
    chapter.lessons.push(lesson);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(customData));
  window.dispatchEvent(new Event('storage')); // Notify other components
};

export const deleteCustomLesson = (chapterId, lessonId) => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  
  let customData = JSON.parse(saved);
  const chapterIdx = customData.findIndex(c => c.id === chapterId);
  
  if (chapterIdx > -1) {
    customData[chapterIdx].lessons = customData[chapterIdx].lessons.filter(l => l.id !== lessonId);
    // Remove chapter if empty
    if (customData[chapterIdx].lessons.length === 0) {
      customData.splice(chapterIdx, 1);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customData));
    window.dispatchEvent(new Event('storage'));
  }
};
