// pages/AdminDashboard.jsx
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaBox, FaShoppingCart, FaDollarSign,
  FaChartLine, FaPlus, FaEye, FaEdit, FaTrash,
  FaUserCog, FaClipboardList, FaHome
} from "react-icons/fa";
import "../css/AdminDashboard.css";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // ✅ MODAL STATES
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // ✅ PRODUCTS STATE
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ GET ALL PRODUCTS
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/getAllProducts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('📦 Fetch Response:', data); // ✅ DEBUG
      
      if (response.ok) {
        // ✅ SAFE ACCESS
        const productList = data.products || data.data || [];
        setProducts(productList);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);
    useEffect(() => {
    fetchProducts();
  },[fetchProducts]);

  // ✅ CREATE PRODUCT - FIXED
  const createProduct = async (saveData, imageFiles) => {
    try {
      const formData = new FormData();
      
      Object.keys(saveData).forEach(key => {
        formData.append(key, saveData[key]);
      });
      
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach(file => {
          formData.append('images', file);
        });
      }

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/createProduct', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log('📦 Create Response:', data); // ✅ DEBUG

      if (response.ok) {
        // ✅ SAFE ACCESS - Check multiple response structures
        const newProduct = data.product || data.data;
        
        if (newProduct && newProduct._id) {
          setProducts(prev => [...prev, newProduct]);
          alert('✅ Product created successfully!');
          return true;
        } else {
          // ✅ Agar product object nahi aaya toh bhi success
          console.warn('⚠️ Product created but no product object in response');
          alert('✅ Product created successfully! (Refresh to see)');
          await fetchProducts(); // ✅ Refresh list
          return true;
        }
      } else {
        alert(data.message || 'Failed to create product');
        return false;
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Something went wrong!');
      return false;
    }
  };

  // ✅ UPDATE PRODUCT - FIXED
  const updateProduct = async (id, saveData, imageFiles) => {
    try {
      const formData = new FormData();
      
      Object.keys(saveData).forEach(key => {
        formData.append(key, saveData[key]);
      });
      
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach(file => {
          formData.append('images', file);
        });
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/updateProduct/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log('📦 Update Response:', data); // ✅ DEBUG

      if (response.ok) {
        const updatedProduct = data.product || data.data;
        if (updatedProduct && updatedProduct._id) {
          setProducts(prev => prev.map(p => 
            p._id === id ? updatedProduct : p
          ));
        }
        alert('✅ Product updated successfully!');
        return true;
      } else {
        alert(data.message || 'Failed to update product');
        return false;
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Something went wrong!');
      return false;
    }
  };

  // ✅ DELETE PRODUCT - FIXED
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('📦 Delete Response:', data); // ✅ DEBUG

      if (response.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
        alert('✅ Product deleted successfully!');
        return true;
      } else {
        alert(data.message || 'Failed to delete product');
        return false;
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Something went wrong!');
      return false;
    }
  };

  // ✅ HANDLE SAVE
  const handleSaveProduct = async (saveData, imageFiles) => {
    console.log('💾 Saving product:', saveData, imageFiles); // ✅ DEBUG
    
    let success = false;
    console.log(success);
    if (editingProduct && editingProduct._id) {
      success = await updateProduct(editingProduct._id, saveData, imageFiles);
    } else {
      success = await createProduct(saveData, imageFiles);
    }
    
    if (success) {
      setIsProductModalOpen(false);
      setEditingProduct(null);
      await fetchProducts();
    }
  };

  // ✅ HANDLE DELETE
  const handleDeleteClick = (product) => {
    if (product && product._id) {
      setDeletingProduct(product);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (deletingProduct && deletingProduct._id) {
      await deleteProduct(deletingProduct._id);
      setIsDeleteModalOpen(false);
      setDeletingProduct(null);
    }
  };

  // ✅ HANDLE EDIT
  const handleEditClick = (product) => {
    if (product) {
      setEditingProduct(product);
      setIsProductModalOpen(true);
    }
  };

  // ✅ HANDLE ADD
  const handleAddClick = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  // Stats Data
  const stats = [
    { icon: FaUsers, label: "Total Users", value: "1,248", change: "+12%", color: "#4d96ff" },
    { icon: FaBox, label: "Total Products", value: products.length, change: "+8%", color: "#6bcb77" },
    { icon: FaShoppingCart, label: "Total Orders", value: "342", change: "+15%", color: "#ffd93d" },
    { icon: FaDollarSign, label: "Total Revenue", value: "$45,678", change: "+22%", color: "#ff6b6b" }
  ];

  // Recent Orders
  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", amount: "$156.00", status: "Delivered", date: "2025-01-20" },
    { id: "#ORD-002", customer: "Jane Smith", amount: "$89.00", status: "Processing", date: "2025-01-19" },
    { id: "#ORD-003", customer: "Mike Johnson", amount: "$234.50", status: "Shipped", date: "2025-01-18" },
    { id: "#ORD-004", customer: "Sarah Wilson", amount: "$67.00", status: "Pending", date: "2025-01-18" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      "Delivered": "success",
      "Processing": "warning",
      "Shipped": "info",
      "Pending": "secondary",
      "In Stock": "success",
      "Low Stock": "warning",
      "Out of Stock": "danger"
    };
    return colors[status] || "secondary";
  };

  return (
    <>
      <section className="admin-section">
        <div className="container">
          <div className="admin-wrapper">
            {/* Sidebar */}
            <div className="admin-sidebar">
              <div className="admin-header">
                <FaUserCog size={30} />
                <h3>Admin Panel</h3>
              </div>
              <nav className="admin-menu">
                <button
                  className={`menu-item ${activeSection === "dashboard" ? "active" : ""}`}
                  onClick={() => setActiveSection("dashboard")}
                >
                  <FaChartLine /> Dashboard
                </button>
                <button
                  className={`menu-item ${activeSection === "products" ? "active" : ""}`}
                  onClick={() => setActiveSection("products")}
                >
                  <FaBox /> Products
                </button>
                <button
                  className={`menu-item ${activeSection === "orders" ? "active" : ""}`}
                  onClick={() => setActiveSection("orders")}
                >
                  <FaClipboardList /> Orders
                </button>
                <button
                  className={`menu-item ${activeSection === "users" ? "active" : ""}`}
                  onClick={() => setActiveSection("users")}
                >
                  <FaUsers /> Users
                </button>
                <Link to="/" className="menu-item back-link">
                  <FaHome /> Back to Store
                </Link>
              </nav>
            </div>

            <div className="admin-content">
              {/* Dashboard */}
              {activeSection === "dashboard" && (
                <>
                  <div className="admin-stats">
                    {stats.map((stat, index) => (
                      <div key={index} className="stat-card">
                        <div className="stat-icon" style={{ background: stat.color }}>
                          <stat.icon />
                        </div>
                        <div className="stat-info">
                          <h4>{stat.value}</h4>
                          <p>{stat.label}</p>
                          <span className="stat-change positive">{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="admin-table-wrapper">
                    <div className="table-header">
                      <h4>Recent Orders</h4>
                      <Link to="/admin/orders" className="btn-view-all">View All</Link>
                    </div>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr key={index}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.date}</td>
                            <td>{order.amount}</td>
                            <td>
                              <span className={`badge-${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* ✅ Products Section */}
              {activeSection === "products" && (
                <div className="admin-table-wrapper">
                  <div className="table-header">
                    <h4>Products ({products.length})</h4>
                    <button className="btn-add" onClick={handleAddClick}>
                      <FaPlus /> Add Product
                    </button>
                  </div>
                  {loading ? (
                    <div className="loading">Loading products...</div>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="no-data">No products found</td>
                          </tr>
                        ) : (
                          products.map((product) => (
                            <tr key={product._id}>
                              <td>
                                {product.images && product.images.length > 0 ? (
                                  <img
                                    src={`http://localhost:5000${product.images[0]}`}
                                    alt={product.name}
                                    className="product-thumb"
                                    // onError={(e) => {
                                    //   e.target.src = 'https://via.placeholder.com/50';
                                    // }}
                                  />
                                ) : (
                                  <div className="no-image">No Image</div>
                                )}
                              </td>
                              <td>{product.name || 'N/A'}</td>
                              <td>${(product.price || 0).toFixed(2)}</td>
                              <td>{product.stock || 0}</td>
                              <td>{product.category || 'N/A'}</td>
                              <td>
                                <span className={`badge-${(product.stock || 0) > 10 ? "success" :
                                    (product.stock || 0) > 0 ? "warning" : "danger"
                                  }`}>
                                  {(product.stock || 0) > 10 ? "In Stock" :
                                    (product.stock || 0) > 0 ? "Low Stock" : "Out of Stock"}
                                </span>
                              </td>
                              <td className="action-buttons">
                                <button
                                  className="btn-action edit"
                                  onClick={() => handleEditClick(product)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="btn-action delete"
                                  onClick={() => handleDeleteClick(product)}
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Orders */}
              {activeSection === "orders" && (
                <div className="admin-table-wrapper">
                  <div className="table-header">
                    <h4>All Orders</h4>
                    <button className="btn-export">Export</button>
                  </div>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.date}</td>
                          <td>{order.amount}</td>
                          <td>
                            <span className={`badge-${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="action-buttons">
                            <button className="btn-action view"><FaEye /></button>
                            <button className="btn-action edit"><FaEdit /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Users */}
              {activeSection === "users" && (
                <div className="admin-table-wrapper">
                  <div className="table-header">
                    <h4>Users</h4>
                    <button className="btn-add"><FaPlus /> Add User</button>
                  </div>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#001</td>
                        <td>John Doe</td>
                        <td>john@example.com</td>
                        <td><span className="badge-admin">Admin</span></td>
                        <td>2025-01-15</td>
                        <td className="action-buttons">
                          <button className="btn-action edit"><FaEdit /></button>
                          <button className="btn-action delete"><FaTrash /></button>
                        </td>
                      </tr>
                      <tr>
                        <td>#002</td>
                        <td>Jane Smith</td>
                        <td>jane@example.com</td>
                        <td><span className="badge-user">User</span></td>
                        <td>2025-01-16</td>
                        <td className="action-buttons">
                          <button className="btn-action edit"><FaEdit /></button>
                          <button className="btn-action delete"><FaTrash /></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ ProductModal */}
      <ProductModal
        key={editingProduct?._id || 'new-product'}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
        isEditing={!!editingProduct}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingProduct(null);
        }}
        onConfirm={confirmDelete}
        productName={deletingProduct?.name}
      />
    </>
  );
}

export default AdminDashboard;