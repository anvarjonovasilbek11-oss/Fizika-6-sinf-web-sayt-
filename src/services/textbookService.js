import { TEXTBOOK_DATA } from '../data/textbookData';

const STORAGE_KEY = 'custom_textbooks';

export const getCombinedTextbooks = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const customData = saved ? JSON.parse(saved) : [];
  
  // Clone static data to avoid mutations
  let combined = JSON.parse(JSON.stringify(TEXTBOOK_DATA));

  // Merge customData into combined
  // customData format: [{ chapterId: 'bob-1', lessons: [...] }]
  customData.forEach(customChapter => {
    const existingChapter = combined.find(c => c.id === customChapter.chapterId);
    if (existingChapter) {
      // Merge lessons
      customChapter.lessons.forEach(customLesson => {
        const lessonIdx = existingChapter.lessons.findIndex(l => l.id === customLesson.id);
        if (lessonIdx > -1) {
          // Update existing lesson (Edit)
          existingChapter.lessons[lessonIdx] = { ...existingChapter.lessons[lessonIdx], ...customLesson };
        } else {
          // Add new lesson
          existingChapter.lessons.push(customLesson);
        }
      });
    } else {
      // Add entirely new chapter
      combined.push(customChapter);
    }
  });

  return combined;
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
