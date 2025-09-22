import { useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import styles from "../styles/recipes.module.css";

const TipsGrid = ({ title, tips }) => {
  const [show, setShow] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (tip) => {
    setSelectedTip(tip);
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

      {/* Grid of Tips */}
      <Row>
        {(tips || []).map((tip) => (
          <Col
            key={tip.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 d-flex"
          >
            <Card className={`flex-fill ${styles.recipeCard}`}>
              <Card.Img
                variant="top"
                src={tip.image}
                alt={`Tip image for ${tip.title}`}
                className={styles.cardImg}
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
        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedTip.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedTip.image}
              alt={selectedTip.title}
              style={{
                width: "100%",
                maxWidth: "450px",
                display: "block",
                margin: "0 auto",
              }}
              className="rounded mb-3"
            />
            <p>{selectedTip.description}</p>
            {selectedTip.details && (
              <p>
                <strong>Details:</strong> {selectedTip.details}
              </p>
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

export default TipsGrid;
