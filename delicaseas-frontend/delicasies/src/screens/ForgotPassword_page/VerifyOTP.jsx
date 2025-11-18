import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/ForgotPassword.module.css";
export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        userId,
        otp: otp.trim(),
      });

      alert("OTP verified successfully!");
      navigate(`/reset-password/${res.data.userId}`, { state: { userId: res.data.userId } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid OTP");
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

            <h2 className={styles.heading}>Verify OTP</h2>
            <p className={styles.subtitle}>Enter the OTP sent to your email.</p>

            <form className={styles.forgotForm} onSubmit={handleVerify}>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label fw-bold">OTP</label>
                <input
                  type="text"
                  id="otp"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} btn w-100`}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
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
