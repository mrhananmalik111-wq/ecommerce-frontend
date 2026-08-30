// components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Badge,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { CATEGORIES } from "../constants/categories";
function AppNavbar() {
  const [show, setShow] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
   
   
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  const token = localStorage.getItem('token');
  return token ? true : false;
  });
    

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
   const isConfirm = window.confirm('Are you sure you want to logout?');
   if(!isConfirm) return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  // ✅ Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return '';
    return user.fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // ✅ Get avatar display
  const getAvatarDisplay = () => {
    if (user?.avatar) {
      return <img src={user.avatar} alt="Profile" className="user-avatar" />;
    }
    return <span className="user-initials">{getUserInitials()}</span>;
  };

  return (
    <>
      <Navbar expand="lg" bg="black" className="navbar-custom">
        <Container>

          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 brand-logo">
            <i className="fas fa-store me-2"></i>ShopMart
          </Navbar.Brand>

          <Navbar.Toggle
            onClick={() => setShow(true)}
            aria-controls="offcanvasNavbar"
            className="border-0"
          />

          <Navbar.Collapse className="justify-content-between">
            <Nav className="mx-auto fw-semibold nav-links">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/shop">Shop</Nav.Link>

              <NavDropdown title="Categories" className="category-dropdown">
                {CATEGORIES.map((category)=> (
                  <NavDropdown.Item  key={category.id} as={Link} to={`/category/${category.id}`}>{category.name}</NavDropdown.Item>
                ))}
              </NavDropdown>

              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3">

              <Form className="d-flex search-box">
                <FormControl
                  type="search"
                  placeholder="Search..."
                  className="search-input"
                />
                <Button variant="warning" className="search-btn">
                  <FaSearch />
                </Button>
              </Form>

              <Link to="/wishlist" className="icon-box">
                <FaHeart size={22} />
              </Link>

              <Link to="/cart" className="icon-box position-relative">
                <FaShoppingCart size={22} />
                <Badge bg="danger" pill className="cart-badge">
                  2
                </Badge>
              </Link>

              {/* ✅ User Icon with Avatar */}
              <div
                className="icon-box user-icon-wrapper"
                ref={menuRef}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {isLoggedIn && user ? (
                  <div className="user-avatar-container">
                    {getAvatarDisplay()}
                  </div>
                ) : (
                  <FaUser size={22} />
                )}

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="user-dropdown">
                    {isLoggedIn && user ? (
                      <>
                        <div className="dropdown-user-info">
                          <div className="dropdown-avatar">
                            {getAvatarDisplay()}
                          </div>
                          <div>
                            <div className="dropdown-username">{user.fullName}</div>
                            <div className="dropdown-useremail">{user.email}</div>
                          </div>
                        </div>
                        <div className="dropdown-divider"></div>
                        
                        <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-user"></i> My Profile
                        </Link>
                        
                        <Link to="/orders" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-shopping-bag"></i> My Orders
                        </Link>
                        
                        <Link to="/wishlist" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-heart"></i> Wishlist
                        </Link>

                        {user.role === 'admin' && (
                          <Link to="/admin" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                            <i className="fas fa-user-cog"></i> Admin Dashboard
                          </Link>
                        )}
                        
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item logout-btn" onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-sign-in-alt"></i> Login
                        </Link>
                        <Link to="/signup" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <i className="fas fa-user-plus"></i> Signup
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="start"
        className="mobile-offcanvas"
      >
        <Offcanvas.Header closeButton className="offcanvas-header">
          <Offcanvas.Title className="brand-logo">
            <i className="fas fa-store me-2"></i>ShopMart
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="offcanvas-body">
          <Nav className="flex-column gap-2">
            <Nav.Link as={Link} to="/" onClick={() => setShow(false)}>
              <i className="fas fa-home me-2"></i>Home
            </Nav.Link>
            <Nav.Link as={Link} to="/shop" onClick={() => setShow(false)}>
              <i className="fas fa-shopping-bag me-2"></i>Shop
            </Nav.Link>

            <NavDropdown title="Categories" className="mobile-dropdown">
              <NavDropdown.Item as={Link} to="/category/fashion" onClick={() => setShow(false)}>
                <i className="fas fa-tshirt me-2"></i>Fashion
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/shoes" onClick={() => setShow(false)}>
                <i className="fas fa-shoe-prints me-2"></i>Shoes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/mobiles" onClick={() => setShow(false)}>
                <i className="fas fa-mobile-alt me-2"></i>Mobiles
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/about" onClick={() => setShow(false)}>
              <i className="fas fa-info-circle me-2"></i>About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setShow(false)}>
              <i className="fas fa-envelope me-2"></i>Contact
            </Nav.Link>

            <hr className="my-3" />

            {isLoggedIn && user ? (
              <>
                <div className="mobile-user-info">
                  <div className="mobile-avatar">
                    {getAvatarDisplay()}
                  </div>
                  <div>
                    <div className="mobile-username">{user.fullName}</div>
                    <div className="mobile-useremail">{user.email}</div>
                  </div>
                </div>
                <hr className="my-2" />
                <Nav.Link as={Link} to="/profile" onClick={() => setShow(false)}>
                  <i className="fas fa-user me-2"></i>My Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/orders" onClick={() => setShow(false)}>
                  <i className="fas fa-shopping-bag me-2"></i>My Orders
                </Nav.Link>
                <Nav.Link as={Link} to="/wishlist" onClick={() => setShow(false)}>
                  <i className="fas fa-heart me-2"></i>Wishlist
                </Nav.Link>
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin" onClick={() => setShow(false)}>
                    <i className="fas fa-user-cog me-2"></i>Admin Dashboard
                  </Nav.Link>
                )}
                <Nav.Link onClick={() => {
                  setShow(false);
                  handleLogout();
                }}>
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setShow(false)}>
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={() => setShow(false)}>
                  <i className="fas fa-user-plus me-2"></i>Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AppNavbar;