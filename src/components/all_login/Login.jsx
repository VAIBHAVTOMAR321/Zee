import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../../assets/css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const content = {
    brandSubtitle: "Zee Zero Enterprises - Strategic Innovation & Excellence",
    welcomeTitle: "Welcome Back!",
    welcomeSubtitle: "Login to your corporate account",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your corporate email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter Password",
    rememberMe: "Remember me",
    signIn: "Sign In",
    signingIn: "Signing in...",
    needAccess: "Need account access? ",
    contactAdmin: "Contact Administration",
    errors: {
      emailRequired: "Email address is required",
      passwordRequired: "Password is required",
      loginFailed: "Login failed. Please try again.",
      loginSuccess: "Login successful!"
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError(content.errors.emailRequired);
      return;
    }
    if (!formData.password) {
      setError(content.errors.passwordRequired);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        password: formData.password,
        email_or_phone: formData.email,
        role: 'admin',
      };

      const response = await axios.post(
        'https://mahadevaaya.com/zeeproject/zeeproject_backend/api/login/',
        payload
      );

      if (response.data.access) {
        login({
          access: response.data.access,
          refresh: response.data.refresh,
          role: response.data.role,
          unique_id: response.data.unique_id,
          user: response.data.user || null,
        });
        alert(content.errors.loginSuccess);

        if (response.data.role === 'admin') {
          navigate('/DirectorDashboard');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || content.errors.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-pattern"></div>
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <div className="brand-logo">
              <i className="bi bi-briefcase-fill"></i>
            </div>
            <h1>Login</h1>
            <p>{content.brandSubtitle}</p>
          </div>

          <div className="welcome-section">
            <h2>{content.welcomeTitle}</h2>
            <p>{content.welcomeSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="alert-message error">
                <i className="bi bi-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label>{content.emailLabel}</label>
              <div className="input-wrapper-text">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={content.emailPlaceholder}
                />
              </div>
            </div>

            <div className="form-group">
              <label>{content.passwordLabel}</label>
              <div className="input-wrapper">
                <i className="bi bi-lock"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={content.passwordPlaceholder}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>{content.rememberMe}</span>
              </label>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {content.signingIn}
                </>
              ) : (
                content.signIn
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>{content.needAccess}<Link to="/contact">{content.contactAdmin}</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;