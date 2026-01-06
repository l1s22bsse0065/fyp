import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/getStarted.module.css";

const GetStartedPage = () => {
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const handleStart = () => {
    setAnimating(true);
    setTimeout(() => {
      navigate("/welcome");
    }, 600);
  };

  return (
    <div className={styles.getStartedWrapper}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
      </div>

      <div className={`${styles.contentBox} ${loaded ? styles.loaded : ""}`}>
        <div className={styles.textSection}>
          {/* Icon/Logo Section */}
          <div className={styles.iconSection}>
            <div className={styles.mainIcon}>
              <span className={styles.cookingIcon}>🍳</span>
              <span className={styles.sparkle1}>✨</span>
              <span className={styles.sparkle2}>✨</span>
            </div>
          </div>

          <h1 className={styles.title}>
            Welcome to <span className={styles.brandName}>Delicacies</span>
          </h1>
          
          <p className={styles.subtitle}>
            Discover amazing recipes from around the globe. 
            <br />
            <span className={styles.highlight}>Let's start your culinary journey!</span>
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🌟</span>
              <span>Premium Recipes</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>👨‍🍳</span>
              <span>Expert Tips</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🌍</span>
              <span>Global Cuisine</span>
            </div>
          </div>

          <div className={styles.btnGroup}>
            <button
              className={`${styles.startBtn} ${animating ? styles.slide : ""}`}
              onClick={handleStart}
            >
              <span className={styles.btnText}>Get Started</span>
              <span className={styles.btnIcon}>🚀</span>
              <div className={styles.btnGlow}></div>
            </button>
            
            <div className={styles.encourageText}>
              Join thousands of food lovers!
            </div>
          </div>
        </div>
      </div>

      {/* Floating Food Elements */}
      <div className={styles.floatingElements}>
        <div className={`${styles.floatingFood} ${styles.food1}`}>🍅</div>
        <div className={`${styles.floatingFood} ${styles.food2}`}>🥕</div>
        <div className={`${styles.floatingFood} ${styles.food3}`}>🍋</div>
        <div className={`${styles.floatingFood} ${styles.food4}`}>🥒</div>
        <div className={`${styles.floatingFood} ${styles.food5}`}>🌶️</div>
      </div>
    </div>
  );
};

export default GetStartedPage;
