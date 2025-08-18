import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/signup.module.css';
import signupImage from '../../assets/images/signup.jpg';

export default function Signup() {
  return (
    <div className={`container-fluid vh-100 ${styles.page} p-0`}>
      <div className="row g-0 h-100">

        {/* Left Column */}
        <div className={`col-12 col-md-6 d-flex justify-content-center align-items-center p-0 ${styles.formSection}`}>

          <div className="w-100 px-3 px-md-5" style={{ maxWidth: '500px' }}>
            
            {/* Logo */}
            <div className="text-center mb-3">
              <h1 className="fw-bold" style={{ fontFamily: "'Courier New', monospace" }}>
                Delicacies
              </h1>
            </div>

            {/* Heading */}
            <h2 className="text-center mb-4 fw-semibold">Get Started</h2>

            {/* Form */}
            <form className="d-flex flex-column gap-3 ">
              {/* Name */}
              <div>
                <label htmlFor="name" className="form-label fw-bold">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  placeholder="Name" 
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="form-label fw-bold">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Email" 
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="form-label fw-bold">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Password" 
                />
              </div>

              {/* Terms checkbox */}
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="terms" 
                />
                <label className="form-check-label small" htmlFor="terms">
                  I agree to the terms & conditions
                </label>
              </div>

              {/* Sign Up button */}
              <button type="submit" className="btn btn-success w-100 fw-bold">
                Sign Up
              </button>

              {/* Social sign-in buttons */}
              <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
                <button type="button" className={`btn ${styles.socialBtn} w-100 fw-semibold`}>
                  Sign in with Google
                </button>
                <button type="button" className={`btn ${styles.socialBtn} w-100 fw-semibold`}>
                  Sign in with Apple
                </button>
              </div>



              {/* Login link */}
              <div className="text-center mt-3">
                <p className="mb-0">
                  Already have an account?{' '}
                  <a href="/signin" className="fw-bold text-decoration-none text-primary">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-12 col-md-6 ">
          <img 
            src={signupImage} 
            alt="Signup visual" 
            className="img-fluid vh-100 w-100" 
            style={{ objectFit: 'cover', opacity: 0.9 }} 
          />
        </div>
      </div>
    </div>
  );
}
