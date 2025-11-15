import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { StarFill, Star } from "react-bootstrap-icons";
import axios from "axios";

import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";
import styles from "../../styles/viewRecipe.module.css";
import defaultImage from "../../assets/images/chef_pic.png";

import useRecipes from "../../hooks/useRecipes";
import { getImageUrl } from "../../utils/getImageUrl";
import { useFavourites } from "../../hooks/useFavourites";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ViewRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user.user);
  const userToken = localStorage.getItem("token");

  const { toggleFavourite, isFavourite } = useFavourites(userToken);
  const { recipes, loading } = useRecipes();

  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);

  // ⭐ Review states
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ==============================
  // Fetch recipe & similar recipes
  // ==============================
  useEffect(() => {
    if (recipes.length === 0) return;

    const currentRecipe = recipes.find((r) => String(r._id) === String(id));

    if (currentRecipe) {
      setRecipe(currentRecipe);
      fetchReviews(currentRecipe._id);

      const currentCategories = Array.isArray(currentRecipe.category)
        ? currentRecipe.category
        : [currentRecipe.category];

      const similar = recipes.filter((r) => {
        if (!r || !r.category) return false;

        const recipeCategories = Array.isArray(r.category)
          ? r.category
          : [r.category];

        return (
          String(r._id) !== String(currentRecipe._id) &&
          currentCategories.some((cat1) =>
            recipeCategories.some(
              (cat2) =>
                typeof cat1 === "string" &&
                typeof cat2 === "string" &&
                cat1.toLowerCase().trim() === cat2.toLowerCase().trim()
            )
          )
        );
      });

      setSimilarRecipes(similar.slice(0, 6));
    } else {
      console.warn("No recipe found with ID:", id);
    }
  }, [recipes, id]);

  // ==============================
  // Fetch reviews from backend
  // ==============================
  const fetchReviews = async (recipeId) => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/recipes/${recipeId}/reviews`
      );
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews:", err.response || err);
    }
  };

  // ==============================
  // Handle review submission
  // ==============================
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!userToken) {
      alert("Please log in to submit a review.");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = { rating: Number(rating), comment: comment.trim() };

      await axios.post(`${API_BASE}/api/recipes/${id}/reviews`, payload, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      setComment("");
      setRating(0);
      fetchReviews(id);
    } catch (err) {
      console.error("Failed to submit review:", err.response || err);
      alert(
        err.response?.data?.message || "Failed to submit review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==============================
  // Favourite handler
  // ==============================
  const handleFavourite = () => {
    if (!user || !userToken) {
      alert("Please log in to save recipes to your favourites ❤️");
      return;
    }
    toggleFavourite(recipe._id);
  };

  // ==============================
  // Loading / Not Found State
  // ==============================
  if (loading && !recipe) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="dark" />
        <p className="mt-3">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center mt-5">
        <p>No recipe found with this ID.</p>
      </div>
    );
  }

  const ingredients = recipe.ingredients || [];
  const steps = recipe.instructions || recipe.steps || [];

  // ==============================
  // Render UI
  // ==============================
  return (
    <>
      <NavbarComponent />
      <div className={styles.pageWrapper}>
        <Container className={styles.recipeContainer}>
          {/* Back Button */}
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

          {/* Hero Section */}
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

              {/* Favourite Button */}
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

          {/* Ingredients & Instructions */}
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

          {/* Reviews Section */}
          <div className={styles.reviewSection}>
            <h4 className={styles.sectionHeading}>Reviews & Ratings</h4>

            <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    onClick={() => setRating(num)}
                    style={{ cursor: "pointer" }}
                  >
                    {num <= rating ? (
                      <StarFill color="#ffc107" size={22} />
                    ) : (
                      <Star color="#ccc" size={22} />
                    )}
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Write your review..."
                className={styles.commentBox}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Post Review"}
              </button>
            </form>

            <div className={styles.reviewList}>
              {reviews.length > 0 ? (
                reviews.map((rev, i) => (
                  <div key={i} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <strong>{rev.user?.name || rev.username || "Anonymous"}</strong>
                      <div>
                        {[...Array(rev.rating)].map((_, idx) => (
                          <StarFill key={idx} color="#ffc107" size={18} />
                        ))}
                      </div>
                    </div>
                    <p className={styles.reviewText}>{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews yet. Be the first!</p>
              )}
            </div>
          </div>

          {/* Author Info */}
          <div className={styles.authorBox}>
            <img src={defaultImage} alt="Chef" className={styles.authorImg} />
            <div>
              <p className={styles.authorName}>{recipe.author || "Chef John Doe"}</p>
              <p className={styles.authorRole}>Recipe Creator</p>
            </div>
          </div>
        </Container>

        {/* Similar Recipes */}
        {similarRecipes.length > 0 && (
          <section className={styles.similarSectionOuter}>
            <Container>
              <div className={styles.similarHeader}>
                <h4 className={styles.sectionHeading}>Similar Recipes</h4>
                <div className={styles.scrollButtons}>
                  <button
                    className={styles.scrollBtn}
                    onClick={() =>
                      document.getElementById("similarScroll").scrollBy({
                        left: -300,
                        behavior: "smooth",
                      })
                    }
                  >
                    ‹
                  </button>
                  <button
                    className={styles.scrollBtn}
                    onClick={() =>
                      document.getElementById("similarScroll").scrollBy({
                        left: 300,
                        behavior: "smooth",
                      })
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
                        <span>{recipe.servings ? ` | ${recipe.servings}` : ""}</span>
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
