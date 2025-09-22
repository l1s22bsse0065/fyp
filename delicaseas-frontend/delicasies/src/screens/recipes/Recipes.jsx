import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";
import { recipes } from "../../data/recipes";
import styles from "../../styles/recipes.module.css";

import RecipeGrid from "../../components/Recipegrid";

const Recipes = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12); // load 12 more each click
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(12); // reset to 12 whenever a new category is selected
  };

  //Filter recipes based on category
  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((r) =>
          Array.isArray(r.category)
            ? r.category.includes(selectedCategory)
            : r.category === selectedCategory
        );

  return (
    <>
      {/* Navbar */}
      <NavbarComponent />

      <Container fluid className={styles.pageContainer}>
        {/* HEADER SECTION */}
        <section className={`text-center py-5 mt-5 mb-5 ${styles.headerSection}`}>
          <h1 className="fw-bold display-5">HAVE A LOOK ON OUR RECIPES</h1>
          <div className={`${styles.categoryButtons} mt-4`}>
            {["All", "Vegan", "Breakfast", "Lunch", "Dinner", "Dessert", "Quick Bite"].map(
              (cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "dark" : "light"}
                  className={styles.categoryBtn}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </Button>
              )
            )}
          </div>
        </section>

        {/* SUB HEADING */}
        <section className="text-center mb-5">
          <h3 className={`fw-bold ${styles.subHeading}`}>
            EMBARK ON A JOURNEY
          </h3>
          <p className="text-muted">
            With our diverse collection of recipes we have something to satisfy
            every palate.
          </p>
        </section>

        {/* RECIPES GRID */}
        <section className="mb-5">
          <Container>
            <RecipeGrid
              title="OUR RECIPES"
              recipes={filteredRecipes.slice(0, visibleCount)}
            />

            {visibleCount < filteredRecipes.length && (
              <div className="text-center mt-4">
                <Button variant="dark" onClick={handleLoadMore}>
                  Load More
                </Button>
              </div>
            )}
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

export default Recipes;
