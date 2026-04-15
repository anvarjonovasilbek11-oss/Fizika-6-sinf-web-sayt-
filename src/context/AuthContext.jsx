import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const ADMIN_USER = { 
  username: import.meta.env.VITE_ADMIN_USER || "Asilbek", 
  password: import.meta.env.VITE_ADMIN_PASS || "asilbek0921", 
  name: import.meta.env.VITE_ADMIN_USER || "Asilbek", 
  role: "admin" 
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useSessionStorage('currentUser', null);
  const [users, setUsers] = useState([ADMIN_USER]);

  // Firebase Firestore dan foydalanuvchilarni real-vaqtda olish
  useEffect(() => {
    // Agar Firebase API key bo'lmasa, ogohlantirish (faqat dev-da yoki bir marta)
    if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'your_api_key') {
      console.warn("Firebase API key topilmadi! .env faylni to'ldiring.");
      // LocalStorage fallback (ixtiyoriy, lekin yaxshiroq)
      const saved = localStorage.getItem('users');
      if (saved) setUsers(JSON.parse(saved));
      return;
    }

    const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersList = snapshot.docs.map(doc => doc.data());
      // Admin har doim ro'yxatda bo'lsin (agar Cloud-da bo'lmasa)
      const hasAdmin = usersList.some(u => u.username === ADMIN_USER.username && u.role === 'admin');
      if (!hasAdmin) {
        setUsers([ADMIN_USER, ...usersList]);
      } else {
        setUsers(usersList);
      }
    });

    return () => unsub();
  }, []);

  const saveToCloud = async (userData) => {
    try {
      await setDoc(doc(db, 'users', `${userData.username}-${userData.role}`), userData);
    } catch (err) {
      console.error("Cloud-ga saqlashda xato:", err);
      // Agar kishi oflayn bo'lsa yoki Firebase sozlanmagan bo'lsa
      localStorage.setItem('users', JSON.stringify([...users, userData]));
    }
  };

  const deleteUser = async (usernameToDelete) => {
    // Admin cannot be deleted
    if (usernameToDelete === ADMIN_USER.username) return false;
    
    try {
      // Bizda faqat studentlarni o'chirish imkoniyati (xozircha)
      await deleteDoc(doc(db, 'users', `${usernameToDelete}-student`));
      return true;
    } catch (err) {
      return false;
    }
  };

  const login = async (username, password, targetRole = 'student', bio = '') => {
    if (!username.trim() || !password.trim()) {
      return { success: false, message: "Ism va parolni kiriting" };
    }

    const trimmedUsername = username.trim();

    // 1. MASTER ADMIN CHECK
    if (trimmedUsername.toLowerCase() === ADMIN_USER.username.toLowerCase() && password === ADMIN_USER.password) {
      setUser(ADMIN_USER);
      return { success: true };
    }

    // 2. STUDENT CHECK
    const existingUser = users.find(
      u => u.username.toLowerCase() === trimmedUsername.toLowerCase() && u.role === 'student'
    );

    if (existingUser) {
      if (existingUser.password === password) {
        setUser(existingUser);
        return { success: true };
      } else {
        return { success: false, message: "Parol noto'g'ri! Iltimos, o'z parolingizni kiriting." };
      }
    } else {
      // Yangi foydalanuvchi (Student)
      const newUser = {
        username: trimmedUsername,
        password: password,
        name: trimmedUsername,
        bio: bio,
        role: "student",
        regDate: new Date().toLocaleDateString('uz-UZ'),
        createdAt: new Date().toISOString()
      };
      
      await saveToCloud(newUser);
      setUser(newUser);
      return { success: true, isNew: true };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, users, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
