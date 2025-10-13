import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const useFavourites = (userToken) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user's favourites (memoized to avoid recreation)
  const fetchFavourites = useCallback(async () => {
    if (!userToken) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/users/favourites`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setFavourites(
        data.favourites || data.user?.favourites || []
      );
    } catch (err) {
      console.error("❌ Error fetching favourites:", err);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  // 🔁 Fetch on mount or token change
  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  // ❤️ Toggle favourite (add/remove)
  const toggleFavourite = useCallback(
    async (recipeId) => {
      if (!userToken) {
        alert("Please log in to manage favourites ❤️");
        return;
      }

      try {
        const { data } = await axios.post(
          `${API_URL}/api/users/favourites/${recipeId}`,
          {},
          { headers: { Authorization: `Bearer ${userToken}` } }
        );

        // ✅ Update favourites state directly from response
        setFavourites(
          data.favourites || data.user?.favourites || []
        );
      } catch (err) {
        console.error("❌ Error toggling favourite:", err);
      }
    },
    [userToken]
  );

  // ✅ Check if a recipe is already favourited
  const isFavourite = useCallback(
    (recipeId) =>
      favourites.some(
        (fav) => fav === recipeId || fav?._id === recipeId
      ),
    [favourites]
  );

  return { favourites, isFavourite, toggleFavourite, loading, refresh: fetchFavourites };
};
