import { Container } from "react-bootstrap";
import styles from "../styles/footer.module.css";
import heroImg from "../assets/images/signup.jpg";

const FooterSection = () => {
  const footerLinks = [
    { href: "/home", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/cooking-tips", label: "Cooking Tips" },
    { href: "/about", label: "About Us" }
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: "bi-facebook", label: "Facebook" },
    { href: "https://instagram.com", icon: "bi-instagram", label: "Instagram" },
    { href: "https://twitter.com", icon: "bi-twitter-x", label: "Twitter" }
  ];

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        
        {/* Brand */}
        <div className={styles.brand}>
          <img src={heroImg} alt="Delicacies Logo" className={styles.logo} />
          <span className={styles.brandText}>Delicacies</span>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className={styles.social}>
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.label}
            >
              <i className={`bi ${social.icon}`}></i>
            </a>
          ))}
        </div>
      </Container>

      {/* Copyright */}
      <div className={styles.copyright}>
        © 2025 Delicacies. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
