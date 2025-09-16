// src/pages/CookingTips/CookingTips.js
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";
import SubscribeSection from "../../components/SubscribeSection";
import styles from "../../styles/cookingtips.module.css";

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
            Welcome to Delicacies' treasure trove of cooking wisdom! Here, you’ll
            discover an assortment of tips and tricks to elevate your skills,
            save time, boost confidence, and bring joy to your cooking
            adventures.
          </p>

          <Row className="mt-4 g-3">
            <Col md={4}>
              <Card className={`p-3 shadow-sm ${styles.infoCard}`}>
                <img
                  src="/images/tools.png"
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
        <section className="py-5">
          <h2 className="fw-bold mb-4">FEATURED RECIPES</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src="/images/featured-chicken.jpg"
                  alt="Savory Herb-Infused Chicken"
                />
                <Card.Body>
                  <Card.Title>Savory Herb-Infused Chicken</Card.Title>
                  <Card.Text className="text-muted small">
                    Juicy chicken roasted with fresh herbs and garlic.
                  </Card.Text>
                  <Button variant="dark">View Recipe</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src="/images/featured-mousse.jpg"
                  alt="Decadent Chocolate Mousse"
                />
                <Card.Body>
                  <Card.Title>Decadent Chocolate Mousse</Card.Title>
                  <Card.Text className="text-muted small">
                    Rich, creamy, and perfect for dessert lovers.
                  </Card.Text>
                  <Button variant="dark">View Recipe</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src="/images/featured-pasta.jpg"
                  alt="Italian Style Alfredo Fettuccine"
                />
                <Card.Body>
                  <Card.Title>Italian Style Alfredo Fettuccine</Card.Title>
                  <Card.Text className="text-muted small">
                    Classic creamy pasta with parmesan and butter.
                  </Card.Text>
                  <Button variant="dark">View Recipe</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* TIPS AND TRICKS */}
        <section className="py-5 bg-light">
          <h2 className="fw-bold mb-4">TIPS AND TRICKS FOR YOU</h2>
          <Row className="g-4">
            {[
              {
                img: "/images/tip-knife.jpg",
                title: "Knife Skills",
                text: "Master chopping, slicing, and dicing with ease.",
              },
              {
                img: "/images/tip-saute.jpg",
                title: "Sautéing and Searing",
                text: "Learn how to lock in flavors while cooking.",
              },
              {
                img: "/images/tip-roast.jpg",
                title: "Roasting Tips",
                text: "Perfect your roasts with these easy hacks.",
              },
              {
                img: "/images/tip-prep.jpg",
                title: "Prep Workstations",
                text: "Organize your space for smooth cooking.",
              },
              {
                img: "/images/tip-clean.jpg",
                title: "Cleaning as You Go",
                text: "Keep your kitchen tidy while cooking meals.",
              },
              {
                img: "/images/tip-modify.jpg",
                title: "Recipe Modification",
                text: "Adapt recipes to match your preferences.",
              },
            ].map((tip, i) => (
              <Col md={4} key={i}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={tip.img} alt={tip.title} />
                  <Card.Body>
                    <Card.Title>{tip.title}</Card.Title>
                    <Card.Text className="text-muted small">{tip.text}</Card.Text>
                    <Button variant="outline-dark">Read More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

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
        <section className="py-5 text-center bg-light">
          <h4 className="fw-bold">SMARTLY CURATED, JUST FOR YOU</h4>
          <p className="text-muted">
            Exclusive tips & tricks handpicked for your journey.
          </p>
          <Button variant="dark">See More</Button>
        </section>

        {/* SUBSCRIBE SECTION */}
        <SubscribeSection />

        {/* FOOTER */}
        <FooterSection />
      </Container>
    </>
  );
};

export default CookingTips;
