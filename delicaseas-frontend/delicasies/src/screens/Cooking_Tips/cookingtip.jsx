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
import TipsSection from "../../components/TipsSection"
import SmartlyCurated from "../../components/SmartlyCurated";

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
        <section className="py-5">
          <h2 className="fw-bold mb-4">NOURISHING EVERY PALATE</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src="/images/nourish-glutenfree.jpg"
                  alt="Gluten-Free Alternatives"
                />
                <Card.Body>
                  <Card.Title>Gluten-Free Alternatives</Card.Title>
                  <Card.Text className="text-muted small">
                    Tasty options without gluten restrictions.
                  </Card.Text>
                  <Button variant="outline-dark">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src="/images/nourish-plantbased.jpg"
                  alt="Plant-Based Cooking"
                />
                <Card.Body>
                  <Card.Title>Plant-Based Cooking</Card.Title>
                  <Card.Text className="text-muted small">
                    Delicious meals without meat or dairy.
                  </Card.Text>
                  <Button variant="outline-dark">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src="/images/nourish-allergy.jpg"
                  alt="Allergy-Friendly Substitutions"
                />
                <Card.Body>
                  <Card.Title>Allergy-Friendly Substitutions</Card.Title>
                  <Card.Text className="text-muted small">
                    Cook worry-free with smart ingredient swaps.
                  </Card.Text>
                  <Button variant="outline-dark">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

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
