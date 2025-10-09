import { useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import TipsGrid from "../components/Tipsgrid";

const TipsSection = ({ title, tips = [] }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Handle empty or loading state
  if (!tips || tips.length === 0) {
    return (
      <section className="mb-5 mt-5 text-center">
        <Container>
          <h2 className="mb-3">{title}</h2>
          <Spinner animation="border" variant="dark" />
          <p className="mt-3 text-muted">Fetching the latest tips...</p>
        </Container>
      </section>
    );
  }

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
