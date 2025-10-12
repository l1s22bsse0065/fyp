import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../slices/userSlice";
import heroImg from "../assets/images/signup.jpg";
import styles from "../styles/navbar.module.css";

const NavbarComponent = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(clearUser());
    navigate("/signin");
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={styles.navbarWrapper}
      bg="light"
    >
      <Container fluid>
        {/* Brand / Logo */}
        <Navbar.Brand href="/home" className={styles.navbarBrand}>
          <img
            src={heroImg}
            alt="logo"
            height="40"
            className={`me-2 ${styles.navimg}`}
          />
          Delicacies
        </Navbar.Brand>

        {/* Mobile toggle button */}
        <Navbar.Toggle aria-controls="navbarNavDropdown" />

        {/* Collapse section for center nav links */}
        <Navbar.Collapse id="navbarNavDropdown">
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
              to="/about-us"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              About Us
            </NavLink>
          </Nav>

          {/* Right side buttons */}
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

        <Nav>
          <NavDropdown
            align="end"
            className={styles.profileDropdownWrapper}
            menuClassName={styles.profileDropdownMenu}
            title={
              <span className="d-flex align-items-center gap-2">
                <span className={styles.profileIconWrapper}>
                  <i className="bi bi-person fs-5"></i>
                </span>
                <span className="d-none d-md-inline">
                  {user?.name || "Guest"}
                </span>
              </span>
            }
            id="profile-dropdown"
          >
            <NavDropdown.Item as={NavLink} to="/profile" className="bg-danger">
              View Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/edit-profile">
              Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
