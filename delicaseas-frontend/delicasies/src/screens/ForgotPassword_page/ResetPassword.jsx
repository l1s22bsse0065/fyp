import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/ForgotPassword.module.css";
export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${userId}`, { password });
      alert("Password reset successful! Please login.");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.page} container-fluid`}>
      <div className={styles.background}></div>

      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className={`${styles.formContainer} shadow-lg`}>
            <header className={styles.logo}>
              <h1 className="m-0">Delicacies</h1>
            </header>

            <h2 className={styles.heading}>Reset Password</h2>
            <p className={styles.subtitle}>Enter your new password below.</p>

            <form className={styles.forgotForm} onSubmit={handleReset}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">New Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} btn w-100`}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <p className="mt-3">
              <a href="/signin" className={styles.link}>← Back to Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
