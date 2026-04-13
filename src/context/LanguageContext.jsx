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
    nav_back: "Orqaga",
    nav_back_long: "Bo'limga qaytish",

    // Textbook chapter titles
    chap_1: "1-BOB. Fizika nimani o'rgatadi?",
    chap_2: "2-BOB. Fizik kattaliklar va o'lchash",
    chap_3: "3-BOB. Modda tuzilishi haqida",
    chap_4: "4-BOB. Mexanik hodisalar",
    chap_5: "5-BOB. Jismlarning muvozanati",
    chap_6: "6-BOB. Suyuqlik va gazlar bosimi",
    chap_7: "7-BOB. Issiqlik hodisalari",

    // Video categories
    cat_all: "Hammasi",
    cat_intro: "Kirish",
    cat_mechanics: "Mexanika",
    cat_thermo: "Termodynamika",

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
    login_btn_register: "Ro'yxatdan o'tish",
    login_toggle_new: "Hisobingiz yo'qmi? Ro'yxatdan o'tish",
    login_toggle_existing: "Hisobingiz bormi? Kirish",
    login_bio_label: "O'zingiz haqingizda (bio)",
    login_bio_placeholder: "Masalan: 6-A sinf o'quvchisi",
    login_footer: "Fizika darslari platformasi",
    login_err_empty: "Ism va parolni kiriting",
    login_err_pass: "Parol noto'g'ri! Avval kirgan parolingizni ishlating.",
    login_welcome_new: "Hisobingiz yaratildi 🎉",
    login_welcome: "Xush kelibsiz",

    // Videos
    videos_title: "Video darslar",
    videos_search: "Mavzuni qidiring...",
    videos_all: "Hammasi",
    videos_count: "ta video",

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
    ai_min_questions: "Kamida 10 ta savol bo'lishi shart!",

    // Settings
    settings_title: "Sozlamalar",
    settings_theme: "Mavzu",
    settings_switch_lang: "Tilni o'zgartirish",
    settings_dark: "Qoʻngʻir rejim",
    settings_light: "Yorqin rejim",

    // Fallbacks and Errors
    textbook_f_theory: "Bu mavzu bo'yicha nazariy ma'lumotlar ustida ish olib borilmoqda. Tez kunda kiritiladi.",
    textbook_f_formulas: "Tez kunda...",
    textbook_f_experiments: "Tajribalar metodikasi tayyorlanmoqda.",
    ai_parse_error: "Test tarkibini ajratishda xatolik. Yana bir bor urinib ko'ring.",
    ai_actual_answer: "Aslida:",
    quiz_toast_correct: "To'g'ri!",
    quiz_toast_delete: "Test o'chirib tashlandi.",
    not_found_title: "404 - Sahifa topilmadi",
    not_found_desc: "Siz qidirayotgan sahifa manzili xato yoki o'chirilgan.",
    not_found_back: "Asosiy sahifaga qaytish",
    materials_upload_error: "Fayl saqlashda xotira xatosi yuz berdi.",

    // Language names
    lang_uz: "O'zbekcha",
    lang_ru: "Русский",
    lang_en: "English",

    // Lessons (Mavzular)
    lesson_1: "1. Kirish",
    lesson_2: "2. Fizika nimani o‘rganadi?",
    lesson_3: "3. Fizika va texnika",
    lesson_4: "4. Fizika va tabiatni muhofaza qilish",
    lesson_5: "5. Fizikada ishlatiladigan ayrim kattaliklar",
    lesson_6: "6. Kuzatishlar va tajribalar",
    lesson_7: "7. Fizik kattaliklar va ularni o'lchash",
    lesson_8: "8. O’lchash aniqligi",
    lesson_9: "9. Tajriba natijalarini hisoblash",
    lesson_10: "10. Modda tuzilishi (Demokrit va Ar-Rоziy)",
    lesson_11: "11. Mоlekulalar va ularning o‘lchamlari",
    lesson_12: "12. Diffuziya hodisаsi",
    lesson_13: "13. Mоlekulalarning o‘zаrо tortishuvi",
    lesson_14: "14. Moddа holаtlari: qattiq, suyuq va gaz",
    lesson_15: "15. Mexanik harakat va uning turlari",
    lesson_16: "16. To‘g‘ri chiziqli tekis harakat. Tezlik",
    lesson_17: "17. Notekis harakat. O‘rtacha tezlik",
    lesson_18: "18. Inersiya hodisasi",
    lesson_19: "19. Massa va zichlik",
    lesson_20: "20. Kuch tushunchasi",
    lesson_21: "21. Muvozanat turlari",
    lesson_22: "22. Lever (Richag) qonuni",
    lesson_23: "23. Bloklar va ularning turlari",
    lesson_24: "24. Oddiy mexanizmlar foydali ish koeffitsienti",
    lesson_25: "25. Bosim va bosim kuchi",
    lesson_26: "26. Paskal qonuni",
    lesson_27: "27. Arximed kuchi",
    lesson_28: "28. Jismning suzish shartlari",
    lesson_29: "29. Temperatura tushunchasi",
    lesson_30: "30. Issiqlik o‘tkazuvchanlik",
    lesson_31: "31. Konveksiya va nurlanish",
    lesson_32: "32. Issiqlik miqdori va uning birligi",
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
    nav_back: "Назад",
    nav_back_long: "Назад к разделу",

    // Textbook chapter titles
    chap_1: "ГЛАВА 1. Что изучает физика?",
    chap_2: "ГЛАВА 2. Физ. величины и измерения",
    chap_3: "ГЛАВА 3. Строение вещества",
    chap_4: "ГЛАВА 4. Механические явления",
    chap_5: "ГЛАВА 5. Равновесие тел",
    chap_6: "ГЛАВА 6. Давление жидкостей и газов",
    chap_7: "ГЛАВА 7. Тепловые явления",

    // Video categories
    cat_all: "Все",
    cat_intro: "Введение",
    cat_mechanics: "Механика",
    cat_thermo: "Термодинамика",

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
    login_btn_register: "Зарегистрироваться",
    login_toggle_new: "Нет аккаунта? Зарегистрироваться",
    login_toggle_existing: "Есть аккаунт? Войти",
    login_bio_label: "О себе (биография)",
    login_bio_placeholder: "Например: Ученик 6-А класса",
    login_footer: "Платформа уроков физики",
    login_err_empty: "Введите имя и пароль",
    login_err_pass: "Неверный пароль! Используйте пароль, с которым вы впервые вошли.",
    login_welcome_new: "Аккаунт создан 🎉",
    login_welcome: "Добро пожаловать",

    // Videos
    videos_title: "Видеоуроки",
    videos_search: "Поиск по теме...",
    videos_all: "Все",
    videos_count: "видео",

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
    ai_min_questions: "Минимум 10 вопросов обязательно!",

    // Settings
    settings_title: "Настройки",
    settings_theme: "Тема",
    settings_switch_lang: "Изменить язык",
    settings_dark: "Тёмный режим",
    settings_light: "Светлый режим",

    // Fallbacks and Errors
    textbook_f_theory: "Теоретические материалы по этой теме находятся в разработке. Скоро будут добавлены.",
    textbook_f_formulas: "В скором времени...",
    textbook_f_experiments: "Методика экспериментов в процессе подготовки.",
    ai_parse_error: "Ошибка обработки теста. Попробуйте сгенерировать снова.",
    ai_actual_answer: "На самом деле:",
    quiz_toast_correct: "Верно!",
    quiz_toast_delete: "Тест удалён.",
    not_found_title: "404 - Страница не найдена",
    not_found_desc: "Страница, которую вы ищете, не существует или была удалена.",
    not_found_back: "Вернуться на главную",
    materials_upload_error: "Ошибка памяти при сохранении файла.",

    // Language names
    lang_uz: "O'zbekcha",
    lang_ru: "Русский",
    lang_en: "English",

    // Lessons (Темы)
    lesson_1: "1. Введение",
    lesson_2: "2. Что изучает физика?",
    lesson_3: "3. Физика и техника",
    lesson_4: "4. Физика и охрана природы",
    lesson_5: "5. Некоторые величины в физике",
    lesson_6: "6. Наблюдения и опыты",
    lesson_7: "7. Физ. величины и их измерение",
    lesson_8: "8. Точность измерения",
    lesson_9: "9. Расчет результатов опытов",
    lesson_10: "10. Строение вещества (Демокрит)",
    lesson_11: "11. Молекулы и их размеры",
    lesson_12: "12. Явление диффузии",
    lesson_13: "13. Взаимное притяжение молекул",
    lesson_14: "14. Состояния вещества: тв., ж., г.",
    lesson_15: "15. Мех. движение и его виды",
    lesson_16: "16. Равномерное движение. Скорость",
    lesson_17: "17. Неравномерное движение",
    lesson_18: "18. Явление инерции",
    lesson_19: "19. Масса и плотность",
    lesson_20: "20. Понятие силы",
    lesson_21: "21. Виды равновесия",
    lesson_22: "22. Закон Рычага",
    lesson_23: "23. Блоки и их виды",
    lesson_24: "24. КПД простых механизмов",
    lesson_25: "25. Давление и сила давления",
    lesson_26: "26. Закон Паскаля",
    lesson_27: "27. Сила Архимеда",
    lesson_28: "28. Условия плавания тел",
    lesson_29: "29. Понятие температуры",
    lesson_30: "30. Теплопроводность",
    lesson_31: "31. Конвекция и излучение",
    lesson_32: "32. Количество теплоты",
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
    nav_back: "Back",
    nav_back_long: "Back to section",

    // Textbook chapter titles
    chap_1: "CHAPTER 1. What does Physics study?",
    chap_2: "CHAPTER 2. Physical quantities & measurement",
    chap_3: "CHAPTER 3. Structure of matter",
    chap_4: "CHAPTER 4. Mechanical phenomena",
    chap_5: "CHAPTER 5. Equilibrium of bodies",
    chap_6: "CHAPTER 6. Pressure in liquids & gases",
    chap_7: "CHAPTER 7. Thermal phenomena",

    // Video categories
    cat_all: "All",
    cat_intro: "Introduction",
    cat_mechanics: "Mechanics",
    cat_thermo: "Thermodynamics",

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
    login_btn_register: "Register",
    login_toggle_new: "No account? Register",
    login_toggle_existing: "Have an account? Login",
    login_bio_label: "About yourself (bio)",
    login_bio_placeholder: "E.g.: 6-A grade student",
    login_footer: "Physics Lessons Platform",
    login_err_empty: "Please enter name and password",
    login_err_pass: "Wrong password! Use the password you first logged in with.",
    login_welcome_new: "Account created 🎉",
    login_welcome: "Welcome",

    // Videos
    videos_title: "Video Lessons",
    videos_search: "Search by topic...",
    videos_all: "All",
    videos_count: "videos",

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
    ai_min_questions: "Minimum 10 questions required!",

    // Settings
    settings_title: "Settings",
    settings_theme: "Theme",
    settings_switch_lang: "Change Language",
    settings_dark: "Dark mode",
    settings_light: "Light mode",

    // Fallbacks and Errors
    textbook_f_theory: "Theoretical materials for this topic are currently under development and will be added soon.",
    textbook_f_formulas: "Coming soon...",
    textbook_f_experiments: "Experimental methods are being prepared.",
    ai_parse_error: "Error parsing the test content. Please try generating it again.",
    ai_actual_answer: "Actually:",
    quiz_toast_correct: "Correct!",
    quiz_toast_delete: "Test deleted.",
    not_found_title: "404 - Page Not Found",
    not_found_desc: "The page you are looking for does not exist or has been removed.",
    not_found_back: "Back to Home",
    materials_upload_error: "Memory error occurred while saving the file.",

    // Language names
    lang_uz: "O'zbekcha",
    lang_ru: "Русский",
    lang_en: "English",

    // Lessons (Topics)
    lesson_1: "1. Introduction",
    lesson_2: "2. What does Physics study?",
    lesson_3: "3. Physics and Technology",
    lesson_4: "4. Physics and Nature Conservation",
    lesson_5: "5. Some Quantities in Physics",
    lesson_6: "6. Observations and Experiments",
    lesson_7: "7. Physical Quantities & Measurement",
    lesson_8: "8. Measurement Accuracy",
    lesson_9: "9. Calculation of Results",
    lesson_10: "10. Structure of Matter (Democritus)",
    lesson_11: "11. Molecules and Their Sizes",
    lesson_12: "12. Diffusion Phenomenon",
    lesson_13: "13. Molecular Attraction",
    lesson_14: "14. States of Matter: S, L, G",
    lesson_15: "15. Mechanical Motion & Its Types",
    lesson_16: "16. Uniform Motion. Velocity",
    lesson_17: "17. Non-uniform Motion",
    lesson_18: "18. Inertia Phenomenon",
    lesson_19: "19. Mass and Density",
    lesson_20: "20. Concept of Force",
    lesson_21: "21. Types of Equilibrium",
    lesson_22: "22. Lever Law",
    lesson_23: "23. Pulleys and Their Types",
    lesson_24: "24. Efficiency of Simple Machines",
    lesson_25: "25. Pressure and Driving Force",
    lesson_26: "26. Pascal's Law",
    lesson_27: "27. Archimedes' Force",
    lesson_28: "28. Floating Conditions",
    lesson_29: "29. Concept of Temperature",
    lesson_30: "30. Thermal Conductivity",
    lesson_31: "31. Convection and Radiation",
    lesson_32: "32. Quantity of Heat",
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
