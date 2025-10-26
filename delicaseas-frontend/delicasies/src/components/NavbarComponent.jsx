import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import heroImg from "../assets/images/signup.jpg";
import styles from "../styles/navbar.module.css";

const NavbarComponent = () => {
  const user = useSelector((state) => state.user.user);

  const logout = useLogout(); 
 

  return (
    <Navbar expand="lg" sticky="top" className={styles.navbarWrapper}>
      <Container fluid className="px-3">
        {/* Brand */}
        <Navbar.Brand href="/home" className={styles.navbarBrand}>
          <img src={heroImg} alt="logo" className={styles.navImg} />
          <span className={styles.brandText}>Delicacies</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarNavDropdown"
          className={styles.toggleButton}
        />

        <Navbar.Collapse id="navbarNavDropdown">
          {/* Center Links */}
          <Nav className={`mx-auto ${styles.navLinks}`}>
            {["home", "recipes", "cooking-tips", "about-us"].map((path, i) => (
              <NavLink
                key={i}
                to={`/${path}`}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                {path
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </NavLink>
            ))}
          </Nav>

          {/* Right Side Buttons + Profile */}
          <div
            className={`d-flex align-items-center gap-2 ${styles.rightSection}`}
          >
            <Button
              variant="outline-light"
              className={styles.outlineBtn}
              href="/chatbot"
            >
              CHEFBOT
            </Button>
            <Button className={styles.primaryBtn}>Subscribe</Button>

            <NavDropdown
  align="end"
  className={styles.profileDropdownWrapper}
  title={
    <div className={styles.profileToggle}>
      {user?.profilePicture ? (
        <img
          src={user.profilePicture}
          alt="User Avatar"
          className={styles.profileAvatar}
        />
      ) : (
        <i className="bi bi-person-circle"></i> // Guest icon
      )}
    </div>
  }
  id="profile-dropdown"
>
  <div className={styles.profileHeader}>
    <img
      src={user?.profilePicture || "/default-profile.png"}
      alt="User Avatar"
      className={styles.dropdownAvatar}
    />
    <div>
      <h6 className={styles.dropdownName}>
        {user?.name || "Guest User"}
      </h6>
      <p className={styles.dropdownEmail}>
        {user?.email || "guest@example.com"}
      </p>
    </div>
  </div>

  <div className="dropdown-divider"></div>

  {user ? (
    <>
      <NavDropdown.Item as={NavLink} to="/profile">
        View Profile
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/edit-profile">
        Edit Profile
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/saved-recipes">
        Saved Recipes
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/my-recipes">
        My Recipes
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
    </>
  ) : (
    <>
      <NavDropdown.Item as={NavLink} to="/signin">
        Sign In
      </NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/signup">
        Sign Up
      </NavDropdown.Item>
    </>
  )}
</NavDropdown>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
