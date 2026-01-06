import { Container, Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion"; // Install: npm install framer-motion
import styles from "../../styles/homepage.module.css";
import heroImg from "../../assets/images/signup.jpg";

import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react"; // Add useState importimport { Modal, Button } from 'react-bootstrap'; // Add Modal import

// Reusable Components
import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";
import FeaturedRecipes from "../../components/Featuresection";
import SmartlyCurated from "../../components/SmartlyCurated";

import whatWeHaveSectionImg1 from "../../assets/images/whatdowehave/wdwh1.jpg";
import whatWeHaveSectionImg2 from "../../assets/images/whatdowehave/wswh2.jpg";
import whatWeHaveSectionImg3 from "../../assets/images/whatdowehave/wdwh3.jpg";
import whatWeHaveSectionImg4 from "../../assets/images/whatdowehave/wdwh4.jpg";

const Home = () => {
  const [showMore, setShowMore] = useState(false);
  const [showPaletteMore, setShowPaletteMore] = useState(false);

  return (
    <>
      <Container fluid className={styles.pageContainer}>
        {/* Navbar */}
        <NavbarComponent />

        {/* Hero Section - Enhanced with animations */}
        <motion.div
          className={styles.heroSection}
          style={{ backgroundImage: `url(${heroImg})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.overlay}></div>
          <div className={styles.heroParticles}></div>

          <Container className={`text-center text-light ${styles.heroContent}`}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className={styles.heroLabel}>✨ Culinary Excellence</span>
              <h1 className={`fw-bold ${styles.heroTitle}`}>
                WHERE EVERY BITE
                <span className={styles.gradientText}> TELLS A STORY</span>
              </h1>
              <p className={`lead mt-4 ${styles.heroSubtitle}`}>
                Explore a world of flavors, discover handcrafted recipes, and
                experience the joy of every kitchen creation.
              </p>
              <div className={styles.heroCta}>
                <Button
                  variant="danger"
                  size="lg"
                  href="/recipes"
                  className={styles.exploreBtn}
                >
                  Explore Recipes
                  <i className="bi bi-arrow-right ms-2"></i>
                </Button>
              </div>
            </motion.div>
          </Container>

          {/* Scroll Indicator */}
          <div className={styles.scrollIndicator}>
            <div className={styles.mouse}>
              <div className={styles.wheel}></div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <section className={styles.statsSection}>
          <Container>
            <Row className="text-center">
              <Col md={3} sm={6} className="mb-3">
                <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
                  <h3 className={styles.statNumber}>500+</h3>
                  <p className={styles.statLabel}>Recipes</p>
                </motion.div>
              </Col>
              <Col md={3} sm={6} className="mb-3">
                <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
                  <h3 className={styles.statNumber}>50k+</h3>
                  <p className={styles.statLabel}>Happy Cooks</p>
                </motion.div>
              </Col>
              <Col md={3} sm={6} className="mb-3">
                <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
                  <h3 className={styles.statNumber}>30+</h3>
                  <p className={styles.statLabel}>Categories</p>
                </motion.div>
              </Col>
              <Col md={3} sm={6} className="mb-3">
                <motion.div className={styles.statCard} whileHover={{ y: -5 }}>
                  <h3 className={styles.statNumber}>4.9★</h3>
                  <p className={styles.statLabel}>Average Rating</p>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* FEATURED RECIPES */}
        <FeaturedRecipes title="FEATURED RECIPES"  />

        {/* SMARTLY CURATED SECTION */}
        <SmartlyCurated />

        {/* DIVERSE PALETTE SECTION - Enhanced with Expandable Panel */}
        <section className={styles.paletteSection}>
          <Container fluid className="py-5">
            <Row className="align-items-center">
              <Col md={6}>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className={styles.badge}>
                    <i className="bi bi-stars me-2"></i>Explore
                  </span>

                  <h2 className={`fw-bold mb-4 ${styles.sectionTitle}`}>
                    OUR DIVERSE <br />
                    <span className={styles.gradientText}>PALETTE</span>
                  </h2>

                  <p className={`mb-4 ${styles.sectionDescription}`}>
                    Explore an extraordinary blend of flavors crafted to
                    perfection. A collection designed for every craving and
                    occasion.
                  </p>

                  {/* TOGGLE BUTTON */}
                  <Button
                    variant="dark"
                    className={styles.btnDark}
                    onClick={() => setShowPaletteMore(!showPaletteMore)}
                  >
                    {showPaletteMore ? "SHOW LESS" : "READ MORE"}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Button>

                  {/* EXPANDING DESCRIPTION */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      showPaletteMore
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.4 }}
                    style={{ overflow: "hidden" }}
                    className="mt-3"
                  >
                    <p className={styles.moreDescription}>
                      Our palette brings together culture, diversity, and taste.
                      From refreshing vegan meals to indulgent desserts, each
                      category represents a unique culinary experience. Whether
                      you're planning a wholesome breakfast, a hearty lunch, or
                      a late-night dinner, our curated sections make it
                      effortless to discover the perfect dish.
                    </p>
                  </motion.div>
                </motion.div>
              </Col>

              <Col md={6}>
                <div className={styles.paletteGrid}>
                  {[
                    { icon: "bi-leaf", label: "VEGAN", color: "#10b981" },
                    { icon: "bi-sun", label: "BREAKFAST", color: "#f59e0b" },
                    { icon: "bi-egg-fried", label: "LUNCH", color: "#ef4444" },
                    { icon: "bi-moon", label: "DINNER", color: "#8b5cf6" },
                    {
                      icon: "bi-emoji-smile",
                      label: "DESSERT",
                      color: "#ec4899",
                    },
                    {
                      icon: "bi-lightning",
                      label: "QUICK BITE",
                      color: "#06b6d4",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className={styles.paletteCard}
                      whileHover={{ scale: 1.05, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      style={{ "--accent-color": item.color }}
                    >
                      <i
                        className={`bi ${item.icon} ${styles.paletteIcon}`}
                      ></i>
                      <span className={styles.paletteLabel}>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* WHAT DO WE HAVE SECTION - Enhanced */}
        <section className={styles.whatWeHaveSection}>
          <Container fluid className="py-5">
            <Row>
              <Col md={4} className="d-flex flex-column justify-content-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <span className={styles.badge}>
                    <i className="bi bi-info-circle me-2"></i>About us
                  </span>

                  <h2 className={`fw-bold mb-4 ${styles.sectionTitle}`}>
                    WHAT DO WE
                    <br />
                    <span className={styles.gradientText}>HAVE?</span>
                  </h2>

                  <p className={`mb-4 ${styles.sectionDescription}`}>
                    Dive into fresh selections and exciting creations —
                    perfectly balanced recipes, straight from our test kitchen.
                  </p>

                  {/* READ MORE Toggle Button */}
                  <Button
                    variant="outline-dark"
                    className={styles.btnOutline}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "SHOW LESS" : "READ MORE"}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Button>

                  {/* EXPANDING DESCRIPTION */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      showMore
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.4 }}
                    style={{ overflow: "hidden" }}
                    className="mt-3"
                  >
                    <p className={styles.moreDescription}>
                      At Delicacies, our mission is to redefine your cooking
                      experience with simplicity, creativity, and AI-powered
                      precision. Explore curated meal ideas, personalized
                      recommendations, and a powerful kitchen companion built
                      for everyday chefs.
                    </p>
                  </motion.div>
                </motion.div>
              </Col>

              <Col md={8}>
                <div className={styles.imageCollage}>
                  {[
                    {
                      id: 1,
                      image: whatWeHaveSectionImg1,
                      alt: "Breakfast Recipes",
                    },
                    { id: 2, image: whatWeHaveSectionImg2, alt: "Lunch Ideas" },
                    {
                      id: 3,
                      image: whatWeHaveSectionImg3,
                      alt: "Dinner Specials",
                    },
                    {
                      id: 4,
                      image: whatWeHaveSectionImg4,
                      alt: "Dessert Collection",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.id}
                      className={`${styles.imageWrapper} ${
                        styles[`img${item.id}`]
                      }`}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <img src={item.image} alt={item.alt} />
                      <div className={styles.imageOverlay}>
                        <i className="bi bi-zoom-in"></i>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* SUBSCRIBE SECTION */}
        <SubscribeSection />

        {/* FOOTER SECTION */}
        <FooterSection />
      </Container>
    </>
  );
};

export default Home;
