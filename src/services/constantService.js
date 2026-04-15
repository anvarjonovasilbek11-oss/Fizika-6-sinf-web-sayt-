const STORAGE_KEY = 'physical_constants';

const INITIAL_CONSTANTS = [
  { id: '1', name_uz: "Erkin tushish tezlanishi", name_ru: "Ускорение свободного падения", name_en: "Acceleration of gravity", symbol: "g", value: "9.806", unit: "m/s²" },
  { id: '2', name_uz: "Gravitatsiya doimiysi", name_ru: "Гравитационная постоянная", name_en: "Gravitational constant", symbol: "G", value: "6.674 × 10⁻¹¹", unit: "N·m²/kg²" },
  { id: '3', name_uz: "Yorug'lik tezligi", symbol: "c", name_ru: "Скорость света", name_en: "Speed of light", value: "299,792,458", unit: "m/s" },
  { id: '4', name_uz: "Avogadro doimiysi", symbol: "N_A", name_ru: "Постоянная Авогадро", name_en: "Avogadro constant", value: "6.022 × 10²³", unit: "mol⁻¹" },
  { id: '5', name_uz: "Vaqt birligi (Sekund)", symbol: "t", name_ru: "Единица времени (Секунда)", name_en: "Unit of time (Second)", value: "1", unit: "s" },
  { id: '6', name_uz: "Massa birligi (Kilogram)", symbol: "m", name_ru: "Единица массы (Килограмм)", name_en: "Unit of mass (Kilogram)", value: "1", unit: "kg" },
  { id: '7', name_uz: "Elektron massasi", symbol: "m_e", name_ru: "Масса электрона", name_en: "Electron mass", value: "9.109 × 10⁻³¹", unit: "kg" }
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
