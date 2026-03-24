import { useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AdminNavbar({ toggleTheme, theme, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleHomeClick = () => {
    navigate("/");
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className={`navbar-custom ${isOpen ? 'navbar-expanded' : ''}`}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar-header">
        <button 
          className="navbar-brand"
          onClick={handleHomeClick}
          aria-label="Return to home page"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <svg 
            className="navbar-logo"
            width="28"
            height="28"
            viewBox="0 0 32 40"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M28.74,10.405l-11-7.85a2.972,2.972,0,0,0-3.48,0l-11,7.85A3,3,0,0,0,2,12.845v14.16a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V12.845A3,3,0,0,0,28.74,10.405ZM24.5,25.755H7.5a1,1,0,1,1,0-2h17a1,1,0,0,1,0,2Z" />
          </svg>
        </button>

        {/* Hamburger Button */}
        <button
          className="navbar-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Inline Links Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar-menu-items"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            layout
          >
            <motion.div className="navbar-links-container">
              <motion.button 
                className="navbar-link"
                onClick={handleHomeClick}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Back to Home
              </motion.button>

              <motion.button 
                className="navbar-link"
                onClick={handleLogout}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Logout
              </motion.button>
            </motion.div>

            {/* Theme Toggle */}
            <div className="theme-toggle">
              <div
                className="toggle-track"
                onClick={toggleTheme}
              >
                <motion.div
                  className="toggle-thumb"
                  animate={{ x: theme === "dark" ? 22 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {theme === "dark" ? (
                    <Sun size={16} color="#1E1E1F" />
                  ) : (
                    <Moon size={16} color="#1E1E1F" />
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
