import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/signup.module.css';
import signupImage from '../../assets/images/signup.jpg';
import { auth, googleProvider } from '../../firebase/config';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({ google: false, apple: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) newErrors.terms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Google Sign-In Handler

const handleGoogleSignup = async () => {
  setSocialLoading((prev) => ({ ...prev, google: true }));

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;

    // IMPORTANT: send ID token to backend (backend verifies it)
    const idToken = await fbUser.getIdToken();

    const response = await fetch("http://localhost:5000/api/users/social-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    // Avoid "Unexpected token <" if backend sends HTML
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : { message: await response.text() };

    if (!response.ok) {
      throw new Error(data.message || "Google signup failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    dispatch(setUser({ user: data.user, token: data.token }));

    window.location.href = "/home";
  } catch (error) {
    console.error("Google signup error:", error);
    setErrors({ submit: error.message || "Google signup failed. Please try again." });
  } finally {
    setSocialLoading((prev) => ({ ...prev, google: false }));
  }
};


  // Apple Sign-In Handler
  const handleAppleSignup = async () => {
    setSocialLoading(prev => ({ ...prev, apple: true }));
    
    try {
      if (typeof window !== 'undefined' && window.AppleID) {
        const data = await window.AppleID.auth.signIn();
        
        const userData = {
          name: data.user?.name ? `${data.user.firstName} ${data.user.lastName}` : 'Apple User',
          email: data.user?.email || '',
          authProvider: 'apple',
          appleId: data.user?.id
        };
        
        const response = await fetch('http://localhost:5000/api/users/social-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        
        const responseData = await response.json();
        
        if (response.ok) {
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('user', JSON.stringify(responseData.user));
          dispatch(setUser({ user: responseData.user, token: responseData.token }));
          alert('Welcome! Your account has been created successfully with Apple!');
          window.location.href = '/home';
        } else {
          throw new Error(responseData.message || 'Apple signup failed');
        }
      } else {
        throw new Error('Apple Sign-In is not available on this device/browser');
      }
    } catch (error) {
      console.error('Apple signup error:', error);
      setErrors({ submit: error.message || 'Apple signup failed. Please try again.' });
    } finally {
      setSocialLoading(prev => ({ ...prev, apple: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });
      
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          firebaseUid: userCredential.user.uid
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(setUser({ user: data.user, token: data.token }));
        
        alert('Welcome! Your account has been created successfully!');
        window.location.href = '/home';
      } else {
        setErrors({ submit: data.message || 'Signup failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: error.message || 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className="container-fluid h-100 p-0">
        <div className="row g-0 h-100">

          {/* Left Column - Form Section */}
          <div className={`col-12 col-lg-6 d-flex align-items-start ${styles.formSection}`}>
            <div className={styles.formWrapper}>
              
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.logoContainer}>
                  <h1 className={styles.logo}>
                    <i className="bi bi-cup-hot-fill"></i>
                    Delicacies
                  </h1>
                </div>
                <h2 className={styles.title}>Create Your Account</h2>
                <p className={styles.subtitle}>
                  Join thousands of food lovers and start your culinary journey
                </p>
              </div>

              {/* Form */}
              <form className={styles.signupForm} onSubmit={handleSubmit}>
                
                {/* Name Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    <i className="bi bi-person me-2"></i>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name" 
                    required
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

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
                      placeholder="Create a strong password" 
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

                {/* Confirm Password Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    <i className="bi bi-shield-check me-2"></i>
                    Confirm Password
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password" 
                      required
                    />
                    <button 
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                </div>

                {/* Terms Agreement */}
                <div className={styles.checkboxGroup}>
                  <input 
                    className={styles.checkbox}
                    type="checkbox" 
                    id="terms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <label className={styles.checkboxLabel} htmlFor="terms">
                    I agree to the <a href="/terms" target="_blank">Terms of Service</a> and{' '}
                    <a href="/privacy" target="_blank">Privacy Policy</a>
                  </label>
                  {errors.terms && <span className={styles.errorText}>{errors.terms}</span>}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>
                      Create Account
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
                  <button 
                    type="button" 
                    className={`${styles.socialBtn} ${styles.google}`}
                    onClick={handleGoogleSignup}
                    disabled={socialLoading.google || socialLoading.apple}
                  >
                    {socialLoading.google ? (
                      <span className="spinner-border spinner-border-sm me-2" />
                    ) : (
                      <i className="bi bi-google me-2"></i>
                    )}
                    Google
                  </button>
                  <button 
                    type="button" 
                    className={`${styles.socialBtn} ${styles.apple}`}
                    onClick={handleAppleSignup}
                    disabled={socialLoading.apple || socialLoading.google}
                  >
                    {socialLoading.apple ? (
                      <span className="spinner-border spinner-border-sm me-2" />
                    ) : (
                      <i className="bi bi-apple me-2"></i>
                    )}
                    Apple
                  </button>
                </div>

                {/* Sign In Link */}
                <div className={styles.signinLink}>
                  <p>
                    Already have an account?{' '}
                    <a href="/signin" className={styles.link}>
                      Sign In
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
                src={signupImage} 
                alt="Delicious culinary experience" 
                className={styles.signupImage}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <h3>Join Our Culinary Community</h3>
                  <p>Discover amazing recipes, connect with fellow food lovers, and elevate your cooking skills</p>
                  <div className={styles.features}>
                    <div className={styles.feature}>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>1000+ Premium Recipes</span>
                    </div>
                    <div className={styles.feature}>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Expert Cooking Tips</span>
                    </div>
                    <div className={styles.feature}>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Community Support</span>
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
