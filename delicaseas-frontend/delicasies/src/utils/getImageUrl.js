import defaultImage from "../assets/images/chef_pic.png";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Returns a fully qualified image URL or a default placeholder.
 * @param {string} imagePath - The image path or full URL.
 * @returns {string} Full image URL or default placeholder.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return defaultImage;

  // If it's already a full URL, just return it
  if (imagePath.startsWith("http")) return imagePath;

  // Ensure proper slash handling
  if (!imagePath.startsWith("/")) {
    return `${API_URL}/${imagePath}`;
  }

  return `${API_URL}${imagePath}`;
};
