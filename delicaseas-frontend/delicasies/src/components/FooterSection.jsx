import { Container } from "react-bootstrap";
import styles from "../styles/footer.module.css";
import heroImg from "../assets/images/signup.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

const FooterSection = () => {
  return (
    <footer className={styles.footerSection}>
      <Container
        fluid
        className="d-flex flex-column flex-md-row justify-content-between align-items-center py-2 "
      >
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <img
            src={heroImg}
            alt="logo"
            height="40"
            className={`${styles.footerLogo} me-2`}
          />
          <span className="fw-bold text-white">Delicases</span>
        </div>

        <div className={styles.footerLinks}>
          <a href="/home" className="text-white mx-2 text-decoration-none">
            Home
          </a>
          <a href="/recipes" className="text-white mx-2 text-decoration-none">
            Recipes
          </a>
          <a
            href="/cooking-tips"
            className="text-white mx-2 text-decoration-none"
          >
            Cooking Tips
          </a>
          <a href="/about" className="text-white mx-2 text-decoration-none">
            About Us
          </a>
        </div>

        <div className={styles.footerIcons}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            <i className="bi bi-twitter"></i>
          </a>
        </div>
      </Container>
      <div className="text-center text-white py-2 small">
        © 2025 Flavory. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
