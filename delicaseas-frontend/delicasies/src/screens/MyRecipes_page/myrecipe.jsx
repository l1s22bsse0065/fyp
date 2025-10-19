import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";
import SubscribeSection from "../../components/SubscribeSection";
import styles from "../../styles/myRecipes.module.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const MyRecipes = ({ user }) => {
  const navigate = useNavigate();
  const token = user?.token || localStorage.getItem("token");

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch user's recipes
  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes/user/my-recipes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(res.data.recipes || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [token]);

  return (
    <div className={styles.myRecipesPage}>
      <NavbarComponent />

      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">🍳 My Recipes</h2>
          <Button variant="primary" onClick={() => navigate("/add-recipe")}>
            + Add Recipe
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading your recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-5">
            <h4>You haven’t added any recipes yet 😋</h4>
            <p>Start sharing your delicious creations with the world!</p>
            <Button onClick={() => navigate("/add-recipe")} variant="success">
              Add Your First Recipe
            </Button>
          </div>
        ) : (
          <Row>
            {recipes.map((recipe) => (
              <Col key={recipe._id} md={4} className="mb-4">
                <Card className={styles.recipeCard}>
                  <Card.Img
                    variant="top"
                    src={recipe.image || "/default-recipe.jpg"}
                    className={styles.recipeImage}
                  />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text className="text-muted small">
                      {recipe.category || "Uncategorized"} • {recipe.time || 0} mins
                    </Card.Text>
                    <Card.Text className={styles.description}>
                      {recipe.description?.slice(0, 80)}...
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/recipe/${recipe._id}`)}
                    >
                      View Recipe
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <SubscribeSection />
      <FooterSection />
    </div>
  );
};

export default MyRecipes;
