import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavourites } from "../../hooks/useFavourites";
import { getImageUrl } from "../../utils/getImageUrl";
import styles from "../../styles/savedRecipes.module.css";
import illustration from "../../assets/images/illustration.png";

import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";

const SavedRecipes = ({ user }) => {
  const token = user?.token || localStorage.getItem("token");
  const { favourites, toggleFavourite, loading } = useFavourites(token);

  if (loading)
    return <p className="text-center mt-5">Loading your saved recipes...</p>;

  return (
    <div className={styles.savedRecipesPage}>
      <Container>
        <NavbarComponent />
        {/* ===== Header Section ===== */}
        <div className={styles.headerSection}>
          <h1>
            Welcome Back, {user?.name ? user.name.split(" ")[0] : "Chef"} 👨‍🍳
          </h1>
          <p>Your handpicked collection of delicious recipes awaits.</p>
        </div>

        {/* ===== Recipes List ===== */}
        {favourites?.length > 0 ? (
          <div className={styles.recipeList}>
            {favourites.map((recipe) => (
              <div key={recipe._id || recipe.id} className={styles.recipeRow}>
                <Link
                  to={`/view-recipe/${recipe._id || recipe.id}`}
                  className={styles.recipeLink}
                >
                  <img
                    src={getImageUrl(recipe.image)}
                    alt={recipe.title}
                    className={styles.recipeImage}
                  />
                </Link>

                <div className={styles.recipeContent}>
                  <h4>{recipe.title}</h4>
                  <p className={styles.recipeDescription}>
                    {recipe.description?.slice(0, 130) ||
                      "Discover the secret behind this mouthwatering recipe that’s loved by foodies everywhere."}
                  </p>

                  <div className={styles.recipeMeta}>
                    <span>{recipe.duration || 30} mins</span>
                    <span>•</span>
                    <span>{recipe.servings || 2} servings</span>
                  </div>

                  <div className={styles.actionButtons}>
                    <Link
                      to={`/recipe/${recipe._id || recipe.id}`}
                      className={styles.viewBtn}
                    >
                      <i className="bi bi-eye me-2"></i> View Recipe
                    </Link>

                    <Button
                      variant="outline-danger"
                      className={styles.removeBtn}
                      onClick={() => toggleFavourite(recipe._id || recipe.id)}
                    >
                      <i className="bi bi-trash3 me-2"></i> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <img
              src={illustration}
              alt="No saved recipes"
              className={styles.emptyImage}
            />
            <h3>No Saved Recipes Yet!</h3>
            <p>
              Start exploring and save your favourite dishes to see them here.
            </p>
            <Link to="/recipes" className={styles.exploreBtn}>
              Explore Recipes
            </Link>
          </div>
        )}

        <SubscribeSection />
        <FooterSection />
      </Container>
    </div>
  );
};

export default SavedRecipes;
