import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRecipes } from "../slices/recipesSlice";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        const data = res.data.recipes || [];
        setRecipes(data);
        dispatch(setRecipes(data)); // Save in Redux
        console.log("✅ Fetched recipes:", data);   
      } catch (err) {
        console.error("❌ Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [API_URL, dispatch]);

  // Filter logic
  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((r) =>
          Array.isArray(r.category)
            ? r.category.includes(selectedCategory)
            : r.category === selectedCategory
        );

  // Handlers
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return {
    recipes,
    filteredRecipes,
    loading,
    visibleCount,
    selectedCategory,
    handleCategoryClick,
    handleLoadMore,
  };
};

export default useRecipes;
