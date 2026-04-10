import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import AdminRoute from './components/Layout/AdminRoute';
import MainLayout from './components/Layout/MainLayout';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load pages
const LoginPage = React.lazy(() => import('./pages/Auth/LoginPage'));
const Home = React.lazy(() => import('./pages/Home'));
const VideoLessons = React.lazy(() => import('./pages/VideoLessons'));
const Materials = React.lazy(() => import('./pages/Materials'));
const AIQuiz = React.lazy(() => import('./pages/AIQuiz'));
const StudentQuiz = React.lazy(() => import('./pages/StudentQuiz'));
const Settings = React.lazy(() => import('./pages/Settings'));
const TextbookPage = React.lazy(() => import('./pages/TextbookPage'));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
        <ThemeProvider>
          <React.Suspense fallback={
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-dark-bg">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
              <Route path="/videos" element={<ProtectedRoute><MainLayout><VideoLessons /></MainLayout></ProtectedRoute>} />
              <Route path="/materials" element={<ProtectedRoute><MainLayout><Materials /></MainLayout></ProtectedRoute>} />
              {/* Admin only: Test generation and management */}
              <Route path="/quiz" element={<AdminRoute><MainLayout><AIQuiz /></MainLayout></AdminRoute>} />
              {/* Students: Take approved tests only */}
              <Route path="/tests" element={<ProtectedRoute><MainLayout><StudentQuiz /></MainLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
              <Route path="/textbook/:chapterId/:lessonId" element={<ProtectedRoute><MainLayout><TextbookPage /></MainLayout></ProtectedRoute>} />
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </React.Suspense>
          <Toaster position="top-right" />
        </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
