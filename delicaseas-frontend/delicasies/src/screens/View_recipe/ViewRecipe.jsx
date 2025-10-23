import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation  } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";
import styles from "../../styles/viewRecipe.module.css";
import defaultImage from "../../assets/images/chef_pic.png";

import useRecipes from "../../hooks/useRecipes";
import { getImageUrl } from "../../utils/getImageUrl";
import { useFavourites } from "../../hooks/useFavourites";

const ViewRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Safe access to token (prevents undefined errors)
  const user = useSelector((state) => state.user.user);
  const userToken = localStorage.getItem("token");

  // ✅ Only initialize favourites hook if logged in
  const {  toggleFavourite, isFavourite } = useFavourites(userToken);

  const { recipes, loading } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);

  useEffect(() => {
    if (!loading && recipes.length > 0) {
      const currentRecipe = recipes.find((r) => r._id === id);

      if (currentRecipe) {
        setRecipe(currentRecipe);

        // Find similar recipes by matching categories
        const currentCategories = Array.isArray(currentRecipe.category)
          ? currentRecipe.category
          : [currentRecipe.category];

        const similar = recipes.filter((r) => {
          if (!r || !r.category) return false;
          const recipeCategories = Array.isArray(r.category)
            ? r.category
            : [r.category];

          const sameCategory = currentCategories.some((cat1) =>
            recipeCategories.some(
              (cat2) =>
                typeof cat1 === "string" &&
                typeof cat2 === "string" &&
                cat1.toLowerCase().trim() === cat2.toLowerCase().trim()
            )
          );

          return sameCategory && r._id !== currentRecipe._id;
        });

        setSimilarRecipes(similar.slice(0, 6));
      }
    }
  }, [loading, recipes, id]);

  if (loading || !recipe) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="dark" />
        <p className="mt-3">Loading recipe...</p>
      </div>
    );
  }

  const ingredients = recipe.ingredients || [];
  const steps = recipe.instructions || recipe.steps || [];

  const handleFavourite = () => {
    if (!user || !userToken) {
      alert("Please log in to save recipes to your favourites ❤️");
      return;
    }
    toggleFavourite(recipe._id);
  };

  return (
    <>
      <NavbarComponent />

      <div className={styles.pageWrapper}>
        <Container className={styles.recipeContainer}>
          {/* 🔙 Back Button */}
          <div className={styles.backButtonWrapper}>
            <button
              className={styles.backButton}
              onClick={() =>
                navigate(
                  location.state?.from === "my-recipes"
                    ? "/my-recipes"
                    : "/recipes"
                )
              }
            >
              ← Back to{" "}
              {location.state?.from === "my-recipes" ? "My Recipes" : "Recipes"}
            </button>
          </div>

          {/* 🧁 HERO SECTION */}
          <div className={styles.heroSection}>
            <img
              src={getImageUrl(recipe.image)}
              alt={recipe.title}
              className={styles.heroImage}
            />
            <div className={styles.heroText}>
              <h1 className={styles.recipeTitle}>{recipe.title}</h1>
              {recipe.description && (
                <p className={styles.recipeDesc}>{recipe.description}</p>
              )}
              <div className={styles.recipeInfo}>
                {recipe.cookTime && <span>⏱ {recipe.cookTime} mins</span>}
                {recipe.servings && <span>🍽 {recipe.servings} servings</span>}
              </div>

              {/* ❤️ Add to Favourite Button */}
              <button className={styles.favButton} onClick={handleFavourite}>
                {userToken && isFavourite(recipe._id) ? (
                  <>
                    <FaHeart color="red" size={22} />{" "}
                    <span>Added to Favourites</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart color="gray" size={22} />{" "}
                    <span>Add to Favourites</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 🍴 MAIN CONTENT */}
          <Row className={styles.mainSection}>
            <Col md={6} className={styles.contentCard}>
              <h4 className={styles.sectionHeading}>Ingredients</h4>
              {ingredients.length > 0 ? (
                <ul className={styles.ingredientsList}>
                  {ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No ingredients listed.</p>
              )}
            </Col>

            <Col md={6} className={styles.contentCard}>
              <h4 className={styles.sectionHeading}>Instructions</h4>
              {steps.length > 0 ? (
                <ol className={styles.instructionsList}>
                  {steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted">No instructions available.</p>
              )}
            </Col>
          </Row>

          {/* 🧑‍🍳 AUTHOR INFO */}
          <div className={styles.authorBox}>
            <img src={defaultImage} alt="Chef" className={styles.authorImg} />
            <div>
              <p className={styles.authorName}>
                {recipe.author || "Chef John Doe"}
              </p>
              <p className={styles.authorRole}>Recipe Creator</p>
            </div>
          </div>
        </Container>

        {/* 🍲 Similar Recipes Section */}
        {similarRecipes.length > 0 && (
          <section className={styles.similarSectionOuter}>
            <Container>
              <div className={styles.similarHeader}>
                <h4 className={styles.sectionHeading}>Similar Recipes</h4>
                <div className={styles.scrollButtons}>
                  <button
                    className={styles.scrollBtn}
                    onClick={() =>
                      document
                        .getElementById("similarScroll")
                        .scrollBy({ left: -300, behavior: "smooth" })
                    }
                  >
                    ‹
                  </button>
                  <button
                    className={styles.scrollBtn}
                    onClick={() =>
                      document
                        .getElementById("similarScroll")
                        .scrollBy({ left: 300, behavior: "smooth" })
                    }
                  >
                    ›
                  </button>
                </div>
              </div>

              <div id="similarScroll" className={styles.similarScroll}>
                {similarRecipes.map((recipe) => (
                  <div key={recipe._id} className={styles.recipeCard}>
                    <img
                      src={getImageUrl(recipe.image)}
                      alt={recipe.title}
                      className={styles.cardImg}
                    />
                    <div className={styles.cardBody}>
                      <h5 className={styles.cardTitle}>{recipe.title}</h5>
                      <p className={styles.cardDesc}>{recipe.description}</p>
                      <div className={styles.cardFooter}>
                        <span>{recipe.time || "—"}</span>
                        <span>
                          {recipe.servings ? ` | ${recipe.servings}` : ""}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate(`/recipe/${recipe._id}`)}
                        className={styles.viewBtn}
                      >
                        VIEW RECIPE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        <SubscribeSection />
        <FooterSection />
      </div>
    </>
  );
};

export default ViewRecipe;
