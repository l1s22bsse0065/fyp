import { Container } from "react-bootstrap";
import styles from "../styles/homepage.module.css";
import RecipeGrid from "./Contentgrid";

const FeaturedSection = ({ title, recipes }) => {
  return (
    <section id="featured-recipes" className={`${styles.featuredSection} py-5`}>
      <Container fluid>
        <h2 className={`${styles.sectionTitle} text-center mb-4`}>{title}</h2>
        <RecipeGrid recipes={recipes.slice(0, 4)} />
      </Container>
    </section>
  );
};

export default FeaturedSection;
