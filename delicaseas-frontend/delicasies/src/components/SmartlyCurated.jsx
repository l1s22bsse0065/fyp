
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/homepage.module.css";
import heroImg from "../assets/images/signup.jpg";


const SmartlyCurated = () => {
    return (

<section className={`${styles.curatedSection}  `}>
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
    );
};
export default SmartlyCurated;