import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../slices/recipesSlice";

const useRecipes = () => {
  const dispatch = useDispatch();
  const { list: recipes, status, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  const loading = status === "loading";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((r) =>
          Array.isArray(r.category)
            ? r.category.includes(selectedCategory)
            : r.category === selectedCategory
        );

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
    error,
    visibleCount,
    selectedCategory,
    handleCategoryClick,
    handleLoadMore,
  };
};

export default useRecipes;