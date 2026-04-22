import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './frontend/context/AuthContext';
import { ThemeProvider } from './frontend/context/ThemeContext';
import ProtectedRoute from './frontend/components/Layout/ProtectedRoute';
import AdminRoute from './frontend/components/Layout/AdminRoute';
import MainLayout from './frontend/components/Layout/MainLayout';
import { LanguageProvider } from './frontend/context/LanguageContext';
import { AccessibilityProvider } from './frontend/context/AccessibilityContext';
import ErrorBoundary from './frontend/components/Common/ErrorBoundary';
import LoadingSpinner from './frontend/components/Common/LoadingSpinner';

// Revert to static imports to simplify bundle graph and fix build crash
import LoginPage from './frontend/pages/Auth/LoginPage';
import Home from './frontend/pages/Home';
import VideoLessons from './frontend/pages/VideoLessons';
import Materials from './frontend/pages/Materials';
import StudentQuiz from './frontend/pages/StudentQuiz';
import Settings from './frontend/pages/Settings';
import TextbookPage from './frontend/pages/TextbookPage';
import TextbookSelection from './frontend/pages/TextbookSelection';
import ConstantsPage from './frontend/pages/ConstantsPage';
import ProblemSolver from './frontend/pages/ProblemSolver';
import NotFound from './frontend/pages/NotFound';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
        <ThemeProvider>
          <AccessibilityProvider>
            <ErrorBoundary>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
                <Route path="/videos" element={<ProtectedRoute><MainLayout><VideoLessons /></MainLayout></ProtectedRoute>} />
                <Route path="/materials" element={<ProtectedRoute><MainLayout><Materials /></MainLayout></ProtectedRoute>} />
                {/* Tests: Take or manage tests */}
                <Route path="/tests" element={<ProtectedRoute><MainLayout><StudentQuiz /></MainLayout></ProtectedRoute>} />
                <Route path="/constants" element={<ProtectedRoute><MainLayout><ConstantsPage /></MainLayout></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
                <Route path="/darslik" element={<ProtectedRoute><MainLayout><TextbookSelection /></MainLayout></ProtectedRoute>} />
                <Route path="/textbook/:chapterId/:lessonId" element={<ProtectedRoute><MainLayout><TextbookPage /></MainLayout></ProtectedRoute>} />
                <Route path="/solver" element={<ProtectedRoute><MainLayout><ProblemSolver /></MainLayout></ProtectedRoute>} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
            <Toaster position="top-right" />
          </AccessibilityProvider>
        </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};



export default App;
