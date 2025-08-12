import React from 'react';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignIn() {
  return (
    <div className={`${styles.page} container-fluid`}>
      {/* Background Image */}
      <div className={styles.background}></div>

      {/* Flex container to center form vertically + horizontally */}
      <div className="row vh-100 justify-content-center align-items-center ">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className={`${styles.formContainer} shadow-lg`}>
             <div className={styles.logo}>
              <h1>Delicacies</h1>
            </div>

            <h2 className={styles.heading}>good to see you back</h2>

            <form className={styles.signinForm}>
              {/* Email */}
              <label htmlFor="email">Enter Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
              />

              {/* Password */}
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
              />

              {/* Remember Me + Forgot Password */}
              <div className={`${styles.options} d-flex justify-content-between`}>
                <label className="mb-0">
                  <input type="checkbox" className="me-1" /> Remember me
                </label>
                <a href="/forgot-password">Forgot password?</a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className={`${styles.signinButton} btn btn-success w-100 mt-3`}
              >
                Sign In
              </button>

              {/* Sign Up Link */}
              <p className={`${styles.signupLink} mt-3`}>
                Don’t have an account? <a href="/">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
