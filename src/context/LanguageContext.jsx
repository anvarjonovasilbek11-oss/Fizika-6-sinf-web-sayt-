import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  uz: {
    // Navbar
    greeting: "Salom",
    role_user: "Foydalanuvchi",
    role_admin: "Admin",

    // Sidebar
    nav_home: "Asosiy sahifa",
    nav_textbook: "Darslik",
    nav_videos: "Video darslar",
    nav_materials: "Qo'llanmalar",
    nav_tests: "Testlar (AI)",
    nav_settings: "Sozlamalar",
    nav_logout: "Chiqish",

    // Home
    hero_title: "6-sinf Fizika Dunyosiga Xush Kelibsiz!",
    hero_sub: "Bugun nimani o'rganamiz? Mexanika, issiqlik yoki elektr toki? Tanlov sizda!",
    btn_start: "Darsni boshlash",
    btn_test: "Test yechish",
    stat_videos: "Video darslar",
    stat_materials: "Qo'llanmalar",
    stat_tests: "Test savollari",
    site_features: "Sayt imkoniyatlari",
    feature_1: "📚 Eng so'nggi darsliklar va materiallar",
    feature_2: "🤖 Sun'iy intellekt orqali test generatori",
    feature_3: "🎥 Interaktiv video darslar to'plami",
    feature_4: "🌓 Qulay qorong'u rejim (Dark Mode)",

    // Login
    login_title: "Fizika olamiga xush kelibsiz",
    login_sub: "Bilim sari yangi qadam",
    login_student: "O'quvchi",
    login_admin: "Admin",
    login_name_label: "Ism (istalgan ism yozing)",
    login_name_placeholder: "Masalan: Samol, Jasur, Malika...",
    login_pass_label: "Parol",
    login_pass_placeholder: "••••••••",
    login_btn: "Kirish",
    login_footer: "Fizika darslari platformasi",
    login_err_empty: "Ism va parolni kiriting",
    login_err_pass: "Parol noto'g'ri! Avval kirgan parolingizni ishlating.",
    login_welcome_new: "Hisobingiz yaratildi 🎉",
    login_welcome: "Xush kelibsiz",

    // Videos
    videos_title: "Video darslar",
    videos_search: "Mavzuni qidiring...",
    videos_all: "Hammasi",

    // Materials
    materials_title: "Qo'llanmalar va Kitoblar",
    materials_drop: "Fayllarni yuklash",
    materials_drop_sub: "PDF, DOCX yoki ZIP fayllarni shu yerga tashlang",
    materials_drop_size: "(Maksimal o'lcham: 10MB)",
    materials_empty: "Yangi qo'llanmalarni yuklashni boshlang!",
    materials_download: "Yuklash",
    materials_delete: "O'chirish",

    // Textbook
    textbook_theory: "Nazariya",
    textbook_experiments: "Tajribalar",
    textbook_formulas: "Formulalar va Terminlar",
    textbook_experiment_guide: "Amaliy tajriba qo'llanmasi",
    textbook_experiment_sub: "Mavzuni amalda tushunish uchun ko'rsatmalar",
    textbook_warning: "Diqqat! Tajribalarni o'tkazishda xavfsizlik qoidalariga rioya qiling va kattalar nazoratida bo'ling.",
    textbook_not_found: "Dars topilmadi",
    textbook_back: "Asosiy sahifaga qaytish",

    // Quiz - Student
    quiz_title: "Testlar",
    quiz_empty: "Hozircha tasdiqlangan testlar yo'q",
    quiz_start: "TESTNI BOSHLASH",
    quiz_result: "Natijangiz!",
    quiz_excellent: "A'lo! Siz daho ekansiz! 🏆",
    quiz_good: "Yaxshi natija! 👏",
    quiz_try: "Yana o'qishingiz kerak. 💪",
    quiz_back: "Bo'limga qaytish",
    quiz_progress: "Progress",
    quiz_question: "Savol raqami",
    quiz_correct: "To'g'ri!",
    quiz_wrong: "Aslida",

    // AI Quiz - Admin
    ai_quiz_title: "Sun'iy Intellekt Bilim Testi",
    ai_quiz_sub_admin: "Admin panel: 10 ta savoldan iborat testlar yarating va o'quvchilar uchun tasdiqlang.",
    ai_quiz_sub_student: "Tasdiqlangan mavzular bo'yicha o'z bilimingizni sinab ko'ring.",
    ai_new_test: "Yangi Test Yaratish",
    ai_topic_label: "Mavzu nomi (Formula/Terminlar)",
    ai_topic_placeholder: "Masalan: Mexanika formulalari",
    ai_generate: "10 ta Savol Tayyorlash",
    ai_approve: "Tasdiqlash",
    ai_reject: "Rad etish",
    ai_cancel: "Bekor qilish",
    ai_ready: "Tekshirish uchun tayyor!",
    ai_student_mode: "O'quvchi rejimi",
    ai_student_info: "Faqat admin tomonidan tasdiqlangan (kamida 10 ta savolli) testlargina bu yerda ko'rinadi.",
    ai_announce: "e'lon qilindi",

    // Settings
    settings_title: "Sozlamalar",
    settings_theme: "Mavzu",
    settings_lang: "Til",
    settings_dark: "Qoʻngʻir rejim",
    settings_light: "Yorqin rejim",

    // Language names
    lang_uz: "O'zbekcha",
    lang_ru: "Русский",
    lang_en: "English",
  },

  ru: {
    // Navbar
    greeting: "Привет",
    role_user: "Пользователь",
    role_admin: "Администратор",

    // Sidebar
    nav_home: "Главная",
    nav_textbook: "Учебник",
    nav_videos: "Видеоуроки",
    nav_materials: "Материалы",
    nav_tests: "Тесты (ИИ)",
    nav_settings: "Настройки",
    nav_logout: "Выйти",

    // Home
    hero_title: "Добро пожаловать в мир физики 6-го класса!",
    hero_sub: "Что изучаем сегодня? Механика, тепло или электричество? Выбор за вами!",
    btn_start: "Начать урок",
    btn_test: "Пройти тест",
    stat_videos: "Видеоуроки",
    stat_materials: "Материалы",
    stat_tests: "Вопросы теста",
    site_features: "Возможности сайта",
    feature_1: "📚 Последние учебники и материалы",
    feature_2: "🤖 Генератор тестов на основе ИИ",
    feature_3: "🎥 Интерактивная коллекция видеоуроков",
    feature_4: "🌓 Удобный тёмный режим (Dark Mode)",

    // Login
    login_title: "Добро пожаловать в мир физики",
    login_sub: "Новый шаг к знаниям",
    login_student: "Ученик",
    login_admin: "Администратор",
    login_name_label: "Имя (введите любое имя)",
    login_name_placeholder: "Например: Самол, Жасур...",
    login_pass_label: "Пароль",
    login_pass_placeholder: "••••••••",
    login_btn: "Войти",
    login_footer: "Платформа уроков физики",
    login_err_empty: "Введите имя и пароль",
    login_err_pass: "Неверный пароль! Используйте пароль, с которым вы впервые вошли.",
    login_welcome_new: "Аккаунт создан 🎉",
    login_welcome: "Добро пожаловать",

    // Videos
    videos_title: "Видеоуроки",
    videos_search: "Поиск по теме...",
    videos_all: "Все",

    // Materials
    materials_title: "Материалы и книги",
    materials_drop: "Загрузить файлы",
    materials_drop_sub: "Перетащите сюда PDF, DOCX или ZIP файлы",
    materials_drop_size: "(Максимальный размер: 10MB)",
    materials_empty: "Начните загружать новые материалы!",
    materials_download: "Скачать",
    materials_delete: "Удалить",

    // Textbook
    textbook_theory: "Теория",
    textbook_experiments: "Эксперименты",
    textbook_formulas: "Формулы и Термины",
    textbook_experiment_guide: "Руководство по практике",
    textbook_experiment_sub: "Инструкции для практического понимания темы",
    textbook_warning: "Внимание! При проведении опытов соблюдайте правила безопасности и работайте под наблюдением взрослых.",
    textbook_not_found: "Урок не найден",
    textbook_back: "Вернуться на главную",

    // Quiz - Student
    quiz_title: "Тесты",
    quiz_empty: "Пока нет подтверждённых тестов",
    quiz_start: "НАЧАТЬ ТЕСТ",
    quiz_result: "Ваш результат!",
    quiz_excellent: "Отлично! Вы гений! 🏆",
    quiz_good: "Хороший результат! 👏",
    quiz_try: "Нужно ещё учиться. 💪",
    quiz_back: "Вернуться к разделу",
    quiz_progress: "Прогресс",
    quiz_question: "Номер вопроса",
    quiz_correct: "Правильно!",
    quiz_wrong: "Правильный ответ",

    // AI Quiz - Admin
    ai_quiz_title: "Тест знаний на основе ИИ",
    ai_quiz_sub_admin: "Панель администратора: создавайте тесты из 10 вопросов и подтверждайте для учеников.",
    ai_quiz_sub_student: "Проверьте свои знания по утверждённым темам.",
    ai_new_test: "Создать новый тест",
    ai_topic_label: "Название темы (Формулы/Термины)",
    ai_topic_placeholder: "Например: Формулы механики",
    ai_generate: "Подготовить 10 вопросов",
    ai_approve: "Подтвердить",
    ai_reject: "Отклонить",
    ai_cancel: "Отмена",
    ai_ready: "Готово к проверке!",
    ai_student_mode: "Режим ученика",
    ai_student_info: "Здесь отображаются только тесты, подтверждённые администратором (минимум 10 вопросов).",
    ai_announce: "объявлено",

    // Settings
    settings_title: "Настройки",
    settings_theme: "Тема",
    settings_lang: "Язык",
    settings_dark: "Тёмный режим",
    settings_light: "Светлый режим",

    // Language names
    lang_uz: "O'zbekcha",
    lang_ru: "Русский",
    lang_en: "English",
  },

  en: {
    // Navbar
    greeting: "Hello",
    role_user: "User",
    role_admin: "Admin",

    // Sidebar
    nav_home: "Home",
    nav_textbook: "Textbook",
    nav_videos: "Video Lessons",
    nav_materials: "Materials",
    nav_tests: "Tests (AI)",
    nav_settings: "Settings",
    nav_logout: "Logout",

    // Home
    hero_title: "Welcome to the World of 6th Grade Physics!",
    hero_sub: "What are we learning today? Mechanics, heat, or electricity? The choice is yours!",
    btn_start: "Start Lesson",
    btn_test: "Take a Test",
    stat_videos: "Video Lessons",
    stat_materials: "Materials",
    stat_tests: "Test Questions",
    site_features: "Site Features",
    feature_1: "📚 Latest textbooks and materials",
    feature_2: "🤖 AI-powered test generator",
    feature_3: "🎥 Interactive video lesson collection",
    feature_4: "🌓 Convenient dark mode",

    // Login
    login_title: "Welcome to the World of Physics",
    login_sub: "A new step towards knowledge",
    login_student: "Student",
    login_admin: "Admin",
    login_name_label: "Name (enter any name)",
    login_name_placeholder: "E.g.: John, Alice, Bob...",
    login_pass_label: "Password",
    login_pass_placeholder: "••••••••",
    login_btn: "Login",
    login_footer: "Physics Lessons Platform",
    login_err_empty: "Please enter name and password",
    login_err_pass: "Wrong password! Use the password you first logged in with.",
    login_welcome_new: "Account created 🎉",
    login_welcome: "Welcome",

    // Videos
    videos_title: "Video Lessons",
    videos_search: "Search by topic...",
    videos_all: "All",

    // Materials
    materials_title: "Materials & Books",
    materials_drop: "Upload Files",
    materials_drop_sub: "Drop PDF, DOCX or ZIP files here",
    materials_drop_size: "(Maximum size: 10MB)",
    materials_empty: "Start uploading new materials!",
    materials_download: "Download",
    materials_delete: "Delete",

    // Textbook
    textbook_theory: "Theory",
    textbook_experiments: "Experiments",
    textbook_formulas: "Formulas & Terms",
    textbook_experiment_guide: "Practical Experiment Guide",
    textbook_experiment_sub: "Instructions for practical understanding of the topic",
    textbook_warning: "Warning! Follow safety rules when conducting experiments and work under adult supervision.",
    textbook_not_found: "Lesson not found",
    textbook_back: "Return to Home",

    // Quiz - Student
    quiz_title: "Tests",
    quiz_empty: "No approved tests yet",
    quiz_start: "START TEST",
    quiz_result: "Your Result!",
    quiz_excellent: "Excellent! You're a genius! 🏆",
    quiz_good: "Good result! 👏",
    quiz_try: "Keep studying. 💪",
    quiz_back: "Back to section",
    quiz_progress: "Progress",
    quiz_question: "Question number",
    quiz_correct: "Correct!",
    quiz_wrong: "Correct answer",

    // AI Quiz - Admin
    ai_quiz_title: "AI Knowledge Test",
    ai_quiz_sub_admin: "Admin panel: Create tests with 10 questions and approve them for students.",
    ai_quiz_sub_student: "Test your knowledge on approved topics.",
    ai_new_test: "Create New Test",
    ai_topic_label: "Topic name (Formulas/Terms)",
    ai_topic_placeholder: "E.g.: Mechanics formulas",
    ai_generate: "Prepare 10 Questions",
    ai_approve: "Approve",
    ai_reject: "Reject",
    ai_cancel: "Cancel",
    ai_ready: "Ready for review!",
    ai_student_mode: "Student Mode",
    ai_student_info: "Only tests approved by the admin (with at least 10 questions) are shown here.",
    ai_announce: "announced",

    // Settings
    settings_title: "Settings",
    settings_theme: "Theme",
    settings_lang: "Language",
    settings_dark: "Dark mode",
    settings_light: "Light mode",

    // Language names
    lang_uz: "O'zbekcha",
    lang_ru: "Русский",
    lang_en: "English",
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('siteLang') || 'uz';
  });

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('siteLang', newLang);
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['uz'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
