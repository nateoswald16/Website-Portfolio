import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Projects from "./pages/Projects";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import PageWrapper from "./components/PageWrapper";
import { checkAuth, logout } from "./services/api";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Check authentication status on app load
    checkAuth()
      .then(res => res.json())
      .then(data => setIsAuthenticated(data.authenticated))
      .catch(error => {
        // Silently handle auth check failures (user not logged in)
        console.log("Initial auth check failed:", error);
        setIsAuthenticated(false);
      });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      // Redirect to home page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const location = useLocation();

  return (
    <>
      {location.pathname === "/dashboard" ? (
        <AdminNavbar 
          toggleTheme={toggleTheme} 
          theme={theme}
          onLogout={handleLogout}
        />
      ) : (
        <Navbar 
          toggleTheme={toggleTheme} 
          theme={theme} 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="/projects"
            element={
              <PageWrapper>
                <Projects />
              </PageWrapper>
            }
          />

          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />

          <Route
            path="/admin"
            element={
              <PageWrapper>
                <AdminLogin />
              </PageWrapper>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute onAuthChange={setIsAuthenticated}>
                <PageWrapper>
                  <AdminDashboard />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;