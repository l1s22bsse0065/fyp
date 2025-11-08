import { Container, Button, Spinner } from "react-bootstrap";
import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";
import RecipeGrid from "../../components/Recipegrid";
import useRecipes from "../../hooks/useRecipes";
import styles from "../../styles/recipes.module.css";

const Recipes = () => {
  const {
    filteredRecipes,
    loading,
    visibleCount,
    selectedCategory,
    searchTerm,
    setSearchTerm,
    handleCategoryClick,
    handleLoadMore,
  } = useRecipes();

  return (
    <>
      <NavbarComponent />
      <Container fluid className={styles.pageContainer}>
        {/* 🔹 Header Section */}
        <section className={`text-center py-5 mt-5 mb-5 ${styles.headerSection}`}>
          <h1 className="fw-bold display-5">HAVE A LOOK ON OUR RECIPES</h1>

          {/* 🔍 Search Bar */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <i className="bi bi-search"></i>
          </div>

          {/* 🔸 Category Buttons */}
          <div className={`${styles.categoryButtons} mt-4`}>
            {[
              "All",
              "Vegan",
              "Breakfast",
              "Lunch",
              "Dinner",
              "Dessert",
              "Quick Bite",
            ].map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "dark" : "light"}
                className={styles.categoryBtn}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </section>

        {/* 🔹 Subheader */}
        <section className="text-center mb-5">
          <h3 className={`fw-bold ${styles.subHeading}`}>EMBARK ON A JOURNEY</h3>
          <p className="text-muted">
            With our diverse collection of recipes, we have something to satisfy every palate.
          </p>
        </section>

        {/* 🔹 Recipes Section */}
        <section className="mb-5">
          <Container>
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" variant="dark" />
                <p className="mt-3">Loading recipes...</p>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center my-5">
                <h5 className="text-muted">😔 No recipes found matching your search.</h5>
                <p>Try adjusting your search or browsing another category.</p>
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
