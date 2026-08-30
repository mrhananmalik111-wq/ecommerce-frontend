// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';

// ============================================
// ✅ Protected Route Component - FIXED
// ============================================
const ProtectedRoute = ({ children, adminOnly = false }) => {
  // ✅ Use the auth context instead of localStorage directly
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin only route
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

// ============================================
// ✅ App Component - FIXED (removed duplicate routes)
// ============================================
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />

          {/* Protected Routes - Only once each */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;