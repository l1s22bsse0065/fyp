import { useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import styles from "../styles/recipes.module.css";
import modalStyles from "../styles/tips.module.css";
import defaultImage from "../assets/images/signup.jpg"; // ← add a default image in your assets

const TipsGrid = ({ title, tips }) => {
  const [show, setShow] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleClose = () => setShow(false);
  const handleShow = (tip) => {
    setSelectedTip(tip);
    setShow(true);
  };

  // Helper: resolve correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return defaultImage;
    if (imagePath.startsWith("http")) return imagePath; // already full URL
    return `${API_URL}${imagePath}`;
  };

  return (
    <>
      {/* Section Title */}
      {title && (
        <h2 className={`${styles.sectionTitle} mb-4 text-center`}>{title}</h2>
      )}

      {/* Grid of Tips */}
      <Row>
        {(tips || []).map((tip) => (
          <Col
            key={tip._id || tip.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex"
          >
            <Card className={`flex-fill ${styles.recipeCard}`}>
              <Card.Img
                variant="top"
                src={getImageUrl(tip.image)}
                alt={`Tip image for ${tip.title}`}
                className={styles.cardImg}
                onError={(e) => (e.target.src = defaultImage)} // fallback if image fails to load
              />
              <Card.Body>
                <Card.Title>{tip.title}</Card.Title>
                <Card.Text>{tip.description}</Card.Text>
                <div className={styles.recipeFooter}>
                  <Button
                    variant="light"
                    className={styles.viewBtn}
                    onClick={() => handleShow(tip)}
                  >
                    VIEW TIP
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Tip Details */}
     {selectedTip && (
  <Modal
    show={show}
    onHide={handleClose}
    centered
    size="md"
    contentClassName={`${modalStyles.tipModal} ${!show ? modalStyles.fadeOut : ""}`}
  >
    <div className={modalStyles.tipHeader}>
      <span className={modalStyles.icon}>✳️</span>
      <h5 className={modalStyles.title}>{selectedTip.title}</h5>
      <button onClick={handleClose} className={modalStyles.closeBtn}>×</button>
    </div>

    <div className={modalStyles.tipBody}>
      <img
        src={getImageUrl(selectedTip.image)}
        alt={selectedTip.title}
        className={modalStyles.tipImage}
        onError={(e) => (e.target.src = defaultImage)}
      />

      <div className={modalStyles.tipTextBox}>
        <p className={modalStyles.tipDesc}>{selectedTip.description}</p>
      </div>

      <button onClick={handleClose} className={modalStyles.tipButton}>
        got it!
      </button>
    </div>
  </Modal>
)}

    </>
  );
};

export default TipsGrid;
