import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // ✅ import NavLink
import styles from "../styles/homepage.module.css";
import heroImg from "../assets/images/signup.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

const NavbarComponent = () => {
  return (
    <Navbar
      sticky="top"
      expand="lg"
      className={`py-3 ${styles.navbarWrapper}`}
      bg="light"
    >
      <Container>
        <Navbar.Brand href="/home" className={styles.navbarBrand}>
          <img
            src={heroImg}
            alt="logo"
            height="40"
            className={`${styles.footerLogo} me-2`}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`mx-auto ${styles.navLinks}`}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Recipes
            </NavLink>

            <NavLink
              to="/cooking-tips"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Cooking Tips
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              About Us
            </NavLink>
          </Nav>
          <div className="d-flex gap-2">
            <Button
              variant="outline-dark"
              className={styles.customButton}
              href="/chatbot"
            >
              CHEFBOT
            </Button>
            <Button variant="dark" className={styles.subscribeButton}>
              Subscribe
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
