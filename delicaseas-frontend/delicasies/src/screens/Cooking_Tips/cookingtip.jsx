// src/pages/CookingTips/CookingTips.js
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "../../styles/cookingtips.module.css";
import { recipes } from "../../data/recipes";
import { tips } from "../../data/cookingtips";
import heroImg from "../../assets/images/signup.jpg";

import SubscribeSection from "../../components/SubscribeSection";
import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";
import FeaturedRecipes from "../../components/Featuresection";
import TipsSection from "../../components/TipsSection";
import SmartlyCurated from "../../components/SmartlyCurated";
import NourishingPalate from "../../components/NourishingPalate";


const CookingTips = () => {
  return (
    <>
      {/* Navbar */}
      <NavbarComponent />

      <Container fluid className={styles.pageContainer}>
        {/* HEADER SECTION */}
        <section className={`text-center py-5 ${styles.headerSection}`}>
          <h1 className="fw-bold display-5">OUR ESSENTIAL COOKING TIPS</h1>
          <p className="text-muted mt-3">
            Welcome to Delicacies' treasure trove of cooking wisdom! Here,
            you’ll discover an assortment of tips and tricks to elevate your
            skills, save time, boost confidence, and bring joy to your cooking
            adventures.
          </p>

          <Row className="mt-4 g-3">
            <Col md={4}>
              <Card className={`p-3 shadow-sm ${styles.infoCard}`}>
                <img
                  src={heroImg}
                  alt="Quality Tools"
                  className={styles.iconImg}
                />
                <h5>QUALITY TOOLS</h5>
                <p className="text-muted small">
                  Essential tools for efficient cooking.
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={`p-3 shadow-sm ${styles.infoCard}`}>
                <img
                  src="/images/utensils.png"
                  alt="Essential Utensils"
                  className={styles.iconImg}
                />
                <h5>ESSENTIAL UTENSILS</h5>
                <p className="text-muted small">
                  Knives, boards, spoons, and measuring cups.
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={`p-3 shadow-sm ${styles.infoCard}`}>
                <img
                  src="/images/measurement.png"
                  alt="Measuring Accuracy"
                  className={styles.iconImg}
                />
                <h5>MEASURING ACCURACY</h5>
                <p className="text-muted small">
                  Accurate measurements for perfect recipes.
                </p>
              </Card>
            </Col>
          </Row>
        </section>

        {/* FEATURED RECIPES */}
        <FeaturedRecipes title="FEATURED RECIPES" recipes={recipes} />

        {/* TIPS AND TRICKS */}
        <TipsSection title="TIPS AND TRICKS FOR YOU" recipes={tips} />

        {/* NOURISHING EVERY PALATE */}
        <NourishingPalate />

        {/* CURATED SECTION */}
        <SmartlyCurated />

        {/* SUBSCRIBE SECTION */}
        <SubscribeSection />

        {/* FOOTER */}
        <FooterSection />
      </Container>
    </>
  );
};

export default CookingTips;
