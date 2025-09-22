import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import TipsGrid from "../components/Tipsgrid";
import { tips } from "../data/cookingtips";

const TipsSection = ({ title }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="mb-5 mt-5">
      <Container>
        <TipsGrid title={title} tips={tips.slice(0, visibleCount)} />

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
