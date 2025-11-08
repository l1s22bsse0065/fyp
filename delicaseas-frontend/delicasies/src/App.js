import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import ScrollToTop from "./hooks/ScrollToTop";
import { ToastContainer } from "react-toastify";

// Screens
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

// ✅ Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

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
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* Public routes */}
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<ViewRecipe />} />
        <Route path="/cooking-tips" element={<CookingTips />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/chatbot" element={<Chatbot />} />

        {/* ✅ Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </Router>
  );
}

export default App;
