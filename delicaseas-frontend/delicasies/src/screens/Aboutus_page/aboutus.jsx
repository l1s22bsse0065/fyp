import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import styles from "../../styles/aboutus.module.css";

import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";
import SubscribeSection from "../../components/SubscribeSection";
import FeaturedRecipes from "../../components/Featuresection";

import { recipes } from "../../data/recipes";

// sample images (replace with your assets)
import chefImg from "../../assets/images/chef_pic.png";
import moment1 from "../../assets/images/signup.jpg";
import moment2 from "../../assets/images/signup.jpg";
import moment3 from "../../assets/images/signup.jpg";
import moment4 from "../../assets/images/signup.jpg";

const AboutUs = () => {
  return (
    <>
      {/* Navbar */}
      <NavbarComponent />

      <Container fluid className={styles.pageContainer}>
        {/* SECTION 1: Heading + Intro paragraph */}
        <section className={`py-5 mb-5 ${styles.headerSection}`}>
          <Row className="align-items-center g-4">
            {/* LEFT - Paragraph */}
            <Col md={6}>
              <h1 className="fw-bold display-5">
                WELCOME TO <br />
                MY BLOG <br />
                PEOPLE
              </h1>
            </Col>

            {/* RIGHT - Heading */}
            <Col md={6} className="text-md-end text-center">
              <p className="text-muted fs-5 text-center">
                I'm Gabriel, chef and culinary craftsman at Chez Gabriel. Here,
                food isn't just fuel — it's an experience. Every dish I create
                blends classic French tradition with modern passion, telling a
                story one recipe at a time. Step inside, and let's cook
                something unforgettable together.
              </p>
            </Col>
          </Row>
        </section>

        {/* SECTION 2: Chef image + Highlight box */}
        <section className={`py-5 ${styles.borderedSection}`}>
          <Row className="align-items-stretch g-4">
            {/* LEFT - Chef Image */}
            <Col md={5} className="d-flex">
              <Image
                src={chefImg}
                alt="Chef"
                fluid
                rounded
                className={`shadow ${styles.chefImg}`}
              />
            </Col>

            {/* RIGHT - Highlight Box */}
            <Col md={7} className="d-flex">
              <Card
                className={`p-4 shadow-sm d-flex flex-column justify-content-center w-100 ${styles.highlightBox}`}
              >
                <h5 className="fw-bold text-uppercase mb-3 text-center">
                  FROM FRENCH ROOTS TO GLOBAL PALATES
                </h5>
                <p className="text-muted mb-3 text-center">
                  From rustic French kitchens to bustling city restaurants, I’ve
                  carried the lessons of patience, passion, and creativity
                  everywhere. My blog celebrates this journey with recipes,
                  insights, and stories designed to inspire your table.
                </p>
                <p className="mb-0 fst-italic text-center">— Gabriel Dubois</p>
              </Card>
            </Col>
          </Row>
        </section>

        {/* MOMENTS TO PONDER */}

        <section className={`py-5 mt-5 ${styles.borderedSection}`}>
          <h2 className="fw-bold text-center mb-4">MOMENTS TO PONDER</h2>
          <div className={styles.momentsGrid}>
            {[
              moment1,
              moment2,
              moment3,
              moment4,
              moment1,
              moment2,
              moment3,
              moment4,
              moment1, // total 9 for 3 rows
            ].map((img, idx) => (
              <div key={idx} className={styles.momentWrapper}>
                <Image
                  src={img}
                  alt={`Moment ${idx + 1}`}
                  className={styles.momentImg}
                />
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED RECIPES */}
        <FeaturedRecipes title="FEATURED RECIPES" recipes={recipes} />

        {/* SUBSCRIBE SECTION */}
        <SubscribeSection />

        {/* FOOTER */}
        <FooterSection />
      </Container>
    </>
  );
};

export default AboutUs;
