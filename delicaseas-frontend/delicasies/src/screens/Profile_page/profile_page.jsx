import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import styles from "../../styles/profile.module.css"; // create this CSS module

import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/signin";
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          // token invalid / expired
          localStorage.removeItem("token");
          window.location.href = "/signin";
          return;
        }
        const data = await res.json();
        if (!res.ok) {
          console.error("Failed fetching /me:", data);
          window.location.href = "/signin";
          return;
        }
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        window.location.href = "/signin";
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <Container fluid className={`${styles.pageContainer} py-5`}>
      <NavbarComponent />
      <Row>
        {/* LEFT SIDEBAR */}
        <Col
          className={`${styles.sidebar} d-flex flex-column justify-content-start mt-3`}
        >
          {/* Profile Header (Image + Info Side by Side) */}
          <div
            className={`d-flex align-items-center mb-4 ${styles.profileHeader}`}
          >
            <div className={styles.avatarWrapper}>
              <Image
                src={user.profilePicture || "/default-profile.png"}
                roundedCircle
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <button className={styles.cameraBtn}>
                <i className="bi bi-camera-fill"></i>
              </button>
            </div>

            {/* User Info (on right side of profile picture) */}
            <div className="ms-3 text-start">
              <h4 className="fw-bold mb-1">{user.name}</h4>
              <p className="text-muted mb-2">{user.email}</p>
              <Button variant="secondary" size="sm">
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Sidebar Options */}
          <div className={styles.menu}>
            <button className={styles.menuItem}>
              <i className="bi bi-heart"></i> Here’s your Favourites
            </button>
            <button className={styles.menuItem}>
              <i className="bi bi-box-seam"></i> Subscription
            </button>
            <button className={styles.menuItem}>
              <i className="bi bi-globe"></i> Languages
            </button>
          </div>

          {/* Logout Button */}
          <div className="mt-4 text-center ">
            <Button
              variant="danger"
              className="w-75"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                window.location.href = "/signin";
              }}
            >
              LOGOUT
            </Button>
          </div>
        </Col>
        {/* Divider (independent line) */}
        <div className={styles.divider}></div>
        {/* RIGHT CONTENT */}
        <Col
          xs={12}
          md={6}
          className={`${styles.rightContent} d-flex align-items-center mt-3`}
        >
          <div className={`${styles.welcomeBox} p-4`}>
            <h4>Hello {user.name},</h4>
            <p className="text-muted ">
              Welcome to your dashboard. Here, you’ll find everything you need
              to manage your profile, track your progress, and stay productive.
            </p>
          </div>
        </Col>
      </Row>
      <FooterSection />
    </Container>
  );
}
