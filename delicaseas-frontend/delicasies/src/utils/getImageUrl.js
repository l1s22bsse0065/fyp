import defaultImage from "../assets/images/chef_pic.png";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Returns a fully qualified image URL or a default placeholder.
 * Handles Windows paths, redundant slashes, and missing URLs.
 * @param {string} imagePath - The image path or full URL.
 * @returns {string} Full image URL or default placeholder.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return defaultImage;

  // Handle Windows backslashes and trim whitespace
  let cleanPath = imagePath.replace(/\\/g, "/").trim();

  // Already a full URL (like from Cloudinary)
  if (cleanPath.startsWith("http")) return cleanPath;

  // Remove duplicate leading slashes to prevent //uploads
  cleanPath = cleanPath.replace(/^\/+/, "");

  return `${API_URL}/${cleanPath}`;
};
