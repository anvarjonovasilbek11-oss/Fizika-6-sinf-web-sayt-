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
      { id: '6', title: "O'lchash asboblari va o'lchash aniqligi",
        content: {
          theory: `Fizika tajribaviy fan bo'lgani sababli, unda o'lchashlar markaziy o'rinni egallaydi. Har bir fizik qonuniyat o'lchashlar natijasida olingan ma'lumotlarga tayanadi. O'lchash jarayoni — bu tekshirilayotgan fizik kattalikni maxsus tanlab olingan o'lchov birligi (etolon) bilan taqqoslashdir. Masalan, stol bo'yini o'lchash uchun biz uni 'metr' deb ataluvchi etolon bilan taqqoslaymiz.

Kundalik hayotimizda biz ko'plab o'lchash asboblaridan foydalanamiz. Oddiy chizg'ich, metrli tasma, termometr, sekundomer, tarozi — bularning barchasi fizik kattaliklarni miqdoriy aniqlashga yordam beradi. Murakkabroq asboblarga mikrometer (juda kichik qalinliklarni o'lchash uchun) va shtangensirkul (detallarning tashqi va ichki diametrlari hamda chuqurligini o'lchash uchun) kiradi. 

Har qanday o'lchash asbobi shkalaga ega. Shkala — bu asbob yuzasiga tushirilgan chiziqlar va raqamlar tizimi bo'lib, ular ma'lum bir tartibda joylashgan. Shkalani to'g'ri o'qish uchun eng avvalo 'shkala bo'lagining qiymati'ni (SBQ) aniqlash kerak. Uni aniqlash uchun shkaladagi istalgan ikkita qo'shni raqamlangan chiziqni tanlab, kattasidan kichigini ayirish va hosil bo'lgan sonni ular orasidagi kichik bo'limlar soniga bo'lish lozim. Masalan, chizg'ichda 1 sm va 2 sm orasida 10 ta bo'lim bo'lsa, SBQ = (2-1)/10 = 0.1 sm = 1 mm bo'ladi.

Hech qachon o'lchashni mutloq aniq bajarib bo'lmaydi. Har doim o'lchash natijasi haqiqiy qiymatdan bir oz farq qiladi. Bu farq 'o'lchash xatoligi' deb ataladi. Xatoliklar turli sabablarga ko'ra yuzaga kelishi mumkin. Birinchidan, asbobning o'zi mukammal emas. Masalan, arzon chizg'ichning chiziqlari bir oz noto'g'ri tushirilgan bo'lishi mumkin. Ikkinchidan, o'lchash sharoiti xatolikka ta'sir qiladi (masalan, issiqda metall tasma kengayib, noto'g'ri natija ko'rsatishi mumkin). Uchinchidan esa, inson omili — biz ko'zimiz bilan shkalaga qarayotganda ma'lum bir burchak ostida qarasak, 'parallaks xatosi' kelib chiqadi.

O'lchash aniqligini oshirish uchun fizikada 'takroriy o'lchashlar' usuli qo'llaniladi. Bir xil sharoitda o'lchashni bir necha marta takrorlab, olingan natijalarning o'rtacha arifmetik qiymatini hisoblash lozim. Bu usul tasodifiy xatoliklarni sezilarli darajada kamaytiradi. Shuni unutmangki, har qanday asbobning o'lchash xatoligi o'sha asbob shkala bo'lagi qiymatining yarmiga (eng kamida) teng deb olinadi. Agar SBQ = 1 mm bo'lsa, asbob xatoli ±0.5 mm ni tashkil etadi. Bu degani, siz olgan natija haqiqiy qiymatdan 0.5 mm gacha ko'p yoki kam bo'lishi mumkin.

Zamonaviy muhandislikda va ilmiy tadqiqotlarda o'ta yuqori aniqlik talab qilinadi. Masalan, koinot kemalarining qismlari millimetrning mingdan bir ulushigacha aniqlikda tayyorlanadi. Agar o'lchashda kichikroq xato bo'lsa ham, kema o'z trayektoriyasidan chiqib ketishi mumkin. Shuning uchun fizik o'lchash asboblarini muntazam ravishda 'tekshiruvdan o'tkazish' (kallibrovka) kerak. Bu asbob ko'rsatkichini davlat standarti etoloni bilan solishtirish demakdir. Tajribali fizik nafaqat o'lchashni bilishi, balki o'z natijasining qanchalik ishonchli ekanligini, ya'ni xatolik darajasini ham hisoblay olishi shart.`,
          formulas: "SBQ = (A - B) / n. O'rtacha qiymat: x_o'rt = (x1 + x2 + ... + xn) / n. Mutloq xato: Δx = |x_o'rt - xi|.",
          experiments: "O'quvchi tomonidan bir necha turdagi chizg'ichlarda bitta qalam uzunligini o'lchash va xatoliklarni solishtirish."
        }
      },
      { id: '7', title: "Uzunlik va yuza yuzini o'lchash",
        content: {
          theory: `Uzunlik — bu koinotdagi jismlarning o'lchamlarini ifodalovchi eng fundamental fizik kattaliklardan biridir. Fizikada uzunlikni o'lchash deganda, biz asosan masofa, balandlik, chuqurlik, qalinlik kabi tushunchalarni nazarda tutamiz. SI tizimida uzunlik birligi qilib 'metr' qabul qilingan. Metrning zamonaviy ta'rifi yorug'likning vakuumda soniyaning 299 792 458 dan bir ulushi ichida bosib o'tgan masofasiga tengdir.

Lekin amaliyotda bizga metr doimo qulay kelavermaydi. Juda kichik jismlarni, masalan, hujayralar yoki atomlarni o'lchash uchun biz mikrometr (10^-6 m) yoki nanometrlardan (10^-9 m) foydalanamiz. Aksincha, shaharlar orasidagi masofani o'lchash uchun kilometr (10^3 m) qulayroqdir. Astronomiyada esa 'yorug'lik yili' kabi ulkan birliklar ishlatiladi. Uzunlikni o'lchash uchun eng keng tarqalgan asboblar: metrli tasmalar, chizg'ichlar, mikrometrlar va lazerli masofa o'lchagichlardir.

Yuza yuzi — bu jismning sirti qancha joyni egallashini ko'rsatuvchi kattalikdir. Sirtning yuzasini o'lchash ko'pincha uzunlik o'lchovlariga tayanadi. Masalan, to'g'ri to'rtburchak shaklidagi maydonning yuzini topish uchun uning bo'yi va enini ko'paytirish kifoya. SI tizimida yuzaning birligi kvadrat metr (m^2) hisoblanadi. Kundalik hayotda biz santimetr kvadrat (sm^2) yoki kilometr kvadratdan (km^2) foydalanamiz. Qishloq xo'jaligida esa 'gektar' (100 m x 100 m = 10 000 m^2) birligi keng o'rin tutadi.

Agar jismning shakli murakkab yoki noto'g'ri bo'lsa (masalan, daraxt bargining yuzini o'lchash kerak bo'lsa), unda 'milli-metrli qog'oz' (paletka) usulidan foydalaniladi. Jismni paletka ustiga qo'yib, uning chegarasini chizib olamiz. Keyin o'sha chegarada qolgan to'liq kataklar va yarim kataklar sanaladi. Har bir katakning yuzasini bilgan holda, umumiy yuza yuzi taqribiy hisoblanadi. Bu usul biologiya va geografiyada juda mashhur.

Suyuqliklarning hajmini yoki sirt erkin yuzasini o'lchashda ko'pincha menzurkalardan foydalaniladi. Sirt yuzasini hisoblash jismning xususiyatlarini tushunishda juda muhim. Masalan, jismning yuzasi qanchalik katta bo'lsa, u atrofga shunchalik ko'p issiqlik chiqaradi yoki havo qarshiligiga shunchalik ko'p uchraydi. Shuning uchun uchoqlar va moshinalar 'aerodinamik' shaklda, ya'ni havo qarshiligiga uchraydigan yuzasi kamroq qilib loyihalashtiriladi.

Uzunlik va yuzani o'lchash nafaqat fizikada, balki qurilish, me'morchilik, kiyim tikish va yer ajratish kabi ko'plab kasblarda asosiy ko'nikma hisoblanadi. Har bir o'quvchi bu o'lchovlarni aniq bajarishni o'rganishi darslikning muhim qismidir. Xatoliklarni kamaytirish uchun asbobni jismga parallel ushlash va o'lchashni bir necha nuqtadan amalga oshirish tavsiya etiladi. Fizikada aniqlik — bu ishonchli bilim garovidir.`,
          formulas: "To'g'ri to'rtburchak yuzi: S = a * b. Aylana yuzi: S = π * r^2. Kvadrat yuzi: S = a^2. SI birligi: [S] = m^2.",
          experiments: "Paletka (millimetrli qog'oz) yordamida har xil geometrik va nostandart shakllar yuzasini tajribada aniqlash."
        }
      },
      { id: '8', title: "Vaqtni o'lchash va sekundomerlar",
        content: {
          theory: `Vaqt — bu voqealar ketma-ketligini va ularning davomiyligini belgilovchi fizik miqdordir. Fizikada vaqtning ahamiyati beqiyos: harakat tezligi, quvvat yoki energiya sarfi — bularning barchasi vaqtga bog'liq. 'Vaqt nima?' degan savol qadimdan donishmandlarni o'ylantirib kelgan. Bugungi kunda biz vaqt oqimini aniq asboblar yordamida kuzatamiz va o'lchaymiz. SI tizimida vaqt birligi — sekund (s).

Tarixan odamlar vaqtni o'lchash uchun tabiatdagi davriy jarayonlardan foydalanishgan. Quyoshning chiqishi va botishi, oyning o'zgarishi, daryolarning toshishi bizga 'kun', 'oy' va 'yil' tushunchalarini berdi. Keyinchalik quyosh soatlari, suv soatlari va qum soatlari ixtiro qilindi. Ular vaqt intervalini o'lchash imkonini berdi, lekin ularning aniqligi juda past edi. Mexanik soatlar paydo bo'lishi bilan (mayatniklar yordamida) insoniyat vaqtni daqiqalargacha aniq bilishga muvaffaq bo'ldi.

Bugungi kunda eng keng tarqalgan vaqt o'lchash asbobi bu — sekundomerdir. Sekundomerlar ikki xil bo'ladi: mexanik va elektron. Mexanik sekundomerlar prujina mexanizmiga asoslangan bo'lib, ular soniyaning 1/10 ulushigacha o'lchash imkonini beradi. Elektron (raqamli) sekundomerlar esa kvars kristallarining tebranishiga tayanadi va soniyaning 1/100, hatto 1/1000 ulushini ham ko'rsata oladi. Sport musobaqalari va fizik tajribalarda aynan raqamli sekundomerlardan foydalanish afzallik beradi.

Vaqtni o'lchashda xatoliklar ham yuzaga keladi. Eng katta xatolik odatda 'insonga reaktsiya vaqti' bilan bog'liq. Tajribada sekundomerni ishga tushirish va to'xtatish orasida inson miyasi bir necha millisekund sarflaydi. Shuning uchun juda tez jarayonlarni o'lchashda inson o'rniga datchiklar va avtomatlashtirilgan tizimlar qo'llaniladi. Masalan, poygada elektron ko'z (fotofinish) kim birinchi kelganini aniq belgilaydi.

Hozirgi ilm-fan vaqtni o'ta yuqori aniqlikda o'lchashga muhtoj. Buning uchun atom soatlari yaratilgan. Ular shunchalik aniqki, 100 million yil ichida atigi bir soniyaga adashishi mumkin. Bunday aniqlik nima uchun kerak? Masalan, GPS yoki Google Maps xaritalari aniq ishlashi uchun sun'iy yo'ldoshlardagi soatlar Yer ustidagi soatlar bilan soniyaning milliarddan bir ulushigacha mos kelishi shart. Aks holda, navigator sizni bir necha kilometrga noto'g'ri joyga boshlab borishi mumkin edi.

Vaqt faqat raqamlar emas, u fizika qonunlarining 'sahna'sidir. Biz har bir jarayonni o'rganayotganda uning boshlanish va tugash vaqtini qayd etamiz. Tajribalarda xatolikni kamaytirish siri — bitta jarayonni emas, balki ko'p marta takrorlanadigan jarayonni (masalan, mayatnikning 10 ta tebranishini) o'lchab, keyin umumiy vaqtni tebranishlar soniga bo'lishdir. Bu usul o'lchash aniqligini o'n barobar oshiradi va fizik natijalarni ishonchli qiladi.`,
          formulas: "Vaqt birliklari: 1 min = 60 s, 1 soat = 3600 s. O'rtacha vaqt: t = (t1 + t2) / 2.",
          experiments: "Mayatnikning 10 ta tebranish vaqtini o'lchash va bitta tebranish vaqtini aniqlash. Qo'l sekundomerining xatoligini tekshirish."
        }
      },
      { id: '9', title: "O'lchash natijalarini rasmiylashtirish",
        content: {
          theory: `O'lchashlarni bajarish — bu ishning faqat yarmi. Fizik olimning yoki muhandisning ikkinchi muhim vazifasi — olingan ma'lumotlarni to'g'ri rasmiylashtirish va tahlil qilishdir. Agar natijalar tartibsiz yozilsa, ulardan hech qanday xulosa chiqarib bo'lmaydi. O'lchash natijalarini ifodalashning uchta asosiy usuli mavjud: jadvallar, grafiklar va hisobotlar.

Jadval usuli — bu ma'lumotlarni tartibga solishning eng qulay yo'li. Jadvalda har bir ustun ma'lum bir fizik kattalikka tegishli bo'ladi va ustun sarlavhasida o'sha kattalikning nomi hamda o'lchov birligi (qavs ichida) ko'rsatiladi. Masalan, 'Vaqt (s)' yoki 'Uzunlik (sm)'. Jadvallar bizga turli o'lchashlar orasidagi bog'liqlikni darhol ko'rish imkonini beradi. Har bir laboratoriya ishi albatta jadval tuzish bilan boshlanishi kerak.

Grafik usuli — bu natijalarni vizual, ya'ni ko'rgazmali tarzda tasvirlashdir. Grafiklar ikki kattalik orasidagi qaramlikni (masalan, yo'lning vaqtga bog'liqligi) egri yoki to'g'ri chiziqlar orqali ko'rsatadi. Grafik chizishda gorizontal o'qqa (absissa) odatda mustaqil o'zgaruvchi (vaqt), vertikal o'qqa (ordinata) esa o'zgaruvchi kattalik qo'yiladi. Yaxshi chizilgan grafik fizik qonuniyatning butun 'surati'ni ochib beradi va natijalarni bashorat qilishga yordam beradi.

O'lchash natijasini yozayotganda 'ishonchli raqamlar' (significant figures) qoidasiga rioya qilish shart. Masalan, agar sizning chizg'ichingizning SBQ 1 mm bo'lsa, siz '12.345 mm' deb yoza olmaysiz, chunki asbobingiz bunday aniqlikni bermaydi. Natija har doim o'lchash xatoligi bilan birga ko'rsatiladi: L = (12.3 ± 0.5) mm. Bu yozuv o'quvchiga haqiqiy qiymat 11.8 va 12.8 mm oralig'ida ekanligini anglatadi. Bu 'fizik madaniyat'ning asosiy belgisidir.

Hisobot tayyorlashda tajribaning maqsadi, ishlatilgan asboblar ro'yxati, tajriba o'tkazish tartibi, hisob-kitoblar va yakuniy xulosa alohida ko'rsatiladi. Xulosada nafaqat olingan son ko'rsatiladi, balki u nazariya bilan qanchalik mos kelishi haqida fikr bildiriladi. Masalan, 'Tajriba natijasida olingan zichlik jadvaldagidan 2% ga farq qildi, bunga sabab asbob xatoligi bo'lishi mumkin' kabi tahliliy yondashuv juda qadrlanadi.

Xulosa qilib aytganda, fizika — bu o'lchash va tartib fanidir. Natijalarni to'g'ri rasmiylashtirish sizga o'z ishingizdagi kamchiliklarni ko'rish va yangi kashfiyotlar qilish imkonini beradi. Har bir buyuk kashfiyot oddiygina jadval dabdabasidan yoki grafikdagi birgina nuqtadan boshlangan bo'lishi mumkin. Siz ham o'z o'lchashlaringizga mas'uliyat bilan yondashing, chunki aniqlik — bu ilmning poydevoridir.`,
          formulas: "Laboratoriya hisoboti strukturasi. Natijani yozish: A = (A_o'rt ± ΔA). Xatolik foizi: ε = (ΔA / A_o'rt) * 100%.",
          experiments: "Bajarilgan barcha oldingi tajribalar natijalarini standart laboratoriya jadvaliga kiritish va tahliliy xulosa yozish."
        }
      },
    ]
  },
  {
    id: 'bob-3',
    title: "3-BОB. Modda tuzilishi haqida ma'lumotlar",
    lessons: [
      { id: '10', title: "Moddalar va molekulalar",
        content: {
          theory: `Bizni o'rab turgan barcha narsalar: yer, suv, havo, yulduzlar va hatto bizning tanamiz ham moddalardan tashkil topgan. Modda nima? Modda — bu massaga ega bo'lgan va ma'lum bir hajmni egallagan har qanday real narsadir. Qadimda olimlar 'Dunyo nimalardan iborat?' degan savolga javob izlab, moddaning bo'linish chegarasi bor-yo'qligini o'ylashgan. Yunon faylasufi Demokrit bundan 2500 yil oldin modda juda kichik, bo'linmas zarrachalardan — 'atomlar'dan iborat degan daho g'oyani ilgari surgan.

Bugungi kunda biz bilamizki, har qanday moddaning eng kichik tarkibiy qismi molekuladir. Molekula — bu moddaning barcha kimyoviy xossalarini o'zida saqlab qoluvchi eng mitti zarrachadir. Molekulalar esa o'z navbatida atomlardan tashkil topadi. Masalan, suv molekulasi (H2O) ikkita vodorod atomi va bitta kislorod atomining birlashishidan hosil bo'ladi. Molekulalar shunchalik kichikki, ularni oddiy ko'z bilan yoki hatto an'anaviy mikroskopda ham ko'rib bo'lmaydi. Tasavvur qiling: bir tomchi suvda milliardlab-trillionlab molekulalar mavjud.

Molekulalarning o'lchamlarini tushunish uchun bunday misolni keltirish mumkin: agar olma hajmini butun Yer shari o'lchamigacha kattalashtirsak, u holda olmaning molekulasi oddiy olma o'lchamiga teng bo'lib qoladi. Mana shunday mitti dunyoda hamma narsa doimiy harakatda. Molekulalar hech qachon tinch turmaydi; ular tartibsiz, xaotik harakat qiladi. Bu harakatni biz issiqlik sifatida his qilamiz: jism qanchalik issiq bo'lsa, uning molekulalari shunchalik tez harakat qiladi.

Molekulalarning mavjudligini va harakatini isbotlovchi ko'plab tajribalar mavjud. Shulardan biri 1827-yilda britaniyalik botanik Robert Broun tomonidan kashf etilgan 'Broun harakati'dir. U suvda suzib yurgan gul changchilarining (chang donachalarining) tinimsiz va tartibsiz tebranishini kuzatgan. Keyinchalik ma'lum bo'ldiki, bu chang donachalarini suv molekulalari har tomondan zarb bilan urib, ularni harakatga keltirar ekan. Bu kashfiyot molekulalarning real mavjudligiga eng kuchli dalillardan biri bo'ldi.

Moddaning tuzilishini o'rganadigan darslik bobida biz molekulyar-kinetik nazariya (MKN) asoslari bilan tanishamiz. Bu nazariyaning uchta ustuni bor: 1) Barcha moddalar zarrachalardan (molekulalardan) iborat; 2) Bu zarrachalar to'xtovsiz va tartibsiz harakat qiladi; 3) Zarrachalar bir-biri bilan o'zaro ta'sirda bo'ladi (tortishadi va itarishadi). Ushbu oddiy qoidalar qattiq jismlarning nima uchun qattiqligini, gazlarning esa nima uchun tez tarqalishini tushuntirib beradi.

Modda tuzilishini bilish insoniyatga yangi materiallar yaratish imkonini berdi. Masalan, olimlar molekulalar tartibini o'zgartirib, po'latdan kuchliroq bo'lgan plastiklar yoki elektrni o'ta tez o'tkazuvchi nanomateriallar ixtiro qilmoqdalar. Fizika orqali biz mikrodunyoni o'rganib, makrodunyoni o'zgartiramiz. Har bir narsaning tubida yotgan bu mitti molekulalar olami bizga koinotning eng katta sirlarini ochishga yordam beradi. Tajribalar o'tkazing, kuzating va tabiatning mitti g'ishtchalari haqida ko'proq bilim oling.`,
          formulas: "Molekula o'lchami: d = V / S (moy qatlami usuli). Avogadro soni haqida tushuncha (NA).",
          experiments: "Suv betiga bir tomchi moy (yoki neft) tomizib, uning yoyilish yuzasi orqali molekula qalinligini taqribiy hisoblash."
        }
      },
      { id: '11', title: "Diffuziya hodisasi",
        content: {
          theory: `Tasavvur qiling, xonaning bir burchagida atir sepildi. Bir necha soniyadan so'ng uning hidi butun xonaga tarqaladi. Yoki bir stakan toza suvga bir tomchi siyoh tomizsangiz, u asta-sekin butun suvni rangli qiladi. Nega bunday bo'ladi? Bu jarayon fizikada 'diffuziya' deb ataladi. Diffuziya — bu bir modda molekulalarining ikkinchi modda molekulalari orasiga o'z-o'zidan kirib borishi va moddalarning bir-biri bilan aralashib ketishi jarayonidir.

Diffuziya hodisasi modda molekulalarining tinimsiz va tartibsiz harakat qilishining bevosita isbotidir. Zarrachalar harakatlanayotib, bir-biriga uriladi va bo'sh joylarga qarab tarqaladi. Bu jarayon moddaning barcha holatlarida kuzatiladi, lekin uning tezligi turlicha. Gazlarda diffuziya eng tez sodir bo'ladi, chunki gaz molekulalari orasidagi masofa katta va ular erkin uchib yuradi. Havoda gazlar bir necha soniyada aralashib ketadi.

Suyuqliklarda diffuziya sekinroq kechadi. Buning sababi, suyuqlik molekulalari bir-biriga yaqin joylashgan va ular gazlardagidek erkin emas. Shunga qaramay, bir necha daqiqa yoki soat ichida suyuqliklar to'liq aralashishi mumkin. Eng qizig'i, diffuziya qattiq jismlarda ham sodir bo'ladi, lekin u o'ta sekin kechadi. Masalan, agar silliqlangan oltin va qo'rg'oshin bo'laklarini bir-biriga mahkam qisib qo'ysangiz, besh yil o'tgach, ular bir necha millimetrga bir-birining ichiga kirib ketganini ko'rish mumkin.

Diffuziya tezligi haroratga bevosita bog'liq. Jism qanchalik ko'p qizdirilsa, diffuziya shunchalik tezlashadi. Buning fizik sababi shuki, harorat ortishi bilan molekulalarning harakat tezligi (kinetik energiyasi) ortadi. Shuning uchun issiq choyda shakar sovuq choyga qaraganda tezroq eriydi. Tabiatda va kundalik hayotda diffuziyaning o'rni juda katta. Masalan, biz nafas olganimizda kislorod o'pkamizdan qonga aynan diffuziya orqali o'tadi. O'simliklar esa tuproqdagi ozuqa moddalarini ildizlari orqali diffuziya yordamida so'rib oladi.

Lekin diffuziyaning salbiy tomonlari ham bor. Zavod va fabrikalardan chiqayotgan zaharli gazlar yoki daryolarga oqizilayotgan chiqindilar diffuziya tufayli tez tarqaladi va atrof-muhitni ifloslantiradi. Shuning uchun ekologlar bu jarayonni diqqat bilan o'rganadilar. Diffuziyani boshqarish orqali texnikada turli jarayonlar amalga oshiriladi, masalan, metallarni sementlash (yuzasini boshqa moddalar bilan to'yintirib mustahkamlash) yoki yarimo'tkazgichli chiplar tayyorlash.

Xulosa qilib aytganda, diffuziya — bu tabiatdagi tartib va tartibsizlikning ajoyib namoyon bo'lishidir. Molekulalarning ko'zga ko'rinmas 'raqs'i natijasida dunyodagi moddalar doimiy almashinuvda bo'ladi. Ushbu darsda siz diffuziyaning nafaqat ta'rifini, balki uning hayotimizdagi fundamental rolini ham tushunib olasiz. Tajriba o'tkazib ko'ring: bir stakan issiq va bir stakan sovuq suvga bo'yoq tomizib, farqni o'z ko'zingiz bilan ko'ring!`,
          formulas: "Diffuziya tezligining haroratga bog'liqligi: T ↑ => v(molecula) ↑ => Diffuziya ↑.",
          experiments: "Stakandagi suvga rangli modda (margansovka yoki bo'yoq) tomizib, uning tarqalishini turli haroratlarda kuzatish."
        }
      },
      { id: '12', title: "Molekulalararo o'zaro ta'sir kuchlari",
        content: {
          theory: `Biz bilamizki, moddalar molekulalardan tashkil topgan va bu molekulalar doatimo harakatda. Agar ular shunchaki tartibsiz uchib yurgan bo'lsalar, nega jismlar (masalan, temir bo'lagi yoki tosh) tarqalib ketmaydi? Ularni nima 'yopishtirib' turadi? Javob shuki, molekulalar orasida o'zaro ta'sir kuchlari mavjud. Bu kuchlar ikki xil ko'rinishda namoyon bo'ladi: tortishish va itarishish kuchlari.

Molekulalar orasidagi tortishish kuchi faqat ular bir-biriga juda yaqin kelgandagina (molekula o'lchamidan 2-3 marta katta bo'lgan masofada) sezilarli bo'ladi. Masalan, ikkita silliq shisha bo'lagini bir-biriga yaqinlashtirib qisilsa, ular bir-biriga 'yopishib' qoladi. Buning sababi — ularning sirtidagi molekulalar bir-biriga yetarlicha yaqinlashib, tortishish kuchi ishga tushganidir. Kundalik hayotda biz buni yelimlash yoki payvandlash jarayonlarida ko'ramiz. Sirtlar qanchalik toza va silliq bo'lsa, tortishish shunchalik kuchli bo'ladi.

Shu bilan birga, molekulalar orasida itarishish kuchi ham mavjud. Agar biz jismni qisishga harakat qilsak (masalan, rezina koptok yoki po'lat prujinani), u qarshilik ko'rsatadi. Bu zarrachalar orasidagi masofa juda qisqarganda (molekula o'lchamidan ham kam bo'lib qolganda) itarishish kuchi keskin ortishini ko'rsatadi. Mana shu ikki kuch — tortishish va itarishish — orasidagi muvozanat moddaning barqarorligini ta'minlaydi. Molekulalar o'zaro shunday masofada turishadiki, unda tortishish va itarishish kuchlari bir-birini kompensatsiya qiladi.

Bu kuchlarning tabiatini tushunish uchun 'namlanish' hodisasini ko'rib chiqaylik. Agar suv tomchisi toza shishaga tushsa, u yoyilib ketadi — buni 'namlanish' deyiladi. Buning sababi suv molekulalarining shisha molekulalari bilan tortishishi suv molekulalarining o'zaro tortishishidan kuchliroqdir. Agar suv parafin (sham) ustiga tushsa, u yoyilmay, sharchaga aylanadi — bu 'namlanmaslik'dir. Chunki parafin bilan suv orasidagi tortishish sust bo'ladi. Bu xossalar texnikada, masalan, suv o'tkazmaydigan matolar yaratishda keng qo'llaniladi.

Kapillyarlik hodisasi ham bevosita molekulyar kuchlar bilan bog'liq. Juda ingichka naychalarda (kapillyarlarda) suyuqlikning ko'tarilishi yoki tushishi kuzatiladi. Bu namlanuvchi suyuqliklarning devorga tortilib, o'zi bilan qolgan qismni ham yuqoriga tortib ketishidir. Tabiatda bu orqali suv tuproqning pastki qatlamlaridan o'simlik poyalariga ko'tariladi. Bu — mitti molekulalar kuchining ulkan hayotiy jarayonlarga ta'siridir.

Molekulalararo kuchlarni o'rganish muhandislarga o'ta mustahkam qotishmalar yaratishga imkon beradi. Modda ichidagi bu ko'zga ko'rinmas 'zanjir'lar dunyoning butunligini saqlab turadi. Agar bir soniyaga bu kuchlar g'oyib bo'lsa, koinotdagi barcha narsalar, jumladan biz ham, changga aylanib tarqalib ketgan bo'lar edik. Fizika bizga mana shu nozik va qudratli aloqalarni tushunishni o'rgatadi.`,
          formulas: "Tortishish kuchi (F_t) va Itarishish kuchi (F_i). Muvozanat masofasi (r0). Namlanish sharti.",
          experiments: "Ikkita shishani namlab bir-biriga yopishtirish va ularni ajratishga urinish. Suvning turli sirtlarda (yuvilgan va yog'li shishada) o'zini tutishini kuzatish."
        }
      },
      { id: '13', title: "Moddaning agregat holatlari",
        content: {
          theory: `Tabiatda moddalar asosan uchta holatda uchraydi: qattiq, suyuq va gazsimon. Buni biz 'agregat holatlar' deb ataymiz. Eng yorqin misol bu — suv. U muz ko'rinishida (qattiq), suv ko'rinishida (suyuq) va bug' ko'rinishida (gaz) bo'lishi mumkin. Bir xil moddaning nega turlicha ko'rinishini tushunish uchun biz yana molekulalar dunyosiga nazar tashlashimiz kerak. Holatning o'zgarishi molekulalarning o'zi o'zgarishini anglatmaydi, balki ularning joylashishi va harakat usuli o'zgarishini anglatadi.

Qattiq jismlarda molekulalar bir-biriga juda yaqin joylashgan va ular orasidagi o'zaro ta'sir kuchlari juda kuchli. Zarrachalar o'z joylarida faqat tebranma harakat qiladilar, erkin ko'chib yura olmaydilar. Shuning uchun qattiq jismlar o'z shakli va hajmini saqlab qoladi. Ko'pchilik qattiq jismlar ichida molekulalar ma'lum bir tartibda saf tortgan bo'ladi, buni 'kristall panjara' deyiladi. Muz, tuz va metallar — kristall jismlardir. Ularni sindirish yoki shaklini o'zgartirish uchun katta kuch talab qilinadi.

Suyuqliklarda molekulalar orasidagi masofa ham kichik (deyarli zarracha o'lchamiga teng), lekin ular qattiq jismlardagidek mahkam 'bog'lanmagan'. Suyuqlik molekulalari o'z joyini osonlikcha o'zgartirishi mumkin — ular bir joydan ikkinchi joyga 'sakrab' o'tadilar. Shuning sababli suyuqliklar oquvchandir. Ular hajmini saqlaydi (chunki molekulalar yaqin), lekin o'z shakliga ega emas — qaysi idishga quyilsa, o'sha idish shaklini oladi. Suyuqliklarni qisish juda qiyin, chunki molekulalar orasi jich.

Gazlar esa butunlay boshqacha dunyo. Gaz molekulalari orasidagi masofa ularning o'lchamlaridan o'nlab, yuzlab marta katta. Zarrachalar butun idish bo'ylab erkin uchib yuradi va bir-biriga faqat urilgandagina ta'sir qiladi. Gazlar na o'z shakliga, na aniq hajmiga ega. Ular berilgan har qanday hajmni to'liq egallaydi. Gazlarni osonlik bilan qisish mumkin, chunki molekulalar orasida bo'sh joy ko'p. Biz nima uchun pufakchani osongina siqishimiz mumkinligining siri ham shunda.

Bugungi kunda moddaning to'rtinchi holati haqida ham ko'p gapiriladi — bu plazmadir. Plazma juda yuqori haroratda qizdirilgan gaz bo'lib, unda atomlar o'z elektronlarini yo'qotgan bo'ladi. Quyosh va boshqa yulduzlar plazmadan tashkil topgan. Plazma koinotdagi moddaning eng keng tarqalgan holatidir. Shuningdek, kundalik hayotda lyuminessent lampalarda yoki chaqmoq chaqnaganda biz plazmani ko'rishimiz mumkin.

Moddaning bir holatdan ikkinchi holatga o'tishi (fazaviy o'tishlar) doimo energiya almashinuvi bilan bog'liq. Muz erisa — issiqlik yutiladi, suv muzlasa — issiqlik ajraladi. Insoniyat bu bilimlardan metallurgiyada (metallarni eritishda), oziq-ovqat sanoatida (muzlatish) va texnikada (freon gazining bug'lanishi orqali muzlatkichlarda sovutish) foydalanadi. Agregat holatlar tushunchasi — bu materiyaning ko'p qirraliligini va tabiatning unversal qonuniyatlarini tushunishga yo'ldir.`,
          formulas: "Fazaviy o'tishlar: Erish, Qaynash, Kondensatsiya, Kristallanish. Energiya (Q) tushunchasi.",
          experiments: "Muzning erishi va suvning qaynash jarayonlarini termometr yordamida kuzatib, haroratning o'zgarmasligini (fazaviy o'tish vaqtida) aniqlash."
        }
      },
      { id: '14', title: "Qattiq, suyuq va gazsimon holatlar farqi",
        content: {
          theory: `Ushbu darsda biz oldingi darsda o'rgangan agregat holatlarni chuqur tahlil qilamiz va ularning asosiy farqlarini tizimlashtiramiz. Fizik nuqtai nazardan, bu holatlar orasidagi farq uchta asosiy omilga bog'liq: molekulalararo masofa, molekulalararo kuchlar va molekulalarning harakat tabiati. Mana shu uchlik moddaning biz ko'rib turgan barcha xossalarini belgilaydi.

Birinchi farq — shakl va hajm. Qattiq jismlar o'z shaklíni ham, hajmini ham qat'iy saqlaydi. Agar siz stoldagi kitobni boshqa xonaga olib o'tsangiz, uning shakli o'zgarmaydi. Suyuqliklar hajmini saqlaydi, lekin shakli o'zgaruvchan (oqadi). Gazlar esa na shaklni, na hajmni saqlaydi — ular doimo kengayishga harakat qiladi. Bu farqning sababi molekulalar orasidagi tortishish kuchining darajasidir. Qattiq jismlarda bu kuch juda katta, suyuqliklarda o'rtacha, gazlarda esa deyarli nolga yaqin (faqat urilish paytida namoyon bo'ladi).

Ikkinchi farq — qisilish xususiyati. Gazlarni bir necha o'n marta siqish mumkin (masalan, balonlardagi gaz). Suyuqliklar va qattiq jismlar deyarli qisilmaydi. Masalan, agar siz suv bilan to'ldirilgan shpritsni barmog'ingiz bilan yopib bossangiz, u 'qattiq devor' kabi qarshilik ko'rsatadi. Bu suyuqlik va qisilgan qattiq jismda molekulalar orasida bo'sh joy yo'qligini, zarrachalar deyarli bir-biriga tegib turishini ko'rsatadi. Bu xususiyat gidravlik press va tormoz tizimlarining asosi hisoblanadi.

Uchinchi farq — molekulyar struktura. Ko'pchilik qattiq jismlar (kristallar) uzoq masofali tartibga ega, ya'ni ulardagi molekulalar qat'iy geometrik qoidalar asosida joylashgan. Suyuqliklar faqat 'yaqin tartib'ga ega (zarrachalar to'dalashib turadi, lekin umumiy tartib yo'q). Gazlarda esa mutloq tartibsizlik (xaos) hukmron. Zarrachalar harakati ham turlicha: qattiq jismda — tebranish, suyuqlikda — tebranish va 'sakrash', gazda — erkin to'g'ri chiziqli uchish.

Issiqlikdan kengayish ham bu holatlarda turlicha namoyon bo'ladi. Gazlar qizdirilganda juda kuchli kengayadi, chunki molekulalar harakati kuchayib, ular bir-biridan uzoqlashishga intiladi. Suyuqliklar va qattiq jismlar ham kengayadi, lekin bu ko'zga unchalik yaqqol tashlanmaydi. Muhandislar buni temir yo'l relslarini yotqizishda (relslar orasida kichik tirqish qoldirishadi) yoki ko'priklar qurishda albatta hisobga olishadi. Aks holda, yozda issiqdan kengaygan material konstruktsiyani buzib yuborishi mumkin edi.

Agregat holatlarni o'rganish bizga tabiatni boshqarish imkonini beradi. Biz gazni suyuqlikka aylantirib (suyultirilgan gaz), uni tashishni osonlashtiramiz. Biz metallarni eritib, ularga istalgan shaklni beramiz. Ushbu bobda olingan bilimlar sizga koinotdagi barcha fizik jarayonlarning 'mikroskopik' sabablarini tushunishga yordam beradi. Esda tuting: dunyoning har xilligi — bu mitti molekulalarning oddiygina turli 'tartib'dagi raqsi natijasidir.`,
          formulas: "Qiyosiy jadval: [Belgi] | [Qattiq] | [Suyuq] | [Gaz]. Zichlik (ρ = m/V) tushunchasi va holatga bog'liqligi.",
          experiments: "Shprits yordamida havo va suvni siqish tajribasi. Shishani isitish orqali uning hajmi kengayishini (bilvosita havo pufakchalari orqali) kuzatish."
        }
      }
    ]
  },
  {
    id: 'bob-4',
    title: "4-BОB. Mexanik hodisalar",
    lessons: [
      { id: '15', title: "Mexanik harakat va uning turlari",
        content: {
          theory: `Bizni o'rab turgan olamda hamma narsa harakatda. Yer o'z o'qi va Quyosh atrofida aylanadi, daryolar oqadi, mashinalar yo'lda yuradi, hatto biz nafas olganda ham ko'krak qafasimiz harakat qiladi. Mexanik harakat — bu jismning fazodagi vaziyatining boshqa jismlarga nisbatan vaqt o'tishi bilan o'zgarishidir. Bu yerda 'boshqa jismlarga nisbatan' degan so'z juda muhim, chunki harakat doimo nisbiydir.

Tasavvur qiling, siz poyezdda o'tiribsiz. Sizning yoningizdagi yo'lovchiga nisbatan siz tinch holatdasiz, lekin perronda turgan odamga nisbatan siz katta tezlikda harakat qilyapsiz. Shuning uchun harakatni o'rganishdan oldin 'sanoq jism'ni tanlab olish kerak. Sanoq jism, unga bog'langan koordinatalar tizimi va vaqtni o'lchaydigan soat birgalikda 'sanoq tizimi'ni tashkil etadi. Sanoq tizimisiz jismning qayerda ekanligini va qayerga borishini aytib bo'lmaydi.

Jismning harakatini o'rganishni osonlashtirish uchun fizikada 'moddiy nuqta' tushunchasi kiritilgan. Agar ko'rilayotgan sharoitda jismning o'lchamlari u bosib o'tgan masofaga nisbatan juda kichik bo'lsa, bunday jismni moddiy nuqta deb hisoblash mumkin. Masalan, Toshkentdan Samarqandga borayotgan avtobusni moddiy nuqta deb olsa bo'ladi, lekin u garajga kirayotganda uning o'lchamlari muhim ahamiyatga ega va uni nuqta deb bo'lmaydi.

Jism harakatlanayotganda qoldirgan ko'zga ko'rinmas (yoki ko'rinadigan) chizig'i 'trayektoriya' deb ataladi. Shakliga ko'ra harakatlar to'g'ri chiziqli va egri chiziqli bo'ladi. Trayektoriyaning uzunligi esa 'bosib o'tilgan yo'l' (s) deb ataladi. Yo'l — bu skalyar kattalik, u faqat son qiymatga ega. Jismning boshlang'ich vaziyatini oxirgi vaziyati bilan birlashtiruvchi yo'naltirilgan kesma esa 'ko'chish' (s vector) deb ataladi. Ko'chish — bu vektor kattalikdir.

Harakatlar tezlikning o'zgarishiga qarab tekis va notekis harakatga bo'linadi. Agar jism ixtiyoriy teng vaqt oraliqlarida teng masofalarni bosib o'tsa, bunday harakat tekis harakat deyiladi. Tabiatda mutloq tekis harakat kam uchraydi, lekin Yerning o'z o'qi atrofida aylanishi yoki soat millarining harakati bunga misol bo'lishi mumkin. Aksariyat harakatlar notekis (tezlanuvchan yoki sekinlanuvchan) bo'ladi.

Mexanika bu — harakat haqidagi fandir. Insoniyat mexanika qonunlarini o'rganish orqali mitti soatlardan tortib, ulkan fazoviy stansiyalargacha yaratishga muvaffaq bo'ldi. To'g'ri chiziqli harakat mexanikaning eng sodda, poydevor qismidir. Ushbu darsda siz harakatning alifbosini o'rganasiz, bu esa kelajakda murakkab fizik jarayonlarni tushunishga kalit bo'ladi. Dunyo — bu harakat, harakat esa hayotdir!`,
          formulas: "Yo'l (s) va Ko'chish. Trayektoriya turlari. Sanoq tizimi tarkibi. Moddiy nuqta sharti.",
          experiments: "Turli jismlar (koptok, moshina, qalam) trayektoriyasini qumda yoki qog'ozda chizib o'rganish. Yo'l va ko'chishni xarita misolida solishtirish."
        }
      },
      { id: '16', title: "Tezlik va uning birliklari",
        content: {
          theory: `Jismning qanchalik tez yoki sekin harakat qilayotganini ifodalash uchun 'tezlik' kattaligidan foydalaniladi. Tezlik — bu vaqt birligi ichida bosib o'tilgan yo'lni ko'rsatuvchi fizik kattalikdir. Masalan, agar avtomobil bir soatda 60 km yo'l bossa, uning tezligi soatiga 60 kilometr (60 km/h) deyiladi. Fizikada tezlik nafaqat qanchalik tez harakat qilishni, balki qaysi tomonga harakat qilishni ham ko'rsatadi, shuning uchun u vektor kattalikdir.

SI xalqaro birliklar tizimida tezlikning birligi qilib 'metr-sekund' (m/s) qabul qilingan. Bu bir sekundda bir metr masofaga ko'chishni anglatadi. Kundalik hayotda biz ko'pincha km/h birligidan foydalanamiz. Ularni bir-biriga aylantirishni bilish juda muhim: 36 km/h ni m/s ga o'tkazish uchun 36 ni 1000 ga ko'paytirib (metrga o'tkazish) va 3600 ga bo'lish (soniyaga o'tkazish) kerak, natijada 10 m/s hosil bo'ladi.

Notekis harakatda tezlik doimiy bo'lmaydi. Masalan, avtobus bekatdan qo'zg'alganda tezligi noldan ko'tariladi, svetoforda esa kamayadi. Bunday hollarda 'o'rtacha tezlik' tushunchasidan foydalaniladi. O'rtacha tezlik — bu jism bosib o'tgan jami yo'lning shu yo'lni bosib o'tish uchun sarflangan jami vaqtga nisbatidir. O'rtacha tezlik bizga jarayonning umumiy ko'rinishini beradi, lekin har bir lahzadagi tezlikni ko'rsatmaydi.

Lahzali tezlik (aniq bir vaqtdagi tezlik) odatda avtomobillarning spidometri orqali aniqlanadi. Spidometr — bu tezlikni o'lchaydigan maxsus asbobdir. Zamonaviy avialaynerlar 900 km/h tezlikda uchadi, tovush tezligi esa havoda taxminan 340 m/s (1224 km/h) ni tashkil etadi. Agar samolyot bu tezlikdan o'tsa, u 'tovush to'sig'i'ni yorib o'tadi va kuchli portlashsimon shovqin hosil qiladi.

Tabiatdagi eng katta tezlik — yorug'lik tezligidir. U vakuumda soniyasiga 300 000 kilometrga teng. Hech qanday moddiy jism yorug'likdan tezroq harakatlana olmaydi — bu koinotning asosiy cheklovchi qonunidir. Yorug'lik Quyoshdan Yergacha atigi 8 daqiqada yetib keladi. Taqqoslash uchun, agar biz eng tezkor samolyotda Quyoshga uchganimizda, bu yo'lga 20 yildan ortiq vaqt sarflagan bo'lar edik.

Tezlikni bilish bizga kelajakni bashorat qilishga yordam beradi: biz qayerda ekanligimizni va tezligimizni bilsak, qachon manzilga yetib borishimizni aniq hisoblay olamiz. Bu esa logistika, transport va hatto kosmik sayohatlar uchun hayotiy zarurdir. Fizika orqali biz tezlik olamiga sho'ng'iymiz va harakat qonunlarini matematik tilda ifodalashni o'rganamiz. Xulosa qilib aytganda, tezlik — bu vaqt va fazoning birgalikdagi raqsidir.`,
          formulas: "Tezlik: v = s / t. O'rtacha tezlik: v_o'rt = s_jami / t_jami. Birliklar: 1 m/s = 3.6 km/h.",
          experiments: "O'quvchi o'zining piyoda yurish tezligini, yugurish tezligini va velosipeddagi tezligini sekundomer va metrli tasma yordamida o'lchab solishtirishi."
        }
      },
      { id: '17', title: "Inersiya hodisasi",
        content: {
          theory: `Nima uchun harakatlanayotgan avtobus keskin to'xtaganda, hamma yo'lovchilar oldinga qarab egilib ketadi? Yoki nega harakatsiz turgan avtobus keskin joyidan qo'zg'alsa, orqaga qarab ketamiz? Bu hodisalarning sababi bitta — 'inersiya'. Inersiya — bu jismlarning o'z tezligini saqlashga intilish xususiyatidir. Ya'ni, tinch turgan jism tinch turishga, harakatdagisi esa o'z harakatini davom ettirishga harakat qiladi.

Inersiya qonuni (yoki Nyutonning birinchi qonuni) fizikaning eng buyuk kashfiyotlaridan biridir. Qadimda Arastu (Aristotel) jism harakat qilishi uchun unga doimo kuch ta'sir qilishi kerak deb o'ylagan. Lekin XVII asrda buyuk olim Galileo Galiley tajribalar o'tkazib, Agar jismga boshqa bo'shqa jismlar ta'sir qilmasa (yoki ta'sirlar bir-birini muvozanatlashtirsa), u o'z tezligini o'zgartirmasligini isbotladi. Nyuton esa bu g'oyani mukammal qonun shakliga keltirdi.

Inersiya — bu jismlarning 'dangasaligi'dir. Jismning massasi qanchalik katta bo'lsa, u shunchalik inert bo'ladi, ya'ni uning tezligini o'zgartirish (to'xtatish yoki tezlatish) shunchalik qiyin bo'ladi. Masalan, og'ir yuk mashinasini to'xtatish yengil mashinaga qaraganda ancha qiyin, chunki yuk mashinasining inersiyasi katta. Shuning uchun ham yo'llarda tormoz yo'li degan tushuncha mavjud va haydovchilar masofa saqlashlari shart.

Inersiya hodisasi kundalik hayotda ham foydali, ham xavfli bo'lishi mumkin. Boltangiz dastasidan chiqib ketayotgan bo'lsa, siz dastasini yerga urasiz. Bunda dasta yerga urilib to'xtaydi, bolta esa inersiya hisobiga harakatini davom ettirib, dastaga mahkam o'rnashadi. Changni qoqishda ham tayoq bilan urilganda gilam tez harakatlanadi, chang zarrachalari esa inersiya tufayli o'z joyida qolishga intiladi va gilamdan ajralib chiqadi.

Lekin yo'l harakati xavfsizligida inersiya dushmanimizga aylanishi mumkin. Xavfsizlik kamarlari aynan inersiya oqibatlarini kamaytirish uchun o'ylab topilgan. Avtomobil biror narsaga urilib to'xtaganda, ichidagi odamlar inersiya bo'yicha oldinga uchib ketishadi. Xavfsizlik kamari esa odamni ushlab qolib, jarohatlanishdan asraydi. Velosiped yoki skuterda uchayotganda ham inersiya kuchini doimo hisga olish kerak.

Inersiya — bu koinotning fundamental qonunidir. Sayyoralarning Quyosh atrofida milliardlab yillar davomida aylanib turishi ham inersiya bilan bog'liq (ularni to'xtatadigan 'ishqalanish' kuchi yo'q). Inersiyani o'rganish orqali biz nafaqat dunyoni tushunamiz, balki o'z hayotimiz xavfsizligini ham ta'minlaymiz. Har bir harakat ortida yashirinib yotgan bu mitti kuch bizga koinotning barqarorligidan hikoya qiladi.`,
          formulas: "Inersiya ta'rifi. Inertlik va Massa bog'liqligi. Nyutonning I-qonuni g'oyasi.",
          experiments: "Stakan ustidagi qog'oz varag'ini keskin tortib olish (ustidagi tanga stakan ichiga tushadi). Avtomobil modelining to'siqqa urilgandagi 'yo'lovchi' holatini kuzatish."
        }
      },
      { id: '18', title: "Massa va zichlik",
        content: {
          theory: `Nima uchun bir xil o'lchamdagi temir bo'lagi yog'och bo'lagidan og'irroq? Yoki nega bir chelak suv bir chelak paxtadan ko'ra ko'proq qiynab ko'tariladi? Bu savollarga javob topish uchun biz fizikaning ikki muhim kattaligi — massa va zichlikni o'rganishimiz kerak. Massa — bu jismning inertlik xossasini va uningdagi modda miqdorini ifodalovchi skalyar fizik kattalikdir. SI tizimida massa birligi — kilogramm (kg).

Kilogramm etoloni fransiyalik olimlar tomonidan Sevrdagi o'lchovlar va tarozi palatasida saqlanadi. Lekin kundalikda biz gramm, milligramm yoki tonnalardan foydalanamiz. Massani o'lchash uchun tarozilar ishlatiladi. Tarozining ishlash prinsipi noma'lum jism massasini ma'lum toshlar (pallali tarozi) yoki prujina elastikligi (elektron tarozi) bilan solishtirishga asoslangan. Massa jismning qayerda (Yerda, Oyda yoki koinotda) bo'lishidan qat'iy nazar o'zgarmaydi.

Endi zichlikka to'xtalamiz. Zichlik — bu moddaning birlik hajmdagi massasini ko'rsatuvchi kattalikdir. Ya'ni, zichlik = massa / hajm. Har bir moddaning o'z zichligi bor. Masalan, suvning zichligi 1000 kg/m^3 (yoki 1 g/sm^3). Bu degani, bir kubometr hajmdagi suv 1000 kg tosh bosadi. Oltinning zichligi juda yuqori (19 300 kg/m^3), havoning zichligi esa juda kichik (taxminan 1.2 kg/m^3).

Zichlik moddaning zarrachalari bir-biriga qanchalik jich joylashganini ko'rsatadi. Gazlarda molekulalar orasida bo'sh joy ko'p, shuning uchun ularning zichligi kichik. Qattiq jismlarda esa zarrachalar mahkam joylashgan, shuning uchun zichlik yuqori. Zichlikni bilish muhandislar uchun juda muhim. Masalan, samolyotlarni yasashda zichligi kichik, lekin mustahkamligi yuqori bo'lgan alyuminiy yoki titan qotishmalaridan foydalaniladi. Agar samolyotni po'latdan yasasalar, u juda og'ir bo'lib, uchishga kuchi yetmagan bo'lar edi.

Zichlik shuningdek jismning suyuqlikda cho'kishi yoki suzishini ham belgilaydi. Agar jismning zichligi suv zichligidan kichik bo'lsa (masalan, yog'och yoki yog'), u suv betida suzadi. Agar zichligi katta bo'lsa (tosh, temir), u cho'kib ketadi. Biz nima uchun ulkan po'lat kemalar cho'kib ketmasligini so'rashimiz mumkin. Gap shundaki, kemaning ichi bo'shliq va havo bilan to'la, natijada kemaning umumiy (o'rtacha) zichligi suvnikidan kichik bo'lib qoladi.

Massa va zichlikni tushunish — bu tabiatdagi 'og'irlik' va 'yengillik' sirlarini ochish demakdir. Fizikada biz har bir narsani o'lchaymiz va hisoblaymiz. Ushbu bobda siz jismning hajmini va massasini bilgan holda, uning qanday moddadan yasalganini aniqlashni o'rganasiz. Bu esa sizga nafaqat darsda, balki hayotda ham to'g'ri qarorlar qabul qilishga, masalan, xarid qilayotgan mahsulotingiz sifatini tekshirishga yordam beradi.`,
          formulas: "Zichlik: ρ = m / V. Massa: m = ρ * V. Hajm: V = m / ρ. Birliklar: kg/m^3, g/sm^3.",
          experiments: "Turli shakldagi jismlar (tosh, yog'och bo'lagi, klyuch) massasini tarozi va hajmini menzurka yordamida o'lchash hamda zichligini hisoblash."
        }
      },
      { id: '19', title: "Kuch va uning turlari",
        content: {
          theory: `Nega jismlar harakatga keladi yoki to'xtaydi? Nima uchun shakli o'zgaradi? Bu savollarga fizika bitta so'z bilan javob beradi: Kuch. Kuch — bu bir jismning ikkinchi jismga ko'rsatadigan ta'sirining miqdoriy o'lchovidir. Kuch — vektor kattalikdir, ya'ni uning nafaqat son qiymati (kattaligi), balki yo'nalishi va qo'yilish nuqtasi ham muhim. Kuch birligi — Nyuton (N), bu buyuk fizik Is'hoq Nyuton sharafiga qo'yilgan.

Tabiatda kuchlarning turlari juda ko'p. Eng birinchi va sezilarli kuch bu — elastiklik kuchidir. Agar siz prujinani cho'sangiz yoki rezinani siqsangiz, u o'zining avvalgi holatiga qaytishga intiladi. Bu deformatsiya natijasida yuzaga keladigan kuchdir. Guk qonuniga ko'ra, elastiklik kuchi jismning qanchalik cho'zilganiga mutanosibdir. Bu qonun asosida kuchni o'lchaydigan asbob — dinamometr yaratilgan. Kundalikda biz buni 'kuch o'lchagich' yoki 'prujinali tarozi' ko'rinishida ko'ramiz.

Yana bir muhim kuch — ishqalanish kuchidir. Bu kuch bir jism ikkinchi jism sirti bo'ylab harakatlanganda yuzaga keladi va harakatga doimo qarshilik ko'rsatadi. Ishqalanish bo'lmaganida biz yo'lda yura olmasdik (oyoqlarimiz sirpanib ketardi) va moshinalar to'xtay olmasdi. Lekin ishqalanishning zararli tomoni ham bor: u mashina qismlarini yeb yuboradi va ortiqcha issiqlik ajratadi. Ishqalanishni kamaytirish uchun moylash materiallari va podshipniklar ishlatiladi.

Og'irlik kuchi — Yerning barcha jismlarni o'z markaziga tortish kuchidir. Bu kuch tufayli biz yerda mustahkam turamiz, yomg'ir yerga tushadi va atmosfera tarqalib ketmaydi. Og'irlik kuchi jismning massasiga bog'liq: massa qanchalik katta bo'lsa, tortishish shunchalik kuchli. Shuningdek, tabiatda elektr, magnit va yadro kuchlari ham bor. Ularning har biri olamning muvozanatda turishiga xizmat qiladi.

Kuchni tasvirlashda biz ko'pincha yo'naltirilgan kesmalardan (strelka) foydalanamiz. Agar jismga bir vaqtning o'zida bir nechta kuch ta'sir qilsa (masalan, yukni ikki kishi tortayotgan bo'lsa), ular 'teng ta'sir etuvchi kuch' bilan almashtirilishi mumkin. Agar teng ta'sir etuvchi kuch nolga teng bo'lsa, jism muvozanatda bo'ladi (tinch turadi yoki tekis harakat qiladi). Kuchlar kurashi — bu butun dunyo dinamikasining asosi.

Fizikani o'rganish sizga kuchlarni 'boshqarish'ni o'rgatadi. Siz qayerga va qancha kuch qo'yishni bilsangiz, og'ir yuklarni oson ko'tarasiz yoki tezroq harakat qilasiz. Kuch — bu faqat jismoniy quvvat emas, bu tabiat qonunlarining qudratli namoyon bo'lishidir. Ushbu darsda siz dinamometr bilan ishlashni va turli kuchlarning tabiatini tushunishni o'rganasiz. Esingizda bo'lsin: har bir natija orqasida ma'lum bir kuch yotadi!`,
          formulas: "Og'irlik kuchi: F = m * g. Guk qonuni: F_elas = k * x. Ishqalanish kuchi: F_ishq = μ * N.",
          experiments: "Dinamometr yordamida turli yuklar og'irligini o'lchash. Turli sirtlarda (shisha, qog'oz, gilam) ishqalanish kuchini taqqoslash."
        }
      },
      { id: '20', title: "Og'irlik kuchi va erkin tushish",
        content: {
          theory: `Nima uchun qo'limizdan tushib ketgan olma doim yerga tushadi? Nega u yon tomonga yoki yuqoriga uchib ketmaydi? Bu savolga XVII asrda Is'hoq Nyuton 'Butun olam tortishish qonuni' orqali javob bergan. Koinotdagi barcha jismlar bir-birini tortadi. Yer o'zining ulkan massasi bilan atrofidagi hamma narsani — uylarni, daraxtlarni, odamlarni va hatto Oyni ham tortib turadi. Yer tomonidan jismlarga ko'rsatiladigan bu tortishish kuchi 'og'irlik kuchi' deb ataladi.

Og'irlik kuchi jismning massasiga to'g'ri mutanosibdir. Agar massa 2 marta ortsa, tortishish kuchi ham 2 marta ortadi. Yer sirtida 1 kg massali jismga taxminan 9.8 Nyuton (amaliyotda 10 N deb olinadi) kuch ta'sir qiladi. Bu 'erkin tushish tezlanishi' (g) ko'rsatkichidir. Boshqa sayyoralarda bu ko'rsatkich boshqacha. Masalan, Oyda tortishish Yerga qaraganda 6 marta kuchsiz, shuning uchun kosmonavtlar u yerda balandga oson sakray oladilar.

Erkin tushish — bu faqat og'irlik kuchi ta'sirida sodir bo'ladigan harakatdir. Galiley o'zining mashhur tajribalarida (Piza minorasidan turli og'irlikdagi sharlarni tashlab) isbotladiki, agar havo qarshiligi bo'lmasa, barcha jismlar — og'ir tosh ham, yengil pat ham — bir xil vaqtda yerga tushadi. Bu fizikadagi eng hayratlanarli haqiqatlardan biridir. Havoning qarshiligi tufayli biz kundalikda patning sekin tushishini ko'ramiz, lekin vakuumda (havosiz joyda) ular barobar tushadi.

Og'irlik kuchi va Jismning vazni — bu ikki xil tushuncha. Og'irlik kuchi Yer tomonidan jismga ta'sir qiladi. Vazn esa jismning tortishish natijasida o'zi turgan tayanchga yoki osilgan osmaga ko'rsatadigan ta'siridir. Agar siz sakrayotgan bo'lsangiz, havoda uchib yurgan lahzangizda vazningiz nolga teng bo'ladi, buni 'vaznsizlik' holati deyiladi. Kosmonavtlar koinot stansiyasida doimiy vaznsizlikda bo'ladilar, lekin u yerda ham og'irlik kuchi mavjud (u stansiyani Yer atrofida ushlab turadi).

Erkin tushish tezlanishini bilish muhandislar va olimlar uchun juda muhim. U koinot kemalarining orbitasini hisoblashda, uchoqlarning xavfsizligini ta'minlashda va hatto liftlarning ishlashida hisobga olinadi. Agar Yerning tortishish kuchi bir oz o'zgarsa, butun hayot tarzi butunlay o'zgarib ketgan bo'lar edi. Biz og'irlik kuchi tufayli 'past' va 'yuqori' degan tushunchalarga egamiz.

Ushbu darsda siz tortishish olamiga sayohat qilasiz. Siz Nyuton va Galileyning buyuk kashfiyotlarini o'z ko'zingiz bilan ko'rasiz va tajribada tekshirib ko'rasiz. Fizika bizga ko'rinmas tortishish iplarini ko'rsatadi, ular orqali koinotdagi barcha narsalar bir-biri bilan bog'langan. Og'irlik kuchi — bu tabiatning birlashtiruvchi qudratidir. Tajriba o'tkazing: bir varaq qog'ozni va bir xil o'lchamdagi g'ijimlangan qog'ozni tashlab ko'ring, natija sizni o'ylantirib qo'yishi aniq!`,
          formulas: "Og'irlik kuchi: F_o'g' = m * g. Erkin tushish tezlanishi: g ≈ 9.8 m/s^2. Vazn formulasi: P = m * g (tinch holatda).",
          experiments: "Vakuum quvuri (Nyuton trubkasi) bo'lmaganda, qog'oz va og'ir jismning tushishini kuzatish. Prujinali tarozi yordamida yukning turli tezlanishlardagi vaznini taxminiy tahlil qilish."
        }
      }
    ]
  },
  {
    id: 'bob-5',
    title: "5-BОB. Jismlarning muvozanati",
    lessons: [
      { id: '21', title: "Statika asoslari va muvozanat",
        content: {
          theory: `Nega ba'zi binolar asrlar davomida mustahkam turadi, ba'zilari esa osongina qulab tushadi? Nima uchun o'yinchoq 'vanka-vstanka' (yiqilmasvoy) har doim o'z holatiga qaytadi? Bu savollarga mexanikaning 'Statika' bo'limi javob beradi. Statika — bu jismlarning muvozanat shartlarini o'rganadigan bo'limdir. Muvozanat deganda jismning tinch holati yoki uning harakat holati o'zgarmasligi tushuniladi.

Muvozanatning ikki asosiy sharti bor. Birinchidan, jismga ta'sir qilayotgan barcha kuchlarning yig'indisi nolga teng bo'lishi kerak. Bu degani, jismni hech bir tomonga kuch bilan 'sultalab' bo'lmaydi. Ikkinchinchidan, kuch momentlarining yig'indisi nolga teng bo'lishi kerak, ya'ni jism aylanib ketmasligi lozim. Bu shartlar muhandislikda ko'priklar, minoralar va osmono'par binolar qurishda birinchi navbatda hisobga olinadi.

Jismlarning muvozanati uch turga bo'linadi: turg'un, turg'unmas va befarq muvozanat. Turg'un muvozanatda, agar jismni bir oz muvozanatdan chiqarsangiz, u o'z-o'zidan avvalgi holatiga qaytadi (masalan, chuqurlikdagi koptokcha). Turg'unmas muvozanatda esa, ozgina turtki bo'lsa ham jism muvozanatdan chiqib, butunlay boshqa holatga o'tadi (masalan, qirra ustiga qo'yilgan qalam). Befarq muvozanatda jism qaysi holatga o'tkazilsa, o'sha yerda muvozanatni saqlab qolaveradi (masalan, tekis stoldagi koptok).

Muvozanatda 'og'irlik markazi' juda katta rol o'ynaydi. Og'irlik markazi — bu jismning barcha qismlariga ta'sir qilayotgan og'irlik kuchlarining teng ta'sir etuvchisi qo'yilgan nuqtadir. Jism tayanchi qanchalik pastda va og'irlik markazi tayanch nuqtasiga nisbatan qanchalik past joylashgan bo'lsa, jism shunchalik turg'un bo'ladi. Moshinalarning past qilib yasalishi yoki kemalarning tubiga og'ir yuklar qo'yilishi ham turg'unlikni oshirish uchun xizmat qiladi.

Statika qonuniyatlari arxitekturada ham beqiyosdir. Buyuk minoralar va gumbazlar aynan og'irlik kuchining to'g'ri taqsimlanishi hisobiga ming yillar davomida qulamasdan turibdi. Muvozanat faqat tilla tarozida emas, balki har bir qadamimizda mavjud. Biz yurganda ham beixtiyor gavdamizni shunday tutamizki, og'irlik markazimiz tayanch yuzasidan (oyoqlarimiz orasidan) chiqib ketmasin. Aks holda biz yiqilib tushishimiz mumkin edi.

Ushbu darsda siz muvozanat sirlarini o'rganasiz. Siz o'z qo'lingiz bilan turli jismlarning og'irlik markazini topishni va turg'un konstruksiyalar yaratishni mashq qilasiz. Fizika bizga dunyoni barqaror ushlab turish usullarini ko'rsatadi. Esda tuting: muvozanat — bu tabiatdagi tartibning va xotirjamlikning asosidir. Tajriba o'tkazing: o'zingizga qiziqarli 'yiqilmasvoy' yasab ko'ring va statika qonunlarini amalda his qiling!`,
          formulas: "Kuchlar muvozanati: ΣF = 0. Momentlar qoidasi: M = F * d. Turg'unlik sharti.",
          experiments: "Geometrik shakllarning og'irlik markazini 'osish' usulida aniqlash. Turli jismlarning turg'unligini (og'ish burchagi orqali) o'rganish."
        }
      },
      { id: '22', title: "Richaglar va bloklar",
        content: {
          theory: `Insoniyat qadimdan o'z kuchi yetmaydigan ishlarni bajarish (masalan, ulkan toshlarni ko'tarish) uchun turli vositalardan foydalangan. Bunday vositalar 'oddiy mexanizmlar' deb ataladi. Oddiy mexanizmlar kuchdan yutuq olishga yoki kuchning yo'nalishini o'zgartirishga xizmat qiladi. Ularning eng asosiylari — richaglar va bloklardir. Ularning ishlash prinsipi bitta: 'kuchdan necha marta yutsak, masofadan shuncha marta yutqazamiz'.

Richag — bu tayanch nuqtasi atrofida aylana oladigan qattiq jismdir. Richagning ikki tomoniga kuchlar ta'sir qiladi. Tayanch nuqtasidan kuch qo'yilgan nuqtagacha bo'lgan eng qisqa masofa 'kuch yelkasi' (d) deb ataladi. Arximed shunday degan edi: 'Menga tayanch nuqtasini bering, men Yer shari ni ko'tarib beraman'. Bu richagning kuchaytirish qudratini ko'rsatadi. Richag yelkasi qanchalik uzun bo'lsa, jismni ko'tarish uchun shunchalik kam kuch sarflanadi. Kundalikda biz richagni qaychi, ombir, atirgul va hatto qo'limiz bo'g'inlarida ko'ramiz.

Bloklar esa — o'qi atrofida aylanuvchi, chekkasida ariqchasi (novi) bor g'ildiraklardir. Ular ikki xil bo'ladi: qo'zg'almas va qo'zg'aluvchan. Qo'zg'almas blok kuchdan yutuq bermaydi, lekin u kuchning yo'nalishini o'zgartirishga yordam beradi. Masalan, yukni tepaga ko'tarish uchun arqonni pastga tortish ancha qulayroqdir. Qo'zg'aluvchan blok esa o'qi bilan birga harakat qiladi va kuchdan 2 marta yutuq beradi, ammo biz arqonni 2 marta ko'proq tortishimizga to'g'ri keladi.

Bloklar va richaglarning birlashmasidan yanada murakkabroq mexanizmlar — 'polispastlar' hosil qilinadi. Ular qurilish kranlarida, kemalarda va og'ir sanoatda ishlatiladi. Bu mexanizmlar tufayli bir kishi tonnalab yukni ko'tarishi mumkin. Inson zakovati jismoniy kamchiligini fizik asboblar yordamida to'ldiradi. Bu esa texnika taraqqiyotining asosiy harakatlantiruvchi kuchi bo'lib xizmat qilgan.

Oddiy mexanizmlar faqat katta qurilishlarda emas, kundalik ro'zg'orda ham har qadamda uchraydi. Eshik dastasining chetda joylashgani (richag), quduqdan suv tortish (charxpalak), velosiped zanjiri — bularning barchasi mexanika yutuqlaridir. Ularni o'rganish orqali biz o'z mehnatimizni samaraliroq qilishni o'rganamiz. Fizika bizga 'aqlli mehnat'ning yo'lini ko'rsatadi.

Ushbu darsda siz oddiy mexanizmlarning sehrli olami bilan tanishasiz. Siz o'z qo'lingiz bilan bloklar tizimini yig'asiz va kuchdan qanday qilib bir necha marta yutish mumkinligini hisoblaysiz. Arximed qonuniyatlari sizga o'z kuchingizni o'n barobar oshirish sirlarini ochib beradi. Tajriba o'tkazing: oddiy chizg'ich va qalamdan richag yasab, uning muvozanatini tekshirib ko'ring!`,
          formulas: "Richag qoidasi: F1 * d1 = F2 * d2. Blok yutug'i (qo'zg'aluvchan): F = P / 2.",
          experiments: "Laboratoriya richagida muvozanat shartini turli yuklar yordamida tekshirish. Qo'zg'almas va qo'zg'aluvchan bloklar yordamida yukni ko'tarish va kuchni dinamometrda o'lchash."
        }
      },
      { id: '23', title: "Mexanika oltin qoidasi",
        content: {
          theory: `Oddiy mexanizmlarni o'rganayotganda biz bir qiziq holatga duch keldik: agar biz kuchdan yutsak, masofadan yutqazyapmiz. Masalan, qo'zg'aluvchan blokda yukni 50 Nyuton kuch bilan ko'tarsak (yuk og'irligi 100 N bo'lsa), biz arqonni 2 metr tortib, yukni atigi 1 metr ko'tarishga majburmiz. Bu tasodif emas, balki tabiatning eng fundamental qonuniyatlaridan biri — 'Mexanikaning oltin qoidasi'dir.

Bu qoida shunday deyiladi: 'Hech qaysi oddiy mexanizm ishda yutuq bermaydi. Kuchdan necha marta yutsak, masofadan shuncha marta yutqazamiz'. Bu dunyoda hech narsa tekinga berilmasligining fizik isbotidir. Biz kuchi ko'paytirishimiz mumkin (richag yoki blok yordamida), lekin biz sarf qilayotgan umumiy 'ish' (kuch ko'paytirilgan yo'l) o'zgarmasdan qoladi. Biz faqat jarayonni o'zimizga qulayroq shaklga o'tkazamiz.

Oltin qoidani tushunish uchun 'Mexanik ish' tushunchasini esga olishimiz kerak. Agar biz kam kuch bilan uzoq masofada arqonni tortsak, yoki katta kuch bilan qisqa masofada yukni ko'tarsak, bajarilgan ish bir xil bo'ladi (ishqalanishni hisobga olmaganda). Bu qonun nafaqat richag va bloklar uchun, balki qiya tekislik (masalan, yukni moshinaga ortish uchun qo'yilgan taxta) uchun ham o'rinlidir. Qiya tekislik bo'ylab yukni surish tepaga tik ko'tarishdan oson, lekin bosib o'tiladigan yo'l ko'proq.

Nima uchun bu qoida 'oltin' deb ataladi? Chunki u energiyaning saqlanish qonunining mexanizmlarga tatbiq etilgan ko'rinishidir. Insoniyat bu qoidani bilmasdan oldin ko'p sarguzashtlarni boshidan kechirgan. Alkimyogarlar va turli ixtirochilar 'Perpetuum Mobile' (Abadiy dvigatel), ya'ni o'zidan-o'zi ish bajaradigan yoki kiritilgan energiyadan ko'proq ish beradigan moshina yaratishga urinishgan. Lekin mexanikaning oltin qoidasi bunday moshina bo'lishi mumkin emasligini qat'iy isbotladi.

Bugungi zamonaviy texnikada biz ushbu qoidaga tayanib moshina va mexanizmlarni loyihalashtiramiz. Gearbox (uzatmalar qutilari) moshinalarda aynan shu prinsipda ishlaydi: past vitesda (birinchi tezlikda) moshina kuchli bo'ladi (balandlikka chiqadi), lekin tezligi (masofa bosishi) past bo'ladi. Yuqori vitesda esa tezlik katta, lekin g'ildiraklardagi tortish kuchi kamroq bo'ladi.

Ushbu darsda siz mexanikaning eng adolatli qonuni bilan tanishasiz. Siz tabiatni aldab bo'lmasligini, lekin undan o'z foydamizda qanchalik oqilona foydalanish mumkinligini bilib olasiz. Bilim — bu kuch, lekin oltin qoida — bu bilimning chegarasi va tartibidir. Tajriba o'tkazing: turli qiyalikdagi taxtalarda yukni tortib ko'ring va bosib o'tilgan yo'l bilan kuch orasidagi bog'liqlikni hisoblang!`,
          formulas: "A1 = A2 (Ideal holda). F1 * s1 = F2 * s2. Qiya tekislik yutug'i: F = (h/l) * P.",
          experiments: "Qiya tekislik bo'ylab yukni ko'tarishda sarflangan kuch va masofani tik ko'tarish bilan o'zaro solishtirish (dinamometr va chizg'ich yordamida)."
        }
      },
      { id: '24', title: "Foydali ish koeffitsienti",
        content: {
          theory: `Mexanikaning oltin qoidasi ideal dunyo haqida gapirdi (ya'ni ishqalanish bo'lmagan joyda). Lekin real hayotda har doim ishqalanish bor, bloklarning o'z og'irligi bor, arqonning cho'zilishi bor. Shuning uchun biz sarf qilgan jami ishimizning hammasi ham foydali maqsadga ketmaydi. Ma'lum bir qismi issiqlik sifatida havoga tarqaladi yoki mexanizmni qizdirishga sarflanadi. Shuning uchun fizikada 'Foydali ish koeffitsienti' (FIK) tushunchasi kiritilgan.

FIK — bu foydali ishning sarf qilingan (jami) ishga nisbati bo'lib, odatda foiz (%) bilan o'lchanadi. Masalan, agar mexanizmning FIK 80% bo'lsa, bu degani siz sarf qilgan kuchning 80 qismi yukni ko'tarishga ketadi, 20 qismi esa ishqalanishni yengishga yoki asbobni isitishga 'isrof' bo'ladi. Hech qanday real mexanizmning FIK 100% ga teng bo'lishi mumkin emas — bu fizik qonuniyatdir.

Foydali ish (Af) deb biz bevosita maqsadimizga erishish uchun bajarilgan ishni aytamiz. Masalan, yukni balandlikka ko'tarish. Sarf qilingan ish (As) — bu biz mashina yoki asbob orqali bajargan jami ishimizdir. Har doim sarf qilingan ish foydali ishdan katta bo'ladi (As > Af). Fiziklarning va muhandislarning asosiy maqsadi — FIKni imkon qadar 100% ga yaqinlashtirishdir. Buning uchun qismlar moylanadi, yuzalar silliqlanadi va yengil materiallar ishlatiladi.

FIK nafaqat oddiy mexanizmlarda, balki barcha dvigatellarda, elektrostansiyalarda va hatto inson organizmida ham mavjud. Masalan, avtomobil dvigatelining FIK taxminan 25-30% ni tashkil etadi (benzin yonishidan chiqqan energiyaning ko'p qismi issiqlik bo'lib isrof bo'ladi). Elektr motorlar ancha samaraliroq bo'lib, ularning FIK 90% dan yuqori bo'lishi mumkin. Inson tanasining FIK esa taxminan 20% atrofida — ya'ni biz yegan ovqatimizning ko'p qismi tana haroratini saqlashga (isishga) sarflanadi.

FIKni yuqori darajada saqlash nafaqat iqtisodiy foyda, balki ekologik zaruriyatdir. Energiya isrof bo'lishini kamaytirish orqali biz yoqilg'ini tejaymiz va tabiatga zararni kamaytiramiz. Har bir ixtirochi o'z moshinasini yanada 'samarali' qilish ustida bosh qotiradi. Bu muhandislik fikrlashining asosi hisoblanadi.

Ushbu darsda siz mexanizmlarning 'samaradorligini' hisoblashni o'rganasiz. Siz nafaqat matematik amallarni bajarasiz, balki energiyaning qanchalik qadrli ekanligini tushunib yetasiz. Fizika bizga isrofgarchiliksiz, oqilona dunyo qurish sirlarini o'rgatadi. Tajriba o'tkazing: qiya tekislikning foydali ish koeffitsientini hisoblang va uni qanday qilib oshirish mumkinligi haqida o'ylang!`,
          formulas: "FIK (η): η = (Af / As) * 100%. Foydali ish: Af = m * g * h. Sarf qilingan ish: As = F * l.",
          experiments: "Qiya tekislikning foydali ish koeffitsientini turli yuklar va balandliklar uchun hisoblash. Sirt shaklini o'zgartirib (mo'ylash yoki silliqlash) FIK o'zgarishini kuzatish."
        }
      }
    ]
  },
  {
    id: 'bob-6',
    title: "6-BОB. Suyuqlik va gazlar bosimi",
    lessons: [
      { id: '25', title: "Bosim tushunchasi",
        content: {
          theory: `Nega biz chang'ida qalin qorda yurganimizda botib ketmaymiz, lekin oddiy poyabzalda silliq botamiz? Nima uchun o'tkir pichoq narsani oson kesadi, o'tmas pichoq esa yo'q? Bu hodisalarning sababi — 'bosim' deb ataluvchi fizik kattalikdir. Bosim — bu sirtga tik yo'nalishda ta'sir qilayotgan kuchning shu sirt yuzasiga nisbatiga teng bo'lgan kattalikdir. Ya'ni, bosim nafaqat kuchga, balki u qanchalik katta yuzaga taqsimlanganiga bog'liq.

Sirt yuzasi qanchalik kichik bo'lsa, xuddi o'sha kuch hosil qiladigan bosim shanchalik katta bo'ladi. Pichoqning tig'i juda ingichka bo'lganligi sababli, ozgina kuch bilan ham u ulkan bosim hosil qiladi va moddani kesadi. Aksincha, agar biz biror narsani botib ketmasligini xohlasak, uning tayanch yuzasini kattalashtiramiz. Shuning uchun yuk mashinalarining g'ildiraklari keng va ko'p bo'ladi, traktorlar esa 'zanjir' (gusenitsa) yordamida yuradi. Bu yerga tushadigan bosimni kamaytirib, botib qolishni oldini oladi.

SI tizimida bosim birligi — Paskal (Pa). Bu buyuk fransuz olimi Blez Paskal sharafiga qo'yilgan. 1 Paskal — bu 1 kvadrat metr yuzaga 1 Nyuton kuch ta'sir qilgandagi bosimdir. 1 Pa juda kichik bosim (masalan, bir varaq qog'ozning stolda hosil qilgan bosimi), shuning uchun amaliyotda kilopaskal (kPa) yoki megapaskallardan (MPa) foydalaniladi. Shuningdek, atmosfera bosimini o'lchashda millimetr simob ustuni (mm sim. ust.) kabi birliklar ham ishlatiladi.

Suyuqlik va gazlar ham bosim hosil qiladi. Ularning ichidagi bosim 'gidrostatik bosim' deb ataladi. Bu bosim suyuqlik ustunining balandligiga va zichligiga bog'liq. Siz deryo yoki dengizda chuqurroq sho'ng'iganingizda quloqlaringizdagi 'og'irlik'ni his qilasiz — bu suvning tepadan bosayotgan og'irligidir. Oceanographiyada bu juda muhim faktor, chunki chuqurlikda bosim shunchalik kuchli bo'ladiki, u hatto oddiy suvostu kemalarini pachoqlab yuborishi mumkin.

Gazlardagi bosim esa molekulalarning idish devorlariga urilishi natijasida yuzaga keladi. Pishirilgan koptok yoki shishirilgan g'ildirak shaklini yo'qotmasligi aynan ichidagi gaz bosimi hisobigadir. Gaz bosimini oshirish uchun yo uni ko'proq pompalash kerak (zarrachalar sonini ko'paytirish), yoki uni qizdirish kerak (zarrachalar tezligini oshirish).

Bosimni o'lchash uchun 'manometr'lar ishlatiladi. Atmosfera bosimini esa 'barometr' o'lchaydi. Bosim tushunchasini bilish bizga nafaqat fizika masalalarini yechishda, balki xavfsiz texnika yaratishda (qozonxonalardan tortib samolyotlargacha) yordam beradi. Ushbu darsda siz bosimni qiyosiy hisoblashni va uning hayotimizdagi turli ko'rinishlarini tahlil qilishni o'rganasiz. Esda tuting: kuchni emas, bosimni boshqarish orqali eng murakkab ishlarni bajarish mumkin!`,
          formulas: "Bosim: p = F / S. Gidrostatik bosim: p = ρ * g * h. Birliklar: 1 Pa = 1 N/m^2.",
          experiments: "Qalamni ikki barmog'ingiz orasiga qo'yib qisish (o'tkir uchi ko'proq og'ritadi). Qum to'ldirilgan idishga turli yuzali yuklarni qo'yib, botish darajasini kuzatish."
        }
      },
      { id: '26', title: "Paskal qonuni",
        content: {
          theory: `Suyuqlik va gazlar qattiq jismlardan farqli o'laroq, o'ziga ko'rsatilgan bosimni barcha yo'nalishlarda bir xilda uzatish xususiyatiga ega. Bu ajoyib xususiyatni 1653-yilda Blez Paskal kashf etdi va u fizikada 'Paskal qonuni' deb ataladi. Qonunning ta'rifi shunday: 'Suyuqlik yoki gazga berilgan tashqi bosim uning har bir nuqtasiga o'zgarmasdan, har tomonga bir xilda uzatiladi'.

Tasavvur qiling, siz butunjay suv bilan to'ldirilgan va har tomonida teshikchalari bor sharni siqyapsiz. Suv faqat siz bosgan tomondan emas, balki barcha teshiklardan bir xil kuch bilan otilib chiqadi. Bu Paskal qonunining yaqqol isbotidir. Bu xususiyat molekulalarning oquvchanligi va bir-biriga nisbatan erkin harakatlanishi bilan bog'liq. Qattiq jismlarda esa bosim asosan kuch yo'nalishi bo'yicha uzatiladi.

Paskal qonuni zamonaviy texnikaning poydevorlaridan biridir. Barcha gidravlik qurilmalar — ekskavatorlar, yuk ko'taruvchi kranlar, avtomobil tormozlari — aynan shu qonun asosida ishlaydi. Masalan, siz tormoz pedalini ozgina kuch bilan bossangiz ham, bu bosim suyuqlik (tormoz moyi) orqali barcha g'ildiraklarga bir zumda yetib boradi va ulkan moshinani to'xtatishga yetadigan kuch hosil qiladi.

Gazlarda ham bu qonun o'rinli. Shishirilayotgan shar nega dumaloq bo'ladi? Chunki ichidagi havo bosimi sharning barcha devorlariga bir xilda ta'sir qiladi. Agar biron tomonda bosim kamroq bo'lsa, shar u tomonga qarab deformatsiyalanar edi. Paskal qonunini tushunish bizga pnevmatik asboblar (siqilgan havo bilan ishlaydigan moshinalar) yaratish imkonini berdi.

Hatto bizning qon aylanish tizimimizda ham Paskal qonuni elementlari mavjud. Yurak qonni haydaganda hosil bo'lgan bosim qon tomirlari orqali butun tana a'zolariga yetib boradi. Bu tabiatning naqadar mukammal muhandis ekanligidan dalolat beradi. Lekin chuqur suv ostida yoki baland tog'larda tashqi bosim o'zgarishi inson organizmiga ta'sir qiladi, chunki tanamiz ichidagi bosim ham tashqi bosim bilan muvozanatda bo'lishi kerak.

Ushbu darsda siz Paskal qonunining naqadar qudratli ekanligini laboratoriya tajribalarida ko'rasiz. Siz mitti kuch orqali qanday qilib ulkan bosim uzatish mumkinligini hisoblab chiqasiz. Fizika bizga ko'rinmas suyuqlik va gazlar orqali quvvatni masofaga uzatish yo'llarini o'rgatadi. Esingizda bo'lsin: Paskal qonuni — bu suyuqliklarning 'adolat' qonunidir, u hamma nuqtaga bir xil e'tibor (bosim) beradi!`,
          formulas: "Paskal qonuni ma'nosi: p_tashqi = const barcha nuqtada. Bosim tengligi: p1 = p2.",
          experiments: "Paskal shari yordamida suvning barcha yo'nalishlarda bir xil otilishini kuzatish. Shprits va naycha yordamida bosimning uzatilishini modellashtirish."
        }
      },
      { id: '27', title: "Gidravlik mashinalar",
        content: {
          theory: `Gidravlik mashina — bu Paskal qonuniga asoslangan, suyuqlik yordamida kuchdan yutuq olish imkonini beruvchi qurilmadir. Eng sodda gidravlik mashina (masalan, gidravlik press) bir-biri bilan naycha orqali tutashtirilgan, yuzalari turlicha bo'lgan ikkita silindrdan iborat. Silindrlar ichiga moy quyiladi va usti porshenlar (qopqoqlar) bilan mahkam yopiladi.

Gidravlik mashinaning ishlash siri shundaki, kichik porshenga berilgan ozgina bosim suyuqlik orqali katta porshenga o'zgarmasdan uzatiladi. Lekin porshenlarning yuzalari har xil bo'lgani uchun, katta porshen yuqoriga juda katta kuch bilan itariladi. Formula shuni ko'rsatadiki: katta porshendagi kuch kichik porshendagi kuchdan necha marta katta bo'lsa, uning yuzasi ham shuncha marta katta bo'lishi kerak. Ya'ni, yuzani 100 marta oshirsak, biz 100 marta kuchdan yutamiz.

Buni amalda qanday qo'llaymiz? Gidravlik presslar metallarni presslash, qog'oz va paxtani toy-toy qilib bog'lash, hatto avtomobillarni ta'mirlash uchun ko'tarishda ishlatiladi. Kichik qo'lda ishlaydigan rulo (domkrat) yordamida bir inson 2-3 tonnalik moshinani bemalol ko'tara olishining siri ham gidravlikadadir. Bu yerda suyuqlik (odatda mineral moy) 'kuch uzatuvchi' vazifasini bajaradi.

Gidravlik mashinalar faqat presslar bilan tugamaydi. Zamonaviy ekskavatorlarning 'qo'llari' (strelalari) ham gidravlik tsilindrlar yordamida harakatlanadi. Haydovchi kichik richagni qimirlatadi, nasos bosim hosil qiladi va natijada ulkan kovsh (chelak) tonnalab tuproqni osonlikcha qazib oladi. Bu 'suv kuchi' (aslida moy kuchi) inson mehnatini yuz barobar yengillashtiradi.

Gidravlik tizimlarning afzalligi shundaki, ular juda silliq va ishonchli ishlaydi. Ular orqali juda katta kuchlarni masofaga oson uzatish mumkin. Lekin ularning dushmani — havo pufakchalari. Agar tizim ichiga havo kirib qolsa, havo osongina qisilishi sababli bosim to'liq uzatilmaydi va mashina 'ishlamay' qoladi. Shuning uchun gidravlik tizimlar doimo havosiz va mahkam (germetik) saqlanishi kerak.

Ushbu darsda siz gidravlik mashinaning 'matematik mo'jizasi'ni o'rganasiz. Siz yuzalar nisbati va kuchlar nisbati orasidagi bog'liqlikni hisoblashni mashq qilasiz. Fizika bizga suyuqliklarning yumshoqligidan foydalanib, qattiq metallardan ham kuchliroq bo'lishni o'rgatadi. Tajriba o'tkazing: turli o'lchamdagi ikkita shpritsni naycha bilan ulab, ularning bir-biriga ta'sirini tekshirib ko'ring!`,
          formulas: "Gidravlik mashina formulasi: F2 / F1 = S2 / S1. Kuchdan yutuq: k = S2 / S1.",
          experiments: "Turli diametrdagi shpritslarni suv bilan to'ldirib o'zaro bog'lash va birining porshenini bosganda ikkinchisining ko'tarilish kuchini (taxminan) sezish."
        }
      },
      { id: '28', title: "Arximed kuchi va suzish shartlari",
        content: {
          theory: `Nega og'ir po'lat kemalar suvda suzadi, lekin kichik tosh cho'kib ketadi? Nima uchun biz suv ichida o'zimizni yengil his qilamiz? Bu savollarga javobni miloddan avvalgi III asrda qadimgi yunon olimi Arximed topgan. U suyuqlikka botirilgan har qanday jismga pastdan yuqoriga yo'nalgan itaruvchi kuch ta'sir qilishini isbotladi. Bu kuch bugungi kunda 'Arximed kuchi' deb ataladi.

Arximed qonuniga ko'ra, itaruvchi kuch jism tomonidan siqib chiqarilgan suyuqlikning og'irligiga tengdir. Ya'ni, jism suvga kirganda u o'z hajmi qadar suvni 'chetroqqa suradi', o'sha surilgan suv esa jismni tepadagi kabi emas, pastki qatlamdan kuchliroq bosim bilan itarib chiqarishga harakat qiladi. Bu kuch suyuqlik zichligiga va jismning hajmiga bog'liq. Jism qanchalik katta bo'lsa va suyuqlik qanchalik zich bo'lsa, Arximed kuchi shanchalik katta bo'ladi.

Jismlarning suzish shartlari uchta holatga bo'linadi. 1) Agar Arximed kuchi og'irlik kuchidan kichik bo'lsa (Fa < Fg), jism cho'kadi. 2) Agar bu kuchlar teng bo'lsa (Fa = Fg), jism suyuqlik ichida ixtiyoriy chuqurlikda muvozanatda bo'ladi (suzib yuradi). 3) Agar Arximed kuchi katta bo'lsa (Fa > Fg), jism yuqoriga qalqib chiqadi va sirtda suzadi. Bu shartlarni jism va suyuqlik zichliklarini solishtirish orqali ham aniqlash mumkin.

Arximed kuchi nafaqat suyuqliklarda, balki gazlarda ham mavjud. Aynan shu kuch tufayli havoda havo sharlari (aerostatlar) va dirijabllar yuqoriga ko'tariladi. Havo shari ichidagi issiq havo yoki geliy gazi tashqi havodan yengilroq bo'lgani uchun, havo uni yuqoriga itarib chiqaradi. Biz atmosferadagi 'suvosti kemalari' kabi yashaymiz va havo bizni doimo bir oz yuqoriga itarib turadi (lekin massamiz katta bo'lgani uchun biz buni sezmaymiz).

Kemachilikda Arximed kuchi — hayotiy zaruriyatdir. Kemalar loyihalashtirilayotganda 'suv sig'imi' (vodoizmeshenie) tushunchasi ishlatiladi. Kema shunday shaklda yasaladiki, u o'z og'irligidan ko'proq suvni siqib chiqarsin. Kema yuklanganda u suvga ko'proq botadi va Arximed kuchi ortadi, bu esa muvozanatni saqlaydi. Kemadagi 'Vaterliniya' chizig'i esa xavfsizlik chegarasini ko'rsatadi — kema undan ortiq botishi mumkin emas.

Ushbu darsda siz 'Evrika!' (Topdim!) hayqirig'i bilan boshlangan buyuk kashfiyotni o'rganasiz. Siz suvning yashirin qudratini hisoblaysiz va narsalar nima uchun suzishini matematik isbotlaysiz. Fizika bizga tabiat sirlarini ochib, ummonlarda va osmonlarda sayohat qilish imkonini beradi. Tajriba o'tkazing: tuxumni toza suvga va tuzli suvga solib ko'ring, Arximed kuchi qanday o'zgarishini o'z ko'zingiz bilan ko'ring!`,
          formulas: "Arximed kuchi: Fa = ρ_suyuq * g * V_jism. Suvda jism vazni: P' = P - Fa.",
          experiments: "Arximed chelagi yordamida itaruvchi kuchning siqib chiqarilgan suv og'irligiga tengligini tekshirish. Tuxumning sho'r suvda qalqib chiqishini kuzatish."
        }
      },
    ]
  },
  {
    id: 'bob-7',
    title: "7-BОB. Issiqlik hodisalari",
    lessons: [
      { id: '29', title: "Harorat va termometrlar",
        content: {
          theory: `Biz kundalik hayotda jismlarni 'issiq', 'iliq' yoki 'sovuq' deb ataymiz. Lekin fizika uchun bunday ta'riflar yetarli emas, chunki ular subyektivdir (masalan, bir xonadagi havo bir kishiga issiq, boshqasiga sovuq tuyulishi mumkin). Jismlarning isiganlik darajasini miqdoriy ifodalash uchun 'harorat' kattaligi ishlatiladi. Harorat — bu modda zarrachalarining tartibsiz harakati kinetik energiyasining o'rtacha o'lchovidir.

Molekulyar nuqtai nazardan, jism qanchalik issiq bo'lsa, uning molekulalari shanchalik tez harakat qiladi. Agar molekulalar harakati butunlay to'xtasa, bu 'absolyut nol' harorat deb ataladi (taxminan -273.15 °C). Bu koinotdagi eng og'ir sovuqlikdir va undan pastroq harorat bo'lishi mumkin emas. Fan bu haroratga intiladi, lekin unga erishish juda qiyin.

Haroratni o'lchash uchun 'termometr'lar ishlatiladi. Ularning ishlash prinsipi moddalarning issiqlikdan kengayishi xususiyatiga asoslangan. Eng keng tarqalgan suyuqlikli termometrlarda simob yoki spirt ishlatiladi. Harorat ko'tarilganda suyuqlik kengayadi va naycha bo'ylab yuqoriga ko'tariladi. Shkaladagi raqamlar orqali biz aniq haroratni aniqlaymiz. Bugungi kunda elektron (raqamli) va infraqizil (masofadan o'lchaydigan) termometrlar juda mashhur bo'lib bormoqda.

Dunyoda asosan ikki xil harorat shkalasi ishlatiladi: Selsiy (°C) va Kelvin (K). Selsiy shkalasi suvning muzlash nuqtasini 0 va qaynash nuqtasini 100 daraja deb olgan. Kelvin shkalasi esa ilmiy tadqiqotlarda qo'llaniladi va u 'absolyut nol'dan boshlanadi. Kelvinda manfiy sonlar bo'lmaydi. Amerika kabi ba'zi davlatlarda esa Farengeyt (°F) shkalasidan foydalaniladi. Ularni bir-biriga aylantirish uchun maxsus formulalar mavjud.

Haroratni nazorat qilish hayotimizning har bir sohasida muhim. Tananing harorati sog'lig'imiz haqida ma'lumot beradi, ob-havo bashorati dehqonchilikka yordam beradi, sanoatda esa metallarning erish harorati aniq saqlanishi kerak. Termometrlar — bu bizning sezgilarimiz yetmagan joyda 'ko'zimiz' bo'lib xizmat qiladigan asboblardir.

Ushbu darsda siz issiq va sovuq olami sirlarini o'rganasiz. Siz nafaqat termometr bilan ishlashni, balki tabiatdagi eng mitti zarrachalarning 'issiqlik raqsi'ni tushunishni o'rganasiz. Fizika bizga sekin o'zgaruvchan haroratlar ortida ulkan molekulyar jarayonlar yotganini ko'rsatadi. Tajriba o'tkazing: suvining issiqligini avval qo'lingiz bilan taxmin qiling, keyin termometr bilan o'lchang — farq sizni hayron qoldirishi mumkin!`,
          formulas: "Kelvin va Selsiy bog'liqligi: T(K) = t(°C) + 273. Harorat — kinetik energiya o'lchovi.",
          experiments: "Turli haroratdagi suvning haroratini termometr yordamida o'lchash va vaqt o'tishi bilan uning xona haroratiga kelishini kuzatish."
        }
      },
      { id: '30', title: "Issiqlik uzatish turlari",
        content: {
          theory: `Nima uchun issiq choyga solingan temir qoshiq tezda qiziydi? Nega quyosh ostida tursak, oramizda havo bo'lishiga qaramay isib ketamiz? Bu jarayonlar 'issiqlik uzatish' deb ataladi. Issiqlik uzatish — bu energiyaning issiqroq jismdan sovuqroq jismga o'z-o'zidan o'tishi jarayonidir. Fizikada issiqlik uzatishning uchta asosiy turi mavjud: issiqlik o'tkazuvchanlik, konveksiya va nurlanish.

Issiqlik o'tkazuvchanlik — bu energiyaning bevosita tegib turgan jismlar yoki jismning bir qismidan ikkinchi qismiga molekulalar to'qnashuvi orqali uzatilishidir. Metallar issiqlikni juda yaxshi o'tkazadi, shuning uchun qozonlarni metallardan yasaymiz. Yog'och, plastmassa va havo esa issiqlikni yomon o'tkazadi (issiqlik izolyatorlari). Shuning uchun qishki kiyimlarimiz jun va momiqdan bo'ladi — ular o'z ichida havoni ushlab turib, tanamiz issiqligini tashqariga chiqarmaydi.

Konveksiya — bu energiyaning suyuqlik yoki gaz oqimlari (oqimlari) orqali uzatilishidir. Masalan, xonadagi batareya pastdagi havoni isitadi, isigan havo yengillashib yuqoriga ko'tariladi, uning o'rniga sovuq havo pastga tushadi. Natijada butun xona isiydi. Suvning choynakda qaynashi ham konveksiya natijasidir. Konveksiya faqat suyuqlik va gazlarda bo'ladi, qattiq jismlarda modda oqimi bo'lmagani uchun konveksiya kuzatilmaydi.

Nurlanish — bu energiyaning elektromagnit to'lqinlar (infraqizil nurlar) orqali uzatilishidir. Bu eng noyob turdir, chunki u hatto havosiz bo'shliqda (vakuumda) ham tarqaladi. Quyosh bizni aynan shu usulda isitadi. Har bir issiq jism atrofga issiqlik nurlarini chiqaradi. To'q rangli narsalar issiqlikni yaxshi yutadi, och rangli va yaltiroq narsalar esa nurlarni qaytaradi. Shuning uchun yozda oq kiyim kiyish salqinroq bo'ladi.

Issiqlik uzatish qonunlarini bilish bizga energiya tejaydigan uylar qurishda yordam beradi. Termos — bu uchala turga qarshi kurashadigan mo'jizaviy idishdir. Undagi ikki qatlam shisha orasidagi vakuum issiqlik o'tkazuvchanlik va konveksiyani to'xtatadi, oynali sirt esa nurlanishni qaytaradi. Natijada choy uzoq vaqt issiq saqlanadi.

Ushbu darsda siz energiyaning koinot bo'ylab qanday sayohat qilishini o'rganasiz. Siz o'z qo'lingiz bilan issiqlikni qanday tutib qolish yoki aksincha, uni qanday tezroq tarqatish mumkinligini tahlil qilasiz. Fizika bizga tabiat bilan o'zaro energiya almashinuvi san'atini o'rgatadi. Tajriba o'tkazing: bir xil miqdordagi issiq suvni qora va oq stakanlarga quyib, qaysi biri tezroq sovishini tekshirib ko'ring!`,
          formulas: "Issiqlik uzatish turlari: 1. O'tkazuvchanlik. 2. Konveksiya. 3. Nurlanish. Termos qurilmasi.",
          experiments: "Turli materiallardan (metall, yog'och, plastmassa) yasalgan tayoqchalarning issiqlik o'tkazuvchanligini mum yordamida solishtirish."
        }
      },
      { id: '31', title: "Solishtirma issiqlik sig'imi",
        content: {
          theory: `Nima uchun dengiz bo'yidagi qum quyosh ostida juda tez qiziydi, lekin dengiz suvi hali ham salqin bo'lib qolaveradi? Yoki nega bir xil massadagi temir va suvni isitish uchun suvga ko'proq energiya sarflaymiz? Bu hodisalarning sababi moddalarning 'solishtirma issiqlik sig'imi' deb ataluvchi xossasidir. Solishtirma issiqlik sig'imi — bu 1 kg massali jismni 1 gradusga isitish uchun kerak bo'lgan issiqlik miqdoridir.

Har bir moddaning o'z 'issiqlik ishtahasi' bor. Suvning issiqlik sig'imi juda katta (taxminan 4200 J/kg·°C). Bu degani, suv issiqlikni juda katta miqdorda yuta oladi va sekin soviydi. Bu tabiatda iqlimni yumshatishda ulkan rol o'ynaydi. Dengiz va okeanlar yozda issiqlikni o'zida yig'adi, qishda esa uni asta-sekin atmosferaga chiqarib, qattiq sovuq bo'lishiga yo'l qo'ymaydi. Suv — tabiatning eng yaxshi 'issiqlik akkumulyatori'dir.

Metallarning issiqlik sig'imi esa ancha kichik. Masalan, temirniki 460 J/kg·°C atrofida. Ya'ni, temirni isitish uchun suvga qaraganda 9 marta kamroq energiya yetarli. Shuning uchun moshina radiatorlarida yoki isitish tizimlarida suvdan foydalaniladi — u ozgina hajmda ko'p energiyani tashishi mumkin. Solishtirma issiqlik sig'imini bilish muhandislarga to'g'ri material tanlashda yordam beradi.

Issiqlik miqdorini hisoblash (Q = c·m·Δt) formulasi barcha issiqlik jarayonlarining asosi hisoblanadi. Bu yerda 'Q' — issiqlik miqdori, 'c' — solishtirma issiqlik sig'imi, 'm' — massa, 'Δt' — harorat o'zgarishi. Agar jism isisa, bu qiymat musbat bo'ladi (energiya yutiladi), agar sovusa — manfiy (energiya ajraladi). Issiqlik birligi — Joul (J), bu yana bir buyuk fizik Jeyms Joul sharafiga qo'yilgan.

Oshxonada ham biz doimo shu qonuniyat bilan to'qnashamiz. Qalin taglikli qozonlar issiqlikni yaxshi saqlaydi va taomni bir xilda pishiradi, chunki ularning issiqlik sig'imi katta. Bizning tanamiz ham 70% suvdan iborat bo'lgani uchun haroratimiz keskin ko'tarilib yoki tushib ketmaydi. Issiqlik sig'imi — bu hayotimizni barqaror ushlab turadigan 'termik bufer'dir.

Ushbu darsda siz moddalarning ichki dunyosiga nazar tashlaysiz. Siz nima uchun ba'zi narsalar tez 'lovullab' kishini kuydirishi, ba'zilari esa uzoq vaqt muloyim issiq bo'lib turishining sababini bilib olasiz. Fizika bizga har bir moddaning o'ziga xos xarakteri borligini o'rgatadi. Tajriba o'tkazing: bir xil massadagi issiq suv va moyni aralashtirmasdan sovutib ko'ring (yoki isiting), harorat qanday turlicha o'zgarishini ko'ring!`,
          formulas: "Issiqlik miqdori: Q = c * m * (t2 - t1). Solishtirma issiqlik sig'imi (c) birligi: J / (kg * °C).",
          experiments: "Suv va moyni bir xil vaqt davomida isitib, ularning harorati qanchalik farq qilishini termometrda aniqlash."
        }
      },
      { id: '32', title: "Yoqilg'i energiya va energiya saqlanishi",
        content: {
          theory: `Insoniyat harakat qilish, isinish va mashinalarni yuritish uchun energiyaga muhtoj. Bu energiyaning asosiy manbai — yoqilg'idir. Ko'mir, tabiiy gaz, neft, o'tin — bularning barchasi yonganda o'zidan issiqlik energiyasini chiqaradi. Lekin nima uchun ozgina benzin bir quchoq o'tindan ko'ra ko'proq energiya beradi? Bu moddalarning 'solishtirma yonish issiqligi' (q) deb ataluvchi xossasidir.

Solishtirma yonish issiqligi — 1 kg yoqilg'i to'liq yonganda ajralib chiqadigan issiqlik miqdoridir. Masalan, benzinning bu ko'rsatkichi 46 MJ/kg (million Joul). Bu degani, 1 kg benzin 46 million Joul energiya beradi. Vodorod esa eng yuqori yonish issiqligiga ega bo'lib, kelajakning ekologik toza yoqilg'isi hisoblanadi. Yoqilg'ini to'g'ri tanlash moshinalarning quvvatini va tejamkorligini belgilaydi.

Endi eng muhim qonunga — Energiyaning saqlanish qonuniga kelamiz. Koinotda energiya hech qachon yo'qdan bor bo'lmaydi va boridan yo'qolmaydi, u faqat bir turdan ikkinchi turga o'tadi yoki bir jismdan ikkinchisiga uzatiladi. Masalan, mashina dvigatelida yoqilg'ining kimyoviy energiyasi issiqlik energiyasiga, keyin esa g'ildiraklarning mexanik harakat energiyasiga aylanadi. Oxir-oqibat, ishqalanish tufayli bu energiya yana issiqlik bo'lib atrofga tarqaladi, lekin yo'qolmaydi.

Energiya saqlanish qonuni (Issiqlik balansi tenglamasi) laboratoriya ishlari uchun asosdir. Agar ikkita jism (issiq va sovuq) bir-biriga tegsa, issiq jism bergan issiqlik miqdori sovuq jism olgan issiqlik miqdoriga teng bo'ladi (Q_berilgan = Q_olingan). Bu tenglama orqali biz noma'lum haroratlarni yoki modda turini aniqlay olamiz.

Bugungi dunyoda energiya resurslari cheklangan. Shuning uchun 'Energiya tejamkorligi' global muammoga aylangan. Biz yoqilg'idan olayotgan har bir Joul energiyamizni foydali ishga yo'naltirishimiz kerak. Issiqlik mashinalari (dvigatellar) FIKini oshirish, uylarni izolyatsiya qilish (termos kabi) — bularning barchasi energiya saqlanish qonunini hayotga tatbiq etishdir.

Ushbu yakuniy darsda siz darslikimizning barcha boblarini birlashtiruvchi eng buyuk qonun bilan tanishasiz. Siz energiya koinotning 'valyutasi' ekanligini va uni qanday qilib oqilona sarflash kerakligini tushunasiz. Fizika bizga nafaqat dunyoni o'rganishni, balki uni asrab-avaylashni ham o'rgatadi. Issiqlik — bu faqat olov emas, bu koinotning yashirin quvvatidir. Tajriba o'tkazing: issiq va sovuq suvni aralashtirib, o'rtacha haroratni hisoblang va o'lchang — saqlanish qonunining adolatiga ishonch hosil qilasiz!`,
          formulas: "Yonish issiqligi: Q = q * m. Issiqlik balansi tenglamasi: Q1 + Q2 + ... = 0. Enerigya saqlanishi.",
          experiments: "Kalorimetr yordamida issiq va sovuq suvni aralashtirish hamda issiqlik balansi tenglamasini tekshirish."
        }
      }
];
