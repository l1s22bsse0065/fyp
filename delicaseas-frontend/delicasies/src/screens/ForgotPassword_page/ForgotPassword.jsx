import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/ForgotPassword.module.css";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert("OTP sent to your email");
      navigate("/verify-otp", { state: { userId: res.data.userId } });
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

            <h2 className={styles.heading}>Forgot your password?</h2>
            <p className={styles.subtitle}>Enter your email to receive an OTP to reset your password.</p>

            <form className={styles.forgotForm} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} btn w-100`}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
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
