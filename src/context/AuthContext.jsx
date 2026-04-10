import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

// Faqat admin oldindan belgilangan
const ADMIN_USER = { username: "Asilbek", password: "asilbek0921", name: "Asilbek", role: "admin" };

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
  const [user, setUser] = useLocalStorage('currentUser', null);
  const [users, setUsers] = useState(getInitialUsers);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const login = (username, password) => {
    if (!username.trim() || !password.trim()) {
      return { success: false, message: "Ism va parolni kiriting" };
    }

    // Admin tekshiruvi (case-sensitive)
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      setUser(ADMIN_USER);
      return { success: true };
    }

    // Mavjud foydalanuvchini qidirish (harflar farqi yo'q)
    const existingUser = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.role !== 'admin'
    );

    if (existingUser) {
      // Foydalanuvchi mavjud — parolni tekshir
      if (existingUser.password === password) {
        setUser(existingUser);
        return { success: true };
      } else {
        return { success: false, message: "Parol noto'g'ri! Avval kirgan parolingizni ishlating." };
      }
    } else {
      // Yangi foydalanuvchi — avtomatik ro'yxatdan o'tkazish
      const newUser = {
        username: username.trim(),
        password: password,
        name: username.trim(),
        role: "student",
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
    <AuthContext.Provider value={{ user, login, logout, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
