// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to top
  }, [pathname]); // run every time route changes

  return null;
};

export default ScrollToTop;
