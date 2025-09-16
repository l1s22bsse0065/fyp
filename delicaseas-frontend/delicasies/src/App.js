import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './screens/signup_page';
import Signin from './screens/signin_page';
import HomePage from './screens/home_page/home';
import Chatbot from './screens/chatbot_page/chatbot';
import Recipes from './screens/recipes/Recipes';
import CookingTips from './screens/Cooking_Tips/cookingtip';
// import Profile from './screens/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/cooking-tips" element={<CookingTips />} />
  
       
        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
