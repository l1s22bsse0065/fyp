import {

  Container,
  Button,
  Row,
  Col,

} from "react-bootstrap";
import styles from "../../styles/homepage.module.css";
import heroImg from "../../assets/images/signup.jpg";
import { recipes } from "../../data/recipes";
import "bootstrap-icons/font/bootstrap-icons.css";

// Reusable Components
import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";

import FeaturedRecipes from "../../components/Featuresection";
import SmartlyCurated from "../../components/SmartlyCurated";

const Home = () => {
  return (
    <>
      <Container fluid className={styles.pageContainer}>
        {/* Navbar */}
        <NavbarComponent />

        {/* Hero Section */}
        <div
          className={styles.heroSection}
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className={styles.overlay}></div>
          <Container className={`text-center text-light ${styles.heroContent}`}>
            <h1 className="fw-bold display-4">
              WHERE EVERY BITE TELLS A STORY
            </h1>
            <p className="lead mt-3">
              Explore a world of flavors, discover handcrafted recipes, and
              experience the joy of every kitchen creation.
            </p>
            <Button variant="danger" size="lg" href= "/recipes" className={styles.exploreBtn}>
              Explore Recipes
            </Button>
          </Container>
        </div>

        {/* FEATURED RECIPES */}

        <FeaturedRecipes title="FEATURED RECIPES" recipes={recipes} />

        {/* SMARTLY CURATED SECTION */}
        <SmartlyCurated />

        {/* DIVERSE PALETTE SECTION */}
        <section className={`${styles.paletteSection}  `}>
          <Container fluid className="py-5">
            <Row>
              <Col md={6}>
                <span className={styles.badge}>Explore</span>
                <h2 className="fw-bold mb-3">
                  OUR DIVERSE
                  <br />
                  PALETTE
                </h2>
                <p className="mb-4">
                  Explore an extraordinary blend of flavors crafted to
                  perfection. A collection designed for every craving and
                  occasion.
                </p>
                <Button variant="dark" href = "/recipes" className={styles.btnDark}>
                  SEE MORE
                </Button>
              </Col>
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <ul className={styles.paletteList}>
                  <li>
                    <i className="bi bi-leaf"></i> VEGAN
                  </li>
                  <li>
                    <i className="bi bi-sun"></i> BREAKFAST
                  </li>
                  <li>
                    <i className="bi bi-egg-fried"></i> LUNCH
                  </li>
                  <li>
                    <i className="bi bi-moon"></i> DINNER
                  </li>
                  <li>
                    <i className="bi bi-emoji-smile"></i> DESSERT
                  </li>
                  <li>
                    <i className="bi bi-lightning"></i> QUICK BITE
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>

        {/* WHAT DO WE HAVE SECTION */}
        <section className={`${styles.whatWeHaveSection} `}>
          <Container fluid className="py-5">
            <Row>
              {/* LEFT CONTENT */}
              <Col md={4} className="d-flex flex-column justify-content-center">
                <span className={styles.badge}>About us</span>
                <h2 className="fw-bold mb-3">
                  WHAT DO WE
                  <br />
                  HAVE?
                </h2>
                <p className="mb-4">
                  Dive into fresh selections and exciting creations — perfectly
                  balanced recipes, straight from our test kitchen.
                </p>
                <Button variant=" border-dark" className={styles.btnDark}>
                  READ MORE
                </Button>
              </Col>

              {/* RIGHT IMAGES COLLAGE */}
              <Col md={8}>
                <div className={styles.imageCollage}>
                  <img
                    src={heroImg}
                    alt=""
                    className={`${styles.img} ${styles.img1}`}
                  />
                  <img
                    src={heroImg}
                    alt=""
                    className={`${styles.img} ${styles.img2}`}
                  />
                  <img
                    src={heroImg}
                    alt=""
                    className={`${styles.img} ${styles.img3}`}
                  />
                  <img
                    src={heroImg}
                    alt=""
                    className={`${styles.img} ${styles.img4}`}
                  />
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
