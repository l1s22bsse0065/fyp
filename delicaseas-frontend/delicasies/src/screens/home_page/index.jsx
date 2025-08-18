
import { Navbar, Nav, Container, Button, Row, Col, Card } from "react-bootstrap";
import styles from "../../styles/homepage.module.css"; // CSS Module
import heroImg from "../../assets/images/signup.jpg"; // Replace with actual image path
import { recipes } from "../../data/recipes";
const Home = () => {

  return (
    <>
      {/* Navbar */}
      <Navbar  sticky="top"  expand="lg" className={`py-3 ${styles.navbarWrapper}`} bg="light">
        <Container>
          <Navbar.Brand href="/" className={styles.navbarBrand}>
            <img src={heroImg} alt="logo" height="40" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`mx-auto ${styles.navLinks}`}>
              <Nav.Link href="/" className={styles.navLink}>Home</Nav.Link>
              <Nav.Link href="/recipes" className={styles.navLink}>Recipes</Nav.Link>
              <Nav.Link href="/cooking-tips" className={styles.navLink}>Cooking Tips</Nav.Link>
              <Nav.Link href="/about" className={styles.navLink}>About Us</Nav.Link>
            </Nav>  
            <div className="d-flex gap-2">
              <Button variant="outline-dark" className={styles.customButton}>CHEFBOT</Button>
              <Button variant="dark" className={styles.subscribeButton}>Subscribe</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${heroImg})` }}>
        <div className={styles.overlay}></div>
        <Container className={`text-center text-light ${styles.heroContent}`}>
          <h1 className="fw-bold display-4">WHERE EVERY BITE TELLS A STORY</h1>
          <p className="lead mt-3">
            Explore a world of flavors, discover handcrafted recipes, 
            and experience the joy of every kitchen creation.
          </p>
          <Button variant="danger" size="lg" className={styles.exploreBtn}>Explore Recipes</Button>
        </Container>
      </div>

        {/* FEATURED RECIPES */}
 
         <section 
        id="featured-recipes" 
        className={`${styles.featuredSection} border border-dark`} 
        aria-label="Featured recipes"
      >
        <Container fluid>
          <h2 className={`${styles.sectionTitle} text-center my-4`}>
            FEATURED RECIPES
          </h2>
          <Row>
            {recipes.map((recipe) => (
              <Col key={recipe.id} xs={12} md={4} className="mb-4 d-flex">
                <Card className={`flex-fill ${styles.recipeCard}`}>
                  <Card.Img 
                    variant="top" 
                    src={recipe.image} 
                    alt={`Recipe image for ${recipe.title}`} 
                    className={styles.cardImg} 
                  />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                  <div className={styles.recipeFooter}>
                    <div className={styles.recipeMeta}>
                      <span>{recipe.time}</span> | <span>{recipe.servings}</span>
                    </div>
                    <Button variant="light" className={styles.viewBtn}>
                      VIEW RECIPE
                    </Button>
                  </div>
                </Card.Body>

                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    {/* SMARTLY CURATED SECTION */}
    <section className={`${styles.curatedSection} border border-dark rounded`}>
  <Container fluid className="py-5">
    <Row className="align-items-center">
      <Col md={6}>
        <span className={styles.badge}>Explore</span>
        <h2 className="fw-bold mb-3">SMARTLY CURATED,<br/>JUST FOR YOU</h2>
        <p className="mb-4">
          Unique recipes handpicked to match your taste — 
          let our smart system inspire your kitchen adventures.
        </p>
        <Button variant="dark" className={styles.btnDark}>SEE MORE</Button>
      </Col>
      <Col md={6} className="text-center">
        <img src={heroImg} alt="Smart recipe curation" className={ `img-fluid rounded ${styles.curatedimage}`} />
      </Col>
    </Row>
  </Container>
</section>


{/* DIVERSE PALETTE SECTION */}
<section className={`${styles.paletteSection} border border-dark rounded`}>
  <Container fluid className="py-5">
    <Row>
      <Col md={6}>
        <span className={styles.badge}>Explore</span>
        <h2 className="fw-bold mb-3">OUR DIVERSE<br/>PALETTE</h2>
        <p className="mb-4">
          Explore an extraordinary blend of flavors crafted to perfection. 
          A collection designed for every craving and occasion.
        </p>
        <Button variant="dark" className={styles.btnDark}>SEE MORE</Button>
      </Col>
      <Col md={6}>
        <ul className={styles.paletteList}>
          <li><i className="bi bi-leaf"></i> VEGAN</li>
          <li><i className="bi bi-sun"></i> BREAKFAST</li>
          <li><i className="bi bi-egg-fried"></i> LUNCH</li>
          <li><i className="bi bi-moon"></i> DINNER</li>
          <li><i className="bi bi-cupcake"></i> DESSERT</li>
          <li><i className="bi bi-lightning"></i> QUICK BITE</li>
        </ul>
      </Col>
    </Row>
  </Container>
</section>


{/* WHAT DO WE HAVE SECTION */}
<section className={`${styles.whatWeHaveSection} border border-dark rounded`}>
  <Container fluid className="py-5">
    <Row>
      {/* LEFT CONTENT */}
      <Col md={4} className="d-flex flex-column justify-content-center">
        <span className={styles.badge}>About us</span>
        <h2 className="fw-bold mb-3">
          WHAT DO WE<br />HAVE?
        </h2>
        <p className="mb-4">
          Dive into fresh selections and exciting creations — 
          perfectly balanced recipes, straight from our test kitchen.
        </p>
        <Button variant=" border-dark" className={styles.btnDark}>READ MORE</Button>
      </Col>

      {/* RIGHT IMAGES COLLAGE */}
      <Col md={8}>
        <div className={styles.imageCollage}>
          <img src={heroImg} alt="" className={`${styles.img} ${styles.img1}`} />
          <img src={heroImg} alt="" className={`${styles.img} ${styles.img2}`} />
          <img src={heroImg} alt="" className={`${styles.img} ${styles.img3}`} />
          <img src={heroImg} alt="" className={`${styles.img} ${styles.img4}`} />
        </div>
      </Col>
    </Row>
  </Container>
</section>



{/* SUBSCRIBE SECTION */}
<section className={styles.subscribeSection}>
  <Container fluid className="text-center py-5">
    <h5 className="text-white text-uppercase mb-2">Subscribe</h5>
    <h2 className="fw-bold text-white mb-3">JOIN THE FUN<br/>SUBSCRIBE NOW!</h2>
    <p className="text-white mb-4">
      Subscribe today to be part of the ultimate foodie family. 
    </p>
    <div className={styles.subscribeForm}>
      <input type="email" placeholder="Email Address" className={styles.emailInput}/>
      <Button variant="dark" className={styles.btnDark}>SUBSCRIBE</Button>
    </div>
  </Container>
</section>

    </>
  );
};

export default Home;
