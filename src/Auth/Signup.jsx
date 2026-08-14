// pages/Signup.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaLock, FaPhone,
  FaEye, FaEyeSlash, FaArrowLeft, FaCheckCircle
} from "react-icons/fa";
import "../css/Auth.css";

function Signup() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    setValidationError("");

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.match(/[a-z]/)) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^a-zA-Z0-9]/)) score++;

  const strengthMap = {
    0: { message: "Weak", color: "#ff6b6b" },
    1: { message: "Weak", color: "#ff6b6b" },
    2: { message: "Fair", color: "#ffd93d" },
    3: { message: "Good", color: "#6bcb77" },
    4: { message: "Strong", color: "#4d96ff" },
    5: { message: "Very Strong", color: "#6bcb77" }
  };

  const strength = strengthMap[score] || { message: "", color: "" };

  setPasswordStrength({
    score,
    message: strength.message,
    color: strength.color
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(""); // ✅ Clear old errors
    setSuccess(false);

    // ✅ Validation with error messages
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters long!");
      return;
    }

    if (!formData.agreeTerms) {
      setValidationError("Please agree to the Terms & Conditions!");
      return;
    }

    // ONLY ONE API CALL - Auth Context ka register
    const { ...registerData } = formData;
    const result = await register(registerData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        if (result.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      }, 2000);
    }
  };

  return (
    <section className="auth-section signup-section">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-75">
          <div className="col-lg-6 col-md-8 col-11">
            <div className="auth-card signup-card">
              <Link to="/" className="back-link">
                <FaArrowLeft /> Back to Home
              </Link>

              <div className="auth-header">
                <div className="auth-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join us and start shopping today</p>
              </div>

              {success && (
                <div className="auth-success">
                  <FaCheckCircle />
                  Account created successfully! Redirecting...
                </div>
              )}

              {/* ✅ Validation Error Show */}
              {validationError && (
                <div className="auth-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {validationError}
                </div>
              )}

              {/* ✅ Backend Error from Auth Context */}
              {error && !validationError && (
                <div className="auth-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-group">
                      <label>
                        <FaUser className="input-icon" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <FaEnvelope className="input-icon" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <FaPhone className="input-icon" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <FaLock className="input-icon" />
                        Password
                      </label>
                      <div className="password-wrapper">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Min 8 characters"
                          required
                        />
                        <button
                          type="button"
                          className="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="password-strength">
                          <div className="strength-bar">
                            <div
                              className="strength-fill"
                              style={{
                                width: `${(passwordStrength.score / 5) * 100}%`,
                                background: passwordStrength.color
                              }}
                            ></div>
                          </div>
                          <span style={{ color: passwordStrength.color }}>
                            {passwordStrength.message}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        <FaLock className="input-icon" />
                        Confirm Password
                      </label>
                      <div className="password-wrapper">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          className="toggle-password"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="checkbox-label terms-check">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                      />
                      <span>
                        I agree to the <Link to="/terms">Terms & Conditions</Link> and
                        <Link to="/privacy"> Privacy Policy</Link>
                      </span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="auth-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus"></i>
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>or sign up with</span>
              </div>

              <div className="social-login">
                <button className="social-btn google">
                  <i className="fab fa-google"></i> Google
                </button>
                <button className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i> Facebook
                </button>
              </div>

              <div className="auth-footer">
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;