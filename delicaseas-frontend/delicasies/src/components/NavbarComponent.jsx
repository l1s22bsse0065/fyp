import { Navbar, Nav, Container, Button } from "react-bootstrap";
import styles from "../styles/homepage.module.css"; 
import heroImg from "../assets/images/signup.jpg"; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavbarComponent = () => {
  return (
    <Navbar sticky="top" expand="lg" className={`py-3 ${styles.navbarWrapper}`} bg="light">
      <Container>
        <Navbar.Brand href="/" className={styles.navbarBrand}>
          <img src={heroImg} alt="logo" height="40" className={`${styles.footerLogo} me-2`} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`mx-auto ${styles.navLinks}`}>
            <Nav.Link href="/home" className={styles.navLink}>Home</Nav.Link>
            <Nav.Link href="/recipes" className={styles.navLink}>Recipes</Nav.Link>
            <Nav.Link href="/cooking-tips" className={styles.navLink}>Cooking Tips</Nav.Link>
            <Nav.Link href="/about" className={styles.navLink}>About Us</Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            <Button variant="outline-dark" className={styles.customButton} href="/chatbot">CHEFBOT</Button>
            <Button variant="dark" className={styles.subscribeButton}>Subscribe</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
