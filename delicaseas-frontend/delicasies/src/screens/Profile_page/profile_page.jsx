import React, { useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import styles from "../../styles/profile.module.css";
import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && !token) {
      navigate("/welcome");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div
        className={`d-flex vh-100 justify-content-center align-items-center ${styles.loadingContainer}`}
      >
        <div className={styles.modernSpinner}>
          <div className={styles.spinnerInner}></div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className={styles.pageContainer}>
      <Container fluid className={styles.fullWidthContainer}>
        <NavbarComponent />

        <div className={styles.modernProfileWrapper}>
          <Row className="g-0">
            {/* LEFT SIDEBAR */}
            <Col lg={5} className={styles.modernSidebar}>
              <div className={styles.profileCard}>
                {/* Profile Header */}
                <div className={styles.modernProfileHeader}>
                  <div className={styles.modernAvatarWrapper}>
                    <Image
                      src={user.profilePicture || "/default-profile.png"}
                      className={styles.modernAvatar}
                    />
                    <button className={styles.modernCameraBtn}>
                      <i className="bi bi-camera-fill"></i>
                    </button>
                    <div className={styles.avatarGlow}></div>
                  </div>

                  <div className={styles.modernUserInfo}>
                    <h3 className={styles.modernUserName}>{user.name}</h3>
                    <p className={styles.modernUserEmail}>{user.email}</p>
                    <Button
                      className={styles.modernEditBtn}
                      onClick={() => navigate("/edit-profile")}
                    >
                      <i className="bi bi-pencil-square me-2"></i>
                      Edit Profile
                    </Button>
                  </div>
                </div>

                {/* Navigation Menu */}
                <div className={styles.modernMenu}>
                  <button
                    className={styles.modernMenuItem}
                    onClick={() => navigate("/saved-recipes")}
                  >
                    <div className={styles.menuIcon}>
                      <i className="bi bi-heart-fill"></i>
                    </div>
                    <span className={styles.menuText}>Your Favourites</span>
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>

                  <button
                    className={styles.modernMenuItem}
                    onClick={() => navigate("/subscribe")}
                  >
                    <div className={styles.menuIcon}>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <span className={styles.menuText}>Subscription</span>
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>

                  <button className={styles.modernMenuItem}>
                    <div className={styles.menuIcon}>
                      <i className="bi bi-globe2"></i>
                    </div>
                    <span className={styles.menuText}>Languages</span>
                    <i className="bi bi-chevron-right ms-auto"></i>
                  </button>
                </div>

                {/* Logout Button */}
                <div className={styles.modernLogoutSection}>
                  <Button
                    className={styles.modernLogoutBtn}
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sign Out
                  </Button>
                </div>
              </div>
            </Col>

            {/* RIGHT CONTENT */}
            <Col lg={7} className={styles.modernRightContent}>
              <div className={styles.modernWelcomeCard}>
                <div className={styles.welcomeHeader}>
                  <div className={styles.welcomeIcon}>
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <h2 className={styles.welcomeTitle}>
                    Hello, {user.name}! 👋
                  </h2>
                </div>

                <div className={styles.welcomeContent}>
                  <p className={styles.welcomeText}>
                    Welcome to your personal dashboard. Here, you can manage
                    your profile, track your cooking journey, and discover
                    amazing recipes tailored just for you.
                  </p>

                  <div className={styles.quickStats}>
                    <div className={styles.statItem}>
                      <div className={styles.statIcon}>
                        <i className="bi bi-heart-fill"></i>
                      </div>
                      <div className={styles.statInfo}>
                        <span className={styles.statNumber}>12</span>
                        <span className={styles.statLabel}>Favorites</span>
                      </div>
                    </div>

                    <div className={styles.statItem}>
                      <div className={styles.statIcon}>
                        <i className="bi bi-clock-history"></i>
                      </div>
                      <div className={styles.statInfo}>
                        <span className={styles.statNumber}>8</span>
                        <span className={styles.statLabel}>Recent</span>
                      </div>
                    </div>

                    <div className={styles.statItem}>
                      <div className={styles.statIcon}>
                        <i className="bi bi-trophy-fill"></i>
                      </div>
                      <div className={styles.statInfo}>
                        <span className={styles.statNumber}>3</span>
                        <span className={styles.statLabel}>Achievements</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <FooterSection />
      </Container>
    </div>
  );
}
