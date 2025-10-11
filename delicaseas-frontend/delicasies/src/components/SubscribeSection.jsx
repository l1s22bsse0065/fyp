import { Container, Button } from "react-bootstrap";
import styles from "../styles/subscribe.module.css";

const SubscribeSection = () => {
  return (
    <section className={styles.subscribeSection}>
      <Container fluid className="text-center py-5">
        <h5 className="text-white text-uppercase mb-2">Subscribe</h5>
        <h2 className="fw-bold text-white mb-3">JOIN THE FUN<br/>SUBSCRIBE NOW!</h2>
        <p className="text-white mb-4">
          Subscribe today to be part of the ultimate foodie family. 
        </p>
        <div className={styles.subscribeForm}>
          <input 
            type="email" 
            placeholder="Email Address" 
            className={styles.emailInput} 
          />
          <Button variant="dark" className={styles.subButton}>SUBSCRIBE</Button>
        </div>
      </Container>
    </section>
  );
};

export default SubscribeSection;
