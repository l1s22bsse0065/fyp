import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './screens/signup_page';
import Signin from './screens/signin_page';
// import Cart from './screens/Cart';
// import Checkout from './screens/Checkout';
// import Profile from './screens/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
