import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../../styles/cookingtips.module.css";

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
import axios from "axios";

const CookingTips = () => {
  const [tips, setTips] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // ✅ Fetch both tips and recipes from MongoDB
useEffect(() => {
  const fetchData = async () => {
    try {
      const [tipsRes, recipesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/tips"),
        axios.get("http://localhost:5000/api/recipes")
      ]);

      console.log("Tips Response:", tipsRes.data);
      console.log("Recipes Response:", recipesRes.data);

      setTips(tipsRes.data.tips || []);
      setRecipes(recipesRes.data.recipes || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);



  return (
    <>
      <NavbarComponent />

      <Container fluid className={styles.pageContainer}>
        {/* HEADER SECTION */}
        <section className={`py-5 ${styles.headerSection}`}>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold display-5">
                OUR ESSENTIAL <br /> COOKING TIPS
              </h1>
            </Col>

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
            <Col md={4}>
              <Card
                className={`p-3 shadow-sm d-flex flex-row align-items-center justify-content-center ${styles.infoCard}`}
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

            <Col md={4}>
              <Card
                className={`p-3 shadow-sm d-flex flex-row align-items-center justify-content-center ${styles.infoCard}`}
              >
                <div className={styles.iconWrapper}>
                  <img
                    src={utensilsIcon}
                    alt="Essential Utensils"
                    className={styles.iconImg}
                  />
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1 text-danger">
                    ESSENTIAL UTENSILS
                  </h5>
                  <p className="text-muted small mb-0">
                    Knives, boards, spoons, and measuring cups.
                  </p>
                </div>
              </Card>
            </Col>

            <Col md={4}>
              <Card
                className={`p-3 shadow-sm d-flex flex-row align-items-center justify-content-center ${styles.infoCard}`}
              >
                <div className={styles.iconWrapper}>
                  <img
                    src={scaleIcon}
                    alt="Measuring Accuracy"
                    className={styles.iconImg}
                  />
                </div>
                <div className="ms-3">
                  <h5 className="fw-bold mb-1 text-danger">
                    MEASURING ACCURACY
                  </h5>
                  <p className="text-muted small mb-0">
                    Accurate measurements for perfect recipes.
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </section>

        {/* FEATURED RECIPES (from MongoDB) */}
        <FeaturedRecipes title="FEATURED RECIPES" recipes={recipes} />

        {/* DYNAMIC TIPS (from MongoDB) */}
        {/* DYNAMIC TIPS (from MongoDB) */}
        <TipsSection title="TIPS AND TRICKS FOR YOU" tips={tips} />

        {/* OTHER SECTIONS */}
        <NourishingPalate />
        <SmartlyCurated />
        <SubscribeSection />
        <FooterSection />
      </Container>
    </>
  );
};

export default CookingTips;
