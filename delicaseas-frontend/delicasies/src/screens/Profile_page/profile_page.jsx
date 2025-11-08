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

  // ✅ Small Auth Check Improvement
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && !token) {
      navigate("/welcome"); // redirect guest users to welcome page
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(clearUser());
    navigate("/"); // Redirect to welcome page
  };

  return (
    <div className={styles.pageContainer}>
      <Container fluid className={styles.fullWidthContainer}>
        <NavbarComponent />
        <Row>
          {/* LEFT SIDEBAR */}
          <Col
            className={`${styles.sidebar} d-flex flex-column justify-content-start mt-3`}
          >
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

              <div className="ms-3 text-start">
                <h4 className="fw-bold mb-1">{user.name}</h4>
                <p className="text-muted mb-2">{user.email}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Sidebar Options */}
            <div className={styles.menu}>
              <button
                className={styles.menuItem}
                onClick={() => navigate("/saved-recipes")}
              >
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
            <div className="mt-4 text-center">
              <Button
                variant="danger"
                className="w-75 mb-5"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </div>
          </Col>

          {/* Divider */}
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
    </div>
  );
}
