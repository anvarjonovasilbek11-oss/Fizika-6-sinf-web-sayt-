export const TEXTBOOK_DATA = [
  {
    id: 'bob-1',
    title: "1-BОB. Fizika nimani o'rgatadi?",
    lessons: [
      { id: '1', title: 'lesson_1',
        content: {
          theory: `Fizika – olamning eng fundamental sirlarini o'rganishga ochilgan oltin eshikdir. U bizni o'rab turgan har bir mitti zarrachadan tortib, ulkan galaktikalargacha bo'lgan barcha jarayonlarni boshqaradigan qonuniyatlarni ochib beradi. Nima uchun yomg'ir tomchisi doimo yerga tushadi? Nega biz osmonni moviy rangda ko'ramiz? Bulutlar qanday qilib tonnalab suvni havoda tutib turadi? Bu savollarning barchasiga fizika javob beradi.

Fizika fani qadimiy va hamisha yosh fandir. 'Fizika' so'zi yunoncha 'fysis' so'zidan olingan bo'lib, 'tabiat' degan ma'noni anglatadi. Insoniyat paydo bo'lgandanoq tabatni kuzatdi, undagi o'zgarishlarni tushunishga harakat qildi. Dastlab bu bilimlar yig'indisi 'Tabiat falsafasi' deb atalgan bo'lsa, keyinchalik tajribalar va matematik hisob-kitoblar ko'payishi bilan mustaqil fizika fani shakllandi.

Darsligimizning ushbu birinchi bobi sizga fizikaning naqadar qiziqarli va muhim ekanligini ko'rsatib beradi. Biz tabiat qonunlarini o'rganish orqali nafaqat olam sirlarini bilib olamiz, balki insoniyat hayotini yengillashtiradigan asboblar va mashinalar yaratishni ham o'rganamiz. Masalan, oddiy g'ildirakdan tortib, murakkab kompyuterlargacha bo'lgan har bir ixtiro fizik qonuniyatlarga asoslangan.

Fizikaning asosiy maqsadi – tabiat hodisalarining o'zaro bog'liqligini aniqlash va ularni umumiy qonuniyatlar (masalan, energiyaning saqlanish qonuni yoki butun olam tortishish qonuni) tarzida shakllantirishdir. Bu bilimlar bizga kelajakni bashorat qilish imkonini beradi: biz qachon quyosh tutilishi bo'lishini yoki koinot kemasi qaerga qo'nishini aniq bilamiz. 

Ushbu fan sizdan nafaqat kitob o'qishni, balki atrofga sinchkovlik bilan qarashni, savollar berishni va tajribalar o'tkazishni talab qiladi. Har bir buyuk fizik bir vaqtlar o'zi ko'rgan oddiy hodisadan hayratlangan bolakay bo'lgan. Siz ham bugundan boshlab tabiatga fizik olim ko'zi bilan qarashni boshlaysiz.`,
          formulas: "Asosiy tushunchalar: Tabiat, Fizika, Qonuniyat, Bashorat qilish.",
          experiments: "Atrof-muhitdagi oddiy tabiat hodisalarini (shamolning barglarni qimirlatishi, suvning oqishi) sinchkovlik bilan kuzatish."
        }
      },
      { id: '2', title: 'lesson_2',
        content: {
          theory: `Tabiatda yuz beradigan har qanday o'zgarish tabiat hodisalari deb ataladi. Fizika fani esa tabiatning eng fundamental hodisalarini o'rganadi. Bularga mexanik, issiqlik, tovush, yorug'lik, elektr va magnit hodisalari kiradi. Masalan, yomg'ir yog'ishi bir vaqtning o'zida ham mexanik (tomchilarning tushishi), ham gidrodinamik jarayondir. Quyoshning chiqishi va botishi esa murakkab optik hodisa bo'lib, atmosferada yorug'likning sinishi bilan bog'liq.

Fizik hodisalarni tushunish uchun biz ularni qismlarga ajratamiz. Mexanik hodisalar – bu jismlarning bir-biriga nisbatan vaziyatining o'zgarishidir. Avtomobilning harakati, soat milining aylanishi, hatto bizning nafas olishimiz ham mexanik jarayonlardir. Issiqlik hodisalari esa moddalarning harorati o'zgarishi, erish, bug'lanish va muzlash bilan bog'liq. Masalan, choynakdagi suvning qaynashi murakkab issiqlik almashinuvi jarayoni bo'lib, unda konveksiya va molekulalarning kinetik energiyasi ortishi kuzatiladi.

Yorug'lik hodisalari bizga dunyoni ko'rish imkonini beradi. Kamalakning paydo bo'lishi, ko'zgudagi aksimiz yoki linzalar orqali tasvirning kattalashishi – bularning barchasi optika qonuniyatlariga bo'ysunadi. Elektr va magnit hodisalari esa zamonaviy texnologiyalar asosi hisoblanadi. Chaqmoq chaqnashi – bu tabiatdagi eng kuchli elektr razryadidir. Magnitlar esa nafaqat kompaslarda, balki ulkan elektrostansiyalarda tok ishlab chiqarishda qo'llaniladi.

Fizika terminini ilk bor qadimgi yunon faylasufi Aristotel kiritgan bo'lib, u 'tabiat haqidagi fan' ma'nosini beradi. O'zbek tiliga esa bu atamani buyuk mutafakkir Abu Rayhon Beruniy o'zining ilmiy asarlarida keng qo'llagan va rivojlantirgan. Fizikani o'rganish orqali biz nafaqat 'nima sodir bo'lyapti?' degan savolga, balki 'nega bu aynan shunday sodir bo'lyapti?' degan fundamental savolga javob topamiz. Har bir hodisa ortida qat'iy va o'zgarmas tabiat qonuniyatlari yotadi.`,
          formulas: "Terminlar: Mexanik, Issiqlik, Optik, Elektr, Magnit hodisalar. Aristotel (mil. avv. IV asr).",
          experiments: "Muz bo'lagining erishini kuzatish (issiqlik), magnit yordamida metallarni ajratish (magnit) va qog'oz varag'ining tushishi (mexanik)."
        }
      },
      { id: '3', title: 'lesson_3',
        content: {
          theory: `Fizika fani faqat nazariy formulasidan iborat emas, u amaliy texnika taraqqiyotining dvigatelidir. Tarixga nazar tashlasak, har bir yirik texnik inqilob ortida fizik kashfiyot turganini ko'ramiz. XVII-XVIII asrlarda issiqlik hodisalarining o'rganilishi bug' mashinalarining yaratilishiga olib keldi. Bu esa insoniyatni og'ir qo'l mehnatidan xalos qilib, sanoat inqilobini boshlab berdi. Bugungi kunda biz foydalanayotgan poyezdlar va kemalar o'sha davrdagi kashfiyotlarning davomchilaridir.

XIX asrda elektr va magnetizm sohasidagi kashfiyotlar insoniyat hayotini butunlay o'zgartirdi. Maykl Faradey va Jeyms Maksvell kabi olimlarning ishlari tufayli biz bugun elektr energiyasidan foydalanamiz. Elektr dvigatellari, telefonlar, radio va televideniye — bularning barchasi fizik qonuniyatlarning texnikadagi amaliy ifodasidir. Tasavvur qiling, elektr energiyasisiz zamonaviy shaharlar, fabrikalar va hatto oddiy yoritish tizimlari ham ishlamagan bo'lar edi.

XX asr fizikasi esa mikroolam va atom sirlarini ochdi. Yarimo'tkazgichlarning kashf etilishi kompyuterlar va smartfonlar davrini boshlab berdi. Kvant fizikasi yutuqlari lazer texnologiyalari va zamonaviy tibbiy diagnostika qurilmalarini (masalan, MRT) yaratishga imkon berdi. Har bir mitti chip ichida trillionlab fizik jarayonlar soniyaning milliondan bir qismida amalga oshadi.

Texnika taraqqiyoti = Fizik kashfiyot + Muhandislik amaliyoti. Bu formula bugun ham o'z kuchini yo'qotmagan. Hozirgi kunda fizika koinotni o'rganishda, sun'iy intellekt apparatlarini yaratishda va nanomateriallar ishlab chiqarishda yetakchi rol o'ynamoqda. Robototexnika esa mexanika, elektronika va boshqaruv nazariyasining mukammal uyg'unligidir. Biz foydalanayotgan har bir gadjet — bu fizika fanining yuz yillik tadqiqotlari natijasidir.`,
          formulas: "Texnika taraqqiyoti formulasining mohiyati. Sanoat inqilobi bosqichlari.",
          experiments: "Oddiy dinamoni aylantirish orqali lampochkani yoqish (mexanik energiyaning elektrga aylanishi) yoki linza yordamida quyosh nuri bilan qog'ozni tutatish."
        }
      },
      { id: '4', title: 'lesson_4',
        content: {
          theory: `Hozirgi vaqtda fizika fani oldida turgan eng katta vazifalardan biri — atrof-muhitni muhofaza qilish va insoniyatni ekologik toza energiya bilan ta'minlashdir. Tabiiy resurslar (neft, gaz, ko'mir) cheklangan va ularni yoqish atmosferaga katta zarar yetkazadi. Fizika bu muammoni hal qilish uchun 'Yashil energiya' texnologiyalarini taklif etmoqda. 

Quyosh energetikasi — bu yorug'lik kvantlarini bevosita elektr energiyasiga aylantirishdir. Fotoeleffekt qonuniyatlari asosida ishlaydigan quyosh panellari hech qanday shovqin va zararli chiqindilarsiz tok ishlab chiqaradi. Shamol generatorlari esa havoning kinetik energiyasidan foydalanadi. Ularning qanotlari aero-dinamika qonunlari asosida loyihalashtirilgan bo'lib, hatto past tezlikdagi shamoldan ham samarali foydalanishga imkon berdi.

Fizika shuningdek, suvni tozalash, chiqindilarni qayta ishlash va atmosferadagi zararli gazlar miqdorini nazorat qilish usullarini ham ishlab chiqadi. Masalan, lazerli spektral tahlil yordamida havo tarkibidagi zaharli moddalarni masofadan turib aniqlash mumkin. Bu esa ekologik falokatlarning oldini olishga xizmat qiladi. Issiqxona effekti (greenhouse effect) ham sof fizik jarayon bo'lib, u infraqizil nurlarning atmosferada tutilib qolishi bilan bog'liq. Olimlar buni o'rganish orqali global iqlim o'zgarishini boshqarish yo'llarini qidirmoqdalar.

Kelajak fizikasi — bu ekologiya bilan uyg'unlashgan fizika. Gidroenergetika, geotermal energiya va vodorod yoqilg'isi kabi sohalar fizik tadqiqotlarning eng dolzarb yo'nalishlaridir. Tabiatni saqlab qolish uchun biz uni o'rganishimiz kerak. Fizika esa bizga tabiat bilan 'kelishib' yashash va uning boyliklaridan zarar yetkazmagan holda foydalanishni o'rgatadi.`,
          formulas: "Alternativ energiya: Shamol, Quyosh, Gidro. Issiqxona effekti mexanizmi.",
          experiments: "Quyosh panelining yorug'lik intensivligiga qarab kuchlanishini o'lchash yoki issiqxona effektini kichik shisha idish yordamida modellashtirish."
        }
      }
    ]
  },
  {
    id: 'bob-2',
    title: "2-BОB. Fizik kattaliklar va ularni o'lchash",
    lessons: [
      { id: '5', title: 'lesson_5',
        content: {
          theory: `Fizik kattaliklar — bu tabiat hodisalarining xossalarini miqdoriy jihatdan tavsiflash imkonini beruvchi asosiy tushunchalardir. Har bir fizik kattalik nafaqat nomga, balki son qiymatga va o'lchov birligiga ega bo'lishi shart. Masalan, 'besh' so'zi fizikada hech qanday ma'no bermaydi, lekin 'besh metr' yoki 'besh sekund' deganda biz darhol masofa yoki vaqtni tasavvur qilamiz. Fizika olamidagi har bir qonuniyat aynan shu kattaliklarning o'zaro bog'liqligi orqali ifodalanadi.

Tarixan, dunyoning turli mamlakatlarida turli xil o'lchov birliklari ishlatilgan. Masalan, masofani ba'zi joylarda 'qadam', ba'zi joylarda 'tirsak', ba'zi joylarda esa 'fut' (oyoq) bilan o'lchashgan. Bu esa xalqaro savdo, ilm-fan va texnik hamkorlikda katta qiyinchiliklar tug'dirgan. Tasavvur qiling, bir davlatning olimi bergan natijani ikkinchi davlatdagi muhandis tushunmasligi mumkin edi. Shu sababli, 1960-yilda butun dunyo uchun umumiy bo'lgan Xalqaro Birliklar Tizimi (SI – Le Système International d'Unités) qabul qilindi.

SI tizimi yettita asosiy birlikka tayanadi: uzunlik uchun metr (m), massa uchun kilogramm (kg), vaqt uchun sekund (s), elektr toki kuchi uchun amper (A), termodinamik harorat uchun kelvin (K), modda miqdori uchun mol (mol) va yorug'lik kuchi uchun kandela (cd). Qolgan barcha fizik birliklar (tezlik, kuch, energiya, bosim va h.k.) mana shu yettita asosiy birlikdan keltirib chiqariladi. Masalan, tezlik birligi bo'lgan metr-sekund (m/s) masofaning vaqtga bo'linishidan kelib chiqadi.

O'lchash — bu noma'lum fizik kattalikni qabul qilingan namunaviy birlik (etolon) bilan taqqoslash jarayonidir. Har qanday o'lchashda xatolik mavjud bo'ladi. Xatoliklar ikki turga bo'linadi: asbob xatoligi (shkala bo'lagi qiymatiga bog'liq) va tasodifiy xatolik (inson omili yoki tashqi ta'sirlar). O'lchash qanchalik aniq bo'lsa, fizik jarayonni shunchalik to'g'ri tushunamiz. Zamonaviy fizikada vaqtni o'lchash uchun atom soatlari ishlatiladi, ular soniyaning milliarddan bir ulushini ham aniq ko'rsata oladi.

Shuningdek, biz kundalik hayotda karrali va ulushli birliklardan ham foydalanamiz. Masalan, 'kilo-' prefiksi (kilometr, kilogramm) mingtani anglatsa, 'milli-' prefiksi (millimetr, milligramm) mingdan bir bo'lakni anglatadi. Bu bizga juda katta (masofalar, yulduzlar massasi) va juda mitti (atom o'lchamlari, elektron massasi) dunyolarni bir tilda tasvirlash imkonini beradi. Fizika — bu o'lchash va aniqlik san'atidir.`,
          formulas: "Asosiy birliklar (SI): m, kg, s, A, K, mol, cd. Karrali birliklar: kilo (10^3), mega (10^6).",
          experiments: "Metrli tasmadan foydalanib stol bo'yini o'lchash va natijani millimetr, metr va santimetrlarda ifodalash."
        }
      },
      { id: '6', title: 'lesson_6' },
      { id: '7', title: 'lesson_7' },
      { id: '8', title: 'lesson_8' },
      { id: '9', title: 'lesson_9' }
    ]
  },
  {
    id: 'bob-3',
    title: "3-BОB. Modda tuzilishi haqida ma'lumotlar",
    lessons: [
      { id: '10', title: 'lesson_10' },
      { id: '11', title: 'lesson_11' },
      { id: '12', title: 'lesson_12' },
      { id: '13', title: 'lesson_13' },
      { id: '14', title: 'lesson_14' }
    ]
  },
  {
    id: 'bob-4',
    title: "4-BОB. Mexanik hodisalar",
    lessons: [
      { id: '15', title: "lesson_15" },
      { id: '16', title: "lesson_16" },
      { id: '17', title: "lesson_17" },
      { id: '18', title: "lesson_18" },
      { id: '19', title: "lesson_19" },
      { id: '20', title: "lesson_20" }
    ]
  },
  {
    id: 'bob-5',
    title: "5-BОB. Jismlarning muvozanati",
    lessons: [
      { id: '21', title: "lesson_21" },
      { id: '22', title: "lesson_22" },
      { id: '23', title: "lesson_23" },
      { id: '24', title: "lesson_24" }
    ]
  },
  {
    id: 'bob-6',
    title: "6-BОB. Suyuqlik va gazlar bosimi",
    lessons: [
      { id: '25', title: "lesson_25" },
      { id: '26', title: "lesson_26" },
      { id: '27', title: "lesson_27" },
      { id: '28', title: "lesson_28" }
    ]
  },
  {
    id: 'bob-7',
    title: "7-BОB. Issiqlik hodisalari",
    lessons: [
      { id: '29', title: "lesson_29" },
      { id: '30', title: "lesson_30" },
      { id: '31', title: "lesson_31" },
      { id: '32', title: "lesson_32" }
    ]
  }
];
