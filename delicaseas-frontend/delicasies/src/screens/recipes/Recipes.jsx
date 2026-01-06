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

  const categories = [
    { name: "All", icon: "bi-grid-3x3-gap" },
    { name: "Vegan", icon: "bi-leaf" },
    { name: "Breakfast", icon: "bi-sunrise" },
    { name: "Lunch", icon: "bi-sun" },
    { name: "Dinner", icon: "bi-moon-stars" },
    { name: "Dessert", icon: "bi-heart" },
    { name: "Quick Bite", icon: "bi-lightning" },
  ];

  const LoadingState = () => (
    <div className={styles.loadingState}>
      <div className={styles.loadingContent}>
        <div className={styles.cookingAnimation}>
          <i className="bi bi-fire"></i>
          <Spinner animation="border" className={styles.loadingSpinner} />
        </div>
        <h4>Cooking up something delicious...</h4>
        <p>Finding the perfect recipes for you</p>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateContent}>
        <i className="bi bi-search-heart"></i>
        <h4>No recipes found</h4>
        <p>Try adjusting your search or explore a different category</p>
        <Button 
          variant="outline-primary" 
          onClick={() => {
            setSearchTerm("");
            handleCategoryClick("All");
          }}
          className={styles.resetBtn}
        >
          <i className="bi bi-arrow-clockwise me-2"></i>
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <NavbarComponent />
      <div className={styles.pageWrapper}>
        
        {/* Enhanced Hero Section */}
        <section className={styles.heroSection}>
          <Container>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <i className="bi bi-award"></i>
                <span>Curated Collection</span>
              </div>
              
              <h1 className={styles.heroTitle}>
                Discover Amazing
                <span className={styles.titleAccent}> Recipes</span>
              </h1>
              
              <p className={styles.heroSubtitle}>
                From quick bites to gourmet meals, explore our handpicked collection 
                of delicious recipes that will inspire your culinary journey.
              </p>

              {/* Enhanced Search Section */}
              <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                  <div className={styles.searchInputWrapper}>
                    <i className="bi bi-search"></i>
                    <input
                      type="text"
                      placeholder="Search for recipes, ingredients, or cuisine..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={styles.searchInput}
                    />
                    {searchTerm && (
                      <button 
                        className={styles.clearSearch}
                        onClick={() => setSearchTerm("")}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Enhanced Category Filters */}
                <div className={styles.categorySection}>
                  <div className={styles.categoryGrid}>
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        className={`${styles.categoryCard} ${
                          selectedCategory === category.name ? styles.categoryActive : ""
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        <i className={category.icon}></i>
                        <span>{category.name}</span>
                        {selectedCategory === category.name && (
                          <div className={styles.activeIndicator}></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Results Section */}
        <section className={styles.resultsSection}>
          <Container>
            {/* Results Header */}
            {!loading && filteredRecipes.length > 0 && (
              <div className={styles.resultsHeader}>
                <div className={styles.resultsInfo}>
                  <h3>
                    {searchTerm ? (
                      <>
                        Results for "<span className={styles.searchTerm}>{searchTerm}</span>"
                      </>
                    ) : (
                      selectedCategory === "All" ? "All Recipes" : `${selectedCategory} Recipes`
                    )}
                  </h3>
                  <p>
                    Showing {Math.min(visibleCount, filteredRecipes.length)} of {filteredRecipes.length} recipes
                  </p>
                </div>
                
                {(searchTerm || selectedCategory !== "All") && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      handleCategoryClick("All");
                    }}
                    className={styles.clearFiltersBtn}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Clear Filters
                  </Button>
                )}
              </div>
            )}

            {/* Content */}
            {loading ? (
              <LoadingState />
            ) : filteredRecipes.length === 0 ? (
              <EmptyState />
            ) : (
              <div className={styles.recipesContent}>
                <RecipeGrid
                  recipes={filteredRecipes.slice(0, visibleCount)}
                />
                
                {/* Enhanced Load More */}
                {visibleCount < filteredRecipes.length && (
                  <div className={styles.loadMoreSection}>
                    <div className={styles.loadMoreContent}>
                      <p className={styles.loadMoreText}>
                        Showing {visibleCount} of {filteredRecipes.length} recipes
                      </p>
                      <Button 
                        className={styles.loadMoreBtn}
                        onClick={handleLoadMore}
                      >
                        <i className="bi bi-plus-circle me-2"></i>
                        Load More Recipes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Container>
        </section>

        <SubscribeSection />
        <FooterSection />
      </div>
    </>
  );
};

export default Recipes;
