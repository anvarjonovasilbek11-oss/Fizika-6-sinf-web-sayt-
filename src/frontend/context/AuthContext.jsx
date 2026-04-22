import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { db } from '../../backend/services/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const ADMIN_USER = { 
  username: "Asilbek", 
  password: "asilbek" + "0921", 
  name: "Asilbek", 
  role: "admin" 
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useSessionStorage('currentUser', null);
  
  // LocalStorage-dan dastlabki foydalanuvchilarni olish
  const getInitialUsers = () => {
    try {
      const backup = localStorage.getItem('backup_users');
      if (backup) {
        const parsed = JSON.parse(backup);
        // Admin yo'q bo'lsa qo'shish
        if (!parsed.some(u => u.username === ADMIN_USER.username)) {
          return [ADMIN_USER, ...parsed];
        }
        return parsed;
      }
    } catch (e) {
      console.error("Backup yuklashda xato:", e);
    }
    return [ADMIN_USER];
  };

  const [users, setUsers] = useState(getInitialUsers);

  // Firebase Firestore dan foydalanuvchilarni real-vaqtda olish
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersList = snapshot.docs.map(doc => doc.data());
      
      // Admin har doim ro'yxatda bo'lsin
      const hasAdmin = usersList.some(u => u.username === ADMIN_USER.username && u.role === 'admin');
      const finalUsers = !hasAdmin ? [ADMIN_USER, ...usersList] : usersList;
      
      setUsers(finalUsers);
      // LocalStorage-ga zaxira saqlash (persistency uchun)
      localStorage.setItem('backup_users', JSON.stringify(finalUsers));
    });

    return () => unsub();
  }, []);

  const saveToCloud = async (userData) => {
    // Avval mahalliy holatni yangilaymiz (UX uchun)
    const updatedUsers = [...users.filter(u => u.username !== userData.username), userData];
    setUsers(updatedUsers);
    localStorage.setItem('backup_users', JSON.stringify(updatedUsers));

    try {
      await setDoc(doc(db, 'users', `${userData.username}-${userData.role}`), userData);
    } catch (err) {
      console.error("Cloud-ga saqlashda xato:", err);
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
        return { success: false, message: "Ism yoki parol xato" };
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
