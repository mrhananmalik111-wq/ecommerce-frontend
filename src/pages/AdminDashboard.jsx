// pages/AdminDashboard.jsx
import { useState } from "react";
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

  // ✅ PRODUCTS STATE (with all fields)
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: "Wireless Headphones", 
      description: "High quality wireless headphones",
      price: 199.99, 
      stock: 45, 
      image: "https://tse4.mm.bing.net/th/id/OIP.TI_BJL9G8bDCEIbETmXWzQHaHa?r=0&pid=Api&h=220&P=0100",
      category: "Electronics"
    },
    { 
      id: 2, 
      name: "Smart Watch", 
      description: "Latest smart watch with health features",
      price: 299.99, 
      stock: 12, 
      image: "https://www.skg.com/cdn/shop/products/skg-v7-pro-smart-watch-with-alexa-built-in-bluetooth-callanswermake-call-604781.jpg?v=1677051256&width=100",
      category: "Electronics"
    },
    { 
      id: 3, 
      name: "Phone Case", 
      description: "Premium leather phone case",
      price: 29.99, 
      stock: 0, 
      image: "https://i5.walmartimages.com/seo/Coquette-Bow-Phone-Case-for-iPhone-11-Cute-Pink-Ribbon-Bow-Aesthetic-Case-for-Women-Girls-with-Bracelet-Chain-Pink_d2dc96d9-f645-423f-a153-ad7518b280a1.61966cdefdad0568f0c621d4320d1280.jpeg?w=100",
      category: "Accessories"
    }
  ]);

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

  // ✅ HANDLERS

  // Open Add Modal
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  // Open Edit Modal
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  // ✅ SAVE PRODUCT (Add/Update)
  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      // ✅ Update existing
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, id: p.id }
          : p
      ));
      alert("✅ Product updated successfully!");
    } else {
      // ✅ Add new
      const newProduct = {
        id: Date.now(),
        ...formData
      };
      setProducts([...products, newProduct]);
      alert("✅ Product added successfully!");
    }
    setIsProductModalOpen(false);
  };

  // Open Delete Modal
  const handleDeleteProduct = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  // ✅ CONFIRM DELETE
  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== deletingProduct.id));
    alert("✅ Product deleted successfully!");
    setIsDeleteModalOpen(false);
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

              {/* ✅ Products Section with CRUD */}
              {activeSection === "products" && (
                <div className="admin-table-wrapper">
                  <div className="table-header">
                    <h4>Products ({products.length})</h4>
                    <button className="btn-add" onClick={handleAddProduct}>
                      <FaPlus /> Add Product
                    </button>
                  </div>
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
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="product-thumb" 
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{product.stock}</td>
                          <td>{product.category}</td>
                          <td>
                            <span className={`badge-${
                              product.stock > 10 ? "success" : 
                              product.stock > 0 ? "warning" : "danger"
                            }`}>
                              {product.stock > 10 ? "In Stock" : 
                               product.stock > 0 ? "Low Stock" : "Out of Stock"}
                            </span>
                          </td>
                          <td className="action-buttons">
                            <button 
                              className="btn-action edit"
                              onClick={() => handleEditProduct(product)}
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="btn-action delete"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

      <ProductModal
        key={editingProduct?.id || 'new'}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        isEditing={!!editingProduct}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={deletingProduct?.name}
      />
    </>
  );
}

export default AdminDashboard;