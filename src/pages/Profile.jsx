// pages/Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  FaUser, FaEdit, FaSave, FaTimes, FaShoppingBag,
  FaHeart, FaUserCog, FaSignOutAlt
} from "react-icons/fa";
import "../css/Profile.css";

// Helper function to check token expiration
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

function Profile() {
  const { user, logout, updateUser, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  // const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState(() => {
    return user || {}; // Fixed: return user or empty object
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch user data on component mount and when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('No token found, redirecting to login');
        logout();
        window.location.href = '/login';
        return;
      }
      
      if (isTokenExpired(token)) {
        console.log('Token expired, redirecting to login');
        alert('Your session has expired. Please login again.');
        logout();
        window.location.href = '/login';
        return;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/users/getMe', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Authentication failed');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          setFormData(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        if (error.message === 'Authentication failed') {
          alert('Please login again.');
          logout();
          window.location.href = '/login';
        }
      }
    };
    
    if (!user) {
      fetchUserData();
    } else {
      setFormData(user);
    }
  }, [user, logout]);

  // Fetch orders and wishlist when user is available
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    
    // Check token validity before making requests
    if (!token || isTokenExpired(token)) {
      if (isTokenExpired(token)) {
        alert('Your session has expired. Please login again.');
      }
      logout();
      window.location.href = '/login';
      return;
    }

    const fetchUserOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          setOrders(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        // If unauthorized, redirect to login
        if (error.message.includes('401') || error.message.includes('403')) {
          logout();
          window.location.href = '/login';
        }
      }
    };

    const fetchUserWishlist = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/wishlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          setWishlist(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        if (error.message.includes('401') || error.message.includes('403')) {
          logout();
          window.location.href = '/login';
        }
      }
    };

    fetchUserOrders();
    fetchUserWishlist();
  }, [user, logout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateUser(formData);

      if (result.success) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        if (result.error?.includes('expired') || result.error?.includes('token')) {
          alert("Your session has expired. Please login again.");
          logout();
          window.location.href = '/login';
        } else {
          alert("Failed to update profile: " + result.error);
        }
      }
    } catch (error) {
      alert("An unexpected error occurred: " + error.message);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    // The redirect will happen automatically when user state changes
  };

  // Loading state
  if (loading || !user) {
    return <div className="loading-spinner">Loading profile...</div>;
  }

  const getStatusBadge = (status) => {
    const colors = {
      "Delivered": "success",
      "Processing": "warning",
      "Shipped": "info",
      "Cancelled": "danger"
    };
    return colors[status] || "secondary";
  };

  return (
    <section className="profile-section">
      <div className="container">
        <div className="profile-wrapper">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.fullName} />
                ) : (
                  <span>{user.fullName?.charAt(0) || 'U'}</span>
                )}
              </div>
              <h4>{user.fullName}</h4>
              <p className="text-muted">{user.email}</p>
              <span className="role-badge">
                {user.role === "admin" ? "👑 Admin" : "🛒 Customer"}
              </span>
            </div>

            <div className="sidebar-menu">
              <button
                className={`menu-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <FaUser /> My Profile
              </button>
              <button
                className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <FaShoppingBag /> My Orders
                <span className="badge">{orders.length}</span>
              </button>
              <button
                className={`menu-item ${activeTab === "wishlist" ? "active" : ""}`}
                onClick={() => setActiveTab("wishlist")}
              >
                <FaHeart /> Wishlist
                <span className="badge">{wishlist.length}</span>
              </button>
              {user.role === "admin" && (
                <Link to="/admin" className="menu-item admin-link">
                  <FaUserCog /> Admin Dashboard
                </Link>
              )}
              <button className="menu-item logout" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-content">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="profile-card">
                <div className="card-header">
                  <h3><FaUser /> My Profile</h3>
                  {!isEditing ? (
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <button className="btn-cancel" onClick={() => {
                      setIsEditing(false);
                      setFormData(user);
                    }}>
                      <FaTimes /> Cancel
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  <div className="profile-info">
                    <div className="info-row">
                      <label>Full Name</label>
                      <p>{user.fullName}</p>
                    </div>
                    <div className="info-row">
                      <label>Email</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="info-row">
                      <label>Phone</label>
                      <p>{user.phone || 'Not provided'}</p>
                    </div>
                    <div className="info-row">
                      <label>Address</label>
                      <p>
                        {user.address?.street ? (
                          <>
                            {user.address.street},<br />
                            {user.address.city}, {user.address.state} {user.address.zipCode}<br />
                            {user.address.country}
                          </>
                        ) : (
                          'No address provided'
                        )}
                      </p>
                    </div>
                    <div className="info-row">
                      <label>Member Since</label>
                      <p>{user.joinDate || 'N/A'}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.address?.street || ''}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.address?.city || ''}
                          onChange={handleAddressChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.address?.state || ''}
                          onChange={handleAddressChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.address?.zipCode || ''}
                          onChange={handleAddressChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.address?.country || ''}
                          onChange={handleAddressChange}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-save">
                      <FaSave /> Save Changes
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Orders Tab - Dynamic */}
            {activeTab === "orders" && (
              <div className="orders-card">
                <h3><FaShoppingBag /> My Orders</h3>

                {orders.length === 0 ? (
                  <div className="empty-state">
                    <FaShoppingBag size={50} />
                    <h4>No Orders Yet</h4>
                    <p>Start shopping to see your orders here</p>
                    <Link to="/shop" className="btn-shop">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order, index) => (
                      <div key={index} className="order-item">
                        <div className="order-header">
                          <div>
                            <span className="order-id">#{order._id || order.id}</span>
                            <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span className={`badge-${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-body">
                          <div>
                            <span>Items: {order.items?.length || 0}</span>
                            <span>Total: ${order.total}</span>
                          </div>
                          <Link to={`/order/${order._id}`} className="btn-view">
                            View Details →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab - Dynamic */}
            {activeTab === "wishlist" && (
              <div className="wishlist-card">
                <h3><FaHeart /> My Wishlist</h3>

                {wishlist.length === 0 ? (
                  <div className="empty-state">
                    <FaHeart size={50} />
                    <h4>Wishlist is Empty</h4>
                    <p>Save your favorite items here</p>
                    <Link to="/shop" className="btn-shop">Browse Products</Link>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {wishlist.map((item) => (
                      <div key={item._id} className="wishlist-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                          <h5>{item.name}</h5>
                          <p className="price">${item.price}</p>
                          <div className="item-actions">
                            <button className="btn-add-cart">Add to Cart</button>
                            <button className="btn-remove">×</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;