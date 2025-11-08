import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "../styles/reviewSection.module.css";

const ReviewSection = ({ recipeId, existingReviews = [], onNewReview }) => {
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(existingReviews);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to submit a review.");
      return;
    }

    if (!rating || !comment.trim()) {
      alert("Please provide both rating and comment.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/recipes/${recipeId}/review`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newReview = data.review;
      setReviews((prev) => [newReview, ...prev]);
      setRating(0);
      setComment("");
      if (onNewReview) onNewReview(newReview);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.reviewSection}>
      <h3>Reviews</h3>

      {/* Display existing reviews */}
      {reviews.length > 0 ? (
        reviews.map((rev) => (
          <div key={rev._id} className={styles.reviewCard}>
            <strong>{rev.username}</strong> ⭐ {rev.rating}/5
            <p>{rev.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to share your thoughts!</p>
      )}

      {/* Add new review */}
      {token ? (
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className={styles.select}
          >
            <option value="">Select...</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <label>Comment:</label>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className={styles.textarea}
          />

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <p>Please login to write a review.</p>
      )}
    </div>
  );
};

export default ReviewSection;
