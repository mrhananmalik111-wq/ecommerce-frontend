// contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
 const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        JSON.parse(userData); // Validate JSON
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login - uses your backend endpoint
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/users/loginUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // Store user data
        const userData = {
          _id: data.data._id,
          fullName: data.data.fullName,
          email: data.data.email,
          phone: data.data.phone || '',
          role: data.data.role || 'user',
          avatar: data.data.avatar || '',
          address: data.data.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          },
          joinDate: data.data.createdAt || new Date().toLocaleDateString()
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        return { success: true, user: userData };
      } else {
        // ✅ Handle specific error cases
        if (data.message?.includes('expired') || data.message?.includes('token')) {
          alert('Your session has expired. Please login again.');
          navigate('/login');
        } else {
          setError(data.message || 'Login failed');
          return { success: false, error: data.message };
        }
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };


  // ✅ Register - uses your backend endpoint
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/users/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        const newUser = {
          _id: data.data._id,
          fullName: data.data.fullName,
          email: data.data.email,
          phone: data.data.phone || '',
          role: data.data.role || 'user',
          avatar: data.data.avatar || '',
          address: data.data.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          },
          joinDate: data.data.createdAt || new Date().toLocaleDateString()
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(newUser));

        return { success: true, user: newUser };
      } else {
        setError(data.message || 'Registration failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    const isConfirm = window.confirm('Are you sure you want to logout?');
    if (!isConfirm) return;
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // ✅ Update user profile
  const updateUser = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      const data = await response.json();

      if (data.success) {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      isAuthenticated,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

