import { motion } from "framer-motion";

export default function SidebarItem({ label, active, onClick }) {
  return (
    <motion.button
      type="button"
      className={`sidebar-item ${active ? "active" : ""}`}
      whileHover={{ x: 4 }}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </motion.button>
  );
}