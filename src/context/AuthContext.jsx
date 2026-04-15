import React, { createContext, useContext, useState } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';

const AuthContext = createContext();

// Faqat admin oldindan belgilangan
const ADMIN_USER = { 
  username: import.meta.env.VITE_ADMIN_USER || "Asilbek", 
  password: import.meta.env.VITE_ADMIN_PASS || "asilbek0921", 
  name: import.meta.env.VITE_ADMIN_USER || "Asilbek", 
  role: "admin" 
};

// LocalStorage'dan foydalanuvchilar ro'yxatini olish
const getInitialUsers = () => {
  try {
    const saved = localStorage.getItem('users');
    const users = saved ? JSON.parse(saved) : [ADMIN_USER];
    // Admin har doim ro'yxatda bo'lsin
    const hasAdmin = users.some(u => u.role === 'admin');
    if (!hasAdmin) return [ADMIN_USER, ...users];
    return users;
  } catch {
    return [ADMIN_USER];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useSessionStorage('currentUser', null);
  const [users, setUsers] = useState(getInitialUsers);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (usernameToDelete) => {
    // Admin cannot be deleted
    if (usernameToDelete === ADMIN_USER.username) return false;
    const updatedUsers = users.filter(u => u.username !== usernameToDelete);
    saveUsers(updatedUsers);
    return true;
  };

  const login = (username, password, targetRole = 'student', bio = '') => {
    if (!username.trim() || !password.trim()) {
      return { success: false, message: "Ism va parolni kiriting" };
    }

    const trimmedUsername = username.trim();

    // Admin tekshiruvi (faqat admin tabida bo'lganda)
    if (targetRole === 'admin') {
      if (trimmedUsername === ADMIN_USER.username && password === ADMIN_USER.password) {
        setUser(ADMIN_USER);
        return { success: true };
      } else {
        return { success: false, message: "Admin ma'lumotlari noto'g'ri!" };
      }
    }

    // Foydalanuvchi tekshiruvi (student role)
    // Endi admin ismi bilan bir xil ismga ruxsat beramiz, lekin ular student role bo'ladi
    
    // Mavjud foydalanuvchini qidirish
    const existingUser = users.find(
      u => u.username.toLowerCase() === trimmedUsername.toLowerCase() && u.role === 'student'
    );

    if (existingUser) {
      if (existingUser.password === password) {
        setUser(existingUser);
        return { success: true };
      } else {
        // Agar parol xato bo'lsa, bu boshqa odam bo'lishi mumkin (yoki parolni unutgan)
        return { success: false, message: "Bu ism uchun parol noto'g'ri! Iltimos, o'z parolingizni kiriting." };
      }
    } else {
      // Yangi foydalanuvchi (Avtomatik ro'yxatdan o'tish)
      const newUser = {
        username: trimmedUsername,
        password: password,
        name: trimmedUsername,
        bio: bio,
        role: "student",
        regDate: new Date().toLocaleDateString('uz-UZ'),
        createdAt: new Date().toISOString()
      };
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
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
