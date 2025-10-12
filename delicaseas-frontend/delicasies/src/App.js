import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";  // ✅ import action
import ScrollToTop from "./hooks/ScrollToTop";

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

function App() {
  const dispatch = useDispatch();

  // ✅ This runs once when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser))); // load user into redux
    }
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/cooking-tips" element={<CookingTips />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/recipe/:id" element={<ViewRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
