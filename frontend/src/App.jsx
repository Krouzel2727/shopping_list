import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import ListDetail from './pages/ListDetail';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';


const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return children;
};

function AppContent() {
  const { token } = useAuth();
  
  return (
    <div className="min-vh-100 bg-light">
      {token && <Navigation />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/list/:id" element={
          <ProtectedRoute>
            <ListDetail />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;