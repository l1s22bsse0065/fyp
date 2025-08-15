import React from 'react';
import { Container, Button } from 'react-bootstrap';
import styles from '../styles/homepage.module.css';
import heroImage from '../assets/images/signup.jpg'; // your hero image

const HeroSection = () => {
  return (
    <div className={styles.heroSection} style={{ backgroundImage: `url(${heroImage})` }}>
      <Container className="text-center text-light py-5">
        <h1 className="fw-bold display-4">WHERE EVERY BITE TELLS A STORY</h1>
        <p className="lead">
          Explore a world of flavors, discover handcrafted recipes, 
          and experience the joy of every kitchen creation.
        </p>
        <Button variant="danger" size="lg">Explore Recipes</Button>
      </Container>
    </div>
  );
};

export default HeroSection;
