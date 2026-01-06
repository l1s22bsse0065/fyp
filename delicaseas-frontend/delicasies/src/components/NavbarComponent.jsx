import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import heroImg from "../assets/images/signup.jpg";
import styles from "../styles/navbar.module.css";
import { useState, useEffect } from "react"; // Add useEffect

const NavbarComponent = () => {
  const user = useSelector((state) => state.user.user);
  const logout = useLogout();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust threshold
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { path: "home", icon: "bi-house-door", label: "Home" },
    { path: "recipes", icon: "bi-book", label: "Recipes" },
    { path: "cooking-tips", icon: "bi-lightbulb", label: "Cooking Tips" },
    { path: "about-us", icon: "bi-info-circle", label: "About Us" },
  ];

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`${styles.navbarWrapper} ${
        scrolled ? styles.navScrolled : ""
      }`}
    >
      <Container fluid className="px-3">
        {/* Brand with Enhanced Design */}
        <Navbar.Brand href="/home" className={styles.navbarBrand}>
          <div className={styles.logoWrapper}>
            <img src={heroImg} alt="logo" className={styles.navImg} />
            <div className={styles.logoPulse}></div>
          </div>
          <div className={styles.brandContent}>
            <span className={styles.brandText}>Delicacies</span>
            <span className={styles.brandTagline}>Taste the Elegance</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarNavDropdown"
          className={styles.toggleButton}
        >
          <span className={styles.toggleIcon}></span>
          <span className={styles.toggleIcon}></span>
          <span className={styles.toggleIcon}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarNavDropdown">
          {/* Center Links with Icons */}
          <Nav className={`mx-auto ${styles.navLinks}`}>
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={`/${item.path}`}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                <i className={`bi ${item.icon} ${styles.navIcon}`}></i>
                <span>{item.label}</span>
                <span className={styles.navUnderline}></span>
              </NavLink>
            ))}
          </Nav>

          {/* Right Side Buttons + Profile */}
          <div
            className={`d-flex align-items-center gap-3 ${styles.rightSection}`}
          >
            <Button
              variant="outline-light"
              className={styles.outlineBtn}
              href="/chatbot"
            >
              <i className="bi bi-robot me-2"></i>
              <span>CHEFBOT</span>
            </Button>

            <Button className={styles.primaryBtn} href="/subscribe">
              <i className="bi bi-star me-2"></i>

              <span>Subscribe</span>
            </Button>

            <NavDropdown
              align="end"
              className={styles.profileDropdownWrapper}
              title={
                <div className={styles.profileToggle}>
                  {user?.profilePicture ? (
                    <>
                      <img
                        src={user.profilePicture}
                        alt="User Avatar"
                        className={styles.profileAvatar}
                      />
                      <span className={styles.statusDot}></span>
                    </>
                  ) : (
                    <i className="bi bi-person-circle"></i>
                  )}
                </div>
              }
              id="profile-dropdown"
            >
              {/* Profile Header */}
              <div className={styles.profileHeader}>
                <div className={styles.avatarContainer}>
                  <img
                    src={user?.profilePicture || "/default-profile.png"}
                    alt="User Avatar"
                    className={styles.dropdownAvatar}
                  />
                  <div className={styles.avatarBadge}>
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                </div>
                <div className={styles.userInfo}>
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
                    <i className="bi bi-person me-2"></i>
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/edit-profile">
                    <i className="bi bi-pencil me-2"></i>
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/saved-recipes">
                    <i className="bi bi-bookmark-heart me-2"></i>
                    Saved Recipes
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/my-recipes">
                    <i className="bi bi-journal-text me-2"></i>
                    My Recipes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={logout}
                    className={styles.logoutItem}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={NavLink} to="/signin">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/signup">
                    <i className="bi bi-person-plus me-2"></i>
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
