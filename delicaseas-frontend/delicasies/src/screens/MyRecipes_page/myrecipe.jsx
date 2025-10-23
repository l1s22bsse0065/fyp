import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  // 🧠 Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 🧠 Fetch user's recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/recipes/user/my-recipes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(data.recipes || []);
      } catch (err) {
        toast.error("Failed to load your recipes");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [token]);

  // 🧹 Open delete modal
  const confirmDelete = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  // 🗑️ Delete handler
  const handleDelete = async () => {
    if (!selectedRecipe) return;
    try {
      await axios.delete(`${API_URL}/api/recipes/${selectedRecipe._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== selectedRecipe._id));
      toast.success("Recipe deleted successfully");
    } catch {
      toast.error("Failed to delete recipe");
    } finally {
      setShowModal(false);
      setSelectedRecipe(null);
    }
  };

  return (
    <div className={styles.myRecipesPage}>
      <NavbarComponent />
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">👨‍🍳 My Recipes</h2>
          <Button variant="success" onClick={() => navigate("/add-recipe")}>
            + Add Recipe
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading your recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-5">
            <h4>No recipes yet 😋</h4>
            <p>Start sharing your own dishes with the world!</p>
            <Button variant="primary" onClick={() => navigate("/add-recipe")}>
              Add Your First Recipe
            </Button>
          </div>
        ) : (
          <Row>
            {recipes.map((recipe) => (
              <Col md={4} key={recipe._id} className="mb-4">
                <Card className="shadow-sm border-0 h-100">
                  <Card.Img
                    variant="top"
                    src={recipe.image || "/default-recipe.jpg"}
                    className={styles.recipeImage}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold">{recipe.title}</Card.Title>
                    <Card.Text className="text-muted small">
                      {recipe.category?.join(", ") || "Uncategorized"} • {recipe.time || 0} mins
                    </Card.Text>
                    <Card.Text className="small">
                      {recipe.description?.slice(0, 100)}...
                    </Card.Text>

                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          navigate(`/recipe/${recipe._id}`, {
                            state: { from: "my-recipes" },
                          })
                        }
                      >
                        View
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => confirmDelete(recipe)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* 🧾 Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedRecipe?.title}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <SubscribeSection />
      <FooterSection />
    </div>
  );
};

export default MyRecipes;
