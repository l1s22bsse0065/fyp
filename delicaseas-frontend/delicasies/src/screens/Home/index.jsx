import React from 'react';
import styles from './styles.module.css';

export default function Home() {
  return (
    <div className={styles.page}>

      {/* Left Column - Signup */}
    <div className={styles.left}>
        
      {/* Logo Section */}
      <div className={styles.logo}>
          <h1>Delicacies</h1>
      </div>

      {/* Heading */}
      <div className={styles.heading}>
          <h1>Get Started</h1>
      </div>

       

         

        {/* Signup Form */}
       
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
         <div className={styles.signupButton}>
           <button type="submit">Sign Up</button>
         </div>

         <div className={styles.accountButtons}>
           <button type="submit">Sign in with Google</button>
           <button type="submit">Sign in with Apple</button>
         </div>

          <div className={styles.loginLink}>
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
</form>


        
      </div>

      {/* Right Column - Image */}
      <div className={styles.right}>
        <img src="/images/signup.jpg" alt="Signup visual" />
      </div>
    </div>
  );
}
