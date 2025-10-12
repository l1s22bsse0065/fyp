// src/utils/getSimilarRecipes.js
export const getSimilarRecipes = (recipes, currentRecipe) => {
  if (!currentRecipe || !Array.isArray(recipes)) return [];

  return recipes.filter((r) => {
    if (!r || !r.category) return false;

    const currentCat = Array.isArray(currentRecipe.category)
      ? currentRecipe.category[0]?.toLowerCase().trim()
      : currentRecipe.category?.toLowerCase().trim();

    const recipeCat = Array.isArray(r.category)
      ? r.category[0]?.toLowerCase().trim()
      : r.category?.toLowerCase().trim();

    const sameCategory = recipeCat === currentCat;
    const notSameRecipe = r._id?.toString() !== currentRecipe._id?.toString();

    return sameCategory && notSameRecipe;
  });
};
