import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { StarFill, Star } from "react-bootstrap-icons";
import axios from "axios";

import NavbarComponent from "../../components/NavbarComponent";
import SubscribeSection from "../../components/SubscribeSection";
import FooterSection from "../../components/FooterSection";
import styles from "../../styles/viewRecipe.module.css";
import defaultImage from "../../assets/images/chef.jpg";

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
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ==============================
  // Fetch recipe & similar recipes (UNCHANGED)
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
  // All existing functions (UNCHANGED)
  // ==============================
  const fetchReviews = async (recipeId) => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/recipes/${recipeId}/reviews`);
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews:", err.response || err);
    }
  };

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
      alert(err.response?.data?.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFavourite = () => {
    if (!user || !userToken) {
      alert("Please log in to save recipes to your favourites ❤️");
      return;
    }
    toggleFavourite(recipe._id);
  };

  // ==============================
  // Loading States (UNCHANGED)
  // ==============================
  if (loading && !recipe) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingContent}>
          <Spinner animation="border" variant="primary" className={styles.spinner} />
          <h3>Loading delicious recipe...</h3>
          <p>Preparing something amazing for you!</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={styles.notFoundWrapper}>
        <div className={styles.notFoundContent}>
          <i className="bi bi-exclamation-circle"></i>
          <h3>Recipe Not Found</h3>
          <p>The recipe you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/recipes")} className={styles.backHomeBtn}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  const ingredients = recipe.ingredients || [];
  const steps = recipe.instructions || recipe.steps || [];

  // ==============================
  // MODERN UI RENDER
  // ==============================
  return (
    <>
      <NavbarComponent />
      <div className={styles.pageWrapper}>
        <Container className={styles.recipeContainer}>
          
          {/* Modern Back Button */}
          <button className={styles.backButton} onClick={() => 
            navigate(location.state?.from === "my-recipes" ? "/my-recipes" : "/recipes")
          }>
            <i className="bi bi-arrow-left"></i>
            <span>Back to {location.state?.from === "my-recipes" ? "My Recipes" : "Recipes"}</span>
          </button>

          {/* Modern Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroImageWrapper}>
              <img
                src={getImageUrl(recipe.image)}
                alt={recipe.title}
                className={styles.heroImage}
                onError={(e) => (e.target.src = defaultImage)}
              />
              <div className={styles.heroGradient}></div>
            </div>
            
            <div className={styles.heroContent}>
              <div className={styles.recipeBadge}>
                <i className="bi bi-bookmark-star"></i>
                <span>Featured Recipe</span>
              </div>
              
              <h1 className={styles.recipeTitle}>{recipe.title}</h1>
              
              {recipe.description && (
                <p className={styles.recipeDescription}>{recipe.description}</p>
              )}

              {/* Recipe Meta */}
              <div className={styles.recipeMetaRow}>
                {recipe.cookTime && (
                  <div className={styles.metaItem}>
                    <i className="bi bi-clock"></i>
                    <span>{recipe.cookTime} mins</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className={styles.metaItem}>
                    <i className="bi bi-people"></i>
                    <span>{recipe.servings} servings</span>
                  </div>
                )}
                <div className={styles.metaItem}>
                  <i className="bi bi-star-fill"></i>
                  <span>4.8 Rating</span>
                </div>
              </div>

              {/* Enhanced Favorite Button */}
              <Button className={`${styles.favButton} ${userToken && isFavourite(recipe._id) ? styles.favActive : ''}`} onClick={handleFavourite}>
                {userToken && isFavourite(recipe._id) ? (
                  <>
                    <FaHeart className={styles.heartIcon} />
                    <span>Saved to Favorites</span>
                  </>
                ) : (
                  <>
                    <FaRegHeart className={styles.heartIcon} />
                    <span>Save to Favorites</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Modern Content Cards */}
          <Row className="g-4 mb-5">
            <Col lg={6}>
              <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                  <i className="bi bi-list-check"></i>
                  <h4>Ingredients</h4>
                </div>
                <div className={styles.cardContent}>
                  {ingredients.length > 0 ? (
                    <ul className={styles.ingredientsList}>
                      {ingredients.map((ing, i) => (
                        <li key={i}>
                          <i className="bi bi-check2"></i>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className={styles.emptyState}>
                      <i className="bi bi-exclamation-circle"></i>
                      <p>No ingredients listed for this recipe.</p>
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className={styles.contentCard}>
                <div className={styles.cardHeader}>
                  <i className="bi bi-clipboard-check"></i>
                  <h4>Instructions</h4>
                </div>
                <div className={styles.cardContent}>
                  {steps.length > 0 ? (
                    <ol className={styles.instructionsList}>
                      {steps.map((step, i) => (
                        <li key={i}>
                          <div className={styles.stepNumber}>{i + 1}</div>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className={styles.emptyState}>
                      <i className="bi bi-exclamation-circle"></i>
                      <p>No instructions available for this recipe.</p>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          {/* Modern Reviews Section */}
          <div className={styles.reviewSection}>
            <div className={styles.reviewHeader}>
              <h4>
                <i className="bi bi-chat-left-text"></i>
                Reviews & Ratings
              </h4>
              <div className={styles.reviewStats}>
                <span>{reviews.length} Reviews</span>
              </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
              <div className={styles.formGroup}>
                <label>Your Rating</label>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={styles.starButton}
                    >
                      {num <= rating ? (
                        <StarFill className={styles.starFilled} />
                      ) : (
                        <Star className={styles.starEmpty} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Your Review</label>
                <textarea
                  placeholder="Share your experience with this recipe..."
                  className={styles.reviewTextarea}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  required
                />
              </div>

              <Button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-send"></i>
                    <span>Post Review</span>
                  </>
                )}
              </Button>
            </form>

            {/* Reviews List */}
            <div className={styles.reviewsList}>
              {reviews.length > 0 ? (
                reviews.map((review, i) => (
                  <div key={i} className={styles.reviewCard}>
                    <div className={styles.reviewCardHeader}>
                      <div className={styles.reviewerInfo}>
                        <div className={styles.reviewerAvatar}>
                          {(review.user?.name || review.username || "A").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h6>{review.user?.name || review.username || "Anonymous"}</h6>
                          <div className={styles.reviewRating}>
                            {[...Array(review.rating)].map((_, idx) => (
                              <StarFill key={idx} className={styles.reviewStar} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={styles.reviewDate}>
                        <i className="bi bi-clock"></i>
                        <span>Recently</span>
                      </div>
                    </div>
                    <p className={styles.reviewText}>{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className={styles.noReviews}>
                  <i className="bi bi-chat-left-dots"></i>
                  <h5>No reviews yet</h5>
                  <p>Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>

          {/* Modern Author Section */}
          <div className={styles.authorSection}>
            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>
                <img src={defaultImage} alt="Chef" />
              </div>
              <div className={styles.authorInfo}>
                <h5>{recipe.author || "Chef John Doe"}</h5>
                <p>Recipe Creator & Food Expert</p>
                <div className={styles.authorStats}>
                  <span><i className="bi bi-bookmark"></i> 127 Recipes</span>
                  <span><i className="bi bi-heart"></i> 2.3k Followers</span>
                </div>
              </div>
              <Button variant="outline-dark" className={styles.followBtn}>
                <i className="bi bi-person-plus"></i>
                Follow
              </Button>
            </div>
          </div>
        </Container>

        {/* Enhanced Similar Recipes */}
        {similarRecipes.length > 0 && (
          <section className={styles.similarSection}>
            <Container>
              <div className={styles.sectionHeader}>
                <div>
                  <h3>Similar Recipes</h3>
                  <p>More delicious recipes you might enjoy</p>
                </div>
                <div className={styles.scrollControls}>
                  <button className={styles.scrollBtn} onClick={() => 
                    document.getElementById("similarScroll").scrollBy({ left: -300, behavior: "smooth" })
                  }>
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button className={styles.scrollBtn} onClick={() => 
                    document.getElementById("similarScroll").scrollBy({ left: 300, behavior: "smooth" })
                  }>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div id="similarScroll" className={styles.similarScroll}>
                {similarRecipes.map((similarRecipe) => (
                  <div key={similarRecipe._id} className={styles.similarCard}>
                    <div className={styles.similarImageWrapper}>
                      <img
                        src={getImageUrl(similarRecipe.image)}
                        alt={similarRecipe.title}
                        onError={(e) => (e.target.src = defaultImage)}
                      />
                      <div className={styles.similarOverlay}>
                        <Button className={styles.viewRecipeBtn} onClick={() => navigate(`/recipe/${similarRecipe._id}`)}>
                          View Recipe
                        </Button>
                      </div>
                    </div>
                    <div className={styles.similarContent}>
                      <h6>{similarRecipe.title}</h6>
                      <p>{similarRecipe.description?.substring(0, 60)}...</p>
                      <div className={styles.similarMeta}>
                        <span><i className="bi bi-clock"></i> {similarRecipe.time || "30 min"}</span>
                        {similarRecipe.servings && <span><i className="bi bi-people"></i> {similarRecipe.servings}</span>}
                      </div>
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
