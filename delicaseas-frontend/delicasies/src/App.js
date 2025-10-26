import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slices/userSlice";
import ScrollToTop from "./hooks/ScrollToTop";
import { ToastContainer } from "react-toastify";

import WelcomePage from "./screens/Welcome_page/WelcomePage";
import Signup from "./screens/signup_page";
import Signin from "./screens/signin_page";
import HomePage from "./screens/home_page/home";
import Chatbot from "./screens/chatbot_page/chatbot";
import Recipes from "./screens/recipes/Recipes";
import CookingTips from "./screens/Cooking_Tips/cookingtip";
import AboutUs from "./screens/Aboutus_page/aboutus";
import Profile from "./screens/Profile_page/profile_page";
import EditProfile from "./screens/Profile_page/edit_profile";
import ViewRecipe from "./screens/View_recipe/ViewRecipe";
import SavedRecipes from "./screens/savedRecipe_page/SavedRecipes";
import MyRecipes from "./screens/MyRecipes_page/myrecipe";
import AddRecipe from "./screens/Add_recipe/addrecipe";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Redirect root to welcome page */}
        <Route path="/" element={<Navigate to="/welcome" />} />

        {/* Welcome Page (Public) */}
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Auth routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Public routes (guest can access) */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<ViewRecipe />} />
        <Route path="/cooking-tips" element={<CookingTips />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Auth-only routes */}
        {user ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<Navigate to="/signin" />} />
            <Route path="/edit-profile" element={<Navigate to="/signin" />} />
            <Route path="/saved-recipes" element={<Navigate to="/signin" />} />
            <Route path="/my-recipes" element={<Navigate to="/signin" />} />
            <Route path="/add-recipe" element={<Navigate to="/signin" />} />
          </>
        )}

        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </Router>
  );
}

export default App;
