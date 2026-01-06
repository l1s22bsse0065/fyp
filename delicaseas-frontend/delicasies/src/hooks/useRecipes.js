import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../slices/recipesSlice";

const useRecipes = () => {
  const dispatch = useDispatch();
  const { list: recipes, status, error } = useSelector((state) => state.recipes);

  // Redux recipe fetching
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  const loading = status === "loading";

  // 🔥 ENHANCED SEARCH & FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // 🔥 DEBOUNCED SEARCH - Prevents excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 🔥 ENHANCED SEARCH FUNCTION - Searches across all fields
  const searchRecipes = (recipes, searchTerm) => {
    if (!searchTerm.trim()) return recipes;

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const searchWords = normalizedSearch.split(' ').filter(word => word.length > 0);

    return recipes.filter(recipe => {
      // Create searchable content from all recipe fields
      const searchableContent = [
        recipe.title || '',
        recipe.description || '',
        recipe.author || '',
        ...(Array.isArray(recipe.ingredients) ? recipe.ingredients : []),
        ...(Array.isArray(recipe.instructions) ? recipe.instructions : []),
        ...(Array.isArray(recipe.category) ? recipe.category : [recipe.category || '']),
        recipe.cuisine || '',
        recipe.difficulty || '',
        recipe.time || '',
        recipe.cookTime || '',
        recipe.servings ? recipe.servings.toString() : ''
      ].join(' ').toLowerCase();

      // Check if ALL search words are found (AND logic)
      return searchWords.every(word => 
        searchableContent.includes(word)
      );
    });
  };

  // 🔥 ENHANCED CATEGORY FILTERING (keeping your original logic)
  const filterByCategory = (recipes, category) => {
    if (category === "All") return recipes;

    return recipes.filter((r) =>
      Array.isArray(r.category)
        ? r.category.includes(category)
        : r.category === category
    );
  };

  // 🔥 MEMOIZED FILTERED RECIPES - Optimized performance
  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Apply search filter first
    if (debouncedSearchTerm) {
      result = searchRecipes(result, debouncedSearchTerm);
    }

    // Then apply category filter
    result = filterByCategory(result, selectedCategory);

    // Sort by relevance if searching
    if (debouncedSearchTerm) {
      const searchWords = debouncedSearchTerm.toLowerCase().split(' ').filter(Boolean);
      
      result.sort((a, b) => {
        const aTitle = (a.title || '').toLowerCase();
        const bTitle = (b.title || '').toLowerCase();
        const aDesc = (a.description || '').toLowerCase();
        const bDesc = (b.description || '').toLowerCase();

        // Exact title match gets highest priority
        const aExactTitle = searchWords.every(word => aTitle.includes(word));
        const bExactTitle = searchWords.every(word => bTitle.includes(word));
        
        if (aExactTitle && !bExactTitle) return -1;
        if (!aExactTitle && bExactTitle) return 1;

        // Title starts with search term
        const aStartsWith = searchWords.some(word => aTitle.startsWith(word));
        const bStartsWith = searchWords.some(word => bTitle.startsWith(word));
        
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        // Count matches in title and description
        const aMatches = searchWords.reduce((count, word) => {
          return count + (aTitle.includes(word) ? 2 : 0) + (aDesc.includes(word) ? 1 : 0);
        }, 0);
        
        const bMatches = searchWords.reduce((count, word) => {
          return count + (bTitle.includes(word) ? 2 : 0) + (bDesc.includes(word) ? 1 : 0);
        }, 0);

        return bMatches - aMatches;
      });
    }

    return result;
  }, [recipes, debouncedSearchTerm, selectedCategory]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [debouncedSearchTerm, selectedCategory]);

  // 🔥 ENHANCED HANDLERS
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSelectedCategory("All");
    setVisibleCount(12);
  };

  // 🔥 SEARCH STATS
  const searchStats = {
    totalRecipes: recipes.length,
    filteredCount: filteredRecipes.length,
    isSearching: Boolean(debouncedSearchTerm),
    isFiltering: selectedCategory !== "All",
    hasResults: filteredRecipes.length > 0,
    searchTerm: debouncedSearchTerm
  };

  return {
    recipes,
    filteredRecipes,
    loading,
    error,
    visibleCount,
    selectedCategory,
    searchTerm,
    debouncedSearchTerm,
    searchStats,
    handleCategoryClick,
    handleLoadMore,
    setSearchTerm: handleSearchChange,
    clearSearch,
    clearFilters
  };
};

export default useRecipes;
