import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../styles/recipes.module.css";
import defaultImage from "../assets/images/chef.jpg";
import { getImageUrl } from "../utils/getImageUrl";
import { useFavourites } from "../hooks/useFavourites"; // 🔥 IMPORT THE HOOK

const RecipeGrid = ({ title, recipes }) => {
  // 🔥 GET USER & TOKEN (same as ViewRecipe)
  const user = useSelector((state) => state.user.user);
  const userToken = localStorage.getItem("token");
  
  // 🔥 USE THE ACTUAL FAVORITES HOOK (same as ViewRecipe)
  const { toggleFavourite, isFavourite } = useFavourites(userToken);

  const formatTime = (time) => {
    if (!time) return "N/A";
    return time.includes("min") ? time : `${time} min`;
  };

  // 🔥 PROPER FAVORITE HANDLER WITH BACKEND INTEGRATION
  const handleFavoriteClick = (recipeId, e) => {
    e.preventDefault(); // Prevent any navigation
    e.stopPropagation(); // Stop event bubbling
    
    if (!user || !userToken) {
      alert("Please log in to save recipes to your favorites ❤️");
      return;
    }
    
    // 🔥 THIS NOW SAVES TO BACKEND (same as ViewRecipe)
    toggleFavourite(recipeId);
  };

  if (!recipes || recipes.length === 0) {
    return (
      <div className={styles.noResults}>
        <i className="bi bi-search"></i>
        <h3>No recipes found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      {title && (
        <h2 className={styles.sectionTitle}>{title}</h2>
      )}

      <Row className="g-4">
        {recipes.map((recipe) => (
          <Col key={recipe._id} xs={12} sm={6} lg={4} xl={3}>
            <Card className={styles.recipeCard}>
              
              {/* Image Section */}
              <div className={styles.imageWrapper}>
                <Card.Img
                  src={getImageUrl(recipe.image)}
                  alt={recipe.title}
                  className={styles.cardImg}
                  onError={(e) => (e.target.src = defaultImage)}
                />
                <div className={styles.imageOverlay}>
                  {/* 🔥 FIXED FAVORITE BUTTON WITH BACKEND INTEGRATION */}
                  <Button
                    variant="link"
                    className={`${styles.favButton} ${
                      userToken && isFavourite(recipe._id) ? styles.favActive : ""
                    }`}
                    onClick={(e) => handleFavoriteClick(recipe._id, e)}
                    title={userToken && isFavourite(recipe._id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <i className={
                      userToken && isFavourite(recipe._id) 
                        ? "bi bi-heart-fill" 
                        : "bi bi-heart"
                    }></i>
                  </Button>
                </div>
              </div>

              {/* Content Section */}
              <Card.Body className={styles.cardBody}>
                <div className={styles.cardContent}>
                  <h5 className={styles.cardTitle}>{recipe.title}</h5>
                  <p className={styles.cardDescription}>
                    {recipe.description?.length > 80 
                      ? `${recipe.description.substring(0, 80)}...` 
                      : recipe.description}
                  </p>
                </div>

                {/* Meta & Action */}
                <div className={styles.cardFooter}>
                  <div className={styles.recipeMeta}>
                    <span className={styles.metaItem}>
                      <i className="bi bi-clock"></i>
                      {formatTime(recipe.time)}
                    </span>
                    {recipe.servings && (
                      <span className={styles.metaItem}>
                        <i className="bi bi-people"></i>
                        {recipe.servings}
                      </span>
                    )}
                  </div>

                  <Link to={`/recipe/${recipe._id}`} className={styles.viewButton}>
                    <span>View Recipe</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RecipeGrid;
