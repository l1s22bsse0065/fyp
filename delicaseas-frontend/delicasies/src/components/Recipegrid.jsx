// src/components/RecipeGrid.js
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/recipes.module.css";
import defaultImage from "../assets/images/chef_pic.png";
import { getImageUrl } from "../utils/getImageUrl";

const RecipeGrid = ({ title, recipes }) => {

  return (
    <>
      {title && (
        <h2 className={`${styles.sectionTitle} mb-4 text-center`}>{title}</h2>
      )}

      <Row>
        {(recipes || []).map((recipe) => (
          <Col
            key={recipe._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex"
          >
            <Card className={`flex-fill ${styles.recipeCard}`}>
              <div className={styles.imageWrapper}>
                <Card.Img
                  variant="top"
                  src={getImageUrl(recipe.image)}
                  alt={`Recipe image for ${recipe.title}`}
                  className={styles.cardImg}
                  onError={(e) => (e.target.src = defaultImage)} // fallback if broken
                />
              </div>

              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {recipe.description}
                  </Card.Text>
                </div>

                <div className={`${styles.recipeFooter} mt-3`}>
                  <div className={styles.recipeMeta}>
                    <span>{recipe.time || "N/A"}</span>
                    {recipe.servings && <span> | {recipe.servings}</span>}
                  </div>

                  <Link
                    to={`/recipe/${recipe._id}`}
                    className={`btn btn-outline-dark btn-sm mt-2 ${styles.viewBtn}`}
                  >
                    VIEW RECIPE
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RecipeGrid;
