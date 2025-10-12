import { Container, Button, Spinner } from "react-bootstrap";
import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";
import styles from "../../styles/recipes.module.css";
import RecipeGrid from "../../components/Recipegrid";
import useRecipes from "../../hooks/useRecipes";

const Recipes = () => {
  const {
    filteredRecipes,
    loading,
    visibleCount,
    selectedCategory,
    handleCategoryClick,
    handleLoadMore,
  } = useRecipes();

  return (
    <>
      <NavbarComponent />
      <Container fluid className={styles.pageContainer}>
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

        <section className="text-center mb-5">
          <h3 className={`fw-bold ${styles.subHeading}`}>EMBARK ON A JOURNEY</h3>
          <p className="text-muted">
            With our diverse collection of recipes we have something to satisfy every palate.
          </p>
        </section>

        <section className="mb-5">
          <Container>
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" variant="dark" />
                <p className="mt-3">Loading recipes...</p>
              </div>
            ) : (
              <>
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
              </>
            )}
          </Container>
        </section>

        <SubscribeSection />
        <FooterSection />
      </Container>
    </>
  );
};

export default Recipes;
