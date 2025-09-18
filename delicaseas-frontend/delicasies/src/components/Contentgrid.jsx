// src/components/RecipeGrid.js
import { useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import styles from "../styles/recipes.module.css";

const RecipeGrid = ({ title, recipes }) => {
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setShow(true);
  };

  return (
    <>
      {/* Section Title */}
      {title && (
        <h2 className={`${styles.sectionTitle} mb-4 text-center`}>
          {title}
        </h2>
      )}

      {/* Grid of Recipes */}
      <Row>
        {(recipes || []).map((recipe) => (
          <Col
            key={recipe.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex"
          >
            <Card className={`flex-fill ${styles.recipeCard}`}>
              <Card.Img
                variant="top"
                src={recipe.image}
                alt={`Recipe image for ${recipe.title}`}
                className={styles.cardImg}
              />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <div className={styles.recipeFooter}>
                  <div className={styles.recipeMeta}>
                    <span>{recipe.time}</span> | <span>{recipe.servings}</span>
                  </div>
                  <Button
                    variant="light"
                    className={styles.viewBtn}
                    onClick={() => handleShow(recipe)}
                  >
                    VIEW RECIPE
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Recipe Details */}
      {selectedRecipe && (
        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedRecipe.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              style={{
                width: "100%",
                maxWidth: "450px",
                display: "block",
                margin: "0 auto",
              }}
              className="rounded mb-3"
            />
            <p>{selectedRecipe.description}</p>
            <p>
              <strong>Time:</strong> {selectedRecipe.time} |{" "}
              <strong>Servings:</strong> {selectedRecipe.servings}
            </p>

            {/* Ingredients */}
            {selectedRecipe.ingredients && (
              <>
                <h5>Ingredients</h5>
                <ul>
                  {selectedRecipe.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Steps */}
            {selectedRecipe.steps && (
              <>
                <h5>Steps</h5>
                <ol>
                  {selectedRecipe.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default RecipeGrid;
