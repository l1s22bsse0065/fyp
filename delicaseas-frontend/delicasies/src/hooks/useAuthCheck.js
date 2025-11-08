import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If there's no token at all → redirect immediately
    if (!token) {
      navigate("/signin");
      return;
    }

    // Small delay to allow Redux/user data to load
    const timer = setTimeout(() => {
      if (!user) {
        // optional: verify token via backend if you want deeper security
        navigate("/signin");
      }
      setChecking(false);
    }, 400); // ⏱️ 0.4s buffer

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return checking; // allows component to wait until check finishes
};
