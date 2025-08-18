import React from 'react';
import styles from '../../styles/signin.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignIn() {
  return (
    <div className={`${styles.page} container-fluid`}>
      {/* Background image */}
      <div className={styles.background}></div>

      {/* Centered row */}
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className={`${styles.formContainer} shadow-lg`}>
            
            {/* Brand / Logo */}
            <header className={styles.logo}>
              <h1 className="m-0">Delicacies</h1>
            </header>

            {/* Page heading */}
            <h2 className={styles.heading}>Good to see you back</h2>

            {/* Sign In Form */}
            <form className={styles.signinForm}>
              
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Enter Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Enter Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="form-control"
                  required
                />
              </div>

              {/* Remember Me + Forgot Password */}
              <div className={`${styles.options} d-flex justify-content-between align-items-center mb-3`}>
                <label className="mb-0 d-flex align-items-center">
                  <input type="checkbox" className="me-2" /> Remember me
                </label>
                <a href="/forgot-password" className={styles.link}>Forgot password?</a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className={`${styles.signinButton} btn w-100`}
              >
                Sign In
              </button>

              {/* Sign Up Link */}
              <p className={`${styles.signupLink} mt-3`}>
                Don’t have an account? <a href="/home" className={styles.link}>Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
