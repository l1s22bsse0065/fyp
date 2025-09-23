import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "../../styles/cookingtips.module.css";
import { recipes } from "../../data/recipes";
import { tips } from "../../data/cookingtips";

import heroImg from "../../assets/images/signup.jpg";
import knifeIcon from "../../assets/icons/knife.png";
import utensilsIcon from "../../assets/icons/cutlery.png";
import scaleIcon from "../../assets/icons/weight-scale.png";

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
        <section className={`py-5 ${styles.headerSection}`}>
          <Row className="align-items-center">
            {/* LEFT COLUMN - paragraph */}
            <Col md={6}>
              <h1 className="fw-bold display-5">
                OUR ESSENTIAL <br /> COOKING TIPS
              </h1>
            </Col>

            {/* RIGHT COLUMN - heading */}
            <Col md={6} className="text-md-end text-center">
              <p className="text-muted fs-5">
                Welcome to Delicacies' treasure trove of cooking wisdom! Here,
                you’ll discover an assortment of tips and tricks to elevate your
                skills, save time, boost confidence, and bring joy to your
                cooking adventures.
              </p>
            </Col>
          </Row>
        </section>

        {/* INFO CARDS SECTION */}
        <section className="py-4">
          <Row className="g-3">
            {/* Card 1 */}
            <Col md={4}>
              <Card
                className={`p-3 shadow-sm d-flex flex-row align-items-center justify-content-center  ${styles.infoCard}`}
              >
                <div className={styles.iconWrapper}>
                  <img
                    src={knifeIcon}
                    alt="Quality Tools"
                    className={styles.iconImg}
                  />
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1 text-danger">QUALITY TOOLS</h5>
                  <p className="text-muted small mb-0">
                    Essential tools for efficient cooking.
                  </p>
                </div>
              </Card>
            </Col>

            {/* Card 2 */}
            <Col md={4}>
              <Card
                className={`p-3 shadow-sm d-flex flex-row align-items-center justify-content-center  ${styles.infoCard}`}
              >
                <div className={styles.iconWrapper}>
                  <img
                    src={utensilsIcon}
                    alt="Essential Utensils"
                    className={styles.iconImg}
                  />
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1 text-danger">ESSENTIAL UTENSILS</h5>
                  <p className="text-muted small mb-0">
                    Knives, boards, spoons, and measuring cups.
                  </p>
                </div>
              </Card>
            </Col>

            {/* Card 3 */}
            <Col md={4}>
              <Card
                className={`p-3 shadow-sm d-flex flex-row align-items-center justify-content-center  ${styles.infoCard}`}
              >
                <div className={styles.iconWrapper}>
                  <img
                    src={scaleIcon}
                    alt="Measuring Accuracy"
                    className={styles.iconImg}
                  />
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1  text-danger">MEASURING ACCURACY</h5>
                  <p className="text-muted small mb-0">
                    Accurate measurements for perfect recipes.
                  </p>
                </div>
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
