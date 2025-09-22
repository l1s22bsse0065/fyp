// src/components/NourishingPalate.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import styles from "../styles/cookingtips.module.css";
import heroImg from "../assets/images/signup.jpg"; // swap with real images if you have them

// chunk helper: split array into groups of `size`
const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const defaultCards = [
  { id: 1, image: heroImg, title: "Gluten-Free Alternatives", description: "Discover healthy swaps for gluten-rich meals." },
  { id: 2, image: heroImg, title: "Plant-Based Cooking", description: "Explore nourishing vegetarian & vegan recipes." },
  { id: 3, image: heroImg, title: "Allergy-Friendly Substitutions", description: "Smart swaps for common allergens in cooking." },
  { id: 4, image: heroImg, title: "Low-Carb Creations", description: "Meals tailored for low-carb lifestyles." },
  { id: 5, image: heroImg, title: "Fermented Flavors", description: "Boost flavor & gut health with fermentation." },
  { id: 6, image: heroImg, title: "Comfort Classics", description: "Cozy dishes with modern, lighter twists." }
];

const NourishingPalate = ({ cards = defaultCards, visiblePerSlide = 3 }) => {
  const slides = chunk(cards, visiblePerSlide);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setIndex((p) => (p + 1) % slides.length);

  return (
    <section className={styles.nourishingSection }>
      <Container>
        <div className="d-flex justify-content-between align-items-start mb-3" style={{ position: "relative" }}>
          <h3 className="fw-bold">NOURISHING EVERY PALATE</h3>

          {/* top-right custom controls */}
          <div className={styles.palateControls}>
            <Button variant="outline-dark" size="sm" onClick={prev} aria-label="Previous slide">
              ‹
            </Button>
            <Button variant="outline-dark" size="sm" onClick={next} aria-label="Next slide">
              ›
            </Button>
          </div>
        </div>

        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={false}
          indicators={false}
          interval={null} // no autoplay; change if you want auto
        >
          {slides.map((group, slideIdx) => (
            <Carousel.Item key={slideIdx}>
              <Row className="g-4">
                {group.map((card) => (
                  <Col md={4} key={card.id}>
                    <Card className="bg-dark text-white shadow-sm border-0">
                      <Card.Img src={card.image} alt={card.title} className={styles.customCardImg} />
                      <Card.ImgOverlay className={`d-flex flex-column justify-content-end p-3 ${styles.overlayDark}`}>
                        <Card.Title className="fw-bold">{card.title}</Card.Title>
                        <Card.Text className="small">{card.description}</Card.Text>
                        <Button variant="light" size="sm" className="mt-2 align-self-start">
                          Read More
                        </Button>
                      </Card.ImgOverlay>
                    </Card>
                  </Col>
                ))}

                {/* If last slide has fewer than visiblePerSlide, fill empty cols to keep layout consistent */}
                {group.length < visiblePerSlide &&
                  Array.from({ length: visiblePerSlide - group.length }).map((_, i) => (
                    <Col md={4} key={`empty-${i}`} />
                  ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default NourishingPalate;
