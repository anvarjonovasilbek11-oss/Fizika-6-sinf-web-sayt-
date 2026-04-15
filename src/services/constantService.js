const STORAGE_KEY = 'physical_constants';

const INITIAL_CONSTANTS = [
  { id: '1', name_uz: "Erkin tushish tezlanishi", name_ru: "Ускорение свободного падения", name_en: "Acceleration of gravity", symbol: "g", value: "9.806", unit: "m/s²" },
  { id: '2', name_uz: "Gravitatsiya doimiysi", name_ru: "Гравитационная постоянная", name_en: "Gravitational constant", symbol: "G", value: "6.674 × 10⁻¹¹", unit: "N·m²/kg²" },
  { id: '3', name_uz: "Yorug'lik tezligi", symbol: "c", name_ru: "Скорость света", name_en: "Speed of light", value: "299,792,458", unit: "m/s" },
  { id: '4', name_uz: "Avogadro doimiysi", symbol: "N_A", name_ru: "Постоянная Авогадро", name_en: "Avogadro constant", value: "6.022 × 10²³", unit: "mol⁻¹" },
  { id: '5', name_uz: "Universal gaz doimiysi", symbol: "R", name_ru: "Универсальная газовая постоянная", name_en: "Universal gas constant", value: "8.314", unit: "J/(mol·K)" },
  { id: '6', name_uz: "Plank doimiysi", symbol: "h", name_ru: "Постоянная Планка", name_en: "Planck constant", value: "6.626 × 10⁻³⁴", unit: "J·s" },
  { id: '7', name_uz: "Boltsman doimiysi", symbol: "k_B", name_ru: "Постоянная Больцмана", name_en: "Boltzmann constant", value: "1.380 × 10⁻²³", unit: "J/K" },
  { id: '8', name_uz: "Stefan-Boltsman doimiysi", symbol: "σ", name_ru: "Постоянная Стефана-Больцмана", name_en: "Stefan-Boltzmann constant", value: "5.670 × 10⁻⁸", unit: "W/(m²·K⁴)" },
  { id: '9', name_uz: "Elektron massasi", symbol: "m_e", name_ru: "Масса электрона", name_en: "Electron mass", value: "9.109 × 10⁻³¹", unit: "kg" },
  { id: '10', name_uz: "Proton massasi", symbol: "m_p", name_ru: "Масса протона", name_en: "Proton mass", value: "1.672 × 10⁻²⁷", unit: "kg" },
  { id: '11', name_uz: "Neutron massasi", symbol: "m_n", name_ru: "Масса нейтрона", name_en: "Neutron mass", value: "1.674 × 10⁻²⁷", unit: "kg" },
  { id: '12', name_uz: "Elementar zaryad", symbol: "e", name_ru: "Элементарный заряд", name_en: "Elementary charge", value: "1.602 × 10⁻¹⁹", unit: "C" },
  { id: '13', name_uz: "Vakuum dielektrik doimiysi", symbol: "ε₀", name_ru: "Диэлектрическая постоянная вакуума", name_en: "Vacuum permittivity", value: "8.854 × 10⁻¹²", unit: "F/m" },
  { id: '14', name_uz: "Vakuum magnit doimiysi", symbol: "μ₀", name_ru: "Магнитная постоянная вакуума", name_en: "Vacuum permeability", value: "1.256 × 10⁻⁶", unit: "N/A²" },
  { id: '15', name_uz: "Vaqt birligi (Sekund)", symbol: "t", name_ru: "Единица времени (Секунда)", name_en: "Unit of time (Second)", value: "1", unit: "s" },
  { id: '16', name_uz: "Massa birligi (Kilogram)", symbol: "m", name_ru: "Единица массы (Килограмм)", name_en: "Unit of mass (Kilogram)", value: "1", unit: "kg" },
  { id: '17', name_uz: "Normal atmosfera bosimi", symbol: "P_atm", name_ru: "Нормальное атмосферное давление", name_en: "Standard atmospheric pressure", value: "101,325", unit: "Pa" },
  { id: '18', name_uz: "Faradey doimiysi", symbol: "F", name_ru: "Постоянная Фарадея", name_en: "Faraday constant", value: "96,485", unit: "C/mol" },
  { id: '19', name_uz: "Bor radiusi", symbol: "a₀", name_ru: "Боровский радиус", name_en: "Bohr radius", value: "5.291 × 10⁻¹¹", unit: "m" },
  { id: '20', name_uz: "Ridberg doimiysi", symbol: "R∞", name_ru: "Постоянная Ридберга", name_en: "Rydberg constant", value: "1.097 × 10⁷", unit: "m⁻¹" },
  { id: '21', name_uz: "Vin doimiysi", symbol: "b", name_ru: "Постоянная Вина", name_en: "Wien constant", value: "2.897 × 10⁻³", unit: "m·K" },
  { id: '22', name_uz: "Atom massa birligi", symbol: "u", name_ru: "Единица атомной массы", name_en: "Atomic mass unit", value: "1.660 × 10⁻²⁷", unit: "kg" },
  { id: '23', name_uz: "Quyosh doimiysi", symbol: "S", name_ru: "Солнечная постоянная", name_en: "Solar constant", value: "1,361", unit: "W/m²" },
  { id: '24', name_uz: "Yer massasi", symbol: "M_E", name_ru: "Масса Земли", name_en: "Earth mass", value: "5.972 × 10²⁴", unit: "kg" },
  { id: '25', name_uz: "Yer radiusi", symbol: "R_E", name_ru: "Радиус Земли", name_en: "Earth radius", value: "6,371", unit: "km" }
];

export const getConstants = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONSTANTS));
    return INITIAL_CONSTANTS;
  }
  return JSON.parse(saved);
};

export const saveConstant = (constant) => {
  const constants = getConstants();
  const index = constants.findIndex(c => c.id === constant.id);
  
  if (index > -1) {
    constants[index] = constant;
  } else {
    constants.push({ ...constant, id: Date.now().toString() });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(constants));
  window.dispatchEvent(new Event('storage'));
  return true;
};

export const deleteConstant = (id) => {
  const constants = getConstants();
  const filtered = constants.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('storage'));
  return true;
};
