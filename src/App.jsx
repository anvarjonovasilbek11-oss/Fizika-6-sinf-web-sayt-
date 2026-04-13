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

// Use lazy loading to isolate module scopes and fix build binding errors
const LoginPage = React.lazy(() => import('./pages/Auth/LoginPage'));
const Home = React.lazy(() => import('./pages/Home'));
const VideoLessons = React.lazy(() => import('./pages/VideoLessons'));
const Materials = React.lazy(() => import('./pages/Materials'));
const StudentQuiz = React.lazy(() => import('./pages/StudentQuiz'));
const Settings = React.lazy(() => import('./pages/Settings'));
const TextbookPage = React.lazy(() => import('./pages/TextbookPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
        <ThemeProvider>
            <ErrorBoundary>
              <React.Suspense fallback={<LoadingSpinner />}>
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
              </React.Suspense>
            </ErrorBoundary>
          <Toaster position="top-right" />
        </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};


export default App;
