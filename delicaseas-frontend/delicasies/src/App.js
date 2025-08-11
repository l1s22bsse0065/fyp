import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
// import Menu from './screens/Menu';
// import Cart from './screens/Cart';
// import Checkout from './screens/Checkout';
// import Profile from './screens/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
