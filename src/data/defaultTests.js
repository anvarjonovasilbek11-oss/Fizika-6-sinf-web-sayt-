export const DEFAULT_AI_QUIZZES = [
  {
    id: 'bob_1',
    topic: "1-BОB. Fizika nimani o'rgatadi? (Mustahkamlash)",
    isApproved: false,
    questions: [
      { id: 1, question: "Aristotel 'Fizika' atamasini fanga qachon kiritgan?", options: { A: "Miloddan avvalgi IV asr", B: "Milodiy X asr", C: "XVIII asr", D: "XIX asr" }, correct: "A" },
      { id: 2, question: "Tabiatda yuz beradigan har qanday o'zgarish nima deyiladi?", options: { A: "Fizik hodisa", B: "Tabiat hodisasi", C: "Kimyoviy reaksiya", D: "Biologik jarayon" }, correct: "B" },
      { id: 3, question: "Quyidagilardan qaysi biri fizik hodisaga kirmaydi?", options: { A: "Muzning erishi", B: "Suvning qaynashi", C: "Daraxt bargining sarg'ayishi", D: "Temirning zanglashi" }, correct: "D" },
      { id: 4, question: "Fizika so'zi yunoncha 'fyuzis' so'zidan olingan bo'lib, nima degan ma'noni anglatadi?", options: { A: "Tabiat", B: "Harakat", C: "Energiya", D: "Modda" }, correct: "A" },
      { id: 5, question: "Fizika fanining asosiy vazifasi nimadan iborat?", options: { A: "Tabiat hodisalarini o'rganish", B: "Mexanizmlar yaratish", C: "Tabiat qonunlarini kashf etish va tushuntirish", D: "Yangi moddalar sintez qilish" }, correct: "C" },
      { id: 6, question: "Fizika fani qaysi hodisalarni o'rganadi?", options: { A: "Faqat mexanik", B: "Mexanik, issiqlik, yorug'lik, elektr, magnit", C: "Faqat kimyoviy", D: "Faqat biologik" }, correct: "B" },
      { id: 7, question: "Ilmiy bilimlar qanday tartibda shakllanadi?", options: { A: "Taxmin -> Kuzatish -> Tajriba", B: "Tajriba -> Kuzatish -> Nazariya", C: "Kuzatish -> Taxmin -> Tajriba -> Nazariya", D: "Nazariya -> Kuzatish" }, correct: "C" },
      { id: 8, question: "Nyuton qaysi fizik hodisani kashf qilgan?", options: { A: "Butun olam tortishish qonuni", B: "Elektr quvvati", C: "Radioaktivlik", D: "Rentgen nurlari" }, correct: "A" },
      { id: 9, question: "Fizika o'rganadigan narsalar nima deyiladi?", options: { A: "Fizik jismlar", B: "Moddalar", C: "Elementlar", D: "Atomlar" }, correct: "A" },
      { id: 10, question: "O'rta Osiyoda fizikaga oid asarlar yozgan olim?", options: { A: "Abu Rayhon Beruniy", B: "Zaxiriddin Muhammad Bobur", C: "Amir Temur", D: "Mirzo Ulug'bek" }, correct: "A" }
    ]
  },
  {
    id: 'bob_2',
    topic: "2-BОB. Modda tuzilishi (Mustahkamlash)",
    isApproved: false,
    questions: [
      { id: 1, question: "Modda tuzilishi haqida birinchi bo'lib kimlar fikr yuritgan?", options: { A: "Demokrit va Ar-Roziy", B: "Nyuton va Eynshteyn", C: "Aristotel va Galiley", D: "Paskal va Arximed" }, correct: "A" },
      { id: 2, question: "Moddaning eng kichik, barcha xossalarini o'zida saqlaydigan zarrachasi nima?", options: { A: "Atom", B: "Molekula", C: "Elektron", D: "Neytron" }, correct: "B" },
      { id: 3, question: "Molekulalarning o'zi nimadan tashkil topgan?", options: { A: "Atomdan", B: "Protondan", C: "Kvarkdan", D: "Plazmadan" }, correct: "A" },
      { id: 4, question: "Molekulalarning bir-biriga aralashib ketish hodisasi nima deyiladi?", options: { A: "Inersiya", B: "Diffuziya", C: "Konveksiya", D: "Adgeziya" }, correct: "B" },
      { id: 5, question: "Diffuziya tezligi nimaga bog'liq?", options: { A: "Jism shakliga", B: "Temperaturaga", C: "Jism rangiga", D: "Atmosfera bosimiga" }, correct: "B" },
      { id: 6, question: "Gazlarda diffuziya qanday kechadi?", options: { A: "Suyuqliklarga qaraganda tez", B: "Juda sekin", C: "Hech qanday farqi yo'q", D: "Gazlarda diffuziya bo'lmaydi" }, correct: "A" },
      { id: 7, question: "Molekulalar orasida qanday kuchlar mavjud?", options: { A: "Faqat tortishish", B: "Faqat itarish", C: "Ham tortishish, ham itarish", D: "Magnit kuchi" }, correct: "C" },
      { id: 8, question: "Qaysi holatda molekulalararo tortishish kuchi sezilarli bo'ladi?", options: { A: "Masofa juda yaqin bo'lganda", B: "Masofa uzoq bo'lganda", C: "Past bosimda", D: "Yuqori temperaturada" }, correct: "A" },
      { id: 9, question: "Moddaning nechta agregat holati mavjud?", options: { A: "2 ta", B: "3 ta (Qattiq, Suyuq, Gaz)", C: "4 ta", D: "5 ta" }, correct: "B" },
      { id: 10, question: "Molekulalar harakati to'xtovsiz va tartibsiz ekanligini isbotlagan tajriba?", options: { A: "Paskal tajribasi", B: "Braun harakati", C: "Torichelli tajribasi", D: "Magdeburg yarim sharlari" }, correct: "B" }
    ]
  },
  {
    id: 'bob_3',
    topic: "3-BОB. Fizik kattaliklar va ularni o'lchash (Mustahkamlash)",
    isApproved: false,
    questions: [
      { id: 1, question: "Xalqaro birliklar sistemasi (SI) qachon qabul qilingan?", options: { A: "1960-yil", B: "1900-yil", C: "1991-yil", D: "1945-yil" }, correct: "A" },
      { id: 2, question: "Uzunlikning SI sistemasidagi asosiy birligi qaysi?", options: { A: "Santimetr", B: "Millimetr", C: "Metr", D: "Kilometr" }, correct: "C" },
      { id: 3, question: "Sirt yuzi (S) qanday aniqlanadi?", options: { A: "S = a + b", B: "S = a * b", C: "S = a^2 + b^2", D: "S = m / V" }, correct: "B" },
      { id: 4, question: "Hajm (V) birligi nima?", options: { A: "m^2", B: "m^3", C: "kg", D: "m/s" }, correct: "B" },
      { id: 5, question: "Zichlik (ρ) qaysi formula bilan topiladi?", options: { A: "ρ = m * V", B: "ρ = F / S", C: "ρ = m / V", D: "ρ = V / m" }, correct: "C" },
      { id: 6, question: "Pikr: 1 litr suv necha kg massa beradi?", options: { A: "0.5 kg", B: "1 kg", C: "2 kg", D: "1.5 kg" }, correct: "B" },
      { id: 7, question: "O'lchash asbobining bo'lim qiymati qanday topiladi?", options: { A: "Ikkita raqamli chiziq ayirmasini oraliqlar soniga bo'lish", B: "Shunchaki ko'z bilan ko'rish", C: "Asbobning maksimal qiymati", D: "Asbobning o'rtacha qiymati" }, correct: "A" },
      { id: 8, question: "Vaqtning SI sistemasidagi asosiy birligi nima?", options: { A: "Minut", B: "Soat", C: "Sekund", D: "Sutka" }, correct: "C" },
      { id: 9, question: "Massaning asosiy birligi nima?", options: { A: "Gramm", B: "Milligramm", C: "Kilogramm", D: "Tonna" }, correct: "C" },
      { id: 10, question: "Jism hajmini aniq o'lchash uchun qaysi asbobdan foydalaniladi?", options: { A: "Liniyka", B: "Menzurka", C: "Tarozi", D: "Termometr" }, correct: "B" }
    ]
  },
  {
    id: 'bob_4',
    topic: "4-BОB. Mexanik hodisalar (Mustahkamlash)",
    isApproved: false,
    questions: [
      { id: 1, question: "Harakat yo'nalishini ko'rsatuvchi chiziq nima deyiladi?", options: { A: "Yo'l", B: "Traektoriya", C: "Ko'chish", D: "Vektor" }, correct: "B" },
      { id: 2, question: "Tezlik qaysi formula orqali topiladi?", options: { A: "v = s / t", B: "v = m / V", C: "v = s * t", D: "v = F / s" }, correct: "A" },
      { id: 3, question: "Inersiya nima?", options: { A: "Jismning o'z tezligini saqlash xossasi", B: "Jismning to'xtash qobiliyati", C: "Jismning og'irligi", D: "Jismning hajm o'zgarishi" }, correct: "A" },
      { id: 4, question: "Erkin tushish tezlanishi (g) ning qiymati taxminan nechaga teng?", options: { A: "9.8 m/s^2", B: "5 m/s^2", C: "15 m/s^2", D: "1 m/s^2" }, correct: "A" },
      { id: 5, question: "Nyutonning II qonuni qaysi?", options: { A: "F = m * a", B: "F1 = -F2", C: "a = v / t", D: "v = s / t" }, correct: "A" },
      { id: 6, question: "Kuch birligi nima?", options: { A: "Paskal", B: "Joul", C: "Nyuton", D: "Vatt" }, correct: "C" },
      { id: 7, question: "Ishqalanish kuchi har doim qaysi yo'nalishga qarshi yo'naladi?", options: { A: "Harakat yo'nalishiga", B: "Harakat bilan birga", C: "Yuqoriga", D: "Pastga" }, correct: "A" },
      { id: 8, question: "Og'irlik kuchi formulasi?", options: { A: "P = m * g", B: "P = m / g", C: "P = F * s", D: "P = v / t" }, correct: "A" },
      { id: 9, question: "Bosim qaysi asbob yordamida o'lchanadi?", options: { A: "Barometr", B: "Manometr", C: "Dinamometr", D: "Hammasi to'g'ri (soha bo'yicha)" }, correct: "D" },
      { id: 10, question: "Paskal qonuni qayerlarda o'rinli?", options: { A: "Faqat qattiq jismlarda", B: "Suyuqlik va gazlarda", C: "Faqat vakuumda", D: "Faqat magnetlarda" }, correct: "B" }
    ]
  },
  {
    id: 'bob_5',
    topic: "5-BОB. Energiya va Ish (Mustahkamlash)",
    isApproved: false,
    questions: [
      { id: 1, question: "Mexanik ish qaysi harf bilan belgilanadi?", options: { A: "A", B: "P", C: "E", D: "W" }, correct: "A" },
      { id: 2, question: "Ishning birligi nima?", options: { A: "Nyuton", B: "Joul", C: "Vatt", D: "Paskal" }, correct: "B" },
      { id: 3, question: "Quvvat (N) qanday topiladi?", options: { A: "N = A / t", B: "N = A * t", C: "N = F * s", D: "N = m * g" }, correct: "A" },
      { id: 4, question: "Kinetik energiya nimaga bog'liq?", options: { A: "Massa va tezlikka", B: "Massa va balandlikka", C: "Massa va rangga", D: "Temperaturaga" }, correct: "A" },
      { id: 5, question: "Potensial energiya formulasi?", options: { A: "E = mgh", B: "E = mv^2/2", C: "E = Fs", D: "E = Nt" }, correct: "A" },
      { id: 6, question: "Energiya saqlanish qonuni nima deydi?", options: { A: "Energiya yo'qolmaydi, faqat bir turdan boshqasiga o'tadi", B: "Energiya doim ortib boradi", C: "Energiya doim kamayadi", D: "Energiya faqat issiqlikka aylanadi" }, correct: "A" },
      { id: 7, question: "Quvvati 1500 Vatt bo'lgan asbob 2 sekundda qancha ish bajaradi?", options: { A: "3000 J", B: "750 J", C: "1500 J", D: "0 J" }, correct: "A" },
      { id: 8, question: "Foydali ish koeffitsienti (FIK) har doim qanday bo'ladi?", options: { A: "100% dan har doim kichik", B: "100% dan katta", C: "Doim 0 ga teng", D: "1000% gacha chiqishi mumkin" }, correct: "A" },
      { id: 9, question: "Bloklar necha turga bo'linadi?", options: { A: "Qo'zg'almas va qo'zg'aluvchan", B: "Katta va kichik", C: "Og'ir va yengil", D: "Metall va plastik" }, correct: "A" },
      { id: 10, question: "Qo'zg'aluvchan blok kuchdan necha marta yutuq beradi?", options: { A: "1 marta", B: "2 marta", C: "3 marta", D: "Yutuq bermaydi" }, correct: "B" }
    ]
  },
  {
    id: 'bob_6',
    topic: "6-BОB. Issiqlik hodisalari (Mustahkamlash)",
    isApproved: false,
    questions: [
      { id: 1, question: "Temperaturani o'lchash asbobi?", options: { A: "Dinamometr", B: "Termometr", C: "Barometr", D: "Gigrometr" }, correct: "B" },
      { id: 2, question: "Suv necha gradusda qaynaydi?", options: { A: "50°C", B: "80°C", C: "100°C", D: "120°C" }, correct: "C" },
      { id: 3, question: "Issiqlik uzatishning necha turi bor?", options: { A: "2 ta", B: "3 ta (Issiqlik o'tkazuvchanlik, Konveksiya, Nurlanish)", C: "4 ta", D: "5 ta" }, correct: "B" },
      { id: 4, question: "Suv necha gradusda muzlaydi?", options: { A: "0°C", B: "-10°C", C: "4°C", D: "10°C" }, correct: "A" },
      { id: 5, question: "Qaysi moddaning issiqlik o'tkazuvchanligi yuqori?", options: { A: "Havo", B: "Yog'och", C: "Metall", D: "Plastmassa" }, correct: "C" },
      { id: 6, question: "Nurlanish nima orqali uzatiladi?", options: { A: "Zarrachalar", B: "Nurlar (infraqizil)", C: "Faqat havo", D: "Faqat suyuqlik" }, correct: "B" },
      { id: 7, question: "Konveksiya qayerlarda sodir bo'ladi?", options: { A: "Faqat qattiq jismlarda", B: "Suyuqlik va gazlarda", C: "Faqat metallarda", D: "Vakuumda" }, correct: "B" },
      { id: 8, question: "Issiqlik miqdori birligi nima?", options: { A: "Joul", B: "Kaloriya", C: "Nyuton", D: "Paskal" }, correct: "A" },
      { id: 9, question: "Suyuqlik bug'ga aylanish jarayoni nima deyiladi?", options: { A: "Bug'lanish", B: "Kondensatsiya", C: "Muzlash", D: "Sublimatsiya" }, correct: "A" },
      { id: 10, question: "Absolyut nol temperatura Selsiyda qanchaga teng?", options: { A: "-273°C", B: "0°C", C: "100°C", D: "-100°C" }, correct: "A" }
    ]
  },
  {
    id: 'bob_7',
    topic: "7-BОB. Magnit va elektr hodisalar (Mustahkamlash)",
    isApproved: false,
    questions: [
      { id: 1, question: "Magnitning nechta qutbi bor?", options: { A: "1 ta", B: "2 ta (Shimol va Janub)", C: "3 ta", D: "4 ta" }, correct: "B" },
      { id: 2, question: "Elektr zaryadi birligi nima?", options: { A: "Kulon", B: "Amper", C: "Volt", D: "Om" }, correct: "A" },
      { id: 3, question: "Ebonit tayoqcha jun matoga ishlanganda qanday zaryadlanadi?", options: { A: "Musbat", B: "Manfiy", C: "Zaryadlanmaydi", D: "Neytral bo'ladi" }, correct: "B" },
      { id: 4, question: "Tok kuchi (I) birligi nima?", options: { A: "Amper", B: "Volt", C: "Vatt", D: "Joul" }, correct: "A" },
      { id: 5, question: "Kuchlanish (U) qanday asbob bilan o'lchanadi?", options: { A: "Ampermetr", B: "Voltmeter", C: "Ommetr", D: "Vattmetr" }, correct: "B" },
      { id: 6, question: "Qarshilik (R) birligi nima?", options: { A: "Om", B: "Kilovolt", C: "Milliwatt", D: "Gerts" }, correct: "A" },
      { id: 7, question: "Magnit maydonini nima hosil qiladi?", options: { A: "Harakatlanayotgan zaryadlar", B: "Tinch turgan zaryadlar", C: "Faqat yog'och", D: "Suv" }, correct: "A" },
      { id: 8, question: "Yerning ham o'z magnit maydoni bormi?", options: { A: "Bor", B: "Yo'q", C: "Faqat ekvatorda bor", D: "Faqat okeanlarda bor" }, correct: "A" },
      { id: 9, question: "Chaqmoq nima?", options: { A: "Atmosferadagi kuchli elektr razryadi", B: "Shunchaki tovush", C: "Yomg'irning bir turi", D: "Magnit bo'roni" }, correct: "A" },
      { id: 10, question: "Elektr tokini o'tkazadigan moddalar nima deyiladi?", options: { A: "Dielektriklar", B: "O'tkazgichlar", C: "Yarim o'tkazgichlar", D: "Izolyatorlar" }, correct: "B" }
    ]
  }
];
