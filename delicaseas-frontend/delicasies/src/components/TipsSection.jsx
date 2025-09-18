import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import ContentGrid from "./Contentgrid";
import styles from "../styles/recipes.module.css"; 
import { tips } from "../data/cookingtips"; // your tips data

const TipsSection = ({ title }) => {
  const [visibleCount, setVisibleCount] = useState(6); // show 6 tips initially

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // load 6 more each time
  };

  return (
    <section className={`${styles.tipsSection} mb-5`}>
      <Container>
        <h2 className={`${styles.sectionTitle} my-4 text-center`}>{title}</h2>

        {/* Tips Grid */}
        <ContentGrid items={tips.slice(0, visibleCount)} type="tip" />

        {/* Load More Button */}
        {visibleCount < tips.length && (
          <div className="text-center mt-4">
            <Button variant="dark" onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default TipsSection;
