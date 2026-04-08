import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {username: "ali", password: "1234", name: "Ali Karimov", age: 12, class: "6A", role: "student"},
  {username: "zulfiya", password: "1234", name: "Zulfiya Rahimova", age: 11, class: "6B", role: "student"},
  {username: "Asilbek", password: "asilbek0921", name: "Asilbek", role: "admin"}
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('currentUser', null);
  const [users, setUsers] = useLocalStorage('users', DEFAULT_USERS);

  const login = (username, password) => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: "Username yoki parol noto'g'ri" };
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
