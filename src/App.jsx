import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import AdminRoute from './components/Layout/AdminRoute';
import MainLayout from './components/Layout/MainLayout';
import { LanguageProvider } from './context/LanguageContext';
import ErrorBoundary from './components/Common/ErrorBoundary';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Revert to static imports to simplify bundle graph and fix build crash
import LoginPage from './pages/Auth/LoginPage';
import Home from './pages/Home';
import VideoLessons from './pages/VideoLessons';
import Materials from './pages/Materials';
import StudentQuiz from './pages/StudentQuiz';
import Settings from './pages/Settings';
import TextbookPage from './pages/TextbookPage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
        <ThemeProvider>
            <ErrorBoundary>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
                <Route path="/videos" element={<ProtectedRoute><MainLayout><VideoLessons /></MainLayout></ProtectedRoute>} />
                <Route path="/materials" element={<ProtectedRoute><MainLayout><Materials /></MainLayout></ProtectedRoute>} />
                {/* Tests: Take or manage tests */}
                <Route path="/tests" element={<ProtectedRoute><MainLayout><StudentQuiz /></MainLayout></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
                <Route path="/textbook/:chapterId/:lessonId" element={<ProtectedRoute><MainLayout><TextbookPage /></MainLayout></ProtectedRoute>} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          <Toaster position="top-right" />
        </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};



export default App;
