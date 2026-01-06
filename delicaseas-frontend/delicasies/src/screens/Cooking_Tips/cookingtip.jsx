import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const infoCards = [
    {
      icon: knifeIcon,
      title: "QUALITY TOOLS",
      description: "Essential tools for efficient cooking",
      color: "#dc2626"
    },
    {
      icon: utensilsIcon,
      title: "ESSENTIAL UTENSILS",
      description: "Knives, boards, spoons, and measuring cups",
      color: "#ea580c"
    },
    {
      icon: scaleIcon,
      title: "MEASURING ACCURACY",
      description: "Accurate measurements for perfect recipes",
      color: "#d97706"
    }
  ];

  return (
    <>
      <NavbarComponent />

      <Container fluid className={styles.pageContainer}>
        {/* MODERN HEADER SECTION */}
        <section className={styles.heroSection}>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <div className={styles.heroContent}>
                <Badge className={styles.cookingBadge}>Culinary Wisdom</Badge>
                <h1 className={styles.heroTitle}>
                  OUR ESSENTIAL <br />
                  <span className={styles.accent}>COOKING TIPS</span>
                </h1>
              </div>
            </Col>

            <Col lg={6}>
              <div className={styles.heroDescription}>
                <p className={styles.heroText}>
                  Welcome to Delicacies' <em>treasure trove</em> of cooking wisdom! Here,
                  you'll discover an assortment of tips and tricks to elevate your
                  skills, save time, boost confidence, and bring <strong>joy</strong> to your
                  cooking adventures.
                </p>
                <div className={styles.statsWrapper}>
                  <div className={styles.stat}>
                    <strong>500+</strong>
                    <span>Tips</span>
                  </div>
                  <div className={styles.stat}>
                    <strong>100+</strong>
                    <span>Recipes</span>
                  </div>
                  <div className={styles.stat}>
                    <strong>10K+</strong>
                    <span>Cooks</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* MODERN INFO CARDS SECTION */}
        <section className={styles.infoCardsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Essential Kitchen Knowledge</h2>
            <p className={styles.sectionSubtitle}>Master the fundamentals with our curated essentials</p>
          </div>
          
          <Row className="g-4">
            {infoCards.map((card, index) => (
              <Col md={4} key={index}>
                <Card className={styles.modernInfoCard}>
                  <Card.Body className={styles.infoCardBody}>
                    <div className={styles.modernIconWrapper}>
                      <img
                        src={card.icon}
                        alt={card.title}
                        className={styles.modernIconImg}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h5 className={styles.cardTitle} style={{ color: card.color }}>
                        {card.title}
                      </h5>
                      <p className={styles.cardDescription}>
                        {card.description}
                      </p>
                    </div>
                    <div className={styles.cardNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* LOADING STATE */}
        {loading && (
          <div className={styles.loadingSection}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading delicious content...</p>
          </div>
        )}

        {/* FEATURED RECIPES */}
        <FeaturedRecipes title="FEATURED RECIPES" recipes={recipes} />

        {/* DYNAMIC TIPS */}
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
