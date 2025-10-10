import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import styles from "../styles/homepage.module.css";
import RecipeGrid from "./Recipegrid";

const FeaturedRecipes = ({ title }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/recipes");
        setRecipes(res.data.recipes || []);
      } catch (error) {
        console.error("Error fetching featured recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <section className={`${styles.featuredSection} py-5`}>
      <Container fluid>
        <h2 className={`${styles.sectionTitle} text-center mb-4`}>{title}</h2>
        <RecipeGrid recipes={recipes.slice(0, 4)} />
      </Container>
    </section>
  );
};

export default FeaturedRecipes;
