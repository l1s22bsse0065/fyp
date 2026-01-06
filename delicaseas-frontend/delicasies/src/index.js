import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./store/store";
import './index.css';  // ✅ Tailwind CSS
import "react-toastify/dist/ReactToastify.css";

// ❌ REMOVED: 'bootstrap/dist/css/bootstrap.min.css'
// ❌ REMOVED: 'bootstrap/dist/js/bootstrap.bundle.min.js'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
