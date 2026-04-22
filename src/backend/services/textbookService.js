import { TEXTBOOK_DATA } from '../data/textbookData';
import { VIDEOS } from '../data/videoData';

const STORAGE_KEY = 'custom_textbooks';
const HIDDEN_KEY = 'hidden_lessons';

/**
 * Helper to get hidden status
 */
export const getHiddenState = () => {
  try {
    const saved = localStorage.getItem(HIDDEN_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const hideLesson = (lessonId) => {
  const hidden = getHiddenState();
  if (!hidden.includes(lessonId)) {
    localStorage.setItem(HIDDEN_KEY, JSON.stringify([...hidden, lessonId]));
    window.dispatchEvent(new Event('storage'));
  }
};

export const unhideLesson = (lessonId) => {
  const hidden = getHiddenState();
  const filtered = hidden.filter(id => id !== lessonId);
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('storage'));
};

export const getCombinedTextbooks = (includeHidden = false) => {
  try {
    const hiddenIds = getHiddenState();
    let customData = [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      customData = saved ? JSON.parse(saved) : [];
    } catch (e) {
      customData = [];
    }
    
    let combined = JSON.parse(JSON.stringify(TEXTBOOK_DATA));

    // Merge customData
    if (Array.isArray(customData)) {
      customData.forEach(customChapter => {
        const existingChapter = combined.find(c => c.id === (customChapter.chapterId || customChapter.id));
        if (existingChapter) {
          customChapter.lessons.forEach(customLesson => {
            const lessonIdx = existingChapter.lessons.findIndex(l => l.id === customLesson.id);
            if (lessonIdx > -1) {
              existingChapter.lessons[lessonIdx] = { ...existingChapter.lessons[lessonIdx], ...customLesson };
            } else {
              existingChapter.lessons.push(customLesson);
            }
          });
        } else {
          combined.push(customChapter);
        }
      });
    }

    // Apply visibility flag and filter if not including hidden
    combined.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        lesson.isHidden = hiddenIds.includes(lesson.id);
      });
      if (!includeHidden) {
        chapter.lessons = chapter.lessons.filter(l => !l.isHidden);
      }
    });

    return combined;
  } catch (error) {
    console.error("Critical Textbook Service Error:", error);
    return TEXTBOOK_DATA || [];
  }
};

export const saveCustomLesson = (chapterId, lesson) => {
  const saved = localStorage.getItem(STORAGE_KEY);
  let customData = saved ? JSON.parse(saved) : [];
  
  let chapter = customData.find(c => (c.id === chapterId || c.chapterId === chapterId));
  if (!chapter) {
    const original = TEXTBOOK_DATA.find(c => c.id === chapterId);
    chapter = { id: chapterId, title: original ? original.title : `Bob ${chapterId}`, lessons: [] };
    customData.push(chapter);
  }

  const lessonIdx = chapter.lessons.findIndex(l => l.id === lesson.id);
  if (lessonIdx > -1) {
    chapter.lessons[lessonIdx] = { ...chapter.lessons[lessonIdx], ...lesson };
  } else {
    chapter.lessons.push(lesson);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(customData));
  window.dispatchEvent(new Event('storage'));
};

export const deleteCustomLesson = (chapterId, lessonId) => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  
  let customData = JSON.parse(saved);
  const chapterIdx = customData.findIndex(c => (c.id === chapterId || c.chapterId === chapterId));
  
  if (chapterIdx > -1) {
    customData[chapterIdx].lessons = customData[chapterIdx].lessons.filter(l => l.id !== lessonId);
    if (customData[chapterIdx].lessons.length === 0) {
      customData.splice(chapterIdx, 1);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customData));
    window.dispatchEvent(new Event('storage'));
  }
};

export const getVideoForLesson = (lessonId) => {
  return VIDEOS.find(v => v.lessonId === lessonId || v.id === lessonId) || null;
};
