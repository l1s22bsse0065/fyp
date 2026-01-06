// src/components/NourishingPalate.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Carousel, Collapse } from "react-bootstrap";
import styles from "../styles/cookingtips.module.css";
import image1 from "../assets/images/nourishing/Gluten Free Lifestyle.jpg";
import image2 from "../assets/images/nourishing/plant based.jpg";
import image3 from "../assets/images/nourishing/food alergy.jpg";
import image4 from "../assets/images/nourishing/low carbs.jpg";
import image5 from "../assets/images/nourishing/Fermented foods for vegans.jpg";
import image6 from "../assets/images/nourishing/comfort classic.jpg";

// chunk helper: split array into groups of `size`
const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const defaultCards = [
  { id: 1, image: image1, title: "Gluten-Free Alternatives", description: "Discover healthy swaps for gluten-rich meals. Learn about almond flour, coconut flour, and other nutritious alternatives that don't compromise on taste. Perfect for those with celiac disease or gluten sensitivity." },
  { id: 2, image: image2, title: "Plant-Based Cooking", description: "Explore nourishing vegetarian & vegan recipes. From protein-rich legumes to vitamin-packed leafy greens, create delicious meals that are both sustainable and incredibly nutritious for your body." },
  { id: 3, image: image3, title: "Allergy-Friendly Substitutions", description: "Smart swaps for common allergens in cooking. Whether it's dairy-free, nut-free, or egg-free, discover amazing alternatives that keep your meals delicious and safe for everyone at your table." },
  { id: 4, image: image4, title: "Low-Carb Creations", description: "Meals tailored for low-carb lifestyles. Explore cauliflower rice, zucchini noodles, and other creative substitutions that help you maintain your health goals without sacrificing flavor or satisfaction." },
  { id: 5, image: image5, title: "Fermented Flavors", description: "Boost flavor & gut health with fermentation. Learn the art of making kimchi, kombucha, and fermented vegetables that not only taste amazing but also support your digestive health and immunity." },
  { id: 6, image: image6, title: "Comfort Classics", description: "Cozy dishes with modern, lighter twists. Reimagine your favorite comfort foods with healthier ingredients and cooking methods that deliver all the warmth and satisfaction you crave." }
];

const NourishingPalate = ({ cards = defaultCards, visiblePerSlide = 3 }) => {
  const slides = chunk(cards, visiblePerSlide);
  const [index, setIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState(new Set());

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setIndex((p) => (p + 1) % slides.length);

  const toggleExpand = (cardId) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(cardId)) {
      newExpandedCards.delete(cardId);
    } else {
      newExpandedCards.add(cardId);
    }
    setExpandedCards(newExpandedCards);
  };

  return (
    <section className={styles.nourishingSection}>
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
                    <Card className={`${styles.customCard} bg-dark text-white shadow-sm border-0`}>
                      <Card.Img src={card.image} alt={card.title} className={styles.customCardImg} />
                      <Card.ImgOverlay className={`d-flex flex-column justify-content-end p-3 ${styles.overlayDark}`}>
                        <Card.Title className="fw-bold">{card.title}</Card.Title>
                        <Card.Text className="small">{card.description.slice(0, 80)}...</Card.Text>
                        <Button 
                          variant="light" 
                          size="sm" 
                          className="mt-2 align-self-start"
                          onClick={() => toggleExpand(card.id)}
                        >
                          {expandedCards.has(card.id) ? 'Show Less' : 'Read More'}
                        </Button>
                      </Card.ImgOverlay>
                    </Card>
                    
                    {/* Expandable Panel */}
                    <Collapse in={expandedCards.has(card.id)}>
                      <div className={styles.expandedPanel}>
                        <div className={styles.panelContent}>
                          <h6 className={styles.panelTitle}>{card.title}</h6>
                          <p className={styles.panelDescription}>{card.description}</p>
                          <div className={styles.panelActions}>
                            <Button 
                              variant="primary" 
                              size="sm"
                              className={styles.actionButton}
                            >
                              Learn More
                            </Button>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              className={styles.actionButton}
                            >
                              Save Recipe
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Collapse>
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
