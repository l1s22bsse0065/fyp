import React from 'react';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className={`container-fluid ${styles.page}`}>
      <div className="row g-0 h-100">

        {/* Left Column */}
        <div className={`col-12 col-md-6 d-flex justify-content-center align-items-center ${styles.left}`}>
          <div className={styles.formWrapper}>
            <div className={styles.logo}>
              <h1>Delicacies</h1>
            </div>

            <h1 className={styles.heading}>Get Started</h1>

            <form className={styles.signupForm}>
              <label htmlFor="name">Name</label>
              <input type="text" placeholder="Name" />

              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Email" />

              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" />

              <div className={styles.checkbox}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I agree to the terms & conditions</label>
              </div>

              <button className={styles.signupButton} type="submit">Sign Up</button>

              <div className={styles.accountButtons}>
                <button type="button">Sign in with Google</button>
                <button type="button">Sign in with Apple</button>
              </div>

              <div className={styles.loginLink}>
                <p>Already have an account? <a href="/login">Login</a></p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className={`col-12 col-md-6 ${styles.right}`}>
          <img src="/images/signup.jpg" alt="Signup visual" />
        </div>

      </div>
    </div>
  );
}
