import { useState } from "react";
import { Row, Col, Card, Button, Modal, Badge } from "react-bootstrap";
import styles from "../styles/tips.module.css";
import defaultImage from "../assets/images/signup.jpg";

const TipsGrid = ({ title, tips }) => {
  const [show, setShow] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [imageLoading, setImageLoading] = useState({});

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleClose = () => {
    setShow(false);
    setTimeout(() => setSelectedTip(null), 300);
  };
  
  const handleShow = (tip) => {
    setSelectedTip(tip);
    setShow(true);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return defaultImage;
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}${imagePath}`;
  };

  const handleImageLoad = (tipId) => {
    setImageLoading(prev => ({ ...prev, [tipId]: false }));
  };

  const handleImageStart = (tipId) => {
    setImageLoading(prev => ({ ...prev, [tipId]: true }));
  };

  return (
    <div className={styles.tipsContainer}>
      {/* Section Header */}
      {title && (
        <div className={styles.sectionHeader}>
          <Badge className={styles.tipsBadge}>Culinary Wisdom</Badge>
          <h2 className={styles.modernSectionTitle}>{title}</h2>
          <p className={styles.sectionSubtitle}>
            Master the art of cooking with our curated collection of professional tips
          </p>
        </div>
      )}

      {/* Tips Grid */}
      <Row className="g-4">
        {(tips || []).map((tip, index) => (
          <Col
            key={tip._id || tip.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="d-flex"
          >
            <Card className={`${styles.modernTipCard} w-100`}>
              <div className={styles.imageContainer}>
                {imageLoading[tip._id] && (
                  <div className={styles.imageLoader}>
                    <div className={styles.spinner}></div>
                  </div>
                )}
                <Card.Img
                  variant="top"
                  src={getImageUrl(tip.image)}
                  alt={`Tip: ${tip.title}`}
                  className={styles.modernCardImg}
                  onLoad={() => handleImageLoad(tip._id)}
                  onLoadStart={() => handleImageStart(tip._id)}
                  onError={(e) => {
                    e.target.src = defaultImage;
                    handleImageLoad(tip._id);
                  }}
                />
                <div className={styles.tipNumber}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className={styles.tipCategory}>
                  <span>💡 Quick Tip</span>
                </div>
              </div>
              
              <Card.Body className={styles.modernCardBody}>
                <Card.Title className={styles.modernCardTitle}>
                  {tip.title}
                </Card.Title>
                <Card.Text className={styles.modernCardText}>
                  {tip.description?.length > 80 
                    ? `${tip.description.substring(0, 80)}...` 
                    : tip.description
                  }
                </Card.Text>
                
                <div className={styles.cardActions}>
                  <Button
                    className={styles.modernViewBtn}
                    onClick={() => handleShow(tip)}
                  >
                    View Tip
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      {selectedTip && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          size="lg"
          contentClassName={styles.modernTipModal}
          backdropClassName={styles.modernBackdrop}
        >
          <div className={styles.modernModalHeader}>
            <div className={styles.modalHeaderLeft}>
              <span className={styles.modalIcon}>🍳</span>
              <div>
                <h4 className={styles.modalTitle}>{selectedTip.title}</h4>
                <p className={styles.modalSubtitle}>Professional Cooking Tip</p>
              </div>
            </div>
            <button onClick={handleClose} className={styles.modernCloseBtn}>
              <span>×</span>
            </button>
          </div>

          <div className={styles.modernModalBody}>
            <div className={styles.modalImageWrapper}>
              <img
                src={getImageUrl(selectedTip.image)}
                alt={selectedTip.title}
                className={styles.modalImage}
                onError={(e) => (e.target.src = defaultImage)}
              />
              <div className={styles.imageOverlay}>
                <span className={styles.overlayText}>Expert Tip</span>
              </div>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.tipHighlight}>
                <span className={styles.highlightIcon}>✨</span>
                <span>Pro Tip</span>
              </div>
              
              <div className={styles.modalTextBox}>
                <p className={styles.modalDescription}>{selectedTip.description}</p>
              </div>

              <div className={styles.modalActions}>
                <button onClick={handleClose} className={styles.gotItBtn}>
                  <span className={styles.btnEmoji}>👍</span>
                  Got it, Chef!
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TipsGrid;
