import React, { useState } from "react";
import styles from "../../styles/signin.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import signinImage from "../../assets/images/signup.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.user) {
          dispatch(setUser({ user: data.user, token: data.token }));
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Success notification
        window.location.replace("/home");
      } else {
        setErrors({ submit: data.message || "Invalid email or password" });
      }
    } catch (error) {
      setErrors({ submit: "Unable to connect to server. Please try again." });
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className="container-fluid h-100 p-0">
        <div className="row g-0 h-100">

          {/* Left Column - Form Section */}
          <div className={`col-12 col-lg-6 d-flex align-items-center ${styles.formSection}`}>
            <div className={styles.formWrapper}>
              
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.logoContainer}>
                  <h1 className={styles.logo}>
                    <i className="bi bi-cup-hot-fill"></i>
                    Delicacies
                  </h1>
                </div>
                <h2 className={styles.title}>Welcome Back!</h2>
                <p className={styles.subtitle}>
                  Sign in to continue your culinary journey with us
                </p>
              </div>

              {/* Form */}
              <form className={styles.signinForm} onSubmit={handleLogin}>
                
                {/* Email Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <i className="bi bi-envelope me-2"></i>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address" 
                    required
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                {/* Password Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="password" className={styles.label}>
                    <i className="bi bi-lock me-2"></i>
                    Password
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password" 
                      required
                    />
                    <button 
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                  {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className={styles.optionsRow}>
                  <div className={styles.checkboxGroup}>
                    <input 
                      className={styles.checkbox}
                      type="checkbox" 
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <label className={styles.checkboxLabel} htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot-password" className={styles.forgotLink}>
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </>
                  )}
                </button>

                {/* Error Display */}
                {errors.submit && (
                  <div className={styles.submitError}>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {errors.submit}
                  </div>
                )}

                {/* Divider */}
                <div className={styles.divider}>
                  <span>or continue with</span>
                </div>

                {/* Social Login Buttons */}
                <div className={styles.socialButtons}>
                  <button type="button" className={`${styles.socialBtn} ${styles.google}`}>
                    <i className="bi bi-google me-2"></i>
                    Google
                  </button>
                  <button type="button" className={`${styles.socialBtn} ${styles.apple}`}>
                    <i className="bi bi-apple me-2"></i>
                    Apple
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className={styles.signupLink}>
                  <p>
                    Don't have an account?{' '}
                    <a href="/signup" className={styles.link}>
                      Sign Up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Image Section */}
          <div className={`col-12 col-lg-6 ${styles.imageSection}`}>
            <div className={styles.imageWrapper}>
              <img 
                src={signinImage} 
                alt="Welcome back to Delicacies" 
                className={styles.signinImage}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <h3>Welcome Back, Chef!</h3>
                  <p>Continue exploring amazing recipes and connecting with our vibrant culinary community</p>
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <div className={styles.statNumber}>50K+</div>
                      <div className={styles.statLabel}>Active Members</div>
                    </div>
                    <div className={styles.stat}>
                      <div className={styles.statNumber}>1000+</div>
                      <div className={styles.statLabel}>Recipes Shared</div>
                    </div>
                    <div className={styles.stat}>
                      <div className={styles.statNumber}>24/7</div>
                      <div className={styles.statLabel}>Community Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
