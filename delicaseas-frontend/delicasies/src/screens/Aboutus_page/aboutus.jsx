import React from "react";
import { Container, Row, Col, Card, Image, Badge } from "react-bootstrap";
import styles from "../../styles/aboutus.module.css";

import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";
import SubscribeSection from "../../components/SubscribeSection";
import FeaturedRecipes from "../../components/Featuresection";

// sample images (replace with your assets)
import chefImg from "../../assets/images/chef.jpg";
import moment1 from "../../assets/images/moments/moment6.jpg";
import moment2 from "../../assets/images/moments/moment1.jpg";
import moment3 from "../../assets/images/moments/moment2.jpg";
import moment4 from "../../assets/images/moments/moment3.jpg";
import moment5 from "../../assets/images/moments/moment4.jpg";
import moment6 from "../../assets/images/moments/moment5.jpg";
import moment7 from "../../assets/images/moments/moment8.jpg";
import moment8 from "../../assets/images/moments/moment7.jpg";

const AboutUs = () => {
  return (
    <>
      <NavbarComponent />

      <Container fluid className={styles.pageContainer}>
        {/* SECTION 1: Heading + Intro paragraph */}
        <section className={`py-5 mb-5 ${styles.headerSection}`}>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <Badge className={styles.welcomeBadge}>Welcome</Badge>
              <h1 className={styles.heroTitle}>
                WELCOME TO <br />
                MY BLOG <br />
                <span className={styles.accent}>PEOPLE</span>
              </h1>
            </Col>

            <Col md={6} className="text-md-end text-center">
              <p className={styles.heroText}>
                I'm Gabriel, chef and culinary craftsman at Chez Gabriel. Here,
                food isn't just fuel — it's an <em>experience</em>. Every dish I create
                blends classic French tradition with modern passion, telling a
                story one recipe at a time. Step inside, and let's cook
                something unforgettable together.
              </p>
              
            </Col>
          </Row>
        </section>

        {/* SECTION 2: Chef image + Highlight box */}
        <section className={`py-5 ${styles.modernSection}`}>
          <Row className="align-items-stretch g-3">
            <Col md={5} className="d-flex">
              <div className={styles.imageWrapper}>
                <Image
                  src={chefImg}
                  alt="Chef Gabriel"
                  fluid
                  className={styles.chefImg}
                />
                <div className={styles.experienceBadge}>
                  <span className={styles.years}>15+</span>
                  <span className={styles.experience}>Years</span>
                </div>
              </div>
            </Col>

            <Col md={7} className="d-flex">
              <Card className={styles.modernCard}>
                <Card.Body className="d-flex flex-column justify-content-center h-100">
                  <h5 className={styles.cardTitle}>
                    FROM FRENCH ROOTS TO <span className={styles.highlight}>GLOBAL PALATES</span>
                  </h5>
                  <p className={styles.cardText}>
                    From rustic French kitchens to bustling city restaurants, I've
                    carried the lessons of patience, passion, and creativity
                    everywhere. My blog celebrates this journey with recipes,
                    insights, and stories designed to inspire your table.
                  </p>
                  <p className={styles.signature}>— Gabriel Dubois</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* MOMENTS TO PONDER */}
        <section className={`py-5 mt-5 ${styles.momentsSection}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>MOMENTS TO PONDER</h2>
            <p className={styles.sectionSubtitle}>Capturing culinary artistry in motion</p>
          </div>
          <div className={styles.momentsGrid}>
            {[
              moment1, moment2, moment3, moment4, moment5, moment6, moment7, moment8
            ].map((img, idx) => (
              <div key={idx} className={styles.momentCard}>
                <Image
                  src={img}
                  alt={`Culinary Moment ${idx + 1}`}
                  className={styles.momentImg}
                />
                <div className={styles.momentOverlay}>
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FeaturedRecipes title="FEATURED RECIPES" />
        <SubscribeSection />
        <FooterSection />
      </Container>
    </>
  );
};

export default AboutUs;
