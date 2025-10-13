import React, { useState } from "react";
import styles from "../../styles/signin.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.user) {
          // ✅ Pass both user + token to Redux
          dispatch(setUser({ user: data.user, token: data.token }));
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        window.location.replace("/home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error("Login error:", error);
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

            <h2 className={styles.heading}>Good to see you back</h2>

            <form className={styles.signinForm} onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Enter Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Enter Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="mb-0 d-flex align-items-center">
                  <input type="checkbox" className="me-2" /> Remember me
                </label>
                <a href="/forgot-password" className={styles.link}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`${styles.signinButton} btn w-100`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <p className={`${styles.signupLink} mt-3`}>
                Don’t have an account?{" "}
                <a href="/" className={styles.link}>
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
