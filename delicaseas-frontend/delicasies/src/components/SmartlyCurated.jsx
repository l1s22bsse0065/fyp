import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "../styles/homepage.module.css";
import heroImg from "../assets/images/smartly_curated.jpg";

const SmartlyCurated = () => {
 const [ showCuratedMore, setShowCuratedMore ] = useState(false);
  return (
    <section className={styles.curatedSection}>
      <Container fluid className="py-5">
        <Row className="align-items-center">

          {/* LEFT SIDE */}
          <Col md={6}>
            <span className={styles.badge}>Explore</span>

            <h2 className="fw-bold mb-3">
              SMARTLY CURATED,<br />JUST FOR YOU
            </h2>

            <p className="mb-3">
              Unique recipes handpicked to match your taste — 
              let our smart system inspire your kitchen adventures.
            </p>

            {/* READ MORE / SHOW LESS Button */}
            <Button
              variant="dark"
              className={styles.btnDark}
              onClick={() => setShowCuratedMore(!showCuratedMore)}
            >
              {showCuratedMore ? "SHOW LESS" : "READ MORE"}
              <i className="bi bi-arrow-right ms-2"></i>
            </Button>

            {/* EXPANDING CONTENT */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                showCuratedMore
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.4 }}
              style={{ overflow: "hidden" }}
              className="mt-3"
            >
              <p className={styles.moreDescription}>
                Our smart curation engine analyzes your preferences, cooking style, 
                and flavor history to recommend dishes perfectly aligned with your taste. 
                Discover meals that feel personalized, adventurous, and refreshing — 
                crafted just for you.
              </p>
            </motion.div>
          </Col>

          {/* RIGHT SIDE IMAGE */}
          <Col md={6} className="text-center">
            <img
              src={heroImg}
              alt="Smart recipe curation"
              className={`img-fluid rounded ${styles.curatedimage}`}
            />
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default SmartlyCurated;
