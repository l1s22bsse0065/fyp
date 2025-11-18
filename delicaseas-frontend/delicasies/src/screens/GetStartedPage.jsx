import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/getStarted.module.css";

const GetStartedPage = () => {
  const navigate = useNavigate();

  // ✅ State to trigger animation
  const [animating, setAnimating] = useState(false);

  // ✅ Function to handle button click
  const handleStart = () => {
    setAnimating(true);

    // Navigate after animation completes (500ms)
    setTimeout(() => {
      navigate("/welcome");
    }, 500);
  };

  return (
    <div className={styles.getStartedWrapper}>
      <div className={styles.contentBox}>
        <div className={styles.textSection}>
          <h1 className={styles.title}>
            Get Started with <span>Delicacies</span>
          </h1>
          <p className={styles.subtitle}>
            Explore delicious recipes from around the world. Let's get cooking!
          </p>

          <div className={styles.btnGroup}>
            <button
              className={`${styles.startBtn} ${animating ? styles.slide : ""}`}
              onClick={handleStart}
            >
              Get Started 🍳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
