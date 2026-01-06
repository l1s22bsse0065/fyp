import { useNavigate } from "react-router-dom";
import styles from "../../styles/welcome.module.css";
import heroImg from "../../assets/images/signup.jpg"; // You can change this

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.welcomeWrapper}>
      <div className={styles.overlay}></div>

      <div className={styles.contentBox}>
        <img src={heroImg} alt="Welcome" className={styles.heroImage} />

        <div className={styles.textSection}>
          <h1 className={styles.title}>Welcome to <span>Delicacies</span></h1>
          <p className={styles.subtitle}>
            Discover mouth-watering recipes from around the world.
            Explore freely as our guest, or sign in to unlock all features.
          </p>

          <div className={styles.btnGroup}>
            <button
              className={styles.guestBtn}
              onClick={() => navigate("/home")}
            >
              Continue as Guest 🍽️
            </button>

            <button
              className={styles.loginBtn}
              onClick={() => navigate("/signin")}
            >
              Sign In / Sign Up 🔐
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
