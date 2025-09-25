import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";

import Signup from './screens/signup_page';
import Signin from './screens/signin_page';
import HomePage from './screens/home_page/home';
import Chatbot from './screens/chatbot_page/chatbot';
import Recipes from './screens/recipes/Recipes';
import CookingTips from './screens/Cooking_Tips/cookingtip';
import AboutUs from './screens/Aboutus_page/aboutus';
import Profile from './screens/Profile_page/profile_page';


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/cooking-tips" element={<CookingTips />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
