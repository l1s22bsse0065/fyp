import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";
import FooterSection from "../../components/FooterSection";
import SubscribeSection from "../../components/SubscribeSection";
import styles from "../../styles/addRecipe.module.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = user?.token || localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [""],
    steps: [""],
    time: "",
    servings: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addField = (field) =>
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));

  const removeField = (field, index) =>
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to add a recipe!");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
      });
      if (image) data.append("image", image);

      await axios.post(`${API_URL}/api/recipes`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("🎉 Recipe added successfully!");
      navigate("/my-recipes"); // ✅ redirect after success
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error while adding recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addRecipePage}>
      <NavbarComponent />
      <Container className="py-5">
        {/* === Back to My Recipes Button === */}
        <div className="mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => navigate("/my-recipes")}
          >
            ← Back to My Recipes
          </Button>
        </div>

        <div className={styles.headerSection}>
          <h1 className="fw-bold text-center mb-2">Add Your Own Recipe 🍳</h1>
          <p className="text-center text-muted mb-4">
            Share your favorite dish with the Delicacies community!
          </p>
        </div>

        <Form onSubmit={handleSubmit} className={`${styles.formContainer} shadow`}>
          {/* === BASIC INFO === */}
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Recipe Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Spaghetti Carbonara"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Cooking Time (mins)</Form.Label>
                <Form.Control
                  type="number"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Servings</Form.Label>
                <Form.Control
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Italian, Dessert, Breakfast"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="A short description of your recipe..."
                />
              </Form.Group>
            </Col>
          </Row>

          {/* === INGREDIENTS & STEPS === */}
          <Row className="g-3 mt-3">
            <Col md={6}>
              <Form.Label className="fw-semibold">Ingredients</Form.Label>
              {formData.ingredients.map((ing, i) => (
                <div key={i} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={ing}
                    onChange={(e) =>
                      handleArrayChange(i, "ingredients", e.target.value)
                    }
                    placeholder="e.g. 2 cups of flour"
                    required
                  />
                  {i > 0 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => removeField("ingredients", i)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => addField("ingredients")}
              >
                + Add Ingredient
              </Button>
            </Col>

            <Col md={6}>
              <Form.Label className="fw-semibold">Steps</Form.Label>
              {formData.steps.map((st, i) => (
                <div key={i} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={st}
                    onChange={(e) =>
                      handleArrayChange(i, "steps", e.target.value)
                    }
                    placeholder="e.g. Mix all ingredients..."
                    required
                  />
                  {i > 0 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => removeField("steps", i)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => addField("steps")}
              >
                + Add Step
              </Button>
            </Col>
          </Row>

          {/* === IMAGE UPLOAD === */}
          <Form.Group className="mt-4">
            <Form.Label className="fw-semibold">Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          {preview && (
            <div className="text-center mt-3">
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "220px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          )}

          {/* === SUBMIT BUTTON === */}
          <div className="text-center mt-4">
            <Button
              type="submit"
              disabled={loading}
              className={`${styles.submitBtn} px-4 py-2`}
            >
              {loading ? "Submitting..." : "Add Recipe"}
            </Button>
          </div>
        </Form>
      </Container>

      <SubscribeSection />
      <FooterSection />
    </div>
  );
};

export default AddRecipe;
